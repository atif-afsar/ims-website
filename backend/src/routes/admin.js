/*
 * Admin API: create, edit, reorder and delete content. Every route here is
 * behind requireAdmin (see server.js).
 */
import { Router } from "express";
import collections, { cleanRow, SETTINGS_KEYS } from "../collections.js";
import { query, ident, pool } from "../db.js";

const router = Router();

const SECTION_KEY = /^[a-z][a-z0-9_]{1,62}$/;

const load = (name) => {
  const def = collections[name];
  if (!def) {
    const err = new Error("Unknown collection");
    err.status = 404;
    throw err;
  }
  return def;
};

const getRow = async (name, id) => {
  const [row] = await query(`SELECT * FROM ${ident(name)} WHERE id = ?`, [id]);
  return row;
};

/* ── Homepage builder ─────────────────────────────────────────── */

router.get("/home/sections", async (req, res) => {
  const rows = await query("SELECT section_key, sort_order, is_visible, content, updated_at FROM home_sections ORDER BY sort_order");
  res.json(rows.map((s) => ({ ...s, is_visible: Boolean(s.is_visible), content: typeof s.content === "string" ? JSON.parse(s.content) : s.content })));
});

/* Save one section's content and/or visibility */
router.put("/home/sections/:key", async (req, res) => {
  const key = req.params.key;
  if (!SECTION_KEY.test(key)) return res.status(400).json({ error: "Invalid section" });
  const { content, is_visible, sort_order } = req.body || {};
  const json = content === undefined ? undefined : JSON.stringify(content);
  if (json && json.length > 200000) return res.status(400).json({ error: "Section content is too large" });

  // New sections go to the end; then update only the fields that were sent
  await query("INSERT IGNORE INTO home_sections (section_key, sort_order, is_visible) VALUES (?, 999, 1)", [key]);
  const updates = [];
  const params = [];
  const set = (column, value) => {
    updates.push(`${column} = ?`);
    params.push(value);
  };
  if (json !== undefined) set("content", json);
  if (is_visible !== undefined) set("is_visible", is_visible ? 1 : 0);
  if (sort_order !== undefined) set("sort_order", Number(sort_order) || 0);
  if (updates.length) await query(`UPDATE home_sections SET ${updates.join(", ")} WHERE section_key = ?`, [...params, key]);
  res.json({ ok: true });
});

/* Save the order (and visibility) of every section at once */
router.put("/home/order", async (req, res) => {
  const items = Array.isArray(req.body?.sections) ? req.body.sections : null;
  if (!items || items.some((s) => !SECTION_KEY.test(s.section_key))) return res.status(400).json({ error: "Invalid section list" });
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const [i, s] of items.entries()) {
      await conn.query(
        `INSERT INTO home_sections (section_key, sort_order, is_visible) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE sort_order = VALUES(sort_order), is_visible = VALUES(is_visible)`,
        [s.section_key, i, s.is_visible === false ? 0 : 1]
      );
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
  res.json({ ok: true });
});

/* Drop a section's saved content so it falls back to the built-in defaults */
router.delete("/home/sections/:key", async (req, res) => {
  await query("UPDATE home_sections SET content = NULL WHERE section_key = ?", [req.params.key]);
  res.json({ ok: true });
});

/* ── Settings ─────────────────────────────────────────────────── */

router.get("/settings/:key", async (req, res) => {
  if (!SETTINGS_KEYS.includes(req.params.key)) return res.status(404).json({ error: "Not found" });
  const [row] = await query("SELECT value FROM settings WHERE setting_key = ?", [req.params.key]);
  res.json(row ? (typeof row.value === "string" ? JSON.parse(row.value) : row.value) : null);
});

router.put("/settings/:key", async (req, res) => {
  if (!SETTINGS_KEYS.includes(req.params.key)) return res.status(404).json({ error: "Not found" });
  const value = req.body;
  if (!value || typeof value !== "object" || Array.isArray(value)) return res.status(400).json({ error: "Settings must be an object" });
  await query("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [req.params.key, JSON.stringify(value)]);
  res.json({ ok: true });
});

/* ── Generic collections ──────────────────────────────────────── */

router.get("/:collection", async (req, res) => {
  const def = load(req.params.collection);
  res.json(await query(`SELECT * FROM ${ident(req.params.collection)} ORDER BY ${def.order}`));
});

router.post("/:collection", async (req, res) => {
  const name = req.params.collection;
  load(name);
  // Accepts one row or an array of rows (used by "import defaults")
  const inputs = Array.isArray(req.body) ? req.body : [req.body || {}];
  if (inputs.length > 500) return res.status(400).json({ error: "Too many rows at once" });
  const created = [];
  for (const input of inputs) {
    const { row, errors } = cleanRow(name, input);
    if (errors.length) return res.status(400).json({ error: errors.join(", ") });
    const cols = Object.keys(row);
    const result = await query(
      `INSERT INTO ${ident(name)} (${cols.map(ident).join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`,
      cols.map((c) => row[c])
    );
    created.push(await getRow(name, result.insertId));
  }
  res.status(201).json(Array.isArray(req.body) ? created : created[0]);
});

/* Save a new order: body { ids: [3, 1, 2] } sets sort_order 0..n */
router.put("/:collection/order", async (req, res) => {
  const name = req.params.collection;
  const def = load(name);
  if (!def.fields.sort_order) return res.status(400).json({ error: "This list cannot be reordered" });
  const ids = Array.isArray(req.body?.ids) ? req.body.ids.map(Number) : [];
  if (!ids.length || ids.some((id) => !Number.isInteger(id))) return res.status(400).json({ error: "ids must be a list of numbers" });
  await Promise.all(ids.map((id, i) => query(`UPDATE ${ident(name)} SET sort_order = ? WHERE id = ?`, [i, id])));
  res.json({ ok: true });
});

router.put("/:collection/:id", async (req, res) => {
  const name = req.params.collection;
  load(name);
  const { row, errors } = cleanRow(name, req.body || {}, { partial: true });
  if (errors.length) return res.status(400).json({ error: errors.join(", ") });
  const cols = Object.keys(row);
  if (!cols.length) return res.status(400).json({ error: "Nothing to update" });
  const result = await query(`UPDATE ${ident(name)} SET ${cols.map((c) => `${ident(c)} = ?`).join(", ")} WHERE id = ?`, [...cols.map((c) => row[c]), req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ error: "Not found" });
  res.json(await getRow(name, req.params.id));
});

router.delete("/:collection/:id", async (req, res) => {
  const name = req.params.collection;
  load(name);
  const result = await query(`DELETE FROM ${ident(name)} WHERE id = ?`, [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
