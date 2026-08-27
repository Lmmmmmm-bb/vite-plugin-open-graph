import type { OneOrMany } from '../og.ts';
import type { ObjectReference } from './common.ts';

export type VideoActorInput = ObjectReference | VideoActorReferenceOptions;

export interface VideoActorReferenceOptions {
  /** URL of the actor's profile object. */
  url: ObjectReference;
  /** Role played by this actor. */
  role?: string;
}

interface VideoObjectFields {
  actor?: OneOrMany<VideoActorInput>;
  director?: OneOrMany<ObjectReference>;
  writer?: OneOrMany<ObjectReference>;
  /** Video length in seconds. */
  duration?: number;
  /** ISO 8601 date or date-time when the video was released. */
  releaseDate?: string;
  tag?: OneOrMany<string>;
}

export interface VideoMovieObjectOptions extends VideoObjectFields {
  type: 'video.movie';
}

export interface VideoEpisodeObjectOptions extends VideoObjectFields {
  type: 'video.episode';
  series?: ObjectReference;
}

export interface VideoTVShowObjectOptions extends VideoObjectFields {
  type: 'video.tv_show';
}

export interface VideoOtherObjectOptions extends VideoObjectFields {
  type: 'video.other';
}

export type VideoObjectOptions
  = | VideoMovieObjectOptions
    | VideoEpisodeObjectOptions
    | VideoTVShowObjectOptions
    | VideoOtherObjectOptions;
