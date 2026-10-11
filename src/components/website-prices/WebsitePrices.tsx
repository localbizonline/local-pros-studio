import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ArrowUpRight } from 'lucide-react';
import '../design-directions/directions.css';
import './websiteprices.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { trackPriceIntent } from '../../analytics';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import SiteChat from '../demo-popup/DemoPopup';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import pavingMobile from '../../assets/images/portfolio/pavingpros-mobile.webp';
import petportMobile from '../../assets/images/portfolio/petport-mobile.webp';
import winelandsMobile from '../../assets/images/portfolio/winelandsgas-mobile.webp';
import bkcMobile from '../../assets/images/portfolio/bkcpet-mobile.webp';
import marambaMobile from '../../assets/images/portfolio/maramba-mobile.webp';
import jacuzziMobile from '../../assets/images/portfolio/jacuzzipros-mobile.webp';

// Website design prices (11 Oct 2026): the landing page for the Google Ads price campaign. People searching
// "website design prices / cost / packages" landed on /website-design-package, which opens with the free demo,
// and left in seconds without scrolling to the prices. This page answers the price on the first phone screen,
// then what is included, what costs extra, how it compares and the questions price shoppers ask.
// Research behind it: docs/website-design-prices-research.md. Prices and terms are the live website design page's
// and the website terms page's (/website-faq); change them there too.
// The address must start with /pric: the Google Ads audience "Studio - Price page visitors (180d)" matches URLs
// containing studio.localpros.co.za/pric, so /website-design-prices would not count.

const WAYS = [
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
    terms: 'Nothing upfront, hosting included. Yours after 24 months.',
  },
  {
    key: 'free',
    name: 'Free with our package',
    price: 'R0',
    unit: 'for the website',
    terms: 'With Google reviews and social posts, R2,500 a month for 12 months.',
  },
] as const;

const INCLUDED = [
  'Up to 10 pages for your services and areas',
  'The wording and photos, done for you',
  'Designed for phones first',
  'WhatsApp, call and quote buttons on every page',
  'Set up for Google: a page per service, titles and descriptions',
  'Your domain name (.co.za), hosting, SSL padlock and backups',
  '1 hour of changes every month',
  'A real person on WhatsApp when you need help',
];

const EXTRA = [
  { t: 'More than 10 pages', d: 'Quoted before we start.' },
  { t: 'An online shop or online bookings', d: 'Quoted before we start.' },
  { t: 'Changes beyond your monthly hour', d: 'A redesign or several new pages: quoted first, no surprise invoices.' },
  { t: 'Business email', d: 'Not part of hosting, on purpose. You use your own email provider; we help you set it up.' },
];

// The other ways people get a website. The template price is the range on South African web design price pages
// checked on 11 Oct 2026 (docs/website-design-prices-research.md), named as such under the table.
const COMPARE: { row: string; diy: string; cheap: string; us: string }[] = [
  { row: 'Typical price', diy: 'A monthly plan', cheap: 'R1,500 to R5,000 once-off', us: 'R9,900, or R450 a month' },
  { row: 'Who writes the wording', diy: 'You', cheap: 'Usually you', us: 'We do' },
  { row: 'Domain, hosting and security', diy: 'You set it up', cheap: 'Sometimes extra', us: 'Included' },
  { row: 'Changes after launch', diy: 'You do them', cheap: 'Often charged per change', us: '1 hour a month included' },
  { row: 'Who owns it', diy: 'Tied to the builder', cheap: 'Check the contract', us: 'You (see the options)' },
];

const SITES = [
  { name: 'Paving Pros', what: 'Paving, four cities', img: pavingMobile, href: 'https://www.pavingpros.co.za/' },
  { name: 'PETport', what: 'Pet transport', img: petportMobile, href: 'https://www.petport.co.za/' },
  { name: 'Winelands Gas', what: 'Gas installations', img: winelandsMobile, href: 'https://winelandsgas.co.za/' },
  { name: 'BKC Pet', what: 'Pet boarding, Benoni', img: bkcMobile, href: 'https://bkcpet.co.za/' },
  { name: 'Maramba', what: 'Fencing and gates', img: marambaMobile, href: 'https://maramba.co.za/' },
  { name: 'Jacuzzi Pros', what: 'Hot tubs', img: jacuzziMobile, href: 'https://jacuzzipros.co.za/' },
];

