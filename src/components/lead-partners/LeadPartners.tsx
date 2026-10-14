import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import '../design-directions/directions.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import { DECISIONS, type Decision, type DecisionKey } from './decisions';

// Unlisted reference page for Local Pros lead partners (trades businesses who buy leads per lead) moving onto the
// R2,500 Local Pros Studio package (14 Oct 2026, Jeremy). The swipe-through walkthrough and every follow-up WhatsApp
// link here; nothing else on the site does. Kept out of Google (noindex, nofollow) and the sitemap by seo.ts.
// Logo-only header and short footer, like the ad pages, so readers stay on the page. Copy is Jeremy's, as written.
// Undecided wording lives in decisions.ts and shows as a yellow "To confirm:" highlight. Styles in leadpartners.css.

const WHATSAPP_URL = whatsAppLink(WHATSAPP_MESSAGES.leadPartners);
const PHONE = '083 233 6716';

// An undecided piece of copy: the final wording once it's filled in, a visible highlight until then
function D({ k }: { k: DecisionKey }) {
  const d: Decision = DECISIONS[k];
  if (d.value && !d.flag) return <>{d.value}</>;
  return (
    <mark className="lp-confirm">
      {d.value && <>{d.value} </>}
      <strong className="lp-confirm-label">To confirm:</strong> {d.note}
    </mark>
  );
}

function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`dd-btn dd-btn-primary ${className}`}>
      WhatsApp Tyran
    </a>
  );
}

const SHORT_VERSION: { label: string; text: ReactNode }[] = [
  {
    label: 'What stays the same',
    text: 'Your leads keep coming through to you, the way they do now. Same people looking after you. Same WhatsApp number.',
  },
  {
    label: 'What changes',
    text: (
      <>
        You stop paying for leads separately. From <D k="switchDate" />, your leads are part of one monthly package.
      </>
    ),
  },
  {
    label: 'The package',
    text: 'Local Pros Studio: reviews on your Google profile, posts on your Facebook and Instagram every week, and a new website if you need one. Your leads are included at no extra cost.',
  },
  { label: 'The price', text: 'R2,500 a month. Setup is free (normally R5,000).' },
  {
    label: 'What you need to do',
    text: (
      <>
        Let us know by <D k="replyByDate" />. We’ll set everything up with you in about 30 minutes.
      </>
    ),
  },
];

const PACKAGE: { title: string; body: ReactNode }[] = [
  {
    title: 'Your leads',
    body: (
      <p>
        The leads coming through Local Pros keep coming to you, as they do now. You just don’t pay for them separately
        any more. <D k="leadVolumeWording" />
      </p>
    ),
  },
  {
    title: 'Reviews on your Google profile',
    body: (
      <ul>
        <li>
          After a job, we send your happy customers a friendly WhatsApp asking for a review. Only customers you choose.
          WhatsApp works far better than email here.
        </li>
        <li>If they don’t respond, we follow up for you, politely.</li>
        <li>
          If something went wrong, they can reply and you hear about it straight away.
        </li>
        <li>We write and post the replies to your reviews for you.</li>
        <li>Covers Google, plus Facebook and Hello Peter.</li>
        <li>A review widget on your website shows your latest reviews and updates itself.</li>
      </ul>
    ),
  },
  {
    title: 'Posts on your Facebook and Instagram',
    body: (
      <ul>
        <li>We post on your Facebook, Instagram and Google profile every week, so your pages stay active.</li>
        <li>Four posts a month promoting your services, plus custom graphics, holiday posts and highlights from your reviews.</li>
        <li>
          Finished a job you’re proud of? Take a photo, fill in one short form on your phone, and we post it everywhere.
          It takes about a minute.
        </li>
      </ul>
    ),
  },
  {
    title: 'A new website, if you need one',
    body: (
      <ul>
        <li>Already happy with your website? We leave it alone.</li>
        <li>If it needs work, we refresh it.</li>
        <li>If you don’t have one, we build it. Worth up to R9,900.</li>
        <li>The website comes with a 12-month commitment. Hosting is included, and after 12 months the website is yours.</li>
      </ul>
    ),
  },
];

const MONEY: { label: string; text: ReactNode }[] = [
  { label: 'R2,500 a month.', text: 'That covers the Local Pros Studio package and your leads.' },
  {
    label: 'No more paying for leads separately.',
    text: 'The Local Pros Studio package costs R2,500 a month on its own, and your leads come with it at no extra charge.',
  },
  { label: 'Setup is free.', text: 'It’s normally R5,000.' },
  {
    label: 'Commitment:',
    text: (
      <>
        6 months. If we build you a new website or refresh your existing one, it’s 12 months, and the website is yours
        after that. <D k="commitment" />
      </>
    ),
  },
  {
    label: 'Why a commitment?',
    text: 'Reviews and a strong Google profile take a few months to build. We’d rather you give it a proper go than judge it after a month. It’s also why we don’t charge setup.',
  },
  { label: 'Money-back guarantee:', text: <D k="guarantee" /> },
  { label: 'Billing:', text: <D k="billing" /> },
];

