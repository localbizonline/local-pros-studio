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
// and kind "lead" when a lead is saved. When a visitor who wants a website presses send, it also starts
// their free demo website (netlify/lib/demo.mts). Team devices never call this (src/teamDevice.ts).
// Dry run unless DEMO_LEAD_LIVE_WRITES is exactly "true" (production only): then it returns the fields instead.

declare const Netlify: { env: { get(name: string): string | undefined } };

import { sendAlert, startDemo } from '../lib/demo.mts';

const AIRTABLE_URL = 'https://api.airtable.com/v0/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN';
const MAX_BODY_BYTES = 10_000;
// The note in "Join page Message" says what they asked for and where, e.g. "Start now: full package, from the homepage."
const PLAN_NOTE: Record<string, string> = {
  package: 'full package',
  reviews: 'Google reviews',
  social: 'social media posting',
  website: 'website',
};
// A hero's free offer (src/components/demo-popup/openSiteChat.ts ChatOffer, 9 Oct 2026) says what they asked for instead
const OFFER_NOTE: Record<string, string> = {
  checkup: 'Free check-up of their Google profile, Facebook and website',
  'social-demo': 'Free social media demo (3 sample posts)',
  'review-check': 'Checked their Google reviews, wants Google reviews',
  // The examples chat (src/components/web-examples/, draft 12 Oct 2026): we WhatsApp them websites for their type of business
  examples: 'Wants popular website designs for their type of business and our prices, on WhatsApp',
};
const OFFER_LABEL: Record<string, string> = {
  checkup: 'free check-up',
  'social-demo': 'free social media demo',
  'review-check': 'review check',
  examples: 'popular designs',
};
// The homepage examples chat's extra question, "What would help most?" (src/components/web-examples/ExamplesChat.tsx NEEDS)
const NEED_NOTE: Record<string, string> = {
  reviews: 'more Google reviews',
  social: 'social media posts',
  website: 'a new website',
  package: 'all three: reviews, posts and a website (R2,500 a month)',
};
// The instant price chat (website page draft): how many services they offer and the price they were shown
const SERVICES_NOTE: Record<string, string> = { '1-3': '1 to 3', '4+': '4 or more' };
const servicesOf = (body: Record<string, unknown>) => (typeof body.services === 'string' && Object.hasOwn(SERVICES_NOTE, body.services) ? SERVICES_NOTE[body.services] : '');
const priceShown = (body: Record<string, unknown>) => (typeof body.price === 'string' && /^(from )?R[\d,]{4,8}( a month)?$/.test(body.price) ? body.price : '');
// What the examples chat promised, by page and plan (src/components/web-examples/ExamplesChat.tsx VARIANTS)
const examplesWhat = (body: Record<string, unknown>) =>
  body.page === 'home' ? 'examples of our work' : body.plan === 'reviews' ? 'Google review examples' : body.plan === 'social' ? 'social media post examples' : 'popular designs';
const needOf = (body: Record<string, unknown>) => (typeof body.need === 'string' && Object.hasOwn(NEED_NOTE, body.need) ? NEED_NOTE[body.need] : '');
// What the team should send someone from the examples chat
// A price button's "get started" (src/components/web-examples/ExamplesChat.tsx START): they've chosen already
const isStart = (body: Record<string, unknown>) => body.start === true;
const startPlan = (body: Record<string, unknown>) => (body.plan === 'package' ? 'the R2,500 a month package (website, social posts, reviews)' : 'a website');
const sendWhat = (body: Record<string, unknown>) =>
  isStart(body)
    ? `They want to get started with ${startPlan(body)}: confirm what they need and send the next steps.`
    : priceShown(body) && body.plan === 'reviews'
    ? `Send them how we get their type of business more Google reviews and confirm the ${priceShown(body)} price they saw.`
    : priceShown(body) && body.plan === 'social'
    ? `Send examples of posts for their type of business and confirm the ${priceShown(body)} price they saw.`
    : priceShown(body)
    ? `Send 3 popular designs for their type of business (layouts we use most: client sites, example designs or a template with their name) and confirm the ${priceShown(body)} price they saw, plus R290 a month for hosting and updates, first charged a month after the deposit (online shops: hosting quoted with the shop).`
    : needOf(body)
    ? `Send 2 or 3 examples of our work for their type of business (they want ${needOf(body)}) and our prices.`
    : 'Send 3 popular designs for their type of business (layouts we use most: client sites, example designs or a template with their name) and our prices.';

