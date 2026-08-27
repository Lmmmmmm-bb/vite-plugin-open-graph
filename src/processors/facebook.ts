import type { FieldHandler, MetadataProcessor } from '../core/processor.ts';

import type { FacebookOptions } from '../types/index.ts';
import { createMetaEmitter } from '../core/meta.ts';
import { processFields } from '../core/processor.ts';

const emitFacebook = createMetaEmitter('property', 'fb');

const FACEBOOK_FIELDS = {
  appId: value => emitFacebook('app_id', value),
} satisfies Record<keyof FacebookOptions, FieldHandler>;

export const facebookProcessor: MetadataProcessor<FacebookOptions> = {
  generate: options => processFields(options, FACEBOOK_FIELDS),
  validate: () => [],
};
