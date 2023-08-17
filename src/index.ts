import type { Plugin } from 'vite';

import type {
  BasicOptions,
  FacebookOptions,
  Options,
  TwitterOptions,
} from './types/index.ts';
import { transform } from './transform.ts';

export default (options?: Options): Plugin => ({
  name: 'vite-plugin-open-graph',
  transformIndexHtml(html) {
    return { html, tags: transform(options || {}) };
  },
});

export type { Options, BasicOptions, TwitterOptions, FacebookOptions };
