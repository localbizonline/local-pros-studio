import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, X } from 'lucide-react';
// Styles load with the site's main stylesheet (App.tsx), so the pre-built page doesn't flash
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import ClientReviews, { GoogleG, GOOGLE_REVIEWS_URL } from '../web-design-light/ClientReviews';
import ExamplesChat, { openExamplesChat } from '../web-examples/ExamplesChat';
import { ExamplesClosing } from '../web-examples/ExamplesSections';

// The R9,900 standard website in detail, /7-day-website (Jeremy, 15 Oct 2026): 4 to 8 pages, a modern clean design,
// a strict 7-day process (day 1 sample designs, days 2-3 we build, days 4-5 the client reviews, day 6 changes,
// day 7 live), wording written once, basic changes after launch free (Jeremy, 15 Oct 2026), design changes R850 an hour. Sold as focused
// work with a date for every step: we keep our dates, they keep theirs. Buttons open the short "start my website"
// chat (ExamplesChat, start "website"), so the lead is saved. Styles in sevenday.css, scoped to .sd.

const trackClick = (label: string) => window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `sd_${label}`, value: 1 });

const startWebsite = (from: string) => {
  trackClick(`start_${from}`);
  openExamplesChat({ from, start: 'website' });
};

type Who = 'you' | 'us';
const DAYS: { days: string; span: number; who: Who; title: string; body: string }[] = [
  { days: 'Day 1', span: 1, who: 'you', title: 'Pick your design', body: 'We send you 2 or 3 sample designs. You pick the one you like.' },
  { days: 'Days 2–3', span: 2, who: 'us', title: 'We design and build', body: 'We write the wording and build every page.' },
  { days: 'Days 4–5', span: 2, who: 'you', title: 'You review', body: 'Check every page. Send all your changes in one list.' },
  { days: 'Day 6', span: 1, who: 'us', title: 'We make your changes', body: 'Everything on your list, done in one go.' },
  { days: 'Day 7', span: 1, who: 'us', title: 'You’re live', body: 'Your new website goes live.' },
];

const WE_PROMISE = ['Your sample designs on day 1', 'Your full website to check by the end of day 3', 'Your changes made on day 6', 'Your website live on day 7'];
const YOU_PROMISE = [
  'Your logo, photos and business details before day 1',
  'Your design picked on day 1',
  'All your changes in one list by the end of day 5',
];

const USUAL = ['No launch date, or one that keeps moving', 'You chase your web designer for updates', 'Changes go back and forth for months'];
const OURS = ['Your launch date is set before we start', 'You know what happens every day', 'One focused round of changes, then you’re live'];

const INCLUDED = [
  '4 to 8 pages, for example Home, About, a page per service and Contact',
  'A modern, clean design: pick from 2 or 3 samples',
  'All the wording written for you',
  'Works on phones, with WhatsApp, call and quote buttons',
  'Set up for Google: page titles, descriptions and fast pages',
  'One round of changes on day 6',
];

const AFTER = [
  { title: 'Basic changes', price: 'Free', body: 'Swap a photo, change a colour, update your phone number or opening hours. WhatsApp us and it’s done.' },
  { title: 'New wording', price: 'Free, you send the words', body: 'We write your wording once, for launch. After that, send us the new words and we put them in.' },
  { title: 'Design changes', price: 'R850 an hour', body: 'A new layout, a new section or a redesigned page. We tell you how many hours before we start.' },
];

const FAQ = [
  {
    q: 'What if I’m late on my side?',
    a: 'Your launch moves by the same number of days. If your changes come in a day late, your website goes live a day later.',
  },
  {
    q: 'What do you need from me before day 1?',
    a: 'Your logo, photos of your work, your services and the areas you work in. No photos or logo yet? Send us your Google listing or Facebook page and we work from that.',
  },
  {
    q: 'Can I have more than one round of changes?',
    a: 'One round is included, on day 6, so put everything in one list on day 4 or 5. After launch, basic changes are free and design changes are R850 an hour.',
  },
  {
    q: 'What counts as a design change?',
    a: 'Anything that changes how a page is laid out: a new section, a new layout or a redesigned page. Swapping photos, colours or your contact details is a basic change, and free.',
  },
  {
    q: 'Who writes the wording?',
    a: 'We do, once, for launch. If you want the wording changed later, send us the new words and we put them in.',
  },
  {
    q: 'What if I need more than 8 pages?',
    a: 'We quote it before we start. Online shops are from R30,000.',
  },
  {
    q: 'Is hosting included?',
    a: 'An optional hosting and management package is available. Or get your website included in our R2,500 a month package with social media posts and Google review management (12-month plan).',
  },
  { q: 'Who owns the website?', a: 'You do, once it is paid for.', link: true },
];

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
              <Link to="/website-faq" className="wdl-inline-link">
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

// The week at a glance: one tile per step, as wide as the days it takes, our days dark and theirs amber
function Week() {
  return (
    <div className="sd-week" aria-label="The 7 days">
      <ol className="sd-week-row">
        {DAYS.map((d) => (
          <li key={d.days} className={`sd-day is-${d.who}`} style={{ gridColumn: `span ${d.span}` }}>
            <p className="sd-day-when">
              <span>{d.days}</span>
              <span className="sd-day-who">{d.who === 'us' ? 'Us' : 'You'}</span>
            </p>
            <h3 className="sd-day-title">{d.title}</h3>
            <p className="sd-day-body">{d.body}</p>
          </li>
        ))}
      </ol>
      <p className="sd-week-key">
        <span className="sd-key is-us" aria-hidden="true" /> Our days <span className="sd-key is-you" aria-hidden="true" /> Your days
      </p>
    </div>
  );
}

