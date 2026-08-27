import type { Plugin } from 'vite';

import type {
  AudioInput,
  AudioOptions,
  BasicOptions,
  FacebookOptions,
  ImageInput,
  ImageOptions,
  OneOrMany,
  Options,
  TwitterOptions,
  VideoInput,
  VideoOptions,
} from './types/index.ts';
import { transform } from './transform.ts';
import { formatValidationIssues, validateOptions } from './validate.ts';

export default (options: Options = {}): Plugin => {
  return {
    name: 'vite-plugin-open-graph',
    configResolved(config) {
      const issues = validateOptions(options);
      if (issues.length === 0) {
        return;
      }

      config.logger.warn(formatValidationIssues(issues));
    },
    transformIndexHtml(html) {
      return { html, tags: transform(options) };
    },
  };
};

export type {
  AudioInput,
  AudioOptions,
  BasicOptions,
  FacebookOptions,
  ImageInput,
  ImageOptions,
  OneOrMany,
  Options,
  TwitterOptions,
  VideoInput,
  VideoOptions,
};
