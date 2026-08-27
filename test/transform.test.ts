import { describe, expect, it } from 'vitest';

import { transform } from '../src/transform.ts';
import { ogOptions } from './constant.ts';

const getAttrs = (options: Parameters<typeof transform>[0]) => transform(options).map(tag => tag.attrs);

describe('transform function', () => {
  it('matches the complete configuration snapshot', () => {
    expect(transform(ogOptions)).toMatchSnapshot();
  });

  it('always emits a media root before its structured properties', () => {
    expect(getAttrs({
      basic: {
        image: {
          width: 1200,
          alt: 'Website cover',
          url: 'https://example.com/cover.jpg',
          height: 630,
          type: 'image/jpeg',
          secureUrl: 'https://example.com/cover-secure.jpg',
        },
      },
    })).toEqual([
      { property: 'og:image', content: 'https://example.com/cover.jpg' },
      { property: 'og:image:secure_url', content: 'https://example.com/cover-secure.jpg' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Website cover' },
    ]);
  });

  it('preserves media array order and groups structured properties', () => {
    expect(getAttrs({
      basic: {
        image: [
          {
            url: 'https://example.com/first.jpg',
            width: 1200,
            alt: 'First image',
          },
          {
            height: 800,
            url: 'https://example.com/second.jpg',
            alt: 'Second image',
          },
        ],
        audio: [
          'https://example.com/theme.mp3',
          {
            type: 'audio/mpeg',
            url: 'https://example.com/interview.mp3',
          },
        ],
        video: [
          {
            height: 720,
            url: 'https://example.com/movie.mp4',
            width: 1280,
          },
        ],
      },
    })).toEqual([
      { property: 'og:image', content: 'https://example.com/first.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:alt', content: 'First image' },
      { property: 'og:image', content: 'https://example.com/second.jpg' },
      { property: 'og:image:height', content: '800' },
      { property: 'og:image:alt', content: 'Second image' },
      { property: 'og:audio', content: 'https://example.com/theme.mp3' },
      { property: 'og:audio', content: 'https://example.com/interview.mp3' },
      { property: 'og:audio:type', content: 'audio/mpeg' },
      { property: 'og:video', content: 'https://example.com/movie.mp4' },
      { property: 'og:video:width', content: '1280' },
      { property: 'og:video:height', content: '720' },
    ]);
  });

  it('skips media objects without a root URL', () => {
    expect(getAttrs({
      basic: {
        image: {
          width: 1200,
          alt: 'Orphaned metadata',
        },
      },
    })).toEqual([]);
  });
});
