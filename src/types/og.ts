export interface BasicOptions {
  /**
   * @description The title of your object as it should appear within the graph, e.g., "The Rock".
   */
  title: string
  /**
   * @description The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
   */
  type: string
  /**
   * @description An image URL which should represent your object within the graph.
   */
  image: string | ImageOptions
  /**
   * @description The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  url: string
}

export interface ExtraOptions {
  /**
   * @description A URL to an audio file to accompany this object.
   */
  audio?: string | AudioOptions
  /**
   * @description A one to two sentence description of your object.
   */
  description?: string
  /**
   * @description The word that appears before this object's title in a sentence.
   * @default ""
   * @tip If auto is chosen, the consumer of your data should chose between "a" or "an".
   */
  determiner?: 'a' | 'an' | 'the' | 'auto' | ''
  /**
   * @description The locale these tags are marked up in. Of the format `language_TERRITORY`.
   * @default en_US
   */
  locale?: string
  /**
   * @description An array of other locales this page is available in.
   */
  localeAlternate?: string[]
  /**
   * @description If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".
   */
  siteName?: string
  /**
   * @description A URL to a video file that complements this object.
   */
  video?: string | VideoOptions
}

export interface ImageOptions {
  /**
   * @description An image URL which should represent your object within the graph.
   */
  url?: string
  /**
   * @description  An alternate url to use if the webpage requires HTTPS.
   */
  secureUrl?: string
  /**
   * @description A MIME type for this image.
   * @wiki https://en.wikipedia.org/wiki/Media_type
   * @example image/jpeg
   */
  type?: string
  /**
   * @description The number of pixels wide.
   */
  width?: number
  /**
   * @description The number of pixels high.
   */
  height?: number
  /**
   * @description A description of what is in the image (not a caption). If the page specifies an og:image it should specify `og:image:alt`.
   */
  alt?: string
}

export type VideoOptions = Omit<ImageOptions, 'alt'>

export type AudioOptions = Pick<ImageOptions, 'url' | 'secureUrl' | 'type'>
/**
 * @see https://ogp.me/#no_vertical
 * @namespace https://ogp.me/ns/profile#
 */
export interface ProfileOptions {
  /**
   * @description A name normally given to an individual by a parent or self-chosen.
   */
  firstName?: string
  /**
   * @description A name inherited from a family or marriage and by which the individual is commonly known.
   */
  lastName?: string
  /**
   * @description A short unique string to identify them.
   */
  username?: string
  /**
   * @description Their gender.
   */
  gender?: 'male' | 'female'
}

/**
 * @see https://ogp.me/#no_vertical
 * @namespace https://ogp.me/ns/article#
 */
export interface ArticleOptions {
  /**
   * @description When the article was first published.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  publishedTime?: string
  /**
   * @description When the article was last changed.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  modifiedTime?: string
  /**
   * @description When the article is out of date after.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  expirationTime?: string
  /**
   * @description Writers of the article.
   */
  author?: ProfileOptions | ProfileOptions[]
  /**
   * @description A high-level section name. E.g. Technology
   */
  section?: string
  /**
   * @description Tag words associated with this article.
   */
  tag?: string | string[]
}

/**
 * @see https://ogp.me/#no_vertical
 * @namespace https://ogp.me/ns/book#
 */
export interface BookOptions {
  /**
   * @description Who wrote this book.
   */
  author?: ProfileOptions | ProfileOptions[]
  /**
   * @description The ISBN
   * @wiki https://en.wikipedia.org/wiki/ISBN
   */
  isbn?: string
  /**
   * @description The date the book was released.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  releaseDate?: string
  /**
   * @description Tag words associated with this book.
   */
  tag?: string | string[]
}

/**
 * @namespace https://ogp.me/ns/website#
 */
export type WebsiteOptions = string

/**
 * @namespace https://ogp.me/ns/video#
 */
export interface VideoMovieOptions {
  /**
   * @description Actors in the movie.
   */
  actor?: ProfileOptions | ProfileOptions[]
  /**
   * @description The role they played.
   */
  actorRole?: string
  /**
   * @description Directors of the movie.
   */
  director?: ProfileOptions | ProfileOptions[]
  /**
   * @description Writers of the movie.
   */
  writer?: ProfileOptions | ProfileOptions[]
  /**
   * @description The movie's length in seconds.
   * @limit integer >= 1
   */
  duration?: number
  /**
   * @description The date the movie was released.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  releaseDate?: string
  /**
   * @description Tag words associated with this movie.
   */
  tag?: string | string[]
}

/**
 * @description A multi-episode TV show.
 * @namespace https://ogp.me/ns/video#
 */
export type VideoTVShowOptions = VideoMovieOptions

/**
 * @description A video that doesn't belong in any other category.
 * @namespace https://ogp.me/ns/video#
 */
export type VideoOtherOptions = VideoMovieOptions

/**
 * @namespace https://ogp.me/ns/video#
 */
export interface VideoEpisodeOptions extends VideoMovieOptions {
  /**
   * @description Which series this episode belongs to.
   */
  series?: VideoTVShowOptions
}

/**
 * @namespace https://ogp.me/ns/music#
 */
export interface MusicSongOptions {
  /**
   * @description The song's length in seconds.
   * @limit integer >= 1
   */
  duration?: number
  /**
   * @description The album this song is from.
   */
  album?: MusicAlbumOptions | MusicAlbumOptions[]
  /**
   * @description Which disc of the album this song is on.
   * @limit integer >= 1
   */
  albumDisc?: number
  /**
   * @description Which track this song is.
   * @limit integer >= 1
   */
  albumTrack?: number
  /**
   * @description The musician that made this song.
   */
  musician?: ProfileOptions | ProfileOptions[]
}

/**
 * @namespace https://ogp.me/ns/music#
 */
export interface MusicAlbumOptions {
  /**
   * @description The song on this album.
   */
  song?: MusicSongOptions
  /**
   * @description The same as MusicSongOptions.albumDisc but in reverse.
   * @limit integer >= 1
   */
  songDisc?: number
  /**
   * @description The same as MusicSongOptions.albumTrack but in reverse.
   * @limit integer >= 1
   */
  songTrack?: number
  /**
   * @description The musician that made this song.
   */
  musician?: ProfileOptions
  /**
   * @description The date the album was released.
   * @wiki https://en.wikipedia.org/wiki/ISO_8601
   */
  releaseDate?: string
}

/**
 * @namespace https://ogp.me/ns/music#
 */
export interface MusicPlaylistOptions extends Omit<MusicAlbumOptions, 'musician' | 'releaseDate'> {
  /**
   * @description The creator of this playlist.
   */
  creator?: ProfileOptions
}

/**
 * @namespace https://ogp.me/ns/music#
 */
export interface MusicRadioStationOptions {
  /**
   * @description The creator of this station.
   */
  creator?: ProfileOptions
}

