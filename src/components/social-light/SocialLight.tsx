import { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import '../design-directions/directions.css';
import '../section-library/sections/pricing.css';
import '../section-library/sections/proofblocks.css';
import '../section-library/sections/proofsection.css';
import './sociallight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import FitCheck from '../section-library/sections/FitCheck';
import ClosingCard from '../section-library/sections/ClosingCard';
import { PostCard } from '../section-library/sections/ProofBlocks';
import { PROOF_AS_OF, PROOF_NUMBERS, WALL_POSTS, type ClientPost } from '../section-library/sections/clientProof';
import SiteChat from '../demo-popup/DemoPopup';
import { openSiteChat } from '../demo-popup/openSiteChat';
// Photos made for this page on 9 Oct 2026 in the reviews page's over-the-shoulder style (FAL): a pool contractor
// at a finished pool, looking at the post of that same pool; a baker photographing a cake (the job photo that
// becomes a post), so the page reads as any business people look up, not only trades.
import heroWide from './img/hero-wide.webp';
import heroPhone from './img/hero-phone.webp';
import closingPhoto from './img/closing-baker.webp';
// The homepage's picture for this service ("What we do", ServiceRows): job photos going into our post creator
import whatWeDo from '../../assets/images/social-posting/Closeup phone using post creator.webp';
// From the old social page, in the photographic before/after style Jeremy prefers (DESIGN-SYSTEM.md section 3)
import beforeAfter from '../../assets/images/social-posting/facebook-before-after-gas-tablet.webp';
// Real posts from one client's Facebook page (Armour Fencing): a job, a public holiday, a new year post
import armourJob from '../../assets/images/social-posting/social-post-fencing-carport-job.webp';
import armourHoliday from '../../assets/images/social-posting/social-post-fencing-holiday.webp';
import armourNewYear from '../../assets/images/social-posting/social-post-fencing-new-year.webp';

// The social media posting page in the light look (9 Oct 2026), built from scratch on the 3 to 9 Oct sessions:
// - page flow and the five-second test from DESIGN-SYSTEM.md section 2 (one page sells one thing: social posts)
// - the homepage's and /reviews page's opening: literal headline, one main action, WhatsApp and price as small links.
//   The main action is a "Get started" button that opens the chat (the Google search box read like a directory
//   search on this page, Jeremy 9 Oct); the chat saves the lead the moment a business is picked
// - proof early, from real SP2 posts and numbers (clientProof.ts), never typed by hand
// - never a posting frequency (Jeremy, 8 Oct): posts are made for you, made from your photos, or posted yourself
// - how the product really works, checked in social-posting-v2 on 9 Oct: our team makes service, tip and
//   public holiday posts and checks each one before it goes out; clients WhatsApp job photos with a line about
//   the job and get a post for each platform in their branding, plus a short video when they send a few
//   photos; posts go to Facebook, Instagram and the Google profile; the owner gets a report on WhatsApp.

// The three ways posts get made, in the homepage's words (ServiceRows, 8 Oct)
const WHAT_WE_DO = [
  'We make posts for you: tips, your services and public holidays.',
  'Send us photos of your work on WhatsApp and we turn them into posts.',
  'Or post yourself from our system, to all three at once.',
];

// The owner's part first, then ours
const STEPS = [
  {
    title: 'Tell us about your business',
    body: 'Fill in one short form with your services, logo and colours. We connect your Facebook, Instagram and Google profile for you.',
  },
  {
    title: 'We make and publish your posts',
    body: 'Tips, your services and public holidays, in your branding. Our team checks every post before it goes out.',
  },
  {
    title: 'WhatsApp us job photos',
    body: 'Send photos with a line about the job, whenever you have them. We write the post. Send a few and we make a short video too.',
  },
];

// What they get, said as benefits (as on the /reviews page)
const INCLUDED = [
  'Posts made for you: tips, services and public holidays',
  'Your job photos turned into posts, in your branding',
  'Published on Facebook, Instagram and your Google profile',
  'A report on WhatsApp of what went out',
];

// The objections every FAQ answers (DESIGN-SYSTEM.md section 2), each answered in its first sentence
const FAQ = [
  {
    q: 'How is this different from posting myself?',
    a: 'You don’t have to think of what to post, write it, or design it. We make posts for you, turn your job photos into posts, and publish them on all three platforms in your branding.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'A few minutes to fill in your business details at the start. After that, WhatsApp us photos of your work when you have them. The rest is done for you.',
  },
  {
    q: 'Do I see the posts before they go out?',
    a: 'Our team checks every post before it’s published, and you can see them all in your dashboard. If something isn’t right, ask for a change and it’s held back until it’s fixed.',
  },
  {
    q: 'What if I don’t have many job photos?',
    a: 'That’s fine. We make posts for you without your photos: tips for your customers, posts about your services and public holiday posts. Your job photos are extra.',
  },
  {
    q: 'Which platforms do you post to?',
    a: 'Facebook, Instagram and your Google Business Profile. We write each post to suit the platform, so your Google posts are short and local.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. Social media posting is R2,000 a month, month to month.',
  },
];

const RECAP = [
  'Posts made for you, in your branding',
  'Your job photos turned into posts',
  'On Facebook, Instagram and Google',
  'R2,000 a month, month to month',
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

// A tapped post opens full size (the homepage proof section's lightbox styles)
function PostLightbox({ post, onClose }: { post: ClientPost | null; onClose: () => void }) {
  if (!post) return null;
  return (
    <div className="prf-lightbox" role="dialog" aria-modal="true" aria-label={post.caption} onClick={onClose}>
      <button type="button" className="prf-lightbox-close" onClick={onClose} aria-label="Close">
        <X size={22} />
      </button>
      <div className="prf-lightbox-body" onClick={(e) => e.stopPropagation()}>
        <img src={post.img} alt={post.caption} />
      </div>
    </div>
  );
}

export default function SocialLight() {
  const n = PROOF_NUMBERS;
  const [openPost, setOpenPost] = useState<ClientPost | null>(null);

  return (
    <div className="dd dd-a sol">
      {/* The offer in one line above everything (DESIGN-SYSTEM.md page flow, step 1) */}
      <p className="sol-strip">
        <span className="sol-strip-extra">
          Facebook, Instagram and Google <span aria-hidden="true">·</span>{' '}
        </span>
        <strong>R2,000 a month, month to month</strong>
      </p>
      <SiteHeader pricingHref="#pricing" />

      <main>
        {/* HERO: what (social media posts), who (people look you up), why (a quiet page looks closed), and one
            action: find your business on Google, as on the homepage and /reviews */}
        <section className="sol-hero">
          <div className="dd-container">
            <h1 className="dd-kw sol-kw">Social media posting service</h1>
            <p className="sol-title">
              Your <span className="sol-u">social media posts</span>, made and published for you.
            </p>
            <p className="sol-lede">
              People check your Facebook before they call, and a quiet page looks closed. We make your posts and publish
              them on Facebook, Instagram and Google.
            </p>
            {/* One plain button, not the Google search box: on this page "Find my business" read like a directory
                search (Jeremy, 9 Oct). The chat it opens asks for the business on Google and saves the lead on pick. */}
            <div className="sol-cta">
              <button type="button" className="dd-btn dd-btn-primary sol-cta-btn" onClick={() => openSiteChat('social')}>
                Get started
              </button>
              <p className="sol-cta-note">Tell us your business name and we’ll WhatsApp you to set it up.</p>
              <p className="sol-or">
                Or{' '}
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>{' '}
                · <a href="#pricing">See what it costs</a>
              </p>
            </div>
            <figure className="sol-media">
              <picture>
                <source media="(max-width: 767px)" srcSet={heroPhone} width={896} height={672} />
                <img
                  src={heroWide}
                  alt="Over his shoulder: a pool contractor beside a pool he has just cleaned, smiling at a post of that same pool on his phone"
                  width={1584}
                  height={672}
                />
              </picture>
              {/* A real number with its source (DESIGN-SYSTEM.md section 2, Proof) */}
              <figcaption className="sol-badge">
                <strong>{n.postsLast30Days}</strong>
                <span>
                  posts published for our clients in the last 30 days
                  <small>From our posting system, {PROOF_AS_OF}</small>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* WHAT WE DO: the service in very simple terms, straight under the hero (as on /reviews) */}
        <section className="dd-sec sol-what" id="what-we-do">
          <div className="dd-container sol-what-grid">
            <div>
              <p className="dd-eyebrow">What we do</p>
              <h2 className="dd-h2 sol-what-title">We keep your Facebook, Instagram and Google busy.</h2>
              <p className="sol-what-lede">Your posts get made three ways:</p>
              <ul className="pr-ticks sol-what-list">
                {WHAT_WE_DO.map((t) => (
                  <li key={t}>
                    <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <img
              className="sol-what-img"
              src={whatWeDo}
              alt="A business owner's hands on a phone, adding job photos to our post creator"
              width={1120}
              height={960}
              loading="lazy"
            />
          </div>
        </section>

        {/* PROOF, EARLY: real posts and numbers from SP2 before any explaining (Aeva lesson, 7 Oct) */}
        <section className="dd-sec sol-proof" id="results">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Real posts</p>
              <h2 className="dd-h2">Posts we made for our clients</h2>
              <p className="dd-sub">{n.postsLast30Days} posts published for our clients in the last 30 days.</p>
            </div>
            <div className="pb-post-grid">
              {WALL_POSTS.slice(0, 8).map((p) => (
                <PostCard key={p.slug} p={p} onOpen={setOpenPost} />
              ))}
            </div>
            <p className="sol-source">From our posting system, {PROOF_AS_OF}. Tap a post to see it full size.</p>
          </div>
        </section>

        {/* WHY IT MATTERS: one before/after picture beside two reasons, then the homepage's closing line */}
        <section className="dd-sec sol-why">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Why it matters</p>
              <h2 className="dd-h2">A busy page tells people you’re open</h2>
              <p className="dd-sub">People look you up before they call. Your last post says a lot.</p>
            </div>
            <div className="sol-why-grid">
              <img
                src={beforeAfter}
                alt="Before and after: a gas installer's Facebook page with two old posts, then the same page with recent job, tip and team posts"
                width={1024}
                height={1024}
                loading="lazy"
              />
              <ol className="sol-why-list">
                <li>
                  <span className="sol-why-num">1</span>
                  <span>
                    <strong>Your customers check your page.</strong> Recent posts of real jobs show you’re open, busy and
                    good at what you do. A last post from 2021 makes them wonder.
                  </span>
                </li>
                <li>
                  <span className="sol-why-num">2</span>
                  <span>
                    <strong>Google shows your posts too.</strong> Your latest posts appear on your Google profile, beside
                    your reviews and photos, when someone searches for you.
                  </span>
                </li>
              </ol>
            </div>
            {/* Jeremy's line from the homepage reputation path (8 Oct) */}
            <p className="sol-why-close">
              They check your competitors the same way. <span>Make sure you’re the one they pick.</span>
            </p>
          </div>
        </section>

        {/* HOW IT WORKS: the dark band, three steps beside one client's real posts fanned out */}
        <section className="sol-how" id="how-it-works">
          <div className="dd-container sol-how-grid">
            <div>
              <p className="dd-eyebrow">How it works</p>
              <h2 className="dd-h2 sol-how-title">Your part takes a few minutes</h2>
              <ol className="sol-steps">
                {STEPS.map((s, i) => (
                  <li key={s.title}>
                    <span className="sol-step-num">{i + 1}</span>
                    <span>
                      <strong>{s.title}</strong>
                      {s.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="sol-fan">
              <div className="sol-fan-posts">
                <img src={armourHoliday} alt="Armour Fencing's Facebook post for the Day of Goodwill" width={1040} height={1212} loading="lazy" />
                <img src={armourJob} alt="Armour Fencing's Facebook post about a carport installation in Johannesburg" width={800} height={1040} loading="lazy" />
                <img src={armourNewYear} alt="Armour Fencing's Happy New Year post on Facebook" width={1040} height={1202} loading="lazy" />
              </div>
              <figcaption>One client’s page: a public holiday post, a job from their photos, and a new year post.</figcaption>
            </figure>
          </div>
        </section>

        {/* WHO IT'S FOR: the shared fit section with this service's lists */}
        <FitCheck
          goodFit={[
            'People look you up before they call or book',
            'You do work worth showing, or services worth explaining',
            'You’d rather not spend your evenings making posts',
          ]}
          notAFit={[
            'You only sell online, with no local customers',
            'You want trending videos and influencer content',
            'You don’t want your business on Facebook or Instagram',
          ]}
        />

        {/* PRICE: one card with everything included, and the package as the next step up (as on /reviews) */}
        <section className="dd-sec sol-price" id="pricing">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">What it costs</p>
              <h2 className="dd-h2">One price, month to month</h2>
            </div>
            <div className="sol-price-grid">
              <div className="pr-package sol-card">
                <h3 className="pr-package-name">Social media posts</h3>
                <p className="pr-price">
                  <strong>R2,000</strong> <span>a month</span>
                </p>
                <ul className="pr-ticks">
                  {INCLUDED.map((t) => (
                    <li key={t}>
                      <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
                <button type="button" className="dd-btn dd-btn-primary pr-btn" onClick={() => openSiteChat('social')}>
                  Start now
                </button>
                <p className="pr-terms">Month to month.</p>
              </div>
              <div className="sol-upsell">
                <p className="pr-or">Want more Google reviews too?</p>
                <div className="pr-single">
                  <h3 className="pr-single-name">Reviews + social media posts</h3>
                  <p className="pr-single-price">
                    <strong>R2,500</strong> <span>a month</span>
                  </p>
                  <p className="pr-single-line">
                    We also WhatsApp your customers for Google reviews and post your best reviews. Add a new website, free,
                    on a 12-month commitment.
                  </p>
                  <p className="pr-terms">6-month commitment.</p>
                  <button type="button" className="pr-start" onClick={() => openSiteChat('package')}>
                    Start with the full package
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="dd-sec sol-faq" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">What business owners ask us</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`sol-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING: the shared closing card; the button opens the chat first, so the lead is saved (as on /reviews) */}
        <ClosingCard
          title="Get your social media posts started this month."
          items={RECAP}
          photo={closingPhoto}
          photoAlt="Over her shoulder: a baker taking a photo of a finished celebration cake on her counter"
          href={SITE_WHATSAPP_URL}
          onClick={(e) => {
            e.preventDefault();
            openSiteChat('social');
          }}
        />
      </main>

      <SiteFooter pricingHref="#pricing" faqHref="#faq" />

      <PostLightbox post={openPost} onClose={() => setOpenPost(null)} />

      {/* The site chat: "Get started" and "Start now" open it with social media posts picked; it saves the lead to
          Airtable the moment a business is picked. It never opens by itself here. */}
      <SiteChat page="social" />
    </div>
  );
}
