import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import '../design-directions/directions.css';
import './webdesignlight.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import FitCheck from '../section-library/sections/FitCheck';
import ClosingCard from '../section-library/sections/ClosingCard';
import SiteChat from '../demo-popup/DemoPopup';
import RecentWork from './RecentWork';
import ClientReviews, { GoogleG, GOOGLE_REVIEWS_URL } from './ClientReviews';
import PriceThreeWays from './PriceThreeWays';
import FreeDemoBand from './FreeDemoBand';
// Closing picture: three sites up front with more behind, from design/web-montage (rows layout, 8 Oct 2026)
import montage from '../../assets/images/portfolio/web-closing-montage.webp';
// Montage of client sites and example designs, built from design/web-montage (8 Oct 2026)
import heroWide from '../../assets/images/portfolio/web-hero-wide.webp';
import heroPhone from '../../assets/images/portfolio/web-hero-phone.webp';
// Photos made for this page on 7 Oct 2026 in the homepage's photographic style; the people are teams
// on purpose, since the page is for any size of business.
import teamEnquiries from './img/team-new-enquiries.webp';
import ownerCall from './img/owner-short-call.webp';

// Website design page in the light look (8 Oct 2026), replacing the dark /website-design Google Ads
// page. Built from the page flow in DESIGN-SYSTEM.md section 2 and the shared sections, with the copy
// and photos of the 7 Oct draft Jeremy liked: for established businesses and teams, headline "A website
// that turns Google searches into new customers" (changed on 8 Oct to "A new website for your business, live in
// about 7 days"), proof led by PETport, Paving Pros and Winelands Gas.
// Prices and terms are the live page's (confirmed by Jeremy on 1 Oct 2026).
// Ad page: no site menu, so ad visitors stay here. The site chat opens once per visit with the free demo.

const HERO_ALT =
  'Websites we built on phones, each for a different business: paving, gas, pet transport, fencing, a vet clinic, attorneys, a driving school, plumbers, an estate agent, a guest house, pool cleaning, dog grooming, tutoring, a panel beater and more';

// Same analytics event and labels as the old page (wd_ads_*, wd_site_*), so clicks can still be compared week on week
const trackClick = (prefix: string, label: string) =>
  window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `${prefix}_${label}`, value: 1 });

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

// What every website does, beside a photo instead of an icon grid
const OUTCOMES = [
  {
    title: 'Found on Google',
    body: 'A page for each service and area you work in, with the titles and wording Google reads.',
  },
  {
    title: 'Trusted at first glance',
    body: 'Your real work, your team and your Google reviews up front, so you look like the safe choice.',
  },
  {
    title: 'Easy to get in touch',
    body: 'WhatsApp, call and quote buttons on every page, easy to tap on a phone.',
  },
];

const STEPS = [
  {
    title: 'See a free demo first',
    body: 'Find your business on Google in our chat. We build a demo from your listing and send it to you on WhatsApp.',
  },
  {
    title: 'A 15-minute chat',
    body: 'On WhatsApp, a call or a video call: your services, your areas and what makes you different.',
  },
  {
    title: 'We write and build it',
    body: 'The pages, the wording and the photos. You get two days to check it and ask for changes.',
  },
  {
    title: 'Live in 5 to 7 working days',
    body: 'Then we look after hosting, security, backups and an hour of changes every month.',
  },
];

const GOOD_FIT = [
  'Your website looks dated, breaks on a phone or brings in no enquiries',
  'You have no website yet',
  'You offer several services or work in several areas',
  'You want the writing and building done for you',
];

const NOT_A_FIT = [
  'You need an online shop with a product catalogue and checkout',
  'You want to design every page yourself',
  'You need a website live tomorrow',
];

const FAQ = [
  {
    q: 'How is this different from a cheap website or doing it myself?',
    a: 'We write the wording, choose the photos and set up a page for each of your services and areas, then look after it once it is live. A R199 a month template usually leaves the writing to you and often gets rebuilt within a year, doing it yourself costs your evenings, and a big agency charges far more and takes weeks.',
  },
  {
    q: 'How much does a website cost?',
    a: 'R9,900 once-off, plus R290 a month for hosting and support. Or rent to own at R450 a month for 24 months, after which it is yours and hosting drops to R290 a month. It is free with our R2,500 a month package on a 12-month commitment.',
  },
  {
    q: 'Can I see it before I pay?',
    a: 'Yes. Find your business on Google in our chat and we build a free demo from your listing and send it to you on WhatsApp. You only pay if you go ahead.',
  },
  {
    q: 'How long does it take?',
    a: 'Most websites go live in 5 to 7 working days once we have your details. Slow feedback or missing information can move that date.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'About 15 minutes for the first chat, then a quick check before launch. We write the wording and choose the photos; send us your logo and real photos of your work if you have them.',
  },
  {
    q: 'I already have a website. Can you redo it?',
    a: 'Yes. A lot of our work is rebuilding older websites that look dated, break on phones or never bring in enquiries. We keep what works and fix what does not.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'It is built with what Google needs: fast pages, a page for each service and area, and proper titles. No honest provider can promise the top spot, and a new website can take 2 to 3 months to show.',
  },
  {
    q: 'Who owns the website?',
    a: 'You do: from day one if you pay once, after 24 months on rent to own, or after 12 months on the package.',
    link: true,
  },
  {
    q: 'What happens after launch?',
    a: 'We look after hosting, security, backups and support, plus 1 hour of changes every month. Bigger changes are quoted before we start.',
  },
  {
    q: 'Is it a custom design?',
    a: 'We start from layouts that work for local businesses, then make the branding, wording, photos and pages yours. That keeps the price fair and the turnaround fast.',
  },
];

