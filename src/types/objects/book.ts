import type { OneOrMany } from '../og.ts';
import type { ObjectReference } from './common.ts';

export interface BookObjectOptions {
  type: 'book';
  /** URLs of profile objects representing the book's authors. */
  author?: OneOrMany<ObjectReference>;
  isbn?: string;
  /** ISO 8601 date or date-time when the book was released. */
  releaseDate?: string;
  tag?: OneOrMany<string>;
}
