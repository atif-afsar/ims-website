/*
 * Read-only API used by the public website. No login required.
 */
import { Router } from "express";
import rateLimit from "express-rate-limit";
import collections, { SETTINGS_KEYS } from "../collections.js";
import { query, ident } from "../db.js";

const router = Router();

// Browsers and the CDN may cache public content briefly (reads only)
router.use((req, res, next) => {
  res.set("Cache-Control", req.method === "GET" ? "public, max-age=60" : "no-store");
  next();
});

const listPublic = async (name) => {
  const def = collections[name];
  const cols = ["id", ...Object.keys(def.fields), "created_at"].map(ident).join(", ");
  const where = def.publicWhere ? `WHERE ${def.publicWhere}` : "";
  return query(`SELECT ${cols} FROM ${ident(name)} ${where} ORDER BY ${def.order}`);
};

const readSetting = async (key) => {
  const [row] = await query("SELECT value FROM settings WHERE setting_key = ?", [key]);
  if (!row) return null;
  return typeof row.value === "string" ? JSON.parse(row.value) : row.value;
};

/* Everything the homepage needs in one request */
router.get("/home", async (req, res) => {
  const [sections, heroSlides, notices, testimonials, events] = await Promise.all([
    query("SELECT section_key, sort_order, is_visible, content FROM home_sections ORDER BY sort_order"),
    listPublic("hero_slides"),
    listPublic("notices"),
    listPublic("testimonials"),
    query("SELECT id, title, event_date, event_type, description FROM calendar_events WHERE is_active = 1 AND event_date >= CURDATE() ORDER BY event_date LIMIT 8"),
  ]);
  res.json({
    sections: sections.map((s) => ({ ...s, is_visible: Boolean(s.is_visible), content: typeof s.content === "string" ? JSON.parse(s.content) : s.content })),
    heroSlides,
    notices,
    testimonials,
    upcomingEvents: events,
  });
});

router.get("/settings/:key", async (req, res) => {
  if (!SETTINGS_KEYS.includes(req.params.key)) return res.status(404).json({ error: "Not found" });
  res.json(await readSetting(req.params.key));
});

router.get("/neet", async (req, res) => {
  const names = ["neet_tracks", "neet_features", "neet_comparison", "neet_roadmap", "neet_results", "neet_faculty", "neet_answer_keys"];
  const [settings, ...lists] = await Promise.all([readSetting("neet_settings"), ...names.map(listPublic)]);
  const [tracks, features, comparison, roadmap, results, faculty, answerKeys] = lists;
  res.json({ settings, tracks, features, comparison, roadmap, results, faculty, answerKeys });
});

/* Gallery: active albums, newest first, each with its photos */
router.get("/gallery", async (req, res) => {
  const albums = await listPublic("gallery_albums");
  if (!albums.length) return res.json([]);
  const photos = await query(
    `SELECT id, album_id, url, caption FROM gallery_photos WHERE album_id IN (${albums.map(() => "?").join(", ")}) ORDER BY album_id, sort_order, id`,
    albums.map((a) => a.id)
  );
  const byAlbum = Object.groupBy ? Object.groupBy(photos, (p) => p.album_id) : photos.reduce((m, p) => ((m[p.album_id] ||= []).push(p), m), {});
  res.json(albums.map((a) => ({ ...a, photos: byAlbum[a.id] || [] })).filter((a) => a.photos.length));
});

/* Contact form: stored for the admin's Enquiries inbox */
const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many messages from this connection. Please try again in a few minutes, or call us." },
});

const clip = (v, max) => String(v ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/enquiries", enquiryLimiter, async (req, res) => {
  const body = req.body || {};
  // Honeypot: real visitors never see this field
  if (body.botcheck) return res.status(201).json({ ok: true });
  const row = {
    name: clip(body.name, 150),
    email: clip(body.email, 190),
    phone: clip(body.phone, 40),
    subject: clip(body.subject, 150),
    message: clip(body.message, 5000),
    page: clip(body.page, 200),
  };
  if (!row.name || !row.message) return res.status(400).json({ error: "Please add your name and a message." });
  if (!row.email && !row.phone) return res.status(400).json({ error: "Please add an email address or phone number so we can reply." });
  if (row.email && !EMAIL.test(row.email)) return res.status(400).json({ error: "Please check the email address." });
  await query("INSERT INTO enquiries (name, email, phone, subject, message, page) VALUES (?, ?, ?, ?, ?, ?)", [
    row.name, row.email || null, row.phone || null, row.subject || null, row.message, row.page || null,
  ]);
  res.status(201).json({ ok: true });
});

router.get("/:collection", async (req, res) => {
  const name = req.params.collection;
  if (!collections[name] || collections[name].private) return res.status(404).json({ error: "Not found" });
  res.json(await listPublic(name));
});

export default router;
