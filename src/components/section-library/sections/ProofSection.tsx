import { useState } from 'react';
import { X } from 'lucide-react';
import '../../design-directions/directions.css';
import './proofsection.css';
import './proofblocks.css';
import { NumbersStrip, PostCard, ReviewsTop5 } from './ProofBlocks';
import montage from '../../../assets/images/portfolio/websites-montage.webp';
import montageMobile from '../../../assets/images/portfolio/websites-montage-mobile.webp';
import { WALL_POSTS, type ClientPost } from './clientProof';

// "The proof" (8 Oct 2026, Jeremy's request): lots of real proof images, grouped by the three
// services, plus the live Google reviews feed from our own profile (ReputationHub widget, the same
// feed as the current homepage). One sideways row per service (option C, picked over tabs and a
// picture wall). Every image opens full size on tap. Used on the join page; change it here only.

type Shot = { src: string; alt: string; caption: string; shape: 'wide' | 'square' | 'tall' | 'phone'; fit?: 'top' };

type Group = {
  label: string;
  title: string;
  line?: string;
  link?: { href: string; label: string };
};



function GroupHead({ g, as = 'h3' }: { g: Group; as?: 'h3' | 'p' }) {
  const Title = as;
  return (
    <div className="prf-group-head">
      <p className="prf-label">{g.label}</p>
      <Title className="prf-title">{g.title}</Title>
      {g.line && <p className="prf-line">{g.line}</p>}
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
        {shot.caption && <p>{shot.caption}</p>}
      </div>
    </div>
  );
}

const postShot = (p: ClientPost): Shot => ({ src: p.img, alt: p.caption, caption: '', shape: 'tall' });

const SOCIAL_HEAD: Group = {
  label: 'Social media posting',
  // The 789 is already in the numbers at the top of the section, so the heading doesn't repeat it
  title: 'Posts we’ve made for our clients',
};

function ReviewsPart() {
  return (
    <div className="prf-rails-group">
      <div className="prf-group-head">
        <p className="prf-label">Google reviews</p>
        <h3 className="prf-title">New Google reviews for our clients</h3>
      </div>
      <ReviewsTop5 />
      {/* The scrolling feed of our own Google reviews was removed on 8 Oct 2026 (Jeremy: too much to
          read, and they were about meetings rather than results) */}
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
          <dd>5 to 7</dd>
          <dt>working days to go live</dt>
        </div>
        <div>
          <dd>R9,900</dd>
          <dt>once-off, or R450 a month</dt>
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
    </div>
  );
}



// Real numbers (one per service), the top 5 client review gains with our own profile, client posts
// (eight in two rows of four, six on phones), then websites as numbers and one montage (option C, 8 Oct 2026). Helper lines, the reviews
// feed and post text were removed on 8 Oct 2026: Jeremy found they only added reading
function ProofLayout(props: LayoutProps) {
  return (
    <div className="prf-rails">
      <NumbersStrip />
      {/* Google reviews first, then posts, then websites: the hero's order (Jeremy, 8 Oct 2026) */}
      <ReviewsPart />
      <div className="prf-rails-group">
        <GroupHead g={SOCIAL_HEAD} />
        <div className="pb-post-grid">
          {WALL_POSTS.slice(0, 8).map((p) => (
            <PostCard key={p.slug} p={p} onOpen={(x) => props.onOpen(postShot(x))} />
          ))}
        </div>
      </div>
      <WebsitesPart onOpen={props.onOpen} />
    </div>
  );
}

type LayoutProps = {
  onOpen: (s: Shot) => void;
};

export default function ProofSection() {
  const [open, setOpen] = useState<Shot | null>(null);
  const props = { onOpen: setOpen };

  return (
    <section className="dd dd-a dd-sec prf" id="proof">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">The proof</p>
          <h2 className="dd-h2">Real work for real businesses</h2>
        </div>
        <ProofLayout {...props} />
      </div>
      <Lightbox shot={open} onClose={() => setOpen(null)} />
    </section>
  );
}
