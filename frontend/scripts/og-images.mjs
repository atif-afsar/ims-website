/*
 * Share images (1200×630) for link previews on WhatsApp, Facebook, X and
 * LinkedIn: one per page in src/content/seo-pages.json, using its `photo`.
 *
 *   npm run og      → public/images/og/<page>.jpg
 *
 * Re-run after adding a page or changing a page's photo or name.
 */
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";
import media from "../src/content/media.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const seo = JSON.parse(readFileSync(join(root, "src/content/seo-pages.json"), "utf8"));
const outDir = join(root, "public/images/og");
mkdirSync(outDir, { recursive: true });

const W = 1200;
const H = 630;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const slugOf = (path) => (path === "/" ? "home" : path.slice(1).replace(/\//g, "-"));

/* Split a heading into at most two lines of ~22 characters */
const lines = (text, max = 22) => {
  const words = text.split(" ");
  const out = [""];
  for (const w of words) {
    const cur = out[out.length - 1];
    if (cur && (cur + " " + w).length > max && out.length < 2) out.push(w);
    else out[out.length - 1] = cur ? `${cur} ${w}` : w;
  }
  return out;
};

const overlay = (heading, isHome) => {
  const head = lines(heading);
  const size = head.some((l) => l.length > 16) ? 68 : 80;
  const top = H - 150 - (head.length - 1) * (size + 6);
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#002014" stop-opacity="0.92"/>
      <stop offset="0.55" stop-color="#002E1C" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#001E36" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="#E4C062"/>
  <text x="200" y="98" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="#FFFAF2">Islamic Mission School</text>
  <text x="200" y="138" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#EAC678">ALIGARH · AFFILIATED TO CISCE</text>
  ${head
    .map((l, i) => `<text x="72" y="${top + i * (size + 6)}" font-family="Georgia, 'Times New Roman', serif" font-size="${size}" font-weight="700" fill="${isHome && i === head.length - 1 ? "#E4C062" : "#FFFAF2"}">${esc(l)}</text>`)
    .join("\n  ")}
  <text x="72" y="${H - 62}" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#FCF0DE" fill-opacity="0.9">www.islamicmissionschool.org</text>
</svg>`);
};

// Logo in a round ivory badge
const logo = await sharp(join(root, "public/images/logo/logo.webp")).resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const badge = await sharp({ create: { width: 112, height: 112, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: Buffer.from('<svg width="112" height="112"><circle cx="56" cy="56" r="56" fill="#FFFAF2"/></svg>') },
    { input: logo, top: 8, left: 8 },
  ])
  .png()
  .toBuffer();

for (const [path, page] of Object.entries(seo.pages)) {
  const photo = media[page.photo];
  if (!photo) {
    console.warn(`! ${path}: photo "${page.photo}" is not in the library, skipped`);
    continue;
  }
  const heading = path === "/" ? "Shaping Hearts, Building Minds" : page.name;
  const file = join(outDir, `${slugOf(path)}.jpg`);
  await sharp(join(root, "public", photo.src))
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([{ input: overlay(heading, path === "/") }, { input: badge, top: 50, left: 72 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(file);
  console.log(`✓ ${path} → public/images/og/${slugOf(path)}.jpg`);
}
