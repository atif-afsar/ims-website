/*
 * Server-side SEO: page tags, status codes and redirects (no database needed).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { request } from "node:http";
import { createSeo } from "../src/seo.js";

const dist = mkdtempSync(join(tmpdir(), "ims-seo-"));
writeFileSync(
  join(dist, "index.html"),
  `<html><head><meta name="description" content="default" /><meta name="robots" content="index" /><link rel="canonical" href="https://x/" />
<meta property="og:title" content="d" /><meta property="og:description" content="d" /><meta property="og:url" content="d" /><meta property="og:image" content="d" />
<meta name="twitter:title" content="d" /><meta name="twitter:description" content="d" /><meta name="twitter:image" content="d" />
<title>Default</title></head><body><noscript><!--seo-body--></noscript></body></html>`
);
writeFileSync(
  join(dist, "seo-pages.json"),
  JSON.stringify({
    origin: "https://www.example.org",
    pages: {
      "/": { name: "Home", title: "Home title", description: "Home description" },
      "/about": { name: "About", title: "About “IMS” & us", description: "About <description>" },
    },
    notFound: { title: "Not found", description: "Gone" },
    redirects: { "/vision": "/about#vision-mission" },
  })
);
const render = createSeo(dist);

test("known page gets its own title, description, canonical and share image", () => {
  const r = render("/about");
  assert.equal(r.status, 200);
  assert.match(r.html, /<title>About “IMS” &amp; us<\/title>/);
  assert.match(r.html, /<meta name="description" content="About &lt;description&gt;"/);
  assert.match(r.html, /<link rel="canonical" href="https:\/\/www\.example\.org\/about"/);
  assert.match(r.html, /og:image" content="https:\/\/www\.example\.org\/images\/og\/about\.jpg"/);
  assert.match(r.html, /<h1>About “IMS” &amp; us<\/h1>/);
  assert.match(r.html, /<a href="\/">Home<\/a>/);
  assert.equal(r.index, true);
});

test("home page uses the home share image", () => {
  assert.match(render("/").html, /og:image" content="https:\/\/www\.example\.org\/images\/og\/home\.jpg"/);
});

test("unknown page is a 404 and not indexed", () => {
  const r = render("/no-such-page");
  assert.equal(r.status, 404);
  assert.equal(r.index, false);
  assert.match(r.html, /<title>Not found<\/title>/);
  assert.match(r.html, /name="robots" content="noindex, follow"/);
});

test("admin pages load but are never indexed", () => {
  const r = render("/admin/homepage");
  assert.equal(r.status, 200);
  assert.equal(r.index, false);
});

test("old URLs and trailing slashes redirect", () => {
  assert.deepEqual(render("/vision"), { redirect: "/about#vision-mission" });
  assert.deepEqual(render("/about/"), { redirect: "/about" });
});

test("bare domain redirects to the canonical host", async () => {
  const { default: config } = await import("../src/config.js");
  const { createApp } = await import("../src/app.js");
  const before = config.canonicalHost;
  config.canonicalHost = "www.example.org"; // read when the app is created
  const server = createApp().listen(0);
  config.canonicalHost = before;
  await new Promise((r) => server.once("listening", r));
  try {
    // fetch() can't set the Host header, so use a raw request
    const res = await new Promise((resolve, reject) =>
      request({ port: server.address().port, path: "/about?x=1", headers: { Host: "example.org" } }, resolve).on("error", reject).end()
    );
    res.resume();
    assert.equal(res.statusCode, 301);
    assert.equal(res.headers.location, "https://www.example.org/about?x=1");
  } finally {
    server.close();
    const { pool } = await import("../src/db.js");
    await pool.end();
  }
});
