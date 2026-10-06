import { useRef } from 'react';
import { Globe, Navigation, Phone, Share2 } from 'lucide-react';
import { GoogleG, StarRow, TimeScale, useStagePlayer, useTween } from './player';
import jobVan from './img/job-van.webp';
import jobHandshake from './img/job-handshake.webp';
import jobOldGeyser from './img/job-old-geyser.webp';
import jobNewGeyser from './img/job-new-geyser.webp';
import jobHob from './img/job-hob.webp';

// Hero graphic: a demonstration Google Business Profile (Mokoena Plumbing, the same fictional
// business as the WhatsApp demo) playing through its first 90 days. Every stage renders the same
// slots (three post tiles, two reviews, one caption), so the graphic never changes height.
// The numbers are kept modest on purpose: 6 reviews at 3.8 stars to 47 at 4.8.

type Post = { img: string; when: string; old?: boolean } | null;
type Review = { name: string; initial: string; tone: string; stars: number; when: string; text: string; isNew?: boolean };

export const STAGES: {
  label: string;
  rating: number;
  count: number;
  postsNote: string;
  posts: [Post, Post, Post];
  reviews: [Review, Review];
  caption: string;
}[] = [
  {
    label: 'Day 1',
    rating: 3.8,
    count: 6,
    postsNote: 'Last update 2 years ago',
    posts: [{ img: jobOldGeyser, when: '2 years ago', old: true }, null, null],
    reviews: [
      { name: 'Kabelo D.', initial: 'K', tone: 'a', stars: 4, when: '1 year ago', text: 'Fixed the leak, but it took a few days to get a quote.' },
      { name: 'Annelie S.', initial: 'A', tone: 'b', stars: 2, when: '2 years ago', text: 'Hard to get hold of on the phone.' },
    ],
    caption: 'Six reviews, the newest a year old. Nothing posted in two years.',
  },
  {
    label: 'Week 2',
    rating: 4.4,
    count: 11,
    postsNote: '2 posts this month',
    posts: [
      { img: jobNewGeyser, when: '2 days ago' },
      { img: jobVan, when: '9 days ago' },
      { img: jobOldGeyser, when: '2 years ago', old: true },
    ],
    reviews: [
      { name: 'Thandi M.', initial: 'T', tone: 'c', stars: 5, when: '2 days ago', text: 'Arrived on time and fixed the geyser the same day. Neat, friendly and fairly priced.', isNew: true },
      { name: 'Sipho N.', initial: 'S', tone: 'd', stars: 5, when: '5 days ago', text: 'Sorted our burst pipe on a Sunday. Would use again.', isNew: true },
    ],
    caption: 'Recent customers get a WhatsApp after the job. New reviews start to come in.',
  },
  {
    label: 'Month 1',
    rating: 4.6,
    count: 19,
    postsNote: '4 posts this month',
    posts: [
      { img: jobHob, when: '1 day ago' },
      { img: jobHandshake, when: '1 week ago' },
      { img: jobNewGeyser, when: '2 weeks ago' },
    ],
    reviews: [
      { name: 'Lerato K.', initial: 'L', tone: 'e', stars: 5, when: 'Yesterday', text: 'Quick quote and neat work. They cleaned up after themselves.', isNew: true },
      { name: 'Johan V.', initial: 'J', tone: 'a', stars: 5, when: '3 days ago', text: 'Replaced our old geyser with a gas one. Clear pricing and no mess.', isNew: true },
    ],
    caption: 'A post with photos of your work goes up every week.',
  },
  {
    label: 'Month 3',
    rating: 4.8,
    count: 47,
    postsNote: 'A new post every week',
    posts: [
      { img: jobVan, when: 'Today' },
      { img: jobHob, when: '1 week ago' },
      { img: jobHandshake, when: '2 weeks ago' },
    ],
    reviews: [
      { name: 'Ayesha P.', initial: 'A', tone: 'c', stars: 5, when: '3 hours ago', text: 'Found them on Google with lots of good reviews. They came out the same afternoon.', isNew: true },
      { name: 'Pieter B.', initial: 'P', tone: 'd', stars: 5, when: 'Yesterday', text: 'Second time we have used them. On time, and they explain everything.', isNew: true },
    ],
    caption: '47 reviews, the newest from today. People can see you are busy and trusted.',
  },
];