const PAGE_NOTE: Record<string, string> = {
  'website-design': 'the Google Ads website page (/go/website-design)',
  'web-design': 'studio.localpros.co.za/website-design-package',
  home: 'the homepage',
  join: 'the join page',
  reviews: 'the Google reviews page',
  social: 'the social media posting page',
  pricing: 'the pricing page',
};
// A second Source tag per page, beside "Website", so leads can be filtered by where they came from.
// typecast creates the option the first time a page sends a lead.
const PAGE_SOURCE: Record<string, string> = {
  // The Google Ads page: /website-design until 9 Oct 2026, /go/website-design since 13 Oct 2026
  'website-design': 'Website – website design page',
  // The same page with the site menu, reached from the site rather than from Google Ads (8 Oct 2026)
  'web-design': 'Website – website design page (site menu)',
  home: 'Website – homepage',
  join: 'Website – join page',
  reviews: 'Website – Google reviews page',
  social: 'Website – social media posting page',
  pricing: 'Website – pricing page',
};

// How far they got, from the steps the chat reports, e.g. "picked their business on Google, pressed send"
const STEP_NOTE: Record<string, string> = {
  picked: 'picked their business on Google',
  confirmed: 'confirmed it is theirs',
  number: 'gave the number we can WhatsApp them on',
  typed: 'typed their details (not found on Google)',
  answered: 'answered the quick questions',
  sent: 'pressed send (WhatsApp opened)',
  requested: 'asked for the examples on WhatsApp',
};
// The chat's quick questions (src/components/demo-popup/DemoPopup.tsx QUESTIONS): only these answers are kept
const ANSWERS: Record<string, { label: string; options: Record<string, string> }> = {
  pay: { label: 'Prefers to pay', options: { once: 'once-off (from R6,500; R9,900 on the Google Ads price pages)', rent: 'rent to own (R450 a month, Google Ads price pages only)', package: 'free with reviews + social posts (R2,500 a month)', unsure: 'not sure yet' } },
  site: { label: 'Website now', options: { none: 'none', 'needs-work': 'has one, needs work', fine: 'has one, it’s fine' } },
  when: { label: 'Timing', options: { asap: 'as soon as possible', month: 'in the next month', looking: 'just looking for now' } },
};
const answersFrom = (body: Record<string, unknown>) => {
  const raw = body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers) ? (body.answers as Record<string, unknown>) : {};
  return Object.keys(ANSWERS)
    .filter((id) => typeof raw[id] === 'string' && Object.hasOwn(ANSWERS[id].options, raw[id] as string))
    .map((id) => ({ id, text: `${ANSWERS[id].label}: ${ANSWERS[id].options[raw[id] as string]}` }));
};
const isHot = (body: Record<string, unknown>) => answersFrom(body).some((a) => a.id === 'when' && a.text.endsWith('as soon as possible'));

const stepsFrom = (body: Record<string, unknown>) =>
  Array.isArray(body.steps) ? [...new Set(body.steps.filter((x): x is string => typeof x === 'string' && Object.hasOwn(STEP_NOTE, x)))] : [];

const noteFor = (body: Record<string, unknown>) => {
  const page = typeof body.page === 'string' && Object.hasOwn(PAGE_NOTE, body.page) ? PAGE_NOTE[body.page] : 'the website';
  const plan = typeof body.plan === 'string' && Object.hasOwn(PLAN_NOTE, body.plan) ? PLAN_NOTE[body.plan] : '';
  const offer = typeof body.offer === 'string' && Object.hasOwn(OFFER_NOTE, body.offer) ? OFFER_NOTE[body.offer] : '';
  const steps = stepsFrom(body).map((step) => STEP_NOTE[step]);
  const type = text(body.businessType, 120);
  const contact = text(body.contactName, 60);
  const need = needOf(body);
  return [
    isStart(body)
      ? `Wants to get started with ${startPlan(body)}, from ${page}.`
      : body.offer === 'examples'
      ? `Wants ${examplesWhat(body)} for their type of business and the price, on WhatsApp, from ${page}.`
      : offer
      ? `${offer}, from ${page}.`
      : plan
      ? `Start now: ${plan}, from ${page}.`
      : `Free demo website request, from ${page}.`,
    type ? `Type of business (they picked): ${type}.` : '',
    need ? `What would help most: ${need}.` : '',
    servicesOf(body) ? `Services they offer: ${servicesOf(body)}.` : '',
    priceShown(body) ? `Price shown in the chat: ${priceShown(body)} (plus R290 a month hosting and updates).` : '',
    contact ? `Name: ${contact}.` : '',
    steps.length ? `So far: ${steps.join(', ')}.` : '',
  ]
    .filter(Boolean)
    .join('\n');
};

