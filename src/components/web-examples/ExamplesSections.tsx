import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MousePointer2 } from 'lucide-react';
import { GROUPS, SITES, type Site } from './catalogue';
import { IndustryRows, SiteCard, openExamplesChat } from './ExamplesChat';
import { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import heroWide from '../../assets/images/portfolio/web-hero-wide.webp';
import heroPhone from '../../assets/images/portfolio/web-hero-phone.webp';
import montage from '../../assets/images/portfolio/web-closing-montage.webp';

// Sections of the "examples first" website page draft (12 Oct 2026): the hero asks their type of business
// straight away, the cards work like a shop window (Cosmo Pools' "customer favourites"), three short steps,
// and a closing card. Every button opens the examples chat (ExamplesChat.tsx).

const HERO_ALT =
  'Websites we built on phones, each for a different business: paving, gas, pet transport, fencing, a vet clinic, attorneys, a driving school, plumbers, an estate agent, a guest house, pool cleaning, dog grooming, tutoring, a panel beater and more';

// "What type of business do you run?" with the chat's own rows and a floating pointer (Jeremy, 12 Oct 2026):
// a hero section any page can use. Tapping a row opens the examples chat at that type of business; what the
// chat says next depends on the page's chat variant (ExamplesChat.tsx VARIANTS).
export function IndustryPicker({
  onPick,
  note = 'Tap yours',
  reason,
}: {
  onPick: (groupId: string) => void;
  note?: string;
  // One line under the question: why tap (each page says what it gives, e.g. "See your price and…")
  reason?: string;
}) {
  const rowsRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);
  const [still, setStill] = useState(false);

  // The pointer hops from row to row, resting on each for a moment, to show any one can be picked
  // (Jeremy, 12 Oct 2026). It stops once they reach for the rows, and doesn't move with reduced motion.
  useEffect(() => {
    const box = rowsRef.current;
    if (!box) return;
    const order = [0, 3, 1, 5, 2, 4, 6];
    let i = 0;
    const place = () => {
      const rows = box.querySelectorAll<HTMLElement>('.wx-row-btn');
      const row = rows[order[i % order.length]] ?? rows[0];
      if (row) setSpot({ x: row.offsetLeft + row.offsetWidth - 36, y: row.offsetTop + row.offsetHeight / 2 - 8 });
    };
    place();
    window.addEventListener('resize', place);
    const moving = !still && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = moving
      ? window.setInterval(() => {
          i++;
          place();
        }, 2200)
      : 0;
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('resize', place);
    };
  }, [still]);

  return (
    <div className="wx-pick">
      <p className="wx-pick-q">What type of business do you run?</p>
      {reason && <p className="wx-pick-reason">{reason}</p>}
      <div className="wx-pick-rows" ref={rowsRef} onPointerEnter={() => setStill(true)}>
        <IndustryRows onPick={(g) => onPick(g.id)} />
        {note && spot && (
          <span className="fd-guide wx-guide" aria-hidden="true" style={{ left: spot.x, top: spot.y }}>
            <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
            <span className="fd-guide-label">{note}</span>
          </span>
        )}
      </div>
    </div>
  );
}

// Where a site sits in the business types, so its card opens the chat at the right place
const placeOf = (slug: string) => {
  for (const g of GROUPS) {
    const s = g.subs.find((x) => x.sites[0] === slug) ?? g.subs.find((x) => x.sites.includes(slug));
    if (s) return { group: g.id, sub: s.id };
    if (g.sites.includes(slug)) return { group: g.id };
  }
  return {};
};

const FILTERS = [{ id: 'all', label: 'All' }, ...GROUPS.filter((g) => g.id !== 'other').map((g) => ({ id: g.id, label: g.label }))];

