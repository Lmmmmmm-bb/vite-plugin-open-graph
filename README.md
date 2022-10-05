# vite-plugin-open-graph

[![GitHub license](https://img.shields.io/github/license/Lmmmmmm-bb/vite-plugin-open-graph)](https://github.com/Lmmmmmm-bb/vite-plugin-open-graph/blob/main/LICENSE)
[![release](https://img.shields.io/github/v/release/Lmmmmmm-bb/vite-plugin-open-graph)](https://github.com/Lmmmmmm-bb/vite-plugin-open-graph/releases)

Generate Open Graph meta tags for your Vite app, **support Twitter Card**.

## Install

```bash
npm i -D vite-plugin-open-graph
```

```ts
import { defineConfig } from 'vite'
import ogPlugin from 'vite-plugin-open-graph'

export default defineConfig({
  plugins: [
    ogPlugin({
      // your Open Graph information config
    })
  ],
})
```

<details>
<summary>Example</summary>

```ts
import { defineConfig } from 'vite'
import ogPlugin from 'vite-plugin-open-graph'
import type { Options } from 'vite-plugin-open-graph'

const ogOptions: Options = {
  basic: {
    url: 'https://lmmmmmm.me',
    title: '_lmmmmmm',
    type: 'image.png',
    image: 'https://lmmmmmm.me/avatar.png',
    determiner: 'auto',
    description: '_lmmmmmm, Front-end Developer.',
    locale: 'zh_CN',
    localeAlternate: ['fr_FR', 'es_ES'],
    siteName: '_lmmmmmm',
    audio: {
      url: 'audio url',
      secureUrl: 'audio secure url',
      type: 'video.movie',
    },
    video: 'video meta',
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
}

export default defineConfig({
  plugins: [ogPlugin(ogOptions)],
})
```

```html
<!-- this config will generated inside html head tag -->
<meta name="og:url" content="https://lmmmmmm.me">
<meta name="og:title" content="_lmmmmmm">
<meta name="og:type" content="image.png">
<meta name="og:image" content="https://lmmmmmm.me/avatar.png">
<meta name="og:determiner" content="auto">
<meta name="og:description" content="_lmmmmmm, Front-end Developer.">
<meta name="og:locale" content="zh_CN">
<meta name="og:locale:alternate" content="fr_FR">
<meta name="og:locale:alternate" content="es_ES">
<meta name="og:site_name" content="_lmmmmmm">
<meta name="og:audio:url" content="audio url">
<meta name="og:audio:secure_url" content="audio secure url">
<meta name="og:audio:type" content="video.movie">
<meta name="og:video" content="video meta">
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
```
</details>

## Types

You can consult the `.d.ts` file to see more descriptions of the fields when develop.

```ts
// Base Plugin Config
interface Options {
  basic?: BasicOptions
  twitter?: TwitterOptions
}

interface BasicOptions {
  title?: string
  type?: string
  image?: string | ImageOptions
  url?: string
  description?: string
  determiner?: 'a' | 'an' | 'the' | 'auto' | ''
  locale?: string
  localeAlternate?: string[]
  siteName?: string
  video?: string | VideoOptions
}
```

```ts
interface ImageOptions {
  url?: string
  secureUrl?: string
  type?: string
  width?: number
  height?: number
  alt?: string
}

type VideoOptions = Omit<ImageOptions, 'alt'>
```

```ts
// Twitter Open Graph Options
interface TwitterOptions {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player'
  site?: string
  siteId?: string
  creator?: string
  creatorId?: string
  description?: string
  title?: string
  image?: string
  imageAlt?: string
  player?: string
  playerWidth?: number
  playerHeight?: number
  playerStream?: string
  app?: {
    name?: {
      iphone?: string
      ipad?: string
      googleplay?: string
    }
    id?: {
      iphone?: string
      ipad?: string
      googleplay?: string
    }
    url?: {
      iphone?: string
      ipad?: string
      googleplay?: string
    }
  }
}
```

## Reference

- [Open Graph protocol](https://ogp.me/)
- [Open Graph of Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

## License

[**MIT**](./LICENSE) License © 2022 [\_lmmmmmm](https://github.com/Lmmmmmm-bb)
