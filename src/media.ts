import type { HtmlTagDescriptor } from 'vite';

export const MEDIA_PROPERTIES = ['image', 'audio', 'video'] as const;

export type MediaProperty = typeof MEDIA_PROPERTIES[number];

type MetaAttrs = NonNullable<HtmlTagDescriptor['attrs']>;

type MediaObject = Record<string, unknown>;

const STRUCTURED_FIELDS = {
  audio: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
  ],
  image: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
    ['width', 'width'],
    ['height', 'height'],
    ['alt', 'alt'],
  ],
  video: [
    ['secureUrl', 'secure_url'],
    ['type', 'type'],
    ['width', 'width'],
    ['height', 'height'],
  ],
} as const satisfies Record<MediaProperty, readonly (readonly [string, string])[]>;

export const isMediaProperty = (property: string): property is MediaProperty => MEDIA_PROPERTIES.includes(property as MediaProperty);

export const normalizeMediaItems = (value: unknown): unknown[] => {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

export const getMediaUrl = (item: unknown): unknown => {
  if (typeof item === 'string') {
    return item;
  }
  if (item && typeof item === 'object') {
    return (item as MediaObject).url;
  }
  return undefined;
};

const toContentAttrs = (property: string, content: unknown): MetaAttrs[] => {
  if (typeof content === 'string' && content.trim().length > 0) {
    return [{ property, content }];
  }
  if (typeof content === 'number' && Number.isFinite(content)) {
    return [{ property, content: `${content}` }];
  }
  return [];
};

export const transformMedia = (property: MediaProperty, value: unknown): MetaAttrs[] => normalizeMediaItems(value).flatMap((item) => {
  const url = getMediaUrl(item);
  if (typeof url !== 'string' || url.trim().length === 0) {
    return [];
  }

  const rootAttrs = toContentAttrs(`og:${property}`, url);
  if (!item || typeof item !== 'object') {
    return rootAttrs;
  }

  const media = item as MediaObject;
  const structuredAttrs = STRUCTURED_FIELDS[property].flatMap(([field, fieldName]) => toContentAttrs(`og:${property}:${fieldName}`, media[field]));
  return [...rootAttrs, ...structuredAttrs];
});
