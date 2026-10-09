import { CLIENT_REVIEW_RESULTS, PROOF_NUMBERS, clientBySlug, type ClientPost } from './clientProof';
import localProsLogo from '../../../assets/images/Reviews/local-pros-avatar.webp';

// Parts of the proof section built from real SP2 data (8 Oct 2026): the numbers, the client logos,
// client review results and client posts shown like a feed. Data in clientProof.ts.

const shortDate = (iso: string) => new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });

export function NumbersStrip() {
  const n = PROOF_NUMBERS;
  return (
    <div className="pb-numbers">
      <dl>
        {/* One number per service, in the hero's order. The client count (64) was dropped: Jeremy
            found it too low to show (8 Oct 2026) */}
        {/* The total of new reviews was replaced by their average (Jeremy, 9 Oct 2026: don't show the total) */}
        <div>
          <dt>average rating of our clients’ new Google reviews</dt>
          <dd>
            {n.reviewsAverage}
            <span className="pb-star">★</span>
          </dd>
        </div>
        <div>
          <dt>posts published for clients in the last 30 days</dt>
          <dd>{n.postsLast30Days}</dd>
        </div>
        <div>
          <dt>websites built since 2015</dt>
          <dd>500+</dd>
        </div>
      </dl>
    </div>
  );
}




export function PostCard({ p, onOpen }: { p: ClientPost; onOpen?: (p: ClientPost) => void }) {
  const c = clientBySlug(p.slug);
  if (!c) return null;
  return (
    <figure className="pb-post">
      <div className="pb-post-top">
        <span className="pb-avatar">
          <img src={c.logo} alt="" loading="lazy" />
        </span>
        <span className="pb-post-who">
          <strong>{c.name}</strong>
          <span>
            {c.type} · {shortDate(p.date)}
          </span>
        </span>
      </div>
      {p.type && <p className={`pb-post-type is-${p.kind}`}>{p.type}</p>}
      <button type="button" className="pb-post-img" onClick={() => onOpen?.(p)} aria-label={`Open full size: post for ${c.name}`}>
        <img src={p.img} alt={`Post for ${c.name}: ${p.caption}`} loading="lazy" width={p.w} height={p.h} />
      </button>
      {p.link && (
        <a className="pb-post-link" href={p.link} target="_blank" rel="noopener noreferrer">
          See it on Facebook
        </a>
      )}
    </figure>
  );
}

const GoogleMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="pb-g">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

// The five biggest client gains in new Google reviews, as rows (no bars: Jeremy found them
// distracting, 8 Oct 2026), plus our own profile
export function ReviewsTop5() {
  const top = CLIENT_REVIEW_RESULTS.slice(0, 5);
  return (
    <div className="pb-top5">
      <ol>
        {top.map((r) => {
          const c = clientBySlug(r.slug);
          if (!c) return null;
          return (
            <li key={r.slug}>
              <span className="pb-top5-logo">
                <img src={c.logo} alt="" loading="lazy" />
              </span>
              <span className="pb-top5-who">
                <strong>{c.name}</strong>
                <span>
                  {c.type}, {c.area}
                </span>
              </span>
              <span className="pb-top5-num">
                <GoogleMark />+{r.reviews}
              </span>
              <span className="pb-top5-meta">
                since {r.since}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="pb-own">
        <span className="pb-top5-logo">
          <img src={localProsLogo} alt="" loading="lazy" />
        </span>
        <p>
          <strong>Our own Local Pros profile:</strong> from 29 to 1,491 Google reviews, 4.7 <span className="pb-star">★</span>, on the same system.
        </p>
        <a className="prf-link" href="https://share.google/IfuP5NKCOwovswd9B" target="_blank" rel="noopener noreferrer">
          See them on Google
        </a>
      </div>
    </div>
  );
}
