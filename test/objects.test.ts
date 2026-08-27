import type { OpenGraphObjectOptions } from '../src/index.ts';

import { describe, expect, it } from 'vitest';

import { processOptions } from '../src/processors/index.ts';
import { objectProcessor } from '../src/processors/objects/index.ts';

const SUPPORTED_OBJECTS: OpenGraphObjectOptions[] = [
  { type: 'website' },
  { type: 'profile' },
  { type: 'article' },
  { type: 'book' },
  { type: 'music.song' },
  { type: 'music.album' },
  { type: 'music.playlist' },
  { type: 'music.radio_station' },
  { type: 'video.movie' },
  { type: 'video.episode' },
  { type: 'video.tv_show' },
  { type: 'video.other' },
];

describe('open Graph object processors', () => {
  it.each(SUPPORTED_OBJECTS)('supports the $type object type', (object) => {
    const typeEntries = processOptions({ object }).entries.filter(entry => entry.name === 'og:type');

    expect(typeEntries).toEqual([
      { attribute: 'property', name: 'og:type', content: object.type },
    ]);
  });

  it('generates article metadata and repeated values', () => {
    expect(objectProcessor.generate({
      type: 'article',
      publishedTime: '2026-08-27T10:00:00+08:00',
      author: [
        'https://example.com/authors/alice',
        'https://example.com/authors/bob',
      ],
      section: 'Technology',
      tag: ['Vite', 'Open Graph'],
    })).toEqual([
      { attribute: 'property', name: 'article:published_time', content: '2026-08-27T10:00:00+08:00' },
      { attribute: 'property', name: 'article:author', content: 'https://example.com/authors/alice' },
      { attribute: 'property', name: 'article:author', content: 'https://example.com/authors/bob' },
      { attribute: 'property', name: 'article:section', content: 'Technology' },
      { attribute: 'property', name: 'article:tag', content: 'Vite' },
      { attribute: 'property', name: 'article:tag', content: 'Open Graph' },
    ]);
  });

  it('generates profile and book namespaces', () => {
    expect(objectProcessor.generate({
      type: 'profile',
      firstName: 'Alice',
      lastName: 'Example',
      username: 'alice',
      gender: 'female',
    })).toEqual([
      { attribute: 'property', name: 'profile:first_name', content: 'Alice' },
      { attribute: 'property', name: 'profile:last_name', content: 'Example' },
      { attribute: 'property', name: 'profile:username', content: 'alice' },
      { attribute: 'property', name: 'profile:gender', content: 'female' },
    ]);

    expect(objectProcessor.generate({
      type: 'book',
      author: 'https://example.com/authors/alice',
      isbn: '978-3-16-148410-0',
      releaseDate: '2026-08-27',
      tag: ['Metadata'],
    })).toEqual([
      { attribute: 'property', name: 'book:author', content: 'https://example.com/authors/alice' },
      { attribute: 'property', name: 'book:isbn', content: '978-3-16-148410-0' },
      { attribute: 'property', name: 'book:release_date', content: '2026-08-27' },
      { attribute: 'property', name: 'book:tag', content: 'Metadata' },
    ]);
  });

  it('keeps video actor roles next to their actor URLs', () => {
    expect(objectProcessor.generate({
      type: 'video.episode',
      actor: [
        {
          url: 'https://example.com/actors/alice',
          role: 'Lead',
        },
        'https://example.com/actors/bob',
      ],
      duration: 1800,
      series: 'https://example.com/shows/example',
    })).toEqual([
      { attribute: 'property', name: 'video:actor', content: 'https://example.com/actors/alice' },
      { attribute: 'property', name: 'video:actor:role', content: 'Lead' },
      { attribute: 'property', name: 'video:actor', content: 'https://example.com/actors/bob' },
      { attribute: 'property', name: 'video:duration', content: '1800' },
      { attribute: 'property', name: 'video:series', content: 'https://example.com/shows/example' },
    ]);
  });

  it('keeps music disc and track properties next to each reference', () => {
    expect(objectProcessor.generate({
      type: 'music.song',
      duration: 240,
      album: [
        {
          url: 'https://example.com/albums/first',
          disc: 1,
          track: 2,
        },
        {
          url: 'https://example.com/albums/second',
          track: 4,
        },
      ],
      musician: 'https://example.com/artists/alice',
    })).toEqual([
      { attribute: 'property', name: 'music:duration', content: '240' },
      { attribute: 'property', name: 'music:album', content: 'https://example.com/albums/first' },
      { attribute: 'property', name: 'music:album:disc', content: '1' },
      { attribute: 'property', name: 'music:album:track', content: '2' },
      { attribute: 'property', name: 'music:album', content: 'https://example.com/albums/second' },
      { attribute: 'property', name: 'music:album:track', content: '4' },
      { attribute: 'property', name: 'music:musician', content: 'https://example.com/artists/alice' },
    ]);
  });

  it('uses object.type once and places object metadata before social metadata', () => {
    expect(processOptions({
      basic: { title: 'Article', type: 'website' },
      object: { type: 'article', section: 'Technology' },
      twitter: { card: 'summary' },
      facebook: { appId: 123456 },
    }).entries).toEqual([
      { attribute: 'property', name: 'og:title', content: 'Article' },
      { attribute: 'property', name: 'og:type', content: 'article' },
      { attribute: 'property', name: 'article:section', content: 'Technology' },
      { attribute: 'name', name: 'twitter:card', content: 'summary' },
      { attribute: 'property', name: 'fb:app_id', content: '123456' },
    ]);
  });

  it('infers og:type from object configuration', () => {
    const entries = processOptions({
      basic: { title: 'Article' },
      object: { type: 'article' },
    }).entries;

    expect(entries.filter(entry => entry.name === 'og:type')).toEqual([
      { attribute: 'property', name: 'og:type', content: 'article' },
    ]);
  });

  it('narrows fields based on the object type', () => {
    const article = {
      type: 'article',
      section: 'Technology',
    } satisfies OpenGraphObjectOptions;

    expect(article.type).toBe('article');

    const invalidArticle = {
      type: 'article',
      // @ts-expect-error duration belongs to music and video object types
      duration: 120,
    } satisfies OpenGraphObjectOptions;
    expect(invalidArticle.type).toBe('article');
  });
});
