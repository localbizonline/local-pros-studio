import '../../design-directions/directions.css';
import './whyitmatters.css';
import whyReviews from '../../../assets/images/why-now/why-now-reviews-on-phone.webp';
import whySummary from '../../../assets/images/why-now/why-now-ai-overview-on-phone.webp';

// "Why it matters now" picked by Jeremy on 7 Oct 2026 (from homepage draft B, chosen over draft
// C's wording for its closing line): a dark band with two photos made for this site, reviews
// first and then Google repeating them. The business on the phones, Mokoena Plumbing, is made up.
// Used on the join page; change it here only.

export default function WhyItMatters() {
  return (
    <section className="dd dd-a dd-sec dd-demo wim">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Why it matters now</p>
          <h2 className="dd-h2">Google now tells people who to call</h2>
          <p className="dd-sub">
            When people search on their phone, Google often shows a short answer at the top that names which business to use.
            It writes that answer from Google reviews.
          </p>
        </div>
        <div className="wim-grid">
          <figure>
            <img
              src={whyReviews}
              alt="A phone showing recent 5-star reviews for a plumbing business, with the words on time, fair quote, tidy work and fast call-out highlighted"
              width={1200}
              height={900}
              loading="lazy"
            />
            <figcaption>
              <span className="wim-num">1</span>
              <span>
                <strong>Your customers leave reviews</strong>
                They say what they liked, like "on time" or "fair price".
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
              <span className="wim-num">2</span>
              <span>
                <strong>Google uses them to recommend you</strong>
                The next person who searches sees your business name, with the good things your customers said.
              </span>
            </figcaption>
          </figure>
        </div>
        <p className="wim-close">
          Your website says what you do. <span>Your reviews decide whether Google recommends you.</span>
        </p>
      </div>
    </section>
  );
}
