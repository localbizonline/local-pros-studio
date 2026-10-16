// Free demo website, shared by netlify/functions/demo-lead.mts (starts it), demo-ready.mts (built) and
// demo-send.mts (Jeremy or Ashley press "Send it"). The flow:
// 1. A visitor who asked for a website (the free demo, or plan "website") presses send in the site chat.
// 2. demo-lead fires the Claude Code routine "studio-demo-website" (DEMO_ROUTINE_URL + DEMO_ROUTINE_TOKEN,
//    on Jeremy's Claude subscription). It follows docs/DEMO-BUILD.md in site-builder-v3 and posts the
//    site to sites.localpros.co.za/api/demo-publish, which publishes demo-{slug}.emailsync.co.za.
// 3. The site-builder worker calls demo-ready, which alerts Jeremy and Ashley with a "Send it" link.
// 4. demo-send WhatsApps the link to the visitor from Ashley's number (DEMO_BOT_SESSION_ID), through the WhatsApp bot service.
// The routine holds no keys: each build gets a signed token (DEMO_SECRET, shared with the site-builder
// worker) naming one Airtable record and one slug. Airtable "Demo status" keeps one build per lead.

declare const Netlify: { env: { get(name: string): string | undefined } };

export const AIRTABLE_URL = 'https://api.airtable.com/v0/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN';
export const airtableLink = (recordId: string) => `https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`;

// Same field ids as demo-lead.mts, plus the three demo fields (11 Oct 2026)
export const DF = {
  companyName: 'fldVq7icFoFqUiyhk',
  mobile: 'fldBqhQ3Jm0eba2FP',
  demoStatus: 'fldmHclYyuUclviJc',
  demoWebsite: 'flddBFBihTLoksgl4',
  demoRequested: 'fldQWNWPMv7BlI2o6',
} as const;

export type DemoStatus = 'Building' | 'Ready to send' | 'Sent' | 'Failed' | 'Not started (daily limit)';

// --- Signed tokens: base64url(JSON {p, r, s, e}) + "." + hex HMAC-SHA256 (same as worker/src/api/demo-publish.js) ---
type Claims = { p: 'build' | 'send'; r: string; s: string; e: number };

const b64url = (text: string) => btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const hmacKey = (secret: string, use: KeyUsage) =>
  crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [use]);

export async function signToken(claims: Claims, secret: string) {
  const part = b64url(JSON.stringify(claims));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret, 'sign'), new TextEncoder().encode(part));
  return `${part}.${[...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

export async function readToken(token: unknown, secret: string, purpose: Claims['p']): Promise<Claims | null> {
  if (typeof token !== 'string' || token.length > 1000) return null;
  const [part, sig] = token.split('.');
  if (!part || !sig || !/^[0-9a-f]{64}$/.test(sig)) return null;
  const sigBytes = new Uint8Array(sig.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
  if (!(await crypto.subtle.verify('HMAC', await hmacKey(secret, 'verify'), sigBytes, new TextEncoder().encode(part)))) return null;
  try {
    const claims = JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/'))) as Claims;
    if (claims.p !== purpose || typeof claims.e !== 'number' || claims.e < Date.now()) return null;
    if (typeof claims.r !== 'string' || !/^rec[A-Za-z0-9]{14}$/.test(claims.r) || typeof claims.s !== 'string') return null;
    return claims;
  } catch {
    return null;
  }
}

// "Bob's Plumbing (Pty) Ltd" + recXXXXXXXXXXAb12 → "bobs-plumbing-pty-ltd-ab12": the demo is demo-{slug}.emailsync.co.za
export const demoSlug = (name: string, recordId: string) =>
  `${name.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/, '') || 'business'}-${recordId.slice(-4).toLowerCase()}`;

export const demoUrl = (slug: string) => `https://demo-${slug}.emailsync.co.za`;

// --- Airtable ---
export async function readRecord(recordId: string): Promise<Record<string, unknown> | null> {
  const token = Netlify.env.get('AIRTABLE_TOKEN');
  if (!token) return null;
  const res = await fetch(`${AIRTABLE_URL}/${recordId}?returnFieldsByFieldId=true`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) return null;
  return ((await res.json()) as { fields?: Record<string, unknown> }).fields ?? {};
}

