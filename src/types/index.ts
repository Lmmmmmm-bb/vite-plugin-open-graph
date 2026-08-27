import type { FacebookOptions } from './facebook.ts';
import type {
  AudioInput,
  AudioOptions,
  BasicOptions,
  ImageInput,
  ImageOptions,
  OneOrMany,
  VideoInput,
  VideoOptions,
} from './og.ts';
import type { TwitterOptions } from './twitter.ts';

export {
  AudioInput,
  AudioOptions,
  BasicOptions,
  FacebookOptions,
  ImageInput,
  ImageOptions,
  OneOrMany,
  TwitterOptions,
  VideoInput,
  VideoOptions,
};

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
