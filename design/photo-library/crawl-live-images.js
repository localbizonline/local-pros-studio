const { chromium } = require('playwright');
const pages = ['/', '/about', '/autopilot', '/pricing', '/recurring-service-booking-system', '/reviews', '/social-media-posting-service', '/special-offer-bundle', '/website-design-package', '/web-design', '/website-design', '/website-faq', '/terms', '/privacy', '/refunds-cancellations'];
(async () => {
  const b = await chromium.launch({ executablePath: process.env.PWX });
  const seen = {};
  for (const [w, mobile] of [[390, true], [1366, false]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: mobile });
    const p = await ctx.newPage();
    p.on('response', (r) => { const u = r.url(); if (/\.(webp|png|jpe?g|avif|svg|gif)(\?|$)/i.test(u) && u.includes('studio.localpros.co.za')) (seen[u.split('?')[0]] ||= new Set()).add(p.url().replace(/^https:\/\/[^/]+/, '').split('?')[0]); });
    await p.goto('https://studio.localpros.co.za/?team=on', { waitUntil: 'load' });
    for (const path of pages) {
      await p.goto('https://studio.localpros.co.za' + path, { waitUntil: 'load' }); await p.waitForTimeout(1200);
      const h = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
      await p.waitForTimeout(800);
    }
    await ctx.close();
  }
  const out = Object.fromEntries(Object.entries(seen).map(([k, v]) => [k, [...v]]));
  require('fs').writeFileSync('live-images.json', JSON.stringify(out, null, 1));
  console.log(Object.keys(out).length, 'images on live pages');
  await b.close();
})();
