import type { Plugin } from 'vite'
import { transform } from './transform'
import type { BasicOptions, Options, TwitterOptions } from './types'

export default (options?: Options): Plugin => {
  return {
    name: 'vite-plugin-open-graph',
    transformIndexHtml(html) {
      return { html, tags: transform(options ?? {}) }
    },
  }
}

export { Options, BasicOptions, TwitterOptions }
