/**
 * Production origin for canonical URLs, Open Graph, and structured data.
 * Keep sitemap.xml and robots.txt in sync with this host.
 */
export const SITE_ORIGIN = "https://islamicmissionschool.org";

/** Absolute URL for a path (path must start with "/" or be relative segment). */
export function siteUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}
