/*
 * Database setup that runs on every server start (and via npm run migrate),
 * so a fresh hosting account needs no command line:
 *   1. applies migrations/*.sql that haven't run yet, in name order
 *   2. creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD when there is none
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import config from "./config.js";

export async function runMigrations(log = console.log) {
  const dir = join(config.root, "migrations");
  const conn = await mysql.createConnection({ ...config.db, multipleStatements: true, charset: "utf8mb4" });
  try {
    await conn.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(190) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    const [rows] = await conn.query("SELECT name FROM schema_migrations");
    const applied = new Set(rows.map((r) => r.name));
    const pending = readdirSync(dir).filter((f) => f.endsWith(".sql") && !applied.has(f)).sort();
    for (const file of pending) {
      log(`Applying ${file} …`);
      await conn.query(readFileSync(join(dir, file), "utf8"));
      await conn.query("INSERT INTO schema_migrations (name) VALUES (?)", [file]);
    }
    if (!pending.length) log("Database is up to date.");
    return pending;
  } finally {
    await conn.end();
  }
}

export async function ensureFirstAdmin(log = console.log) {
  const email = String(process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = String(process.env.ADMIN_PASSWORD || "");
  if (!email || !password) return false;
  const conn = await mysql.createConnection({ ...config.db, charset: "utf8mb4" });
  try {
    const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM admins");
    if (n > 0) return false; // only ever creates the very first account
    if (password.length < 10) {
      log("ADMIN_PASSWORD must be at least 10 characters; no admin created.");
      return false;
    }
    await conn.query("INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)", [email, await bcrypt.hash(password, 12), "Administrator"]);
    log(`Created the first admin account (${email}). You can now remove ADMIN_PASSWORD from the settings.`);
    return true;
  } finally {
    await conn.end();
  }
}
