// Fills in the visitor's area and how the headline starts on the category-first ads pages (/go/websites and
// /go/websites-for/<id>), before the page reaches the phone. The work is in netlify/lib/ad-html.ts.

import { adWordsFrom, fillAdWords, hasAdWords } from '../lib/ad-html.ts';

type Context = { next(): Promise<Response> };

export default async (request: Request, context: Context) => {
  const words = adWordsFrom(new URL(request.url));
  if (!hasAdWords(words)) return;

  const page = await context.next();
  if (!(page.headers.get('content-type') || '').includes('text/html')) return page;

  const headers = new Headers(page.headers);
  headers.delete('content-length');
  headers.set('cache-control', 'private, no-store');
  return new Response(fillAdWords(await page.text(), words), { status: page.status, headers });
};

export const config = { path: ['/go/websites', '/go/websites-for/*'] };
