import { Check } from 'lucide-react';
import '../../design-directions/directions.css';
import './pricing.css';
import { openSiteChat, type ChatPlan } from '../../demo-popup/openSiteChat';

// Price section (8 Oct 2026, option A of three; Jeremy's request to make it plain that people can
// take the package or pick one service). The package card comes first: reviews and weekly posts,
// with the new website as an optional extra, free on a 12-month commitment, for anyone without a
// website or whose website needs a refresh. Then each service on its own. Prices checked against
// the live pages on 8 Oct 2026. Used on the join page; change it here only.
// "Start now" buttons (8 Oct 2026, Jeremy's request) go through the site chat's openSiteChat with the
// plan picked. The homepage doesn't render <SiteChat /> yet (Jeremy: WhatsApp for now), so they open
// WhatsApp; adding <SiteChat page="home" /> to the page switches them to the chat.

export type Plan = ChatPlan;

const startPlan = (plan: Plan) => openSiteChat(plan);

const SINGLES: { plan: Plan; name: string; price: string; unit: string; line: string; terms: string }[] = [
  {
    plan: 'reviews',
    name: 'Google reviews',
    price: 'R1,200',
    unit: 'a month',
    line: 'A review request after every job, with a reminder if they forget.',
    terms: 'Month to month. 30-day money-back guarantee.',
  },
  {
    plan: 'social',
    name: 'Social media posts',
    price: 'R2,000',
    unit: 'a month',
    line: 'A new post every week on Facebook, Instagram and Google.',
    terms: 'Month to month.',
  },
  {
    plan: 'website',
    name: 'Website',
    price: 'R9,900',
    unit: 'once-off',
    line: 'A new website, or yours refreshed. Live in 5 to 7 working days.',
    terms: 'Plus R290 a month for hosting.',
  },
];

const PACKAGE_ITEMS = [
  'A Google review request to every customer, with reminders',
  'Replies to your reviews, written for you',
  'A new Facebook and Instagram post every week',
  'Your best reviews posted on Facebook and Instagram',
  'Free setup, normally R5,000, on a 6-month commitment',
];

export default function Pricing() {
  return (
    <section id="pricing" className="dd dd-a dd-sec pr">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">What it costs</p>
          <h2 className="dd-h2">Take the full package, or pick one service</h2>
          <p className="dd-sub">
            Customers check your reviews, your Facebook and your website before they get in touch. The package looks after all three.
          </p>
        </div>
        <div className="pr-a">
          <div className="pr-package">
            <p className="pr-badge">Best value</p>
            <h3 className="pr-package-name">The full package</h3>
            <p className="pr-package-line">Google reviews and weekly social media posts, done for you.</p>
            <p className="pr-price">
              <strong>R2,500</strong> <span>a month</span>
            </p>
            <p className="pr-save">R700 a month less than reviews and posts on their own.</p>
            <ul className="pr-ticks">
              {PACKAGE_ITEMS.map((t) => (
                <li key={t}>
                  <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="pr-addon">
              <p className="pr-addon-tag">Optional</p>
              <p className="pr-addon-name">
                A new website, free <span>Worth R9,900</span>
              </p>
              <p className="pr-addon-line">
                No website, or yours needs a refresh? Add one on a 12-month commitment and we build it at no extra cost. Hosting is
                included while you're on the package, and after 12 months the website is yours.
              </p>
            </div>
            <button type="button" className="dd-btn dd-btn-primary pr-btn" onClick={() => startPlan('package')}>
              Start now
            </button>
            <p className="pr-terms">6-month commitment, or 12 months if you add the website. A real person replies on WhatsApp.</p>
          </div>
          <div className="pr-a-singles">
            <p className="pr-or">Or one service on its own</p>
            {SINGLES.map((s) => (
              <div key={s.name} className="pr-single">
                <h3 className="pr-single-name">{s.name}</h3>
                <p className="pr-single-price">
                  <strong>{s.price}</strong> <span>{s.unit}</span>
                </p>
                <p className="pr-single-line">{s.line}</p>
                <p className="pr-terms">{s.terms}</p>
                <button type="button" className="pr-start" onClick={() => startPlan(s.plan)}>
                  Start with {s.name.toLowerCase()}
                </button>
              </div>
            ))}
            <p className="pr-terms">Start with one and add the rest later.</p>
          </div>
        </div>
        <p className="pr-guarantee">30-day money-back guarantee on reviews.</p>
      </div>
    </section>
  );
}
