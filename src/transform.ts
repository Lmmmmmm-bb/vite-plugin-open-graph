import type { HtmlTagDescriptor } from 'vite'
import { EXCEPTION_FIELD } from './constant'
import type { Options } from './types'

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
export const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, EXCEPTION_FIELD.includes(attrName) ? '_$1' : ':$1').toLowerCase()

const toAttrs = (name: string, content: number | string | string | Record<string, string | number>, prefix?: string): HtmlTagDescriptor['attrs'] | HtmlTagDescriptor['attrs'][] => {
  const _name = prefix ? `${prefix}:${name}` : name
  const _prefix = prefix ? `${prefix}:${name}` : name

  if (typeof content === 'number')
    return { name: _name, content: `${content}` }

  else if (Array.isArray(content))
    return content.map(item => ({ name: _name, content: item }))

  else if (typeof content === 'object')
    return Object.entries(content).map(([_name, _content]) => toAttrs(camelcase(_name), _content, _prefix)) as HtmlTagDescriptor['attrs'][]

  return { name: _name, content }
}

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic).map(([name, content]) => toAttrs(camelcase(name), content, 'og'))
  const extraOGMetaAttrs = Object.entries(options.extra ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'og'))
  const twitterOGMetaAttrs = Object.entries(options.twitter ?? {}).map(([name, content]) => toAttrs(camelcase(name), content, 'twitter'))

  const attrs = [...basicOGMetaAttrs.flat(), ...extraOGMetaAttrs.flat(), ...twitterOGMetaAttrs.flat()]

  return attrs.map(_attrs => ({
    attrs: _attrs,
    tag: 'meta',
    injectTo: 'head',
  }))
}
