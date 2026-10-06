import { useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './directions.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from './ReviewDemo';
import {
  WHATSAPP_URL,
  NAV,
  HERO,
  DEMO,
  SERVICES_HEAD,
  SERVICES,
  PLAN,
  TRADES_HEAD,
  TRADES,
  NOTE,
  FAQ_HEAD,
  FAQ,
  CLOSING,
  FOOTER,
} from './content';
import logoDark from '../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../assets/images/Compressed/Local Pros Studio logo transparent.png';
import heroPhoto from '../../assets/images/review-contractor-happy.webp';

// Noindex reference page for the chosen look (direction A, picked 5 October 2026).
// It shows the homepage content in the new design system until the real pages are rebuilt.
// All styling lives in directions.css, scoped under .dd-a; tokens are recorded in DESIGN-SYSTEM.md.


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

// Wraps the highlight phrase of a headline so each direction can mark it its own way
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


function DemoSection() {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);
  return (
    <section id="how-it-works" ref={ref} className="dd-sec dd-demo">
      <div className="dd-container">
        <SectionHead eyebrow={DEMO.eyebrow} title={DEMO.title} subtitle={DEMO.subtitle} />
        <div className="dd-demo-grid">
          <div className="dd-demo-phone">
            <ReviewPhone phase={phase} />
          </div>
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
        </div>
      </div>
    </section>
  );
}

export default function DesignDirections() {
  return (
    <div className="dd dd-a">
      <header className="dd-header">
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
        </div>
      </header>

      <main>
        <section className="dd-hero">
          <div className="dd-container dd-hero-grid">
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
            <div className="dd-hero-media">
              <img
                src={heroPhoto}
                alt="A contractor smiling at new 5-star Google reviews on his phone"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </section>

        <DemoSection />

        <section className="dd-sec dd-services">
          <div className="dd-container">
            <SectionHead {...SERVICES_HEAD} />
            <div className="dd-svc-list">
              {SERVICES.map((s, i) => (
                <article key={s.name} className="dd-svc">
                  <span className="dd-svc-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
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

        <section className="dd-sec dd-trades">
          <div className="dd-container">
            <SectionHead eyebrow={TRADES_HEAD.eyebrow} title={TRADES_HEAD.title} subtitle={TRADES_HEAD.subtitle} />
            <p className="dd-tags-label">{TRADES_HEAD.label}</p>
            <ul className="dd-tags">
              {TRADES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dd-sec dd-letter">
          <div className="dd-container">
            <div className="dd-letter-in">
              <h2 className="dd-h2">{NOTE.title}</h2>
              <div className="dd-letter-body">
                {NOTE.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="dd-sign">
                <span className="dd-sign-name">
                  {NOTE.name}
                  <svg className="dd-sign-line" viewBox="0 0 120 14" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M2 9 C 30 3, 60 3, 88 7 S 112 11, 118 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="dd-sign-role">{NOTE.role}</span>
              </div>
              <WaButton className="dd-btn-primary">{NOTE.cta}</WaButton>
            </div>
          </div>
        </section>

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow={FAQ_HEAD.eyebrow} title={FAQ_HEAD.title} />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`dd-faq-${i}`} />
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
