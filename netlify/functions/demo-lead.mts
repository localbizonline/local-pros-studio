// POST /api/demo-lead from the site chat (src/components/demo-popup/): the free demo popup on
// /website-design, and the "Start now" chat on the join page and homepage.
// Creates one record in Airtable "Sales CRM / Master List", the same table the localpros.co.za/join form
// writes to (../localpros-join/workers/join-form/src/index.ts), with Source = "Website" plus the page's tag.
// One record per chat: created when they first pick their business on Google (or send typed details),
// then updated as they confirm, change business or press send. The create returns the record id and a
// pass (an HMAC of the id); later calls must bring both, so nobody else can change the record.
// Never Source = "Incoming": that starts the join form's WhatsApp opener automation.
// It also WhatsApps Jeremy and Ashley through SP2 (POST WEBSITE_LEAD_ALERT_URL, recipients = SP2's
// "Website leads" group): kind "started" when someone first uses the chat (alert only, nothing saved)
// and kind "lead" when a lead is saved. Team devices never call this (src/teamDevice.ts).
// Dry run unless DEMO_LEAD_LIVE_WRITES is exactly "true" (production only): then it returns the fields instead.

declare const Netlify: { env: { get(name: string): string | undefined } };

const AIRTABLE_URL = 'https://api.airtable.com/v0/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN';
const MAX_BODY_BYTES = 10_000;
// The note in "Join page Message" says what they asked for and where, e.g. "Start now: full package, from the homepage."
const PLAN_NOTE: Record<string, string> = {
  package: 'full package',
  reviews: 'Google reviews',
  social: 'social media posting',
  website: 'website',
};
const PAGE_NOTE: Record<string, string> = {
  'website-design': 'studio.localpros.co.za/website-design',
  'web-design': 'studio.localpros.co.za/web-design',
  home: 'the homepage',
  join: 'the join page',
};
// A second Source tag per page, beside "Website", so leads can be filtered by where they came from.
// typecast creates the option the first time a page sends a lead.
const PAGE_SOURCE: Record<string, string> = {
  'website-design': 'Website – website design page',
  // The same page with the site menu, reached from the site rather than from Google Ads (8 Oct 2026)
  'web-design': 'Website – website design page (site menu)',
  home: 'Website – homepage',
  join: 'Website – join page',
};

// How far they got, from the steps the chat reports, e.g. "picked their business on Google, pressed send"
const STEP_NOTE: Record<string, string> = {
  picked: 'picked their business on Google',
  confirmed: 'confirmed it is theirs',
  typed: 'typed their details (not found on Google)',
  sent: 'pressed send (WhatsApp opened)',
};
const stepsFrom = (body: Record<string, unknown>) =>
  Array.isArray(body.steps) ? [...new Set(body.steps.filter((x): x is string => typeof x === 'string' && Object.hasOwn(STEP_NOTE, x)))] : [];

const noteFor = (body: Record<string, unknown>) => {
  const page = typeof body.page === 'string' && Object.hasOwn(PAGE_NOTE, body.page) ? PAGE_NOTE[body.page] : 'the website';
  const plan = typeof body.plan === 'string' && Object.hasOwn(PLAN_NOTE, body.plan) ? PLAN_NOTE[body.plan] : '';
  const steps = stepsFrom(body).map((step) => STEP_NOTE[step]);
  return [plan ? `Start now: ${plan}, from ${page}.` : `Free demo website request, from ${page}.`, steps.length ? `So far: ${steps.join(', ')}.` : '']
    .filter(Boolean)
    .join('\n');
};

// Same field ids as the join form Worker
const F = {
  companyName: 'fldVq7icFoFqUiyhk',
  message: 'fld6jS3UgLGgbQfGG',
  facebook: 'fldRqkEzq16sHHxPK',
  source: 'fld1BEG7NC7uQqe7g',
  website: 'fld7QjOvgKHKRawiG',
  gbpUrl: 'fldgmRkETsdWjdQWH',
  gbpPlaceId: 'fldJvu8MhqhPLykCU',
  gbpName: 'fldNdmrRngDAQxFKI',
  gbpCategory: 'fldrGdC5J1ZQJ4Zvt',
  gbpWebsite: 'fldYTd7glP03Tl9tz',
  gbpPhone: 'fldSzUjuiTlqREHdd',
  gbpReviewCount: 'fldy45sJD48ECMWwP',
  gbpReviewScore: 'fldBSKEE2oexmoLgs',
} as const;

const allowedOrigin = (origin: string) =>
  origin === 'https://studio.localpros.co.za' ||
  origin === 'http://localhost:4321' ||
  /^https:\/\/[a-z0-9-]+--bejewelled-frangollo-422122\.netlify\.app$/.test(origin);

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Trim, collapse whitespace and cap length. Anything that isn't a string becomes ''.
const text = (value: unknown, max: number) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '');

