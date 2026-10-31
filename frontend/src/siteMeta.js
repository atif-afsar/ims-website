/**
 * Production origin for canonical URLs, Open Graph, structured data and the
 * sitemap. The server redirects the bare domain to this one (backend CANONICAL_HOST).
 */
export const SITE_ORIGIN = "https://www.islamicmissionschool.org";

/** Absolute URL for a path (path must start with "/" or be relative segment). */
export function siteUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}

/** Share image (1200×630) for a page path, made by scripts/og-images.mjs */
export const ogImagePath = (path) => `/images/og/${path === "/" ? "home" : path.slice(1).replace(/\//g, "-")}.jpg`;
