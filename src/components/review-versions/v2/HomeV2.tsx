import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './homev2.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from '../../design-directions/ReviewDemo';
import { WHATSAPP_URL, NAV, HERO, DEMO, SERVICES, PLAN, FOOTER } from '../../design-directions/content';
import { useReputationReviews, getInitials, type WidgetReview } from '../../reputationReviews';
import ProfileTimeline from './ProfileTimeline';
import ProofTimeline from './ProofTimeline';
import { NotifyGraphic, PostsGraphic, SearchGraphic, SetupGraphic } from './StoryGraphics';
import { GoogleG, StarRow } from './player';
import logoDark from '../../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';

// Homepage version 2, "Your first 90 days": the change is shown as progress over time.
// The hero plays a demonstration Google profile from Day 1 to Month 3; the story section walks
// the same four stages; the proof echoes it with our own profile (29 to 789 reviews in 18 months).
// Built on design direction A (directions.css tokens), with its own classes in homev2.css.

const WhatsAppIcon = () => (
  <svg className="dd-wa-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

const WaButton = ({ children, className }: { children: ReactNode; className: string }) => (
  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`dd-btn ${className}`}>
    <WhatsAppIcon />
    {children}
  </a>
);

const SectionHead = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="dd-head">
    {eyebrow && <p className="dd-eyebrow">{eyebrow}</p>}
    <h2 className="dd-h2">{title}</h2>
    {subtitle && <p className="dd-sub">{subtitle}</p>}
  </div>
);

// ---------- Header with a working phone menu ----------

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
    <header className="dd-header hv2-header">
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
          className="hv2-menu-btn"
          aria-expanded={open}
          aria-controls="hv2-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      <nav id="hv2-menu" className="hv2-menu" aria-label="Main" hidden={!open}>
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

// ---------- Sections ----------

const STORY = [
  {
    when: 'Day 1',
    title: 'We set it up. You keep working.',
    we: 'We connect to your Sage or QuickBooks invoices, or you BCC us on your invoice emails. No invoicing system? A quick form on your phone does the job.',
    you: 'Nothing new to learn. You save our WhatsApp number for your job photos.',
    Graphic: SetupGraphic,
  },
  {
    when: 'Week 2',
    title: 'Your recent customers start reviewing you',
    we: 'Each customer gets a WhatsApp asking how the job went. Happy customers get a one-tap Google review link, plus a friendly reminder if they forget.',
    you: 'New reviews arrive on your phone. If someone was unhappy, you hear about it privately first.',
    Graphic: NotifyGraphic,
  },
  {
    when: 'Month 1',
    title: 'Your pages stop looking closed',
    we: 'You WhatsApp us photos from your jobs. We turn them into posts for Facebook, Instagram and Google every week, each one checked by a person.',
    you: 'Your pages show this month’s work, not a post from two years ago.',
    Graphic: PostsGraphic,
  },
  {
    when: 'Month 3',
    title: 'People trust you before they call',
    we: 'The review requests and posts keep going every week. In a busy month we add service posts and your best reviews, so your pages never go quiet.',
    you: 'When someone compares three plumbers, yours is the profile with recent reviews and this week’s work.',
    Graphic: SearchGraphic,
  },
];

const COSTS = [
  'The job that went to the plumber with 60 recent reviews.',
  'The happy customer who meant to review you, and forgot.',
  'The Facebook page that makes you look closed.',
];

