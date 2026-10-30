import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import config from "./config.js";
import { query } from "./db.js";

const COOKIE = "ims_admin";

// Compared against when the email is unknown, so response time doesn't reveal valid accounts
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

const cookieOptions = {
  httpOnly: true, // not readable from page scripts
  secure: config.production,
  sameSite: "lax",
  path: "/",
  maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
};

/* Rejects requests without a valid admin session */
export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE];
  if (!token) return res.status(401).json({ error: "Please log in." });
  try {
    req.admin = jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    res.clearCookie(COOKIE, { path: "/" });
    res.status(401).json({ error: "Your session has expired. Please log in again." });
  }
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please wait 15 minutes and try again." },
});

const router = Router();

router.post("/login", loginLimiter, async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase().trim();
  const password = String(req.body?.password || "");
  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

  const [admin] = await query("SELECT id, email, name, password_hash FROM admins WHERE email = ?", [email]);
  const ok = await bcrypt.compare(password, admin?.password_hash || DUMMY_HASH);
  if (!admin || !ok) return res.status(401).json({ error: "Incorrect email or password." });

  const user = { id: admin.id, email: admin.email, name: admin.name };
  const token = jwt.sign(user, config.jwtSecret, { expiresIn: `${config.sessionDays}d` });
  res.cookie(COOKIE, token, cookieOptions).json({ user });
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE, { path: "/" }).json({ ok: true });
});

router.get("/me", requireAdmin, (req, res) => {
  const { id, email, name } = req.admin;
  res.json({ user: { id, email, name } });
});

router.post("/password", requireAdmin, async (req, res) => {
  const current = String(req.body?.current || "");
  const next = String(req.body?.next || "");
  if (next.length < 10) return res.status(400).json({ error: "New password must be at least 10 characters." });
  const [admin] = await query("SELECT password_hash FROM admins WHERE id = ?", [req.admin.id]);
  if (!admin || !(await bcrypt.compare(current, admin.password_hash))) return res.status(400).json({ error: "Current password is incorrect." });
  await query("UPDATE admins SET password_hash = ? WHERE id = ?", [await bcrypt.hash(next, 12), req.admin.id]);
  res.json({ ok: true });
});

export default router;
