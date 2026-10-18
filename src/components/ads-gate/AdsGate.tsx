import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { ASHLEY_WHATSAPP_NUMBER, ashleyWhatsAppLink } from '../../whatsapp';
import { adClick } from '../../adClick';
import { isTeamDevice } from '../../teamDevice';
import { capture } from '../../analytics';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import ClientReviews, { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import ExamplesChat, { OPEN_EXAMPLES_EVENT, SiteCard, openExamplesChat } from '../web-examples/ExamplesChat';
import { ExamplesClosing, ExamplesSteps } from '../web-examples/ExamplesSections';
import { SITES, groupById, type Group, type Site, type Sub } from '../web-examples/catalogue';
import teamEnquiries from '../web-design-light/img/team-new-enquiries.webp';
import logoLight from '../../assets/images/Compressed/Local Pros Studio logo transparent.png';
import { AD_WORDS_GLOBAL, NO_AD_WORDS, areaText, leadText, placeText, type AdWords } from './adWords';
import { AshleyBar, AshleyCard } from './AshleyWhatsApp';
import Compare from './Compare';
import { ALL, CATEGORIES, GATE_PATH, SUB_OUTCOMES, categoryById, categoryPath, type Category } from './categories';

const groupOf = (c: Category) => groupById(c.group) as Group;

// Every example design is a working website on the samples site (scripts/publish-sample-sites.py, 18 Oct 2026),
// labelled "Example design by Local Pros Studio. Not a real business." with a WhatsApp button to Ashley
const SAMPLES_URL = 'https://lps-samples.netlify.app';

// Full phone screenshots of the example designs (from design/web-montage/mock-sites/<slug>-mobile.png, WebP q76)
const PHONES = import.meta.glob('./img/phone/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
// Small copies of the card pictures (200 x 267) for the strip of four at the top: the full ones cost ~120 KB more
const THUMBS = import.meta.glob('./img/thumb/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

// Category-first Google Ads pages (Jeremy, 18 Oct 2026: "somebody needs to see a page that works for THEM").
// /go/websites is the general page with a pop-up over it, "What type of business do you run?", that can't be
// closed: they pick one to go on (Jeremy, 18 Oct 2026: "forces user to make a selection to continue", no skip).
// Each of the six broad categories has its own page at /go/websites-for/<id>: "Websites for trades and home
// services in Sandton", the price straight away, designs for that kind of business and one button into the chat.
// Watch the keywords' landing page rating in Google Ads: if it drops, add a small "Skip" link to the pop-up.
// Half the ad visitors are sent here from /go/website-design (netlify/edge-functions/ads-split.ts), the
// other half see that page as before, so the two can be compared (leads tagged "website-gate" in Airtable).
// The area and "Website design(ers)" come from the ad link (adWords.ts, netlify/edge-functions/ads-area.ts).

const track = (label: string) => window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `gate_${label}`, value: 1 });

// Filled in by the edge function before the page's code runs, so the first render matches the HTML it sent
const readAdWords = (): AdWords =>
  typeof window === 'undefined' ? NO_AD_WORDS : ((window as unknown as Record<string, AdWords | undefined>)[AD_WORDS_GLOBAL] ?? NO_AD_WORDS);

// A WhatsApp alert to the team (Jeremy, 18 Oct 2026): someone tapped "Chat to Ashley" (any WhatsApp button to her on
// these pages) or opened "Start my website", with what they picked. Once per visitor per action; any hour.
// netlify/functions/demo-lead.mts (kind "gate") sends it; team devices (?team=on) send nothing.
const alertTeam = (body: Record<string, string | undefined>) => {
  if (isTeamDevice()) return;
  const key = `lps_gate_alert_${body.action}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch {
    /* storage blocked: alert anyway */
  }
  fetch('/api/demo-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind: 'gate', ...body, adClick: adClick() }),
    keepalive: true,
  }).catch(() => {
    /* the WhatsApp chat itself still reaches Ashley */
  });
};

// The ad link's tags (loc, kw, gclid) carried from page to page, so a reload keeps the area. Empty while the
// pre-built page takes over, then filled, so the first render matches the HTML.
const useCarriedQuery = () => {
  const [query, setQuery] = useState('');
  useEffect(() => setQuery(window.location.search), []);
  return query;
};

function Rating() {
  return (
    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="wdl-rating gx-rating" onClick={() => track('google_reviews')}>
      <GoogleG />
      <span>
        <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wdl-rating-src">(Local Pros)</span>
      </span>
    </a>
  );
}

// ---------- The pop-up on /go/websites: the question first ----------

function Question({ words, query }: { words: AdWords; query: string }) {
  const area = !!words.area;
  // The page behind stays put while the pop-up is up. No focus on the first answer: its ring looked like a pick.
  useEffect(() => {
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = before;
    };
  }, []);

  return (
    <div className="gx-modal" role="dialog" aria-modal="true" aria-labelledby="gx-q">
      <div className="gx-sheet">
        <span className="gx-sheet-logo">
          <img src={logoLight} alt="Local Pros Studio" width={124} height={28} />
        </span>
        {/* Their search, confirmed first, then why to tap (Jeremy, 18 Oct 2026: "no indication why they're selecting a
            button"). The lead and area spans are filled in by the edge function, like the headline behind. */}
        <p className="gx-sheet-match">
          <Check size={16} aria-hidden="true" />
          <span>
            <strong>
              <span data-ad="lead">{leadText(words)}</span>
              <span data-ad="area">{areaText(words)}</span>
            </strong>{' '}
            · from R6,500 · live in 7 days
          </span>
        </p>
        <p className="gx-q" id="gx-q">
          What type of business do you run?
        </p>
        {/* Jeremy's wording, 18 Oct 2026 */}
        <p className="gx-q-sub">Select so we can direct you to the relevant page.</p>
        <nav className="gx-rows" aria-labelledby="gx-q">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to={`${categoryPath(c)}${query}`}
              className="gx-row"
              data-keep-query
              onClick={() => {
                track(`pick_${c.id}`);
                capture('ads_gate_pick', { category: c.id, area_known: area });
              }}
            >
              <span className="gx-row-text">
                <strong>{c.label}</strong>
                <span>{c.examples}</span>
              </span>
              <ChevronRight size={20} aria-hidden="true" className="gx-chev" />
            </Link>
          ))}
        </nav>
        <p className="gx-sheet-proof">
          <GoogleG size={14} />
          <span>
            <strong>4.7 stars</strong> from 1,400+ Google reviews · 500+ websites since 2015
          </span>
        </p>
      </div>
    </div>
  );
}

export default function AdsGate() {
  return <AdsPage gate />;
}

export function AdsCategory() {
  return <AdsPage />;
}

// ---------- /go/websites-for/<id>: their category's page ----------

const FAQ = [
  // No R290 a month here: Ashley covers hosting when she quotes (Jeremy, 18 Oct 2026)
  { q: 'What does the price include?', a: 'We write the wording, choose the photos, design and build the website, and set up a page for each of your services and the areas you work in.' },
  { q: 'How long does it take?', a: 'Most websites go live within 7 days once we have your details. Slow feedback or missing information can move that date.' },
  { q: 'How much of my time does it take?', a: 'Very little. Send us your Google listing or Facebook page, check the first version and tell us what to change. Send your logo and real photos of your work if you have them.' },
  { q: 'Who owns the website?', a: 'You do, once it is paid for.' },
];

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

// Every site for the category, the chosen type's sites first, client sites before example designs
// Example designs only, no client sites (Jeremy, 18 Oct 2026: simpler, and it scales). The chosen type's first.
const sitesOf = (c: Category, sub: Sub | null): Site[] => {
  const examples = (slugs: string[]) => [...new Set(slugs)].map((s) => SITES[s]).filter((s): s is Site => !!s && s.kind === 'example');
  // The general page and "Something else" show every design: those visitors could run any kind of business
  if (c.id === ALL.id || c.id === 'other') return examples(Object.keys(SITES)).filter((s) => c.id === 'other' || s.slug !== 'shop');
  const g = groupOf(c);
  return examples([...(sub?.sites ?? []), ...g.subs.flatMap((s) => s.sites), ...g.sites]);
};

// Five phones fanned out, the first site in the middle (the hero, and the closing section from the 6th site on)
function Montage({ sites, label, onClick, className = '' }: { sites: Site[]; label: string; onClick: () => void; className?: string }) {
  return (
    <a href="#examples" className={`gx-montage ${className}`} aria-label={label} onClick={onClick}>
      {[3, 1, 0, 2, 4]
        .map((i) => ({ i, site: sites[i] }))
        .filter((x) => x.site)
        .map(({ i, site }) => (
          <span key={site.slug} className={`gx-mphone gx-mphone-${i}`}>
            <img src={i === 0 ? site.img : (THUMBS[`./img/thumb/${site.slug}.webp`] ?? site.img)} alt="" width={i === 0 ? 585 : 200} height={i === 0 ? 780 : 267} loading={className ? 'lazy' : undefined} />
          </span>
        ))}
    </a>
  );
}

// gate: /go/websites, the general page under the pop-up; otherwise /go/websites-for/<id>
function AdsPage({ gate = false }: { gate?: boolean }) {
  const { id } = useParams();
  const category = gate ? ALL : categoryById(id);
  const words = readAdWords();
  const query = useCarriedQuery();
  const [sub, setSub] = useState<Sub | null>(null);
  const card = useRef<HTMLDivElement>(null);
  // The WhatsApp notification drops onto the phone once it's in view (straight away with reduced motion)
  const phone = useRef<HTMLSpanElement>(null);
  const [notified, setNotified] = useState(false);
  useEffect(() => {
    const el = phone.current;
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setNotified(true);
    const seen = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      window.setTimeout(() => setNotified(true), 400);
      seen.disconnect();
    }, { threshold: 0.5 });
    seen.observe(el);
    return () => seen.disconnect();
  }, [id]);
  // The team alerts (alertTeam above): every WhatsApp link to Ashley on the page, and every "Start my website"
  const picked = { category: gate ? undefined : category?.label, sub: sub?.label, area: words.area || undefined };
  const pickedRef = useRef(picked);
  pickedRef.current = picked;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.(`a[href*="wa.me/${ASHLEY_WHATSAPP_NUMBER}"]`);
      if (!link) return;
      const at = link.closest('[data-wa-from]')?.getAttribute('data-wa-from') || '';
      const from = at === 'ashley-card' ? 'card' : at === 'ashley-bar' ? 'bar' : at === 'ashley-design' ? 'design' : link.closest('header') ? 'header' : 'closing';
      const design = from === 'design' ? link.closest('.wx-item')?.querySelector('figcaption strong')?.textContent || undefined : undefined;
      alertTeam({ action: 'whatsapp', from, design, ...pickedRef.current });
    };
    const onOpen = (e: Event) => {
      if ((e as CustomEvent<{ start?: string }>).detail?.start) alertTeam({ action: 'start', ...pickedRef.current });
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener(OPEN_EXAMPLES_EVENT, onOpen);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener(OPEN_EXAMPLES_EVENT, onOpen);
    };
  }, []);
  if (!category) return <Navigate to={GATE_PATH} replace />;

  const group = groupOf(category);
  const subs = group.subs.filter((s) => !s.id.startsWith('other'));
  const sites = sitesOf(category, sub);
  // The first example design for their kind of business that has a full phone screenshot
  const showcase = sites.find((x) => x.kind === 'example' && PHONES[`./img/phone/${x.slug}.webp`]);
  const heading = sub ? `Websites for ${sub.plural}` : category.heading;
  // The result they pay for, sharper once they tap their type of business (categories.ts)
  const outcome = { ...category.outcome, ...(sub ? SUB_OUTCOMES[sub.id] : undefined) };
  // "trades and home services", "plumbers": who the designs are for
  const who = sub ? sub.plural : category.heading.replace(/^Websites for /, '');
  // "Start my website": the short chat (name, number, business), keeping the type of business they picked
  const start = (from: string) => openExamplesChat({ group: group.id, sub: sub?.id, from, start: 'website' });
  // Their first WhatsApp line to Ashley names what they picked, so she knows who she's talking to
  const waMessage = gate
    ? 'Hi Ashley, I’d like a quote for a website.'
    : `Hi Ashley, I’d like a quote for a website. My business: ${category.label}${sub ? ` (${sub.label.toLowerCase()})` : ''}.`;
  const onWhatsApp = (from: string) => () => {
    track(`ashley_${from}`);
    capture('ads_gate_whatsapp', { from, category: category.id, sub: sub?.id });
  };


  return (
    <div className={`dd dd-a wdl wx-page gx${gate ? '' : ' gx-has-bar'}`}>
      <SiteHeader minimal whatsAppUrl={ashleyWhatsAppLink(waMessage)} />
      <main>
        <section className="gx-hero" data-section="Category hero">
          {/* Phone: one column. Computer: words, types and Ashley on the left, the montage large on the right */}
          <div className="dd-container gx-hero-grid">
            <div className="gx-hero-top">
            {!gate && (
              <Link to={`${GATE_PATH}${query}`} className="gx-back" data-keep-query onClick={() => track(`change_${category.id}`)}>
                <ArrowLeft size={16} aria-hidden="true" /> Change type of business
              </Link>
            )}
            {/* Proof above the headline (Hormozi, Jeremy 18 Oct 2026) */}
            <Rating />
            <h1 className="gx-title gx-cat-title">
              {gate ? <span data-ad="lead">{leadText(words)}</span> : heading}
              <span data-ad="area">{areaText(words)}</span>
            </h1>
            <p className="gx-outcome">{category.outcome.line}</p>
            <p className="gx-price">
              {/* No "Then R290 a month" here: Ashley covers hosting when she quotes (Jeremy, 18 Oct 2026) */}
              <strong>{category.price}</strong> Live in 7 days.
            </p>
            {subs.length > 0 && (
              <div className="gx-types" role="group" aria-label="Your type of business">
                {subs.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`wx-filter${sub?.id === s.id ? ' is-on' : ''}`}
                    aria-pressed={sub?.id === s.id}
                    onClick={() => {
                      const next = sub?.id === s.id ? null : s;
                      setSub(next);
                      if (next) capture('ads_gate_type', { category: category.id, sub: next.id });
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            </div>
            {/* Their kind of business on the first screen, as a montage of phones fanned out (Jeremy, 18 Oct 2026: the
                strip of four repeated the shelf below). The closest design in the middle, swapping when they tap a type. */}
            <Montage sites={sites} label={`See popular designs for ${who}`} onClick={() => track('montage')} />
            {/* WhatsApp with Ashley is the next step (Jeremy, 18 Oct 2026); the chat stays for anyone who'd rather not */}
            <div className="gx-actions" ref={card}>
              <AshleyCard message={waMessage} onWhatsApp={onWhatsApp('card')} />
              <p className="gx-small">
                Ready to go?{' '}
                <button
                  type="button"
                  className="gx-link"
                  onClick={() => {
                    track(`hero_start_${category.id}`);
                    start('gate-hero');
                  }}
                >
                  Start your website here
                </button>{' '}
                with your name and number.
              </p>
            </div>
          </div>
        </section>

        <section className="dd-sec wx-shop gx-examples" id="examples" data-section="Examples for the category">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Popular designs</p>
              <h2 className="dd-h2">Popular designs for {who}</h2>
              <p className="dd-sub">
                {/* The towns in the designs are their area pages: say so, with their own area (Jeremy, 18 Oct 2026) */}
                <strong>500+ websites since 2015.</strong> Each design is written for its own area. Yours would say “in <span data-ad="place">{placeText(words)}</span>”.
              </p>
            </div>
            <div className="wx-shelf">
              {sites.map((s) => (
                <div key={s.slug} className="wx-item">
                  <SiteCard site={s} plain />
                  <div className="wx-item-meta">
                    {!s.picture && (
                    <a
                      href={`${SAMPLES_URL}/${s.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wx-item-visit"
                      onClick={() => {
                        track(`visit_${s.slug}`);
                        capture('ads_gate_site_opened', { site: s.slug, kind: s.kind, category: category.id });
                      }}
                    >
                      See the full website <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                    )}
                  </div>
                  <div className="wx-item-actions">
                    <a
                      href={ashleyWhatsAppLink(`Hi Ashley, I’d like a website like ${s.name} (one of your designs). My business: ${category.label}${sub ? ` (${sub.label.toLowerCase()})` : ''}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dd-btn dd-btn-primary wx-item-btn"
                      data-wa-from="ashley-design"
                      onClick={onWhatsApp(`design_${s.slug}`)}
                    >
                      Get one like this
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dd-sec dd-demo wdl-get" data-section="What every website has">
          <div className="dd-container wdl-split">
            {/* A design for their kind of business on a phone, instead of a stock photo (Jeremy, 18 Oct 2026) */}
            {showcase ? (
              <a
                href={`${SAMPLES_URL}/${showcase.slug}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="wdl-split-media gx-phone-wrap"
                onClick={() => {
                  track(`phone_${showcase.slug}`);
                  capture('ads_gate_site_opened', { site: showcase.slug, kind: 'example', category: category.id, from: 'phone' });
                }}
              >
                <span className="gx-phone" ref={phone}>
                  {/* The enquiry arriving: what the website is for (Jeremy, 18 Oct 2026: "sell the outcome") */}
                  <span className={`gx-notif${notified ? ' is-in' : ''}`}>
                    <span className="gx-notif-icon" aria-hidden="true">
                      <MessageCircle size={18} />
                    </span>
                    <span className="gx-notif-body">
                      <span className="gx-notif-top">
                        <strong>WhatsApp</strong>
                        <span>now</span>
                      </span>
                      <strong className="gx-notif-from">New customer</strong>
                      <span className="gx-notif-msg">{outcome.message}</span>
                    </span>
                  </span>
                  <img src={PHONES[`./img/phone/${showcase.slug}.webp`]} alt={`${showcase.name}, an example design for ${showcase.type.toLowerCase()}, on a phone`} width={585} height={1899} loading="lazy" />
                </span>
                <span className="gx-phone-cap">{showcase.name}</span>
                <span className="gx-phone-link">
                  See the full website <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div className="wdl-split-media">
                <img src={teamEnquiries} alt="A business owner and his receptionist smiling at new enquiries on the front-desk computer" width={1200} height={800} loading="lazy" />
              </div>
            )}
            <div className="gx-outcome-text">
              <div className="gx-outcome-head">
                <p className="dd-eyebrow">What your website does</p>
                <h2 className="dd-h2 wdl-split-title">{outcome.headline}</h2>
                <p className="gx-outcome-sub">Customers find you on Google, see your work and reviews, and WhatsApp you.</p>
              </div>
              <ol className="wdl-steps">
                {category.includes.map((o, i) => (
                  <li key={o.title}>
                    <span className="wdl-num">{i + 1}</span>
                    <div>
                      <h3 className="dd-h3">{o.title}</h3>
                      <p>{o.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Why choose us: the scorecard (Compare.tsx) */}
        <Compare />

        <ExamplesSteps
          track={track}
          title="From here to a new website"
          steps={[
            { title: 'Talk to Ashley', body: 'WhatsApp her your questions, or start here with your name and number.' },
            { title: 'Pick your design', body: 'Ashley confirms your price and sends you sample designs for your business.' },
            { title: 'Live in 7 days', body: 'We write the wording, build it and put it live.' },
          ]}
          button="Start my website"
          open={{ group: group.id, sub: sub?.id, start: 'website' }}
        />

        <ClientReviews onGoogle={() => track('reviews_google')} max={2} />

        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`gx-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <ExamplesClosing
          waUrl={ashleyWhatsAppLink(waMessage)}
          track={track}
          heading="Ready for your new website?"
          recap={['Written, designed and built for you', 'Live in 7 days', category.id === 'professional' ? 'R9,900 once-off' : 'From R6,500']}
          button="Start my website"
          open={{ group: group.id, sub: sub?.id, start: 'website' }}
          media={
            <div className="gx-closing-media">
              <Montage
                sites={sites.length >= 10 ? sites.slice(5) : sites}
                label={`See popular designs for ${who}`}
                onClick={() => track('closing_montage')}
                className="gx-montage-closing"
              />
            </div>
          }
        />
      </main>
      <SiteFooter minimal whatsAppUrl={ashleyWhatsAppLink(waMessage)} faqHref="#faq" />
      <ExamplesChat variant="website-price" page="website-gate" nudge={false} />
      {gate ? <Question words={words} query={query} /> : <AshleyBar message={waMessage} watch={card} onWhatsApp={onWhatsApp('bar')} />}
    </div>
  );
}
