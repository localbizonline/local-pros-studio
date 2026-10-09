import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import '../design-directions/directions.css';
import '../review-versions/v4/reviewsv4.css';
import './homenewb.css';
import { NAV, NOTE, FOOTER } from '../design-directions/content';
import { SITE_WHATSAPP_URL, whatsAppLink } from '../../whatsapp';
import logoDark from '../../assets/images/Compressed/Local Pros Studio logo dark text.png';
import logoLight from '../../assets/images/Compressed/Local Pros Studio logo transparent.png';
import heroPhoto from '../../assets/images/review-contractor-happy.webp';
import reviewsImage from '../../assets/images/Reviews/review from WhatsApp to google review side by side.webp';
import socialImage from '../../assets/images/social-posting/facebook-before-after-gas-tablet.webp';
import websiteImage from '../../assets/images/portfolio/bkcpet-desktop.webp';
import ownProfileProof from '../../assets/images/Reviews/Local Pros reviews before and after.webp';
import handshake from '../../assets/images/Reviews/hero-contractor-handshake.webp';
import whyReviews from '../review-versions/v4/img/why-now-reviews-on-phone.webp';
import whySummary from '../review-versions/v4/img/why-now-ai-overview-on-phone.webp';

// Homepage draft B (light, direction A), 7 Oct 2026. Built to DESIGN-SYSTEM.md section 2, the
// positioning and page-flow rules learned from aevaai.com: the five-second test in the hero,
// proof before services, one button label, one job per section. Shown at /review-versions/home-b
// (noindex). Shares the section styles of the /reviews draft (review-versions/v4/reviewsv4.css);
// move them into shared styles if either draft goes live.

const TRY_IT_URL = whatsAppLink('DEMO: please send me the review request my customers would get');
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=local+pros#lrd=0x1efa235edd61726f:0x2d27a3ca84715414,1,,,,';

const WORKS_WITH = ['WhatsApp', 'Google Business Profile', 'Facebook', 'Instagram', 'Sage', 'QuickBooks'];

// Slots for real client results. Empty on purpose: fill with real names and counts before launch.
const CLIENT_SLOTS = 3;

const SERVICES = [
  {
    eyebrow: 'Google reviews',
    title: '5-star Google reviews after every customer',
    body: 'After every customer, we send a WhatsApp review request with a one-tap link and a reminder.',
    price: 'R1,200 a month · month-to-month',
    link: { label: 'How Google reviews work', to: '/reviews' },
    image: reviewsImage,
    alt: 'A WhatsApp review request on a phone, and the 5-star Google review it leads to',
    fit: 'center',
  },
  {
    eyebrow: 'Social media posting',
    title: 'A Facebook, Instagram and Google page that looks busy',
    body: 'WhatsApp us photos of your work. We turn them into posts and publish them every week, each one checked by a person.',
    price: 'R2,000 a month · month-to-month',
    link: { label: 'How social posting works', to: '/social-media-posting-service' },
    image: socialImage,
    alt: 'A quiet Facebook page before, and the same page with regular posts after',
    fit: 'center',
  },
  {
    eyebrow: 'Websites',
    title: 'A website that works on a phone',
    body: 'Fast and mobile-friendly, so people can call or WhatsApp you in one tap. Live in 5 to 7 working days.',
    price: 'R9,900 once-off · free on the R2,500 plan',
    link: { label: 'See website packages', to: '/website-design-package' },
    image: websiteImage,
    alt: 'The home page of BKC Pet Boarding, a website we built',
    fit: 'top',
  },
];

const STEPS = [
  {
    title: 'We set you up in about a week',
    body: 'We link your Google profile, Facebook and Instagram, and how you send invoices.',
  },
  {
    title: 'Every customer is asked for a review',
    body: 'A WhatsApp goes out after each visit or job, with a one-tap link and a reminder.',
  },
  {
    title: 'You send photos, we post',
    body: 'WhatsApp us photos when you have them. Your pages get a new post every week.',
  },
];

const IDEAL = [
  'People check you on Google before they call or book',
  'Your customers are on WhatsApp',
  'You do good work and have happy customers',
  'You can take a photo of your work now and then',
];

const NOT_IDEAL = [
  'Online-only shops with no Google Business Profile',
  'Anyone who wants bought or fake reviews. We only ask your real customers.',
  'Businesses whose customers are not on WhatsApp',
];

// Types of business it suits. Health practitioners (doctors, dentists, physios) are left out
// until we check HPCSA rules on testimonials.
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
    q: 'How is this different from doing it myself?',
    a: 'It happens every week, even when you are flat out. Every customer is asked for a review and your work keeps getting posted, so your pages never go quiet.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'A few minutes a week. Send us photos on WhatsApp when you have them; review requests run from your invoices or a quick form.',
  },
  {
    q: 'Can I trust you with my customers?',
    a: 'Yes. We only message customers you have served, the message is short and polite, and we never buy or write reviews.',
  },
  {
    q: 'Does it work with what I already use?',
    a: 'Yes: WhatsApp, your Google Business Profile, Facebook and Instagram. For reviews we connect to Sage or QuickBooks, or you BCC us on your invoice emails.',
  },
  {
    q: 'What if a customer is unhappy?',
    a: 'They can reply on the same WhatsApp, and you hear about it straight away. Calling them quickly is the best way to put it right.',
  },
  {
    q: 'Is there a contract?',
    a: 'Reviews (R1,200) and social posting (R2,000) are month-to-month, and reviews come with a 30-day money-back guarantee. The R2,500 plan for both is a 6-month commitment, or 12 months with a free website.',
  },
];

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

