// usage: node shoot6.cjs <mock-sites dir> slug [slug...]
const { chromium } = require('/Users/jeremymartin/Code/Cursor/Websites/ReachMax/node_modules/playwright');
const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const B = process.argv[2]; const slugs = process.argv.slice(3);
async function ready(page){
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  await page.waitForTimeout(400);
}
// report images and text lines crossing the cut line
async function cuts(page, y){
  return page.evaluate((y) => {
    const out = [];
    document.querySelectorAll('img').forEach(i => { const r = i.getBoundingClientRect(); const t = r.top + scrollY, b = r.bottom + scrollY; if (t < y && b > y) out.push('IMG ' + i.getAttribute('src') + ' ' + Math.round(t) + '-' + Math.round(b)); });
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n); for (const r of rg.getClientRects()) { const t = r.top + scrollY, b = r.bottom + scrollY; if (t < y && b > y) out.push('TEXT "' + n.textContent.trim().slice(0, 40) + '" ' + Math.round(t) + '-' + Math.round(b)); } }
    return out;
  }, y);
}
(async () => {
  const browser = await chromium.launch({ executablePath: exe });
  for (const slug of slugs) {
    const url = 'file://' + B + '/' + slug + '/index.html';
    let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    let page = await ctx.newPage(); await page.goto(url); await ready(page);
    await page.screenshot({ path: `${B}/${slug}-desktop.png`, fullPage: true, clip: { x: 0, y: 0, width: 1440, height: 922 } });
    console.log(slug, 'desktop cut@922', JSON.stringify(await cuts(page, 922)));
    await ctx.close();
    ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.5 });
    page = await ctx.newPage(); await page.goto(url); await ready(page);
    const sw = await page.evaluate(() => { const w = document.documentElement.clientWidth; return { sw: document.documentElement.scrollWidth, cw: w, over: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > w + 1).map(e => e.tagName + '.' + e.className).slice(0, 10) }; });
    console.log(slug, 'mobile overflow', JSON.stringify(sw));
    console.log(slug, 'mobile cut@844', JSON.stringify(await cuts(page, 844)));
    console.log(slug, 'mobile cut@1266', JSON.stringify(await cuts(page, 1266)));
    await page.screenshot({ path: `${B}/${slug}-mobile.png`, fullPage: true, clip: { x: 0, y: 0, width: 390, height: 1266 } });
    await ctx.close();
  }
  await browser.close();
})();
