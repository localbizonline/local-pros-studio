import { Search } from 'lucide-react';
import { GoogleG, StarRow } from './player';
import jobVan from './img/job-van.webp';
import jobHandshake from './img/job-handshake.webp';
import jobNewGeyser from './img/job-new-geyser.webp';
import jobHob from './img/job-hob.webp';

// Small, static product moments for each stage of "Your first 90 days".
// Same demonstration business as the hero; screens keep their real-app colours.

// Day 1: a finished job on an invoice turns into a queued WhatsApp review request
export function SetupGraphic() {
  return (
    <div className="hv2-mini hv2-inv" role="img" aria-label="A paid invoice for a geyser replacement, and a WhatsApp review request queued for the customer">
      <div className="hv2-inv-card">
        <p className="hv2-inv-top">
          <span>Invoice INV-0412</span>
          <em>Paid</em>
        </p>
        <p className="hv2-inv-line">
          <span>Geyser replacement</span>
          <span>Thandi M.</span>
        </p>
        <p className="hv2-inv-line muted">
          <span>Pretoria East</span>
          <span>Today</span>
        </p>
      </div>
      <span className="hv2-inv-arrow" aria-hidden="true" />
      <div className="hv2-inv-wa">
        <span className="hv2-inv-wa-dot" aria-hidden="true" />
        <span>
          <strong>Review request queued</strong>
          <small>WhatsApp to Thandi M. · 14:31</small>
        </span>
      </div>
    </div>
  );
}

// Week 2: what the owner sees on their phone
export function NotifyGraphic() {
  return (
    <div className="hv2-mini hv2-notes" role="img" aria-label="Phone notifications: two new 5-star Google reviews, and one private note from an unhappy customer">
      <div className="hv2-note">
        <span className="hv2-note-app g">
          <GoogleG size={16} />
        </span>
        <span className="hv2-note-body">
          <span className="hv2-note-head">
            <strong>New review</strong>
            <small>now</small>
          </span>
          <span className="hv2-note-text">
            <StarRow value={5} size={11} /> Thandi M.: “Arrived on time and fixed the geyser the same day.”
          </span>
        </span>
      </div>
      <div className="hv2-note">
        <span className="hv2-note-app p">!</span>
        <span className="hv2-note-body">
          <span className="hv2-note-head">
            <strong>Private feedback</strong>
            <small>2h ago</small>
          </span>
          <span className="hv2-note-text">Mr Pillay tapped “Could be better”. Give him a call before it goes public.</span>
        </span>
      </div>
      <div className="hv2-note">
        <span className="hv2-note-app g">
          <GoogleG size={16} />
        </span>
        <span className="hv2-note-body">
          <span className="hv2-note-head">
            <strong>New review</strong>
            <small>yesterday</small>
          </span>
          <span className="hv2-note-text">
            <StarRow value={5} size={11} /> Sipho N.: “Sorted our burst pipe on a Sunday.”
          </span>
        </span>
      </div>
    </div>
  );
}

// Month 1: four weeks, four posts, each on three platforms
const WEEKS = [
  { img: jobVan, title: 'On the road today' },
  { img: jobNewGeyser, title: 'Gas geyser fitted' },
  { img: jobHandshake, title: 'Job signed off' },
  { img: jobHob, title: 'Gas hob connected' },
];

export function PostsGraphic() {
  return (
    <div className="hv2-mini hv2-cal" role="img" aria-label="Four weeks of posts made from job photos, each published to Facebook, Instagram and Google">
      <div className="hv2-cal-grid">
        {WEEKS.map((w, i) => (
          <div key={w.title} className="hv2-cal-col">
            <span className="hv2-cal-week">Week {i + 1}</span>
            <img src={w.img} alt="" width={160} height={160} loading="lazy" decoding="async" />
            <span className="hv2-cal-title">{w.title}</span>
            <span className="hv2-cal-ok">Checked</span>
          </div>
        ))}
      </div>
      <p className="hv2-cal-foot">
        <span className="hv2-cal-to">Each post goes to</span>
        <span>Facebook</span>
        <span>Instagram</span>
        <span>Google</span>
      </p>
    </div>
  );
}

// Month 3: what a customer sees when they search
export function SearchGraphic() {
  return (
    <div className="hv2-mini hv2-serp" role="img" aria-label="A Google search for a plumber in Pretoria East shows Mokoena Plumbing with 4.8 stars from 47 reviews">
      <p className="hv2-serp-bar">
        <Search size={15} aria-hidden="true" />
        <span>plumber pretoria east</span>
      </p>
      <div className="hv2-serp-item">
        <p className="hv2-gbp-name">Mokoena Plumbing</p>
        <p className="hv2-gbp-rating">
          <strong>4.8</strong>
          <StarRow value={4.8} size={13} />
          <span>(47)</span>
        </p>
        <p className="hv2-gbp-meta">
          Plumber · Pretoria East · <span className="hv2-gbp-open">Open</span>
        </p>
        <p className="hv2-serp-quote">“Found them on Google with lots of good reviews.”</p>
        <div className="hv2-serp-actions" aria-hidden="true">
          <span>Call</span>
          <span>Website</span>
          <span>Directions</span>
        </div>
      </div>
    </div>
  );
}
