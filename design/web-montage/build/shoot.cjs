// Screenshots montage.html for each layout and size: node shoot.cjs <outdir> [layout ...]
const { chromium } = require('/Users/jeremymartin/Code/Cursor/Websites/ReachMax/node_modules/playwright');
const path = require('path');
const out = process.argv[2];
const layouts = process.argv.slice(3).length ? process.argv.slice(3) : ['rows', 'wall', 'labels'];
(async () => {
  const b = await chromium.launch();
  for (const layout of layouts)
    for (const size of ['wide', 'phone']) {
      const p = await (await b.newContext({ viewport: { width: 1700, height: 1100 }, deviceScaleFactor: 2 })).newPage();
      await p.goto('file://' + path.join(__dirname, 'montage.html') + `?layout=${layout}&size=${size}`);
      await p.waitForSelector('body[data-ready="1"]');
      await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r))))); });
      await p.locator('#stage').screenshot({ path: `${out}/${layout}-${size}.png` });
      console.log(layout, size);
    }
  await b.close();
})();
