import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './homev3.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from '../../design-directions/ReviewDemo';
import { NAV, DEMO, SERVICES, PLAN, FOOTER } from '../../design-directions/content';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';
import { useReputationReviews, type WidgetReview } from '../../reputationReviews';
import {
  HERO,
  SEARCH,
  CHECKS_HEAD,
  CHECKS,
  COST,
  SOCIAL,
  HOW,
  PROOF,
  OFFER_HEAD,
  GUARANTEE,
  FAQ_HEAD,
  FAQ,
  CLOSING,
} from './content';
import { useFlip, FlipToggle, Swap, SearchCompare, FacebookPhone, SocialThought, GStars } from './Graphics';
import logoDark from '../../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';

// Homepage version 3, "Which one would you call?": the change is shown through the customer's eyes.
// A Google search where the reader's business sits next to a competitor, then their Facebook page,
// each flipping between "before" and "with Local Pros". Built on design direction A (directions.css).

const WhatsAppIcon = () => (
  <svg className="dd-wa-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

const WaButton = ({ children, className }: { children: ReactNode; className: string }) => (
  <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`dd-btn ${className}`}>
    <WhatsAppIcon />
    {children}
  </a>
);

const withHighlight = (text: string, phrase: string) => {
  const i = text.indexOf(phrase);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="dd-hl">{phrase}</span>
      {text.slice(i + phrase.length)}
    </>
  );
};

const SectionHead = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="dd-head">
    {eyebrow && <p className="dd-eyebrow">{eyebrow}</p>}
    <h2 className="dd-h2">{title}</h2>
    {subtitle && <p className="dd-sub">{subtitle}</p>}
  </div>
);

/* ---------- Header with a phone menu ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="dd-header hv3-header">
      <div className="dd-container dd-header-in">
        <Link to="/" className="dd-logo" aria-label="Local Pros Studio home">
          <img src={logoDark} alt="Local Pros Studio" width={159} height={36} />
        </Link>
        <nav className="dd-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}>
              {n.label}
            </Link>
          ))}
        </nav>
        <WaButton className="dd-btn-nav">WhatsApp us</WaButton>
        <button
          type="button"
          className="hv3-menu-btn"
          aria-expanded={open}
          aria-controls="hv3-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <nav id="hv3-menu" className="hv3-menu" hidden={!open} aria-label="Main">
        <div className="dd-container">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* ---------- Hero: the Google search ---------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { after, choose } = useFlip(ref);
  return (
    <section className="dd-hero hv3-hero" ref={ref}>
      <div className="dd-container hv3-hero-grid">
        <div className="dd-hero-copy">
          <h1 className="dd-kw">{HERO.keywordH1}</h1>
          <h2 className="dd-display">{withHighlight(HERO.headline, HERO.highlight)}</h2>
          <p className="dd-lede">{HERO.subtitle}</p>
          <div className="dd-actions">
            <WaButton className="dd-btn-primary">{HERO.primary}</WaButton>
            <a href="#how-it-works" className="dd-btn dd-btn-secondary">
              {HERO.secondary}
            </a>
          </div>
          <p className="dd-hero-note">{HERO.note}</p>
        </div>
        <div className="hv3-hero-graphic">
          <p className="hv3-question">{SEARCH.question}</p>
          <SearchCompare after={after} />
          <FlipToggle after={after} choose={choose} label="Show the Google results before or with Local Pros" />
          <Swap
            after={after}
            className="hv3-caption"
            before={<span>{SEARCH.captionBefore}</span>}
            then={<span>{SEARCH.captionAfter}</span>}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- What customers check ---------- */

