import { useEffect } from 'react';
import { Check } from 'lucide-react';
import '../design-directions/directions.css';
import './websiteprices.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { trackPriceIntent } from '../../analytics';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import SiteChat from '../demo-popup/DemoPopup';
import ClientReviews from '../web-design-light/ClientReviews';
import RecentWork from '../web-design-light/RecentWork';
import { Buttons, Facts, FaqItem, makeTrack, Montage, PriceClosing, PriceList, Rating } from './parts';

// Website design prices (11 Oct 2026): the landing page for the Google Ads price campaign. People searching
// "website design prices / cost / packages" landed on /website-design-package, which opens with the free demo,
// and left in seconds without scrolling to the prices. This page answers the price on the first phone screen,
// then what is included, what costs extra, how it compares and the questions price shoppers ask.
// Research behind it: docs/website-design-prices-research.md. Prices and terms are the live website design page's
// and the website terms page's (/website-faq); change them there too. Since 11 Oct 2026 Google Ads tests it against
// the cost guide (/prices/website-design-cost-guide); both use the parts in parts.tsx.
// The address must start with /pric: the Google Ads audience "Studio - Price page visitors (180d)" matches URLs
// containing studio.localpros.co.za/pric, so /website-design-prices would not count.

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

const FAQ: { q: string; a: string; link?: boolean }[] = [
  {
    q: 'How much does a website cost?',
    a: 'With us, R9,900 once-off, including the first 12 months of hosting and changes (worth R3,000), or R450 a month for 36 months with nothing upfront. It is free with our R2,500 a month Google reviews and social media package on a 12-month commitment.',
  },
  {
    q: 'How much is a 5-page website?',
    a: 'The same: R9,900 once-off, or R450 a month. The price covers up to 10 pages, so you get a page for each service and area without paying per page.',
  },
  {
    q: 'What happens after the first 12 months?',
    a: 'Hosting and changes carry on for a monthly fee, set out when you sign up. It keeps your domain renewed and the website online, safe and backed up, with 1 hour of changes a month.',
    link: true,
  },
  {
    q: 'Are there any other costs?',
    a: 'Only if you ask for more: over 10 pages, an online shop or bookings, or big changes beyond your monthly hour. We quote those first and only start once you say yes. Business email is with your own email provider.',
  },
  {
    q: 'Who owns the website and the domain?',
    a: 'The domain is always registered for your business. The website is yours from launch if you pay once, after your 36th payment on rent to own, or after 12 months on the package.',
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

const track = makeTrack('wp');

// The three ways to pay as a price list, straight under the headline; the montage under it
function HeroList({ waUrl }: { waUrl: string }) {
  return (
    <section className="dd-hero wp-hero">
      <div className="dd-container wp-hero-in">
        <h1 className="dd-kw">Website design prices in South Africa</h1>
        <p className="dd-display wp-display">
          What your website <span className="wp-u">will cost</span>
        </p>
        <p className="dd-lede wp-lede">Up to 10 pages, wording and photos done for you, live in 7 days.</p>
        <PriceList />
        <Buttons waUrl={waUrl} track={track} />
        <Facts />
        <Rating track={track} />
      </div>
      <div className="dd-container">
        {/* Under the prices, so the price list and buttons stay on the first phone screen */}
        <Montage />
      </div>
    </section>
  );
}

export default function WebsitePrices() {
  const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

  useEffect(() => trackPriceIntent('/prices/website-design'), []);

  return (
    <div className="dd dd-a wdl wp">
      <SiteHeader minimal whatsAppUrl={WA_URL} />

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

        {/* PROOF: the website design page's Recent work (six client sites on a computer and a phone) and our Google reviews */}
        <RecentWork onVisit={(d) => track(`work_${d}`)} />
        <ClientReviews onGoogle={() => track('reviews_google')} />

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

        <PriceClosing waUrl={WA_URL} track={track} />
      </main>

      <SiteFooter minimal whatsAppUrl={WA_URL} faqHref="#faq" />

      {/* The site chat (free demo); leads go to Airtable tagged "website design prices page" */}
      <SiteChat page="website-prices" trackPrefix="wp_demo_popup" />
    </div>
  );
}
