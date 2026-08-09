import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /A table that brings/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /FoodService/);
  assert.match(html, /og\.png/);
  assert.match(html, /hrefLang="ar-SA"|hreflang="ar-SA"/i);
  assert.match(html, /linkedin\.com\/company\/tiara-catering/);
  assert.match(html, /x\.com\/Tiaracateriing/);
  assert.match(html, /facebook\.com\/people\/Tiara-Catering/);
  assert.match(html, /instagram\.com\/tiara\.catering\.sa/);
  assert.match(html, /bevatel-chat/);
  const bevatelSource = await readFile(new URL("../app/bevatel-chat.tsx", import.meta.url), "utf8");
  assert.match(bevatelSource, /chat\.bevatel\.com/);
  assert.match(bevatelSource, /jt1XoePxNBfjVAcH3Yg2YNAW/);
  assert.doesNotMatch(html, /class="floating"/);
  assert.match(html, /href="tel:920005600"/);
  assert.match(html, /href="https:\/\/wa\.me\/966920020062"/);
  assert.doesNotMatch(html, /966112733888|11 273 3888/);
  assert.match(html, /info@tiaracatering\.com/);
  assert.match(html, /Abdullah Al-Ahwani, Al-Qirawan District, Riyadh 13531/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|react-loading-skeleton/i);
});

test("server-renders a crawlable Arabic experience", async () => {
  const response = await render("/ar");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /تيارا للضيافة/);
  assert.match(html, /كن ضيفاً/);
  assert.match(html, /arabic-hero-title/);
  assert.match(html, /مائدة تجمعكم/);
  assert.match(html, /تموين وضيافة فاخرة في الرياض/);
  assert.match(html, /content-language/);
  assert.doesNotMatch(html, /\?lang=ar/);
});

test("server-renders conversion-focused English and Arabic menu pages", async () => {
  const [englishResponse, arabicResponse] = await Promise.all([render("/menus"), render("/ar/menus")]);
  assert.equal(englishResponse.status, 200);
  assert.equal(arabicResponse.status, 200);
  const [english, arabic] = await Promise.all([englishResponse.text(), arabicResponse.text()]);
  assert.match(english, /Catering Menus 2026 \| Tiara Catering Riyadh/);
  assert.match(english, /Menu One/);
  assert.match(english, /<span>SAR<\/span><strong>283<\/strong>/);
  assert.match(english, /Request quotation/);
  assert.match(english, /application\/ld\+json/);
  assert.match(english, /linkedin\.com\/company\/tiara-catering/);
  assert.match(english, /href="tel:920005600"/);
  assert.match(english, /href="https:\/\/wa\.me\/966920020062"/);
  assert.doesNotMatch(english, /966112733888|11 273 3888/);
  assert.match(english, /Abdullah Al-Ahwani, Al-Qirawan District, Riyadh 13531/);
  assert.match(arabic, /عبدالله الأحواني، حي القيروان، الرياض 13531/);
  assert.match(arabic, /x\.com\/Tiaracateriing/);
  assert.match(arabic, /قوائم تيارا للضيافة ٢٠٢٦/);
  assert.match(arabic, /القائمة الأولى/);
  assert.match(arabic, /اطلب عرض سعر/);
});
