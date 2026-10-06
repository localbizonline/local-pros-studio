import { useRef } from 'react';
import { GoogleG, StarRow, TimeScale, useStagePlayer, useTween } from './player';

// Proof graphic: our own Google profile, on the same kind of time scale as the hero.
// Only the two real data points are shown (start and 18 months later); nothing in between is
// drawn, so no monthly figures are implied. The bars beside it are to scale.

const POINTS = [
  { label: 'Start', rating: 3.0, count: 29 },
  { label: '18 months later', rating: 4.6, count: 789 },
];

export default function ProofTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const player = useStagePlayer(POINTS.length, 3600, 5200, ref);
  const p = POINTS[player.stage];
  const rating = useTween(p.rating, 900, player.reduced);
  const count = useTween(p.count, 1400, player.reduced);
  const max = POINTS[1].count;

  return (
    <div className="hv2-proof" ref={ref}>
      <div className="hv2-proof-card-col">
        <TimeScale labels={POINTS.map((x) => x.label)} player={player} label="Our Google profile over 18 months" idPrefix="hv2-proof" />
        <div
          className="hv2-own"
          id="hv2-proof-panel"
          role="tabpanel"
          aria-label={`Local Pros on Google, ${p.label.toLowerCase()}: ${p.rating.toFixed(1)} stars from ${p.count} reviews`}
        >
          <span className="hv2-own-ava" aria-hidden="true">
            LP
          </span>
          <div>
            <p className="hv2-own-name">Local Pros</p>
            <p className="hv2-gbp-rating">
              <strong>{rating.toFixed(1)}</strong>
              <StarRow value={rating} size={16} />
              <span>({Math.round(count)})</span>
            </p>
            <p className="hv2-gbp-meta">Internet marketing service</p>
          </div>
          <span className="hv2-own-g" aria-hidden="true">
            <GoogleG size={20} />
          </span>
        </div>
      </div>

      <div className="hv2-bars" aria-label="Number of Google reviews, drawn to scale">
        {POINTS.map((pt, i) => (
          <div key={pt.label} className={`hv2-bar-row ${player.stage === i ? 'is-on' : ''}`}>
            <p className="hv2-bar-label">
              <span>{pt.label}</span>
              <strong>
                {pt.count} reviews · {pt.rating.toFixed(1)} stars
              </strong>
            </p>
            <span className="hv2-bar" aria-hidden="true">
              <span style={{ width: `${Math.max(1.2, (pt.count / max) * 100)}%` }} />
            </span>
          </div>
        ))}
        <p className="hv2-bars-note">Bars drawn to scale. Same WhatsApp review system we set up for you.</p>
      </div>
    </div>
  );
}
