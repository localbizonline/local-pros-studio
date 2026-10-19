import type { ReactNode } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import '../design-directions/directions.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import tyranPhoto from './tyran.jpg';
import { GoogleIcon, LeadsIcon, SocialIcon, WebsiteIcon } from './icons';

// Unlisted reference page for Local Pros lead partners (trades businesses who buy leads per lead) moving onto the
// R2,500 Local Pros Studio package (14 Oct 2026, Jeremy). The swipe-through walkthrough (/lead-partners/intro) and
// every follow-up WhatsApp link here; nothing else on the site does. Kept out of Google (noindex, nofollow) and the
// sitemap by seo.ts. Logo-only header and short footer, like the ad pages, so readers stay on the page.
// Cut to about a third on 19 Oct 2026 (Jeremy: "too long, too many words, simplify it"). The copy is word for word
// from the marketing repo's campaigns/2026-10-lead-buyer-transition/02-reference-page.md: change it there first.
// Styles in leadpartners.css.

const WHATSAPP_URL = whatsAppLink(WHATSAPP_MESSAGES.leadPartners);
const PHONE = '083 233 6716';

function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`dd-btn dd-btn-primary ${className}`}>
      WhatsApp Tyran
    </a>
  );
}

const SHORT_VERSION = [
  { label: 'Stays the same', text: 'Your leads, your contact at Local Pros, your WhatsApp number.' },
  { label: 'Changes', text: 'Leads are no longer charged separately. They’re included in one monthly service.' },
  {
    label: 'Price',
    text: 'R2,500 a month, the same as other businesses pay for the service alone, with your leads included. Setup is free (normally R5,000).',
  },
  { label: 'When', text: 'Tell us when you’re ready, and we’ll agree a start date together. Everyone moves over by March 2027.' },
];

const PACKAGE: { icon: ReactNode; title: string; text: string }[] = [
  { icon: <LeadsIcon />, title: 'Your leads.', text: 'They keep coming, as they do now.' },
  {
    icon: <GoogleIcon />,
    title: 'Google reviews.',
    text: 'After a job, send us your customer’s name and number. We WhatsApp them for a review, follow up, and reply to reviews for you.',
  },
  {
    icon: <SocialIcon />,
    title: 'Facebook and Instagram posts.',
    text: 'We create and publish your posts every week. Send us a photo of a recent job and we turn it into a post.',
  },
  {
    icon: <WebsiteIcon />,
    title: 'A new website, or yours refreshed.',
    text: 'Most business websites we see are out of date or hard to use on a phone. We refresh yours, or build you a new one.',
  },
];

// Exclusive to lead partners (Jeremy, 19 Oct 2026): other businesses pay the same R2,500 for the service alone.
// Free setup is for everyone on the package (see /pricing), so it shows in both columns: only the leads differ.
const COMPARE = [
  { label: 'Reviews on your Google profile', others: true },
  { label: 'Weekly Facebook and Instagram posts', others: true },
  { label: 'A new website, or yours refreshed', others: true },
  { label: 'Free setup (normally R5,000)', others: true },
  { label: 'Your Local Pros leads', others: false },
];

const MONEY = [
  'Free setup (normally R5,000).',
  'Month to month. 30 days’ notice to stop.',
  'With a website: a 6-month commitment. The site is yours after 12 months, or buy it for R6,500 any time.',
  'No 5-star reviews in 30 days? You get your money back.',
  'Billing starts once you’re set up and live. Paid by PayFast monthly; EFT by arrangement, in advance.',
];

// You confirm first, then we agree a date; we help you get going, with group calls (Jeremy, 19 Oct 2026)
const STEPS = [
  'You tell us you want to move over. A WhatsApp to Tyran is all it takes.',
  'We agree a start date with you.',
  'A 30-minute setup with you: we connect your Google profile and social pages, and check your website on a phone, the way your customers see it.',
  'We help you get started: we show you how it all works, and you can join our group calls to learn alongside other businesses.',
];

