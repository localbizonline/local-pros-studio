import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GROUPS, SITES, type Site } from './catalogue';
import { SiteCard, openExamplesChat } from './ExamplesChat';
import { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import heroWide from '../../assets/images/portfolio/web-hero-wide.webp';
import heroPhone from '../../assets/images/portfolio/web-hero-phone.webp';
import montage from '../../assets/images/portfolio/web-closing-montage.webp';

// Sections of the "examples first" website page draft (12 Oct 2026): the hero asks their type of business
// straight away, the cards work like a shop window (Cosmo Pools' "customer favourites"), three short steps,
// and a closing card. Every button opens the examples chat (ExamplesChat.tsx).

const HERO_ALT =
  'Websites we built on phones, each for a different business: paving, gas, pet transport, fencing, a vet clinic, attorneys, a driving school, plumbers, an estate agent, a guest house, pool cleaning, dog grooming, tutoring, a panel beater and more';

export function ExamplesHero({ waUrl, track }: { waUrl: string; track: (label: string) => void }) {
  return (
    <section className="dd-hero wdl-hero wx-hero">
      <div className="dd-container">
        <h1 className="dd-kw">Website design for South African businesses</h1>
        <p className="dd-display wdl-display">
          A new website for your business, <span className="wdl-u">live in 7 days</span>
        </p>
        <p className="dd-lede">Get sample websites for your industry on WhatsApp, with prices. Pick yours below.</p>
        <div className="wx-pick">
          <p className="wx-pick-q">What type of business do you run?</p>
          <div className="wx-pick-grid">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                className="wx-pick-btn"
                onClick={() => {
                  track(`hero_group_${g.id}`);
                  openExamplesChat({ group: g.id, from: 'hero' });
                }}
              >
                <strong>{g.label}</strong>
                <span>{g.hint}</span>
              </button>
            ))}
          </div>
        </div>
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
          to talk it through. R9,900 once-off, or R450 a month.
        </p>
        <figure className="wdl-hero-media">
          <picture>
            <source media="(max-width: 767px)" srcSet={heroPhone} />
            <img src={heroWide} alt={HERO_ALT} width={1600} height={760} />
          </picture>
          <p className="wdl-badge">
            <strong>500+</strong> websites built since 2015
          </p>
        </figure>
      </div>
    </section>
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

export function ExamplesShop({ track }: { track: (label: string) => void }) {
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
          <p className="dd-eyebrow">Sample websites</p>
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
                  <p className="wx-item-price">{s.slug === 'shop' ? 'Quoted for your shop' : <>From <strong>R9,900</strong></>}</p>
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
  { title: 'Get samples on WhatsApp', body: 'Tyran from our team sends sample websites for your industry, with our prices. Go ahead, and most websites are live in 7 days.' },
];

export function ExamplesSteps({ track }: { track: (label: string) => void }) {
  return (
    <section className="dd-sec wx-steps-sec" data-section="How it works">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">Get sample websites for your business in 3 steps</h2>
        </div>
        <ol className="wx-steps">
          {STEPS.map((s, i) => (
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
            Send me samples
          </button>
        </div>
      </div>
    </section>
  );
}

const RECAP = ['Written, designed and built for you', 'Live in 7 days', 'R9,900 once-off, or R450 a month'];

// Same look as the page's closing card (web-design-light/DemoClosing.tsx), with the examples button
export function ExamplesClosing({ waUrl, track }: { waUrl: string; track: (label: string) => void }) {
  return (
    <section className="cc wdc py-16 md:py-24 px-6 bg-[#FBF6EC]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl bg-[#1C1917]">
        <div className="flex items-center bg-[#FCF6ED] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl overflow-hidden">
          <img src={montage} alt="Websites we built for South African businesses, shown on phones" loading="lazy" width={1080} height={1000} className="w-full h-auto" />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="cc-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-6">
            See websites for your kind of business
          </h2>
          <ul className="flex flex-col gap-3 mb-8">
            {RECAP.map((t) => (
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
            Send me samples
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
