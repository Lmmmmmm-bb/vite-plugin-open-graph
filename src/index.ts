import type { Plugin } from 'vite'
import { transform } from './transform'
import type { BasicOptions, ExtraOptions, Options, TwitterOptions } from './types'

export { Options, BasicOptions, ExtraOptions, TwitterOptions }

export default (options: Options): Plugin => {
  return {
    name: 'vite-plugin-open-graph',
    transformIndexHtml(html) {
      return { html, tags: transform(options) }
    },
  }
}
