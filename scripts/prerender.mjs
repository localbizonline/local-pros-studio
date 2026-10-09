// Runs after `vite build`: saves every page in src/seo.ts as finished HTML with its own title,
// description and canonical address, then writes sitemap.xml and robots.txt from the same list.
// Netlify serves dist/reviews.html at /reviews; anything else falls back to spa.html (public/_redirects).
import { readFile, rm, writeFile } from 'node:fs/promises';
import { Writable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { renderPage, PAGES, SITE_URL, canonicalUrl } = await import(path.join(serverDir, 'entry-server.js'));

const render = async (route) => {
  const stream = await renderPage(route);
  let html = '';
  await new Promise((resolve, reject) => {
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
    });
    sink.on('finish', resolve);
    sink.on('error', reject);
    stream.pipe(sink);
  });
  return html;
};
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

// Pre-built pages link only the main stylesheet, and each page's code loads separately. A page whose code
// brings its own stylesheet would show unstyled until that code arrives, so stop the build instead.
// Drafts (/design-directions, /review-versions) render in the browser only and may have their own.
const manifestFile = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
const pageCss = (key, seen = new Set(['index.html'])) => {
  if (seen.has(key) || !manifest[key]) return [];
  seen.add(key);
  return [...(manifest[key].css || []), ...(manifest[key].imports || []).flatMap((k) => pageCss(k, seen))];
};
for (const page of manifest['index.html'].dynamicImports || []) {
  if (/design-directions|review-versions/.test(page)) continue;
  const css = pageCss(page);
  if (css.length) {
    throw new Error(
      `prerender: ${page} brings its own stylesheet (${css.join(', ')}). Import its CSS files from App.tsx ` +
        `(the homepage: src/components/join-light/styles.ts) so they load with the main stylesheet.`,
    );
  }
}
await rm(path.join(dist, '.vite'), { recursive: true, force: true });

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const withHead = (html, { title, description, url, noindex }) => {
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="${noindex ? 'noindex' : 'index, follow'}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Local Pros Studio" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
  ].join('\n    ');

  const replaced = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('</head>', `    ${tags}\n  </head>`);

  if (!replaced.includes(`<title>${escapeHtml(title)}</title>`) || !replaced.includes('rel="canonical"')) {
    throw new Error('prerender: index.html no longer has the <title> and description tags this script replaces');
  }
  return replaced;
};

// Fallback for addresses without a pre-built page: empty shell, kept out of Google
await writeFile(
  path.join(dist, 'spa.html'),
  withHead(template, { ...PAGES['/'], url: `${SITE_URL}/`, noindex: true }),
);

const sitemap = [];
for (const [route, seo] of Object.entries(PAGES)) {
  const body = await render(route);
  if (!body.trim()) throw new Error(`prerender: ${route} rendered empty`);

  const url = canonicalUrl(route);
  const html = withHead(template, { ...seo, url }).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  await writeFile(path.join(dist, file), html);

  if (!seo.noindex && !seo.canonicalPath) sitemap.push(url);
  console.log(`prerendered ${route} -> ${file}`);
}

await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await rm(serverDir, { recursive: true, force: true });
console.log(`sitemap.xml: ${sitemap.length} pages`);
