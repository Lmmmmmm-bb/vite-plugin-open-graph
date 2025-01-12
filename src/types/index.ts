import type { FacebookOptions } from './facebook.ts';
import type { BasicOptions } from './og.ts';
import type { TwitterOptions } from './twitter.ts';

export { BasicOptions, FacebookOptions, TwitterOptions };

export interface Options {
  /**
   * Basic options for Open Graph.
   */
  basic?: BasicOptions;
  /**
   * Open Graph options for Twitter.
   */
  twitter?: TwitterOptions;
  /**
   * Open Graph options for Facebook.
   */
  facebook?: FacebookOptions;
}
