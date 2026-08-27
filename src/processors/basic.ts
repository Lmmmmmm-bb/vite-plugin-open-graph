import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../core/processor.ts';

import type { BasicOptions } from '../types/index.ts';
import { createMetaEmitter } from '../core/meta.ts';
import { processFields } from '../core/processor.ts';
import { isHttpUrl, isNonEmptyString } from '../core/validation.ts';
import { generateMedia, validateMedia } from './media.ts';

const emitOpenGraph = createMetaEmitter('property', 'og');

const BASIC_FIELDS = {
  title: value => emitOpenGraph('title', value),
  type: value => emitOpenGraph('type', value),
  image: value => generateMedia('image', value),
  url: value => emitOpenGraph('url', value),
  audio: value => generateMedia('audio', value),
  description: value => emitOpenGraph('description', value),
  determiner: value => emitOpenGraph('determiner', value),
  locale: value => emitOpenGraph('locale', value),
  localeAlternate: value => emitOpenGraph('locale:alternate', value),
  siteName: value => emitOpenGraph('site_name', value),
  video: value => generateMedia('video', value),
} satisfies Record<keyof BasicOptions, FieldHandler>;

const validateBasic = (options: BasicOptions): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyString(options.title)) {
    issues.push('Required property "og:title" must be a non-empty string.');
  }
  if (!isNonEmptyString(options.type)) {
    issues.push('Required property "og:type" must be a non-empty string.');
  }
  if (!isNonEmptyString(options.url)) {
    issues.push('Required property "og:url" must be a non-empty string.');
  } else if (!isHttpUrl(options.url)) {
    issues.push('"og:url" must be an absolute HTTP(S) URL.');
  }

  issues.push(...validateMedia('image', options.image, true));
  issues.push(...validateMedia('audio', options.audio));
  issues.push(...validateMedia('video', options.video));

  return issues;
};

export const basicProcessor: MetadataProcessor<BasicOptions> = {
  generate: options => processFields(options, BASIC_FIELDS),
  validate: validateBasic,
};
