import express from "express";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import config from "./config.js";
import { pool } from "./db.js";
import { createSeo } from "./seo.js";
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
          connectSrc: ["'self'", "https://api.web3forms.com"],
          frameSrc: ["'self'", "https://www.google.com"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: config.production ? [] : null,
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );
  // islamicmissionschool.org → www.islamicmissionschool.org (one address for search engines)
  const canonicalHost = config.canonicalHost;
  if (canonicalHost) {
    const bare = canonicalHost.replace(/^www\./, "");
    app.use((req, res, next) => {
      if (req.hostname === bare && (req.method === "GET" || req.method === "HEAD")) {
        return res.redirect(301, `https://${canonicalHost}${req.originalUrl}`);
      }
      next();
    });
  }

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

  // Writes that carry data must be JSON (or a file upload); a cross-site HTML form can't send
  // either with our cookie. Requests without a body (e.g. most DELETEs) are fine.
  app.use("/api", (req, res, next) => {
    if (!["POST", "PUT", "DELETE"].includes(req.method)) return next();
    const type = req.headers["content-type"];
    const length = req.headers["content-length"];
    const hasBody = Boolean(req.headers["transfer-encoding"]) || (length !== undefined && length !== "0");
    const ok = type ? /^(application\/json|multipart\/form-data)\b/i.test(type) : !hasBody;
    if (!ok) return res.status(415).json({ error: "Send JSON" });
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
  if (existsSync(join(config.frontendDist, "index.html"))) {
    app.use("/assets", express.static(join(config.frontendDist, "assets"), { maxAge: "1y", immutable: true }));
    app.use(express.static(config.frontendDist, { maxAge: "1h", index: false }));
    // Every other page: index.html with that page's title, description and status (see seo.js)
    const render = createSeo(config.frontendDist);
    app.get(/^(?!\/api\/|\/uploads\/).*/, (req, res) => {
      const result = render(req.path);
      if (result.redirect) {
        const query = req.originalUrl.slice(req.path.length);
        return res.redirect(301, result.redirect + (result.redirect.includes("#") ? "" : query));
      }
      res.status(result.status).set("Cache-Control", "no-cache");
      if (!result.index) res.set("X-Robots-Tag", "noindex");
      res.type("html").send(result.html);
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
