import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import ServiceRows from '../section-library/sections/ServiceRows';
import ClosingCard from '../section-library/sections/ClosingCard';
import { NumbersStrip } from '../section-library/sections/ProofBlocks';
// A real photo of the team at work near Cape Town (from the old About page), not a generated one
import teamPhoto from './img/team-cape-town.webp';
import closingPhoto from '../../assets/images/review-contractor-happy.webp';

// About page in the light look (9 Oct 2026, Jeremy: "rebuild about"). Its job is trust: who we are, that we're
// real people in Cape Town, what we do, how we work. Facts only from the live site: websites since 2015, our own
// Google profile, the shared numbers strip. The old page's "100K+ leads" and "4.9 HelloPeter" had no source on the
// page, so they're gone. Jeremy's note is his own mission statement, word for word (local-pros-studio skill).

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

// Jeremy's mission statement in his own words, split into paragraphs only
const NOTE = [
  'At Local Pros Studio, I help business owners get found online. Their online presence has become the lifeblood of their business in order to find new customers who have never heard about them, don’t know who they are, and don’t know what they do.',
  'What you want to be doing as a business owner online is to make sure that you appear as many times as possible when someone does their homework on your business, and you want to be comfortable about what they find. Things like good reviews, regular posts of jobs you’ve completed, and satisfied customers all make a big difference in terms of people making a decision to use your services or not.',
  'At the end of the day, you want to make it easy for your customer or potential customer to use your services. You also want to make it easy for the AI models to find your business and recommend your business based on consistency, good feedback, and having a good and strong reputation.',
];

const HOW_WE_WORK = [
  {
    title: 'Done for you',
    body: 'We do the work. You send us your customers’ names and your job photos on WhatsApp, and we take it from there.',
  },
  {
    title: 'A real person on WhatsApp',
    body: 'You talk to our team in Cape Town on WhatsApp, the same way your customers talk to you.',
  },
  {
    title: 'No long contracts on single services',
    body: 'Google reviews and social media posts are month to month. The package of both is a 6-month commitment.',
  },
];

// The homepage's four points, so the close says the same thing everywhere
const RECAP = [
  'More 5-star Google reviews',
  'Posts on Facebook and Instagram, done for you',
  'A new website, or yours refreshed',
  'All in one for R2,500 a month',
];

export default function AboutLight() {
  return (
    <div className="dd dd-a abl">
      <SiteHeader />

      <main>
        {/* HERO: who we are in one line, where we are, since when; the real team photo */}
        <section className="abl-hero">
          <div className="dd-container">
            <h1 className="dd-kw abl-kw">About Local Pros Studio</h1>
            <p className="abl-title">
              We help South African businesses <span className="abl-u">get found online.</span>
            </p>
            <p className="abl-lede">
              Google reviews, social media posts and websites, done for you by a small team in Cape Town. We’ve been
              building websites for local businesses since 2015.
            </p>
            <div className="dd-actions abl-actions">
              <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary">
                <WhatsAppIcon />
                WhatsApp us
              </a>
              <a href="#what-we-do" className="dd-btn dd-btn-secondary">
                See what we do
              </a>
            </div>
            <figure className="abl-media">
              <img
                src={teamPhoto}
                alt="Three of the Local Pros team working on laptops at a table, with mountains outside the window"
                width={1000}
                height={473}
              />
              <figcaption>Part of the team at work</figcaption>
            </figure>
          </div>
        </section>

        {/* NUMBERS: the shared strip from the homepage (real numbers from our systems) */}
        <section className="dd-sec abl-numbers">
          <div className="dd-container">
            <NumbersStrip />
            <p className="abl-own">
              And our own Local Pros Google profile: from 29 to 1,491 reviews, 4.7 stars, on the same system we run for
              our clients.
            </p>
          </div>
        </section>

        {/* A NOTE FROM JEREMY: cream, signed, one button (DESIGN-SYSTEM.md "Personal note") */}
        <section className="dd-sec dd-letter">
          <div className="dd-container">
            <div className="dd-letter-in">
              <p className="dd-eyebrow abl-letter-eyebrow">A note from Jeremy</p>
              <h2 className="dd-h2">Your customers do their homework on you</h2>
              <div className="dd-letter-body">
                {NOTE.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="dd-sign">
                <span className="dd-sign-name">
                  Jeremy
                  <svg className="dd-sign-line" viewBox="0 0 120 14" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M2 9 C 30 3, 60 3, 88 7 S 112 11, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="dd-sign-role">Founder, Local Pros Studio</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO: the shared service rows (reviews, social, website) */}
        <div id="what-we-do">
          <ServiceRows websiteVisual="fan" />
        </div>

        {/* HOW WE WORK: three plain answers to "what is it like working with you?" */}
        <section className="dd-sec abl-how">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">How we work</p>
              <h2 className="dd-h2">Simple for you, every month</h2>
            </div>
            <ol className="abl-how-list">
              {HOW_WE_WORK.map((h, i) => (
                <li key={h.title}>
                  <span className="abl-how-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="dd-h3">{h.title}</h3>
                  <p>{h.body}</p>
                </li>
              ))}
            </ol>
            <p className="abl-prices">
              <a href="/pricing">See what it costs</a>
            </p>
          </div>
        </section>

        {/* CLOSING: the shared closing card, as on the homepage */}
        <ClosingCard
          title="Let’s get your business found."
          items={RECAP}
          photo={closingPhoto}
          photoAlt="A builder smiling at a new 5-star Google review on his phone"
          href={SITE_WHATSAPP_URL}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
