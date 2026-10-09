import { CLIENT_POSTS, CLIENT_REVIEW_RESULTS, PROOF_NUMBERS, clientBySlug } from '../section-library/sections/clientProof';
import localProsLogo from '../../assets/images/Reviews/local-pros-avatar.webp';
import './resultsoptions.css';

// Three new versions of the reviews page's Results section (9 Oct 2026; Jeremy didn't like the list of rows).
// All from the same real SP2 numbers in clientProof.ts: new Google reviews while each client was with us, and
// their average. Nothing typed by hand. Shown side by side on compare-results.html until he picks one.

const OWN_PROFILE_URL = 'https://share.google/IfuP5NKCOwovswd9B';

const results = CLIENT_REVIEW_RESULTS.map((r) => ({ ...r, client: clientBySlug(r.slug)! })).filter((r) => r.client);

const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

const Stars = ({ label }: { label?: string }) => (
  <span className="ro-stars" aria-label={label}>
    ★★★★★
  </span>
);

function OwnProfile() {
  return (
    <p className="ro-own">
      <img src={localProsLogo} alt="" loading="lazy" />
      <span>
        <strong>Our own Local Pros profile:</strong> from 29 to 1,491 Google reviews, 4.7 stars, on the same system.{' '}
        <a href={OWN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          See them on Google
        </a>
      </span>
    </p>
  );
}

// A. One big number, then every client's logo and gain as a wall: proof by volume, quick to scan
export function ResultsBigNumber() {
  const n = PROOF_NUMBERS;
  return (
    <section className="dd-sec rvl-proof ro ro-a" id="results">
      <div className="dd-container">
        <div className="dd-head ro-a-head">
          <p className="dd-eyebrow">Results</p>
        </div>
        <p className="ro-a-num">{n.reviewsReceived}</p>
        <p className="ro-a-line">
          new Google reviews for our clients, <strong>{n.reviewsAverage} stars</strong> on average
        </p>
        <ul className="ro-a-wall">
          {results.map((r) => (
            <li key={r.slug}>
              <span className="ro-logo">
                <img src={r.client.logo} alt="" loading="lazy" />
              </span>
              <span className="ro-a-who">
                <strong>{r.client.name}</strong>
                <span>{r.client.type}</span>
              </span>
              <span className="ro-a-gain">+{r.reviews}</span>
            </li>
          ))}
        </ul>
        <OwnProfile />
      </div>
    </section>
  );
}

// B. Each client as a small Google business card, the way their customers see them; a swipe row on a phone
export function ResultsGoogleCards() {
  return (
    <section className="dd-sec rvl-proof ro ro-b" id="results">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Results</p>
          <h2 className="dd-h2">Our clients on Google</h2>
          <p className="dd-sub">New Google reviews since each one joined us.</p>
        </div>
        <ul className="ro-b-cards">
          {results.slice(0, 6).map((r) => (
            <li key={r.slug} className="ro-b-card">
              <div className="ro-b-top">
                <span className="ro-logo">
                  <img src={r.client.logo} alt="" loading="lazy" />
                </span>
                <span className="ro-b-who">
                  <strong>{r.client.name}</strong>
                  <span>
                    {r.client.type} · {r.client.area}
                  </span>
                </span>
              </div>
              <p className="ro-b-rating">
                <b>{r.average.toFixed(1)}</b> <Stars label={`${r.average.toFixed(1)} stars on average`} />
              </p>
              <p className="ro-b-gain">
                <GoogleG />
                <strong>+{r.reviews}</strong> new reviews
              </p>
              <p className="ro-b-since">since {r.since}</p>
            </li>
          ))}
        </ul>
        <p className="ro-b-swipe" aria-hidden="true">
          Swipe for more →
        </p>
        <OwnProfile />
      </div>
    </section>
  );
}

// C. One client's story up front, with a real post of theirs, then four more in small
export function ResultsSpotlight() {
  const [lead, ...rest] = results;
  const post = CLIENT_POSTS.find((p) => p.slug === lead.slug);
  return (
    <section className="dd-sec rvl-proof ro ro-c" id="results">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Results</p>
          <h2 className="dd-h2">
            {lead.client.name} got {lead.reviews} new Google reviews.
          </h2>
        </div>
        <div className="ro-c-feature">
          {post && <img className="ro-c-img" src={post.img} alt={`A post on ${lead.client.name}'s Facebook page`} loading="lazy" />}
          <div className="ro-c-body">
            <span className="ro-logo ro-logo-lg">
              <img src={lead.client.logo} alt="" loading="lazy" />
            </span>
            <p className="ro-c-who">
              <strong>{lead.client.name}</strong>
              {lead.client.type}, {lead.client.area}
            </p>
            <p className="ro-c-num">
              <GoogleG size={30} />+{lead.reviews}
            </p>
            <p className="ro-c-line">
              new Google reviews since {lead.since}, <strong>{lead.average.toFixed(1)} stars</strong> on average
            </p>
          </div>
        </div>
        <p className="ro-c-more">And more of our clients:</p>
        <ul className="ro-c-rest">
          {rest.slice(0, 4).map((r) => (
            <li key={r.slug}>
              <span className="ro-logo">
                <img src={r.client.logo} alt="" loading="lazy" />
              </span>
              <span className="ro-c-rest-who">
                <strong>{r.client.name}</strong>
                <span>{r.client.type}</span>
              </span>
              <span className="ro-c-rest-num">+{r.reviews}</span>
            </li>
          ))}
        </ul>
        <OwnProfile />
      </div>
    </section>
  );
}