export default function HomeNewB() {
  return (
    <div className="dd dd-a rv4 hb">
      <p className="rv4-strip">
        <span>30-day money-back guarantee on reviews</span>
        <span aria-hidden="true">·</span>
        <span>Month-to-month</span>
        <span aria-hidden="true">·</span>
        <span>Reviews from R1,200 a month</span>
      </p>

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
        {/* Hero: what, who, why it matters, what to do next */}
        <section className="dd-hero">
          <div className="dd-container dd-hero-grid">
            <div>
              <h1 className="dd-kw">Google reviews and social media for South African businesses</h1>
              <p className="dd-display">
                Get <span className="dd-hl">Google reviews</span> and weekly posts on Facebook and Instagram
              </p>
              <p className="dd-lede">
                People check your Google reviews and Facebook page before they trust you. We ask every customer for a review on
                WhatsApp and turn your photos into posts, while you get on with the work.
              </p>
              <div className="dd-actions">
                <WaButton className="dd-btn-primary">Chat to us on WhatsApp</WaButton>
                <a href={TRY_IT_URL} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-secondary">
                  Try the review request
                </a>
              </div>
              <p className="dd-hero-note">
                <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="hb-rating">
                  <span aria-hidden="true">★★★★★</span> 4.6 from 789 Google reviews
                </a>{' '}
                · Month-to-month
              </p>
            </div>
            <div className="dd-hero-media hb-hero-media">
              <img
                src={heroPhoto}
                alt="A smiling business owner reading new Google reviews on his phone"
                width={1200}
                height={896}
              />
            </div>
          </div>
        </section>

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

        {/* Proof before services */}
        <section className="dd-sec" id="proof">
          <div className="dd-container hb-proof">
            <div className="hb-proof-copy">
              <p className="dd-eyebrow">Proof</p>
              <h2 className="dd-h2">We did it to our own Google profile first</h2>
              <p>
                Local Pros, our own business, went from 29 to 789 Google reviews in 18 months. We used the same WhatsApp system we
                now run for you.
              </p>
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="dd-link">
                Read our Google reviews
              </a>
            </div>
            <figure className="hb-proof-media">
              <img
                src={ownProfileProof}
                alt="The Local Pros Google profile: 3.0 stars from 29 reviews before, 4.6 stars from 789 reviews after"
                width={1280}
                height={832}
                loading="lazy"
              />
            </figure>
          </div>

          <div className="dd-container">
            <h3 className="dd-h3 rv4-clients-title">What business owners say</h3>
            <p className="rv4-draft-flag">
              Draft: these cards need real clients before this page goes live. Name, business, type of business and town, reviews
              before and now, and one line in their own words.
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

        {/* What we do: three services, one plan */}
        <section className="dd-sec" id="services">
          <div className="dd-container">
            <SectionHead
              eyebrow="What we do"
              title="Three things we take off your hands"
              subtitle="Take one, or reviews and posting together on the R2,500 plan."
            />
            <ul className="hb-services">
              {SERVICES.map((s) => (
                <li key={s.eyebrow} className="hb-service">
                  <div className={`hb-service-media is-${s.fit}`}>
                    <img src={s.image} alt={s.alt} loading="lazy" />
                  </div>
                  <div className="hb-service-body">
                    <p className="dd-eyebrow">{s.eyebrow}</p>
                    <h3 className="dd-h3">{s.title}</h3>
                    <p>{s.body}</p>
                    <p className="hb-service-price">{s.price}</p>
                    <Link to={s.link.to} className="dd-link">
                      {s.link.label}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hb-plan">
              <div>
                <h3 className="dd-h3">The R2,500 plan</h3>
                <p>
                  Google reviews and weekly posts together for R2,500 a month, on a 6-month commitment. Sign for 12 months and we
                  build your website free.
                </p>
              </div>
              <Link to="/pricing" className="dd-link">
                See the R2,500 plan
              </Link>
            </div>
          </div>
        </section>

        {/* Why now */}
        <section className="dd-sec dd-demo rv4-why">
          <div className="dd-container">
            <SectionHead
              eyebrow="Why it matters now"
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
              <h2 className="dd-h2 rv4-how-title">You send a WhatsApp. We do the rest.</h2>
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
            </div>
          </div>
        </section>

        {/* Fit */}
        <section className="dd-sec">
          <div className="dd-container">
            <SectionHead
              eyebrow="Is it a fit?"
              title="Built for businesses people need to trust"
              subtitle="If customers read your Google reviews before they choose you, and they are on WhatsApp, this is for you."
            />
            <div className="rv4-fit">
              <div className="rv4-fit-col">
                <h3 className="dd-h3">Ideal if</h3>
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

        {/* Personal note */}
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
                <span className="dd-sign-name">{NOTE.name}</span>
                <span className="dd-sign-role">{NOTE.role}</span>
              </div>
              <WaButton className="dd-btn-primary">Chat to us on WhatsApp</WaButton>
            </div>
          </div>
        </section>

        <section className="dd-sec dd-faq">
          <div className="dd-container">
            <SectionHead eyebrow="Questions" title="What business owners ask us" />
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`hb-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <section className="dd-closing">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2">Your next customer will check you on Google first</h2>
            <p className="dd-sub">Make sure they find recent reviews and recent work. Send us a WhatsApp to get started.</p>
            <WaButton className="dd-btn-inverted">Chat to us on WhatsApp</WaButton>
            <p className="dd-closing-note">30-day money-back guarantee on reviews · Month-to-month</p>
          </div>
        </section>
      </main>

      <footer className="dd-footer">
        <div className="dd-container">
          <div className="dd-footer-grid">
            <div>
              <img src={logoLight} alt="Local Pros Studio" width={159} height={36} className="dd-footer-logo" />
              <p>Google reviews, social media posting and websites for South African businesses people need to trust.</p>
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
