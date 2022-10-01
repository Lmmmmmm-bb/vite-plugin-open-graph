import type { HtmlTagDescriptor } from 'vite'
import type { Options } from './types'

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
export const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, ':$1').toLowerCase()

const toAttrs = (name: string, content: number | string | string) => {
  if (typeof content === 'number')
    return { name, content: `${content}` }

  else if (Array.isArray(content))
    return content.map(item => ({ name, content: item }))

  return { name, content }
}

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic).map(([name, content]) => toAttrs(camelcase(name), content))
  const extraOGMetaAttrs = Object.entries(options.extra ?? {}).map(([name, content]) => toAttrs(camelcase(name), content))

  const metas = [...basicOGMetaAttrs.flat(), ...extraOGMetaAttrs.flat()]

  return metas.map(attrs => ({
    attrs,
    tag: 'meta',
    injectTo: 'head',
  }))
}
