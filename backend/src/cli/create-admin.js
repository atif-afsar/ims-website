/*
 * Creates the admin account, or resets its password.
 *   npm run create-admin -- admin@example.com "a long password"
 */
import bcrypt from "bcryptjs";
import { pool, query } from "../db.js";

const [email, password, name = "Administrator"] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npm run create-admin -- <email> "<password>" [name]');
  process.exit(1);
}
if (password.length < 10) {
  console.error("Use a password of at least 10 characters.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
await query(
  "INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), name = VALUES(name)",
  [email.toLowerCase().trim(), hash, name]
);
console.log(`Admin ${email} is ready.`);
await pool.end();
