import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { VideoObjectOptions } from '../../types/index.ts';

import { createMetaEmitter } from '../../core/meta.ts';
import { processFields } from '../../core/processor.ts';
import {
  generateStructuredReferences,
  validateDateTime,
  validatePositiveInteger,
  validateReferences,
} from './common.ts';

const emitVideo = createMetaEmitter('property', 'video');

const VIDEO_FIELDS = {
  actor: value => generateStructuredReferences(emitVideo, 'actor', value, [['role', 'role']]),
  director: value => emitVideo('director', value),
  writer: value => emitVideo('writer', value),
  duration: value => emitVideo('duration', value),
  releaseDate: value => emitVideo('release_date', value),
  tag: value => emitVideo('tag', value),
  series: value => emitVideo('series', value),
} satisfies Record<string, FieldHandler>;

const validateVideo = (options: VideoObjectOptions): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  issues.push(...validateReferences('video:actor', options.actor));
  issues.push(...validateReferences('video:director', options.director));
  issues.push(...validateReferences('video:writer', options.writer));
  validatePositiveInteger(issues, 'video:duration', options.duration);
  validateDateTime(issues, 'video:release_date', options.releaseDate);
  if (options.type === 'video.episode') {
    issues.push(...validateReferences('video:series', options.series));
  }

  return issues;
};

export const videoProcessor: MetadataProcessor<VideoObjectOptions> = {
  generate: options => processFields(options, VIDEO_FIELDS),
  validate: validateVideo,
};
