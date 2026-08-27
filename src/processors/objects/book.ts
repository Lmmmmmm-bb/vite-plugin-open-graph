import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { BookObjectOptions } from '../../types/index.ts';

import { createMetaEmitter } from '../../core/meta.ts';
import { processFields } from '../../core/processor.ts';
import { validateDateTime, validateReferences } from './common.ts';

const emitBook = createMetaEmitter('property', 'book');

const BOOK_FIELDS = {
  author: value => emitBook('author', value),
  isbn: value => emitBook('isbn', value),
  releaseDate: value => emitBook('release_date', value),
  tag: value => emitBook('tag', value),
} satisfies Record<Exclude<keyof BookObjectOptions, 'type'>, FieldHandler>;

const validateBook = (options: BookObjectOptions): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  issues.push(...validateReferences('book:author', options.author));
  validateDateTime(issues, 'book:release_date', options.releaseDate);

  return issues;
};

export const bookProcessor: MetadataProcessor<BookObjectOptions> = {
  generate: options => processFields(options, BOOK_FIELDS),
  validate: validateBook,
};
