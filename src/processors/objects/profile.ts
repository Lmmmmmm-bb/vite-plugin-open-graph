import type { FieldHandler, MetadataProcessor, ValidationIssue } from '../../core/processor.ts';
import type { ProfileObjectOptions } from '../../types/index.ts';

import { createMetaEmitter } from '../../core/meta.ts';
import { processFields } from '../../core/processor.ts';

const emitProfile = createMetaEmitter('property', 'profile');

const PROFILE_FIELDS = {
  firstName: value => emitProfile('first_name', value),
  lastName: value => emitProfile('last_name', value),
  username: value => emitProfile('username', value),
  gender: value => emitProfile('gender', value),
} satisfies Record<Exclude<keyof ProfileObjectOptions, 'type'>, FieldHandler>;

const validateProfile = (options: ProfileObjectOptions): ValidationIssue[] => {
  if (options.gender !== undefined && options.gender !== 'male' && options.gender !== 'female') {
    return ['"profile:gender" must be either "male" or "female".'];
  }
  return [];
};

export const profileProcessor: MetadataProcessor<ProfileObjectOptions> = {
  generate: options => processFields(options, PROFILE_FIELDS),
  validate: validateProfile,
};
