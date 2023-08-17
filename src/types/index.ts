import type { BasicOptions } from './og.ts';
import type { TwitterOptions } from './twitter.ts';
import type { FacebookOptions } from './facebook.ts';

export { BasicOptions, TwitterOptions, FacebookOptions };

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
