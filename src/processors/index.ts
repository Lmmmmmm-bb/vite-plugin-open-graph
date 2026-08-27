import type { MetaEntry } from '../core/meta.ts';
import type { MetadataProcessor, ValidationIssue } from '../core/processor.ts';
import type { Options } from '../types/index.ts';

import { basicProcessor } from './basic.ts';
import { facebookProcessor } from './facebook.ts';
import { objectProcessor } from './objects/index.ts';
import { twitterProcessor } from './twitter.ts';

interface OptionsProcessor {
  generate: (options: Options) => MetaEntry[];
  validate: (options: Options) => ValidationIssue[];
}

interface ProcessedOptions {
  entries: MetaEntry[];
  issues: ValidationIssue[];
}

const defineSectionProcessor = <K extends keyof Options>(section: K, processor: MetadataProcessor<NonNullable<Options[K]>>): OptionsProcessor => ({
  generate(options) {
    const sectionOptions = options[section];
    return sectionOptions === undefined || sectionOptions === null
      ? []
      : processor.generate(sectionOptions as NonNullable<Options[K]>);
  },
  validate(options) {
    const sectionOptions = options[section];
    return sectionOptions === undefined || sectionOptions === null
      ? []
      : processor.validate(sectionOptions as NonNullable<Options[K]>);
  },
});

const PROCESSORS: readonly OptionsProcessor[] = [
  defineSectionProcessor('basic', basicProcessor),
  defineSectionProcessor('object', objectProcessor),
  defineSectionProcessor('twitter', twitterProcessor),
  defineSectionProcessor('facebook', facebookProcessor),
];

const resolveObjectType = (options: Options): { options: Options; issues: ValidationIssue[] } => {
  const objectType = options.object?.type;
  if (objectType === undefined || objectType === null) {
    return { options, issues: [] };
  }

  const basicType = options.basic?.type;
  const issues = basicType !== undefined && basicType !== objectType
    ? [`"basic.type" (${basicType}) conflicts with "object.type" (${objectType}); "object.type" will be used.`]
    : [];

  return {
    options: {
      ...options,
      basic: {
        ...options.basic,
        type: objectType,
      },
    },
    issues,
  };
};

export const processOptions = (options: Options): ProcessedOptions => {
  const resolved = resolveObjectType(options);

  return {
    entries: PROCESSORS.flatMap(processor => processor.generate(resolved.options)),
    issues: [
      ...resolved.issues,
      ...PROCESSORS.flatMap(processor => processor.validate(resolved.options)),
    ],
  };
};
