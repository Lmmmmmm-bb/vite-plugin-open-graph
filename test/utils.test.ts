import { describe, expect, it } from 'vitest';

import { camelcase, toAttrs } from '../src/utils.ts';

describe('camelcase function', () => {
  it('lowercase name', () => {
    expect(camelcase('hi')).toEqual('hi');
    expect(camelcase('name')).toEqual('name');
  });

  it('normal name', () => {
    expect(camelcase('helloWorld')).toEqual('hello:world');
    expect(camelcase('localeAlternate')).toEqual('locale:alternate');
    expect(camelcase('playerWidth')).toEqual('player:width');
  });

  it('exception field name', () => {
    expect(camelcase('secureUrl')).toEqual('secure_url');
    expect(camelcase('siteName')).toEqual('site_name');
    expect(camelcase('appId')).toEqual('app_id');
  });

  it('empty string', () => {
    expect(camelcase('')).toEqual('');
  });
});

describe('toAttrs function', () => {
  it('transforms nested and array values', () => {
    expect(toAttrs('locale:alternate', ['fr_FR', 'es_ES'], 'property', 'og')).toEqual([
      { property: 'og:locale:alternate', content: 'fr_FR' },
      { property: 'og:locale:alternate', content: 'es_ES' },
    ]);
    expect(toAttrs('app', { name: { iphone: 'App name' } }, 'name', 'twitter')).toEqual([
      { name: 'twitter:app:name:iphone', content: 'App name' },
    ]);
  });

  it('skips nullish, non-finite, and unsupported values', () => {
    expect(toAttrs('title', undefined, 'property', 'og')).toEqual([]);
    expect(toAttrs('title', null, 'property', 'og')).toEqual([]);
    expect(toAttrs('width', Number.NaN, 'property', 'og:image')).toEqual([]);
    expect(toAttrs('enabled', true, 'property', 'og')).toEqual([]);
  });
});
