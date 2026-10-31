/*
 * Restores a backup made with `npm run backup`:
 *   npm run restore -- backups/ims-backup-2026-10-31T09-30.json
 *
 * Replaces the content of every table in the file (the admin account is
 * untouched). Run `npm run migrate` first on a fresh database.
 */
import { readFileSync } from "node:fs";
import { pool, ident } from "../db.js";

const path = process.argv[2];
if (!path) {
  console.error("Usage: npm run restore -- <backup file>");
  process.exit(1);
}
const backup = JSON.parse(readFileSync(path, "utf8"));
const tables = Object.entries(backup.tables || {});

const conn = await pool.getConnection();
try {
  await conn.query("SET FOREIGN_KEY_CHECKS = 0");
  await conn.beginTransaction();
  for (const [table, rows] of tables) {
    await conn.query(`DELETE FROM ${ident(table)}`);
    for (const row of rows) {
      // JSON columns come back as objects; store them as JSON text again
      const values = Object.values(row).map((v) => (v !== null && typeof v === "object" ? JSON.stringify(v) : v));
      const cols = Object.keys(row).map(ident).join(", ");
      await conn.query(`INSERT INTO ${ident(table)} (${cols}) VALUES (${values.map(() => "?").join(", ")})`, values);
    }
    console.log(`- ${table}: ${rows.length} rows`);
  }
  await conn.commit();
  console.log(`Restored backup from ${backup.created}.`);
} catch (err) {
  await conn.rollback();
  console.error("Restore failed, nothing was changed:", err.message);
  process.exitCode = 1;
} finally {
  await conn.query("SET FOREIGN_KEY_CHECKS = 1");
  conn.release();
  await pool.end();
}
