/*
 * One-time copy of the old Supabase content into MySQL.
 *
 *   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_KEY=<anon or service key> npm run import-supabase
 *   … add --replace to empty each table first (otherwise tables that already have rows are skipped)
 *
 * - Copies every collection in collections.js, keeping ids and created_at.
 * - contact_info and neet_settings (single rows) become settings objects.
 * - Files in Supabase Storage that the rows point to are downloaded into
 *   uploads/ and the URLs are rewritten to /uploads/..., so nothing depends
 *   on Supabase afterwards.
 * With the anon key, rows hidden by Supabase's access rules (e.g. inactive
 * items) can't be read; use the service-role key to copy everything.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import collections from "../collections.js";
import config from "../config.js";
import { pool, query, ident } from "../db.js";

const URL_BASE = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const KEY = process.env.SUPABASE_KEY;
const REPLACE = process.argv.includes("--replace");
if (!URL_BASE || !KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_KEY first.");
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` };

async function fetchTable(table) {
  const res = await fetch(`${URL_BASE}/rest/v1/${table}?select=*`, { headers });
  if (res.status === 404) return null; // table never existed
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  return res.json();
}

/* Download a Supabase Storage file into uploads/ and return its new URL */
const STORAGE = new RegExp(`^${URL_BASE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/storage/v1/object/public/[^/]+/(.+)$`);
const downloaded = new Map();
async function localise(value) {
  if (typeof value !== "string") return value;
  const match = value.match(STORAGE);
  if (!match) return value;
  if (downloaded.has(value)) return downloaded.get(value);
  // Folder rules match routes/uploads.js: lowercase letters, digits and dashes
  const parts = decodeURIComponent(match[1]).split("/");
  const name = parts.pop().toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "file";
  const folder = ["supabase", ...parts.map((p) => p.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "files")].slice(0, 2).join("/");
  const local = `/uploads/${folder}/${name}`;
  const path = join(config.uploadsDir, folder, name);
  try {
    if (!existsSync(path)) {
      const res = await fetch(value);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, Buffer.from(await res.arrayBuffer()));
    }
    downloaded.set(value, local);
    return local;
  } catch (err) {
    console.warn(`  ! could not download ${value} (${err.message}); keeping the old link`);
    downloaded.set(value, value);
    return value;
  }
}

const toDate = (v) => (v ? String(v).slice(0, 10) : v);
const toTimestamp = (v) => (v ? new Date(v).toISOString().slice(0, 19).replace("T", " ") : null);

async function importTable(name) {
  const def = collections[name];
  const rows = await fetchTable(name);
  if (rows === null) return console.log(`- ${name}: not in Supabase, skipped`);
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${ident(name)}`);
  if (n > 0 && !REPLACE) return console.log(`- ${name}: already has ${n} rows, skipped (use --replace)`);
  if (REPLACE) await query(`DELETE FROM ${ident(name)}`);

  let copied = 0;
  for (const src of rows) {
    const row = {};
    if (src.id !== undefined && Number.isInteger(Number(src.id))) row.id = Number(src.id);
    if (src.created_at) row.created_at = toTimestamp(src.created_at);
    for (const [field, type] of Object.entries(def.fields)) {
      if (!(field in src)) continue;
      let v = src[field];
      if (type === "bool") v = v === null ? null : v ? 1 : 0;
      else if (type === "date") v = toDate(v);
      else if (type === "int") v = v === null ? null : Number(v);
      else v = await localise(v);
      row[field] = v;
    }
    const missing = (def.required || []).filter((f) => row[f] === null || row[f] === undefined);
    if (missing.length) {
      console.warn(`  ! ${name} #${src.id}: missing ${missing.join(", ")}, skipped`);
      continue;
    }
    const cols = Object.keys(row);
    await query(`INSERT INTO ${ident(name)} (${cols.map(ident).join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`, cols.map((c) => row[c]));
    copied++;
  }
  console.log(`- ${name}: ${copied} of ${rows.length} rows`);
}

async function importSetting(table) {
  const rows = await fetchTable(table);
  if (!rows?.length) return console.log(`- ${table}: nothing to copy`);
  const [exists] = await query("SELECT 1 FROM settings WHERE setting_key = ?", [table]);
  if (exists && !REPLACE) return console.log(`- ${table}: already set, skipped (use --replace)`);
  const { id, created_at, updated_at, ...value } = rows.find((r) => r.id === 1) || rows[0];
  for (const k of Object.keys(value)) value[k] = await localise(value[k]);
  await query("INSERT INTO settings (setting_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)", [table, JSON.stringify(value)]);
  console.log(`- ${table}: copied`);
}

console.log(`Importing from ${URL_BASE}${REPLACE ? " (replacing existing rows)" : ""}`);
for (const name of Object.keys(collections)) await importTable(name);
for (const table of ["contact_info", "neet_settings"]) await importSetting(table);
console.log(`Done. ${[...downloaded.values()].filter((v) => v.startsWith("/uploads/")).length} files downloaded into uploads/.`);
await pool.end();
