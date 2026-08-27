import type { MetaEntry } from '../core/meta.ts';
import type { MetadataProcessor, ValidationIssue } from '../core/processor.ts';
import type { Options } from '../types/index.ts';

import { basicProcessor } from './basic.ts';
import { facebookProcessor } from './facebook.ts';
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
  defineSectionProcessor('twitter', twitterProcessor),
  defineSectionProcessor('facebook', facebookProcessor),
];

export const processOptions = (options: Options): ProcessedOptions => ({
  entries: PROCESSORS.flatMap(processor => processor.generate(options)),
  issues: PROCESSORS.flatMap(processor => processor.validate(options)),
});
