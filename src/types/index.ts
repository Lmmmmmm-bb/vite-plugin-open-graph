import type { FacebookOptions } from './facebook.ts';
import type {
  ArticleObjectOptions,
  BookObjectOptions,
  MusicAlbumInput,
  MusicAlbumObjectOptions,
  MusicAlbumReferenceOptions,
  MusicObjectOptions,
  MusicPlaylistObjectOptions,
  MusicRadioStationObjectOptions,
  MusicSongInput,
  MusicSongObjectOptions,
  MusicSongReferenceOptions,
  ObjectReference,
  OpenGraphObjectOptions,
  OpenGraphObjectType,
  ProfileObjectOptions,
  VideoActorInput,
  VideoActorReferenceOptions,
  VideoEpisodeObjectOptions,
  VideoMovieObjectOptions,
  VideoObjectOptions,
  VideoOtherObjectOptions,
  VideoTVShowObjectOptions,
  WebsiteObjectOptions,
} from './objects/index.ts';
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
  ArticleObjectOptions,
  AudioInput,
  AudioOptions,
  BasicOptions,
  BookObjectOptions,
  FacebookOptions,
  ImageInput,
  ImageOptions,
  MusicAlbumInput,
  MusicAlbumObjectOptions,
  MusicAlbumReferenceOptions,
  MusicObjectOptions,
  MusicPlaylistObjectOptions,
  MusicRadioStationObjectOptions,
  MusicSongInput,
  MusicSongObjectOptions,
  MusicSongReferenceOptions,
  ObjectReference,
  OneOrMany,
  OpenGraphObjectOptions,
  OpenGraphObjectType,
  ProfileObjectOptions,
  TwitterOptions,
  VideoActorInput,
  VideoActorReferenceOptions,
  VideoEpisodeObjectOptions,
  VideoInput,
  VideoMovieObjectOptions,
  VideoObjectOptions,
  VideoOptions,
  VideoOtherObjectOptions,
  VideoTVShowObjectOptions,
  WebsiteObjectOptions,
};

export interface Options {
  /**
   * Basic options for Open Graph.
   */
  basic?: BasicOptions;
  /**
   * Open Graph object metadata. Its type determines the supported namespaced properties.
   */
  object?: OpenGraphObjectOptions;
  /**
   * Open Graph options for Twitter.
   */
  twitter?: TwitterOptions;
  /**
   * Open Graph options for Facebook.
   */
  facebook?: FacebookOptions;
}