// Same field ids as the join form Worker
const F = {
  companyName: 'fldVq7icFoFqUiyhk',
  // "Mobile": the number we can WhatsApp them on (the join form uses the same field, as 0XXXXXXXXX)
  mobile: 'fldBqhQ3Jm0eba2FP',
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
  // The Google Ads click that brought them (src/adClick.ts, 15 Oct 2026)
  fromAds: 'fldFAHg1WBycnFOst',
  adClick: 'fldQf6vuORI49QB71',
} as const;

const allowedOrigin = (origin: string) =>
  origin === 'https://studio.localpros.co.za' ||
  origin === 'http://localhost:4321' ||
  /^https:\/\/[a-z0-9-]+--bejewelled-frangollo-422122\.netlify\.app$/.test(origin);

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// Trim, collapse whitespace and cap length. Anything that isn't a string becomes ''.
const text = (value: unknown, max: number) => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '');

// The ad click the site remembered (src/adClick.ts): Google's click id (gclid, or gbraid/wbraid on iOS) and
// any utm_ tags. Ids are kept only when they look like ids, so nothing else lands in Airtable or the alert.
const AD_ID = /^[A-Za-z0-9_-]{8,200}$/;
type AdClickInfo = { fromAds: boolean; details: string; campaign: string };
const adClickFrom = (body: Record<string, unknown>): AdClickInfo | null => {
  const raw = body.adClick && typeof body.adClick === 'object' && !Array.isArray(body.adClick) ? (body.adClick as Record<string, unknown>) : null;
  if (!raw) return null;
  const parts: string[] = [];
  for (const id of ['gclid', 'gbraid', 'wbraid']) {
    if (typeof raw[id] === 'string' && AD_ID.test(raw[id] as string)) parts.push(`${id}=${raw[id]}`);
  }
  const fromAds = parts.length > 0;
  for (const tag of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const value = text(raw[tag], 100);
    if (value) parts.push(`${tag}=${value}`);
  }
  if (!parts.length) return null;
  return { fromAds, details: parts.join(' · ').slice(0, 500), campaign: text(raw.utm_campaign, 100) };
};

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

// South African number we can WhatsApp, as 0XXXXXXXXX (same check as the join form Worker)
const normaliseMobile = (value: unknown) => {
  if (typeof value !== 'string' || value.length > 30) return '';
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('27') && digits.length === 11) digits = `0${digits.slice(2)}`;
  else if (digits.length === 9) digits = `0${digits}`;
  return /^0[6-8]\d{8}$/.test(digits) ? digits : '';
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
  // Only ever set, never cleared: a later save without it (storage blocked) must not untick the lead
  const ad = adClickFrom(body);
  if (ad?.fromAds) fields[F.fromAds] = true;
  if (ad) fields[F.adClick] = ad.details;
  // Every call carries the current number; none yet (or a different business picked since) clears it
  const mobile = normaliseMobile(body.whatsApp);
  fields[F.mobile] = mobile || null;
  if (mobile) {
    fields[F.mobile] = mobile;
    fields[F.message] = `${fields[F.message]}\nWhatsApp number: ${mobile} (${body.whatsAppFrom === 'google' ? 'their Google listing number, they said yes' : 'they typed it'}).`;
  }
  const answers = answersFrom(body);
  if (answers.length) fields[F.message] = `${fields[F.message]}\n${answers.map((a) => a.text).join('\n')}`;
  return fields;
}

