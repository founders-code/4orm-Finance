/* ==================================================================
   Visual check. Renders the built site and compares every screen to
   the approved reference image in design-reference/screens.

   This is the second line of defence. The first is the sha256
   manifest: if that passes, these files ARE the approved design and
   nothing was interpreted. This catches the case where the files are
   right but something upstream (a stale CDN asset, a font that failed
   to load, a Vercel rewrite) changes what a visitor actually sees.

   Usage, from the repo root:
     node design-reference/verify/visual-check.mjs            # local deploy/
     node design-reference/verify/visual-check.mjs <base-url> # a deployment
   ================================================================== */
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REF  = path.join(HERE, '..', 'screens');
const OUT  = path.join(HERE, 'results');
const ROOT = path.resolve(HERE, '..', '..', 'deploy');
const MANIFEST = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'MANIFEST.json'), 'utf8'));
const THRESHOLD = 0.005;                       // 0.5% of pixels

const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript',
  '.png':'image/png', '.jpg':'image/jpeg', '.ico':'image/x-icon', '.svg':'image/svg+xml',
  '.webp':'image/webp', '.woff2':'font/woff2', '.txt':'text/plain', '.xml':'application/xml' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((q, s) => {
      let p = decodeURIComponent(q.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      let f = path.join(ROOT, p);
      if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.writeHead(404); s.end('not found'); return; }
      s.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      s.end(fs.readFileSync(f));
    });
    srv.listen(0, () => resolve({ srv, base: 'http://localhost:' + srv.address().port }));
  });
}

const arg = process.argv[2];
const { srv, base } = arg ? { srv: null, base: arg.replace(/\/$/, '') } : await serve();
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await ctx.newPage();

const rows = [];
let loaded = null;
for (const shot of MANIFEST.screens) {
  if (loaded !== shot.route) {
    await page.goto(base + shot.route, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1800);
    await page.addStyleTag({ content:
      '.rv{opacity:1!important;transform:none!important}#nav-mount{display:none!important}' +
      '*{animation:none!important;transition:none!important}' });
    await page.evaluate(() => document.querySelectorAll('.rv').forEach(e => e.classList.add('in')));
    await page.waitForTimeout(500);
    loaded = shot.route;
  }
  const el = page.locator(shot.selector).first();
  if (await el.count() === 0) { rows.push([shot.name, 'FAIL', 'selector not found']); continue; }

  const buf = await el.screenshot();
  const got = PNG.sync.read(buf);
  const refPath = path.join(REF, shot.name + '.png');
  if (!fs.existsSync(refPath)) { rows.push([shot.name, 'FAIL', 'no reference image']); continue; }
  const want = PNG.sync.read(fs.readFileSync(refPath));

  if (got.width !== want.width || got.height !== want.height) {
    fs.writeFileSync(path.join(OUT, shot.name + '-got.png'), buf);
    rows.push([shot.name, 'FAIL',
      `size ${got.width}x${got.height}, expected ${want.width}x${want.height}`]);
    continue;
  }
  const diff = new PNG({ width: got.width, height: got.height });
  const n = pixelmatch(got.data, want.data, diff.data, got.width, got.height, { threshold: 0.1 });
  const pct = n / (got.width * got.height);
  if (pct > THRESHOLD) {
    fs.writeFileSync(path.join(OUT, shot.name + '-got.png'), buf);
    fs.writeFileSync(path.join(OUT, shot.name + '-diff.png'), PNG.sync.write(diff));
    rows.push([shot.name, 'FAIL', (pct * 100).toFixed(2) + '% of pixels differ']);
  } else {
    rows.push([shot.name, 'PASS', (pct * 100).toFixed(2) + '%']);
  }
}

const overflow = [];
for (const route of [...new Set(MANIFEST.screens.map(s => s.route))]) {
  for (const w of [1280, 1440]) {
    const c2 = await browser.newContext({ viewport: { width: w, height: 900 } });
    const p2 = await c2.newPage();
    await p2.goto(base + route, { waitUntil: 'domcontentloaded' });
    await p2.waitForTimeout(1200);
    const over = await p2.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (over > 0) overflow.push(`${route} at ${w}: ${over}px`);
    await c2.close();
  }
}

await ctx.close(); await browser.close(); if (srv) srv.close();

const w0 = Math.max(...rows.map(r => r[0].length));
console.log('\nSCREEN'.padEnd(w0 + 2) + 'RESULT   DETAIL');
for (const r of rows) console.log(r[0].padEnd(w0 + 2) + r[1].padEnd(9) + r[2]);
if (overflow.length) { console.log('\nHORIZONTAL OVERFLOW'); overflow.forEach(o => console.log('  ' + o)); }
const bad = rows.filter(r => r[1] === 'FAIL').length + overflow.length;
console.log(bad ? `\n${bad} FAILURE(S). Diffs written to ${OUT}` : '\nALL PASS');
process.exit(bad ? 1 : 0);
