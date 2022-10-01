import type { HtmlTagDescriptor } from 'vite'
import type { Options } from './types'

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, ':$1').toLowerCase()

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic).map(([name, content]) => ({ name: camelcase(name), content }))
  const extraOGMetaAttrs = Object.entries(options.extra ?? {}).map(([name, content]) => ({ name: camelcase(name), content }))

  const metas = [...basicOGMetaAttrs, ...extraOGMetaAttrs]

  return metas.map(attrs => ({
    attrs,
    tag: 'meta',
    injectTo: 'head',
  }))
}
