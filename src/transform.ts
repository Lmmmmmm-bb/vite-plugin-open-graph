import type { HtmlTagDescriptor } from 'vite';

import type { Options } from './types/index.ts';
import { renderMetaTags } from './core/meta.ts';
import { processOptions } from './processors/index.ts';

export const transform = (options: Options): HtmlTagDescriptor[] => renderMetaTags(processOptions(options).entries);
