// usage: node measure.cjs <dir> slug...  -> section boxes on desktop and mobile
const { chromium } = require('/Users/jeremymartin/Code/Cursor/Websites/ReachMax/node_modules/playwright');
const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const B = process.argv[2]; const slugs = process.argv.slice(3);
(async () => {
  const browser = await chromium.launch({ executablePath: exe });
  for (const slug of slugs) for (const [name, opts] of [['desk', { viewport: { width: 1440, height: 900 } }], ['mob', { viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1.5 }]]) {
    const ctx = await browser.newContext(opts); const page = await ctx.newPage();
    await page.goto('file://' + B + '/' + slug + '/index.html'); await page.waitForLoadState('networkidle'); await page.evaluate(() => document.fonts.ready);
    const r = await page.evaluate(() => [...document.querySelectorAll('header, section, .hero-bg, .strip, .cards, .sec-head, .card, .info')].map(e => { const b = e.getBoundingClientRect(); return (e.tagName + '.' + (e.className||'')).slice(0, 22) + ' ' + Math.round(b.top + scrollY) + '-' + Math.round(b.bottom + scrollY); }).join(' | '));
    console.log(slug, name, r); await ctx.close();
  }
  await browser.close();
})();