export function ExamplesShop({ track, price = 'R6,500' }: { track: (label: string) => void; price?: string }) {
  const [filter, setFilter] = useState('all');
  const group = GROUPS.find((g) => g.id === filter);
  const slugs = group ? [...new Set([...group.subs.flatMap((s) => s.sites), ...group.sites])] : Object.keys(SITES);
  const sites = slugs.map((s) => SITES[s]).filter(Boolean) as Site[];
  // Real client sites first in "All"
  if (!group) sites.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'client' ? -1 : 1));

  return (
    <section className="dd-sec wx-shop" id="examples" data-section="Websites like yours">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Popular designs</p>
          <h2 className="dd-h2">Find your industry</h2>
          <p className="dd-sub">
            <strong>500+ websites since 2015.</strong> Real client sites and example designs, each written for the business it’s for.
          </p>
        </div>
        <div className="wx-filters" role="group" aria-label="Type of business">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={`wx-filter${f.id === filter ? ' is-on' : ''}`} aria-pressed={f.id === filter} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="wx-shelf">
          {sites.map((s) => {
            const at = placeOf(s.slug);
            return (
              <div key={s.slug} className="wx-item">
                <SiteCard site={s} />
                <div className="wx-item-meta">
                  <p className="wx-item-price">{s.slug === 'shop' ? <>From <strong>R30,000</strong></> : <>From <strong>{price}</strong></>}</p>
                  {s.href && (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="wx-item-visit" onClick={() => track(`visit_${s.slug}`)}>
                      Visit site <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <div className="wx-item-actions">
                  <button
                    type="button"
                    className="dd-btn dd-btn-primary wx-item-btn"
                    onClick={() => {
                      track(`card_${s.slug}`);
                      openExamplesChat({ ...at, site: s.slug, from: 'card' });
                    }}
                  >
                    Get one like this
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: 'Pick your industry', body: 'Plumber, salon, accountant or anything else: tap the closest one.' },
  { title: 'Tell us where to WhatsApp you', body: 'Your name, your number and your business name. That’s all.' },
  { title: 'Get designs on WhatsApp', body: 'Tyran from our team sends 3 popular designs for your industry, with our prices. Go ahead, and most websites are live in 7 days.' },
];

type Step = { title: string; body: string };
export function ExamplesSteps({
  track,
  title = 'Get popular designs for your business in 3 steps',
  steps = STEPS,
  button = 'Show me popular designs',
}: {
  track: (label: string) => void;
  title?: string;
  steps?: Step[];
  button?: string;
}) {
  return (
    <section className="dd-sec wx-steps-sec" data-section="How it works">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">{title}</h2>
        </div>
        <ol className="wx-steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="wx-step-num">{i + 1}</span>
              <h3 className="dd-h3">{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="wx-center">
          <button
            type="button"
            className="dd-btn dd-btn-primary"
            onClick={() => {
              track('steps_start');
              openExamplesChat({ from: 'steps' });
            }}
          >
            {button}
          </button>
        </div>
      </div>
    </section>
  );
}

const RECAP = ['Written, designed and built for you', 'Live in 7 days', 'Websites from R6,500'];

// Same look as the shared closing card (section-library/sections/ClosingCard.tsx): dark card on the cream band
export function ExamplesClosing({
  waUrl,
  track,
  heading = 'See websites for your kind of business',
  recap = RECAP,
  button = 'Show me popular designs',
}: {
  waUrl: string;
  track: (label: string) => void;
  heading?: string;
  recap?: string[];
  button?: string;
}) {
  return (
    <section className="cc wdc py-16 md:py-24 px-6 bg-[#FBF6EC]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl bg-[#1C1917]">
        <div className="flex items-center bg-[#FCF6ED] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl overflow-hidden">
          <img src={montage} alt="Websites we built for South African businesses, shown on phones" loading="lazy" width={1080} height={1000} className="w-full h-auto" />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="cc-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-6">
            {heading}
          </h2>
          <ul className="flex flex-col gap-3 mb-8">
            {recap.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.15rem)] text-[#FBF6EC] font-semibold">
                <span className="w-7 h-7 rounded-full bg-[#FBF6EC]/15 text-[#FBBF24] flex items-center justify-center shrink-0 text-[0.9rem]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="dd-btn dd-btn-primary wx-closing-btn"
            onClick={() => {
              track('closing_examples');
              openExamplesChat({ from: 'closing' });
            }}
          >
            {button}
          </button>
          <p className="wdc-or">
            Or{' '}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('final_whatsapp')}>
              WhatsApp us
            </a>{' '}
            to talk it through. A real person replies.
          </p>
        </div>
      </div>
    </section>
  );
}

// The instant price hero (draft, 12 Oct 2026, Jeremy's call after comparing with cosmopools.co.za: proof, price
// and speed up front). The picker gives the reason to tap: their price and popular designs for their industry.
export function InstantHero({ waUrl, track }: { waUrl: string; track: (label: string) => void }) {
  return (
    <section className="dd-hero wdl-hero wx-hero">
      <div className="dd-container">
        <p className="wx-proof">
          <span aria-hidden="true">★</span> 500+ websites built since 2015
        </p>
        <h1 className="dd-display wdl-display wx-instant-title">
          Websites from R6,500. <span className="wdl-u">Instant price.</span> Live in 7 days.
        </h1>
        <p className="dd-lede">Tap your industry to see your price and 3 popular designs for businesses like yours.</p>
        <IndustryPicker
          onPick={(id) => {
            track(`hero_group_${id}`);
            openExamplesChat({ group: id, from: 'hero' });
          }}
        />
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="wdl-rating" onClick={() => track('hero_google_reviews')}>
          <GoogleG />
          <span>
            <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wdl-rating-src">(Local Pros)</span>
          </span>
        </a>
        <p className="wdh-or">
          Or{' '}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="wdl-inline-link" onClick={() => track('hero_whatsapp')}>
            WhatsApp us
          </a>{' '}
          to talk it through.
        </p>
        <figure className="wdl-hero-media">
          <picture>
            <source media="(max-width: 767px)" srcSet={heroPhone} />
            <img src={heroWide} alt={HERO_ALT} width={1600} height={760} />
          </picture>
        </figure>
      </div>
    </section>
  );
}

// What it costs, without a price table ("no grid", Jeremy): two ways to buy, each with a button that gets them
// started straight away (name and number, no samples: Jeremy, 12 Oct 2026). Anyone still comparing has the
// "Instant price" button in the menu bar, always in view
export function PriceBand({ track }: { track: (label: string) => void }) {
  return (
    <section className="dd-sec wx-priceband" id="pricing" data-section="What it costs">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">What it costs</p>
          <h2 className="dd-h2">Two ways to get your website</h2>
        </div>
        <div className="wx-priceband-grid">
          <div className="wx-priceband-card">
            <h3 className="dd-h3">Your own website</h3>
            <p className="wx-priceband-price">
              From <strong>R6,500</strong> once-off
            </p>
            <p>Written, designed and built for you, live in 7 days. Your price depends on your industry and how many services you offer.</p>
            <p className="wx-priceband-small">Optional hosting and management package available. Online shops from R30,000.</p>
            <button
              type="button"
              className="dd-btn dd-btn-primary"
              onClick={() => {
                track('price_start_website');
                openExamplesChat({ from: 'price', start: 'website' });
              }}
            >
              Start my website
            </button>
          </div>
          <div className="wx-priceband-card is-package">
            <p className="wx-priceband-tag">Website included</p>
            <h3 className="dd-h3">Website, social posts and Google reviews</h3>
            <p className="wx-priceband-price">
              <strong>R2,500</strong> a month
            </p>
            <p>Your website is included, with social media posts and Google review management, on a 12-month plan.</p>
            <button
              type="button"
              className="dd-btn dd-btn-secondary"
              onClick={() => {
                track('price_start_package');
                openExamplesChat({ from: 'price', start: 'package' });
              }}
            >
              Start the package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