const FAQ: { q: string; a: string; link?: boolean }[] = [
  {
    q: 'How much does a website cost?',
    a: 'With us, R9,900 once-off plus R290 a month for hosting and support, or R450 a month for 24 months with nothing upfront. It is free with our R2,500 a month Google reviews and social media package on a 12-month commitment.',
  },
  {
    q: 'How much is a 5-page website?',
    a: 'The same: R9,900 once-off, or R450 a month. The price covers up to 10 pages, so you get a page for each service and area without paying per page.',
  },
  {
    q: 'Why is there a monthly fee if I pay once?',
    a: 'The R290 keeps the website online and safe: your domain renewed every year, hosting, the SSL padlock, security updates, backups and 1 hour of changes a month. Without it, a website quietly breaks or the domain lapses.',
  },
  {
    q: 'Are there any other costs?',
    a: 'Only if you ask for more: over 10 pages, an online shop or bookings, or big changes beyond your monthly hour. We quote those first and only start once you say yes. Business email is with your own email provider.',
  },
  {
    q: 'Who owns the website and the domain?',
    a: 'The domain is always registered for your business. The website is yours from launch if you pay once, after your 24th payment on rent to own, or after 12 months on the package.',
    link: true,
  },
  {
    q: 'Why not use Wix or a cheap template?',
    a: 'You can, and it costs less upfront. You then write every page, set up Google yourself and make every change, and many owners never get past the first page. We write, build and look after it for you.',
  },
  {
    q: 'How long does it take?',
    a: 'Most websites go live within 7 days once we have your details. Slow feedback or missing information can move that date.',
  },
  {
    q: 'Can I see a demo before I pay?',
    a: 'Yes. Find your business on Google in our chat and we build a free demo from your listing and send it to you on WhatsApp.',
  },
  {
    q: 'Will it show up on Google?',
    a: 'It is built with what Google needs: fast pages, a page for each service and area, and proper titles. No honest provider can promise the top spot, and a new website can take 2 to 3 months to show.',
  },
  {
    q: 'Can I add pages or a shop later?',
    a: 'Yes. Small changes fit in your monthly hour. More pages, online bookings or a shop are quoted first, and we only start once you say yes.',
  },
  {
    q: 'Can I make changes myself?',
    a: 'Yes, wording and photos, through your own login. Or WhatsApp us the change and we do it within your monthly hour.',
  },
  {
    q: 'What if I cancel?',
    a: 'Once the website is yours, we move your domain to you and help with the move. Rent to own and the package have fixed terms: cancelling early follows our cancellation policy.',
    link: true,
  },
];

const track = (label: string) =>
  window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `wp_${label}`, value: 1 });

