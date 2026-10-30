import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import config from "./config.js";
import { pool } from "./db.js";
import authRoutes, { requireAdmin } from "./auth.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/uploads.js";

export function createApp() {
  const app = express();
  app.set("trust proxy", 1); // behind Hostinger's proxy: real client IPs for rate limiting
  app.disable("x-powered-by");

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "blob:", "https:"],
          mediaSrc: ["'self'", "https:"],
          // Supabase stays allowed only until every page reads from this API (migration phase)
          connectSrc: ["'self'", "https://api.web3forms.com", "https://*.supabase.co"],
          frameSrc: ["https://www.google.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: config.production ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));

  // The Vite dev server runs on another port; allow it to call the API with cookies
  app.use("/api", (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && config.corsOrigins.includes(origin)) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        Vary: "Origin",
      });
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
  });

  // Writes must be JSON (or a file upload); a cross-site HTML form can't send either with our cookie
  app.use("/api", (req, res, next) => {
    if (["POST", "PUT", "DELETE"].includes(req.method) && !req.is("application/json") && !req.is("multipart/form-data") && req.headers["content-length"] !== "0") {
      return res.status(415).json({ error: "Send JSON" });
    }
    next();
  });

  app.get("/api/health", async (req, res) => {
    let database = false;
    try {
      await pool.query("SELECT 1");
      database = true;
    } catch {
      /* reported below */
    }
    res.status(database ? 200 : 503).json({ ok: database, database });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/public", publicRoutes);
  app.use("/api/admin/uploads", requireAdmin, uploadRoutes);
  app.use("/api/admin", requireAdmin, adminRoutes);
  app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

  // Uploaded files
  mkdirSync(config.uploadsDir, { recursive: true });
  app.use("/uploads", express.static(config.uploadsDir, { maxAge: "30d", immutable: true, index: false }));

  // The built website (production: one Node app serves both site and API)
  if (existsSync(config.frontendDist)) {
    app.use("/assets", express.static(join(config.frontendDist, "assets"), { maxAge: "1y", immutable: true }));
    app.use(express.static(config.frontendDist, { maxAge: "1h", index: false }));
    app.get(/^(?!\/api\/|\/uploads\/).*/, (req, res) => {
      res.set("Cache-Control", "no-cache").sendFile(join(config.frontendDist, "index.html"));
    });
  }

  // Errors: log the detail, show the visitor something short
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const status = err.status || 500;
    const dbDown = ["ECONNREFUSED", "ER_ACCESS_DENIED_ERROR", "ER_BAD_DB_ERROR", "PROTOCOL_CONNECTION_LOST"].includes(err.code);
    if (dbDown) console.error(`Database unavailable (${err.code}) on ${req.method} ${req.path}`);
    else if (status >= 500) console.error(err);
    res.status(dbDown ? 503 : status).json({ error: dbDown ? "The database is unavailable. Please try again shortly." : status >= 500 ? "Something went wrong." : err.message });
  });

  return app;
}
