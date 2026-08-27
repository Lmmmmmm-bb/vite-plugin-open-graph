import type { OneOrMany } from '../og.ts';
import type { ObjectReference } from './common.ts';

export type MusicAlbumInput = ObjectReference | MusicAlbumReferenceOptions;

export type MusicSongInput = ObjectReference | MusicSongReferenceOptions;

export interface MusicAlbumReferenceOptions {
  /** URL of the referenced music.album object. */
  url: ObjectReference;
  /** Disc number containing the song. */
  disc?: number;
  /** Track number of the song. */
  track?: number;
}

export interface MusicSongReferenceOptions {
  /** URL of the referenced music.song object. */
  url: ObjectReference;
  /** Disc number containing the song. */
  disc?: number;
  /** Track number of the song. */
  track?: number;
}

export interface MusicSongObjectOptions {
  type: 'music.song';
  /** Song length in seconds. */
  duration?: number;
  album?: OneOrMany<MusicAlbumInput>;
  musician?: OneOrMany<ObjectReference>;
}

export interface MusicAlbumObjectOptions {
  type: 'music.album';
  song?: OneOrMany<MusicSongInput>;
  musician?: ObjectReference;
  /** ISO 8601 date or date-time when the album was released. */
  releaseDate?: string;
}

export interface MusicPlaylistObjectOptions {
  type: 'music.playlist';
  song?: OneOrMany<MusicSongInput>;
  creator?: ObjectReference;
}

export interface MusicRadioStationObjectOptions {
  type: 'music.radio_station';
  creator?: ObjectReference;
}

export type MusicObjectOptions
  = | MusicSongObjectOptions
    | MusicAlbumObjectOptions
    | MusicPlaylistObjectOptions
    | MusicRadioStationObjectOptions;