// http(s) links only; "facebook.com/x" gets https:// added
const webUrl = (value: unknown) => {
  const raw = text(value, 500);
  if (!raw) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return /^https?:$/.test(url.protocol) && url.hostname.includes('.') ? url.toString() : '';
  } catch {
    return '';
  }
};

const isGoogleMapsUrl = (url: string) => /^https:\/\/(maps\.google\.com|www\.google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/.test(url);

const number = (value: unknown, min: number, max: number) =>
  typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max ? value : undefined;

function buildFields(body: Record<string, unknown>): Record<string, unknown> | null {
  const pageSource = typeof body.page === 'string' && Object.hasOwn(PAGE_SOURCE, body.page) ? PAGE_SOURCE[body.page] : '';
  const fields: Record<string, unknown> = { [F.source]: pageSource ? ['Website', pageSource] : ['Website'] };

  if (body.mode === 'google') {
    const name = text(body.name, 200);
    const placeId = text(body.placeId, 300);
    if (!name || !placeId) return null;
    fields[F.companyName] = name;
    fields[F.gbpName] = name;
    fields[F.gbpPlaceId] = placeId;
    const mapsUrl = webUrl(body.mapsUri);
    if (mapsUrl && isGoogleMapsUrl(mapsUrl)) {
      // Google's link carries tracking extras; the listing id (cid) is all the team needs
      const cid = new URL(mapsUrl).searchParams.get('cid');
      fields[F.gbpUrl] = cid && /^\d+$/.test(cid) ? `https://maps.google.com/?cid=${cid}` : mapsUrl;
    }
    const category = text(body.category, 120);
    if (category) fields[F.gbpCategory] = category;
    const website = webUrl(body.website);
    if (website) {
      fields[F.gbpWebsite] = website;
      fields[F.website] = website;
    }
    const phone = text(body.phone, 40);
    if (phone) fields[F.gbpPhone] = phone;
    const reviewCount = number(body.reviewCount, 0, 1_000_000);
    if (reviewCount !== undefined) fields[F.gbpReviewCount] = Math.round(reviewCount);
    const rating = number(body.rating, 0, 5);
    if (rating !== undefined) fields[F.gbpReviewScore] = Math.round(rating * 10) / 10;
    fields[F.message] = noteFor(body);
  } else if (body.mode === 'manual') {
    const name = text(body.name, 200);
    if (!name) return null;
    fields[F.companyName] = name;
    // Typed by hand after picking a Google listing: that listing was not theirs, so clear it
    for (const id of [F.gbpUrl, F.gbpPlaceId, F.gbpName, F.gbpCategory, F.gbpWebsite, F.gbpPhone, F.gbpReviewCount, F.gbpReviewScore]) fields[id] = null;
    const link = webUrl(body.link);
    if (link) fields[/facebook\.com|fb\.com|fb\.me/i.test(link) ? F.facebook : F.website] = link;
    fields[F.message] = noteFor(body);
  } else {
    return null;
  }
  return fields;
}

const ALERT_PAGE: Record<string, string> = {
  'website-design': 'the website design page',
  'web-design': 'the website design page (site menu)',
  home: 'the homepage',
  join: 'the join page',
};
const pageLabel = (body: Record<string, unknown>) =>
  typeof body.page === 'string' && Object.hasOwn(ALERT_PAGE, body.page) ? ALERT_PAGE[body.page] : 'the website';
const planLabel = (body: Record<string, unknown>) =>
  typeof body.plan === 'string' && Object.hasOwn(PLAN_NOTE, body.plan) ? PLAN_NOTE[body.plan] : 'free demo';

const startedText = (body: Record<string, unknown>) =>
  `👀 Someone started using the chat on ${pageLabel(body)} (${planLabel(body)}).\nNo details yet. You'll get another message if they leave them.`;

const leadText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string | null) => {
  const rating = fields[F.gbpReviewScore];
  const reviews = fields[F.gbpReviewCount];
  return [
    `🟢 New website lead: ${fields[F.companyName]}`,
    `From ${pageLabel(body)} (${planLabel(body)})`,
    fields[F.gbpCategory] && `Type: ${fields[F.gbpCategory]}`,
    fields[F.gbpPhone] && `Phone: ${fields[F.gbpPhone]}`,
    fields[F.website] && `Website: ${fields[F.website]}`,
    fields[F.facebook] && `Facebook: ${fields[F.facebook]}`,
    fields[F.gbpUrl] && `Google: ${fields[F.gbpUrl]}`,
    typeof rating === 'number' && `Rating: ${rating} (${reviews ?? 0} reviews)`,
    body.mode === 'manual' && 'Not found on Google (typed their details).',
    stepsFrom(body).includes('picked') && !stepsFrom(body).includes('confirmed') && "Picked on Google, not confirmed yet. You'll get another message if they press send.",
    recordId ? `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}` : 'Not saved to Airtable (error). Details above.',
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 1000);
};

