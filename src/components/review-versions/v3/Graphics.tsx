import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  SEARCH,
  COMPETITOR_TOP,
  COMPETITOR_LOW,
  YOU_BEFORE,
  YOU_AFTER,
  SOCIAL,
  type Listing,
} from './content';
import jobPhoto from '../../../assets/images/recurring-services/recurring-contractor-logging-job.webp';

// The two "customer's eye" graphics for version 3: a Google search and a Facebook page.
// Both states are always rendered on top of each other (same grid cell) and only fade, so the
// page never changes height. They flip on their own while on screen, stop once the reader
// presses the toggle, and show the "with Local Pros" state for reduced-motion visitors.
// Inside the mock-ups the colours are Google's and Facebook's own, not the page palette.

const BEFORE_MS = 3600;
const AFTER_MS = 5200;

export function useFlip(target: RefObject<HTMLElement>) {
  const [after, setAfter] = useState(false);
  const [touched, setTouched] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = target.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  useEffect(() => {
    if (reduced || touched || !visible) return;
    const t = window.setTimeout(() => setAfter((a) => !a), after ? AFTER_MS : BEFORE_MS);
    return () => window.clearTimeout(t);
  }, [after, reduced, touched, visible]);

  const choose = (value: boolean) => {
    setTouched(true);
    setAfter(value);
  };

  return { after: reduced && !touched ? true : after, choose };
}

export const FlipToggle = ({
  after,
  choose,
  label,
  dark = false,
}: {
  after: boolean;
  choose: (v: boolean) => void;
  label: string;
  dark?: boolean;
}) => (
  <div className={`hv3-toggle ${dark ? 'is-dark' : ''}`} role="group" aria-label={label}>
    <button type="button" aria-pressed={!after} className={!after ? 'is-on' : ''} onClick={() => choose(false)}>
      Before
    </button>
    <button type="button" aria-pressed={after} className={after ? 'is-on' : ''} onClick={() => choose(true)}>
      With Local Pros
    </button>
  </div>
);

// Two versions of the same thing stacked in one grid cell: the box is always as tall as the taller one
export const Swap = ({ after, before: b, then: a, className = '' }: { after: boolean; before: ReactNode; then: ReactNode; className?: string }) => (
  <span className={`hv3-swap ${className}`}>
    <span className={!after ? 'is-on' : ''} aria-hidden={after}>
      {b}
    </span>
    <span className={after ? 'is-on' : ''} aria-hidden={!after}>
      {a}
    </span>
  </span>
);

const STAR_PATH = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z';

const StarRow = ({ size }: { size: number }) => (
  <>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
    ))}
  </>
);

// Google rounds the stars it draws to the nearest half
export const GStars = ({ rating, size = 13 }: { rating: number; size?: number }) => (
  <span className="hv3-gstars" aria-hidden="true">
    <span className="hv3-gstars-base">
      <StarRow size={size} />
    </span>
    <span className="hv3-gstars-fill" style={{ width: `${(Math.round(rating * 2) / 2 / 5) * 100}%` }}>
      <StarRow size={size} />
    </span>
  </span>
);

export const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Rate = ({ l }: { l: Listing }) => (
  <span className="hv3-g-rate">
    <span className="hv3-g-num">{l.rating.toFixed(1)}</span>
    <GStars rating={l.rating} />
    <span className="hv3-g-count">({l.count})</span>
  </span>
);

const Snip = ({ l }: { l: Listing }) => (
  <span className="hv3-g-snip">
    <span className="hv3-g-quote">“{l.snippet}”</span>
    <span className="hv3-g-when">{l.when}</span>
  </span>
);

