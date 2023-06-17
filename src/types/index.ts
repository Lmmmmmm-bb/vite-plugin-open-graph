import type { BasicOptions } from './og';
import type { TwitterOptions } from './twitter';
import type { FacebookOptions } from './facebook';

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
