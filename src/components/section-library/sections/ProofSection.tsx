import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './proofsection.css';
import './proofblocks.css';
import { NumbersStrip, PostCard, ReviewsTop5 } from './ProofBlocks';
import montage from '../../../assets/images/portfolio/websites-montage.webp';
import montageMobile from '../../../assets/images/portfolio/websites-montage-mobile.webp';
import { PROOF_NUMBERS, WALL_POSTS, type ClientPost } from './clientProof';
import { useReputationReviews, type WidgetReview } from '../../reputationReviews';

// "The proof" (8 Oct 2026, Jeremy's request): lots of real proof images, grouped by the three
// services, plus the live Google reviews feed from our own profile (ReputationHub widget, the same
// feed as the current homepage). One sideways row per service (option C, picked over tabs and a
// picture wall). Every image opens full size on tap. Used on the join page; change it here only.

type Shot = { src: string; alt: string; caption: string; shape: 'wide' | 'square' | 'tall' | 'phone'; fit?: 'top' };

type Group = {
  label: string;
  title: string;
  line: string;
  link?: { href: string; label: string };
};



const GoogleG = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="prf-g">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

const reviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });

function ReviewCard({ r }: { r: WidgetReview }) {
  return (
    <figure className="prf-review">
      <div className="prf-review-top">
        <GoogleG />
        <span className="prf-stars" aria-label={`${r.starRating} stars`}>
          {'★'.repeat(r.starRating)}
        </span>
        <span className="prf-review-date">{reviewDate(r.dateAdded)}</span>
      </div>
      <blockquote>{r.comment.replace(/⭐/g, '').trim()}</blockquote>
      <figcaption>{r.reviewerName}</figcaption>
    </figure>
  );
}

function FeedHeader({ summary }: { summary: { total: number; rating: number } | null }) {
  return (
    <p className="prf-feed-head">
      <GoogleG />
      <span>
        <strong>What our clients say on Google</strong>
        {summary && (
          <>
            {' '}
            · Local Pros Studio profile, {summary.rating.toFixed(1)} stars from {summary.total} reviews
          </>
        )}
      </span>
    </p>
  );
}


function GroupHead({ g, as = 'h3' }: { g: Group; as?: 'h3' | 'p' }) {
  const Title = as;
  return (
    <div className="prf-group-head">
      <p className="prf-label">{g.label}</p>
      <Title className="prf-title">{g.title}</Title>
      <p className="prf-line">{g.line}</p>
      {g.link && (
        <a className="prf-link" href={g.link.href} target="_blank" rel="noopener noreferrer">
          {g.link.label}
        </a>
      )}
    </div>
  );
}

function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  if (!shot) return null;
  return (
    <div className="prf-lightbox" role="dialog" aria-modal="true" aria-label={shot.alt} onClick={onClose}>
      <button type="button" className="prf-lightbox-close" onClick={onClose} aria-label="Close">
        <X size={22} />
      </button>
      <div className="prf-lightbox-body" onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} />
        <p>{shot.caption}</p>
      </div>
    </div>
  );
}

