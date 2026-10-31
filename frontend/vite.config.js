import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";

const SITE_ORIGIN = "https://www.islamicmissionschool.org";

/*
 * At build time, turns src/content/seo-pages.json into:
 *   dist/sitemap.xml      for search engines
 *   dist/seo-pages.json   read by the server to fill in each page's head tags
 */
const seoFiles = () => ({
  name: "ims-seo-files",
  apply: "build",
  generateBundle() {
    const seo = JSON.parse(readFileSync(new URL("./src/content/seo-pages.json", import.meta.url), "utf8"));
    const today = new Date().toISOString().slice(0, 10);
    const urls = Object.entries(seo.pages)
      .map(([path, p]) => `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq || "monthly"}</changefreq>\n    <priority>${(p.priority ?? 0.5).toFixed(2)}</priority>\n  </url>`)
      .join("\n");
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
    this.emitFile({ type: "asset", fileName: "seo-pages.json", source: JSON.stringify({ origin: SITE_ORIGIN, ...seo }) });
  },
});

export default defineConfig({
  plugins: [react(), seoFiles()],
  server: {
    port: 3000,
    // The Node backend (backend/) serves the API and uploaded files
    proxy: {
      "/api": "http://localhost:4000",
      "/uploads": "http://localhost:4000",
    },
  },
});
