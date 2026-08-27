import { describe, expect, it } from 'vitest';

import { createMetaEmitter, renderMetaTags } from '../src/core/meta.ts';

describe('meta emitter', () => {
  it('emits scalar and repeated values for one namespace', () => {
    const emitOpenGraph = createMetaEmitter('property', 'og');

    expect(emitOpenGraph('locale:alternate', ['fr_FR', 'es_ES'])).toEqual([
      { attribute: 'property', name: 'og:locale:alternate', content: 'fr_FR' },
      { attribute: 'property', name: 'og:locale:alternate', content: 'es_ES' },
    ]);
    expect(emitOpenGraph('image:width', 1200)).toEqual([
      { attribute: 'property', name: 'og:image:width', content: '1200' },
    ]);
  });

  it('skips nullish, non-finite, object, and boolean values', () => {
    const emitTwitter = createMetaEmitter('name', 'twitter');

    expect(emitTwitter('title', undefined)).toEqual([]);
    expect(emitTwitter('title', null)).toEqual([]);
    expect(emitTwitter('width', Number.NaN)).toEqual([]);
    expect(emitTwitter('app', { name: 'Unsupported object' })).toEqual([]);
    expect(emitTwitter('enabled', true)).toEqual([]);
  });

  it('renders protocol-independent entries as Vite meta descriptors', () => {
    expect(renderMetaTags([
      { attribute: 'property', name: 'og:title', content: 'Example' },
      { attribute: 'name', name: 'twitter:card', content: 'summary' },
    ])).toEqual([
      {
        attrs: { property: 'og:title', content: 'Example' },
        tag: 'meta',
        injectTo: 'head',
      },
      {
        attrs: { name: 'twitter:card', content: 'summary' },
        tag: 'meta',
        injectTo: 'head',
      },
    ]);
  });
});