// No animation (Jeremy, 8 Oct 2026: an auto-drifting row was distracting). Each row shows it scrolls
// sideways with the next picture cut off at the edge, a "Swipe for more" line and a bar showing
// how far along the visitor is. Arrow buttons replace the line on wider screens.
function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState({ start: 0, size: 1 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const total = el.scrollWidth || 1;
      setView({ start: el.scrollLeft / total, size: Math.min(1, el.clientWidth / total) });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  const move = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  const atEnd = view.start + view.size >= 0.99;
  return (
    <div className="prf-rail-wrap">
      <div className="prf-rail" ref={ref} aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="prf-rail-foot">
        <span className="prf-swipe" aria-hidden="true">
          {atEnd ? 'Swipe back' : 'Swipe for more'}
          <ChevronRight size={16} strokeWidth={2.5} className={atEnd ? 'is-back' : ''} />
        </span>
        <span className="prf-track" aria-hidden="true">
          <span style={{ left: `${view.start * 100}%`, width: `${view.size * 100}%` }} />
        </span>
        <span className="prf-rail-arrows">
          <button type="button" onClick={() => move(-1)} aria-label={`Back: ${label}`}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label={`More: ${label}`}>
            <ChevronRight size={20} />
          </button>
        </span>
      </div>
    </div>
  );
}


const postShot = (p: ClientPost): Shot => ({ src: p.img, alt: p.caption, caption: p.caption + '…', shape: 'tall' });

const SOCIAL_HEAD: Group = {
  label: 'Social media posting',
  title: `${PROOF_NUMBERS.postsLast30Days} posts went out for our clients in the last 30 days`,
  line: `${PROOF_NUMBERS.postsDfyLast30Days} of them we made from scratch: tips, service posts and public holiday posts. The rest came from job photos our clients sent us. Here are 12, each from a different business.`,
};

function ReviewsPart({ reviews, summary }: LayoutProps) {
  return (
    <div className="prf-rails-group">
      <div className="prf-group-head">
        <p className="prf-label">Google reviews</p>
        <h3 className="prf-title">New Google reviews for our clients</h3>
        <p className="prf-line">The five biggest gains on our system, counted while each business was with us.</p>
      </div>
      <ReviewsTop5 />
      {reviews.length > 0 && (
        <div className="prf-feed">
          <FeedHeader summary={summary} />
          <Rail label="Google reviews of Local Pros Studio">
            {reviews.map((r) => (
              <ReviewCard key={r.id} r={r} />
            ))}
          </Rail>
        </div>
      )}
    </div>
  );
}


// Websites (8 Oct 2026): the numbers in text, then one montage picture of client sites
const MONTAGE: Shot = {
  src: montage,
  alt: 'Websites we built, on phones: Top Spec Gas Installations, ReachMax, Maramba Fence & Gates, Winelands Gas, PETport, BKC Pet, Jacuzzi Pros and Paving Pros, and two example designs for a nail and lash studio and an accounting firm',
  caption: 'Sites for Top Spec Gas, ReachMax, Maramba Fence & Gates, Winelands Gas and more, plus two example designs (a nail studio and an accounting firm).',
  shape: 'wide',
}

function WebsitesPart({ onOpen }: { onOpen: (s: Shot) => void }) {
  return (
    <div className="prf-rails-group">
      <div className="prf-group-head">
        <p className="prf-label">Website design</p>
        <h3 className="prf-title">Websites we’ve built</h3>
      </div>
      <dl className="pb-web-stats">
        <div>
          <dd>500+</dd>
          <dt>websites built since 2015</dt>
        </div>
        <div>
          <dd>5 to 7</dd>
          <dt>working days to go live</dt>
        </div>
        <div>
          <dd>Free</dd>
          <dt>with the package on a 12-month commitment</dt>
        </div>
      </dl>
      <button type="button" className="pb-montage" onClick={() => onOpen(MONTAGE)} aria-label={`Open full size: ${MONTAGE.alt}`}>
        {/* Phones get their own picture: three bigger phones instead of a row of five (8 Oct 2026) */}
        <picture>
          <source media="(max-width: 767px)" srcSet={montageMobile} width={1080} height={820} />
          <img src={montage} alt={MONTAGE.alt} loading="lazy" width={1600} height={860} />
        </picture>
      </button>
      <p className="pb-source">{MONTAGE.caption}</p>
    </div>
  );
}



// Real numbers, a wall of 12 client posts (mostly done-for-you), the top 5 client review gains with
// our own, our reviews feed, then websites as numbers and one montage (picked 8 Oct 2026, option C;
// the logo wall was dropped because the post cards already show each logo)
function ProofLayout(props: LayoutProps) {
  return (
    <div className="prf-rails">
      <NumbersStrip />
      <div className="prf-rails-group">
        <GroupHead g={SOCIAL_HEAD} />
        <div className="pb-post-grid">
          {WALL_POSTS.map((p) => (
            <PostCard key={p.slug} p={p} onOpen={(x) => props.onOpen(postShot(x))} />
          ))}
        </div>
      </div>
      <ReviewsPart {...props} />
      <WebsitesPart onOpen={props.onOpen} />
    </div>
  );
}

type LayoutProps = {
  reviews: WidgetReview[];
  summary: { total: number; rating: number } | null;
  onOpen: (s: Shot) => void;
};

export default function ProofSection() {
  const { reviews, summary } = useReputationReviews();
  const [open, setOpen] = useState<Shot | null>(null);
  const props = { reviews, summary, onOpen: setOpen };

  return (
    <section className="dd dd-a dd-sec prf" id="proof">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">The proof</p>
          <h2 className="dd-h2">Real work for real businesses</h2>
          <p className="dd-sub">Reviews we’ve collected, posts we’ve made and websites we’ve built. Tap any picture to see it full size.</p>
        </div>
        <ProofLayout {...props} />
      </div>
      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </section>
  );
}
