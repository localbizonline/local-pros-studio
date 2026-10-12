import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
// Styles load with the site's main stylesheet (App.tsx), so the pre-built page doesn't flash
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import FitCheck from '../section-library/sections/FitCheck';
import ClientReviews from '../web-design-light/ClientReviews';
import ExamplesChat, { openExamplesChat } from './ExamplesChat';
import { ExamplesClosing, ExamplesShop, ExamplesSteps, InstantHero, PriceBand } from './ExamplesSections';
import teamEnquiries from '../web-design-light/img/team-new-enquiries.webp';

// Draft of the website design page with the instant price (12 Oct 2026, /review-versions/instant-price), from
// Jeremy's comparison with cosmopools.co.za: proof, price and speed in the headline ("Websites from R6,500.
// Instant price. Live in 7 days."). The chat asks two quick questions and their number, then shows their price
// (R6,500, R9,900 or from R30,000); prices exclude hosting, an optional hosting and management package is
// mentioned, and the R2,500 a month package includes the website. No public price table. When Jeremy approves,
// this replaces WebDesignLight.tsx.

const trackClick = (label: string) => window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: `wd_price_${label}`, value: 1 });

const OUTCOMES = [
  { title: 'Found on Google', body: 'A page for each service and area you work in, with the titles and wording Google reads.' },
  { title: 'Trusted at first glance', body: 'Your real work, your team and your Google reviews up front, so you look like the safe choice.' },
  { title: 'Easy to get in touch', body: 'WhatsApp, call and quote buttons on every page, easy to tap on a phone.' },
];

const GOOD_FIT = [
  'Your website looks dated, breaks on a phone or brings in no enquiries',
  'You have no website yet',
  'You offer several services or work in several areas',
  'You want the writing and building done for you',
];

const NOT_A_FIT = ['You want to design every page yourself', 'You need a website live tomorrow'];

const FAQ = [
  {
    q: 'How much does a website cost?',
    a: 'From R6,500 once-off. Your price depends on your industry and how many services you offer: tap your industry at the top of this page and it shows in seconds. Online shops are from R30,000. An optional hosting and management package is available, or get your website included in our R2,500 a month package with social media posts and Google review management (12-month plan).',
  },
  {
    q: 'Can I see website designs for my industry first?',
    a: 'Yes. Tap your industry at the top of this page and we WhatsApp you 3 popular designs for your industry, with your price.',
  },
  {
    q: 'How is this different from a cheap website or doing it myself?',
    a: 'We write the wording, choose the photos and set up a page for each of your services and areas. A R199 a month template usually leaves the writing to you and often gets rebuilt within a year, doing it yourself costs your evenings, and a big agency charges far more and takes weeks.',
  },
  { q: 'How long does it take?', a: 'Most websites go live within 7 days once we have your details. Slow feedback or missing information can move that date.' },
  {
    q: 'How much of my time does it take?',
    a: 'Very little. Send us your Google listing or Facebook page, check the first version and tell us what to change. We write the wording and choose the photos; send us your logo and real photos of your work if you have them.',
  },
  {
    q: 'I already have a website. Can you redo it?',
    a: 'Yes. A lot of our work is rebuilding older websites that look dated, break on phones or never bring in enquiries. We keep what works and fix what does not.',
  },
  {
    q: 'Will my website show up on Google?',
    a: 'It is built with what Google needs: fast pages, a page for each service and area, and proper titles. No honest provider can promise the top spot, and a new website can take 2 to 3 months to show.',
  },
  { q: 'Who owns the website?', a: 'You do, once it is paid for. On the R2,500 a month package, it is yours after 12 months.', link: true },
  { q: 'What happens after launch?', a: 'With our optional hosting and management package, we look after hosting, security, backups and changes for you. Bigger changes are quoted before we start.' },
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

export default function WebsitePriceDraft() {
  const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

  return (
    <div className="dd dd-a wdl wx-page">
      {/* "Instant price" always in view, like Cosmo Pools' "Get Quote" (Jeremy, 12 Oct 2026) */}
      <SiteHeader whatsAppUrl={WA_URL} pricingHref="#pricing" cta={{ label: 'Instant price', onClick: () => openExamplesChat({ from: 'menu' }) }} />

      <main>
        <InstantHero waUrl={WA_URL} track={trackClick} />
        <ExamplesShop track={trackClick} price="R6,500" />
        <ExamplesSteps
          track={trackClick}
          title="Your price in 3 quick steps"
          steps={[
            { title: 'Tap your industry', body: 'Plumber, salon, accountant or anything else: tap the closest one.' },
            { title: 'Tell us how many services', body: 'And where to WhatsApp you. That’s all.' },
            { title: 'See your price', body: 'It shows straight away, and Tyran WhatsApps you 3 popular designs for your industry. Most websites are live in 7 days.' },
          ]}
          button="Get my instant price"
        />
        <ClientReviews onGoogle={() => trackClick('reviews_google')} />

        <section className="dd-sec dd-demo wdl-get">
          <div className="dd-container wdl-split">
            <div className="wdl-split-media">
              <img src={teamEnquiries} alt="A business owner and his receptionist smiling at new enquiries on the front-desk computer" width={1200} height={800} loading="lazy" />
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

        <PriceBand track={trackClick} />

        <FitCheck title="Is a new website right for you?" sub="It suits businesses whose customers look them up before they call, book or buy." goodFit={GOOD_FIT} notAFit={NOT_A_FIT} />

        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} link={f.link} id={`wx-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <ExamplesClosing
          waUrl={WA_URL}
          track={trackClick}
          heading="See your price in seconds"
          recap={['Written, designed and built for you', 'Live in 7 days', 'Websites from R6,500']}
          button="Get my instant price"
        />
      </main>

      <SiteFooter whatsAppUrl={WA_URL} pricingHref="#pricing" faqHref="#faq" />
      <ExamplesChat variant="website-price" />
    </div>
  );
}
