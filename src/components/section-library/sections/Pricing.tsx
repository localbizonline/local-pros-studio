import { Check } from 'lucide-react';
import '../../design-directions/directions.css';
import './pricing.css';
import { openSiteChat, type ChatPlan } from '../../demo-popup/openSiteChat';

// The price section, shared by the homepage, /reviews, /social-new and /pricing (Jeremy, 9 Oct 2026: one bundle
// section, the same everywhere, so a change here changes every page). Not on the website design pages, which
// sell the website on its own (PriceThreeWays).
// It sells the package, for the homepage's reason: customers check your Google reviews, your Facebook and
// Instagram, and your website before they call. Heading and text beside the R2,500 card; each service on its own
// in small cards under the text. On a phone: text, card, then the single services.
// page: on /pricing the heading is the page's opening (keyword H1 and a big title); elsewhere it is a section
// heading. Prices checked against the live pages on 8 and 9 Oct 2026.
// "Start" buttons open the site chat with the plan picked; the page must render <SiteChat /> once.

const PACKAGE_GROUPS: { name: string; items: string[] }[] = [
  {
    name: 'Google reviews',
    items: [
      'A review request on WhatsApp to every customer',
      'A reminder if they forget',
      'Replies to your reviews, written for you',
    ],
  },
  {
    name: 'Social media posts',
    items: [
      'Posts made for you on Facebook, Instagram and Google',
      'Your job photos turned into posts',
      'Your best reviews posted on Facebook and Instagram',
    ],
  },
];

const SINGLES: { plan: ChatPlan; name: string; price: string; unit: string; terms: string }[] = [
  { plan: 'reviews', name: 'Google reviews', price: 'R1,200', unit: 'a month', terms: 'Month to month. 30-day money-back guarantee.' },
  { plan: 'social', name: 'Social media posts', price: 'R2,000', unit: 'a month', terms: 'Month to month.' },
  { plan: 'website', name: 'Website', price: 'R9,900', unit: 'once-off', terms: 'Plus R290 a month for hosting.' },
];

const TITLE = (
  <>
    Google reviews, social media posts and a website. <span className="pr-u">One monthly price.</span>
  </>
);
const LEDE =
  'Before they call, people look at your Google reviews, your Facebook and Instagram, and your website. We take care of all three.';

export default function Pricing({ page = false }: { page?: boolean }) {
  return (
    <section id="pricing" className={`dd dd-a dd-sec pr${page ? ' is-page' : ''}`}>
      <div className="dd-container pr-grid">
        <div className="pr-text">
          {page ? (
            <>
              <h1 className="dd-kw pr-kw">Prices for Google reviews, social media posts and websites</h1>
              <p className="pr-title">{TITLE}</p>
            </>
          ) : (
            <>
              <p className="dd-eyebrow">What it costs</p>
              <h2 className="pr-title">{TITLE}</h2>
            </>
          )}
          <p className="pr-lede">{LEDE}</p>
        </div>

        <div className="pr-package pr-card">
          <p className="pr-badge">Best value</p>
          <p className="pr-price">
            <strong>R2,500</strong> <span>a month</span>
          </p>
          {PACKAGE_GROUPS.map((g) => (
            <div key={g.name} className="pr-group">
              <h3 className="pr-group-name">{g.name}</h3>
              <ul className="pr-ticks">
                {g.items.map((t) => (
                  <li key={t}>
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pr-addon">
            <p className="pr-addon-tag">Free on 12 months</p>
            <p className="pr-addon-name">
              A new website, or yours refreshed <span>Worth R9,900</span>
            </p>
            <p className="pr-addon-line">Hosting included, and after 12 months it’s yours.</p>
          </div>
          <ul className="pr-ticks pr-setup">
            <li>
              <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              Free setup, normally R5,000
            </li>
          </ul>
          <button type="button" className="dd-btn dd-btn-primary pr-btn" onClick={() => openSiteChat('package')}>
            Start now
          </button>
          <p className="pr-terms">6-month commitment, or 12 months with the free website.</p>
        </div>

        <div className="pr-singles">
          <p className="pr-or">Only need one?</p>
          {SINGLES.map((s) => (
            <div key={s.name} className="pr-single">
              <h3 className="pr-single-name">{s.name}</h3>
              <p className="pr-single-price">
                <strong>{s.price}</strong> <span>{s.unit}</span>
              </p>
              <p className="pr-terms">{s.terms}</p>
              <button type="button" className="pr-start" onClick={() => openSiteChat(s.plan)}>
                {/* Google keeps its capital letter */}
                Start with {s.name.startsWith('Google') ? s.name : s.name.toLowerCase()}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
