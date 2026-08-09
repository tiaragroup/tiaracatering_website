import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Tiara Catering homepage and SEO content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Tiara Catering \| Luxury Catering in Riyadh<\/title>/i);
  assert.match(html, /Be a guest/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /FoodService/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|react-loading-skeleton/i);
});
