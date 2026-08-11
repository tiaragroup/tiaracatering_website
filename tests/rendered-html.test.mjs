import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test, { after, before } from "node:test";

// The site is a static export served by Firebase Hosting, so these tests serve the
// built out/ directory the same way Hosting does (cleanUrls: /menus -> menus.html)
// and assert against the prerendered HTML a crawler would receive.
const outDir = fileURLToPath(new URL("../out", import.meta.url));
const port = 32000 + (process.pid % 1000);
const origin = `http://127.0.0.1:${port}`;
let server;

// Contact details are asserted against the shared constants rather than literals, so a
// deliberate change in app/contact-details.ts rolls through to the pages without the
// tests going stale. A removed or renamed export still fails loudly.
const contactSource = await readFile(new URL("../app/contact-details.ts", import.meta.url), "utf8");

function contactConstant(name) {
  const match = contactSource.match(new RegExp(`export const ${name} = "([^"]+)"`));
  if (!match) throw new Error(`${name} is no longer exported from app/contact-details.ts`);
  return match[1];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const WHATSAPP_HREF = new RegExp(`href="https://wa\\.me/${contactConstant("WHATSAPP_NUMBER")}"`);
const CALL_HREF = new RegExp(`href="tel:${contactConstant("CALL_NUMBER")}"`);
const EMAIL = new RegExp(escapeRegExp(contactConstant("EMAIL")));
const LOCATION_EN = new RegExp(escapeRegExp(contactConstant("LOCATION_EN")));
const LOCATION_AR = new RegExp(escapeRegExp(contactConstant("LOCATION_AR")));

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

async function readCandidate(pathname) {
  const relative = pathname.replace(/^\/+/, "");
  const candidates = relative === ""
    ? ["index.html"]
    : [`${relative}.html`, path.join(relative, "index.html"), relative];

  for (const candidate of candidates) {
    const filePath = path.join(outDir, candidate);
    if (!filePath.startsWith(outDir)) continue;
    try {
      return { body: await readFile(filePath), ext: path.extname(candidate) };
    } catch {
      // Candidate does not exist — fall through to the next one.
    }
  }
  return null;
}

before(async () => {
  server = createServer((request, response) => {
    const { pathname } = new URL(request.url, origin);
    readCandidate(decodeURIComponent(pathname)).then((file) => {
      if (!file) {
        response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        response.end("not found");
        return;
      }
      response.writeHead(200, {
        "content-type": CONTENT_TYPES[file.ext] ?? "application/octet-stream",
      });
      response.end(file.body);
    });
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });

  const rootExists = await readCandidate("/");
  if (!rootExists) throw new Error(`No static export found in ${outDir}. Run "next build" first.`);
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

async function render(path = "/") {
  return fetch(`${origin}${path}`, { headers: { accept: "text/html" } });
}

test("prerenders the Tiara Catering homepage and SEO content", async () => {
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
  const bevatelSource = await readFile(new URL("../app/bevatel-chat.tsx", import.meta.url), "utf8");
  assert.match(bevatelSource, /chat\.bevatel\.com/);
  assert.match(bevatelSource, /jt1XoePxNBfjVAcH3Yg2YNAW/);
  assert.doesNotMatch(html, /class="floating"/);
  assert.match(html, CALL_HREF);
  assert.match(html, WHATSAPP_HREF);
  assert.doesNotMatch(html, /966112733888|11 273 3888/);
  assert.match(html, EMAIL);
  assert.match(html, LOCATION_EN);
  assert.match(html, /maps\/dir\/\/Tiara\+Catering/);
  assert.match(html, /href="http:\/\/bakerisbakery\.com\/"/);
  assert.match(html, /href="https:\/\/elementsduchocolat\.com\/"/);
  assert.match(html, /Baker’s Bakery — Visit website/);
  assert.doesNotMatch(html, /codex-preview|Starter Project|react-loading-skeleton/i);
});

test("prerenders a crawlable Arabic experience", async () => {
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

test("prerenders conversion-focused English and Arabic menu pages", async () => {
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
  assert.match(english, CALL_HREF);
  assert.match(english, WHATSAPP_HREF);
  assert.doesNotMatch(english, /966112733888|11 273 3888/);
  assert.match(english, LOCATION_EN);
  assert.match(arabic, LOCATION_AR);
  assert.match(arabic, /x\.com\/Tiaracateriing/);
  assert.match(arabic, /قوائم تيارا للضيافة ٢٠٢٦/);
  assert.match(arabic, /القائمة الأولى/);
  assert.match(arabic, /اطلب عرض سعر/);
});
