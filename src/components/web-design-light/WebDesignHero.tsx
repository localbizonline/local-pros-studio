import { GoogleG, GOOGLE_REVIEWS_URL } from './ClientReviews';
import DemoSearchBox from './DemoSearchBox';
// Montage of client sites and example designs, built from design/web-montage (8 Oct 2026)
import heroWide from '../../assets/images/portfolio/web-hero-wide.webp';
import heroPhone from '../../assets/images/portfolio/web-hero-phone.webp';

// The website page's opening section (8 Oct 2026). The free demo is the main action: a small card with the
// three demo steps around the Google search box (version C, picked by Jeremy over the box on its own, a
// "Get my free demo" button, and the earlier WhatsApp-first hero). WhatsApp stays as a text link under it.

const HERO_ALT =
  'Websites we built on phones, each for a different business: paving, gas, pet transport, fencing, a vet clinic, attorneys, a driving school, plumbers, an estate agent, a guest house, pool cleaning, dog grooming, tutoring, a panel beater and more';

const LEDE =
  'We write, build and look after websites for South African businesses. Find your business on Google and we’ll send you a free demo of your new website on WhatsApp.';

export default function WebDesignHero({ waUrl, track }: { waUrl: string; track: (label: string) => void }) {
  const rating = (
    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="wdl-rating" onClick={() => track('hero_google_reviews')}>
      <GoogleG />
      <span>
        <strong>4.7 stars</strong> from 1,400+ Google reviews <span className="wdl-rating-src">(Local Pros)</span>
      </span>
    </a>
  );
  // A plain text link for those who would rather talk now
  const orWhatsApp = (
    <p className="wdh-or">
      Or{' '}
      <a href={waUrl} target="_blank" rel="noopener noreferrer" className="wdl-inline-link" onClick={() => track('hero_whatsapp')}>
        WhatsApp us
      </a>{' '}
      to talk it through. R9,900 once-off, or R450 a month.
    </p>
  );

  return (
    <section className="dd-hero wdl-hero wdh-c">
      <div className="dd-container">
        <h1 className="dd-kw">Website design for South African businesses</h1>
        <p className="dd-display wdl-display">
          A new website for your business, <span className="wdl-u">live in 7 days</span>
        </p>
        <p className="dd-lede">{LEDE}</p>
        <div className="wdh-card">
          <p className="wdh-card-label">Free demo</p>
          <ol className="wdh-steps">
            <li>
              <span>1</span>Find your business
            </li>
            <li>
              <span>2</span>We build your demo
            </li>
            <li>
              <span>3</span>It arrives on WhatsApp
            </li>
          </ol>
          <DemoSearchBox onOpen={() => track('hero_demo_search')} />
        </div>
        {orWhatsApp}
        {rating}
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
  );
}
