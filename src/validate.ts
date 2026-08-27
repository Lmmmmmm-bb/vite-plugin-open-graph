import type { Options } from './types/index.ts';
import { processOptions } from './processors/index.ts';

export { formatValidationIssues } from './core/validation.ts';

export const validateOptions = (options: Options): string[] => processOptions(options).issues;
