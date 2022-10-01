export enum TwitterCardEnum {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
  App = 'app',
  Player = 'player',
}

export interface TwitterOptions {
  /**
   * @description The card type
   */
  card?: TwitterCardEnum
  /**
   * @description The card type
   */
  site?: string
  /**
   * @description The card type
   */
  siteId?: string
  /**
   * @description The card type
   */
  creator?: string
  /**
   * @description The card type
   */
  creatorId?: string
  /**
   * @description The card type
   */
  description?: string
  /**
   * @description The card type
   */
  title?: string
  /**
   * @description The card type
   */
  image?: string
  /**
   * @description The card type
   */
  imageAlt?: string
  /**
   * @description The card type
   */
  player?: string
  /**
   * @description The card type
   */
  playerWidth?: number
  /**
   * @description The card type
   */
  playerHeight?: number
  /**
   * @description The card type
   */
  playerStream?: string
  /**
   * @description The card type
   */
  appNameIphone?: string
  /**
   * @description The card type
   */
  appIdIphone?: string
  /**
   * @description The card type
   */
  appUrlIphone?: string
  /**
   * @description The card type
   */
  appNameIpad?: string
  /**
   * @description The card type
   */
  appIdIpad?: string
  /**
   * @description The card type
   */
  appUrlIpad?: string
  /**
   * @description The card type
   */
  appNameGoogleplay?: string
  /**
   * @description The card type
   */
  appIdGoogleplay?: string
  /**
   * @description The card type
   */
  appUrlGoogleplay?: string
}