export default function SevenDayWebsite() {
  const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

  return (
    <div className="dd dd-a wdl wx-page sd">
      <SiteHeader whatsAppUrl={WA_URL} cta={{ label: 'Start my website', onClick: () => startWebsite('menu') }} />

      <main>
        <section className="dd-hero sd-hero">
          <div className="dd-container">
            <p className="wx-proof">
              <span aria-hidden="true">★</span> 500+ websites built since 2015
            </p>
            <h1 className="dd-display sd-display">
              A modern website for R9,900, <span className="wdl-u">live in 7 days</span>.
            </h1>
            <p className="dd-lede">
              4 to 8 pages, designed, written and built for you in one focused week. Every day has a job and a date, so there’s no waiting for weeks
              and no chasing us.
            </p>
            <div className="dd-actions">
              <button type="button" className="dd-btn dd-btn-primary" onClick={() => startWebsite('hero')}>
                Start my website
              </button>
              <a href="#included" className="dd-btn dd-btn-secondary" onClick={() => trackClick('hero_included')}>
                What’s included
              </a>
            </div>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="wdl-rating" onClick={() => trackClick('hero_google_reviews')}>
              <GoogleG />
              <span>
                <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wdl-rating-src">(Local Pros)</span>
              </span>
            </a>
            <Week />
          </div>
        </section>

        <section className="dd-sec dd-demo sd-deal">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Our promise, your promise</p>
              <h2 className="dd-h2">We keep our dates. You keep yours.</h2>
              <p className="dd-sub">A fixed week works when both sides stick to it. That’s how your website gets finished in 7 days.</p>
            </div>
            <div className="sd-deal-grid">
              <div className="sd-deal-card">
                <h3 className="dd-h3">We promise</h3>
                <ul>
                  {WE_PROMISE.map((t) => (
                    <li key={t}>
                      <Check size={20} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sd-deal-card is-you">
                <h3 className="dd-h3">You promise</h3>
                <ul>
                  {YOU_PROMISE.map((t) => (
                    <li key={t}>
                      <Check size={20} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="sd-deal-note">If your side runs late, your launch day moves by the same number of days.</p>
          </div>
        </section>

        <section className="dd-sec sd-why">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Why 7 days</p>
              <h2 className="dd-h2">No waiting for weeks. No chasing.</h2>
              <p className="dd-sub">Website projects drag on when nobody owns the date. We set the dates before we start, so your website gets focused work and gets finished.</p>
            </div>
            <div className="sd-compare">
              <div className="sd-compare-card is-usual">
                <h3 className="dd-h3">The usual way</h3>
                <ul>
                  {USUAL.map((t) => (
                    <li key={t}>
                      <X size={20} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sd-compare-card is-ours">
                <h3 className="dd-h3">Our 7 days</h3>
                <ul>
                  {OURS.map((t) => (
                    <li key={t}>
                      <Check size={20} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ClientReviews onGoogle={() => trackClick('reviews_google')} />

        <section className="dd-sec sd-price" id="included">
          <div className="dd-container sd-price-grid">
            <div className="sd-price-card">
              <p className="dd-eyebrow">What’s included</p>
              <h2 className="dd-h2">Everything in your new website</h2>
              <p className="sd-price-line">
                <strong>R9,900</strong> once-off, live in 7 days
              </p>
              <ul className="sd-included">
                {INCLUDED.map((t) => (
                  <li key={t}>
                    <Check size={20} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <button type="button" className="dd-btn dd-btn-primary" onClick={() => startWebsite('price')}>
                Start my website
              </button>
              <p className="sd-small">Optional hosting and management package available.</p>
            </div>
            <ul className="sd-aside">
              <li>
                <h3 className="dd-h3">A smaller website?</h3>
                <p>
                  From R6,500 for 1 to 3 services.{' '}
                  <Link to="/website-design-package" className="wdl-inline-link" onClick={() => trackClick('aside_instant_price')}>
                    Get your instant price
                  </Link>
                </p>
              </li>
              <li>
                <h3 className="dd-h3">More than 8 pages or a shop?</h3>
                <p>We quote it before we start. Online shops are from R30,000.</p>
              </li>
              <li>
                <h3 className="dd-h3">Rather pay monthly?</h3>
                <p>
                  Your website is included in our R2,500 a month package, with social media posts and Google review management (12-month plan).{' '}
                  <Link to="/pricing" className="wdl-inline-link" onClick={() => trackClick('aside_package')}>
                    See the package
                  </Link>
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section className="dd-sec sd-after">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">After day 7</p>
              <h2 className="dd-h2">Small changes are free. Design changes are R850 an hour.</h2>
            </div>
            <div className="sd-after-grid">
              {AFTER.map((a) => (
                <div key={a.title} className="sd-after-card">
                  <h3 className="dd-h3">{a.title}</h3>
                  <p className="sd-after-price">{a.price}</p>
                  <p>{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} link={f.link} id={`sd-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <ExamplesClosing
          waUrl={WA_URL}
          track={trackClick}
          heading="Your new website, live 7 days from now"
          recap={['4 to 8 pages, written and built for you', 'A date for every step', 'R9,900 once-off']}
          button="Start my website"
          start="website"
        />
      </main>

      <SiteFooter whatsAppUrl={WA_URL} faqHref="#faq" />
      <ExamplesChat variant="website-price" nudge={false} />
    </div>
  );
}
