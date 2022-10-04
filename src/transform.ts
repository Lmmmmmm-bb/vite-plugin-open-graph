import type { HtmlTagDescriptor } from 'vite'
import type { Options } from './types'
import { camelcase, toAttrs } from './utils'

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'og'))
  const twitterOGMetaAttrs = Object.entries(options.twitter ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'twitter'))

  const attrs = [...basicOGMetaAttrs.flat(), ...twitterOGMetaAttrs.flat(3)]

  return attrs.map(_attrs => ({
    attrs: _attrs,
    tag: 'meta',
    injectTo: 'head',
  }))
}
