import type { HtmlTagDescriptor } from 'vite'
import { EXCEPTION_FIELD } from './constant'

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
export const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, EXCEPTION_FIELD.includes(attrName) ? '_$1' : ':$1').toLowerCase()

export const toAttrs = (name: string, content: number | string | string | Record<string, string | number>, prefix?: string): HtmlTagDescriptor['attrs'] | HtmlTagDescriptor['attrs'][] => {
  const _name = prefix ? `${prefix}:${name}` : name

  if (typeof content === 'number')
    return { name: _name, content: `${content}` }

  else if (Array.isArray(content))
    return content.map(item => ({ name: _name, content: item }))

  else if (typeof content === 'object')
    return Object.entries(content).map(([_name, _content]) => toAttrs(camelcase(_name), _content, _name)) as HtmlTagDescriptor['attrs'][]

  return { name: _name, content }
}