export async function updateRecord(recordId: string, fields: Record<string, unknown>) {
  const token = Netlify.env.get('AIRTABLE_TOKEN');
  if (!token) return false;
  const res = await fetch(`${AIRTABLE_URL}/${recordId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) console.error('Airtable demo update failed', res.status, (await res.text()).slice(0, 300));
  return res.ok;
}

// Demos started today (SAST), for the daily cap
export async function demosStartedToday() {
  const token = Netlify.env.get('AIRTABLE_TOKEN');
  if (!token) return 0;
  const formula = `AND({Demo status}!='', {Demo status}!='Not started (daily limit)', IS_SAME(SET_TIMEZONE({Demo requested}, 'Africa/Johannesburg'), SET_TIMEZONE(NOW(), 'Africa/Johannesburg'), 'day'))`;
  const url = `${AIRTABLE_URL}?pageSize=100&fields%5B%5D=${DF.demoStatus}&filterByFormula=${encodeURIComponent(formula)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.error('Airtable demo count failed', res.status, (await res.text()).slice(0, 300));
    return 0;
  }
  return ((await res.json()) as { records?: unknown[] }).records?.length ?? 0;
}

// --- WhatsApp alert to Jeremy and Ashley (SP2 "Website leads" group), never throws ---
export async function sendAlert(kind: 'started' | 'lead', text: string) {
  const url = Netlify.env.get('WEBSITE_LEAD_ALERT_URL');
  const key = Netlify.env.get('WEBSITE_LEAD_ALERT_KEY');
  if (!url || !key) {
    console.error('Lead alert not sent: WEBSITE_LEAD_ALERT_URL or WEBSITE_LEAD_ALERT_KEY is not set');
    return;
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, text: text.slice(0, 1000) }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error('Lead alert failed', res.status, (await res.text()).slice(0, 300));
  } catch (err) {
    console.error('Lead alert error', err instanceof Error ? err.message : String(err));
  }
}

// --- Start the build (from demo-lead.mts when a website visitor presses send) ---
export type DemoLead = {
  recordId: string;
  name: string;
  category?: string;
  address?: string;
  phone?: string;
  website?: string;
  googleMapsUrl?: string;
  rating?: number;
  reviewCount?: number;
};

export async function startDemo(lead: DemoLead) {
  const routineUrl = Netlify.env.get('DEMO_ROUTINE_URL');
  const routineToken = Netlify.env.get('DEMO_ROUTINE_TOKEN');
  const secret = Netlify.env.get('DEMO_SECRET');
  if (!routineUrl || !routineToken || !secret) {
    console.error('Demo not started: DEMO_ROUTINE_URL, DEMO_ROUTINE_TOKEN or DEMO_SECRET is not set');
    return;
  }
  const existing = await readRecord(lead.recordId);
  if (existing?.[DF.demoStatus]) return; // one demo per lead

  const cap = Number(Netlify.env.get('DEMO_DAILY_CAP') || 10);
  if ((await demosStartedToday()) >= cap) {
    await updateRecord(lead.recordId, { [DF.demoStatus]: 'Not started (daily limit)', [DF.demoRequested]: new Date().toISOString() });
    await sendAlert('lead', `⏸️ No demo website for ${lead.name}: the daily limit of ${cap} demos is reached. Make one by hand if they're worth it.\nAirtable: ${airtableLink(lead.recordId)}`);
    return;
  }

  const slug = demoSlug(lead.name, lead.recordId);
  const token = await signToken({ p: 'build', r: lead.recordId, s: slug, e: Date.now() + 3 * 60 * 60 * 1000 }, secret);
  const { recordId: _id, ...business } = lead;
  const payload = { lead: business, slug, token, publishUrl: 'https://sites.localpros.co.za/api/demo-publish' };
  // The routine's saved prompt says what to do; the fire text is only the data (it arrives marked untrusted)
  const text = JSON.stringify(payload);

  await updateRecord(lead.recordId, { [DF.demoStatus]: 'Building', [DF.demoRequested]: new Date().toISOString() });
  try {
    const res = await fetch(routineUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${routineToken}`, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(8000),
    });
    const out = await res.text();
    if (!res.ok) throw new Error(`routine ${res.status}: ${out.slice(0, 200)}`);
    const session = (JSON.parse(out) as { claude_code_session_url?: string }).claude_code_session_url;
    await sendAlert('lead', `🛠️ Building a free demo website for ${lead.name} (about 15 minutes). You'll get the link to check before it goes to them.${session ? `\nWatch: ${session}` : ''}`);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error('Demo routine fire failed', reason);
    await updateRecord(lead.recordId, { [DF.demoStatus]: 'Failed' });
    await sendAlert('lead', `⚠️ The demo website for ${lead.name} did not start (${reason.slice(0, 120)}). Make one by hand.\nAirtable: ${airtableLink(lead.recordId)}`);
  }
}

// --- The WhatsApp to the visitor (demo-send.mts), from Ashley's number through the bot service ---
export const demoMessage = (name: string, url: string) =>
  `Hi, it's Ashley from Local Pros Studio. Here's the free demo website we made for ${name}, from your Google listing:\n${url}\n\nHave a look on your phone. Tell me what you'd change and we'll take it from there.`;

export const html = (body: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Demo website</title><style>body{font:16px/1.5 system-ui,sans-serif;max-width:32rem;margin:2rem auto;padding:0 16px;color:#1a1a1a;background:#fff}a{color:#0b6b4f}pre{white-space:pre-wrap;background:#f4f4f2;padding:12px;border-radius:8px;font:inherit}button{font:inherit;font-weight:600;background:#0b6b4f;color:#fff;border:0;border-radius:10px;padding:14px 20px;width:100%;cursor:pointer}.muted{color:#666;font-size:14px}</style></head><body>${body}</body></html>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );

export const esc = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