const ALERT_PAGE: Record<string, string> = {
  'website-design': 'the website design page',
  'web-design': 'the website design page (site menu)',
  home: 'the homepage',
  join: 'the join page',
  reviews: 'the Google reviews page',
  social: 'the social media posting page',
  pricing: 'the pricing page',
};
const pageLabel = (body: Record<string, unknown>) =>
  typeof body.page === 'string' && Object.hasOwn(ALERT_PAGE, body.page) ? ALERT_PAGE[body.page] : 'the website';
const planLabel = (body: Record<string, unknown>) =>
  body.start === true
    ? `get started: ${body.plan === 'package' ? 'R2,500 package' : 'website'}`
    : body.offer === 'examples'
    ? examplesWhat(body)
    : typeof body.offer === 'string' && Object.hasOwn(OFFER_LABEL, body.offer)
    ? OFFER_LABEL[body.offer]
    : typeof body.plan === 'string' && Object.hasOwn(PLAN_NOTE, body.plan)
    ? PLAN_NOTE[body.plan]
    : 'free demo';

const fromAdsLine = (body: Record<string, unknown>) => (adClickFrom(body)?.fromAds ? '📣 Came from a Google Ads click.' : '');
const startedText = (body: Record<string, unknown>) =>
  [`👀 Someone started using the chat on ${pageLabel(body)} (${planLabel(body)}).`, fromAdsLine(body), "No details yet. You'll get another message if they leave them."].filter(Boolean).join('\n');

const leadText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string | null) => {
  const rating = fields[F.gbpReviewScore];
  const reviews = fields[F.gbpReviewCount];
  return [
    `🟢 New website lead: ${fields[F.companyName]}`,
    `From ${pageLabel(body)} (${planLabel(body)})`,
    fromAdsLine(body),
    text(body.businessType, 120) && `They picked: ${text(body.businessType, 120)}`,
    needOf(body) && `Wants most: ${needOf(body)}`,
    servicesOf(body) && `Services: ${servicesOf(body)}`,
    priceShown(body) && `Price shown: ${priceShown(body)}`,
    fields[F.gbpCategory] && `Type: ${fields[F.gbpCategory]}`,
    text(body.contactName, 60) && `Name: ${text(body.contactName, 60)}`,
    fields[F.gbpPhone] && `Phone: ${fields[F.gbpPhone]}`,
    fields[F.mobile] && `WhatsApp: ${fields[F.mobile]}`,
    fields[F.website] && `Website: ${fields[F.website]}`,
    fields[F.facebook] && `Facebook: ${fields[F.facebook]}`,
    fields[F.gbpUrl] && `Google: ${fields[F.gbpUrl]}`,
    typeof rating === 'number' && `Rating: ${rating} (${reviews ?? 0} reviews)`,
    body.mode === 'manual' && String(fields[F.companyName]).includes(PLACEHOLDER_NAME)
      ? "Business name not given yet: you'll get another message if they add it."
      : body.mode === 'manual' && 'Not found on Google (typed their details).',
    ...answersFrom(body).map((a) => a.text),
    stepsFrom(body).includes('requested') && `👉 WhatsApp them. ${sendWhat(body)}`,
    stepsFrom(body).includes('picked') && !stepsFrom(body).includes('confirmed') && !stepsFrom(body).includes('requested') && body.offer !== 'examples' && "Picked on Google, not confirmed yet. You'll get another message if they press send.",
    stepsFrom(body).includes('picked') && body.offer === 'examples' && !stepsFrom(body).includes('requested') && "Picked on Google. You'll get another message if they leave their WhatsApp number.",
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

const numberText = (fields: Record<string, unknown>, recordId: string) =>
  `📱 ${fields[F.companyName]} can be WhatsApped on ${fields[F.mobile]}.\nAirtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`;

const answersText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string) =>
  [
    `📝 ${isHot(body) ? '🔥 ' : ''}${fields[F.companyName]} answered the quick questions (${pageLabel(body)}, ${planLabel(body)})`,
    ...answersFrom(body).map((a) => a.text),
    fields[F.mobile] && `WhatsApp: ${fields[F.mobile]}`,
    `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`,
  ]
    .filter(Boolean)
    .join('\n');

const sentText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string) =>
  [
    `✅ ${isHot(body) ? '🔥 ' : ''}${fields[F.companyName]} pressed send: expect their WhatsApp now.`,
    ...answersFrom(body).map((a) => a.text),
    `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`,
  ].join('\n');

