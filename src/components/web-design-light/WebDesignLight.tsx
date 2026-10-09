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
import ClientReviews from './ClientReviews';
import WebDesignHero from './WebDesignHero';
import HowItWorks from './HowItWorks';
import PriceThreeWays from './PriceThreeWays';
import FreeDemoBand from './FreeDemoBand';
// Closing picture: three sites up front with more behind, from design/web-montage (rows layout, 8 Oct 2026)
import montage from '../../assets/images/portfolio/web-closing-montage.webp';
// Photos made for this page on 7 Oct 2026 in the homepage's photographic style; the people are teams
// on purpose, since the page is for any size of business.
import teamEnquiries from './img/team-new-enquiries.webp';

// Website design page in the light look (8 Oct 2026), replacing the dark /website-design Google Ads
// page. Built from the page flow in DESIGN-SYSTEM.md section 2 and the shared sections, with the copy
// and photos of the 7 Oct draft Jeremy liked: for established businesses and teams, headline "A website
// that turns Google searches into new customers" (changed on 8 Oct to "A new website for your business, live in
// 7 days": Jeremy did not want "about" or "working days"; the whole page now says 7 days), proof led by PETport, Paving Pros and Winelands Gas.
// Prices and terms are the live page's (confirmed by Jeremy on 1 Oct 2026).
// Ad page: no site menu, so ad visitors stay here. The site chat opens once per visit with the free demo.

// Same analytics event and labels as the old page (wd_ads_*, wd_site_*), so clicks can still be compared week on week
const trackClick = (prefix: string, label: string) =>
  window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `${prefix}_${label}`, value: 1 });

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
    q: 'Can I see a demo first?',
    a: 'Yes. Find your business on Google in our chat and we build a free demo from your listing and send it to you on WhatsApp.',
  },
  {
    q: 'How long does it take?',
    a: 'Most websites go live within 7 days once we have your details. Slow feedback or missing information can move that date.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'Very little. Send us your Google listing or Facebook page, check the demo we send you and tell us what to change. We write the wording and choose the photos; send us your logo and real photos of your work if you have them.',
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
  'Live in 7 days',
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
        {/* HERO: what, who, and the free demo as the one main action (version C, 8 Oct 2026) */}
        <WebDesignHero waUrl={WA_URL} track={track} />

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

        {/* HOW IT WORKS: "All we need is one link" (9 Oct 2026) */}
        <HowItWorks onStart={() => track('how_send_link')} />

        {/* FREE DEMO: a Google search box that opens the chat, with the ReachMax-style pointer (version C, 8 Oct 2026; after How it works,
            whose first step is the demo) */}
        <FreeDemoBand onOpen={() => track('demo_band')} />

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

      {/* The site chat; leads go to Airtable (8 Oct 2026). On the ad page it opens by itself once per visit after
          30 seconds, unless they have already tapped something that opens the chat or WhatsApp (9 Oct 2026) */}
      <SiteChat page={isAd ? 'website-design' : 'web-design'} autoOpen={isAd} delayMs={30000} trackPrefix={`${prefix}_demo_popup`} />
    </div>
  );
}
