import type { MetaEntry } from '../core/meta.ts';
import type { ValidationIssue } from '../core/processor.ts';
import { isNonEmptyString, validateUrl } from '../core/validation.ts';

export const MEDIA_PROPERTIES = ['image', 'audio', 'video'] as const;

export type MediaProperty = typeof MEDIA_PROPERTIES[number];

type MediaObject = Record<string, unknown>;

const STRUCTURED_FIELDS = {
  audio: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
  ],
  image: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
    ['width', 'width'],
    ['height', 'height'],
    ['alt', 'alt'],
  ],
  video: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
    ['width', 'width'],
    ['height', 'height'],
  ],
} as const satisfies Record<MediaProperty, readonly (readonly [string, string])[]>;

const MIME_TYPE_RE = /^[a-z\d][\w!#$&^.+-]*\/[a-z\d][\w!#$&^.+-]*$/i;

const MIME_TYPE_EXAMPLES = {
  audio: 'audio/mpeg',
  image: 'image/jpeg',
  video: 'video/mp4',
} as const;

const toMediaEntry = (name: string, value: unknown): MetaEntry[] => {
  if (typeof value === 'string' && value.trim().length > 0) {
    return [{ attribute: 'property', name, content: value }];
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return [{ attribute: 'property', name, content: `${value}` }];
  }
  return [];
};

export const normalizeMediaItems = (value: unknown): unknown[] => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export const getMediaUrl = (item: unknown): unknown => {
  if (typeof item === 'string') {
    return item;
  }
  if (item && typeof item === 'object') {
    return (item as MediaObject).url;
  }
  return undefined;
};

export const generateMedia = (property: MediaProperty, value: unknown): MetaEntry[] => normalizeMediaItems(value).flatMap((item) => {
  const url = getMediaUrl(item);
  if (!isNonEmptyString(url)) {
    return [];
  }

  const rootEntries = toMediaEntry(`og:${property}`, url);
  if (!item || typeof item !== 'object') {
    return rootEntries;
  }

  const media = item as MediaObject;
  const structuredEntries = STRUCTURED_FIELDS[property].flatMap(([field, outputField]) => toMediaEntry(`og:${property}:${outputField}`, media[field]));
  return [...rootEntries, ...structuredEntries];
});

const validateMimeType = (issues: ValidationIssue[], property: string, value: unknown, example: string): void => {
  if (value !== undefined && value !== null && (!isNonEmptyString(value) || !MIME_TYPE_RE.test(value))) {
    issues.push(`"${property}" must be a valid MIME type, for example "${example}".`);
  }
};

export const validateMedia = (property: MediaProperty, value: unknown, required = false): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const items = normalizeMediaItems(value);
  if (required && items.length === 0) {
    return ['Required property "og:image" must provide a non-empty URL.'];
  }

  items.forEach((item, index) => {
    const itemProperty = `og:${property}[${index}]`;
    const url = getMediaUrl(item);
    if (!isNonEmptyString(url)) {
      issues.push(`"${itemProperty}.url" must provide a non-empty URL.`);
      return;
    }

    const urlProperty = typeof item === 'string' ? itemProperty : `${itemProperty}.url`;
    validateUrl(issues, urlProperty, url);

    const media = item && typeof item === 'object' ? item as MediaObject : undefined;
    if (media) {
      validateUrl(issues, `${itemProperty}.secure_url`, media.secureUrl);
      validateMimeType(issues, `${itemProperty}.type`, media.type, MIME_TYPE_EXAMPLES[property]);
    }

    if (property === 'image' && !isNonEmptyString(media?.alt)) {
      issues.push(`"${itemProperty}.alt" should be provided to describe the image.`);
    }
  });

  return issues;
};