const FAQ = [
  {
    q: 'How many leads will I get?',
    a: 'The same way you get them now. We can’t promise a set number; it depends on how many customers come through Local Pros in your area.',
  },
  {
    q: 'What if I only want leads?',
    a: 'Leads on their own are available until March 2027. Until then, businesses on the full service get leads first.',
  },
  {
    q: 'Do I have to post anything myself?',
    a: 'You don’t post anything yourself: we create and publish the posts. But the best posts show your own work, and we can’t invent that. So send us a photo of a recent job, ideally once a week, on WhatsApp or with a quick form on your phone, and we turn it into a post.',
  },
  {
    q: 'I already have a website. Do I need a new one?',
    a: 'Maybe not a new one, but most websites we see could be bringing in far more work. Many are out of date, slow on a phone, and missing what turns a visitor into an enquiry: a page for each service you offer and each area you work in, your latest Google reviews, and a WhatsApp button so customers can message you in one tap. We check yours with you at setup, then refresh it with all of that, or build you a new one if that’s better.',
  },
  { q: 'What if I get a bad review?', a: 'We tell you straight away and help you reply.' },
  {
    q: 'What do you need from me?',
    a: 'To start: access to your Google profile and social pages (we’ll show you how), a few photos of your work, and your logo. After that: a photo of a recent job each week, and your customer’s name and number when you finish a job.',
  },
  {
    q: 'What if I want to stop?',
    a: 'Give us 30 days’ notice on WhatsApp. If we built your website, the 6 months need to be done first. Your reviews and pages stay yours.',
  },
  {
    q: 'Can other businesses get this deal?',
    a: 'No. Local Pros Studio with leads included is only for current Local Pros lead partners. Everyone else pays R2,500 a month for Local Pros Studio without leads.',
  },
  { q: 'Is Local Pros closing?', a: 'No. Local Pros Studio is our new service, run by the same people.' },
];

// Closed by default and opens on tap without any script (details/summary), so it works in the pre-built HTML too
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="dd-faq-item lp-faq-item">
      <summary className="lp-faq-q">
        <span>{q}</span>
        <ChevronDown className="dd-faq-chev" size={22} aria-hidden="true" />
      </summary>
      <div className="dd-faq-a">
        <p>{a}</p>
      </div>
    </details>
  );
}

