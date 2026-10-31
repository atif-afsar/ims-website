/*
 * File uploads for the admin panel (photos, posters, PDFs). Files are stored
 * on disk under uploads/<folder>/ and served at /uploads/... by server.js.
 */
import { Router } from "express";
import multer from "multer";
import { mkdirSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import { randomBytes } from "node:crypto";
import config from "../config.js";

const TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
};
const FOLDER = /^[a-z0-9-]{1,40}(\/[a-z0-9-]{1,40})?$/;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folder = String(req.query.folder || "general");
    if (!FOLDER.test(folder)) return cb(new Error("Invalid folder"));
    const dir = join(config.uploadsDir, folder);
    mkdirSync(dir, { recursive: true });
    req.uploadFolder = folder;
    cb(null, dir);
  },
  filename(req, file, cb) {
    // Keep a readable slug of the original name, but never trust its extension
    const base = file.originalname.replace(extname(file.originalname), "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "file";
    cb(null, `${Date.now()}-${randomBytes(3).toString("hex")}-${base}${TYPES[file.mimetype]}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: config.maxUploadMb * 1024 * 1024, files: 1 },
  fileFilter(req, file, cb) {
    if (TYPES[file.mimetype]) cb(null, true);
    else cb(Object.assign(new Error("Only JPG, PNG, WebP, GIF images or PDF files can be uploaded."), { status: 400 }));
  },
});

const router = Router();

router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const tooBig = err.code === "LIMIT_FILE_SIZE";
      return res.status(400).json({ error: tooBig ? `Files must be smaller than ${config.maxUploadMb} MB.` : err.message });
    }
    if (!req.file) return res.status(400).json({ error: "No file received." });
    res.status(201).json({ url: `/uploads/${req.uploadFolder}/${req.file.filename}`, size: req.file.size, type: req.file.mimetype });
  });
});

/*
 * Deletes a file stored under uploads/ given its public URL ("/uploads/...").
 * Anything else (library photos, outside links) is ignored. Returns false for invalid URLs.
 */
export function removeUploadedFile(url) {
  const match = String(url || "").match(/^\/uploads\/([a-z0-9-]+(?:\/[a-z0-9-]+)?)\/([a-z0-9.-]+)$/);
  if (!match) return false;
  try {
    unlinkSync(join(config.uploadsDir, match[1], match[2]));
  } catch {
    /* already gone */
  }
  return true;
}

/* Remove an uploaded file: body { url: "/uploads/..." } */
router.delete("/", (req, res) => {
  if (!removeUploadedFile(req.body?.url)) return res.status(400).json({ error: "Invalid file" });
  res.json({ ok: true });
});

export default router;
