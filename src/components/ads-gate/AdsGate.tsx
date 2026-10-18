import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-react';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { capture } from '../../analytics';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import ClientReviews, { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import ExamplesChat, { SiteCard, openExamplesChat } from '../web-examples/ExamplesChat';
import { ExamplesClosing, ExamplesSteps } from '../web-examples/ExamplesSections';
import { SITES, groupById, type Group, type Site, type Sub } from '../web-examples/catalogue';
import teamEnquiries from '../web-design-light/img/team-new-enquiries.webp';
import { AD_WORDS_GLOBAL, NO_AD_WORDS, areaText, leadText, type AdWords } from './adWords';
import { ALL, CATEGORIES, GATE_PATH, categoryById, categoryPath, type Category } from './categories';

const groupOf = (c: Category) => groupById(c.group) as Group;

// Category-first Google Ads pages (Jeremy, 18 Oct 2026: "somebody needs to see a page that works for THEM").
// /go/websites is the general page with a pop-up over it, "What type of business do you run?", that can't be
// closed: they pick one to go on (Jeremy, 18 Oct 2026: "forces user to make a selection to continue", no skip).
// Each of the six broad categories has its own page at /go/websites-for/<id>: "Websites for trades and home
// services in Sandton", the price straight away, designs for that kind of business and one button into the chat.
// Watch the keywords' landing page rating in Google Ads: if it drops, add a small "Skip" link to the pop-up.
// Half the ad visitors are sent here from /go/website-design (netlify/edge-functions/ads-split.ts), the
// other half see that page as before, so the two can be compared (leads tagged "website-gate" in Airtable).
// The area and "Website design(ers)" come from the ad link (adWords.ts, netlify/edge-functions/ads-area.ts).

const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);
const track = (label: string) => window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `gate_${label}`, value: 1 });

// Filled in by the edge function before the page's code runs, so the first render matches the HTML it sent
const readAdWords = (): AdWords =>
  typeof window === 'undefined' ? NO_AD_WORDS : ((window as unknown as Record<string, AdWords | undefined>)[AD_WORDS_GLOBAL] ?? NO_AD_WORDS);

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

function Question({ area, query }: { area: boolean; query: string }) {
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
        <p className="gx-q" id="gx-q">
          What type of business do you run?
        </p>
        <p className="gx-q-sub">We’ll show you designs and prices for businesses like yours.</p>
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
  { q: 'What does the price include?', a: 'We write the wording, choose the photos, design and build the website, and set up a page for each of your services. Hosting and updates are R290 a month after that, and basic changes (photos, colours, contact details) are included.' },
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
const sitesOf = (c: Category, sub: Sub | null): Site[] => {
  if (c.id === ALL.id) return Object.values(SITES).filter((s) => s.slug !== 'shop').sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'client' ? -1 : 1));
  const g = groupOf(c);
  const all = [...new Set([...(sub?.sites ?? []), ...g.subs.flatMap((s) => s.sites), ...g.sites])];
  const sites = all.map((s) => SITES[s]).filter(Boolean) as Site[];
  return sub ? sites : sites.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === 'client' ? -1 : 1));
};

