export interface TwitterOptions {
  /**
   * @description The card type
   * @backup `og:type`
   */
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /**
   * @description username of website. Either twitter:site or twitter:site:id is required.
   */
  site?: string;
  /**
   * @description Same as twitter:site, but the user’s Twitter ID. Either twitter:site or twitter:site:id is required.
   */
  siteId?: string;
  /**
   * @description username of content creator
   */
  creator?: string;
  /**
   * @description Twitter user ID of content creator
   */
  creatorId?: string;
  /**
   * @description Description of content
   * @backup `og:description`
   */
  description?: string;
  /**
   * @description Title of content
   * @backup `og:title`
   */
  title?: string;
  /**
   * @description URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   * @backup `og:image`
   */
  image?: string;
  /**
   * @description A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters.
   * @backup `og:image:alt`
   */
  imageAlt?: string;
  /**
   * @description HTTPS URL of player iframe
   */
  player?: string;
  /**
   * @description Width of iframe in pixels
   */
  playerWidth?: number;
  /**
   * @description Height of iframe in pixels
   */
  playerHeight?: number;
  /**
   * @description URL to raw video or audio stream
   */
  playerStream?: string;
  app?: {
    name?: {
      /**
       * @description Name of your iPhone app
       */
      iphone?: string;
      /**
       * @description Name of your iPad optimized app
       */
      ipad?: string;
      /**
       * @description Name of your Android app
       */
      googleplay?: string;
    };
    id?: {
      /**
       * @description Your app ID in the iTunes App Store
       * @note NOT your bundle ID
       */
      iphone?: string;
      /**
       * @description Your app ID in the iTunes App Store
       */
      ipad?: string;
      /**
       * @description Your app ID in the Google Play Store
       */
      googleplay?: string;
    };
    url?: {
      /**
       * @description Your app’s custom URL scheme (you must include ”://” after your scheme name)
       */
      iphone?: string;
      /**
       * @description Your app’s custom URL scheme
       */
      ipad?: string;
      /**
       * @description Your app’s custom URL scheme
       */
      googleplay?: string;
    };
  };
}