function FaqItem({ q, a, link, id }: { q: string; a: string; link?: boolean; id: string }) {
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

function Rating() {
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
function Facts() {
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

function Buttons({ waUrl }: { waUrl: string }) {
  return (
    <div className="wp-actions">
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary" onClick={() => track('hero_whatsapp')}>
        WhatsApp us for a quote
      </a>
      <button
        type="button"
        className="dd-btn dd-btn-secondary"
        onClick={() => {
          track('hero_demo');
          openSiteChat();
        }}
      >
        Get a free demo first
      </button>
    </div>
  );
}

// The three ways to pay as a price list, straight under the headline
function HeroList({ waUrl }: { waUrl: string }) {
  return (
    <section className="dd-hero wp-hero">
      <div className="dd-container wp-hero-in">
        <h1 className="dd-kw">Website design prices in South Africa</h1>
        <p className="dd-display wp-display">
          What your website <span className="wp-u">will cost</span>
        </p>
        <p className="dd-lede wp-lede">Up to 10 pages, wording and photos done for you, live in 7 days.</p>
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
        <Buttons waUrl={waUrl} />
        <Facts />
        <Rating />
      </div>
    </section>
  );
}

export default function WebsitePrices() {
  const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

  useEffect(() => trackPriceIntent('/prices/website-design'), []);

  return (
    <div className="dd dd-a wp">
      <SiteHeader whatsAppUrl={WA_URL} pricingHref="#included" />

      <main>
        {/* HERO: the three ways to pay as a price list on the first phone screen (option A, picked by Jeremy on
            11 Oct 2026 over one big R9,900 headline and an itemised quote with tabs) */}
        <HeroList waUrl={WA_URL} />

        {/* WHAT'S IN THE PRICE, AND WHAT IS NOT: the worry behind most price searches */}
        <section className="dd-sec wp-inc" id="included">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">What you get</p>
              <h2 className="dd-h2">What’s in the price, and what costs extra</h2>
            </div>
            <div className="wp-inc-grid">
              <div className="wp-card">
                <h3 className="wp-card-title">Included</h3>
                <ul className="wp-ticks">
                  {INCLUDED.map((t) => (
                    <li key={t}>
                      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="wp-card wp-card-quiet">
                <h3 className="wp-card-title">Costs extra, only if you need it</h3>
                <ul className="wp-extras">
                  {EXTRA.map((e) => (
                    <li key={e.t}>
                      <strong>{e.t}</strong>
                      <span>{e.d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT COMPARES: honest, no other people's prices */}
        <section className="dd-sec wp-compare">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Compare</p>
              <h2 className="dd-h2">Why not a cheaper website?</h2>
              <p className="dd-sub">A website builder or a cheap template costs less upfront. Here is what you do yourself with each.</p>
            </div>
            <div className="wp-table" role="table" aria-label="Website builder, cheap template and Local Pros Studio compared">
              <div className="wp-tr wp-th" role="row">
                <span role="columnheader" className="wp-row-label" />
                <span role="columnheader">Website builder (Wix and similar)</span>
                <span role="columnheader">Cheap template site</span>
                <span role="columnheader" className="wp-us">Local Pros Studio</span>
              </div>
              {COMPARE.map((r) => (
                <div key={r.row} className="wp-tr" role="row">
                  <span role="rowheader" className="wp-row-label">
                    {r.row}
                  </span>
                  <span role="cell" data-col="Website builder">
                    {r.diy}
                  </span>
                  <span role="cell" data-col="Cheap template">
                    {r.cheap}
                  </span>
                  <span role="cell" data-col="Local Pros Studio" className="wp-us">
                    {r.us}
                  </span>
                </div>
              ))}
            </div>
            <p className="wp-compare-note">Template prices as shown on South African web design price pages, October 2026.</p>
          </div>
        </section>

        {/* PROOF: real client websites and our own Google rating */}
        <section className="dd-sec wp-proof">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Our work</p>
              <h2 className="dd-h2">500+ websites built since 2015</h2>
              <p className="dd-sub">A few recent ones for South African businesses. Tap one to see it live.</p>
            </div>
            <ul className="wp-sites">
              {SITES.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" onClick={() => track(`site_${s.name}`)}>
                    <img src={s.img} alt={`${s.name} website on a phone`} width={585} height={1266} loading="lazy" />
                    <strong>
                      {s.name} <ArrowUpRight size={15} aria-hidden="true" />
                    </strong>
                    <span>{s.what}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ: the questions price shoppers ask, each answered in its first sentence */}
        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">Website price questions</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} link={f.link} id={`wp-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING: one next step, a quote on WhatsApp; the free demo for those not ready to talk */}
        <section className="wp-close">
          <div className="dd-container">
            <div className="wp-close-card">
              <h2 className="dd-h2">Get a price for your website</h2>
              <p>Tell us about your business on WhatsApp and we’ll tell you exactly what it costs. A real person replies.</p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary wp-close-btn" onClick={() => track('final_whatsapp')}>
                WhatsApp us for a quote
              </a>
              <p className="wp-close-or">
                Not ready to talk?{' '}
                <button
                  type="button"
                  className="wp-link"
                  onClick={() => {
                    track('final_demo');
                    openSiteChat();
                  }}
                >
                  Get a free demo of your website
                </button>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter whatsAppUrl={WA_URL} pricingHref="#included" faqHref="#faq" />

      {/* The site chat (free demo); leads go to Airtable tagged "website design prices page" */}
      <SiteChat page="website-prices" trackPrefix="wp_demo_popup" />
    </div>
  );
}
