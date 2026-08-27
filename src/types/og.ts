export interface BasicOptions {
  /**
   * @description The title of your object as it should appear within the graph, e.g., "The Rock".
   */
  title?: string;
  /**
   * @description The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
   */
  type?: string;
  /**
   * @description One or more image URLs or structured image objects which should represent your object within the graph.
   */
  image?: OneOrMany<ImageInput>;
  /**
   * @description The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  url?: string;
  /**
   * @description One or more audio URLs or structured audio objects to accompany this object.
   */
  audio?: OneOrMany<AudioInput>;
  /**
   * @description A one to two sentence description of your object.
   */
  description?: string;
  /**
   * @description The word that appears before this object's title in a sentence.
   * @default ""
   * @tip If auto is chosen, the consumer of your data should chose between "a" or "an".
   */
  determiner?: 'a' | 'an' | 'the' | 'auto' | '';
  /**
   * @description The locale these tags are marked up in. Of the format `language_TERRITORY`.
   * @default en_US
   */
  locale?: string;
  /**
   * @description An array of other locales this page is available in.
   */
  localeAlternate?: string[];
  /**
   * @description If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".
   */
  siteName?: string;
  /**
   * @description One or more video URLs or structured video objects that complement this object.
   */
  video?: OneOrMany<VideoInput>;
}

export type OneOrMany<T> = T | readonly T[];

export type ImageInput = string | ImageOptions;

export type AudioInput = string | AudioOptions;

export type VideoInput = string | VideoOptions;

export interface ImageOptions {
  /**
   * @description An image URL which should represent your object within the graph.
   */
  url?: string;
  /**
   * @description  An alternate url to use if the webpage requires HTTPS.
   */
  secureUrl?: string;
  /**
   * @description A MIME type for this image.
   * @wiki https://en.wikipedia.org/wiki/Media_type
   * @example image/jpeg
   */
  type?: string;
  /**
   * @description The number of pixels wide.
   */
  width?: number;
  /**
   * @description The number of pixels high.
   */
  height?: number;
  /**
   * @description A description of what is in the image (not a caption). If the page specifies an og:image it should specify `og:image:alt`.
   */
  alt?: string;
}

export type VideoOptions = Omit<ImageOptions, 'alt'>;

export type AudioOptions = Pick<ImageOptions, 'url' | 'secureUrl' | 'type'>;
