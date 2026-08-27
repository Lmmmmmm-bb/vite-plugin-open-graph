import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { ArticleObjectOptions } from '../../types/index.ts';

import { createMetaEmitter } from '../../core/meta.ts';
import { processFields } from '../../core/processor.ts';
import { validateDateTime, validateReferences } from './common.ts';

const emitArticle = createMetaEmitter('property', 'article');

const ARTICLE_FIELDS = {
  publishedTime: value => emitArticle('published_time', value),
  modifiedTime: value => emitArticle('modified_time', value),
  expirationTime: value => emitArticle('expiration_time', value),
  author: value => emitArticle('author', value),
  section: value => emitArticle('section', value),
  tag: value => emitArticle('tag', value),
} satisfies Record<Exclude<keyof ArticleObjectOptions, 'type'>, FieldHandler>;

const validateArticle = (options: ArticleObjectOptions): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  validateDateTime(issues, 'article:published_time', options.publishedTime);
  validateDateTime(issues, 'article:modified_time', options.modifiedTime);
  validateDateTime(issues, 'article:expiration_time', options.expirationTime);
  issues.push(...validateReferences('article:author', options.author));

  return issues;
};

export const articleProcessor: MetadataProcessor<ArticleObjectOptions> = {
  generate: options => processFields(options, ARTICLE_FIELDS),
  validate: validateArticle,
};