// The examples chat saves the lead before it knows the business, named "<their name> (business name to follow)"
// (src/components/web-examples/ExamplesChat.tsx PLACEHOLDER); its business name arrives in a later update
const PLACEHOLDER_NAME = 'business name to follow';
const namedText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string) => {
  const rating = fields[F.gbpReviewScore];
  return [
    `🏢 ${text(body.contactName, 60) || 'The website visitor'} gave their business name: ${fields[F.companyName]}`,
    body.mode === 'google' ? fields[F.gbpCategory] && `Type: ${fields[F.gbpCategory]}` : 'Not picked on Google (typed it).',
    fields[F.gbpPhone] && `Phone: ${fields[F.gbpPhone]}`,
    fields[F.website] && `Website: ${fields[F.website]}`,
    fields[F.gbpUrl] && `Google: ${fields[F.gbpUrl]}`,
    typeof rating === 'number' && `Rating: ${rating} (${fields[F.gbpReviewCount] ?? 0} reviews)`,
    fields[F.mobile] && `WhatsApp: ${fields[F.mobile]}`,
    `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`,
  ]
    .filter(Boolean)
    .join('\n');
};

const requestedText = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string, bot: BotResult | null = null) =>
  [
    isStart(body)
      ? `🚀 ${fields[F.companyName]} wants to get started (${body.plan === 'package' ? 'R2,500 package' : 'website'}): WhatsApp them now.`
      : bot?.status === 'scheduled'
      ? `📨 ${fields[F.companyName]} wants ${examplesWhat(body)}.`
      : `📨 ${fields[F.companyName]} wants ${examplesWhat(body)}: WhatsApp them now.`,
    botLine(bot),
    text(body.businessType, 120) && `They picked: ${text(body.businessType, 120)}`,
    needOf(body) && `Wants most: ${needOf(body)}`,
    priceShown(body) && `Price shown: ${priceShown(body)}${servicesOf(body) ? ` (${servicesOf(body)} services)` : ''}`,
    text(body.contactName, 60) && `Name: ${text(body.contactName, 60)}`,
    fields[F.mobile] && `WhatsApp: ${fields[F.mobile]}`,
    bot?.status !== 'scheduled' && sendWhat(body),
    `Airtable: https://airtable.com/apppibpiqC6qVlHK1/tblR0KVFuAsG69AuN/${recordId}`,
  ]
    .filter(Boolean)
    .join('\n');

// --- Ashley's WhatsApp bot (repo lp-studio-whatsapp-inbound, docs/website-samples-flow.md, 15 Oct 2026) ---
// A website lead from the examples chat who wants a website is handed to the bot on Ashley's number
// (POST /webhook/new-lead, playbook website-samples). 2 to 5 minutes later, between 08:00 and 18:00, it
// WhatsApps them a couple of short questions; only once they answer does it make or pick 3 sample designs
// and send them. Called on every save with a number: the bot sends once per record, and while its first
// message is still waiting it replaces it when the business name or number changes.
// Off unless SAMPLES_BOT_ON is "true" (plus BOT_NEW_LEAD_URL, BOT_NEW_LEAD_SECRET and DEMO_BOT_SESSION_ID).
type BotResult = { status: string; reason?: string; send_at?: string };
const wantsWebsiteSamples = (body: Record<string, unknown>) =>
  body.offer === 'examples' &&
  !isStart(body) &&
  !['reviews', 'social', 'package'].includes(String(body.plan || '')) &&
  (body.page !== 'home' || body.need === 'website');

const sast = (iso: string) =>
  new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', weekday: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
const BOT_SKIPPED: Record<string, string> = {
  existing_conversation: "they're already in a chat with Ashley's number",
  opted_out: 'they asked us before to stop WhatsApping them',
  opener_already_sent: 'the bot already messaged them, before this change',
};
const botLine = (bot: BotResult | null) => {
  if (!bot) return '';
  if (bot.status === 'scheduled' && bot.send_at) return `🤖 Ashley's bot will WhatsApp them at about ${sast(bot.send_at)}: 2 quick questions, then it makes their samples. No need to message them.`;
  const why = bot.status === 'skipped' ? BOT_SKIPPED[bot.reason || ''] || bot.reason : 'the bot could not be reached';
  return `⚠️ The bot will NOT WhatsApp them (${why}).`;
};

