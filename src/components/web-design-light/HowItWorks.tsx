import { ArrowRight, MousePointer2 } from 'lucide-react';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG } from './ClientReviews';
import pavingPhone from '../../assets/images/portfolio/pavingpros-mobile.webp';

// "How it works" on the website page (9 Oct 2026): "All we need is your business name" (first "All we need is one
// link"; Jeremy took option 1 of three rewrites, since owners type their name in the chat rather than send a
// link). We find their Google listing or Facebook page and build the website from it. Picked by Jeremy (version 3 of the "less than an
// hour of your time" sections, without the minutes line) over a timesheet and an hour bar, and over earlier
// photo-led takes after he found the office photo too corporate. The chat takes a Google listing, or a
// Facebook page or website for businesses not on Google (DemoPopup.tsx).
// 9 Oct 2026 (Jeremy): the two cards are the buttons. Each has an amber arrow so it reads as tappable; Google opens
// the chat at the business search, Facebook opens it at "Not on Google?" (name, Facebook page, number). The
// floating pointer from the ReachMax homepage sits on the Google card. The separate button below was dropped.

export default function HowItWorks({ onStart }: { onStart?: (route: 'google' | 'facebook') => void }) {
  return (
    <section className="dd-sec st st-3" id="how-it-works">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">All we need is your business name</h2>
          <p className="dd-sub">We find you on Google or Facebook and build your website from what’s there.</p>
        </div>
        <div className="st3-flow">
          <div className="st3-links">
            <div className="st3-pick">
              <button
                type="button"
                className="st3-link"
                onClick={() => {
                  onStart?.('google');
                  openSiteChat(undefined, { focusSearch: true });
                }}
              >
                <GoogleG size={26} />
                <span className="st3-link-text">
                  <strong>Find me on Google</strong>
                  <small>We use your name, services, photos and reviews</small>
                </span>
                <span className="st3-go" aria-hidden="true">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </span>
              </button>
              <span className="fd-guide st3-guide" aria-hidden="true">
                <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
                <span className="fd-guide-label">Tap to start</span>
              </span>
            </div>
            <p className="st3-or">or</p>
            <button
              type="button"
              className="st3-link"
              onClick={() => {
                onStart?.('facebook');
                openSiteChat(undefined, { typeDetails: true });
              }}
            >
              <span className="st3-fb" aria-hidden="true">
                f
              </span>
              <span className="st3-link-text">
                <strong>Use my Facebook page</strong>
                <small>If you’re not on Google</small>
              </span>
              <span className="st3-go" aria-hidden="true">
                <ArrowRight size={20} strokeWidth={2.5} />
              </span>
            </button>
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
      </div>
    </section>
  );
}
