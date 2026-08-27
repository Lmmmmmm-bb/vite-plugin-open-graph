import type { HtmlTagDescriptor } from 'vite';

export type MetaAttribute = 'name' | 'property';

export interface MetaEntry {
  attribute: MetaAttribute;
  name: string;
  content: string;
}

export type MetaEmitter = (name: string, value: unknown) => MetaEntry[];

const toContent = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value}`;
  }
  return undefined;
};

export const createMetaEmitter = (attribute: MetaAttribute, prefix: string): MetaEmitter => {
  const emit: MetaEmitter = (name, value) => {
    if (Array.isArray(value)) {
      return value.flatMap(item => emit(name, item));
    }

    const content = toContent(value);
    return content === undefined
      ? []
      : [{ attribute, name: `${prefix}:${name}`, content }];
  };

  return emit;
};

export const renderMetaTags = (entries: MetaEntry[]): HtmlTagDescriptor[] => entries.map(entry => ({
  attrs: {
    [entry.attribute]: entry.name,
    content: entry.content,
  },
  tag: 'meta',
  injectTo: 'head',
}));
