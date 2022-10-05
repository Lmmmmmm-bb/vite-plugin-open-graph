import type { HtmlTagDescriptor } from 'vite'
import { EXCEPTION_FIELD } from './constant'

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
export const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, EXCEPTION_FIELD.includes(attrName) ? '_$1' : ':$1').toLowerCase()

export const toAttrs = (name: string, content: number | string | string | Record<string, string | number>, field: 'name' | 'property', prefix?: string): HtmlTagDescriptor['attrs'] | HtmlTagDescriptor['attrs'][] => {
  const _name = prefix ? `${prefix}:${name}` : name

  if (typeof content === 'number')
    return { [field]: _name, content: `${content}` }

  else if (Array.isArray(content))
    return content.map(_content => ({ [field]: _name, content: _content }))

  else if (typeof content === 'object')
    return Object.entries(content).map(([key, value]) => toAttrs(camelcase(key), value, field, _name)) as HtmlTagDescriptor['attrs'][]

  return { [field]: _name, content }
}
