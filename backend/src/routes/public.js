/*
 * Read-only API used by the public website. No login required.
 */
import { Router } from "express";
import collections, { SETTINGS_KEYS } from "../collections.js";
import { query, ident } from "../db.js";

const router = Router();

// Browsers and the CDN may cache public content briefly
router.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=60");
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

router.get("/:collection", async (req, res) => {
  const name = req.params.collection;
  if (!collections[name]) return res.status(404).json({ error: "Not found" });
  res.json(await listPublic(name));
});

export default router;