const changedText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string) =>
  [
    `✏️ Website lead changed their business to: ${fields[F.companyName]}`,
    `From ${pageLabel(body)} (${planLabel(body)})`,
    fields[F.gbpPhone] && `Phone: ${fields[F.gbpPhone]}`,
    fields[F.gbpUrl] && `Google: ${fields[F.gbpUrl]}`,
    `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`,
  ]
    .filter(Boolean)
    .join('\n');

const sentText = (fields: Record<string, unknown>, recordId: string) =>
  `✅ ${fields[F.companyName]} pressed send: expect their WhatsApp now.\nAirtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`;

// The pass for one record: HMAC-SHA256 of its id, keyed with the server-only Airtable token
async function passFor(recordId: string, secret: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(`demo-lead:${secret}`), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(recordId));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const sameText = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

// Never blocks or fails the visitor's request: a missed alert is logged, the lead is still saved
async function sendAlert(kind: 'started' | 'lead', text: string) {
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
      body: JSON.stringify({ kind, text }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error('Lead alert failed', res.status, (await res.text()).slice(0, 300));
  } catch (err) {
    console.error('Lead alert error', err instanceof Error ? err.message : String(err));
  }
}

export default async (request: Request) => {
  const origin = request.headers.get('Origin') || '';
  if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!allowedOrigin(origin)) return json({ ok: false, error: 'forbidden' }, 403);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'too_large' }, 413);
  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
    body = parsed;
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Honeypot: bots fill hidden fields. Pretend it worked and do nothing.
  if (typeof body.company_website_confirm === 'string' && body.company_website_confirm.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const live = Netlify.env.get('DEMO_LEAD_LIVE_WRITES') === 'true';

  // Someone started using the chat: alert only, nothing saved
  if (body.kind === 'started') {
    const text = startedText(body);
    if (!live) return json({ ok: true, dryRun: true, alert: text }, 200);
    await sendAlert('started', text);
    return json({ ok: true }, 200);
  }

  const fields = buildFields(body);
  if (!fields) return json({ ok: false, error: 'validation' }, 400);

  // A later step for a record this chat already created: needs its id and pass
  const recordId = typeof body.recordId === 'string' && /^rec[A-Za-z0-9]{14}$/.test(body.recordId) ? body.recordId : '';
  if (body.recordId !== undefined && !recordId) return json({ ok: false, error: 'validation' }, 400);

  if (!live) {
    return json({ ok: true, dryRun: true, update: !!recordId, airtableFields: fields, alert: recordId ? null : leadText(body, fields, 'recDRYRUN'), record: { id: recordId || 'recDRYRUN0000000', pass: 'dry-run' } }, 200);
  }
  const token = Netlify.env.get('AIRTABLE_TOKEN');
  if (!token) {
    console.error('DEMO_LEAD_LIVE_WRITES is true but AIRTABLE_TOKEN is not set');
    return json({ ok: false, error: 'server' }, 500);
  }

  if (recordId) {
    if (typeof body.pass !== 'string' || !sameText(body.pass, await passFor(recordId, token))) return json({ ok: false, error: 'forbidden' }, 403);
    try {
      // Read what it was, so the alerts only go out for a new business or a first send
      const before = await fetch(`${AIRTABLE_URL}/${recordId}?returnFieldsByFieldId=true`, { headers: { Authorization: `Bearer ${token}` } });
      const old = before.ok ? (((await before.json()) as { fields?: Record<string, unknown> }).fields ?? {}) : {};
      const res = await fetch(`${AIRTABLE_URL}/${recordId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, typecast: true }),
      });
      if (!res.ok) {
        console.error('Airtable update failed', res.status, (await res.text()).slice(0, 1000));
        return json({ ok: false, error: 'server' }, 502);
      }
      const oldNote = typeof old[F.message] === 'string' ? (old[F.message] as string) : '';
      if (old[F.companyName] && old[F.companyName] !== fields[F.companyName]) await sendAlert('lead', changedText(body, fields, recordId));
      if (stepsFrom(body).includes('sent') && !oldNote.includes(STEP_NOTE.sent)) await sendAlert('lead', sentText(fields, recordId));
      return json({ ok: true }, 200);
    } catch (err) {
      console.error('Airtable update error', err instanceof Error ? err.message : String(err));
      return json({ ok: false, error: 'server' }, 502);
    }
  }

  try {
    const res = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });
    if (!res.ok) {
      console.error('Airtable create failed', res.status, (await res.text()).slice(0, 1000));
      await sendAlert('lead', leadText(body, fields, null));
      return json({ ok: false, error: 'server' }, 502);
    }
    const created = (await res.json()) as { records?: { id?: string }[] };
    const id = created.records?.[0]?.id || null;
    await sendAlert('lead', leadText(body, fields, id));
    return json({ ok: true, record: id ? { id, pass: await passFor(id, token) } : null }, 200);
  } catch (err) {
    console.error('Airtable request error', err instanceof Error ? err.message : String(err));
    await sendAlert('lead', leadText(body, fields, null));
    return json({ ok: false, error: 'server' }, 502);
  }
};

export const config = { path: '/api/demo-lead' };
