import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './reviewsv4.css';
import { NAV, FOOTER } from '../../design-directions/content';
import { SITE_WHATSAPP_URL, whatsAppLink } from '../../../whatsapp';
import logoDark from '../../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';
import ownProfileProof from '../../../assets/images/Reviews/Local Pros reviews before and after.webp';
import whatsappToReview from '../../../assets/images/Reviews/review from WhatsApp to google review side by side.webp';
import handshake from '../../../assets/images/Reviews/hero-contractor-handshake.webp';
import tradeResults from '../../../assets/images/Reviews/tile-3x2-review-transformation.webp';
import whyReviews from './img/why-now-reviews-on-phone.webp';
import whySummary from './img/why-now-ai-overview-on-phone.webp';

// Reviews page version 4: "Ask every customer" (7 Oct 2026). Applies what works on aevaai.com:
// say what it is and who it is for in the headline, let visitors try it on the first screen,
// proof from real businesses, a "works with" strip, a pays-for-itself calculator and a plain
// "ideal for / not ideal for". The audience is any business people have to trust, with a Google
// Business Profile and customers on WhatsApp, not only trades (Jeremy, 7 Oct 2026). Unlike the
// live /reviews page, every customer gets the same Google link (no filtering out unhappy
// customers, which Google does not allow).

const PRICE = 1200;

// The "try it" door: someone has to answer these chats until the WhatsApp bot does it
const TRY_IT_URL = whatsAppLink('DEMO: please send me the review request my customers would get');

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

