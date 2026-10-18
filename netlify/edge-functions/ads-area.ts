// Fills in the visitor's area and how the headline starts on the category-first ads pages (18 Oct 2026),
// before the page reaches the phone: "Website designers in Sandton". The ads add loc={loc_physical_ms} (where
// the searcher is) and kw={keyword} (the keyword their search matched) to the link. An area we can't name is
// left out rather than guessed. The same words go on the window for the page's code (adWords.ts), so the page
// takes over the HTML without changing it.

import { SA_AREAS } from '../lib/sa-areas.ts';
import {
  AD_WORDS_GLOBAL,
  DEFAULT_AREA_SPAN,
  DEFAULT_LEAD_SPAN,
  areaText,
  designersFromKeyword,
  leadText,
  type AdWords,
} from '../../src/components/ads-gate/adWords.ts';

type Context = { next(): Promise<Response> };

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get('loc'));
  const words: AdWords = {
    area: (Number.isInteger(id) && SA_AREAS[id]) || '',
    designers: designersFromKeyword(url.searchParams.get('kw')),
  };
  if (!words.area && !words.designers) return;

  const page = await context.next();
  if (!(page.headers.get('content-type') || '').includes('text/html')) return page;

  const html = (await page.text())
    .split(DEFAULT_LEAD_SPAN)
    .join(`<span data-ad="lead">${escapeHtml(leadText(words))}</span>`)
    .split(DEFAULT_AREA_SPAN)
    .join(`<span data-ad="area">${escapeHtml(areaText(words))}</span>`)
    .replace('</head>', `<script>window.${AD_WORDS_GLOBAL}=${JSON.stringify(words).replace(/</g, '\\u003c')}</script></head>`);

  const headers = new Headers(page.headers);
  headers.delete('content-length');
  headers.set('cache-control', 'private, no-store');
  return new Response(html, { status: page.status, headers });
};

export const config = { path: ['/go/websites', '/go/websites-for/*'] };
