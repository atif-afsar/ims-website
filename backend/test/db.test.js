/*
 * End-to-end tests against a real MySQL/MariaDB database.
 * Uses a throwaway database (TEST_DB_NAME, default ims_test) and skips
 * itself when no server is reachable.
 *
 *   DB_HOST=127.0.0.1 DB_PORT=3307 DB_USER=root DB_PASSWORD=... npm test
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import mysql from "mysql2/promise";

const dbName = process.env.TEST_DB_NAME || "ims_test";
const conn = { host: process.env.DB_HOST || "127.0.0.1", port: Number(process.env.DB_PORT) || 3306, user: process.env.DB_USER || "root", password: process.env.DB_PASSWORD || "" };

let available = true;
try {
  const c = await mysql.createConnection(conn);
  await c.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
  await c.query(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await c.end();
} catch {
  available = false;
}

const opts = { skip: available ? false : "no database server reachable" };
let server;
let base;
let cookie = "";

before(async () => {
  if (!available) return;
  process.env.DB_NAME = dbName;
  const env = { ...process.env, DB_NAME: dbName };
  execFileSync(process.execPath, ["src/cli/migrate.js"], { env, stdio: "pipe" });
  execFileSync(process.execPath, ["src/cli/create-admin.js", "admin@ims.test", "correct-horse-battery"], { env, stdio: "pipe" });
  const { createApp } = await import("../src/app.js");
  server = createApp().listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (!available) return;
  server?.close();
  const { pool } = await import("../src/db.js");
  await pool.end();
  const c = await mysql.createConnection(conn);
  await c.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
  await c.end();
});

const send = (method, path, body) =>
  fetch(base + path, { method, headers: { "Content-Type": "application/json", Cookie: cookie }, body: body === undefined ? undefined : JSON.stringify(body) });

test("wrong password is rejected", opts, async () => {
  const res = await send("POST", "/api/auth/login", { email: "admin@ims.test", password: "nope-nope-nope" });
  assert.equal(res.status, 401);
});

test("admin can log in and see who they are", opts, async () => {
  const res = await send("POST", "/api/auth/login", { email: "ADMIN@ims.test", password: "correct-horse-battery" });
  assert.equal(res.status, 200);
  cookie = res.headers.get("set-cookie").split(";")[0];
  const me = await (await send("GET", "/api/auth/me")).json();
  assert.equal(me.user.email, "admin@ims.test");
});

test("hero slides: create, list publicly, reorder, hide, delete", opts, async () => {
  const a = await (await send("POST", "/api/admin/hero_slides", { title: "First", sort_order: 0 })).json();
  const b = await (await send("POST", "/api/admin/hero_slides", { title: "Second", sort_order: 1, starts_on: "2020-01-01" })).json();
  assert.equal(b.starts_on, "2020-01-01");

  assert.equal((await send("PUT", "/api/admin/hero_slides/order", { ids: [b.id, a.id] })).status, 200);
  let list = await (await fetch(`${base}/api/public/hero_slides`)).json();
  assert.deepEqual(list.map((s) => s.title), ["Second", "First"]);

  await send("PUT", `/api/admin/hero_slides/${b.id}`, { is_active: false });
  list = await (await fetch(`${base}/api/public/hero_slides`)).json();
  assert.deepEqual(list.map((s) => s.title), ["First"]);

  assert.equal((await send("DELETE", `/api/admin/hero_slides/${a.id}`)).status, 200);
  assert.equal((await send("DELETE", `/api/admin/hero_slides/${a.id}`)).status, 404);
});

test("bulk create (import defaults)", opts, async () => {
  const res = await send("POST", "/api/admin/calendar_events", [
    { title: "Diwali", event_date: "2099-11-08", event_type: "holiday" },
    { title: "Exam", event_date: "2099-11-14", event_type: "exam" },
  ]);
  assert.equal(res.status, 201);
  assert.equal((await res.json()).length, 2);
});

test("homepage sections: save content, visibility and order", opts, async () => {
  await send("PUT", "/api/admin/home/sections/intro", { content: { text: "مرحبا — Hello" } });
  await send("PUT", "/api/admin/home/order", { sections: [{ section_key: "results", is_visible: false }, { section_key: "intro" }] });
  const home = await (await fetch(`${base}/api/public/home`)).json();
  assert.deepEqual(home.sections.map((s) => [s.section_key, s.is_visible]), [["results", false], ["intro", true]]);
  assert.equal(home.sections[1].content.text, "مرحبا — Hello");
  assert.equal(home.upcomingEvents.length, 2);

  await send("DELETE", "/api/admin/home/sections/intro");
  const after = await (await fetch(`${base}/api/public/home`)).json();
  assert.equal(after.sections.find((s) => s.section_key === "intro").content, null);
});

test("settings round-trip", opts, async () => {
  await send("PUT", "/api/admin/settings/contact_info", { phone: "07417914164", email: "x@y.z" });
  const value = await (await fetch(`${base}/api/public/settings/contact_info`)).json();
  assert.equal(value.phone, "07417914164");
});

test("gallery: album with photos is public; hidden or empty albums are not; delete cascades", opts, async () => {
  const album = await (await send("POST", "/api/admin/gallery_albums", { title: "Sports Day 2026", event_date: "2026-02-10", is_active: true })).json();
  const empty = await (await send("POST", "/api/admin/gallery_albums", { title: "Empty", is_active: true })).json();
  const photos = await (await send("POST", "/api/admin/gallery_photos", [
    { album_id: album.id, url: "/uploads/gallery/a.jpg", caption: "Race" },
    { album_id: album.id, url: "/uploads/gallery/b.jpg" },
  ])).json();
  assert.equal(photos.length, 2);

  let pub = await (await fetch(`${base}/api/public/gallery`)).json();
  assert.deepEqual(pub.map((a) => a.title), ["Sports Day 2026"]);
  assert.equal(pub[0].photos[0].caption, "Race");

  await send("PUT", `/api/admin/gallery_albums/${album.id}`, { is_active: false });
  pub = await (await fetch(`${base}/api/public/gallery`)).json();
  assert.equal(pub.length, 0);

  assert.equal((await send("DELETE", `/api/admin/gallery_albums/${album.id}`)).status, 200);
  const left = await (await send("GET", "/api/admin/gallery_photos")).json();
  assert.equal(left.filter((p) => p.album_id === album.id).length, 0);
  await send("DELETE", `/api/admin/gallery_albums/${empty.id}`);
});

test("enquiries: validated, stored, private, honeypot ignored", opts, async () => {
  const post = (body) => fetch(`${base}/api/public/enquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  assert.equal((await post({ name: "", message: "hi", email: "a@b.co" })).status, 400);
  assert.equal((await post({ name: "Asha", message: "hi" })).status, 400); // no way to reply
  assert.equal((await post({ name: "Asha", message: "hi", email: "not-an-email" })).status, 400);
  assert.equal((await post({ name: "Bot", message: "spam", email: "x@y.co", botcheck: "on" })).status, 201);
  assert.equal((await post({ name: "Asha", phone: "07417914164", subject: "Admission enquiry", message: "Class 5 seat?" })).status, 201);

  assert.equal((await fetch(`${base}/api/public/enquiries`)).status, 404); // never listed publicly
  const rows = await (await send("GET", "/api/admin/enquiries")).json();
  assert.deepEqual(rows.map((r) => r.name), ["Asha"]);
  assert.equal(rows[0].status, "new");
  await send("PUT", `/api/admin/enquiries/${rows[0].id}`, { status: "replied", notes: "Called back" });
  const [updated] = await (await send("GET", "/api/admin/enquiries")).json();
  assert.equal(updated.status, "replied");
});

test("logout ends the session", opts, async () => {
  const res = await send("POST", "/api/auth/logout");
  assert.match(res.headers.get("set-cookie"), /ims_admin=;/);
});
