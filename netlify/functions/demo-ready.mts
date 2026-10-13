// POST /api/demo-ready from the site-builder worker (site-builder-v3 worker/src/api/demo-publish.js) when a
// free demo website is published or its build failed. Alerts Jeremy and Ashley on WhatsApp with the link to
// check and a "Send it" link (demo-send.mts). The build token (netlify/lib/demo.mts) is the only auth.

import { airtableLink, DF, demoUrl, readRecord, readToken, sendAlert, signToken, updateRecord } from '../lib/demo.mts';

declare const Netlify: { env: { get(name: string): string | undefined } };

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export default async (request: Request) => {
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  const secret = Netlify.env.get('DEMO_SECRET');
  if (!secret) return json({ ok: false, error: 'not_configured' }, 503);
  const raw = await request.text();
  if (raw.length > 5000) return json({ ok: false, error: 'too_large' }, 413);
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }
  const claims = await readToken(body.token, secret, 'build');
  if (!claims) return json({ ok: false, error: 'forbidden' }, 403);

  const record = (await readRecord(claims.r)) ?? {};
  const name = String(record[DF.companyName] || 'the lead');

  if (typeof body.failed === 'string') {
    await updateRecord(claims.r, { [DF.demoStatus]: 'Failed' });
    await sendAlert('lead', `⚠️ The demo website for ${name} failed: ${body.failed.slice(0, 200)}\nMake one by hand.\nAirtable: ${airtableLink(claims.r)}`);
    return json({ ok: true }, 200);
  }

  const url = demoUrl(claims.s);
  if (body.url !== url) return json({ ok: false, error: 'wrong_url' }, 400);
  // A fix republished after it was sent keeps "Sent"
  const sent = record[DF.demoStatus] === 'Sent';
  await updateRecord(claims.r, { [DF.demoWebsite]: url, ...(sent ? {} : { [DF.demoStatus]: 'Ready to send' }) });

  const sendToken = await signToken({ p: 'send', r: claims.r, s: claims.s, e: Date.now() + 7 * 24 * 60 * 60 * 1000 }, secret);
  const made = Number(body.imagesMade) || 0;
  const wanted = Number(body.imagesWanted) || 0;
  await sendAlert(
    'lead',
    [
      `🌐 Demo website ${sent ? 'updated' : 'ready'} for ${name}:`,
      url,
      wanted && made < wanted ? `(${wanted - made} of ${wanted} pictures failed and show a stand-in photo.)` : '',
      sent ? 'They already have the link.' : `Check it on your phone, then send it to them on WhatsApp:\nhttps://studio.localpros.co.za/api/demo-send?t=${sendToken}`,
    ]
      .filter(Boolean)
      .join('\n'),
  );
  return json({ ok: true }, 200);
};

export const config = { path: '/api/demo-ready' };
