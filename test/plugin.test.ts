import type { Options } from '../src/index.ts';

import { mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { build, createLogger } from 'vite';
import { describe, expect, it } from 'vitest';

import ogPlugin from '../src/index.ts';
import { ogOptions } from './constant.ts';

const buildHtml = async (options: Options): Promise<{ html: string; warnings: string[] }> => {
  const root = await realpath(await mkdtemp(join(tmpdir(), 'vite-plugin-open-graph-')));
  const logger = createLogger('silent');
  const warnings: string[] = [];
  const warn = logger.warn;
  logger.warn = (message, options) => {
    warnings.push(message);
    warn(message, options);
  };

  try {
    await writeFile(join(root, 'index.html'), '<!doctype html><html><head><title>Fixture</title></head><body></body></html>');
    await build({
      build: {
        outDir: join(root, 'dist'),
      },
      configFile: false,
      customLogger: logger,
      logLevel: 'silent',
      plugins: [ogPlugin(options)],
      root,
    });
    return {
      html: await readFile(join(root, 'dist/index.html'), 'utf8'),
      warnings,
    };
  } finally {
    await rm(root, { force: true, recursive: true });
  }
};

describe('vite plugin integration', () => {
  it('injects valid Open Graph, Twitter, and Facebook tags into built HTML', async () => {
    const { html, warnings } = await buildHtml({
      ...ogOptions,
      basic: {
        ...ogOptions.basic,
        description: 'Rock & "Roll"',
        determiner: undefined,
      },
    });

    expect(html).toContain('<meta property="og:type" content="website">');
    expect(html).toContain('<meta property="og:image" content="https://lmmmmmm.me/avatar.png">');
    expect(html).toContain('<meta property="og:image:alt" content="Portrait of _lmmmmmm">');
    expect(html).toContain('<meta property="og:description" content="Rock &amp; &quot;Roll&quot;">');
    expect(html).toContain('<meta name="twitter:image" content="https://lmmmmmm.me/avatar.png">');
    expect(html).toContain('<meta property="fb:app_id" content="123456">');
    expect(html).not.toContain('og:determiner');
    expect(html).not.toContain('undefined');
    expect(warnings).toEqual([]);
  });

  it('warns without blocking the Vite build for invalid metadata', async () => {
    const { html, warnings } = await buildHtml({
      basic: {
        title: 'Incomplete metadata',
      },
    });

    expect(html).toContain('<meta property="og:title" content="Incomplete metadata">');
    expect(warnings.join('\n')).toMatch(/Required property "og:type"/);
    expect(warnings.join('\n')).toMatch(/Required property "og:url"/);
  });

  it('keeps string images compatible and warns when alt text is missing', async () => {
    const { html, warnings } = await buildHtml({
      basic: {
        title: 'String image',
        type: 'website',
        url: 'https://example.com',
        image: 'https://example.com/cover.jpg',
      },
    });

    expect(html).toContain('<meta property="og:image" content="https://example.com/cover.jpg">');
    expect(warnings.join('\n')).toMatch(/"og:image\[0\]\.alt" should be provided/);
  });

  it('keeps multiple image roots and structured properties grouped in built HTML', async () => {
    const { html, warnings } = await buildHtml({
      basic: {
        title: 'Multiple images',
        type: 'website',
        url: 'https://example.com',
        image: [
          {
            width: 1200,
            url: 'https://example.com/first.jpg',
            alt: 'First image',
          },
          {
            height: 800,
            url: 'https://example.com/second.jpg',
            alt: 'Second image',
          },
        ],
      },
    });

    const orderedTags = [
      '<meta property="og:image" content="https://example.com/first.jpg">',
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:alt" content="First image">',
      '<meta property="og:image" content="https://example.com/second.jpg">',
      '<meta property="og:image:height" content="800">',
      '<meta property="og:image:alt" content="Second image">',
    ];
    const positions = orderedTags.map(tag => html.indexOf(tag));

    expect(positions.every(position => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(warnings).toEqual([]);
  });

  it('injects object metadata and infers og:type', async () => {
    const { html, warnings } = await buildHtml({
      basic: {
        title: 'Article',
        url: 'https://example.com/article',
        image: {
          url: 'https://example.com/article.jpg',
          alt: 'Article cover',
        },
      },
      object: {
        type: 'article',
        publishedTime: '2026-08-27T10:00:00+08:00',
        author: 'https://example.com/authors/alice',
      },
    });

    expect(html).toContain('<meta property="og:type" content="article">');
    expect(html).toContain('<meta property="article:published_time" content="2026-08-27T10:00:00+08:00">');
    expect(html).toContain('<meta property="article:author" content="https://example.com/authors/alice">');
    expect(warnings).toEqual([]);
  });
});
