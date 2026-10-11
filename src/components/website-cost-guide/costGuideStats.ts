import { SURVEY, type SurveyCompany } from './priceSurvey';

// Every figure on the cost guide, worked out from the survey (priceSurvey.ts), so the page can't drift from the data.

export const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

// Rand, whole numbers (a median of two prices can end in .5)
export const rand = (n: number) => `R${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export type Bucket = '1' | '5' | '10';

export const BUCKET_LABEL: Record<Bucket, string> = {
  '1': 'One page',
  '5': 'About 5 pages',
  '10': 'About 10 pages',
};

// One once-off price per company for each size (its package in that size group)
export const bucketPrices = (bucket: Bucket) =>
  SURVEY.flatMap((c) => {
    const p = c.packages.find((x) => x.bucket === bucket && x.onceOff !== null);
    return p?.onceOff ? [p.onceOff] : [];
  });

export const bucketStats = (bucket: Bucket) => {
  const prices = bucketPrices(bucket);
  return { bucket, count: prices.length, median: median(prices), min: Math.min(...prices), max: Math.max(...prices), prices };
};

export const BUCKETS = (['1', '5', '10'] as Bucket[]).map(bucketStats);

export const ONCE_OFF = SURVEY.filter((c) => !c.monthlyModel);
export const MONTHLY = SURVEY.filter((c) => c.monthlyModel);

const monthlyPrices = MONTHLY.flatMap((c) => c.packages.flatMap((p) => (p.monthly ? [p.monthly] : [])));
export const MONTHLY_STATS = { min: Math.min(...monthlyPrices), max: Math.max(...monthlyPrices), median: median(monthlyPrices) };

// Pay-monthly price for a site of about 5 / 10 pages
export const monthlyBucket = (bucket: Bucket) => {
  const prices = MONTHLY.flatMap((c) => c.packages.flatMap((p) => (p.bucket === bucket && p.monthly ? [p.monthly] : [])));
  return { min: Math.min(...prices), max: Math.max(...prices), count: prices.length };
};

export const FIXED_TERM = MONTHLY.filter((c) => c.packages.some((p) => (p.months ?? 0) > 0)).length;

const shops = SURVEY.flatMap((c) => (c.shopFrom ? [c.shopFrom] : []));
export const SHOP_STATS = { count: shops.length, min: Math.min(...shops), max: Math.max(...shops), median: median(shops) };

const count = (pick: (c: SurveyCompany) => boolean) => ONCE_OFF.filter(pick).length;

// What once-off companies include in year one, most common first
export const INCLUDES = [
  { label: 'Domain name', n: count((c) => c.includes.domain) },
  { label: 'A full year of hosting', n: count((c) => c.includes.hosting) },
  { label: 'Business email', n: count((c) => c.includes.email) },
  { label: 'Google Business Profile setup', n: count((c) => c.includes.googleBusiness) },
  { label: 'The wording written for you', n: count((c) => c.includes.wording) },
];

export const RENEWAL_SHOWN = count((c) => c.renewalShown);
const renewals = ONCE_OFF.filter((c) => c.renewalShown);
export const RENEWAL_RANGE = {
  min: Math.min(...renewals.map((c) => c.renewalLow ?? Infinity)),
  max: Math.max(...renewals.map((c) => c.renewalHigh ?? 0)),
};

export const TOTAL = SURVEY.length;
