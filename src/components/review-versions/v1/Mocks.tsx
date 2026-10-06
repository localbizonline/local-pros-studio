import { Globe, MessageCircle, Mic, Navigation, Phone, Search, Share2, ThumbsUp } from 'lucide-react';
import jobVan from '../../../assets/images/recurring-services/recurring-contractor-logging-job.webp';
import jobHandshake from '../../../assets/images/avatars/hero-contractor-handshake.webp';
import jobPlumber from '../../../assets/images/avatars/review-contractor-happy.webp';
import oldJobPhoto from './img/job-old-geyser.webp';
import coverPhoto from '../../../assets/images/recurring-services/recurring-hero-contractor-calendar.jpg';

// Code-built screens for the before/after sliders. Mokoena Plumbing is a fictional demo business
// (also used in the review phone demo). The screens keep their real-app colours (Google, Facebook);
// everything else on the page uses the design-system tokens.
// Layout rule: each screen carries telling facts on BOTH its left and right half, so the slider
// still reads at its resting middle position (left half = before, right half = after).

type Side = 'before' | 'after';

/** Google-style stars with a fractional fill */
export const GStars = ({ value, size = 14 }: { value: number; size?: number }) => (
  <span className="hv1-gstars" style={{ height: size }} aria-hidden="true">
    <span className="hv1-gstars-row base">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} />
      ))}
    </span>
    <span className="hv1-gstars-row fill" style={{ width: `${(value / 5) * 100}%` }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} />
      ))}
    </span>
  </span>
);

const Star = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
  </svg>
);

const GoogleWord = () => (
  <span className="hv1-gword" aria-hidden="true">
    <b style={{ color: '#4285F4' }}>G</b>
    <b style={{ color: '#EA4335' }}>o</b>
    <b style={{ color: '#FBBC05' }}>o</b>
    <b style={{ color: '#4285F4' }}>g</b>
    <b style={{ color: '#34A853' }}>l</b>
    <b style={{ color: '#EA4335' }}>e</b>
  </span>
);

/* -------------------------------------------------------------------------- */
/* Google Business Profile card (hero)                                        */
/* -------------------------------------------------------------------------- */

const PROFILE = {
  before: {
    rating: 3.6,
    count: 6,
    latest: '8 months ago',
    photosNote: '1 photo · 3 years ago',
    update: { text: 'Closed for the holidays. Back on 10 January.', when: '14 months ago' },
    reviews: [
      { name: 'Johan P.', initial: 'J', stars: 2, when: '8 months ago', text: 'Took three days to come out. Fixed the leak in the end.' },
      { name: 'Marius V.', initial: 'M', stars: 4, when: '1 year ago', text: 'Good work, but hard to get hold of on the phone.' },
    ],
  },
  after: {
    rating: 4.8,
    count: 64,
    latest: '2 days ago',
    photosNote: '48 photos · latest 2 days ago',
    update: { text: 'New geyser fitted in Moreleta Park, hot water back the same day.', when: '2 days ago' },
    reviews: [
      { name: 'Thandi M.', initial: 'T', stars: 5, when: '2 days ago', text: 'Arrived on time and fixed the geyser the same day. Neat and friendly.' },
      { name: 'Sipho N.', initial: 'S', stars: 5, when: '5 days ago', text: 'Sorted our burst pipe on a Sunday. Would use again.' },
    ],
  },
} as const;

