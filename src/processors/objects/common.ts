import type { MetaEmitter, MetaEntry } from '../../core/meta.ts';
import type { ValidationIssue } from '../../core/processor.ts';

import { isNonEmptyString, validateUrl } from '../../core/validation.ts';

type ReferenceObject = Record<string, unknown>;

export type StructuredReferenceField = readonly [field: string, outputField: string];

const ISO_DATE_TIME_RE = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})?)?$/;

const normalizeItems = (value: unknown): unknown[] => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

const getReferenceUrl = (item: unknown): unknown => {
  if (typeof item === 'string') {
    return item;
  }
  if (item && typeof item === 'object') {
    return (item as ReferenceObject).url;
  }
  return undefined;
};

export const generateStructuredReferences = (
  emit: MetaEmitter,
  property: string,
  value: unknown,
  fields: readonly StructuredReferenceField[],
): MetaEntry[] => normalizeItems(value).flatMap((item) => {
  const url = getReferenceUrl(item);
  if (!isNonEmptyString(url)) {
    return [];
  }

  const rootEntries = emit(property, url);
  if (!item || typeof item !== 'object') {
    return rootEntries;
  }

  const reference = item as ReferenceObject;
  const structuredEntries = fields.flatMap(([field, outputField]) => emit(`${property}:${outputField}`, reference[field]));
  return [...rootEntries, ...structuredEntries];
});

export const validateReferences = (property: string, value: unknown): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  normalizeItems(value).forEach((item, index) => {
    const itemProperty = `${property}[${index}]`;
    const url = getReferenceUrl(item);
    if (!isNonEmptyString(url)) {
      issues.push(`"${typeof item === 'string' ? itemProperty : `${itemProperty}.url`}" must provide a non-empty URL.`);
      return;
    }

    validateUrl(issues, typeof item === 'string' ? itemProperty : `${itemProperty}.url`, url);
  });

  return issues;
};

export const validateDateTime = (issues: ValidationIssue[], property: string, value: unknown): void => {
  if (value === undefined || value === null) {
    return;
  }

  if (!isNonEmptyString(value) || !ISO_DATE_TIME_RE.test(value) || Number.isNaN(Date.parse(value))) {
    issues.push(`"${property}" must be a valid ISO 8601 date or date-time.`);
  }
};

export const validatePositiveInteger = (issues: ValidationIssue[], property: string, value: unknown): void => {
  if (value !== undefined && value !== null && (!Number.isInteger(value) || Number(value) < 1)) {
    issues.push(`"${property}" must be an integer greater than or equal to 1.`);
  }
};

export const validateStructuredPositiveIntegers = (
  issues: ValidationIssue[],
  property: string,
  value: unknown,
  fields: readonly string[],
): void => {
  normalizeItems(value).forEach((item, index) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    const reference = item as ReferenceObject;
    fields.forEach(field => validatePositiveInteger(issues, `${property}[${index}].${field}`, reference[field]));
  });
};