async function tellSamplesBot(body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string): Promise<BotResult | null> {
  const url = Netlify.env.get('BOT_NEW_LEAD_URL');
  const secret = Netlify.env.get('BOT_NEW_LEAD_SECRET');
  const session = Netlify.env.get('DEMO_BOT_SESSION_ID');
  if (Netlify.env.get('SAMPLES_BOT_ON') !== 'true' || !url || !secret || !session) return null;
  if (!wantsWebsiteSamples(body) || !fields[F.mobile]) return null;
  const name = String(fields[F.companyName] || '');
  const [industry, type] = text(body.businessType, 120).split(' – ');
  const lead = {
    session_id: session,
    playbook: 'website-samples',
    phone: fields[F.mobile],
    first_name: text(body.contactName, 60),
    company_name: name.includes(PLACEHOLDER_NAME) ? '' : name,
    source: `website: ${pageLabel(body)}`,
    source_record_id: recordId,
    website_url: fields[F.website] || '',
    facebook_url: fields[F.facebook] || '',
    business_type: { industry: industry || '', type: type || '' },
    chat_answers: Object.fromEntries([['services', servicesOf(body)], ['need', needOf(body)]].filter(([, v]) => v)),
    price_shown: priceShown(body),
  };
  const payload = JSON.stringify(lead);
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)))].map((b) => b.toString(16).padStart(2, '0')).join('');
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-webhook-signature': sig },
      body: payload,
      signal: AbortSignal.timeout(6000),
    });
    const data = (await res.json().catch(() => ({}))) as BotResult;
    if (!res.ok) {
      console.error('Samples bot new-lead failed', res.status, JSON.stringify(data).slice(0, 300));
      return { status: 'error', reason: data.reason || `http_${res.status}` };
    }
    return { status: data.status, reason: data.reason, send_at: data.send_at };
  } catch (err) {
    console.error('Samples bot new-lead error', err instanceof Error ? err.message : String(err));
    return { status: 'error' };
  }
}

// Every step a visitor takes, for the bot dashboard's Website tab (lp-studio-whatsapp-inbound,
// POST /webhook/website-event, 15 Oct 2026). The same bot and secret the site already uses: the samples
// bot's BOT_NEW_LEAD_URL, else demo-send's DEMO_BOT_URL, with /webhook/website-event as the path.
// Off when neither is set. Never holds up the visitor (waitUntil) and a failure only logs: the
// dashboard missing a step is not worth an error.
type StepEvent = { step: string; lead_ref?: string | null; business?: string; phone?: string; page?: string; from_ads?: boolean; ad_campaign?: string };
async function reportSteps(events: StepEvent[]) {
  const botUrl = Netlify.env.get('BOT_NEW_LEAD_URL') || Netlify.env.get('DEMO_BOT_URL');
  const secret = Netlify.env.get('BOT_NEW_LEAD_SECRET') || Netlify.env.get('DEMO_BOT_SECRET');
  if (!botUrl || !secret || events.length === 0) return;
  const url = botUrl.replace(/\/webhook\/[^/]+\/?$/, '/webhook/website-event');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const at = new Date().toISOString();
  await Promise.all(events.map(async (event) => {
    const payload = JSON.stringify({ ...event, occurred_at: at });
    try {
      const sig = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)))].map((b) => b.toString(16).padStart(2, '0')).join('');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-webhook-signature': sig },
        body: payload,
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) console.error('Dashboard step failed', event.step, res.status);
    } catch (err) {
      console.error('Dashboard step error', event.step, err instanceof Error ? err.message : String(err));
    }
  }));
}
// The steps this save adds: steps the chat reports that the record's note did not have yet, plus the
// number when it is new, plus a changed business. The first save of a record has no note, so all of them.
const newSteps = (body: Record<string, unknown>, fields: Record<string, unknown>, recordId: string, old: Record<string, unknown> | null): StepEvent[] => {
  const oldNote = old && typeof old[F.message] === 'string' ? (old[F.message] as string) : '';
  const oldName = old && typeof old[F.companyName] === 'string' ? (old[F.companyName] as string) : '';
  const name = String(fields[F.companyName] || '');
  const steps = stepsFrom(body).filter((step) => !oldNote.includes(STEP_NOTE[step]));
  if (fields[F.mobile] && (!old || old[F.mobile] !== fields[F.mobile]) && !steps.includes('number') && !steps.includes('requested')) steps.push('number');
  if (oldName && !oldName.includes(PLACEHOLDER_NAME) && oldName !== name) steps.push('business_changed');
  const ad = adClickFrom(body);
  return steps.map((step) => ({
    step,
    lead_ref: recordId,
    business: name.includes(PLACEHOLDER_NAME) ? '' : name,
    phone: String(fields[F.mobile] || ''),
    page: pageLabel(body),
    from_ads: !!ad?.fromAds,
    ad_campaign: ad?.campaign || undefined,
  }));
};
const reportInBackground = (context: Context | undefined, events: StepEvent[]) => {
  const report = reportSteps(events).catch(() => undefined);
  if (context?.waitUntil) context.waitUntil(report);
  else return report;
};

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

