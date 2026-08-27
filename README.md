# vite-plugin-open-graph

[![GitHub license](https://img.shields.io/github/license/Lmmmmmm-bb/vite-plugin-open-graph)](https://github.com/Lmmmmmm-bb/vite-plugin-open-graph/blob/main/LICENSE)
[![release](https://img.shields.io/github/v/release/Lmmmmmm-bb/vite-plugin-open-graph)](https://github.com/Lmmmmmm-bb/vite-plugin-open-graph/releases)

Generate Open Graph meta tags with simple configuration for your Vite app.

## Features

- Twitter Card and Facebook support.
- First-class type support.
- Ordered structured metadata and multiple images, audio files, or videos.
- Non-blocking validation warnings for required Open Graph properties, URLs, and MIME types.

## Install

```bash
npm i vite-plugin-open-graph -D
```

```ts
import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph';

export default defineConfig({
  plugins: [
    ogPlugin({
      // your Open Graph information config
    })
  ],
});
```

<details>
<summary>Example</summary>

```ts
import type { Options } from 'vite-plugin-open-graph';
import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph';

const ogOptions: Options = {
  basic: {
    url: 'https://lmmmmmm.me',
    title: '_lmmmmmm',
    type: 'website',
    image: {
      url: 'https://lmmmmmm.me/avatar.png',
      alt: 'Portrait of _lmmmmmm',
    },
    determiner: 'auto',
    description: '_lmmmmmm, Front-end Developer.',
    locale: 'zh_CN',
    localeAlternate: ['fr_FR', 'es_ES'],
    siteName: '_lmmmmmm',
    audio: {
      url: 'https://lmmmmmm.me/audio.mp3',
      secureUrl: 'https://lmmmmmm.me/audio-secure.mp3',
      type: 'audio/mpeg',
    },
    video: 'https://lmmmmmm.me/video.mp4',
  },
  twitter: {
    image: 'https://lmmmmmm.me/avatar.png',
    imageAlt: 'twitter image alt',
    player: 'player',
    playerWidth: 1200,
    playerHeight: 600,
    playerStream: 'player stream',
    app: {
      name: {
        iphone: 'iphone name',
        ipad: 'ipad name',
        googleplay: 'google play name',
      },
      id: {
        iphone: 'iphone url',
        ipad: 'ipad url',
        googleplay: 'google play url',
      },
      url: {
        iphone: 'iphone url',
        ipad: 'ipad url',
        googleplay: 'google play url',
      },
    },
  },
  facebook: {
    appId: 123456,
  },
};

export default defineConfig({
  plugins: [ogPlugin(ogOptions)],
});
```

```html
<!-- this config will be generated inside the HTML head tag -->
<meta property="og:url" content="https://lmmmmmm.me">
<meta property="og:title" content="_lmmmmmm">
<meta property="og:type" content="website">
<meta property="og:image" content="https://lmmmmmm.me/avatar.png">
<meta property="og:image:alt" content="Portrait of _lmmmmmm">
<meta property="og:determiner" content="auto">
<meta property="og:description" content="_lmmmmmm, Front-end Developer.">
<meta property="og:locale" content="zh_CN">
<meta property="og:locale:alternate" content="fr_FR">
<meta property="og:locale:alternate" content="es_ES">
<meta property="og:site_name" content="_lmmmmmm">
<meta property="og:audio" content="https://lmmmmmm.me/audio.mp3">
<meta property="og:audio:secure_url" content="https://lmmmmmm.me/audio-secure.mp3">
<meta property="og:audio:type" content="audio/mpeg">
<meta property="og:video" content="https://lmmmmmm.me/video.mp4">
<meta name="twitter:image" content="https://lmmmmmm.me/avatar.png">
<meta name="twitter:image:alt" content="twitter image alt">
<meta name="twitter:player" content="player">
<meta name="twitter:player:width" content="1200">
<meta name="twitter:player:height" content="600">
<meta name="twitter:player:stream" content="player stream">
<meta name="twitter:app:name:iphone" content="iphone name">
<meta name="twitter:app:name:ipad" content="ipad name">
<meta name="twitter:app:name:googleplay" content="google play name">
<meta name="twitter:app:id:iphone" content="iphone url">
<meta name="twitter:app:id:ipad" content="ipad url">
<meta name="twitter:app:id:googleplay" content="google play url">
<meta name="twitter:app:url:iphone" content="iphone url">
<meta name="twitter:app:url:ipad" content="ipad url">
<meta name="twitter:app:url:googleplay" content="google play url">
<meta property="fb:app_id" content="123456">
```
</details>

## Multiple Media

Images, audio files, and videos accept a string, a structured object, or an array containing either form. Structured properties are always emitted directly after their root media tag, regardless of object key order.

```ts
ogPlugin({
  basic: {
    title: 'My website',
    type: 'website',
    url: 'https://example.com',
    image: [
      {
        width: 1200,
        url: 'https://example.com/cover.jpg',
        height: 630,
        alt: 'Homepage cover',
      },
      {
        url: 'https://example.com/secondary.jpg',
        alt: 'Secondary cover',
      },
    ],
  },
});
```

The object form is recommended for images because it associates alt text and other structured properties with the correct image. A string image remains supported for compatibility, but produces a non-blocking warning because it cannot include `og:image:alt`.

## Validation

When `basic` metadata is provided, the plugin validates the four required Open Graph properties (`title`, `type`, `image`, and `url`) as well as configured HTTP(S) URLs and MIME types. Invalid metadata produces a warning without blocking the Vite build:

```ts
ogPlugin({
  basic: {
    title: 'My website',
    type: 'website',
    image: {
      url: 'https://example.com/cover.jpg',
      alt: 'My website cover',
    },
    url: 'https://example.com',
  },
});
```

Twitter-only and Facebook-only configurations do not require a `basic` section and do not produce missing-property warnings.

## Types

You can consult the `.d.ts` file to see more descriptions of the fields when develop.

```ts
// Base Plugin Config
interface Options {
  basic?: BasicOptions;
  twitter?: TwitterOptions;
  facebook?: FacebookOptions;
}

interface BasicOptions {
  title?: string;
  type?: string;
  image?: OneOrMany<ImageInput>;
  url?: string;
  audio?: OneOrMany<AudioInput>;
  description?: string;
  determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  locale?: string;
  localeAlternate?: string[];
  siteName?: string;
  video?: OneOrMany<VideoInput>;
}
```

```ts
type OneOrMany<T> = T | readonly T[];

type ImageInput = string | ImageOptions;
type AudioInput = string | AudioOptions;
type VideoInput = string | VideoOptions;

interface ImageOptions {
  url?: string;
  secureUrl?: string;
  type?: string;
  width?: number;
  height?: number;
  alt?: string;
}

type VideoOptions = Omit<ImageOptions, 'alt'>;
type AudioOptions = Pick<ImageOptions, 'url' | 'secureUrl' | 'type'>;
```

```ts
// Twitter Open Graph Options
interface TwitterOptions {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  description?: string;
  title?: string;
  image?: string;
  imageAlt?: string;
  player?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
  app?: {
    name?: {
      iphone?: string;
      ipad?: string;
      googleplay?: string;
    };
    id?: {
      iphone?: string;
      ipad?: string;
      googleplay?: string;
    };
    url?: {
      iphone?: string;
      ipad?: string;
      googleplay?: string;
    };
  };
}
```

```ts
export interface FacebookOptions {
  appId: number;
}
```

## Reference

- [Open Graph protocol](https://ogp.me/)
- [Open Graph of Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Open Graph of Facebook](https://developers.facebook.com/docs/sharing/webmasters/)

## License

[**MIT**](./LICENSE) License © 2022 [\_lmmmmmm](https://github.com/Lmmmmmm-bb)
