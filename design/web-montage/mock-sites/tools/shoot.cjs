const { chromium } = require('/private/tmp/claude-501/-Users-jeremymartin-Code-Cursor-Websites-local-pros-studio/c199376d-5c5d-40dd-bce8-785c3a047241/scratchpad/node_modules/playwright');
const glob = require('fs').readdirSync(process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1228');
const exe = process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const B = process.argv[2]; const slugs = process.argv.slice(3);
async function ready(page){
  await page.waitForLoadState('networkidle');
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); });
  await page.waitForTimeout(300);
}
(async () => {
  const browser = await chromium.launch({ executablePath: exe });
  for (const slug of slugs) {
    const url = 'file://' + B + '/' + slug + '/index.html';
    let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    let page = await ctx.newPage(); await page.goto(url); await ready(page);
    await page.screenshot({ path: `${B}/${slug}-desktop.png`, fullPage: true });
    console.log(slug, 'desktop', await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.scrollHeight]));
    await ctx.close();
    ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1.5 });
    page = await ctx.newPage(); await page.goto(url); await ready(page);
    const sw = await page.evaluate(() => { const w = document.documentElement.clientWidth; return { sw: document.documentElement.scrollWidth, cw: w, over: [...document.querySelectorAll('*')].filter(e => e.getBoundingClientRect().right > w + 1).map(e => e.tagName + '.' + e.className).slice(0, 10) }; });
    console.log(slug, 'mobile', JSON.stringify(sw));
    await page.screenshot({ path: `${B}/${slug}-mobile.png`, fullPage: true, clip: { x: 0, y: 0, width: 390, height: 1266 } });
    await page.screenshot({ path: `${B}/${slug}-mobile-full.png`, fullPage: true });
    await ctx.close();
  }
  await browser.close();
})();
