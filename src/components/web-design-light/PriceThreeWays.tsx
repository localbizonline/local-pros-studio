import { Check } from 'lucide-react';
import { openSiteChat, type ChatPlan } from '../demo-popup/openSiteChat';

// "Three ways to get your website" from the old dark /website-design page, which Jeremy liked (8 Oct 2026),
// in the light look. Terms confirmed by Jeremy on 1 Oct 2026; the free website comes with the R2,500
// package on a 12-month commitment. Buttons open the site chat with the plan, so leads reach Airtable.

const OPTIONS: {
  key: string;
  plan: ChatPlan;
  name: string;
  tag?: string;
  featured?: boolean;
  price: string;
  unit: string;
  terms: string;
  summary: string;
  points: string[];
  cta: string;
}[] = [
  {
    key: 'buy',
    plan: 'website',
    name: 'Pay once',
    price: 'R9,900',
    unit: 'once-off',
    terms: 'Plus R290 a month for hosting and support',
    summary: 'Pay once and the website is yours from day one.',
    points: ['Yours from launch', 'R290 a month covers your domain, hosting, security, backups and support', '1 hour of changes every month'],
    cta: 'Start with pay once',
  },
  {
    key: 'rent',
    plan: 'website',
    name: 'Rent to own',
    tag: 'Easiest start',
    featured: true,
    price: 'R450',
    unit: 'a month',
    terms: 'For 24 months, then it is yours',
    summary: 'No big amount upfront. Hosting and support are included while you pay it off.',
    points: ['Nothing to pay upfront for the build', 'Hosting, support and 1 hour of changes a month included', 'After 24 months it is yours and hosting is R290 a month'],
    cta: 'Start with rent to own',
  },
  {
    key: 'free',
    plan: 'package',
    name: 'Free with the package',
    tag: 'Best value',
    price: 'R0',
    unit: 'for the website',
    terms: 'With Google reviews and social media posts at R2,500 a month',
    summary: 'We build your website free when we also look after your Google reviews and social media.',
    points: [
      'Google review requests to your customers on WhatsApp',
      'Facebook, Instagram and Google posts made for you',
      '12-month commitment, then the website (worth R9,900) is yours',
    ],
    cta: 'Start with the package',
  },
];

const INCLUDED = [
  'Up to 10 pages for your services and areas',
  'The wording and photos, done for you',
  'Designed for phones first, then computers',
  'WhatsApp, call and quote buttons on every page',
  'Set up for Google: a page per service, titles and descriptions',
  'Your Google reviews and social links shown on the site',
  'Domain, hosting, security and backups',
  '1 hour of changes every month',
];

export default function PriceThreeWays({ onStart }: { onStart?: (key: string) => void }) {
  return (
    <section id="pricing" className="dd-sec wdl-price p3">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">What it costs</p>
          <h2 className="dd-h2">Three ways to get your website</h2>
          <p className="dd-sub">Same website, same care. Pick the way of paying that suits your business.</p>
        </div>
        <div className="p3-grid">
          {OPTIONS.map((o) => (
            <div key={o.key} className={`p3-card${o.featured ? ' is-featured' : ''}`}>
              {o.tag && <p className="p3-tag">{o.tag}</p>}
              <h3 className="p3-name">{o.name}</h3>
              <p className="p3-price">
                <strong>{o.price}</strong> <span>{o.unit}</span>
              </p>
              <p className="p3-terms">{o.terms}</p>
              <p className="p3-summary">{o.summary}</p>
              <ul className="p3-points">
                {o.points.map((p) => (
                  <li key={p}>
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`dd-btn ${o.featured ? 'dd-btn-primary' : 'dd-btn-secondary'} p3-btn`}
                onClick={() => {
                  onStart?.(o.key);
                  openSiteChat(o.plan);
                }}
              >
                {o.cta}
              </button>
            </div>
          ))}
        </div>
        <div className="p3-included">
          <div className="p3-included-head">
            <h3>Every option includes</h3>
            <p>Most websites are live in 5 to 7 working days</p>
          </div>
          <ul>
            {INCLUDED.map((t) => (
              <li key={t}>
                <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="wdl-price-more">
          <strong>Need more than 10 pages or online bookings?</strong> Tell us what you need and we will quote it.
        </p>
      </div>
    </section>
  );
}
