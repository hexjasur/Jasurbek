import { SITE_CONFIG } from '../config';

/** Site base path with a guaranteed trailing slash (e.g. `/`). */
export const BASE_URL: string = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Prefix a site-relative path with the base path: `withBase('blog')` -> `/blog`. */
export function withBase(path = ''): string {
  return `${BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** Build a fully-qualified URL: `absoluteUrl('og/default.png')`. */
export function absoluteUrl(path = ''): string {
  return `${SITE_CONFIG.siteUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}