const STEPS: { when: ReactNode; text: string }[] = [
  {
    when: (
      <>
        Now until <D k="replyByDate" />
      </>
    ),
    text: 'have a look, ask us anything, and let us know you’re in. A WhatsApp to Tyran is all it takes.',
  },
  {
    when: <D k="setupWeek" />,
    text: 'we set everything up with you. It takes about 30 minutes of your time: we connect your Google profile and social pages, and choose which customers to ask for reviews.',
  },
  {
    when: <D k="switchDate" />,
    text: 'your package starts. Your leads keep coming, and reviews and posts begin.',
  },
];

type Faq = { q: ReactNode; a: ReactNode };

const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: 'Your leads',
    items: [
      {
        q: 'Will I still get leads?',
        a: 'Yes. The leads coming through to you now will keep coming. The only difference is that you don’t pay for them separately.',
      },
      { q: 'How many leads will I get?', a: <D k="howManyLeads" /> },
      { q: 'What about lead credits I’ve already paid for?', a: <D k="leadCredits" /> },
      { q: 'Can I keep buying leads on their own instead?', a: <D k="leadsOnTheirOwn" /> },
      {
        q: 'Why are leads slower than before?',
        a: 'Because Google now recommends businesses directly instead of sending people to directory sites like ours. That’s exactly why we’re adding reviews, posts and your website to what we do for you.',
      },
    ],
  },
  {
    title: 'The package',
    items: [
      {
        q: 'I already have a website. Do I need a new one?',
        a: 'No. If you’re happy with it, we leave it alone. The website is only for people who need one.',
      },
      {
        q: 'Do I have to post anything myself?',
        a: 'No. We post for you every week. If you want to show off a job, it’s one form on your phone and takes about a minute.',
      },
      {
        q: 'Who writes the replies to my reviews?',
        a: 'We do, in a friendly, professional tone. You can always ask us to change one.',
      },
      {
        q: 'Will you spam my customers?',
        a: (
          <>
            No. We only message customers you choose, on WhatsApp, and we keep it friendly and short. If something went wrong, they can reply and you hear about it straight away.
          </>
        ),
      },
      {
        q: 'What if I get a bad review?',
        a: 'We let you know and help you reply calmly and professionally. A good reply to a bad review often does more for you than the review does harm.',
      },
      {
        q: 'Do I need to give you my passwords?',
        a: 'We’ll walk you through giving us access safely during setup. You stay the owner of your Google profile, your pages and your reviews.',
      },
      {
        q: 'Do I keep my reviews and pages if I stop?',
        a: (
          <>
            Yes. Your reviews, your Google profile and your social pages are yours. <D k="websiteIfTheyStop" />
          </>
        ),
      },
    ],
  },
  {
    title: 'Money and terms',
    items: [
      {
        q: 'Why is it more than I pay for leads now?',
        a: 'Because you’re getting a lot more. Your leads keep coming, and at the same time we build the things Google looks for: reviews, active pages and a good website. Those keep working for you month after month, and they belong to you. Doing this yourself takes hours every week; paying someone part-time would cost far more.',
      },
      {
        q: 'Why is there a commitment?',
        a: 'Reviews and a strong Google profile take a few months to build. Six months gives it a proper chance to work. It’s also why setup is free.',
      },
      { q: 'What if I want to stop?', a: <D k="cancellation" /> },
      { q: 'Is there a guarantee?', a: <D k="guaranteeFaq" /> },
      { q: 'How do I pay?', a: <D k="payFaq" /> },
    ],
  },
  {
    title: 'Timing',
    items: [
      {
        q: (
          <>
            What happens before <D k="switchDate" />?
          </>
        ),
        a: 'Nothing changes. Your leads keep coming as normal. We use the time to set you up.',
      },
      {
        q: 'I’m closed over December. Is that a problem?',
        a: 'Not at all. It’s actually a good time to start. We collect reviews from this year’s customers, and you start the new year with fresh reviews and active pages.',
      },
      {
        q: (
          <>
            What if I miss the <D k="replyByDate" /> date?
          </>
        ),
        a: <D k="missedReplyBy" />,
      },
    ],
  },
  {
    title: 'General',
    items: [
      {
        q: 'Have other businesses already done this?',
        a: 'Yes. We’ve already made this move with more than 50 businesses this year.',
      },
      {
        q: 'Is Local Pros closing?',
        a: 'No. Local Pros isn’t going anywhere. Local Pros Studio is the name of our new package, and it’s run by the same people you already deal with.',
      },
      { q: 'Who do I talk to?', a: `Tyran. Same WhatsApp number as always: ${PHONE}.` },
    ],
  },
];

