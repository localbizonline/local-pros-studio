import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
// The website design page's pictures (Jeremy, 11 Oct 2026: "more graphics and images like the main website page"):
// the montage of client sites and example designs, built from design/web-montage
import heroWide from '../../assets/images/portfolio/web-hero-wide.webp';
import heroPhone from '../../assets/images/portfolio/web-hero-phone.webp';
import closingMontage from '../../assets/images/portfolio/web-closing-montage.webp';

// Parts shared by the two website price pages Google Ads tests against each other (11 Oct 2026):
// /prices/website-design (our prices first) and /prices/website-design-cost-guide (market prices first, then ours).
// Prices and terms are the website design page's and the website terms page's (/website-faq); change them there too.

export const WAYS = [
  {
    key: 'buy',
    name: 'Pay once',
    price: 'R9,900',
    unit: 'once-off',
    terms: 'Plus R290 a month hosting. Yours from launch.',
  },
  {
    key: 'rent',
    name: 'Rent to own',
    price: 'R450',
    unit: 'a month',
    terms: 'Nothing upfront, hosting included. Yours after 36 months.',
  },
  {
    key: 'free',
    name: 'Free with our package',
    price: 'R0',
    unit: 'for the website',
    terms: 'With Google reviews and social posts, R2,500 a month for 12 months.',
  },
] as const;

export type Track = (label: string) => void;

// Same click event as the website design page, with the page's own prefix (wp_ or wcg_)
export const makeTrack =
  (prefix: string): Track =>
  (label) =>
    window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `${prefix}_${label}`, value: 1 });

export function FaqItem({ q, a, link, id }: { q: string; a: string; link?: boolean; id: string }) {
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
        <p>
          {a}
          {link && (
            <>
              {' '}
              The full terms are on our{' '}
              <Link to="/website-faq" className="wp-link">
                website terms page
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export function Rating({ track }: { track: Track }) {
  return (
    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="wp-rating" onClick={() => track('hero_google_reviews')}>
      <GoogleG />
      <span>
        <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wp-muted">(Local Pros)</span>
      </span>
    </a>
  );
}

// The two biggest worries on price searches, ownership and time, answered on the first screen
export function Facts() {
  return (
    <ul className="wp-facts">
      {['Live in 7 days', 'Domain in your business’s name', 'Hosting R290 a month from day one'].map((t) => (
        <li key={t}>
          <Check size={16} strokeWidth={2.5} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Buttons({ waUrl, track, from = 'hero' }: { waUrl: string; track: Track; from?: string }) {
  return (
    <div className="wp-actions">
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary" onClick={() => track(`${from}_whatsapp`)}>
        WhatsApp us for a quote
      </a>
      <button
        type="button"
        className="dd-btn dd-btn-secondary"
        onClick={() => {
          track(`${from}_demo`);
          openSiteChat();
        }}
      >
        Get a free demo first
      </button>
    </div>
  );
}

// The three ways to pay as a price list
export function PriceList() {
  return (
    <ul className="wp-list" aria-label="Three ways to pay">
      {WAYS.map((w) => (
        <li key={w.key} className={`wp-list-row${w.key === 'rent' ? ' is-pop' : ''}`}>
          <div className="wp-list-name">
            <strong>{w.name}</strong>
            <span>{w.terms}</span>
          </div>
          <p className="wp-list-price">
            {w.price}
            <small>{w.unit}</small>
          </p>
        </li>
      ))}
    </ul>
  );
}

const MONTAGE_ALT =
  'Websites we built on phones, each for a different business: paving, gas, pet transport, fencing, a vet clinic, attorneys, a driving school, plumbers and more';

export function Montage({ className = '' }: { className?: string }) {
  return (
    <figure className={`wdl-hero-media wp-hero-media ${className}`}>
      <picture>
        <source media="(max-width: 767px)" srcSet={heroPhone} />
        <img src={heroWide} alt={MONTAGE_ALT} width={1600} height={760} />
      </picture>
      <p className="wdl-badge">
        <strong>500+</strong> websites built since 2015
      </p>
    </figure>
  );
}

const CLOSING = ['R9,900 once-off, or R450 a month', 'Written, designed and built for you', 'Live in 7 days'];

// One next step, a quote on WhatsApp; the free demo for those not ready to talk. Same look as the website design
// page's closing card (dark card with the montage on the cream band)
export function PriceClosing({ waUrl, track }: { waUrl: string; track: Track }) {
  return (
    <section className="cc wdc py-16 md:py-24 px-6 bg-[#FBF6EC]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl bg-[#1C1917]">
        <div className="flex items-center bg-[#FCF6ED] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl overflow-hidden">
          <img src={closingMontage} alt="Websites we built for South African businesses, shown on phones" loading="lazy" width={1080} height={1000} className="w-full h-auto" />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="cc-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-6">
            Get a price for your website
          </h2>
          <ul className="flex flex-col gap-3 mb-8">
            {CLOSING.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.15rem)] text-[#FBF6EC] font-semibold">
                <span className="w-7 h-7 rounded-full bg-[#FBF6EC]/15 text-[#FBBF24] flex items-center justify-center shrink-0 text-[0.9rem]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary wp-close-btn" onClick={() => track('final_whatsapp')}>
            WhatsApp us for a quote
          </a>
          <p className="wp-close-or">
            Opens WhatsApp. A real person replies. Not ready to talk?{' '}
            <button
              type="button"
              className="wp-link"
              onClick={() => {
                track('final_demo');
                openSiteChat();
              }}
            >
              Get a free demo
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
