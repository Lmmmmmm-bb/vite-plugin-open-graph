import type { MetaEntry } from './meta.ts';

export type ValidationIssue = string;

export interface MetadataProcessor<T> {
  generate: (options: T) => MetaEntry[];
  validate: (options: T) => ValidationIssue[];
}

export type FieldHandler = (value: unknown) => MetaEntry[];

export const processFields = (options: object, handlers: Readonly<Record<string, FieldHandler>>): MetaEntry[] => Object.entries(options).flatMap(([field, value]) => handlers[field]?.(value) ?? []);
