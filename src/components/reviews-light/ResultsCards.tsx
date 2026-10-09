import { CLIENT_REVIEW_RESULTS, clientBySlug } from '../section-library/sections/clientProof';
import localProsLogo from '../../assets/images/Reviews/local-pros-avatar.webp';
import './resultscards.css';

// Results on the reviews page (9 Oct 2026, option B of three, picked by Jeremy): each client as a small Google
// business card with their new reviews since they joined. Three across on desktop; on a phone a plain list down the
// page, each card one compact row (Jeremy: no sideways scrolling). Real SP2 numbers from clientProof.ts. The clients'
// total of new reviews is never shown (Jeremy, 9 Oct 2026).

const OWN_PROFILE_URL = 'https://share.google/IfuP5NKCOwovswd9B';

const results = CLIENT_REVIEW_RESULTS.slice(0, 6)
  .map((r) => ({ ...r, client: clientBySlug(r.slug)! }))
  .filter((r) => r.client);

const GoogleG = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true" className="rc-g">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

export default function ResultsCards() {
  return (
    <section className="dd-sec rvl-proof rc" id="results">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Results</p>
          <h2 className="dd-h2">Our clients on Google</h2>
          <p className="dd-sub">New Google reviews since each one joined us.</p>
        </div>
        <ul className="rc-cards">
          {results.map((r) => (
            <li key={r.slug} className="rc-card">
              <span className="rc-logo">
                <img src={r.client.logo} alt="" loading="lazy" />
              </span>
              <span className="rc-who">
                <strong>{r.client.name}</strong>
                <span>
                  {r.client.type} · {r.client.area}
                </span>
                <span className="rc-rating">
                  <b>{r.average.toFixed(1)}</b>{' '}
                  <span className="rc-stars" aria-label={`${r.average.toFixed(1)} stars on average`}>
                    ★★★★★
                  </span>
                </span>
              </span>
              <span className="rc-gain">
                <span className="rc-num">
                  <GoogleG />+{r.reviews}
                </span>
                <span className="rc-label">
                  new reviews <span className="rc-since">since {r.since}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="rc-own">
          <img src={localProsLogo} alt="" loading="lazy" />
          <span>
            <strong>Our own Local Pros profile:</strong> from 29 to 1,491 Google reviews, 4.7 stars, on the same system.{' '}
            <a href={OWN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              See them on Google
            </a>
          </span>
        </p>
      </div>
    </section>
  );
}