// A free demo website (netlify/lib/demo.mts) for visitors who asked for one: the free demo offer or the
// website plan, found on Google. Started when they press send, once per lead.
const wantsDemoWebsite = (body: Record<string, unknown>) => body.mode === 'google' && !body.offer && (!body.plan || body.plan === 'website');

// Netlify's context: waitUntil lets the demo start finish after the visitor has their answer
type Context = { waitUntil?: (promise: Promise<unknown>) => void };

export default async (request: Request, context?: Context) => {
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
    await reportInBackground(context, [{ step: 'started', page: pageLabel(body), from_ads: !!adClickFrom(body)?.fromAds }]);
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
      const oldName = typeof old[F.companyName] === 'string' ? (old[F.companyName] as string) : '';
      if (oldName.includes(PLACEHOLDER_NAME) && oldName !== fields[F.companyName]) await sendAlert('lead', namedText(body, fields, recordId));
      else if (oldName && oldName !== fields[F.companyName]) await sendAlert('lead', changedText(body, fields, recordId));
      const requested = stepsFrom(body).includes('requested') && !oldNote.includes(STEP_NOTE.requested);
      const bot = await tellSamplesBot(body, fields, recordId);
      await reportInBackground(context, newSteps(body, fields, recordId, old));
      // Asking for the examples says it all in one message, number included
      if (requested) await sendAlert('lead', requestedText(body, fields, recordId, bot));
      else if (fields[F.mobile] && old[F.mobile] !== fields[F.mobile]) await sendAlert('lead', numberText(fields, recordId));
      if (stepsFrom(body).includes('answered') && !oldNote.includes(STEP_NOTE.answered)) await sendAlert('lead', answersText(body, fields, recordId));
      if (stepsFrom(body).includes('sent') && !oldNote.includes(STEP_NOTE.sent)) {
        await sendAlert('lead', sentText(body, fields, recordId));
        if (wantsDemoWebsite(body)) {
          const demo = startDemo({
            recordId,
            name: String(fields[F.companyName]),
            category: (fields[F.gbpCategory] as string) || undefined,
            address: text(body.address, 200) || undefined,
            phone: (fields[F.gbpPhone] as string) || undefined,
            website: (fields[F.gbpWebsite] as string) || undefined,
            googleMapsUrl: (fields[F.gbpUrl] as string) || undefined,
            rating: fields[F.gbpReviewScore] as number | undefined,
            reviewCount: fields[F.gbpReviewCount] as number | undefined,
          });
          if (context?.waitUntil) context.waitUntil(demo);
          else await demo;
        }
      }
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
    // The examples chat creates the record with their number: it can go straight to the bot
    const bot = id ? await tellSamplesBot(body, fields, id) : null;
    if (id) await reportInBackground(context, newSteps(body, fields, id, null));
    await sendAlert('lead', [leadText(body, fields, id), botLine(bot)].filter(Boolean).join('\n'));
    return json({ ok: true, record: id ? { id, pass: await passFor(id, token) } : null }, 200);
  } catch (err) {
    console.error('Airtable request error', err instanceof Error ? err.message : String(err));
    await sendAlert('lead', leadText(body, fields, null));
    return json({ ok: false, error: 'server' }, 502);
  }
};

export const config = { path: '/api/demo-lead' };
