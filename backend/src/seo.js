/*
 * Server-side SEO for the single-page website.
 *
 * Search engines and link previews (WhatsApp, Facebook, LinkedIn) read the
 * HTML before any JavaScript runs. For every request this fills the page's
 * own title, description, canonical URL and share image into index.html,
 * using dist/seo-pages.json (built from frontend/src/content/seo-pages.json).
 * It also decides the HTTP status: 200 for real pages, 301 for old URLs and
 * trailing slashes, 404 for anything else (so Google never indexes junk URLs).
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const imageFor = (path) => `/images/og/${path === "/" ? "home" : path.slice(1).replace(/\//g, "-")}.jpg`;

/* Replace the content of one head tag; leaves the HTML unchanged if the tag is missing */
const setAttr = (html, selector, attr, value) => html.replace(new RegExp(`(<${selector}[^>]*?\\s${attr}=")[^"]*(")`), `$1${esc(value)}$2`);

export function createSeo(distDir) {
  const htmlFile = join(distDir, "index.html");
  const seoFile = join(distDir, "seo-pages.json");
  const template = readFileSync(htmlFile, "utf8");
  const seo = existsSync(seoFile) ? JSON.parse(readFileSync(seoFile, "utf8")) : { pages: {}, redirects: {} };
  const origin = seo.origin || "";
  const cache = new Map();

  // Plain links to every page inside <noscript>, so crawlers without JavaScript can still find them
  const navLinks = Object.entries(seo.pages)
    .map(([path, p]) => `<a href="${esc(path)}">${esc(p.name)}</a>`)
    .join(" · ");

  const fill = (page, path, { index }) => {
    const url = `${origin}${path}`;
    const image = `${origin}${imageFor(path)}`;
    let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(page.title)}</title>`);
    html = setAttr(html, 'meta name="description"', "content", page.description);
    html = setAttr(html, 'meta name="robots"', "content", index ? "index, follow, max-image-preview:large" : "noindex, follow");
    html = setAttr(html, 'link rel="canonical"', "href", url);
    html = setAttr(html, 'meta property="og:title"', "content", page.title);
    html = setAttr(html, 'meta property="og:description"', "content", page.description);
    html = setAttr(html, 'meta property="og:url"', "content", url);
    html = setAttr(html, 'meta property="og:image"', "content", image);
    html = setAttr(html, 'meta name="twitter:title"', "content", page.title);
    html = setAttr(html, 'meta name="twitter:description"', "content", page.description);
    html = setAttr(html, 'meta name="twitter:image"', "content", image);
    return html.replace("<!--seo-body-->", `<h1>${esc(page.title)}</h1><p>${esc(page.description)}</p><nav>${navLinks}</nav>`);
  };

  /*
   * → { redirect }            301 to another URL
   * → { status, html, index } the page to send
   */
  return function render(rawPath) {
    // "/about/" → "/about"
    if (rawPath.length > 1 && rawPath.endsWith("/")) return { redirect: rawPath.replace(/\/+$/, "") || "/" };
    if (seo.redirects?.[rawPath]) return { redirect: seo.redirects[rawPath] };

    if (cache.has(rawPath)) return cache.get(rawPath);
    let result;
    if (seo.pages[rawPath]) result = { status: 200, index: true, html: fill(seo.pages[rawPath], rawPath, { index: true }) };
    else if (rawPath === "/admin" || rawPath.startsWith("/admin/")) result = { status: 200, index: false, html: fill({ title: "IMS Admin", description: "" }, "/", { index: false }) };
    else result = { status: 404, index: false, html: fill(seo.notFound || { title: "Page not found", description: "" }, "/", { index: false }) };

    // Only remember known paths; random 404 URLs must not grow the cache
    if (result.status === 200) cache.set(rawPath, result);
    return result;
  };
}
