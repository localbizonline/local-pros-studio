import { ArrowRight, Check, X } from 'lucide-react';
import '../design-directions/directions.css';
import './reputationoptions.css';
import ReputationPath from '../section-library/sections/ReputationPath';

// Three versions of a "your reputation" section for under the join page hero (7 Oct 2026). Jeremy's
// brief: problem then solution in basic terms. People research a business before using it; they
// find its website, reviews and social profiles; that is its reputation; we make sure all of it
// beats the competitors. Each version has a simple life-cycle graphic.
// Shown at /review-versions/reputation (noindex).

const Label = ({ letter, name, note }: { letter: string; name: string; note: string }) => (
  <div className="rp-label">
    <div className="dd-container rp-label-in">
      <span className="rp-letter">{letter}</span>
      <div>
        <strong>{name}</strong>
        <span>{note}</span>
      </div>
    </div>
  </div>
);

/* A. The customer's path: picked, now the shared ReputationPath section */
function VersionA() {
  return <ReputationPath />;
}

/* B. The reputation loop: each happy customer helps you win the next one */
const LOOP = [
  { title: 'Someone needs what you do', pos: 'top' },
  { title: 'They look you up: reviews, Facebook, website', pos: 'right' },
  { title: 'They choose you and you do the work', pos: 'bottom' },
  { title: 'We ask them for a review and post the job', pos: 'left' },
];

function VersionB() {
  return (
    <section className="dd-sec rp-b">
      <div className="dd-container rp-b-grid">
        <div>
          <p className="dd-eyebrow">How your reputation works</p>
          <h2 className="dd-h2 rp-b-title">Every happy customer helps you win the next one</h2>
          <div className="rp-b-copy">
            <p>
              <strong>The problem:</strong> people research a business before they use it. They read your reviews, check your
              Facebook and Instagram, and open your website. If those look quiet, they pick someone else.
            </p>
            <p>
              <strong>What we do:</strong> after every job we ask the customer for a Google review, post the work on your pages,
              and keep your website up to date. Each customer you serve makes you look better to the next one.
            </p>
          </div>
        </div>
        <div className="rp-loop" role="img" aria-label="A loop of four steps: someone needs what you do, they look you up, they choose you and you do the work, we ask them for a review and post the job, which the next person finds.">
          <div className="rp-loop-ring" aria-hidden="true" />
          <div className="rp-loop-centre" aria-hidden="true">
            <strong>Your reputation</strong>
            <span>grows with every job</span>
          </div>
          {LOOP.map((n, i) => (
            <div key={n.title} className={`rp-node is-${n.pos}`} aria-hidden="true">
              <span className="rp-node-num">{i + 1}</span>
              <span>{n.title}</span>
            </div>
          ))}
          {['tr', 'br', 'bl', 'tl'].map((c) => (
            <span key={c} className={`rp-arrow is-${c}`} aria-hidden="true">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* C. What people find now, against what they find with us */
const WITHOUT = ['A few old Google reviews', 'A Facebook page that went quiet', 'A website that is hard to use on a phone, or none at all'];
const WITH = [
  'New Google reviews from your recent customers',
  'Your latest work on Facebook and Instagram every week',
  'A website that works on a phone and gets you calls',
];

function VersionC() {
  return (
    <section className="dd-sec rp-c">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Your reputation</p>
          <h2 className="dd-h2">People check you out before they use you. What do they find?</h2>
        </div>
        <ol className="rp-strip" aria-label="What people check, in order">
          {['Google search', 'Your reviews', 'Your Facebook and Instagram', 'Your website', 'They get in touch'].map((t, i, a) => (
            <li key={t}>
              <span>{t}</span>
              {i < a.length - 1 && <ArrowRight size={16} aria-hidden="true" className="rp-strip-arrow" />}
            </li>
          ))}
        </ol>
        <div className="rp-compare">
          <div className="rp-card is-without">
            <p className="rp-card-tag">Without us</p>
            <ul>
              {WITHOUT.map((t) => (
                <li key={t}>
                  <X size={20} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="rp-card-result">They call the business down the road.</p>
          </div>
          <div className="rp-card is-with">
            <p className="rp-card-tag">With us</p>
            <ul>
              {WITH.map((t) => (
                <li key={t}>
                  <Check size={20} aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="rp-card-result">They call you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ReputationOptions() {
  return (
    <div className="dd dd-a rp">
      <Label letter="A" name="The customer's path" note="Problem as five steps people take before they call; the three we handle are marked" />
      <VersionA />
      <Label letter="B" name="The reputation loop" note="Problem and solution in two short paragraphs, beside a loop: each happy customer helps win the next" />
      <VersionB />
      <Label letter="C" name="Without us / with us" note="A short path strip, then what people find now against what they find with us" />
      <VersionC />
    </div>
  );
}