const Actions = ({ chosen }: { chosen: boolean }) => (
  <span className="hv3-g-actions">
    <span className={`hv3-g-call ${chosen ? 'is-chosen' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"
        />
      </svg>
      Call
      <b className="hv3-tap" aria-hidden="true" />
    </span>
    <span>Directions</span>
    <span>Website</span>
  </span>
);

const ListingCard = ({ l, chosen, rank }: { l: Listing; chosen: boolean; rank: number }) => (
  <span className="hv3-g-item">
    <span className="hv3-g-name">
      <span className="hv3-g-rank">{rank}</span>
      {l.name}
    </span>
    <Rate l={l} />
    <span className="hv3-g-meta">Plumber · Pretoria East · {l.hours}</span>
    <Snip l={l} />
    <Actions chosen={chosen} />
  </span>
);

const YouCard = ({ after, rank }: { after: boolean; rank: number }) => (
  <span className={`hv3-g-item is-you ${after ? 'is-after' : ''}`}>
    <span className="hv3-you-tag">Your business</span>
    <span className="hv3-g-name">
      <span className="hv3-g-rank">{rank}</span>
      {YOU_BEFORE.name}
    </span>
    <Swap after={after} before={<Rate l={YOU_BEFORE} />} then={<Rate l={YOU_AFTER} />} className="hv3-g-swap" />
    <span className="hv3-g-meta">Plumber · Pretoria East · {YOU_BEFORE.hours}</span>
    <Swap after={after} before={<Snip l={YOU_BEFORE} />} then={<Snip l={YOU_AFTER} />} className="hv3-g-swap" />
    <Actions chosen={after} />
  </span>
);

// Where each business sits on the little map. The places stay put; only the numbers change.
const PIN_SPOTS = { top: { x: 74, y: 30 }, you: { x: 38, y: 58 }, low: { x: 86, y: 74 } } as const;
type Who = keyof typeof PIN_SPOTS;

const MapStrip = () => (
  <svg className="hv3-g-map" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <rect width="100" height="100" fill="#eef1ec" />
    <path d="M0 64 C 30 58, 55 70, 100 52" stroke="#ffffff" strokeWidth="5" fill="none" />
    <path d="M22 0 C 26 40, 18 70, 30 100" stroke="#ffffff" strokeWidth="4" fill="none" />
    <path d="M62 0 L 58 100" stroke="#ffffff" strokeWidth="3" fill="none" />
    <path d="M0 22 L 100 34" stroke="#fde68a" strokeWidth="3.5" fill="none" />
    <rect x="4" y="74" width="14" height="20" rx="2" fill="#cfe5cf" />
    <rect x="66" y="80" width="10" height="16" rx="2" fill="#cfe5cf" />
  </svg>
);

const MapPins = ({ order }: { order: Who[] }) => (
  <span className="hv3-g-pins" aria-hidden="true">
    {(Object.keys(PIN_SPOTS) as Who[]).map((who) => {
      const rank = order.indexOf(who) + 1;
      return (
        <span
          key={who}
          className={`hv3-g-pin ${who === 'you' ? 'is-you' : ''} ${rank === 1 ? 'is-first' : ''}`}
          style={{ left: `${PIN_SPOTS[who].x}%`, top: `${PIN_SPOTS[who].y}%` }}
        >
          <span>{rank}</span>
        </span>
      );
    })}
  </span>
);

// Slides the listings into their new order (measure where they were, then glide from there)
function useReorderGlide(listRef: RefObject<HTMLElement>, key: string) {
  const last = useRef<Map<string, number>>(new Map());
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>('[data-who]'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const now = new Map(items.map((el) => [el.dataset.who!, el.offsetTop]));
    if (!reduced && last.current.size) {
      items.forEach((el) => {
        const before = last.current.get(el.dataset.who!);
        const delta = before === undefined ? 0 : before - now.get(el.dataset.who!)!;
        if (!delta) return;
        el.style.transition = 'none';
        el.style.transform = `translateY(${delta}px)`;
        requestAnimationFrame(() => {
          el.style.transition = 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
          el.style.transform = '';
        });
      });
    }
    last.current = now;
  }, [listRef, key]);
}

export function SearchCompare({ after }: { after: boolean }) {
  const listRef = useRef<HTMLDivElement>(null);
  const order: Who[] = after ? ['you', 'top', 'low'] : ['top', 'you', 'low'];
  useReorderGlide(listRef, order.join());

  const card = (who: Who) => {
    const rank = order.indexOf(who) + 1;
    if (who === 'you') return <YouCard after={after} rank={rank} />;
    return <ListingCard l={who === 'top' ? COMPETITOR_TOP : COMPETITOR_LOW} chosen={who === 'top' && !after} rank={rank} />;
  };

  return (
    <div
      className="hv3-g"
      role="img"
      aria-label={
        after
          ? 'Google Maps results for plumber near me: Mokoena Plumbing has moved to first place with 4.9 stars from 64 reviews, the newest 2 days ago, and the customer taps Call on Mokoena Plumbing'
          : 'Google Maps results for plumber near me: Mokoena Plumbing sits second with 4.0 stars from 6 reviews, the newest a year ago, below Thornbush Plumbing with 48 recent reviews, and the customer taps Call on Thornbush'
      }
    >
      <div className="hv3-g-search" aria-hidden="true">
        <GoogleG />
        <span className="hv3-g-query">{SEARCH.query}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="#4285F4" strokeWidth="2.2" />
          <path d="M15.5 15.5L21 21" stroke="#4285F4" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="hv3-g-mapwrap" aria-hidden="true">
        <MapStrip />
        <MapPins order={order} />
      </div>
      <div className="hv3-g-list" ref={listRef} aria-hidden="true">
        <p className="hv3-g-head">Places</p>
        {order.map((who) => (
          <div key={who} data-who={who} className="hv3-g-slot">
            {card(who)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Facebook page on a phone ---------- */

const FbGlobe = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const FbPostHead = ({ when }: { when: string }) => (
  <span className="hv3-fb-posthead">
    <span className="hv3-fb-av sm">MP</span>
    <span>
      <strong>Mokoena Plumbing</strong>
      <small>
        {when} · <FbGlobe />
      </small>
    </span>
  </span>
);

const FbActions = ({ likes }: { likes?: string }) => (
  <>
    {likes && <span className="hv3-fb-likes">{likes}</span>}
    <span className="hv3-fb-acts">
      <span>Like</span>
      <span>Comment</span>
      <span>Share</span>
    </span>
  </>
);

export function FacebookPhone({ after }: { after: boolean }) {
  return (
    <div
      className="hv3-phone"
      role="img"
      aria-label={
        after
          ? 'The Mokoena Plumbing Facebook page with a job post from Tuesday and a customer review post from Monday'
          : 'The Mokoena Plumbing Facebook page whose last post is from 24 December 2021'
      }
    >
      <div className="hv3-phone-screen" aria-hidden="true">
        <div className="hv3-fb-status">
          <span>14:32</span>
          <span className="hv3-fb-bars">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="hv3-fb-cover" />
        <div className="hv3-fb-id">
          <span className="hv3-fb-av lg">MP</span>
          <strong>Mokoena Plumbing</strong>
          <small>Plumber · Pretoria East · 214 followers</small>
          <span className="hv3-fb-btns">
            <span className="pri">Message</span>
            <span>Like</span>
          </span>
        </div>
        <div className="hv3-fb-tabs">
          <span className="is-on">Posts</span>
          <span>About</span>
          <span>Photos</span>
        </div>
        <Swap
          after={after}
          className="hv3-fb-feed"
          before={
            <span className="hv3-fb-col">
              <span className="hv3-fb-post">
                <FbPostHead when="24 December 2021" />
                <span className="hv3-fb-text">
                  Merry Christmas from all of us at Mokoena Plumbing. We are closed until 10 January.
                </span>
                <FbActions likes="3 likes" />
              </span>
              <span className="hv3-fb-end">No more posts</span>
            </span>
          }
          then={
            <span className="hv3-fb-col">
              <span className="hv3-fb-post">
                <FbPostHead when="Tuesday at 16:20" />
                <span className="hv3-fb-text">
                  New geyser in Moreleta Park today. Hot water back on by lunch.
                </span>
                <img className="hv3-fb-photo" src={jobPhoto} alt="" width={1200} height={805} loading="lazy" decoding="async" />
                <span className="hv3-fb-likes">27 likes · 4 comments</span>
              </span>
              <span className="hv3-fb-post">
                <FbPostHead when="Monday at 09:00" />
                <span className="hv3-fb-review">
                  <span className="hv3-fb-review-g">
                    <GoogleG size={14} />
                    <GStars rating={5} size={13} />
                  </span>
                  <span className="hv3-fb-review-q">“Sorted our burst pipe on a Sunday. Would use again.”</span>
                  <span className="hv3-fb-review-who">Sipho N., Google review</span>
                </span>
              </span>
            </span>
          }
        />
      </div>
    </div>
  );
}

export function SocialThought({ after }: { after: boolean }) {
  return (
    <div className="hv3-think">
      <p className="hv3-think-label">{SOCIAL.thinkLabel}</p>
      <Swap
        after={after}
        className="hv3-think-q"
        before={<span>{SOCIAL.thinkBefore}</span>}
        then={<span>{SOCIAL.thinkAfter}</span>}
      />
    </div>
  );
}