// Closed by default and opens on tap without any script (details/summary), so it works in the pre-built HTML too
function FaqItem({ q, a }: Faq) {
  return (
    <details className="dd-faq-item lp-faq-item">
      <summary className="lp-faq-q">
        <span>{q}</span>
        <ChevronDown className="dd-faq-chev" size={22} aria-hidden="true" />
      </summary>
      <div className="dd-faq-a">
        <p>{a}</p>
      </div>
    </details>
  );
}

export default function LeadPartners() {
  return (
    <div className="dd dd-a lp">
      <SiteHeader minimal whatsAppUrl={WHATSAPP_URL} />

      <main>
        <section className="lp-hero">
          <div className="dd-container lp-narrow">
            <p className="dd-kw">For Local Pros lead partners</p>
            <h1 className="dd-display lp-title">Local Pros is changing. Here’s everything you need to know.</h1>
            <p className="dd-lede">
              If you’ve just watched our short walkthrough, this page fills in the detail. If you haven’t, start here.
              Either way, the most important thing first: your leads aren’t going anywhere.
            </p>
            <div className="lp-cta">
              <WhatsAppButton />
              <p className="lp-phone">{PHONE}</p>
            </div>
          </div>
        </section>

        <section className="dd-sec lp-grey" id="short-version">
          <div className="dd-container lp-narrow">
            <p className="dd-eyebrow">The short version</p>
            <dl className="lp-summary">
              {SHORT_VERSION.map((row) => (
                <div key={row.label} className="lp-summary-row">
                  <dt>{row.label}</dt>
                  <dd>{row.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="dd-sec" id="why">
          <div className="dd-container lp-narrow lp-prose">
            <h2 className="dd-h2">Google has changed how customers find tradespeople</h2>
            <p>
              For years, Local Pros has sent work your way. Customers searched on Google, found LocalPros.co.za, and we
              passed the job on to you.
            </p>
            <p>
              People still Google when they need a plumber or an electrician. But Google now uses AI to recommend a local
              business itself, right at the top of the results. Fewer people click through to sites like ours, and that’s
              why leads have slowed down. You’ve noticed it, and so have we.
            </p>
            <p>
              To choose who to recommend, Google checks three things: your <strong>Google reviews</strong>, whether your{' '}
              <strong>Facebook and Instagram</strong> are active, and your <strong>website</strong>. Basically, it looks
              for the business people trust.
            </p>
            <p>
              Our job has always been the same: getting you work. Google changed the way, so we’re changing with it. From
              now on we help you with both: your leads, and building your business online.
            </p>
            <p>It’s a big change, and a good one. We’ve already made this move with more than 50 businesses this year.</p>
          </div>
        </section>

        <section className="dd-sec lp-cream" id="package">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">What you get with Local Pros Studio</h2>
            <p className="lp-intro">Four things, all looked after for you, for one monthly price.</p>
            <ol className="lp-package">
              {PACKAGE.map((item, i) => (
                <li key={item.title} className="lp-card">
                  <h3 className="dd-h3">
                    <span className="lp-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    {item.title}
                  </h3>
                  {item.body}
                </li>
              ))}
            </ol>
            <p className="lp-closing-line">
              <strong>You do the jobs. We do the rest.</strong>
            </p>
          </div>
        </section>

        <section className="dd-sec" id="money">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">The money side</h2>
            <ul className="lp-money">
              {MONEY.map((row) => (
                <li key={row.label}>
                  <strong>{row.label}</strong> {row.text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dd-sec lp-grey" id="timeline">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">
              From here to <D k="switchDate" />
            </h2>
            <ol className="lp-steps">
              {STEPS.map((step, i) => (
                <li key={i}>
                  <span className="lp-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <p>
                    <strong>{step.when}:</strong> {step.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="lp-note">
              Nothing changes before <D k="switchDate" />. Your leads keep coming as normal until then.
            </p>
          </div>
        </section>

        <section className="dd-sec" id="faq">
          <div className="dd-container lp-narrow">
            <h2 className="dd-h2">Your questions, answered</h2>
            <p className="lp-intro">If yours isn’t here, WhatsApp Tyran. No question is too small.</p>
            {FAQ_GROUPS.map((group) => (
              <div key={group.title} className="lp-faq-group">
                <h3 className="lp-faq-title">{group.title}</h3>
                <div className="dd-faq-list">
                  {group.items.map((item, i) => (
                    <FaqItem key={i} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lp-end" id="contact">
          <div className="dd-container lp-end-in">
            {/* No photo of Tyran in the repo yet (14 Oct 2026): a plain circle with his initial until Jeremy sends one */}
            <div className="lp-avatar" role="img" aria-label="Tyran">
              T
            </div>
            <h2 className="dd-h2">Any question, big or small.</h2>
            <p className="lp-end-text">
              I’m one message away. If you’d rather talk it through on a call, just say so and we’ll find a time.
            </p>
            <WhatsAppButton className="lp-end-btn" />
            <p className="lp-phone">{PHONE}</p>
          </div>
        </section>
      </main>

      <SiteFooter minimal whatsAppUrl={WHATSAPP_URL} />
    </div>
  );
}
