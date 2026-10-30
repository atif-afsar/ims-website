/*
 * Applies migrations/*.sql in name order, once each.  npm run migrate
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import mysql from "mysql2/promise";
import config from "../config.js";

const dir = join(config.root, "migrations");

const conn = await mysql.createConnection({ ...config.db, multipleStatements: true, charset: "utf8mb4" });
await conn.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
  name VARCHAR(190) PRIMARY KEY,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

const [rows] = await conn.query("SELECT name FROM schema_migrations");
const applied = new Set(rows.map((r) => r.name));
const pending = readdirSync(dir).filter((f) => f.endsWith(".sql") && !applied.has(f)).sort();

if (!pending.length) console.log("Database is up to date.");
for (const file of pending) {
  process.stdout.write(`Applying ${file} … `);
  await conn.query(readFileSync(join(dir, file), "utf8"));
  await conn.query("INSERT INTO schema_migrations (name) VALUES (?)", [file]);
  console.log("done");
}
await conn.end();