export function ProfileCard({ side }: { side: Side }) {
  const p = PROFILE[side];
  const isAfter = side === 'after';
  return (
    <div className={`hv1-g hv1-g-${side}`}>
      <div className="hv1-g-photos">
        {isAfter ? (
          <>
            <img className="big" src={jobVan} alt="" width={1200} height={805} draggable={false} />
            <img src={jobPlumber} alt="" width={214} height={160} draggable={false} />
            <img src={jobHandshake} alt="" width={214} height={160} draggable={false} />
          </>
        ) : (
          <>
            <img className="big old" src={oldJobPhoto} alt="" width={287} height={160} draggable={false} />
            <span className="empty" />
            <span className="empty" />
          </>
        )}
        <span className="hv1-g-photo-note">{p.photosNote}</span>
      </div>

      <div className="hv1-g-body">
        <p className="hv1-g-name">Mokoena Plumbing</p>
        <div className="hv1-g-split">
          <div>
            <p className="hv1-g-rating">
              <b>{p.rating.toFixed(1)}</b>
              <GStars value={p.rating} size={15} />
              <span className="muted">({p.count})</span>
            </p>
            <p className="hv1-g-meta">Plumber · Pretoria East</p>
          </div>
          <p className={`hv1-g-latest ${side}`}>
            <span>Latest review</span>
            <strong>{p.latest}</strong>
          </p>
        </div>
        <p className="hv1-g-meta">
          <span className="open">Open</span> · Closes 17:00
        </p>
        <div className="hv1-g-actions">
          {[
            { Icon: Phone, t: 'Call' },
            { Icon: Navigation, t: 'Directions' },
            { Icon: Globe, t: 'Website' },
            { Icon: Share2, t: 'Share' },
          ].map(({ Icon, t }) => (
            <span key={t}>
              <i>
                <Icon size={17} strokeWidth={2} />
              </i>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="hv1-g-sec">
        <p className="hv1-g-sec-title">From the owner</p>
        <div className="hv1-g-update">
          <div>
            <p>{p.update.text}</p>
            <small>{p.update.when}</small>
          </div>
          {isAfter ? (
            <img src={jobVan} alt="" width={1200} height={805} draggable={false} />
          ) : (
            <span className="thumb-empty">
              <span>Closed</span>
              <span>16 Dec – 10 Jan</span>
            </span>
          )}
        </div>
      </div>

      <div className="hv1-g-sec">
        <p className="hv1-g-sec-title">
          Reviews
          <span className="muted">Most recent</span>
        </p>
        <div className="hv1-g-reviews">
          {p.reviews.map((r, i) => (
            <div key={r.name} className="hv1-g-review">
              <p className="who">
                <span className={`av ${isAfter ? `c${i}` : 'grey'}`}>{r.initial}</span>
                <strong>{r.name}</strong>
              </p>
              <p className="line">
                <GStars value={r.stars} size={12} />
                <span className="muted">{r.when}</span>
              </p>
              <p className="txt">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Google search: "plumber near me"                                           */
/* -------------------------------------------------------------------------- */

const COMPETITORS = {
  top: { name: 'Pro Flow Plumbing', rating: 4.7, count: 112, quote: 'Quick to respond and fair on price.', when: '3 days ago' },
  bottom: { name: 'Ace Plumbing & Drains', rating: 4.4, count: 41, quote: 'Unblocked our drain in an hour.', when: '1 week ago' },
};

const SEARCH_YOU = {
  before: { rating: 3.6, count: 6, quote: 'Took three days to come out.', when: '8 months ago' },
  after: { rating: 4.8, count: 64, quote: 'Fixed the geyser the same day.', when: '2 days ago' },
} as const;

const Listing = ({
  name,
  rating,
  count,
  quote,
  when,
  you,
}: {
  name: string;
  rating: number;
  count: number;
  quote: string;
  when: string;
  you?: Side;
}) => (
  <div className={`hv1-s-item ${you ? `you ${you}` : ''}`}>
    <div className="hv1-s-text">
      {you && <span className="hv1-s-you">You</span>}
      <p className="name">{name}</p>
      <p className="rate">
        <b>{rating.toFixed(1)}</b>
        <GStars value={rating} size={13} />
        <span className="muted">({count})</span>
      </p>
      <p className="muted">Plumber · Open</p>
    </div>
    <div className="hv1-s-snip">
      <p>“{quote}”</p>
      <small>{when}</small>
    </div>
  </div>
);

export function SearchResults({ side }: { side: Side }) {
  const y = SEARCH_YOU[side];
  return (
    <div className="hv1-s">
      <div className="hv1-s-top">
        <GoogleWord />
        <div className="hv1-s-bar">
          <Search size={16} color="#5f6368" />
          <span>plumber near me</span>
          <Mic size={16} color="#4285F4" />
        </div>
      </div>
      <div className="hv1-s-chips">
        <span className="on">Places</span>
        <span>Rating</span>
        <span>Open now</span>
        <span>Hours</span>
      </div>
      <p className="hv1-s-head">Plumbers near Pretoria East</p>
      <Listing {...COMPETITORS.top} />
      <Listing name="Mokoena Plumbing" rating={y.rating} count={y.count} quote={y.quote} when={y.when} you={side} />
      <Listing {...COMPETITORS.bottom} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Facebook page                                                              */
/* -------------------------------------------------------------------------- */

export function FacebookPage({ side }: { side: Side }) {
  const isAfter = side === 'after';
  return (
    <div className={`hv1-fb hv1-fb-${side}`}>
      <div className="hv1-fb-cover">
        {isAfter ? <img src={coverPhoto} alt="" width={1200} height={805} loading="lazy" draggable={false} /> : <span />}
      </div>
      <div className="hv1-fb-id">
        <span className="hv1-fb-pic">MP</span>
        <div>
          <p className="name">Mokoena Plumbing</p>
          <p className="muted">{isAfter ? '486 followers · Plumber' : '212 followers · Plumber'}</p>
        </div>
      </div>
      <div className="hv1-fb-tabs">
        <span className="on">Posts</span>
        <span>About</span>
        <span>Photos</span>
        <span>Reviews</span>
      </div>
      <div className="hv1-fb-post">
        <div className="hv1-fb-post-head">
          <span className="hv1-fb-pic sm">MP</span>
          <div>
            <p className="name">Mokoena Plumbing</p>
            <p className="muted">{isAfter ? '2 days ago' : '12 December 2021'}</p>
          </div>
        </div>
        <p className="hv1-fb-text">
          {isAfter
            ? 'Burst geyser in Garsfontein this morning. New 150-litre geyser in and hot water back by lunch.'
            : 'We are closed for the holidays. Back on 10 January. Merry Christmas!'}
        </p>
        <div className="hv1-fb-media">
          {isAfter ? (
            <img src={jobVan} alt="" width={1200} height={805} loading="lazy" draggable={false} />
          ) : (
            <span className="hv1-fb-oldcard">
              <strong>Closed</strong>
              <span>16 December to 10 January</span>
            </span>
          )}
        </div>
        <div className="hv1-fb-counts">
          <span>
            <i className="like">
              <ThumbsUp size={10} strokeWidth={3} />
            </i>
            {isAfter ? '38' : '3'}
          </span>
          <span className="muted">{isAfter ? '6 comments · 2 shares' : 'No comments'}</span>
        </div>
        <div className="hv1-fb-actions">
          <span>
            <ThumbsUp size={16} /> Like
          </span>
          <span>
            <MessageCircle size={16} /> Comment
          </span>
          <span>
            <Share2 size={16} /> Share
          </span>
        </div>
      </div>
      <p className="hv1-fb-next">{isAfter ? 'Last week · Leak found and fixed in Faerie Glen' : ' '}</p>
    </div>
  );
}