const FAQ = [
  {
    q: 'How many reviews will I get?',
    a: 'It depends on how many jobs you finish and how many customers reply. We ask after every job and send a reminder, but we do not promise a number.',
  },
  {
    q: 'What if a customer is unhappy?',
    a: 'Before anyone leaves a review, we ask how the job went. Unhappy customers go to a private feedback form and you are notified straight away, so you can call and sort it out.',
  },
  {
    q: 'How do you know when I have finished a job?',
    a: 'If you use Sage or QuickBooks, we connect to it and pick up completed jobs. If not, BCC us on your invoice emails or fill in a quick form.',
  },
  {
    q: 'What if I am too busy to send photos?',
    a: 'We add service posts, public holiday posts and your best reviews to your schedule. Your pages keep going even in a busy month.',
  },
  {
    q: 'Is there a contract?',
    a: 'Reviews (R1,200) and posting (R2,000) are month-to-month. The R2,500 plan is a 6-month commitment, or 12 months with the free website.',
  },
  {
    q: 'How does the money-back guarantee work?',
    a: 'It covers reviews. If we do not get you any new 5-star reviews in your first 30 days, you get your money back.',
  },
];

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

function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);
  return (
    <section id="how-it-works" ref={ref} className="dd-sec dd-demo">
      <div className="dd-container">
        <SectionHead
          eyebrow="How it works"
          title="Every review starts with one WhatsApp"
          subtitle="Your customer gets a message after the job, taps one link and the review goes up on your Google profile."
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
            <p className="hv2-demo-note">
              Posting works the same way: WhatsApp us your job photos and we do the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Real Google reviews of Local Pros, loaded live. The block keeps its height while loading.
const hasEmoji = (t: string) => /\p{Extended_Pictographic}/u.test(t);

function RealReviews() {
  const { reviews, isLoading } = useReputationReviews();
  const picked = useMemo(() => {
    const good = reviews.filter((r) => r.starRating === 5 && !hasEmoji(r.comment) && r.comment.trim().length >= 100);
    const score = (r: WidgetReview) => (/review/i.test(r.comment) ? 1000 : 0) + Math.min(r.comment.length, 260);
    return [...good].sort((a, b) => score(b) - score(a)).slice(0, 3);
  }, [reviews]);

  if (!isLoading && picked.length === 0) return null;

  return (
    <div className="hv2-real">
      <p className="hv2-real-head">What business owners say about us on Google</p>
      <div className="hv2-real-grid">
        {(isLoading ? [null, null, null] : picked).map((r, i) =>
          r ? (
            <figure key={r.id} className="hv2-real-card">
              <p className="hv2-real-who">
                <span className="hv2-ava t-c">{getInitials(r.reviewerName)}</span>
                <span>
                  <strong>{r.reviewerName}</strong>
                  <small>
                    <StarRow value={5} size={12} />{' '}
                    {new Date(r.dateAdded).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </small>
                </span>
                <GoogleG size={18} />
              </p>
              <blockquote className="hv2-real-text">{r.comment.trim()}</blockquote>
            </figure>
          ) : (
            <div key={`sk-${i}`} className="hv2-real-card is-loading" aria-hidden="true" />
          ),
        )}
      </div>
    </div>
  );
}

export default function HomeV2() {
  return (
    <div className="dd dd-a hv2">
      <Header />

      <main>
        {/* Promise, with the 90-day profile playing beside it */}
        <section className="dd-hero hv2-hero">
          <div className="dd-container hv2-hero-grid">
            <div className="dd-hero-copy">
              <h1 className="dd-kw">{HERO.keywordH1}</h1>
              <h2 className="dd-display">
                Get more <span className="dd-hl">Google reviews</span>, week after week
              </h2>
              <p className="dd-lede">
                We ask every customer for a Google review on WhatsApp when the job is done. We post your work to
                Facebook, Instagram and Google every week.
              </p>
              <div className="dd-actions">
                <WaButton className="dd-btn-primary">{HERO.primary}</WaButton>
                <a href="#first-90-days" className="dd-btn dd-btn-secondary">
                  See the first 90 days
                </a>
              </div>
              <p className="dd-hero-note">{HERO.note}</p>
            </div>
            <ProfileTimeline />
          </div>
        </section>

        {/* The problem, and what doing nothing costs */}
        <section className="dd-sec hv2-problem">
          <div className="dd-container hv2-problem-grid">
            <div>
              <p className="dd-eyebrow">The problem</p>
              <h2 className="dd-h2">Before anyone calls you, they look you up</h2>
              <div className="hv2-prose">
                <p>
                  A customer with a burst geyser searches Google and opens two or three profiles. They read the newest
                  reviews, then check Facebook to see if the business is still going.
                </p>
                <p>If your newest review is a year old and your last post is two years old, they call the next name.</p>
              </div>
            </div>
            <div className="hv2-costs">
              <p className="hv2-costs-title">What doing nothing costs you</p>
              <ol>
                {COSTS.map((c, i) => (
                  <li key={c}>
                    <span aria-hidden="true">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
              <p className="hv2-costs-foot">You never hear about these calls. That is what makes them easy to ignore.</p>
            </div>
          </div>
        </section>

        {/* The change, as a story over 90 days */}
        <section id="first-90-days" className="dd-sec hv2-story">
          <div className="dd-container">
            <SectionHead
              eyebrow="Your first 90 days"
              title="What changes, week by week"
              subtitle="We do the asking and the posting. Here is what you see happen."
            />
            <ol className="hv2-story-list">
              {STORY.map(({ when, title, we, you, Graphic }) => (
                <li key={when} className="hv2-story-item">
                  <p className="hv2-story-when">
                    <span className="hv2-story-dot" aria-hidden="true" />
                    {when}
                  </p>
                  <div className="hv2-story-copy">
                    <h3 className="dd-h3">{title}</h3>
                    <p className="hv2-story-we">
                      <strong>We do:</strong> {we}
                    </p>
                    <p className="hv2-story-you">
                      <strong>You notice:</strong> {you}
                    </p>
                  </div>
                  <div className="hv2-story-graphic">
                    <Graphic />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <HowItWorks />

        {/* Proof: our own profile on the same kind of time scale */}
        <section className="dd-sec hv2-proof-sec">
          <div className="dd-container">
            <SectionHead
              eyebrow="Proof"
              title="We did it to our own Google profile first"
              subtitle="Local Pros went from 29 reviews at 3.0 stars to 789 reviews at 4.6 stars in 18 months, using this system."
            />
            <ProofTimeline />
            <RealReviews />
          </div>
        </section>

        {/* The offer */}
        <section className="dd-sec dd-services hv2-offer">
          <div className="dd-container">
            <SectionHead
              eyebrow="The offer"
              title="Start with reviews, posting, or both"
              subtitle="Single services are month-to-month. Take both together on the R2,500 plan."
            />
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

        {/* Guarantee, signed */}
        <section className="dd-sec dd-letter hv2-guarantee">
          <div className="dd-container">
            <div className="dd-letter-in">
              <p className="dd-eyebrow hv2-center">Our guarantee</p>
              <h2 className="dd-h2">Try reviews for 30 days, or get your money back</h2>
              <div className="dd-letter-body">
                <p>If we do not get you any new 5-star reviews in your first 30 days, you get your money back.</p>
                <p>
                  Reviews and posting on their own are month-to-month, so you are never locked in. If you have a
                  question, WhatsApp me and you will get a reply from a real person.
                </p>
              </div>
              <div className="dd-sign">
                <span className="dd-sign-name">
                  Jeremy
                  <svg className="dd-sign-line" viewBox="0 0 120 14" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M2 9 C 30 3, 60 3, 88 7 S 112 11, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="dd-sign-role">Founder, Local Pros Studio</span>
              </div>
              <WaButton className="dd-btn-primary">Message Jeremy on WhatsApp</WaButton>
            </div>
          </div>
        </section>

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow="Questions" title="What business owners ask us" />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`hv2-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="dd-closing">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2">Your first 90 days start with your next job</h2>
            <p className="dd-sub">Send us a WhatsApp and we will show you how it works for your business.</p>
            <WaButton className="dd-btn-inverted">Chat to us on WhatsApp</WaButton>
            <p className="dd-closing-note">{HERO.note}</p>
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
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
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
