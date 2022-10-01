import { defineConfig } from 'vite'

import ogPlugin from 'vite-plugin-open-graph'

export default defineConfig({
  plugins: [ogPlugin({
    basic: {
      title: '123',
      type: '124545',
      image: '123412',
      url: 'https://lmmmmmm.me',
    },
    extra: {
      description: 'hello',
      localeAlternate: ['1', '2', '3'],
    },
  })],
})
