import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import '../design-directions/directions.css';
import '../section-library/sections/pricing.css';
import './pricinglight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import ClosingCard from '../section-library/sections/ClosingCard';
import SiteChat from '../demo-popup/DemoPopup';
import BusinessSearchBox from '../demo-popup/BusinessSearchBox';
import { openSiteChat } from '../demo-popup/openSiteChat';
import closingPhoto from '../../assets/images/review-contractor-happy.webp';

// Pricing page draft (9 Oct 2026, Jeremy's request): every service and its price, made plain that the package is the
// point, for the homepage's reason: before they call, customers check your Google reviews, your Facebook and
// Instagram, and your website, and we look after all three. Three versions of a "why it's one package" section
// (a customer path, a comparison table, the prices added up) were tried the same day; Jeremy found them too much
// and asked for a simple page with the reason lower down, said conversationally (WhyNote).
// Live on /pricing since 9 Oct 2026. Prices checked against Pricing.tsx and the homepage FAQ.

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

const SINGLES = [
  {
    plan: 'reviews' as const,
    name: 'Google reviews',
    price: 'R1,200',
    unit: 'a month',
    line: 'A review request after every job, with a reminder if they forget.',
    terms: 'Month to month. 30-day money-back guarantee.',
  },
  {
    plan: 'social' as const,
    name: 'Social media posts',
    price: 'R2,000',
    unit: 'a month',
    line: 'Posts made and published for you on Facebook, Instagram and Google.',
    terms: 'Month to month.',
  },
  {
    plan: 'website' as const,
    name: 'Website',
    price: 'R9,900',
    unit: 'once-off',
    line: 'A new website, or yours refreshed.',
    terms: 'Plus R290 a month for hosting.',
  },
];

const FAQ = [
  {
    q: 'Why does it cost R2,500 a month?',
    a: 'You get two services for less than the price of both, plus a free website worth R9,900 on a 12-month commitment. We can charge R2,500 because most of the repetitive work is automated, using the same system that got Local Pros over 1,400 Google reviews.',
  },
  {
    q: 'Is there a contract?',
    a: 'Yes. The package is a 6-month commitment, or 12 months if you take the free website (after that the website is yours). The R5,000 setup fee is waived on the package. Reviews (R1,200) or posts (R2,000) on their own are month to month.',
  },
  {
    q: 'Can I take just one service?',
    a: 'Yes. Google reviews is R1,200 a month and social media posts R2,000 a month, both month to month. A website on its own is R9,900 once-off, plus R290 a month for hosting.',
  },
  {
    q: 'I already have a website. Can you refresh it?',
    a: 'Yes. If yours is outdated or hard to use on a phone, we build you a new one with your services, your areas and a tap-to-call button. It’s free on the 12-month package, or R9,900 once-off on its own.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'Very little. For reviews, you send us each customer’s name and number and our system does the rest. For posts, we make them for you; send us job photos on WhatsApp when you have them and we turn them into posts too.',
  },
];

const RECAP = [
  'More 5-star Google reviews',
  'Posts on Facebook and Instagram, done for you',
  'A new website, or yours refreshed',
  'All in one for R2,500 a month',
];

/* ---------- Why it's one package, said the way you'd say it to someone (Jeremy, 9 Oct: lower down, conversational) ---------- */

function WhyNote() {
  return (
    <section className="dd-sec pp-note" id="why">
      <div className="dd-container pp-note-in">
        <h2 className="dd-h2 pp-note-title">Why we look after all three</h2>
        <p>
          Think about the last time you needed someone you could trust, like a plumber or a vet. You probably Googled a
          few, read their reviews, looked at their Facebook page and opened their website.
        </p>
        <p>
          Your customers do the same with you. If one of those looks quiet or out of date, they move on to the next
          business.
        </p>
        <p className="pp-note-end">That’s why we do all three, for one monthly price.</p>
      </div>
    </section>
  );
}

/* ---------- Shared parts ---------- */

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dd-faq-item ${open ? 'is-open' : ''}`}>
      <h3 className="dd-faq-q">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{q}</span>
          <ChevronDown className="dd-faq-chev" size={22} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="dd-faq-a" hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
}

function PackageCard() {
  return (
    <section className="dd-sec pp-package-sec" id="package">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">The package</p>
          <h2 className="dd-h2">Reviews, posts and a website, looked after for you</h2>
        </div>
        <div className="pr-package pp-card">
          <p className="pr-badge">Best value</p>
          <p className="pr-price">
            <strong>R2,500</strong> <span>a month</span>
          </p>
          {PACKAGE_GROUPS.map((g) => (
            <div key={g.name} className="pp-group-block">
              <h3 className="pp-group-name">
                {g.name}
              </h3>
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
          <ul className="pr-ticks pp-setup">
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
      </div>
    </section>
  );
}

function Singles() {
  return (
    <section className="dd-sec pp-singles-sec" id="singles">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Only need one?</p>
          <h2 className="dd-h2 pp-singles-title">Each service on its own</h2>
          <p className="dd-sub">They work best together, but you can start with one.</p>
        </div>
        <div className="pp-singles">
          {SINGLES.map((s) => (
            <div key={s.name} className="pr-single">
              <h3 className="pr-single-name">{s.name}</h3>
              <p className="pr-single-price">
                <strong>{s.price}</strong> <span>{s.unit}</span>
              </p>
              <p className="pr-single-line">{s.line}</p>
              <p className="pr-terms">{s.terms}</p>
              <button type="button" className="pr-start" onClick={() => openSiteChat(s.plan)}>
                Start with {s.name.startsWith('Google') ? s.name : s.name.toLowerCase()}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingLight() {
  return (
    <div className="dd dd-a pp">
      <SiteHeader pricingHref="#package" />

      <main>
        {/* HERO: what (all three services), why (customers check all three), the price, one action */}
        <section className="pp-hero">
          <div className="dd-container">
            <h1 className="dd-kw pp-kw">Prices for Google reviews, social media posts and websites</h1>
            <p className="pp-title">
              {/* Jeremy picked this over "One package for everything your customers check." (9 Oct 2026) */}
              Google reviews, social media posts and a website. <span className="pp-u">One monthly price.</span>
            </p>
            <p className="pp-lede">
              Before they call, people look at your Google reviews, your Facebook and Instagram, and your website. We take
              care of all three for <strong>R2,500 a month</strong>.
            </p>
            <div className="pp-search">
              <BusinessSearchBox page="pricing" plan="package" buttonLabel="Find my business" />
              <p className="pp-or">
                Or{' '}
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>{' '}
                · <a href="#singles">Only need one service?</a>
              </p>
            </div>
          </div>
        </section>

        <PackageCard />

        <Singles />

        <WhyNote />

        <section className="dd-sec pp-faq" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">About the price</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`pp-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <ClosingCard
          title="Get all three looked after this month."
          items={RECAP}
          photo={closingPhoto}
          photoAlt="Contractor smiling at a new 5-star Google review on his phone"
          href={SITE_WHATSAPP_URL}
          onClick={(e) => {
            e.preventDefault();
            openSiteChat('package');
          }}
        />
      </main>

      <SiteFooter pricingHref="#package" faqHref="#faq" />
      <SiteChat page="pricing" />
    </div>
  );
}
