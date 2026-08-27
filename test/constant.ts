import type { Options } from '../src/index.ts';

export const ogOptions: Options = {
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
