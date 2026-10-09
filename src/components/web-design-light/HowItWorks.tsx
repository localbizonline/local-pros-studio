import { ArrowRight } from 'lucide-react';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG } from './ClientReviews';
import pavingPhone from '../../assets/images/portfolio/pavingpros-mobile.webp';

// "How it works" on the website page (9 Oct 2026): "All we need is one link". The owner sends their Google
// listing or Facebook page; we build the website from it. Picked by Jeremy (version 3 of the "less than an
// hour of your time" sections, without the minutes line) over a timesheet and an hour bar, and over earlier
// photo-led takes after he found the office photo too corporate. The chat takes a Google listing, or a
// Facebook page or website for businesses not on Google (DemoPopup.tsx).

export default function HowItWorks({ onStart }: { onStart?: () => void }) {
  return (
    <section className="dd-sec st st-3" id="how-it-works">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">All we need is one link</h2>
          <p className="dd-sub">Send us your Google listing or your Facebook page. We build your website from it.</p>
        </div>
        <div className="st3-flow">
          <div className="st3-links">
            <div className="st3-link">
              <GoogleG size={26} />
              <div>
                <strong>Your Google listing</strong>
                <small>Name, services, photos, reviews</small>
              </div>
            </div>
            <p className="st3-or">or</p>
            <div className="st3-link">
              <span className="st3-fb" aria-hidden="true">
                f
              </span>
              <div>
                <strong>Your Facebook page</strong>
                <small>If you’re not on Google</small>
              </div>
            </div>
          </div>
          <div className="st3-arrow" aria-hidden="true">
            <span>We write, design and build it</span>
            <ArrowRight size={28} />
          </div>
          <div className="st3-site">
            <div className="st3-phone">
              <img src={pavingPhone} alt="A website we built for Paving Pros, on a phone" width={585} height={1266} loading="lazy" />
            </div>
            <p>Your new website, live in 7 days</p>
          </div>
        </div>
        <div className="st3-cta">
          <button
            type="button"
            className="dd-btn dd-btn-primary"
            onClick={() => {
              onStart?.();
              openSiteChat(undefined, { focusSearch: true });
            }}
          >
            Send us your link
          </button>
        </div>
      </div>
    </section>
  );
}
