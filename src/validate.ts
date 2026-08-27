import type { MediaProperty } from './media.ts';

import type { Options } from './types/index.ts';
import { getMediaUrl, normalizeMediaItems } from './media.ts';

const MIME_TYPE_RE = /^[a-z\d][\w!#$&^.+-]*\/[a-z\d][\w!#$&^.+-]*$/i;
const MIME_TYPE_EXAMPLES = {
  audio: 'audio/mpeg',
  image: 'image/jpeg',
  video: 'video/mp4',
} as const;

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const validateUrl = (issues: string[], property: string, value: unknown): void => {
  if (value !== undefined && value !== null && (!isNonEmptyString(value) || !isHttpUrl(value))) {
    issues.push(`"${property}" must be an absolute HTTP(S) URL.`);
  }
};

const validateMimeType = (issues: string[], property: string, value: unknown, example: string): void => {
  if (value !== undefined && value !== null && (!isNonEmptyString(value) || !MIME_TYPE_RE.test(value))) {
    issues.push(`"${property}" must be a valid MIME type, for example "${example}".`);
  }
};

const validateMedia = (issues: string[], property: MediaProperty, value: unknown, required = false): void => {
  const items = normalizeMediaItems(value);
  if (required && items.length === 0) {
    issues.push('Required property "og:image" must provide a non-empty URL.');
    return;
  }

  items.forEach((item, index) => {
    const itemProperty = `og:${property}[${index}]`;
    const url = getMediaUrl(item);
    if (!isNonEmptyString(url)) {
      issues.push(`"${itemProperty}.url" must provide a non-empty URL.`);
      return;
    }

    const urlProperty = typeof item === 'string' ? itemProperty : `${itemProperty}.url`;
    validateUrl(issues, urlProperty, url);

    const media = item && typeof item === 'object' ? item as Record<string, unknown> : undefined;
    if (media) {
      validateUrl(issues, `${itemProperty}.secure_url`, media.secureUrl);
      validateMimeType(issues, `${itemProperty}.type`, media.type, MIME_TYPE_EXAMPLES[property]);
    }

    if (property === 'image' && !isNonEmptyString(media?.alt)) {
      issues.push(`"${itemProperty}.alt" should be provided to describe the image.`);
    }
  });
};

export const validateOptions = (options: Options): string[] => {
  const { basic } = options;
  if (!basic) {
    return [];
  }

  const issues: string[] = [];

  if (!isNonEmptyString(basic.title)) {
    issues.push('Required property "og:title" must be a non-empty string.');
  }
  if (!isNonEmptyString(basic.type)) {
    issues.push('Required property "og:type" must be a non-empty string.');
  }
  if (!isNonEmptyString(basic.url)) {
    issues.push('Required property "og:url" must be a non-empty string.');
  } else {
    validateUrl(issues, 'og:url', basic.url);
  }

  validateMedia(issues, 'image', basic.image, true);
  validateMedia(issues, 'audio', basic.audio);
  validateMedia(issues, 'video', basic.video);

  return issues;
};

export const formatValidationIssues = (issues: string[]): string => [
  '[vite-plugin-open-graph] Invalid Open Graph configuration:',
  ...issues.map(issue => `- ${issue}`),
].join('\n');