export default function LeadPartners() {
  return (
    <div className="dd dd-a lp">
      <SiteHeader minimal whatsAppUrl={WHATSAPP_URL} />

      <main>
        <section className="lp-hero">
          <div className="dd-container lp-narrow">
            <p className="dd-kw">For Local Pros lead partners</p>
            {/* Opening (Jeremy, 19 Oct 2026): the name change in the headline, the gain right under it */}
            <h1 className="dd-display lp-title">
              Local Pros is becoming <span className="dd-hl lp-name">Local Pros Studio.</span>
            </h1>
            <p className="lp-subhead">You keep your leads and get more.</p>
            <p className="dd-lede">
              On top of your leads, we now collect reviews on your Google profile, post on your Facebook and Instagram
              every week, and refresh your website or build a new one. It’s one service, Local Pros Studio, for R2,500 a
              month with your leads included.
            </p>
            <p className="lp-deal">
              <span>R2,500 a month</span>
              <span>Leads included</span>
              <span>Free setup</span>
            </p>
            <div className="lp-cta">
              <WhatsAppButton />
              <p className="lp-who">
                <img src={tyranPhoto} alt="" width={40} height={40} />
                <span>
                  <strong>Tyran</strong> replies on WhatsApp
                  <br />
                  {PHONE}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Only for lead partners (Jeremy, 19 Oct 2026): the same R2,500 other businesses pay for the service alone,
            with the leads on top. Shown as a side-by-side so the extra is obvious at a glance. */}
        <section className="lp-offer" id="offer">
          <div className="dd-container lp-narrow">
            <p className="lp-offer-kicker">Only for Local Pros lead partners</p>
            <h2 className="dd-h2">Same price as everyone else. Your leads included.</h2>
            <p className="lp-offer-text">
              More than 50 businesses signed up for Local Pros Studio this year. They pay R2,500 a month for the service
              alone. You pay the same R2,500, and your Local Pros leads come with it. We’re not offering this to anyone
              else.
            </p>
            <table className="lp-compare">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="lp-sr">What’s included</span>
                  </th>
                  <th scope="col">Other businesses</th>
                  <th scope="col" className="is-you">
                    You
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label} className={row.others ? undefined : 'is-extra'}>
                    <th scope="row">{row.label}</th>
                    <td>
                      {row.others ? (
                        <Check size={22} aria-label="Included" />
                      ) : (
                        <X size={22} aria-label="Not included" className="lp-no" />
                      )}
                    </td>
                    <td className="is-you">
                      <Check size={22} aria-label="Included" />
                    </td>
                  </tr>
                ))}
                <tr className="lp-compare-price">
                  <th scope="row">Price</th>
                  <td>
                    R2,500<span className="lp-pm">a month</span>
                  </td>
                  <td className="is-you">
                    R2,500<span className="lp-pm">a month</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="dd-sec lp-grey" id="short-version">
          <div className="dd-container lp-narrow">
            <p className="dd-eyebrow">The short version</p>
            <dl className="lp-summary">
              {SHORT_VERSION.map((row) => (
                <div key={row.label} className="lp-summary-row">
                  <dt>{row.label}</dt>
                  <dd>{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="dd-sec" id="why">
          <div className="dd-container lp-narrow">
            <p className="dd-eyebrow">Why</p>
            <p className="lp-why">
              Google now recommends local businesses itself, so fewer people click through to sites like ours. To choose
              who to recommend, it looks at your reviews, your Facebook and Instagram, and your website. So that’s what
              we now do for you, alongside your leads.
            </p>
          </div>
        </section>

        <section className="dd-sec lp-cream" id="package">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">What you get</h2>
            <ol className="lp-steps lp-get">
              {PACKAGE.map((item) => (
                <li key={item.title}>
                  <span className="lp-ico">{item.icon}</span>
                  <p>
                    <strong>{item.title}</strong> {item.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="lp-closing-line">
              <strong>You do the jobs. We do the rest.</strong>
            </p>
          </div>
        </section>

        <section className="dd-sec" id="money">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">The money</h2>
            <div className="lp-price-card">
              <p className="lp-price-badge">Lead partner price</p>
              <p className="lp-price">
                R2,500 <span>a month</span>
              </p>
              <p className="lp-price-sub">Your Local Pros leads included. Only for Local Pros lead partners.</p>
              <ul className="lp-ticks">
                {MONEY.map((line) => (
                  <li key={line}>
                    <Check size={20} aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="dd-sec lp-grey" id="timeline">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">How the move works</h2>
            <ol className="lp-steps">
              {STEPS.map((step, i) => (
                <li key={step}>
                  <span className="lp-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <p className="lp-note">Your leads keep coming the whole way through.</p>
          </div>
        </section>

        <section className="dd-sec" id="faq">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">Questions</h2>
            <div className="dd-faq-list">
              {FAQ.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="lp-end" id="contact">
          <div className="dd-container lp-end-in">
            {/* The same photo as the swipe deck (marketing repo, swipe-page/tyran.jpg) */}
            <div className="lp-avatar">
              <img src={tyranPhoto} alt="Tyran" width={96} height={96} />
            </div>
            <h2 className="dd-h2">Any question, big or small.</h2>
            <p className="lp-end-text">WhatsApp me, or ask for a call.</p>
            <WhatsAppButton className="lp-end-btn" />
            <p className="lp-phone">{PHONE}</p>
          </div>
        </section>
      </main>

      <SiteFooter minimal whatsAppUrl={WHATSAPP_URL} />
    </div>
  );
}
