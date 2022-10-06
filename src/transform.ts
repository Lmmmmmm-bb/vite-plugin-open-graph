import type { HtmlTagDescriptor } from 'vite'
import type { Options } from './types'
import { camelcase, toAttrs } from './utils'

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'property', 'og'))
  const twitterOGMetaAttrs = Object.entries(options.twitter ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'name', 'twitter'))
  const facebookOGMetaAttrs = Object.entries(options.facebook ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'name', 'fb'))

  const attrs = [...basicOGMetaAttrs.flat(), ...twitterOGMetaAttrs.flat(3), ...facebookOGMetaAttrs.flat()]

  return attrs.map(_attrs => ({
    attrs: _attrs,
    tag: 'meta',
    injectTo: 'head',
  }))
}
