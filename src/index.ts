import type { Plugin } from 'vite';

import type {
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
  Options,
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
} from './types/index.ts';
import { transform } from './transform.ts';
import { formatValidationIssues, validateOptions } from './validate.ts';

export default (options: Options = {}): Plugin => {
  return {
    name: 'vite-plugin-open-graph',
    configResolved(config) {
      const issues = validateOptions(options);
      if (issues.length === 0) {
        return;
      }

      config.logger.warn(formatValidationIssues(issues));
    },
    transformIndexHtml(html) {
      return { html, tags: transform(options) };
    },
  };
};

export type {
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
  Options,
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
