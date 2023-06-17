import type { Plugin } from 'vite';
import { transform } from './transform';
import type { BasicOptions, FacebookOptions, Options, TwitterOptions } from './types';

export default (options?: Options): Plugin => ({
  name: 'vite-plugin-open-graph',
  transformIndexHtml(html) {
    return { html, tags: transform(options ?? {}) };
  },
});

export type { Options, BasicOptions, TwitterOptions, FacebookOptions };
