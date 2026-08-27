import type { OneOrMany } from '../og.ts';
import type { ObjectReference } from './common.ts';

export interface ArticleObjectOptions {
  type: 'article';
  /** ISO 8601 date or date-time when the article was first published. */
  publishedTime?: string;
  /** ISO 8601 date or date-time when the article was last changed. */
  modifiedTime?: string;
  /** ISO 8601 date or date-time after which the article is out of date. */
  expirationTime?: string;
  /** URLs of profile objects representing the article's writers. */
  author?: OneOrMany<ObjectReference>;
  /** A high-level section name, for example Technology. */
  section?: string;
  /** Tag words associated with the article. */
  tag?: OneOrMany<string>;
}
