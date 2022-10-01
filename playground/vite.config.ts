import { defineConfig } from 'vite'

import ogPlugin from 'vite-plugin-open-graph'

export default defineConfig({
  plugins: [ogPlugin({
    basic: {
      url: 'https://lmmmmmm.me',
      title: '_lmmmmmm',
      type: 'video.movie',
      image: 'https://lmmmmmm.me/avatar.png',
    },
    extra: {
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
      appNameGoogleplay: 'asd',
    },
  })],
})
