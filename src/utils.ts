import type { HtmlTagDescriptor } from 'vite';

import { EXCEPTION_FIELD } from './constant.ts';

/**
 * transform `siteName` to `site:name`
 * @param attrName name
 * @returns join by ':'
 */
export const camelcase = (attrName: string) => attrName.replace(/([A-Z])/g, EXCEPTION_FIELD.includes(attrName) ? '_$1' : ':$1').toLowerCase();

type MetaAttrs = NonNullable<HtmlTagDescriptor['attrs']>;

export const toAttrs = (name: string, content: unknown, field: 'name' | 'property', prefix?: string): MetaAttrs[] => {
  const _name = prefix ? `${prefix}:${name}` : name;

  if (content === undefined || content === null) {
    return [];
  }
  if (typeof content === 'number') {
    return Number.isFinite(content) ? [{ [field]: _name, content: `${content}` }] : [];
  }
  if (typeof content === 'string') {
    return [{ [field]: _name, content }];
  }
  if (Array.isArray(content)) {
    return content.flatMap(_content => toAttrs(name, _content, field, prefix));
  }
  if (typeof content === 'object') {
    return Object.entries(content).flatMap(([key, value]) => toAttrs(camelcase(key), value, field, _name));
  }

  return [];
};
