import type { HtmlTagDescriptor } from 'vite';

import type { Options } from './types/index.ts';
import { isMediaProperty, transformMedia } from './media.ts';
import { camelcase, toAttrs } from './utils.ts';

export const transform = (options: Options): HtmlTagDescriptor[] => {
  const basicOGMetaAttrs = Object.entries(options.basic || {}).flatMap(([name, content]) => isMediaProperty(name)
    ? transformMedia(name, content)
    : toAttrs(camelcase(name), content, 'property', 'og'));
  const twitterOGMetaAttrs = Object.entries(options.twitter || {}).flatMap(([name, content]) => toAttrs(camelcase(name), content, 'name', 'twitter'));
  const facebookOGMetaAttrs = Object.entries(options.facebook || {}).flatMap(([name, content]) => toAttrs(camelcase(name), content, 'property', 'fb'));

  const attrs = [...basicOGMetaAttrs, ...twitterOGMetaAttrs, ...facebookOGMetaAttrs];

  return attrs.map(_attrs => ({
    attrs: _attrs,
    tag: 'meta',
    injectTo: 'head',
  }));
};
