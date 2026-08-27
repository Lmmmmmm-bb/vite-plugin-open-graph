import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { MusicObjectOptions } from '../../types/index.ts';

import { createMetaEmitter } from '../../core/meta.ts';
import { processFields } from '../../core/processor.ts';
import {
  generateStructuredReferences,
  validateDateTime,
  validatePositiveInteger,
  validateReferences,
  validateStructuredPositiveIntegers,
} from './common.ts';

const emitMusic = createMetaEmitter('property', 'music');

const MUSIC_FIELDS = {
  duration: value => emitMusic('duration', value),
  album: value => generateStructuredReferences(emitMusic, 'album', value, [
    ['disc', 'disc'],
    ['track', 'track'],
  ]),
  song: value => generateStructuredReferences(emitMusic, 'song', value, [
    ['disc', 'disc'],
    ['track', 'track'],
  ]),
  musician: value => emitMusic('musician', value),
  releaseDate: value => emitMusic('release_date', value),
  creator: value => emitMusic('creator', value),
} satisfies Record<string, FieldHandler>;

const validateMusic = (options: MusicObjectOptions): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  if (options.type === 'music.song') {
    validatePositiveInteger(issues, 'music:duration', options.duration);
    issues.push(...validateReferences('music:album', options.album));
    validateStructuredPositiveIntegers(issues, 'music:album', options.album, ['disc', 'track']);
    issues.push(...validateReferences('music:musician', options.musician));
  }

  if (options.type === 'music.album') {
    issues.push(...validateReferences('music:song', options.song));
    validateStructuredPositiveIntegers(issues, 'music:song', options.song, ['disc', 'track']);
    issues.push(...validateReferences('music:musician', options.musician));
    validateDateTime(issues, 'music:release_date', options.releaseDate);
  }

  if (options.type === 'music.playlist') {
    issues.push(...validateReferences('music:song', options.song));
    validateStructuredPositiveIntegers(issues, 'music:song', options.song, ['disc', 'track']);
    issues.push(...validateReferences('music:creator', options.creator));
  }

  if (options.type === 'music.radio_station') {
    issues.push(...validateReferences('music:creator', options.creator));
  }

  return issues;
};

export const musicProcessor: MetadataProcessor<MusicObjectOptions> = {
  generate: options => processFields(options, MUSIC_FIELDS),
  validate: validateMusic,
};