const ACTIONS = [
  { Icon: Phone, label: 'Call' },
  { Icon: Navigation, label: 'Directions' },
  { Icon: Globe, label: 'Website' },
  { Icon: Share2, label: 'Share' },
];

export default function ProfileTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const player = useStagePlayer(STAGES.length, 3400, 5200, ref);
  const s = STAGES[player.stage];
  const rating = useTween(s.rating, 700, player.reduced);
  const count = useTween(s.count, 900, player.reduced);

  return (
    <div className="hv2-hero-graphic" ref={ref}>
      <TimeScale labels={STAGES.map((x) => x.label)} player={player} label="First 90 days" idPrefix="hv2-hero" />

      <div
        className="hv2-gbp"
        id="hv2-hero-panel"
        role="tabpanel"
        aria-label={`Mokoena Plumbing on Google at ${s.label}: ${s.rating.toFixed(1)} stars from ${s.count} reviews. ${s.caption}`}
      >
        <div className="hv2-gbp-top">
          <p className="hv2-gbp-name">Mokoena Plumbing</p>
          <p className="hv2-gbp-rating">
            <strong>{rating.toFixed(1)}</strong>
            <StarRow value={rating} size={15} />
            <span>({Math.round(count)})</span>
          </p>
          <p className="hv2-gbp-meta">Plumber · Pretoria East</p>
          <p className="hv2-gbp-meta">
            <span className="hv2-gbp-open">Open</span> · Closes 17:00
          </p>
        </div>

        <div className="hv2-gbp-actions" aria-hidden="true">
          {ACTIONS.map(({ Icon, label }) => (
            <span key={label}>
              <i>
                <Icon size={17} />
              </i>
              {label}
            </span>
          ))}
        </div>

        <div className="hv2-gbp-sec">
          <p className="hv2-gbp-sechead">
            <span>Updates</span>
            <small key={s.postsNote} className="hv2-pop">
              {s.postsNote}
            </small>
          </p>
          <div className="hv2-gbp-posts">
            {s.posts.map((p, i) =>
              p ? (
                <figure key={`${p.img}-${p.when}`} className={`hv2-tile hv2-pop ${p.old ? 'is-old' : ''}`}>
                  <img src={p.img} alt="" width={160} height={160} loading="eager" decoding="async" />
                  <figcaption>{p.when}</figcaption>
                </figure>
              ) : (
                <span key={`empty-${i}`} className="hv2-tile is-empty" />
              ),
            )}
          </div>
        </div>

        <div className="hv2-gbp-sec">
          <p className="hv2-gbp-sechead">
            <span>Reviews</span>
            <small>Newest first</small>
          </p>
          {s.reviews.map((r) => (
            <div key={r.name} className="hv2-rev hv2-pop">
              <p className="hv2-rev-who">
                <span className={`hv2-ava t-${r.tone}`}>{r.initial}</span>
                <span className="hv2-rev-name">
                  <strong>{r.name}</strong>
                  <small>
                    <StarRow value={r.stars} size={11} /> {r.when}
                  </small>
                </span>
                {r.isNew && <em>New</em>}
              </p>
              <p className="hv2-rev-text">{r.text}</p>
            </div>
          ))}
        </div>
        <span className="hv2-gbp-g" aria-hidden="true">
          <GoogleG size={18} />
        </span>
      </div>

      <p className="hv2-caption">
        <strong>{s.label}:</strong> {s.caption}
      </p>
    </div>
  );
}
