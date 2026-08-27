import type { MetaEntry } from '../../core/meta.ts';
import type { MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { OpenGraphObjectOptions } from '../../types/index.ts';

import { articleProcessor } from './article.ts';
import { bookProcessor } from './book.ts';
import { musicProcessor } from './music.ts';
import { profileProcessor } from './profile.ts';
import { videoProcessor } from './video.ts';

const ignoreUnsupportedObject = (_options: never): MetaEntry[] => [];

const reportUnsupportedObject = (options: never): ValidationIssue[] => {
  const objectType = (options as unknown as { type?: unknown }).type;
  return [`Unsupported Open Graph object type "${String(objectType)}".`];
};

const generateObject = (options: OpenGraphObjectOptions): MetaEntry[] => {
  switch (options.type) {
    case 'website':
      return [];
    case 'profile':
      return profileProcessor.generate(options);
    case 'article':
      return articleProcessor.generate(options);
    case 'book':
      return bookProcessor.generate(options);
    case 'music.song':
    case 'music.album':
    case 'music.playlist':
    case 'music.radio_station':
      return musicProcessor.generate(options);
    case 'video.movie':
    case 'video.episode':
    case 'video.tv_show':
    case 'video.other':
      return videoProcessor.generate(options);
    default:
      return ignoreUnsupportedObject(options);
  }
};

const validateObject = (options: OpenGraphObjectOptions): ValidationIssue[] => {
  switch (options.type) {
    case 'website':
      return [];
    case 'profile':
      return profileProcessor.validate(options);
    case 'article':
      return articleProcessor.validate(options);
    case 'book':
      return bookProcessor.validate(options);
    case 'music.song':
    case 'music.album':
    case 'music.playlist':
    case 'music.radio_station':
      return musicProcessor.validate(options);
    case 'video.movie':
    case 'video.episode':
    case 'video.tv_show':
    case 'video.other':
      return videoProcessor.validate(options);
    default:
      return reportUnsupportedObject(options);
  }
};

export const objectProcessor: MetadataProcessor<OpenGraphObjectOptions> = {
  generate: generateObject,
  validate: validateObject,
};
