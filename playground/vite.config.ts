import type { Options } from 'vite-plugin-open-graph';
import { defineConfig } from 'vite';
import ogPlugin from 'vite-plugin-open-graph';

const ogOptions: Options = {
  basic: {
    url: 'https://lmmmmmm.me',
    title: '_lmmmmmm',
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
  object: {
    type: 'article',
    publishedTime: '2026-08-27T10:00:00+08:00',
    modifiedTime: '2026-08-27T12:00:00+08:00',
    author: 'https://lmmmmmm.me',
    section: 'Technology',
    tag: ['Vite', 'Open Graph'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lmmmmmm',
    title: '_lmmmmmm',
    description: '_lmmmmmm, Front-end Developer.',
    image: 'https://lmmmmmm.me/avatar.png',
    imageAlt: 'twitter image alt',
  },
  facebook: {
    appId: 123456,
  },
};

export default defineConfig({
  plugins: [ogPlugin(ogOptions)],
});
