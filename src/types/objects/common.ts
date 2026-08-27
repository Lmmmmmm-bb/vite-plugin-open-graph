/** An absolute HTTP(S) URL referencing another Open Graph object. */
export type ObjectReference = string;

/** A website object has no namespaced properties beyond the basic metadata. */
export interface WebsiteObjectOptions {
  type: 'website';
}

/** Metadata for a person represented by the current page. */
export interface ProfileObjectOptions {
  type: 'profile';
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: 'male' | 'female';
}