const RECAP = [
  'Written, designed and built for you',
  'Up to 10 pages for your services and areas',
  'Live in 5 to 7 working days',
  'Hosting, support and an hour of changes a month',
  'R9,900 once-off, or R450 a month',
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

// variant 'ad': /website-design, the Google Ads landing page: no site menu, its own WhatsApp opening, and the
//   site chat opens by itself once per visit with the free demo offer.
// variant 'site': /web-design, the same page with the site menu and footer; the chat opens only from buttons.
export default function WebDesignLight({ variant = 'ad' }: { variant?: 'ad' | 'site' }) {
  const isAd = variant === 'ad';
  const WA_URL = whatsAppLink(isAd ? WHATSAPP_MESSAGES.googleAds : WHATSAPP_MESSAGES.webDesign);
  const prefix = isAd ? 'wd_ads' : 'wd_site';
  const track = (label: string) => trackClick(prefix, label);

  return (
    <div className="dd dd-a wdl">
      <SiteHeader minimal={isAd} whatsAppUrl={WA_URL} pricingHref="#pricing" />

      <main>
        {/* HERO: what, who, the problem, one main button. Price in the small print (DESIGN-SYSTEM.md section 2) */}
        <section className="dd-hero wdl-hero">
          <div className="dd-container">
            <h1 className="dd-kw">Website design for South African businesses</h1>
            <p className="dd-display wdl-display">
              A new website for your business, <span className="wdl-u">live in about 7 days</span>
            </p>
            <p className="dd-lede">
              We write, build and look after websites for South African businesses. Your customers look you up on their phone first,
              and a slow or dated website sends them to someone else.
            </p>
            <div className="dd-actions">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary" onClick={() => track('hero_whatsapp')}>
                <WhatsAppIcon />
                WhatsApp us
              </a>
              <a href="#pricing" className="dd-btn dd-btn-secondary" onClick={() => track('hero_costs')}>
                See what it costs
              </a>
            </div>
            <p className="dd-hero-note">R9,900 once-off, or R450 a month. A real person replies.</p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wdl-rating"
              onClick={() => track('hero_google_reviews')}
            >
              <GoogleG />
              <span>
                <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wdl-rating-src">(Local Pros)</span>
              </span>
            </a>
            {/* Websites we built for many kinds of business, so it feels like lots (Jeremy, 8 Oct 2026).
                Phones get their own picture with fewer, bigger phones. */}
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

        {/* PROOF, EARLY: recent work, one row per client site, then our Google reviews (both from the old page, 8 Oct 2026) */}
        <RecentWork onVisit={(d) => track(`work_${d}`)} />
        <ClientReviews onGoogle={() => track('reviews_google')} />

        {/* WHAT EVERY WEBSITE DOES: the dark band, a real-looking moment instead of an icon grid */}
        <section className="dd-sec dd-demo wdl-get">
          <div className="dd-container wdl-split">
            <div className="wdl-split-media">
              <img
                src={teamEnquiries}
                alt="A business owner and his receptionist smiling at new enquiries on the front-desk computer"
                width={1200}
                height={800}
                loading="lazy"
              />
            </div>
            <div>
              <p className="dd-eyebrow">What every website does</p>
              <h2 className="dd-h2 wdl-split-title">Built to turn a search into an enquiry</h2>
              <ol className="wdl-steps">
                {OUTCOMES.map((o, i) => (
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

        {/* HOW IT WORKS: how little the owner does, beside one photo */}
        <section className="dd-sec wdl-how" id="how-it-works">
          <div className="dd-container wdl-split is-flipped">
            <div>
              <p className="dd-eyebrow">How it works</p>
              <h2 className="dd-h2 wdl-split-title">Your part is one short chat</h2>
              <ol className="wdl-steps is-light">
                {STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="wdl-num">{i + 1}</span>
                    <div>
                      <h3 className="dd-h3">{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="wdl-split-media">
              <img
                src={ownerCall}
                alt="A business owner on a short video call at her desk, with her team working behind her"
                width={900}
                height={1125}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* FREE DEMO: a Google search box that opens the chat, with the ReachMax-style pointer (version C, 8 Oct 2026; after How it works,
            whose first step is the demo) */}
        <FreeDemoBand variant="c" onOpen={() => track('demo_band')} />

        {/* FIT: who it suits and who it does not, in the shared fit section */}
        <FitCheck
          title="Is a new website right for you?"
          sub="It suits businesses whose customers look them up before they call, book or buy."
          goodFit={GOOD_FIT}
          notAFit={NOT_A_FIT}
        />

        {/* PRICE: three ways to pay, from the old page (Jeremy liked it, 8 Oct 2026) */}
        <PriceThreeWays onStart={(k) => track(`price_${k}`)} />

        {/* FAQ: the objections, each answered in its first sentence */}
        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} link={f.link} id={`wdl-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING: the shared closing card, with the client sites montage */}
        <ClosingCard
          title="Get a website that brings in new customers."
          items={RECAP}
          photo={montage}
          photoAlt="Websites we built for South African businesses, shown on phones"
          photoFit="contain"
          photoSize={[1080, 1000]}
          href={WA_URL}
          onClick={() => track('final_whatsapp')}
        />
      </main>

      <SiteFooter minimal={isAd} whatsAppUrl={WA_URL} pricingHref="#pricing" faqHref="#faq" />

      {/* The site chat; leads go to Airtable (8 Oct 2026). On the ad page it opens once per visit with the free demo offer */}
      <SiteChat page={isAd ? 'website-design' : 'web-design'} autoOpen={isAd} trackPrefix={`${prefix}_demo_popup`} />
    </div>
  );
}
