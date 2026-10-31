import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const env = process.env;
const production = env.NODE_ENV === "production";

if (production && (!env.JWT_SECRET || env.JWT_SECRET.length < 32)) {
  throw new Error("JWT_SECRET must be set to a random string of at least 32 characters in production");
}

const config = {
  production,
  port: Number(env.PORT) || 4000,
  db: {
    host: env.DB_HOST || "127.0.0.1",
    port: Number(env.DB_PORT) || 3306,
    user: env.DB_USER || "root",
    password: env.DB_PASSWORD || "",
    database: env.DB_NAME || "ims",
  },
  jwtSecret: env.JWT_SECRET || "dev-only-secret-change-me-dev-only-secret",
  sessionDays: Number(env.SESSION_DAYS) || 7,
  // Comma-separated origins allowed to call the API from another domain (dev server)
  corsOrigins: (env.CORS_ORIGINS || "http://localhost:3000,http://localhost:5173").split(",").map((s) => s.trim()).filter(Boolean),
  uploadsDir: resolve(root, env.UPLOADS_DIR || "uploads"),
  maxUploadMb: Number(env.MAX_UPLOAD_MB) || 8,
  // Built frontend served by the same app in production
  frontendDist: resolve(root, env.FRONTEND_DIST || "../frontend/dist"),
  // In production: www.islamicmissionschool.org — the bare domain redirects here
  canonicalHost: env.CANONICAL_HOST || "",
  root,
};

export default config;