const WaButton = ({ children, className, href = SITE_WHATSAPP_URL }: { children: ReactNode; className: string; href?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`dd-btn ${className}`}>
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

const WORKS_WITH = ['WhatsApp', 'Google Business Profile', 'Sage', 'QuickBooks', 'Your invoice emails'];

const STEPS = [
  {
    title: 'You finish the work',
    body: 'We pick it up from your Sage or QuickBooks invoices, a BCC on your invoice email, or a quick form.',
  },
  {
    title: 'Your customer gets a WhatsApp',
    body: 'It thanks them for choosing you and asks for a Google review. One tap opens your Google profile, ready to rate.',
  },
  {
    title: 'A reminder if they forget',
    body: 'Busy people mean to leave a review and forget. A friendly reminder gets it done.',
  },
];

// Slots for real client results. Empty on purpose: fill with real names and counts before launch.
const CLIENT_SLOTS = 6;

const IDEAL = [
  'Service businesses whose customers check Google before they pick who to trust',
  'Businesses with a Google Business Profile and customers on WhatsApp',
  'Owners who want every customer asked, not only the ones they remember',
  'One-person businesses up to teams with several branches',
];

const NOT_IDEAL = [
  'Businesses with only a handful of customers a year',
  'Online-only shops with no Google Business Profile',
  'Anyone who wants bought or fake reviews. We only ask your real customers.',
  'Businesses whose customers are not on WhatsApp',
];

// Types of business it suits, grouped so visitors find themselves. Health practitioners (doctors,
// dentists, physios) are left out until we check HPCSA rules on testimonials.
const BUSINESS_GROUPS = [
  {
    name: 'Home services',
    items: ['Plumbers', 'Electricians', 'Solar installers', 'Pest control', 'Pool cleaners', 'Cleaning services', 'Movers', 'Security companies'],
  },
  { name: 'Pets', items: ['Pet shippers', 'Vets', 'Dog groomers', 'Kennels and catteries', 'Dog trainers'] },
  {
    name: 'Professional services',
    items: ['Accountants', 'Attorneys', 'Estate agents', 'Financial advisers', 'Insurance brokers', 'Immigration consultants'],
  },
  { name: 'Beauty and fitness', items: ['Beauty salons', 'Hairdressers', 'Nail bars', 'Spas', 'Personal trainers'] },
  { name: 'Cars, travel and learning', items: ['Mechanics', 'Panel beaters', 'Driving schools', 'Tutors', 'Guest houses', 'Tour operators'] },
];

const FAQ = [
  {
    q: 'How is this different from asking customers myself?',
    a: 'It happens after every customer, not only when you remember. Each customer gets a one-tap link and a reminder on WhatsApp, which people actually open.',
  },
  {
    q: 'Is this allowed by Google?',
    a: 'Yes. We only ask your real customers, every customer gets the same link, and we never buy or write reviews.',
  },
  {
    q: 'What if a customer is unhappy?',
    a: 'They can reply on the same WhatsApp, and you hear about it straight away. Calling them quickly is the best way to put it right.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'Almost none once it is set up. Setup takes about a week, then each customer comes through from your invoices or a quick form.',
  },
  {
    q: 'How do you know when to ask a customer?',
    a: 'If you use Sage or QuickBooks, we connect to it and pick up each new invoice. If not, BCC us on your invoice emails or fill in a quick form.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. Google reviews is R1,200 a month, month-to-month. If no new 5-star reviews come in during your first 30 days, you get your money back.',
  },
];

const rand = (n: number) => `R${n.toLocaleString('en-ZA').replace(/\s/g, ',')}`;

function Header() {
  return (
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
  );
}

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

function Calculator() {
  const [customers, setCustomers] = useState(30);
  const [spend, setSpend] = useState(2500);

  const asked = customers * 6;
  const perMonth = PRICE / spend;
  const payback =
    perMonth >= 1
      ? `${Math.ceil(perMonth)} extra customer${Math.ceil(perMonth) > 1 ? 's' : ''} a month`
      : Math.floor(spend / PRICE) === 1
        ? '1 extra customer a month'
        : `1 extra customer every ${Math.floor(spend / PRICE)} months`;

  return (
    <div className="rv4-calc">
      <div className="rv4-calc-inputs">
        <label className="rv4-slider">
          <span className="rv4-slider-top">
            <span>Customers you serve a month</span>
            <strong>{customers}</strong>
          </span>
          <input type="range" min={5} max={200} step={5} value={customers} onChange={(e) => setCustomers(Number(e.target.value))} />
        </label>
        <label className="rv4-slider">
          <span className="rv4-slider-top">
            <span>What a customer spends, on average</span>
            <strong>{rand(spend)}</strong>
          </span>
          <input
            type="range"
            min={500}
            max={20000}
            step={500}
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="rv4-calc-out" aria-live="polite">
        <div>
          <p className="rv4-calc-big">{asked.toLocaleString('en-ZA').replace(/\s/g, ',')}</p>
          <p>customers asked for a Google review in your first 6 months</p>
        </div>
        <div>
          <p className="rv4-calc-big">{payback}</p>
          <p>is all it takes to cover {rand(PRICE)} a month</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsV4() {
  return (
    <div className="dd dd-a rv4">
      <p className="rv4-strip">
        <span>Google reviews from R1,200 a month</span>
        <span aria-hidden="true">·</span>
        <span>Month-to-month</span>
        <span aria-hidden="true">·</span>
        <span>Money back if no new 5-star reviews in 30 days</span>
      </p>
      <Header />

      <main>
        {/* Hero: what it is, who it is for, and a way to try it now */}
        <section className="dd-hero">
          <div className="dd-container dd-hero-grid">
            <div>
              <h1 className="dd-kw">Google review service for South African businesses</h1>
              <p className="dd-display">
                Get <span className="dd-hl">5-star Google reviews</span> from every happy customer
              </p>
              <p className="dd-lede">
                People check your Google reviews before they trust you with their home, their pet or their money. We WhatsApp
                every customer a review request when the work is done, with a one-tap link and a reminder.
              </p>
              <div className="dd-actions">
                <WaButton className="dd-btn-primary" href={TRY_IT_URL}>
                  Try it: get the WhatsApp your customer gets
                </WaButton>
                <a href="#proof" className="dd-btn dd-btn-secondary">
                  See our results
                </a>
              </div>
              <p className="dd-hero-note">Month-to-month · 30-day money-back guarantee</p>
            </div>
            <div className="dd-hero-media rv4-hero-media">
              <img
                src={whatsappToReview}
                alt="A WhatsApp review request on a phone, and the 5-star Google review it leads to"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </section>

        {/* Works with: the tools they already use, as plain words (no guessed logos) */}
        <section className="rv4-works" aria-label="Works with">
          <div className="dd-container rv4-works-in">
            <p className="dd-tags-label">Works with what you already use</p>
            <ul>
              {WORKS_WITH.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proof from the same kind of business */}
        <section className="dd-sec rv4-proof" id="proof">
          <div className="dd-container">
            <SectionHead
              eyebrow="Proof"
              title="We did it to our own Google profile first"
              subtitle="Local Pros, our own business, went from 29 to 789 Google reviews with the same WhatsApp system."
            />
            <figure className="rv4-own">
              <img
                src={ownProfileProof}
                alt="The Local Pros Google profile: 3.0 stars from 29 reviews before, 4.6 stars from 789 reviews after"
                width={1280}
                height={832}
                loading="lazy"
              />
            </figure>

            {/* "Real Results" from the live /reviews page, kept at Jeremy's request (7 Oct 2026) */}
            <div className="rv4-results">
              <p className="dd-eyebrow">Real results</p>
              <h3 className="dd-h3">The same system, across six kinds of business</h3>
              <p>Google review counts before, and 90 days after, for plumbing, roofing, electrical, landscaping, cleaning and air conditioning businesses.</p>
              <img
                src={tradeResults}
                alt="Google review counts before and after 90 days: plumbing 12 to 89, roofing 3 to 52, air conditioning 8 to 65, electrical 15 to 110, landscaping 5 to 44, cleaning 9 to 78"
                width={1600}
                height={1073}
                loading="lazy"
              />
            </div>

            <h3 className="dd-h3 rv4-clients-title">What business owners say</h3>
            <p className="rv4-draft-flag">
              Draft: these cards need real clients before this page goes live. Name, business, type of business and town, reviews before
              and now, and one line in their own words.
            </p>
            <ul className="rv4-clients">
              {Array.from({ length: CLIENT_SLOTS }, (_, i) => (
                <li key={i} className="rv4-client is-empty">
                  <p className="rv4-client-count">
                    <span>__ reviews</span>
                    <span aria-hidden="true">→</span>
                    <strong>__ reviews</strong>
                  </p>
                  <p className="rv4-client-quote">"One line from the client, in their own words."</p>
                  <p className="rv4-client-who">
                    <strong>Name Surname</strong>
                    <span>Business name · Type of business, Town</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why now: Google sums up a business from its reviews. Images made for this page (7 Oct 2026),
            showing a made-up business, Mokoena Plumbing. */}
        <section className="dd-sec dd-demo rv4-why">
          <div className="dd-container">
            <SectionHead
              eyebrow="Why reviews matter now"
              title="Google now tells people who to call"
              subtitle="Search for a plumber, a vet or an accountant on your phone and Google often answers first, with a short summary of who to call. That summary is built from what customers say in their reviews."
            />
            <div className="rv4-why-grid">
              <figure>
                <img
                  src={whyReviews}
                  alt="A phone showing recent 5-star reviews for a plumbing business, with the words on time, fair quote, tidy work and fast call-out highlighted"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <figcaption>
                  <span className="rv4-why-num">1</span>
                  <span>
                    <strong>Your customers write reviews</strong>
                    They mention what stood out: on time, a fair quote, tidy work.
                  </span>
                </figcaption>
              </figure>
              <figure>
                <img
                  src={whySummary}
                  alt="A phone showing a Google AI Overview for plumber near me, recommending the same plumbing business for fast call-outs and tidy work"
                  width={1200}
                  height={900}
                  loading="lazy"
                />
                <figcaption>
                  <span className="rv4-why-num">2</span>
                  <span>
                    <strong>Google repeats them to the next customer</strong>
                    The summary uses the same words, and names the business to call.
                  </span>
                </figcaption>
              </figure>
            </div>
            <p className="rv4-why-close">
              Your website says what you do. <span>Your reviews decide whether Google recommends you.</span>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="dd-sec" id="how-it-works">
          <div className="dd-container rv4-how">
            <div className="rv4-how-media">
              <img
                src={handshake}
                alt="A service provider shaking hands with a happy customer at her front door"
                width={1600}
                height={1195}
                loading="lazy"
              />
            </div>
            <div>
              <p className="dd-eyebrow">How it works</p>
              <h2 className="dd-h2 rv4-how-title">A review request after every customer</h2>
              <ol className="rv4-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="rv4-step-num">{i + 1}</span>
                    <div>
                      <h3 className="dd-h3">{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="rv4-how-note">
                Every customer gets the same Google link. If something went wrong, they can reply on the same WhatsApp and you
                hear about it straight away.
              </p>
            </div>
          </div>
        </section>

        {/* Pays for itself */}
        <section className="dd-sec rv4-calc-sec">
          <div className="dd-container">
            <SectionHead
              eyebrow="Your numbers"
              title="See what it takes to pay for itself"
              subtitle="Move the sliders to match your business."
            />
            <Calculator />
          </div>
        </section>

        {/* Who it suits, and who it does not */}
        <section className="dd-sec">
          <div className="dd-container">
            <SectionHead
              eyebrow="Is it a fit?"
              title="Built for businesses people need to trust"
              subtitle="If customers read your Google reviews before they choose you, and they are on WhatsApp, this is for you."
            />
            <div className="rv4-fit">
              <div className="rv4-fit-col">
                <h3 className="dd-h3">Ideal for</h3>
                <ul>
                  {IDEAL.map((t) => (
                    <li key={t}>
                      <Check size={20} aria-hidden="true" className="rv4-fit-yes" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rv4-fit-col">
                <h3 className="dd-h3">Not ideal for</h3>
                <ul>
                  {NOT_IDEAL.map((t) => (
                    <li key={t}>
                      <X size={20} aria-hidden="true" className="rv4-fit-no" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="dd-tags-label rv4-tags-label">Works well for</p>
            <div className="rv4-groups">
              {BUSINESS_GROUPS.map((g) => (
                <div key={g.name} className="rv4-group">
                  <p className="rv4-group-name">{g.name}</p>
                  <ul className="dd-tags">
                    {g.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="dd-sec rv4-price-sec">
          <div className="dd-container">
            <SectionHead eyebrow="Price" title="One price, no contract" />
            <div className="rv4-price">
              <div>
                <h3 className="dd-h3">Google reviews</h3>
                <p className="rv4-price-big">
                  <strong>R1,200</strong> <span>a month</span>
                </p>
                <ul>
                  <li>A WhatsApp review request after every customer</li>
                  <li>One-tap link to your Google profile, and a reminder</li>
                  <li>Set up in about a week</li>
                  <li>Month-to-month, with a 30-day money-back guarantee</li>
                </ul>
              </div>
              <WaButton className="dd-btn-primary">Chat to us on WhatsApp</WaButton>
            </div>
            <p className="rv4-price-plan">
              Want weekly social posts too? The R2,500 plan adds them, on a 6-month commitment.{' '}
              <Link to="/pricing" className="dd-link">
                See the R2,500 plan
              </Link>
            </p>
          </div>
        </section>

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow="Questions" title="What business owners ask us" />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`rv4-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="dd-closing">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2">Get 5-star Google reviews, starting with your next customer</h2>
            <p className="dd-sub">Send us a WhatsApp and we will show you how it works for your business.</p>
            <WaButton className="dd-btn-inverted">Chat to us on WhatsApp</WaButton>
            <p className="dd-closing-note">Month-to-month · 30-day money-back guarantee</p>
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
        </div>
      </footer>
    </div>
  );
}
