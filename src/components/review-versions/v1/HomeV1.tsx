import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './homev1.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from '../../design-directions/ReviewDemo';
import { NAV, DEMO, SERVICES, PLAN, FOOTER } from '../../design-directions/content';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';
import { useReputationReviews, type WidgetReview } from '../../reputationReviews';
import CompareSlider from './CompareSlider';
import { FacebookPage, GStars, ProfileCard, SearchResults } from './Mocks';
import logoDark from '../../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';

// Homepage version 1: "Before / after slider". The change is shown with draggable comparisons of
// a fictional demo business (Mokoena Plumbing): its Google profile in the hero, then its Google
// search listing and its Facebook page, each beside the service and price that makes the change.
// Real proof is our own Google profile (29 to 789 reviews) and live Google reviews.

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=local+pros#lrd=0x1efa235edd61726f:0x2d27a3ca84715414,1,,,,';

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

const SectionHead = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="dd-head">
    <p className="dd-eyebrow">{eyebrow}</p>
    <h2 className="dd-h2">{title}</h2>
    {subtitle && <p className="dd-sub">{subtitle}</p>}
  </div>
);

/* ---------- Header with a working phone menu ---------- */

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 860 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="dd-header hv1-header">
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
          className="hv1-menu-btn"
          aria-expanded={open}
          aria-controls="hv1-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>
      <nav id="hv1-menu" className="hv1-menu" hidden={!open} aria-label="Main (phone)">
        <div className="dd-container">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>
              {n.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* ---------- Sections ---------- */

const PROBLEM_STEPS = [
  { title: 'They search “plumber near me”', body: 'Google shows a few businesses, with stars and a review count next to each.' },
  { title: 'They compare your reviews', body: 'How many you have, how good they are, and how recent the last one is.' },
  { title: 'They check your Facebook', body: 'A page with no posts since 2021 looks like a business that has closed.' },
  { title: 'They call one business', body: 'Usually the one that looks busy and trusted. The others never hear about it.' },
];

const CHANGES = [
  {
    id: 'reviews',
    eyebrow: 'Google reviews',
    title: 'Win the comparison before they call',
    body: 'After every job your customer gets a WhatsApp asking how it went. Happy customers get a one-tap link to your Google profile, so your count keeps climbing.',
    price: 'R1,200 a month',
    terms: 'Month-to-month · 30-day money-back guarantee',
    link: { label: 'How Google reviews work', to: '/reviews' },
    slider: {
      label: 'Google search results',
      description:
        'Google search for plumber near me. Before: Mokoena Plumbing shows 3.6 stars from 6 reviews, the last one 8 months ago, between competitors with 112 and 41 reviews. After: Mokoena Plumbing shows 4.8 stars from 64 reviews, the last one 2 days ago.',
      before: <SearchResults side="before" />,
      after: <SearchResults side="after" />,
    },
  },
  {
    id: 'posting',
    eyebrow: 'Social media posting',
    title: 'Show you are busy, every single week',
    body: 'WhatsApp us photos of your jobs. We write the posts and publish them to Facebook, Instagram and Google every week.',
    price: 'R2,000 a month',
    terms: 'Month-to-month · every post checked by a person',
    link: { label: 'How social posting works', to: '/social-media-posting-service' },
    slider: {
      label: 'Facebook page',
      description:
        'Facebook page of Mokoena Plumbing. Before: the latest post is a holiday closing notice from December 2021 with 3 likes. After: a post from 2 days ago with a job photo of a geyser replacement, 38 likes and 6 comments, and another job post from last week.',
      before: <FacebookPage side="before" />,
      after: <FacebookPage side="after" />,
    },
  },
];

const FAQ = [
  {
    q: 'What if a customer is unhappy?',
    a: 'Before anyone leaves a review, we ask how the job went. Unhappy customers go to a private feedback form and you are told straight away, so you can call and sort it out.',
  },
  {
    q: 'How do you know when I have finished a job?',
    a: 'If you use Sage or QuickBooks, we pick up completed jobs from your invoices. If not, BCC us on your invoice emails or fill in a quick form.',
  },
  {
    q: 'Can I not just ask for reviews myself?',
    a: 'You can, and some customers will say yes. The hard part is asking after every job, at the end of a long day, and following up when they forget: that is what we do for you.',
  },
  {
    q: 'What if I am too busy to send photos?',
    a: 'We add service posts, public holiday posts and your best reviews to your schedule. Your pages keep going even in a busy month.',
  },
  {
    q: 'Is there a contract?',
    a: 'Reviews (R1,200) and posting (R2,000) are month-to-month. The R2,500 plan is a 6-month commitment, or 12 months if you take the free website.',
  },
  {
    q: 'Does this work for my trade?',
    a: 'We work with home-service businesses: plumbers, electricians, roofers, pool cleaners, pest control, cleaners and more. If your customers check Google before they call, it works for you.',
  },
];

function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
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
}

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);
  return (
    <section id="how-it-works" ref={ref} className="dd-sec dd-demo">
      <div className="dd-container">
        <SectionHead
          eyebrow="How it works"
          title="You finish the job. We do the rest."
          subtitle="Three steps, and only the first one is yours. Your customer taps one link and the review goes up on your Google profile."
        />
        <div className="dd-demo-grid">
          <div className="dd-demo-phone">
            <ReviewPhone phase={phase} />
          </div>
          <div>
            <ol className="dd-steps">
              {DEMO.steps.map((s, i) => (
                <li key={s.title} className={i === active ? 'is-active' : ''}>
                  <span className="dd-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="dd-h3">{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="hv1-demo-posts">
              <strong>For your posts:</strong> WhatsApp us your job photos. We write the posts and publish them every week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });

function ReviewCard({ review }: { review: WidgetReview }) {
  return (
    <figure className="hv1-rev">
      <GStars value={review.starRating} size={16} />
      <blockquote>{review.comment}</blockquote>
      <figcaption>
        <strong>{review.reviewerName}</strong>
        <span>Google review · {shortDate(review.dateAdded)}</span>
      </figcaption>
    </figure>
  );
}

function Proof() {
  const { reviews, isLoading } = useReputationReviews();
  // The three fullest five-star reviews that still fit a card, so the cards sit evenly
  const picks = reviews
    .filter((r) => r.starRating === 5 && r.comment.length <= 260)
    .sort((a, b) => b.comment.length - a.comment.length)
    .slice(0, 3);
  const showCards = isLoading || picks.length > 0;

  return (
    <section className="dd-sec hv1-proof" id="proof">
      <div className="dd-container">
        <SectionHead
          eyebrow="Proof"
          title="We did it to our own Google profile first"
          subtitle="This is the Google profile of Local Pros, our own business. We used the same WhatsApp review system we now run for you."
        />

        <div className="hv1-proof-row">
          <div className="hv1-proof-card is-before">
            <p className="hv1-proof-tag">Before</p>
            <p className="hv1-proof-name">Local Pros</p>
            <p className="hv1-proof-rating">
              <b>3.0</b>
              <GStars value={3} size={18} />
            </p>
            <p className="hv1-proof-count">
              <strong>29</strong> reviews
            </p>
          </div>
          <div className="hv1-proof-arrow" aria-hidden="true">
            <span>18 months</span>
            <ArrowRight size={28} strokeWidth={2.25} />
          </div>
          <div className="hv1-proof-card is-after">
            <p className="hv1-proof-tag">After</p>
            <p className="hv1-proof-name">Local Pros</p>
            <p className="hv1-proof-rating">
              <b>4.6</b>
              <GStars value={4.6} size={18} />
            </p>
            <p className="hv1-proof-count">
              <strong>789</strong> reviews
            </p>
          </div>
        </div>
        <p className="hv1-proof-note">
          3.0 stars from 29 reviews to 4.6 stars from 789 reviews, in 18 months. Your numbers depend on how many jobs you do.
        </p>

        {showCards ? (
          <div className="hv1-revs" aria-busy={isLoading}>
            {isLoading
              ? [0, 1, 2].map((i) => <div key={i} className="hv1-rev is-loading" />)
              : picks.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        ) : null}
        <p className="hv1-proof-more">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="dd-link">
            Read all our reviews on Google
          </a>
        </p>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function HomeV1() {
  return (
    <div className="dd dd-a hv1">
      <Header />

      <main>
        {/* Hero: the promise, and the change you can drag */}
        <section className="hv1-hero">
          <div className="dd-container hv1-hero-grid">
            <h1 className="dd-kw hv1-hero-kw">Google reviews and social media for South African trades businesses</h1>
            <p className="dd-display hv1-hero-title">
              More <span className="dd-hl">Google reviews</span>. Fresh posts every week.
            </p>
            <div className="hv1-hero-slider">
              <CompareSlider
                nudge
                label="Google profile"
                description="A plumber's Google profile. Before: 3.6 stars from 6 reviews, one photo from 3 years ago, the last update 14 months ago and the latest review 8 months ago with 2 stars. After: 4.8 stars from 64 reviews, recent job photos, an update from 2 days ago and 5-star reviews from this week."
                before={<ProfileCard side="before" />}
                after={<ProfileCard side="after" />}
              />
            </div>
            <div className="hv1-hero-copy">
              <p className="dd-lede">
                Customers check your Google profile before they call. We fill it with new 5-star reviews and your latest jobs, so
                they call you and not the next business on the list.
              </p>
              <div className="dd-actions">
                <WaButton className="dd-btn-primary">Chat to us on WhatsApp</WaButton>
                <a href="#prices" className="dd-btn dd-btn-secondary">
                  See the prices
                </a>
              </div>
              <p className="dd-hero-note">Month-to-month on single services · 30-day money-back guarantee on reviews</p>
            </div>
          </div>
        </section>

        {/* The problem and what doing nothing costs */}
        <section className="dd-sec hv1-problem">
          <div className="dd-container">
            <SectionHead
              eyebrow="The problem"
              title="Customers check you out before they call"
              subtitle="This is what a customer does before they pick up the phone."
            />
            <ol className="hv1-journey">
              {PROBLEM_STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="hv1-journey-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="hv1-journey-title">{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="hv1-cost">
              <p className="hv1-cost-label">What doing nothing costs</p>
              <p className="hv1-cost-text">
                You never see the jobs you lose to a busier-looking profile. If a quiet profile costs you one job a month, it already
                costs more than our reviews service.
              </p>
            </div>
          </div>
        </section>

        {/* The change, shown with the same before/after device */}
        <section className="dd-sec hv1-change" id="the-change">
          <div className="dd-container">
            <SectionHead
              eyebrow="Before and after"
              title="What your customers see, before and after"
              subtitle="Same business, same work. The difference is fresh reviews and weekly posts."
            />
            <div className="hv1-change-list">
              {CHANGES.map((c, i) => (
                <article key={c.id} className={`hv1-change-row ${i % 2 ? 'is-flipped' : ''}`}>
                  <div className="hv1-change-media">
                    <CompareSlider
                      label={c.slider.label}
                      description={c.slider.description}
                      before={c.slider.before}
                      after={c.slider.after}
                    />
                  </div>
                  <div className="hv1-change-copy">
                    <p className="dd-eyebrow">{c.eyebrow}</p>
                    <h3 className="hv1-change-title">{c.title}</h3>
                    <p className="hv1-change-body">{c.body}</p>
                    <p className="hv1-change-price">
                      <span className="dd-price">{c.price}</span>
                      <span className="hv1-change-terms">{c.terms}</span>
                    </p>
                    <Link to={c.link.to} className="dd-link">
                      {c.link.label}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        <Proof />

        {/* The offer */}
        <section className="dd-sec hv1-offer" id="prices">
          <div className="dd-container">
            <SectionHead
              eyebrow="Prices"
              title="Pick what you need, or take both"
              subtitle="Single services are month-to-month. The plan saves you R700 a month."
            />
            <div className="hv1-offer-grid">
              {SERVICES.map((s) => (
                <article key={s.name} className="hv1-svc">
                  <h3 className="dd-h3">{s.name}</h3>
                  <p className="hv1-svc-price">{s.price}</p>
                  <p className="hv1-svc-body">{s.body}</p>
                  <p className="hv1-svc-note">{s.note}</p>
                  <Link to={s.link.to} className="dd-link">
                    {s.link.label}
                  </Link>
                </article>
              ))}
            </div>
            <div className="hv1-plan">
              <div className="hv1-plan-copy">
                <p className="hv1-plan-badge">Reviews and posting</p>
                <h3 className="hv1-plan-title">{PLAN.name}</h3>
                <p>{PLAN.body}</p>
              </div>
              <div className="hv1-plan-side">
                <p className="hv1-plan-price">
                  <strong>R2,500</strong>
                  <span>a month</span>
                </p>
                <WaButton className="dd-btn-primary">{PLAN.cta}</WaButton>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="dd-sec hv1-guarantee">
          <div className="dd-container">
            <div className="hv1-guarantee-in">
              <p className="hv1-guarantee-big">
                <strong>30</strong>
                <span>day money-back guarantee</span>
              </p>
              <div className="hv1-guarantee-copy">
                <h2 className="dd-h2">If no new 5-star reviews come in, you get your money back</h2>
                <p>
                  The guarantee covers Google reviews. If we do not get you any new 5-star reviews in your first 30 days, we refund
                  you.
                </p>
                <p>Single services are month-to-month, and a person checks every post before it goes out.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow="Questions" title="What business owners ask us" />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`hv1-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="dd-closing">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2">Make your Google profile look as busy as you are</h2>
            <p className="dd-sub">Send us a WhatsApp. We will look at your profile and show you what would change.</p>
            <WaButton className="dd-btn-inverted">Chat to us on WhatsApp</WaButton>
            <p className="dd-closing-note">Month-to-month on single services · 30-day money-back guarantee on reviews</p>
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
