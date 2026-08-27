import { describe, expect, it } from 'vitest';

import { validateOptions } from '../src/validate.ts';
import { ogOptions } from './constant.ts';

describe('validateOptions function', () => {
  it('accepts a complete Open Graph configuration', () => {
    expect(validateOptions(ogOptions)).toEqual([]);
  });

  it('does not require basic metadata for Twitter or Facebook-only usage', () => {
    expect(validateOptions({ twitter: { card: 'summary' } })).toEqual([]);
    expect(validateOptions({ facebook: { appId: 123456 } })).toEqual([]);
  });

  it('reports missing required Open Graph properties', () => {
    expect(validateOptions({ basic: {} })).toEqual([
      'Required property "og:title" must be a non-empty string.',
      'Required property "og:type" must be a non-empty string.',
      'Required property "og:url" must be a non-empty string.',
      'Required property "og:image" must provide a non-empty URL.',
    ]);
  });

  it('reports invalid URLs and MIME types', () => {
    expect(validateOptions({
      basic: {
        title: 'Invalid example',
        type: 'website',
        url: '/relative-url',
        image: {
          url: 'ftp://example.com/image.png',
          type: 'image.png',
          alt: 'Invalid image URL',
        },
        audio: {
          url: 'audio.mp3',
          type: 'video.movie',
        },
      },
    })).toEqual([
      '"og:url" must be an absolute HTTP(S) URL.',
      '"og:image[0].url" must be an absolute HTTP(S) URL.',
      '"og:image[0].type" must be a valid MIME type, for example "image/jpeg".',
      '"og:audio[0].url" must be an absolute HTTP(S) URL.',
      '"og:audio[0].type" must be a valid MIME type, for example "audio/mpeg".',
    ]);
  });

  it('does not duplicate warnings for empty required URLs', () => {
    const issues = validateOptions({
      basic: {
        title: 'Empty image URL',
        type: 'website',
        url: 'https://example.com',
        image: { url: '' },
      },
    });

    expect(issues).toEqual(['"og:image[0].url" must provide a non-empty URL.']);
  });

  it('reports missing alt text for each image item', () => {
    const issues = validateOptions({
      basic: {
        title: 'Multiple images',
        type: 'website',
        url: 'https://example.com',
        image: [
          'https://example.com/first.jpg',
          { url: 'https://example.com/second.jpg' },
          { url: 'https://example.com/third.jpg', alt: 'Third image' },
        ],
      },
    });

    expect(issues).toEqual([
      '"og:image[0].alt" should be provided to describe the image.',
      '"og:image[1].alt" should be provided to describe the image.',
    ]);
  });
});
