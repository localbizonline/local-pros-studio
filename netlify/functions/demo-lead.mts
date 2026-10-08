// POST /api/demo-lead from the site chat (src/components/demo-popup/): the free demo popup on
// /website-design, and the "Start now" chat on the join page and homepage.
// Creates one record in Airtable "Sales CRM / Master List", the same table the localpros.co.za/join form
// writes to (../localpros-join/workers/join-form/src/index.ts), with Source = "Website" plus the page's tag.
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

const noteFor = (body: Record<string, unknown>) => {
  const page = typeof body.page === 'string' && Object.hasOwn(PAGE_NOTE, body.page) ? PAGE_NOTE[body.page] : 'the website';
  const plan = typeof body.plan === 'string' && Object.hasOwn(PLAN_NOTE, body.plan) ? PLAN_NOTE[body.plan] : '';
  return plan ? `Start now: ${plan}, from ${page}.` : `Free demo website request, from ${page}.`;
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
    if (mapsUrl && isGoogleMapsUrl(mapsUrl)) fields[F.gbpUrl] = mapsUrl;
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
    const link = webUrl(body.link);
    if (link) fields[/facebook\.com|fb\.com|fb\.me/i.test(link) ? F.facebook : F.website] = link;
    fields[F.message] = `${noteFor(body)}\nNot found on Google: typed their business name${link ? ' and link' : ''}.`;
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
    recordId ? `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}` : 'Not saved to Airtable (error). Details above.',
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 1000);
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

  if (!live) return json({ ok: true, dryRun: true, airtableFields: fields, alert: leadText(body, fields, 'recDRYRUN') }, 200);
  const token = Netlify.env.get('AIRTABLE_TOKEN');
  if (!token) {
    console.error('DEMO_LEAD_LIVE_WRITES is true but AIRTABLE_TOKEN is not set');
    return json({ ok: false, error: 'server' }, 500);
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
    await sendAlert('lead', leadText(body, fields, created.records?.[0]?.id || null));
    return json({ ok: true }, 200);
  } catch (err) {
    console.error('Airtable request error', err instanceof Error ? err.message : String(err));
    await sendAlert('lead', leadText(body, fields, null));
    return json({ ok: false, error: 'server' }, 502);
  }
};

export const config = { path: '/api/demo-lead' };
