/*
 * API tests that run without a database (DB_PORT points at a closed port).
 * Database-backed behaviour is covered by test/db.test.js.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

process.env.DB_PORT = "1"; // nothing listens here: every query fails fast
process.env.UPLOADS_DIR = "test-uploads";
const { createApp } = await import("../src/app.js");
const { cleanRow } = await import("../src/collections.js");
const config = (await import("../src/config.js")).default;

let server;
let base;
const adminCookie = `ims_admin=${jwt.sign({ id: 1, email: "a@b.c" }, config.jwtSecret)}`;

before(async () => {
  server = createApp().listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());

const call = (path, opts = {}) => fetch(base + path, opts);
const json = (body, extra = {}) => ({ method: "POST", headers: { "Content-Type": "application/json", ...extra }, body: JSON.stringify(body) });

test("health reports the database as down", async () => {
  const res = await call("/api/health");
  assert.equal(res.status, 503);
  assert.deepEqual(await res.json(), { ok: false, database: false });
});

test("unknown API routes return 404 JSON", async () => {
  const res = await call("/api/nope");
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error, "Not found");
});

test("admin routes require a session", async () => {
  for (const path of ["/api/admin/notices", "/api/admin/home/sections", "/api/auth/me"]) {
    assert.equal((await call(path)).status, 401, path);
  }
  assert.equal((await call("/api/admin/uploads", { method: "POST" })).status, 401);
});

test("a forged or expired session is rejected", async () => {
  const forged = `ims_admin=${jwt.sign({ id: 1 }, "wrong-secret")}`;
  const expired = `ims_admin=${jwt.sign({ id: 1, exp: 1 }, config.jwtSecret)}`;
  for (const cookie of [forged, expired]) {
    const res = await call("/api/admin/notices", { headers: { Cookie: cookie } });
    assert.equal(res.status, 401);
  }
});

test("writes must be JSON", async () => {
  const res = await call("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: "email=a&password=b" });
  assert.equal(res.status, 415);
});

test("login validates input before touching the database", async () => {
  const res = await call("/api/auth/login", json({ email: "" }));
  assert.equal(res.status, 400);
});

test("login with the database down fails gracefully", async () => {
  const res = await call("/api/auth/login", json({ email: "a@b.c", password: "whatever-123" }));
  assert.equal(res.status, 503);
  assert.match((await res.json()).error, /database/i);
});

test("unknown collections are rejected for admins and the public", async () => {
  assert.equal((await call("/api/public/admins")).status, 404);
  assert.equal((await call("/api/admin/admins", { headers: { Cookie: adminCookie } })).status, 404);
  assert.equal((await call("/api/admin/settings/secrets", { headers: { Cookie: adminCookie } })).status, 404);
});

test("create validates required fields and types", async () => {
  const res = await call("/api/admin/calendar_events", json({ title: "Sports Day", event_date: "next week" }, { Cookie: adminCookie }));
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /event_date must be a date/);
  const res2 = await call("/api/admin/notices", json({ link: "/x" }, { Cookie: adminCookie }));
  assert.match((await res2.json()).error, /title is required/);
});

test("home section keys are validated", async () => {
  const res = await call("/api/admin/home/sections/Bad-Key!", { ...json({ is_visible: false }, { Cookie: adminCookie }), method: "PUT" });
  assert.equal(res.status, 400);
});

test("uploads reject disallowed file types", async () => {
  const form = new FormData();
  form.append("file", new Blob(["<script>alert(1)</script>"], { type: "text/html" }), "evil.html");
  const res = await call("/api/admin/uploads?folder=hero", { method: "POST", body: form, headers: { Cookie: adminCookie } });
  assert.equal(res.status, 400);
  assert.match((await res.json()).error, /Only JPG/);
});

test("uploads reject path tricks in the folder name", async () => {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array([0xff, 0xd8, 0xff])], { type: "image/jpeg" }), "a.jpg");
  const res = await call("/api/admin/uploads?folder=../../etc", { method: "POST", body: form, headers: { Cookie: adminCookie } });
  assert.equal(res.status, 400);
});

test("uploads store images and serve them", async () => {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xe0])], { type: "image/jpeg" }), "My Photo.JPG");
  const res = await call("/api/admin/uploads?folder=hero", { method: "POST", body: form, headers: { Cookie: adminCookie } });
  assert.equal(res.status, 201);
  const { url } = await res.json();
  assert.match(url, /^\/uploads\/hero\/\d+-[a-f0-9]{6}-my-photo\.jpg$/);
  const file = await call(url);
  assert.equal(file.status, 200);
  await call("/api/admin/uploads", { ...json({ url }, { Cookie: adminCookie }), method: "DELETE" });
  assert.equal((await call(url)).status, 404);
});

test("cleanRow keeps only known fields and coerces types", () => {
  const { row, errors } = cleanRow("hero_slides", { title: "Hi", is_active: "true", sort_order: "3", starts_on: "", password_hash: "x" });
  assert.deepEqual(errors, []);
  assert.deepEqual(row, { title: "Hi", is_active: 1, sort_order: 3, starts_on: null });
});