function Checks() {
  return (
    <section className="dd-sec hv3-checks">
      <div className="dd-container">
        <SectionHead {...CHECKS_HEAD} />
        <ol className="hv3-check-list">
          {CHECKS.map((c, i) => (
            <li key={c.title} className="hv3-check">
              <span className="hv3-check-num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="dd-h3">{c.title}</h3>
              <p className="hv3-chips">
                <span className="hv3-chip is-before">
                  <small>Before</small>
                  {c.before}
                </span>
                <svg className="hv3-chip-arrow" width="20" height="12" viewBox="0 0 20 12" aria-hidden="true">
                  <path d="M1 6h16M12 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hv3-chip is-after">
                  <small>After</small>
                  {c.after}
                </span>
              </p>
              <p className="hv3-check-body">{c.body}</p>
            </li>
          ))}
        </ol>
        <div className="hv3-cost">
          <p className="dd-eyebrow">{COST.label}</p>
          <p className="hv3-cost-title">{COST.title}</p>
          <p className="hv3-cost-body">{COST.body}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Facebook, dark band ---------- */

function Social() {
  const ref = useRef<HTMLElement>(null);
  const { after, choose } = useFlip(ref);
  return (
    <section className="dd-sec dd-demo hv3-social" ref={ref}>
      <div className="dd-container hv3-social-grid">
        <div className="hv3-social-phone">
          <FacebookPhone after={after} />
        </div>
        <div className="hv3-social-head">
          <p className="dd-eyebrow">{SOCIAL.eyebrow}</p>
          <h2 className="dd-h2">{SOCIAL.title}</h2>
          <p className="hv3-social-sub">{SOCIAL.subtitle}</p>
        </div>
        <div className="hv3-social-rest">
          <FlipToggle after={after} choose={choose} label="Show the Facebook page before or with Local Pros" dark />
          <SocialThought after={after} />
          <div className="hv3-social-how">
            <h3 className="dd-h3">{SOCIAL.howTitle}</h3>
            <p>{SOCIAL.how}</p>
            <Link to={SOCIAL.link.to} className="dd-link hv3-link-dark">
              {SOCIAL.link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- How Google reviews work ---------- */

function How() {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);
  return (
    <section id="how-it-works" ref={ref} className="dd-sec hv3-how">
      <div className="dd-container">
        <SectionHead eyebrow={HOW.eyebrow} title={HOW.title} subtitle={HOW.subtitle} />
        <div className="hv3-how-grid">
          <div className="hv3-how-phone">
            <ReviewPhone phase={phase} />
          </div>
          <div>
            <ol className="hv3-steps">
              {DEMO.steps.map((s, i) => (
                <li key={s.title} className={i === active ? 'is-active' : ''}>
                  <span className="hv3-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="dd-h3">{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to={HOW.link.to} className="dd-link hv3-how-link">
              {HOW.link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Proof: our own profile, plus live reviews ---------- */

const ProfileCard = ({ label, rating, count, after }: { label: string; rating: number; count: number; after?: boolean }) => (
  <div className={`hv3-profile ${after ? 'is-after' : ''}`}>
    <p className="hv3-profile-label">{label}</p>
    <div className="hv3-profile-card">
      <p className="hv3-profile-name">{PROOF.name}</p>
      <p className="hv3-profile-rate">
        <span>{rating.toFixed(1)}</span>
        <GStars rating={rating} size={after ? 20 : 16} />
      </p>
      <p className="hv3-profile-count">{count} Google reviews</p>
      <p className="hv3-profile-cat">{PROOF.category}</p>
    </div>
  </div>
);

const pickReviews = (reviews: WidgetReview[]) =>
  reviews
    .filter((r) => r.starRating === 5 && r.comment.length >= 60 && r.comment.length <= 240)
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3);

const reviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

function Proof() {
  const { reviews, isLoading } = useReputationReviews();
  const picked = pickReviews(reviews);
  const showReviews = isLoading || picked.length > 0;
  return (
    <section className="dd-sec hv3-proof">
      <div className="dd-container">
        <SectionHead eyebrow={PROOF.eyebrow} title={PROOF.title} subtitle={PROOF.subtitle} />
        <div
          className="hv3-proof-pair"
          role="img"
          aria-label="Our own Google profile, Local Pros: 3.0 stars from 29 reviews before, 4.6 stars from 789 reviews 18 months later"
        >
          <ProfileCard {...PROOF.before} />
          <svg className="hv3-proof-arrow" width="48" height="20" viewBox="0 0 48 20" aria-hidden="true">
            <path d="M2 10h40M34 3l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <ProfileCard {...PROOF.after} after />
        </div>
        <p className="hv3-proof-caption">{PROOF.caption}</p>

        {showReviews && (
          <div className="hv3-reviews">
            <h3 className="dd-h3">{PROOF.reviewsTitle}</h3>
            <ul className={`hv3-review-list ${isLoading ? 'is-loading' : ''}`}>
              {isLoading
                ? [0, 1, 2].map((i) => <li key={i} className="hv3-review is-skeleton" aria-hidden="true" />)
                : picked.map((r) => (
                    <li key={r.id} className="hv3-review">
                      <GStars rating={5} size={15} />
                      <p className="hv3-review-text">{r.comment}</p>
                      <p className="hv3-review-who">
                        <strong>{r.reviewerName}</strong>
                        <span>{reviewDate(r.dateAdded)}</span>
                      </p>
                    </li>
                  ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Offer ---------- */

function Offer() {
  return (
    <section className="dd-sec dd-services hv3-offer">
      <div className="dd-container">
        <SectionHead {...OFFER_HEAD} />
        <div className="dd-svc-list">
          {SERVICES.map((s) => (
            <article key={s.name} className="dd-svc">
              <div className="dd-svc-head">
                <h3 className="dd-h3">{s.name}</h3>
                <p className="dd-price">{s.price}</p>
              </div>
              <div className="dd-svc-body">
                <p>{s.body}</p>
                <p className="dd-svc-note">{s.note}</p>
                <Link to={s.link.to} className="dd-link">
                  {s.link.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="dd-plan">
          <div>
            <h3 className="dd-h3">{PLAN.name}</h3>
            <p>{PLAN.body}</p>
          </div>
          <WaButton className="dd-btn-primary">{PLAN.cta}</WaButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- Guarantee ---------- */

function Guarantee() {
  return (
    <section className="dd-sec hv3-guarantee">
      <div className="dd-container">
        <div className="hv3-guarantee-in">
          <div className="hv3-seal" aria-hidden="true">
            <strong>30</strong>
            <span>days</span>
          </div>
          <div>
            <p className="dd-eyebrow">{GUARANTEE.eyebrow}</p>
            <h2 className="dd-h2">{GUARANTEE.title}</h2>
            {GUARANTEE.body.map((p) => (
              <p key={p} className="hv3-guarantee-body">
                {p}
              </p>
            ))}
            <WaButton className="dd-btn-primary">{GUARANTEE.cta}</WaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FaqItem = ({ q, a, id }: { q: string; a: string; id: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dd-faq-item ${open ? 'is-open' : ''}`}>
      <h3 className="dd-faq-q">
        <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{q}</span>
          <ChevronDown className="dd-faq-chev" size={22} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} className="dd-faq-a" hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */

export default function HomeV3() {
  return (
    <div className="dd dd-a hv3">
      <Header />
      <main>
        <Hero />
        <Checks />
        <Social />
        <How />
        <Proof />
        <Offer />
        <Guarantee />

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow={FAQ_HEAD.eyebrow} title={FAQ_HEAD.title} />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`hv3-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="dd-closing">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2">{CLOSING.title}</h2>
            <p className="dd-sub">{CLOSING.subtitle}</p>
            <WaButton className="dd-btn-inverted">{CLOSING.cta}</WaButton>
            <p className="dd-closing-note">{CLOSING.note}</p>
          </div>
        </section>
      </main>

      <footer className="dd-footer">
        <div className="dd-container">
          <div className="dd-footer-grid">
            <div>
              <img src={logoLight} alt="Local Pros Studio" width={159} height={36} className="dd-footer-logo" />
              <p>{FOOTER.blurb}</p>
            </div>
            <div>
              <p className="dd-footer-title">Services</p>
              <ul>
                {FOOTER.services.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="dd-footer-title">Company</p>
              <ul>
                {FOOTER.company.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="dd-footer-title">Contact</p>
              <ul>
                <li>
                  <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp {FOOTER.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a>
                </li>
                <li>South Africa</li>
              </ul>
            </div>
          </div>
          <p className="dd-footer-base">© {new Date().getFullYear()} Local Pros Studio</p>
        </div>
      </footer>
    </div>
  );
}
