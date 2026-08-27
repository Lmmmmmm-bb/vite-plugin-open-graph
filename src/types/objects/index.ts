import type { ArticleObjectOptions } from './article.ts';
import type { BookObjectOptions } from './book.ts';
import type { ObjectReference, ProfileObjectOptions, WebsiteObjectOptions } from './common.ts';
import type {
  MusicAlbumInput,
  MusicAlbumObjectOptions,
  MusicAlbumReferenceOptions,
  MusicObjectOptions,
  MusicPlaylistObjectOptions,
  MusicRadioStationObjectOptions,
  MusicSongInput,
  MusicSongObjectOptions,
  MusicSongReferenceOptions,
} from './music.ts';
import type {
  VideoActorInput,
  VideoActorReferenceOptions,
  VideoEpisodeObjectOptions,
  VideoMovieObjectOptions,
  VideoObjectOptions,
  VideoOtherObjectOptions,
  VideoTVShowObjectOptions,
} from './video.ts';

export type OpenGraphObjectOptions
  = | WebsiteObjectOptions
    | ProfileObjectOptions
    | ArticleObjectOptions
    | BookObjectOptions
    | MusicObjectOptions
    | VideoObjectOptions;

export type OpenGraphObjectType = OpenGraphObjectOptions['type'];

export type {
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
  ProfileObjectOptions,
  VideoActorInput,
  VideoActorReferenceOptions,
  VideoEpisodeObjectOptions,
  VideoMovieObjectOptions,
  VideoObjectOptions,
  VideoOtherObjectOptions,
  VideoTVShowObjectOptions,
  WebsiteObjectOptions,
};
