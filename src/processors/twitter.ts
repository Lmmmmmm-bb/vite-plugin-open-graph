import type { FieldHandler, MetadataProcessor } from '../core/processor.ts';

import type { TwitterOptions } from '../types/index.ts';
import { createMetaEmitter } from '../core/meta.ts';
import { processFields } from '../core/processor.ts';

const emitTwitter = createMetaEmitter('name', 'twitter');

const APP_PLATFORM_FIELDS = {
  iphone: 'iphone',
  ipad: 'ipad',
  googleplay: 'googleplay',
} as const;

type TwitterApp = NonNullable<TwitterOptions['app']>;

const emitAppGroup = (group: keyof TwitterApp, value: unknown) => {
  if (!value || typeof value !== 'object') {
    return [];
  }

  return Object.entries(value).flatMap(([platform, content]) => {
    const outputPlatform = APP_PLATFORM_FIELDS[platform as keyof typeof APP_PLATFORM_FIELDS];
    return outputPlatform
      ? emitTwitter(`app:${group}:${outputPlatform}`, content)
      : [];
  });
};

const APP_FIELDS = {
  name: value => emitAppGroup('name', value),
  id: value => emitAppGroup('id', value),
  url: value => emitAppGroup('url', value),
} satisfies Record<keyof TwitterApp, FieldHandler>;

const generateTwitterApp = (value: unknown) => value && typeof value === 'object'
  ? processFields(value, APP_FIELDS)
  : [];

const TWITTER_FIELDS = {
  card: value => emitTwitter('card', value),
  site: value => emitTwitter('site', value),
  siteId: value => emitTwitter('site:id', value),
  creator: value => emitTwitter('creator', value),
  creatorId: value => emitTwitter('creator:id', value),
  description: value => emitTwitter('description', value),
  title: value => emitTwitter('title', value),
  image: value => emitTwitter('image', value),
  imageAlt: value => emitTwitter('image:alt', value),
  player: value => emitTwitter('player', value),
  playerWidth: value => emitTwitter('player:width', value),
  playerHeight: value => emitTwitter('player:height', value),
  playerStream: value => emitTwitter('player:stream', value),
  app: generateTwitterApp,
} satisfies Record<keyof TwitterOptions, FieldHandler>;

export const twitterProcessor: MetadataProcessor<TwitterOptions> = {
  generate: options => processFields(options, TWITTER_FIELDS),
  validate: () => [],
};
