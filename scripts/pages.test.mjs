// Page checks for the LaughPath worker: titles, canonical, share card, JSON-LD, the kids-jokes guide.
// Run: npm test (bundles src/worker/index.ts with esbuild from wrangler, then node --test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const mod = await import(process.env.WORKER_BUNDLE || "../.test-out/worker.mjs");
const worker = mod.default;
const get = async (path) => {
  const res = await worker.fetch(new Request(`https://growinglaughs.com${path}`), {});
  return { res, html: await res.text() };
};

test("home title is no longer 'LaughPath · LaughPath' and carries canonical + share card", async () => {
  const { res, html } = await get("/");
  assert.equal(res.status, 200);
  assert.match(html, /<title>Laugh Break: feel lighter in 60 seconds \| LaughPath<\/title>/);
  assert.doesNotMatch(html, /<title>LaughPath · LaughPath<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/growinglaughs\.com\/"\/>/);
  assert.match(html, /og:image" content="https:\/\/growinglaughs\.com\/og-card\.png"/);
  assert.match(html, /twitter:card" content="summary_large_image"/);
  assert.equal((html.match(/<h1/g) || []).length, 1);
  assert.match(html, /id="break-go"/, "the 60s reset stays on the first screen");
});

test("home JSON-LD parses and has no ratings", async () => {
  const { html } = await get("/");
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, "JSON-LD present");
  const ld = JSON.parse(m[1]);
  const types = ld["@graph"].map((n) => n["@type"]);
  assert.deepEqual(types, ["WebSite", "WebApplication"]);
  assert.doesNotMatch(m[1], /aggregateRating|review/i);
});

test("other pages keep their titles and get their own canonical", async () => {
  const { html } = await get("/gym");
  assert.match(html, /<title>Humor Gym · LaughPath<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/growinglaughs\.com\/gym"\/>/);
});

test("kids-jokes guide lists every joke as text, links kide.us with utm, and its script parses", async () => {
  const { res, html } = await get("/guides/clean-jokes-to-tell-kids");
  assert.equal(res.status, 200);
  assert.match(html, /<title>Clean jokes for kids \(for the grown-up telling them\) \| LaughPath<\/title>/);
  for (const [q] of mod.KIDS_JOKES) {
    const plain = q.replace(/&/g, "&amp;");
    assert.ok(html.includes(plain), `joke listed: ${q}`);
  }
  assert.equal((html.match(/<h1/g) || []).length, 1, "guide pages have exactly one h1");
  assert.match(html, /https:\/\/kide\.us\/\?utm_source=growinglaughs\.com&amp;utm_medium=referral/);
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  for (const s of scripts) new Function(s); // throws on a syntax error
  const text = html.replace(/<style>[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
  assert.doesNotMatch(text, /\d+%/, "no unsourced percentages in visible copy");
});

test("guides index links the new guide; sitemap lists it and /terms", async () => {
  const { html } = await get("/guides");
  assert.match(html, /href="\/guides\/clean-jokes-to-tell-kids"/);
  const sm = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(sm, /\/guides\/clean-jokes-to-tell-kids</);
  assert.match(sm, /growinglaughs\.com\/terms</);
  assert.equal(sm, readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8"), "tracked dist copy stays in sync");
});

test("share card file exists and is a 1200x630 PNG", () => {
  const b = readFileSync(new URL("../public/og-card.png", import.meta.url));
  assert.equal(b.toString("ascii", 1, 4), "PNG");
  assert.equal(b.readUInt32BE(16), 1200);
  assert.equal(b.readUInt32BE(20), 630);
});
