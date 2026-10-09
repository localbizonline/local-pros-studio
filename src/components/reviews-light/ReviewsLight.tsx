import { useEffect, useState, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import '../design-directions/directions.css';
import '../section-library/sections/pricing.css';
import '../section-library/sections/proofblocks.css';
import './reviewslight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import HowItWorksPhone from '../section-library/sections/HowItWorksPhone';
import FitCheck from '../section-library/sections/FitCheck';
import ClosingCard from '../section-library/sections/ClosingCard';
import { ReviewsTop5 } from '../section-library/sections/ProofBlocks';
import { PROOF_NUMBERS } from '../section-library/sections/clientProof';
import SiteChat from '../demo-popup/DemoPopup';
import BusinessSearchBox from '../demo-popup/BusinessSearchBox';
import { openSiteChat } from '../demo-popup/openSiteChat';
// Photos made for this page on 9 Oct 2026 in the homepage's photographic style (FAL). The man in the navy polo
// follows Jeremy's brief from 7 Oct ("30's coloured south african decent looking"); the dog groomer shows the
// page is for any business people look up, not only trades.
import heroWide from './img/hero-wide.webp';
import heroPhone from './img/hero-phone.webp';
import closingPhoto from './img/closing-groomer.webp';
// Made for the 7 Oct reviews draft (/review-versions/4) with a made-up business, Mokoena Plumbing
import whyReviews from './img/why-now-reviews-on-phone.webp';
import whySummary from './img/why-now-ai-overview-on-phone.webp';
// Options for Jeremy to compare (9 Oct 2026, compare-reviews.html). Remove with PREVIEW once he has picked.
import groomerWide from './img/options/hero-groomer-wide.webp';
import groomerPhone from './img/options/hero-groomer-phone.webp';
import customerWide from './img/options/hero-customer-wide.webp';
import customerPhone from './img/options/hero-customer-phone.webp';
import closingOwner from './img/options/closing-owner.webp';

// The Google reviews page in the light look (draft, 9 Oct 2026), built from the 3 to 9 Oct sessions:
// - page flow and the five-second test from DESIGN-SYSTEM.md section 2 (one page sells one thing: Google reviews)
// - the hero of the homepage and the website page: literal headline, the Google business search box as the main
//   action (it saves the lead the moment a business is picked), WhatsApp and price as small links
// - proof early, from real SP2 data (clientProof.ts), never typed by hand
// - the animated WhatsApp-to-Google phone, which Jeremy kept for this page on 7 Oct
// - how the product really works (SP2, 3 Oct): the owner sends a name and number on WhatsApp or adds it in the
//   dashboard
// Open choices are logged in design/reviews-page/OPTIONS.md.

// The owner's part first, then ours. Jeremy's literal line from the promo video (8 Oct): "Send us your
// customer's name and number. We WhatsApp them your Google review link."
const STEPS = [
  {
    title: 'Send us a name and number',
    body: 'After each customer, WhatsApp us their name and number, or add them in your dashboard. It takes a minute.',
  },
  {
    title: 'We WhatsApp them your review link',
    body: 'Sent in your business name. If something went wrong, they can reply and you hear about it straight away.',
  },
  {
    title: 'They leave a Google review',
    body: 'One tap opens your Google profile, with a friendly reminder if they forget. You get an alert for every new review.',
  },
];

// What they get, said as benefits (Jeremy, 9 Oct: a sales page, not a system spec)
const INCLUDED = [
  'A Google review request on WhatsApp for every customer',
  'A friendly reminder if they forget',
  'An alert on WhatsApp for every new review',
  'We remind you if you forget to send names',
];

// The objections every FAQ answers (DESIGN-SYSTEM.md section 2), each answered in its first sentence
const FAQ = [
  {
    q: 'How is this different from asking customers myself?',
    a: 'Every customer you send us gets asked, not only the ones you remember. The request arrives on WhatsApp, which people open, with one tap to your Google profile and a reminder if they forget.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'About a minute per customer. Send us their name and number on WhatsApp, or add them in your dashboard, and we do the rest. If you go quiet, we remind you.',
  },
  {
    q: 'What if a customer is unhappy?',
    a: 'They can reply on the same WhatsApp and you get an alert straight away, so you can phone them and sort it out.',
  },
  {
    q: 'Can I trust you with my customers?',
    a: 'Yes. Your customers get a review request in your business name and a reminder, nothing else. We only ask your real customers for an honest review, which Google allows, and we never buy, write or swap reviews or sell their details.',
  },
  {
    q: 'What do I need to start?',
    a: 'A Google Business Profile and customers you can reach on WhatsApp. There is nothing to install: we find your business on Google and set it up for you.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. Google reviews is R1,200 a month, month to month. If no new 5-star reviews come in during your first 30 days, you get your money back.',
  },
];

const RECAP = [
  'A review request for every customer you send us',
  'A reminder if they forget',
  'An alert for every new review',
  'R1,200 a month, month to month',
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

// Draft-only preview settings, read from the address (?photo=b&headline=2&strip=1&close=chat), so every open choice
// can be seen side by side on compare-reviews.html. Without them the page shows my picks.
// close: the closing card's photo, so the same person never shows twice
const PHOTOS: Record<string, { wide: string; phone: string; alt: string; close?: { src: string; alt: string } }> = {
  a: {
    wide: heroWide,
    phone: heroPhone,
    alt: 'A business owner leaning on his bakkie after a job, smiling at a new 5-star Google review on his phone',
  },
  b: {
    wide: groomerWide,
    phone: groomerPhone,
    alt: 'A dog groomer smiling at a new 5-star Google review on her phone, with a freshly groomed spaniel beside her',
    close: {
      src: closingOwner,
      alt: 'A business owner leaning on his bakkie, smiling at a new 5-star Google review on his phone',
    },
  },
  c: {
    wide: customerWide,
    phone: customerPhone,
    alt: 'A customer on her couch tapping five stars for a Google review as the service van drives away',
  },
};

const HEADLINES: Record<string, ReactNode> = {
  '1': (
    <>
      Get 5-star <span className="rvl-u">Google reviews</span> from your customers.
    </>
  ),
  '2': (
    <>
      Get a <span className="rvl-u">Google review</span> from every customer.
    </>
  ),
  '3': (
    <>
      More 5-star <span className="rvl-u">Google reviews</span>, without the awkward ask.
    </>
  ),
};

const usePreview = () => {
  // Read after the first paint so the pre-built page and the browser agree on the first render
  const [q, setQ] = useState<URLSearchParams | null>(null);
  useEffect(() => setQ(new URLSearchParams(window.location.search)), []);
  const pick = (key: string, options: Record<string, unknown>, fallback: string) => {
    const v = q?.get(key) || '';
    return v in options ? v : fallback;
  };
  return {
    photo: PHOTOS[pick('photo', PHOTOS, 'a')],
    headline: HEADLINES[pick('headline', HEADLINES, '1')],
    // My picks are on by default (9 Oct 2026); ?strip=0 and ?close=wa show the versions without them
    strip: q?.get('strip') !== '0',
    closeChat: q?.get('close') !== 'wa',
  };
};

export default function ReviewsLight() {
  const n = PROOF_NUMBERS;
  const preview = usePreview();

  return (
    <div className="dd dd-a rvl">
      {/* Option: the offer in one line above everything (DESIGN-SYSTEM.md page flow, step 1) */}
      {preview.strip && (
        <p className="rvl-strip">
          {/* On a phone only the guarantee shows, so the strip stays one line */}
          <span className="rvl-strip-extra">
            R1,200 a month <span aria-hidden="true">·</span> Month to month <span aria-hidden="true">·</span>{' '}
          </span>
          <strong>Money back if no new 5-star reviews in 30 days</strong>
        </p>
      )}
      <SiteHeader pricingHref="#pricing" />

      <main>
        {/* HERO: what (Google reviews), who (people look you up), why (they read reviews before they call), and
            one action: find your business on Google, as on the homepage */}
        <section className="rvl-hero">
          <div className="dd-container">
            <h1 className="dd-kw rvl-kw">Google review collection on WhatsApp</h1>
            <p className="rvl-title">{preview.headline}</p>
            <p className="rvl-lede">
              People read your Google reviews before they call. Send us your customer’s name and number, and we WhatsApp
              them your review link.
            </p>
            <div className="rvl-search">
              <BusinessSearchBox
                page="reviews"
                plan="reviews"
                buttonLabel="Find my business"
                notOnGoogleLabel="Can’t find your business? Send us your details"
              />
              <p className="rvl-or">
                Or{' '}
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>{' '}
                · <a href="#pricing">See what it costs</a>
              </p>
            </div>
            <figure className="rvl-media" id="hero-photo">
              <picture>
                <source media="(max-width: 767px)" srcSet={preview.photo.phone} width={896} height={672} />
                <img src={preview.photo.wide} alt={preview.photo.alt} width={1584} height={672} />
              </picture>
              {/* Our own numbers, with the profile named (DESIGN-SYSTEM.md section 2, Proof) */}
              <figcaption className="rvl-badge">
                <span className="rvl-badge-stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>
                  <strong>4.7 from 1,491 Google reviews</strong>
                  <small>Our own Local Pros profile, same system</small>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* PROOF, EARLY: real results from SP2 before any explaining (Aeva lesson, 7 Oct) */}
        <section className="dd-sec rvl-proof" id="results">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Results</p>
              <h2 className="dd-h2">New Google reviews for our clients</h2>
            </div>
            <dl className="rvl-stats">
              <div>
                <dd>{n.reviewsReceived}</dd>
                <dt>new Google reviews for our clients while with us</dt>
              </div>
              <div>
                <dd>
                  {n.reviewsAverage}
                  <span aria-hidden="true">★</span>
                </dd>
                <dt>average rating of those reviews</dt>
              </div>
            </dl>
            <ReviewsTop5 />
          </div>
        </section>

        {/* WHY IT MATTERS: shown with two real-looking photos, then one line. Copy from Jeremy's 7 Oct rewrite */}
        <section className="dd-sec rvl-why">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Why it matters</p>
              <h2 className="dd-h2">Your reviews decide who gets the call</h2>
              <p className="dd-sub">
                People compare a few businesses on Google before they pick one.
              </p>
            </div>
            <div className="rvl-why-grid">
              <figure>
                <img
                  src={whyReviews}
                  alt="A phone showing recent 5-star reviews for a plumbing business, with on time, fair quote and tidy work highlighted"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <figcaption>
                  <span className="rvl-why-num">1</span>
                  <span>
                    <strong>Your customers leave reviews.</strong> They say what they liked, like “on time” or “fair
                    price”.
                  </span>
                </figcaption>
              </figure>
              <figure>
                <img
                  src={whySummary}
                  alt="A phone showing Google's AI Overview for plumber near me, recommending the same business for fast call-outs and tidy work"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <figcaption>
                  <span className="rvl-why-num">2</span>
                  <span>
                    <strong>Google uses them to recommend you.</strong> The next person who searches sees your name, with
                    the good things your customers said.
                  </span>
                </figcaption>
              </figure>
            </div>
            {/* Jeremy's line from the homepage reputation path and the promo video (8 Oct) */}
            <p className="rvl-why-close">
              They check your competitors the same way. <span>Make sure you’re the one they pick.</span>
            </p>
          </div>
        </section>

        {/* HOW IT WORKS: the dark band with the animated phone, reserved for this page (Jeremy, 7 Oct) */}
        <HowItWorksPhone
          id="how-it-works"
          title="You send a name. We get the review."
          sub="Your part takes a minute after each customer. Everything after that is ours."
          steps={STEPS}
          postsLine={false}
        />

        {/* WHO IT'S FOR: the shared fit section with its default lists */}
        <FitCheck />

        {/* PRICE: one card with everything included, and the package as the next step up */}
        <section className="dd-sec rvl-price" id="pricing">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">What it costs</p>
              <h2 className="dd-h2">One price, month to month</h2>
            </div>
            <div className="rvl-price-grid">
              <div className="pr-package rvl-card">
                <h3 className="pr-package-name">Google reviews</h3>
                <p className="pr-price">
                  <strong>R1,200</strong> <span>a month</span>
                </p>
                <ul className="pr-ticks">
                  {INCLUDED.map((t) => (
                    <li key={t}>
                      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <button type="button" className="dd-btn dd-btn-primary pr-btn" onClick={() => openSiteChat('reviews')}>
                  Start now
                </button>
                <p className="pr-terms">Month to month. 30-day money-back guarantee.</p>
              </div>
              <div className="rvl-upsell">
                <p className="pr-or">Want your social media done too?</p>
                <div className="pr-single">
                  <h3 className="pr-single-name">Reviews + social media posts</h3>
                  <p className="pr-single-price">
                    <strong>R2,500</strong> <span>a month</span>
                  </p>
                  <p className="pr-single-line">
                    We also make posts for you and publish them on Facebook, Instagram and Google. Add a new website, free,
                    on a 12-month commitment.
                  </p>
                  <p className="pr-terms">6-month commitment.</p>
                  <button type="button" className="pr-start" onClick={() => openSiteChat('package')}>
                    Start with the full package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="dd-sec rvl-faq" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`rvl-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING: the shared closing card */}
        <ClosingCard
          title="Start getting Google reviews this month."
          items={RECAP}
          photo={preview.photo.close?.src || closingPhoto}
          photoAlt={
            preview.photo.close?.alt ||
            'A dog groomer smiling at a new 5-star Google review on her phone, with a freshly groomed spaniel beside her'
          }
          href={SITE_WHATSAPP_URL}
          // Option: open the chat first, so the lead is saved before WhatsApp opens
          onClick={
            preview.closeChat
              ? (e) => {
                  e.preventDefault();
                  openSiteChat('reviews');
                }
              : undefined
          }
        />
      </main>

      <SiteFooter pricingHref="#pricing" faqHref="#faq" />

      {/* The site chat: the search box and "Start now" open it with Google reviews picked; it saves the lead to
          Airtable the moment a business is picked. It never opens by itself here. */}
      <SiteChat page="reviews" />
    </div>
  );
}
