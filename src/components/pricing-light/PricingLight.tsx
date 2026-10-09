import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../design-directions/directions.css';
import './pricinglight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import Pricing from '../section-library/sections/Pricing';
import ClosingCard from '../section-library/sections/ClosingCard';
import SiteChat from '../demo-popup/DemoPopup';
import { openSiteChat } from '../demo-popup/openSiteChat';
import closingPhoto from '../../assets/images/review-contractor-happy.webp';

// Pricing page draft (9 Oct 2026, Jeremy's request): every service and its price, made plain that the package is the
// point, for the homepage's reason: before they call, customers check your Google reviews, your Facebook and
// Instagram, and your website, and we look after all three. Three versions of a "why it's one package" section
// (a customer path, a comparison table, the prices added up) were tried the same day; Jeremy found them too much
// and asked for a simple page with the reason lower down, said conversationally (WhyNote).
// Live on /pricing since 9 Oct 2026. Its opening is the shared price section, sections/Pricing.tsx.

const FAQ = [
  {
    q: 'Why does it cost R2,500 a month?',
    a: 'You get two services for less than the price of both, plus a free website worth R9,900 on a 12-month commitment. We can charge R2,500 because most of the repetitive work is automated, using the same system that got Local Pros over 1,400 Google reviews.',
  },
  {
    q: 'Is there a contract?',
    a: 'Yes. The package is a 6-month commitment, or 12 months if you take the free website (after that the website is yours). The R5,000 setup fee is waived on the package. Reviews (R1,200) or posts (R2,000) on their own are month to month.',
  },
  {
    q: 'Can I take just one service?',
    a: 'Yes. Google reviews is R1,200 a month and social media posts R2,000 a month, both month to month. A website on its own is R9,900 once-off, plus R290 a month for hosting.',
  },
  {
    q: 'I already have a website. Can you refresh it?',
    a: 'Yes. If yours is outdated or hard to use on a phone, we build you a new one with your services, your areas and a tap-to-call button. It’s free on the 12-month package, or R9,900 once-off on its own.',
  },
  {
    q: 'How much of my time does it take?',
    a: 'Very little. For reviews, you send us each customer’s name and number and our system does the rest. For posts, we make them for you; send us job photos on WhatsApp when you have them and we turn them into posts too.',
  },
];

const RECAP = [
  'More 5-star Google reviews',
  'Posts on Facebook and Instagram, done for you',
  'A new website, or yours refreshed',
  'All in one for R2,500 a month',
];

/* ---------- Why it's one package, said the way you'd say it to someone (Jeremy, 9 Oct: lower down, conversational) ---------- */

function WhyNote() {
  return (
    <section className="dd-sec pp-note" id="why">
      <div className="dd-container pp-note-in">
        <h2 className="dd-h2 pp-note-title">Why we look after all three</h2>
        <p>
          Think about the last time you needed someone you could trust, like a plumber or a vet. You probably Googled a
          few, read their reviews, looked at their Facebook page and opened their website.
        </p>
        <p>
          Your customers do the same with you. If one of those looks quiet or out of date, they move on to the next
          business.
        </p>
        <p className="pp-note-end">That’s why we do all three, for one monthly price.</p>
      </div>
    </section>
  );
}

/* ---------- Shared parts ---------- */

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

export default function PricingLight() {
  return (
    <div className="dd dd-a pp">
      <SiteHeader />

      <main>
        {/* The opening is the shared price section (section-library/sections/Pricing.tsx): heading beside the
            R2,500 card, single services under it. The same section is on the homepage, /reviews and /social-new. */}
        <Pricing page />

        <WhyNote />

        <section className="dd-sec pp-faq" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">About the price</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} id={`pp-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <ClosingCard
          title="Get all three looked after this month."
          items={RECAP}
          photo={closingPhoto}
          photoAlt="Contractor smiling at a new 5-star Google review on his phone"
          href={SITE_WHATSAPP_URL}
          onClick={(e) => {
            e.preventDefault();
            openSiteChat('package');
          }}
        />
      </main>

      <SiteFooter faqHref="#faq" />
      <SiteChat page="pricing" />
    </div>
  );
}
