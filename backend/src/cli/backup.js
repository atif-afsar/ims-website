/*
 * Saves every content table to one JSON file:   npm run backup
 *   → backups/ims-backup-2026-10-31T09-30.json   (or the path given after --)
 *
 * The admin account's password hash is left out on purpose. Uploaded files
 * are not included: copy the uploads folder alongside the backup.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import config from "../config.js";
import { pool, query, ident } from "../db.js";

const SKIP = new Set(["admins", "schema_migrations"]);

const stamp = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
const file = resolve(process.argv[2] || join(config.root, "backups", `ims-backup-${stamp}.json`));

const tables = (await query("SHOW TABLES")).map((r) => Object.values(r)[0]).filter((t) => !SKIP.has(t));
const [{ v: migration }] = await query("SELECT MAX(name) AS v FROM schema_migrations");

const data = {};
for (const t of tables) data[t] = await query(`SELECT * FROM ${ident(t)}`);

mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, JSON.stringify({ created: new Date().toISOString(), migration, tables: data }, null, 1));
console.log(`Backed up ${tables.length} tables (${Object.values(data).reduce((n, rows) => n + rows.length, 0)} rows) to ${file}`);
console.log(`Remember to also copy the uploads folder: ${config.uploadsDir}`);
await pool.end();
