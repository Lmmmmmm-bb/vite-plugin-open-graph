import type { TwitterOptions } from '../src/index.ts';

import { describe, expect, it } from 'vitest';

import { basicProcessor } from '../src/processors/basic.ts';
import { facebookProcessor } from '../src/processors/facebook.ts';
import { processOptions } from '../src/processors/index.ts';
import { twitterProcessor } from '../src/processors/twitter.ts';

describe('metadata processors', () => {
  it('generates basic fields with explicit Open Graph names', () => {
    expect(basicProcessor.generate({
      siteName: 'Example site',
      localeAlternate: ['fr_FR', 'es_ES'],
    })).toEqual([
      { attribute: 'property', name: 'og:site_name', content: 'Example site' },
      { attribute: 'property', name: 'og:locale:alternate', content: 'fr_FR' },
      { attribute: 'property', name: 'og:locale:alternate', content: 'es_ES' },
    ]);
  });

  it('generates Twitter fields and supported app paths explicitly', () => {
    const twitter = {
      siteId: '123456',
      playerWidth: 1200,
      app: {
        name: {
          iphone: 'Example app',
          desktop: 'Ignored platform',
        },
      },
    } as TwitterOptions;

    expect(twitterProcessor.generate(twitter)).toEqual([
      { attribute: 'name', name: 'twitter:site:id', content: '123456' },
      { attribute: 'name', name: 'twitter:player:width', content: '1200' },
      { attribute: 'name', name: 'twitter:app:name:iphone', content: 'Example app' },
    ]);
  });

  it('generates Facebook fields with explicit names', () => {
    expect(facebookProcessor.generate({ appId: 123456 })).toEqual([
      { attribute: 'property', name: 'fb:app_id', content: '123456' },
    ]);
  });

  it('runs section processors in Basic, Twitter, Facebook order', () => {
    expect(processOptions({
      basic: { title: 'Example' },
      twitter: { card: 'summary' },
      facebook: { appId: 123456 },
    }).entries).toEqual([
      { attribute: 'property', name: 'og:title', content: 'Example' },
      { attribute: 'name', name: 'twitter:card', content: 'summary' },
      { attribute: 'property', name: 'fb:app_id', content: '123456' },
    ]);
  });
});
