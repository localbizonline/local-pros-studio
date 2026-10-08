import { ArrowUpRight } from 'lucide-react';
import { formatReviewDate, getInitials, useReputationReviews } from '../reputationReviews';

// "What our clients say" from the old dark /website-design page, which Jeremy liked (8 Oct 2026), in the
// light look: our Google rating beside the headline, then the live reviews from our Local Pros Studio
// profile (ReputationHub feed). Two profiles, so each number says which one it is (DESIGN-SYSTEM.md section 2).
// On a phone only the first four reviews show, with the link to read the rest on Google.

export const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=local+pros#lrd=0x1efa235edd61726f:0x2d27a3ca84715414,1,,,,';

export const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

const Stars = () => (
  <span className="cr-stars" aria-label="5 out of 5 stars">
    ★★★★★
  </span>
);

export default function ClientReviews({ onGoogle }: { onGoogle?: () => void }) {
  const { reviews, isLoading, summary } = useReputationReviews();
  const shown = reviews.filter((r) => r.starRating === 5).slice(0, 9);

  return (
    <section className="dd-sec cr">
      <div className="dd-container">
        <div className="cr-head">
          <div>
            <p className="dd-eyebrow">What our clients say</p>
            <h2 className="dd-h2">Over 1,400 reviews on Google</h2>
          </div>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="cr-badge" onClick={onGoogle}>
            <GoogleG size={32} />
            <span>
              <Stars />
              <strong>4.7 stars from 1,400+ reviews</strong>
              <small>Local Pros profile on Google</small>
            </span>
          </a>
        </div>
        {summary && (
          <p className="cr-feed-note">
            Latest reviews on our Local Pros Studio profile, {summary.rating.toFixed(1)} stars from {summary.total} reviews:
          </p>
        )}
        <div className="cr-grid">
          {isLoading
            ? [0, 1, 2].map((i) => <div key={i} className="cr-card is-loading" />)
            : shown.map((r) => (
                <figure key={r.id} className="cr-card">
                  <div className="cr-card-top">
                    <span className="cr-avatar" aria-hidden="true">
                      {getInitials(r.reviewerName)}
                    </span>
                    <figcaption>
                      <strong>{r.reviewerName}</strong>
                      <small>{formatReviewDate(r.dateAdded)}</small>
                    </figcaption>
                    <GoogleG />
                  </div>
                  <Stars />
                  <blockquote>{r.comment.replace(/⭐/g, '').trim()}</blockquote>
                </figure>
              ))}
        </div>
        <p className="cr-more">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="dd-link" onClick={onGoogle}>
            Read all our reviews on Google
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