// gate: /go/websites, the general page under the pop-up; otherwise /go/websites-for/<id>
function AdsPage({ gate = false }: { gate?: boolean }) {
  const { id } = useParams();
  const category = gate ? ALL : categoryById(id);
  const words = readAdWords();
  const query = useCarriedQuery();
  const [sub, setSub] = useState<Sub | null>(null);
  if (!category) return <Navigate to={GATE_PATH} replace />;

  const group = groupOf(category);
  const subs = group.subs.filter((s) => !s.id.startsWith('other'));
  const sites = sitesOf(category, sub);
  const heading = sub ? `Websites for ${sub.plural}` : category.heading;
  // "trades and home services", "plumbers": who the designs are for
  const who = sub ? sub.plural : category.heading.replace(/^Websites for /, '');
  const open = (from: string) => openExamplesChat({ group: group.id, sub: sub?.id, from });

  return (
    <div className="dd dd-a wdl wx-page gx">
      <SiteHeader minimal whatsAppUrl={WA_URL} />
      <main>
        <section className="gx-hero" data-section="Category hero">
          <div className="dd-container">
            {gate ? (
              <Rating />
            ) : (
              <Link to={`${GATE_PATH}${query}`} className="gx-back" data-keep-query onClick={() => track(`change_${category.id}`)}>
                <ArrowLeft size={16} aria-hidden="true" /> Change type of business
              </Link>
            )}
            <h1 className="gx-title gx-cat-title">
              {gate ? <span data-ad="lead">{leadText(words)}</span> : heading}
              <span data-ad="area">{areaText(words)}</span>
            </h1>
            <p className="gx-price">
              <strong>{category.price}</strong> Live in 7 days. Then R290 a month for hosting and updates.
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
            {/* Their kind of business on the first screen, before the button (Jeremy: "a page that works for THEM") */}
            <a href="#examples" className="gx-strip" aria-label={`See popular designs for ${who}`} onClick={() => track('strip')}>
              {sites.slice(0, 4).map((s) => (
                <img key={s.slug} src={s.img} alt="" width={585} height={780} />
              ))}
            </a>
            <div className="gx-actions">
              <button
                type="button"
                className="dd-btn dd-btn-primary gx-cta"
                onClick={() => {
                  track(`hero_${category.id}`);
                  open('gate-hero');
                }}
              >
                Get 3 designs on WhatsApp
              </button>
              <p className="gx-small">
                Ashley from our team WhatsApps you 3 popular designs for {who}. Or{' '}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wdl-inline-link" onClick={() => track('hero_whatsapp')}>
                  WhatsApp us
                </a>
                .
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
                <strong>500+ websites since 2015.</strong> Real client sites and example designs, each written for the business it’s for.
              </p>
            </div>
            <div className="wx-shelf">
              {sites.map((s) => (
                <div key={s.slug} className="wx-item">
                  <SiteCard site={s} />
                  <div className="wx-item-meta">
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
                        openExamplesChat({ group: group.id, sub: sub?.id, site: s.slug, from: 'gate-card' });
                      }}
                    >
                      Get one like this
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dd-sec dd-demo wdl-get" data-section="What every website has">
          <div className="dd-container wdl-split">
            <div className="wdl-split-media">
              <img src={teamEnquiries} alt="A business owner and his receptionist smiling at new enquiries on the front-desk computer" width={1200} height={800} loading="lazy" />
            </div>
            <div>
              <p className="dd-eyebrow">What every website has</p>
              <h2 className="dd-h2 wdl-split-title">Built to turn a search into an enquiry</h2>
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

        <ExamplesSteps
          track={track}
          title="From here to a new website"
          steps={[
            { title: 'Leave your WhatsApp number', body: 'A short chat: your type of business, how many services and your number.' },
            { title: 'Get 3 designs', body: 'Ashley WhatsApps you 3 popular designs for businesses like yours.' },
            { title: 'Live in 7 days', body: 'Pick one. We write the wording, build it and put it live.' },
          ]}
          button="Get 3 designs on WhatsApp"
          open={{ group: group.id, sub: sub?.id }}
        />

        <ClientReviews onGoogle={() => track('reviews_google')} />

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
          waUrl={WA_URL}
          track={track}
          heading="See designs for your business"
          recap={['Written, designed and built for you', 'Live in 7 days', category.id === 'professional' ? 'R9,900 once-off' : 'From R6,500']}
          button="Get 3 designs on WhatsApp"
          open={{ group: group.id, sub: sub?.id }}
        />
      </main>
      <SiteFooter minimal whatsAppUrl={WA_URL} faqHref="#faq" />
      <ExamplesChat variant="website-price" page="website-gate" nudge={false} />
      {gate && <Question area={!!words.area} query={query} />}
    </div>
  );
}
