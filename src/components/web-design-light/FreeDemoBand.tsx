import { MousePointer2, Search } from 'lucide-react';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG } from './ClientReviews';
import demoShot from '../../assets/images/portfolio/demo-example-plumber.webp';

// "Get a free demo of your new website" (8 Oct 2026, first titled "See your new website before you pay";
// Jeremy did not want the stress on paying, Jeremy's request to make the free demo harder to
// miss). Every button opens the site chat without a plan, which is the free demo offer: the visitor finds
// their business on Google and we WhatsApp them a demo. Three versions to choose from:
// a: centred band, one button. b: words beside a WhatsApp message with the demo arriving (the page's one
// code-built mock-up). c: a Google search box on the page that starts the chat.

const TITLE = 'Get a free demo of your new website';
const LINE = 'Find your business on Google in our chat. We build a demo from your listing, with your name, services and reviews, and send it to you on WhatsApp.';
const SMALL = 'A real person replies on WhatsApp.';

export type DemoBandVariant = 'a' | 'b' | 'c';

export default function FreeDemoBand({ variant = 'a', onOpen }: { variant?: DemoBandVariant; onOpen?: () => void }) {
  // The search box (c) opens the chat ready to type in; the plain buttons (a, b) open it as usual
  const open = () => {
    onOpen?.();
    openSiteChat(undefined, { focusSearch: variant === 'c' });
  };

  if (variant === 'b') {
    return (
      <section className="dd-sec fd fd-b">
        <div className="dd-container fd-b-grid">
          <div>
            <p className="dd-eyebrow">Free demo</p>
            <h2 className="dd-h2 fd-title">{TITLE}</h2>
            <ol className="fd-steps">
              <li>
                <span>1</span>Find your business on Google
              </li>
              <li>
                <span>2</span>We build a demo from your listing
              </li>
              <li>
                <span>3</span>It arrives on WhatsApp
              </li>
            </ol>
            <button type="button" className="dd-btn dd-btn-primary fd-btn" onClick={open}>
              Get my free demo
            </button>
            <p className="fd-small">{SMALL}</p>
          </div>
          {/* The moment the demo arrives, as a WhatsApp message (example business) */}
          <div className="fd-wa" aria-hidden="true">
            <p className="fd-wa-day">Today</p>
            <div className="fd-wa-in">
              <p>Hi Pieter, here is the demo of your new website, built from your Google listing:</p>
              <div className="fd-wa-card">
                <img src={demoShot} alt="" width={585} height={592} loading="lazy" />
                <p>
                  <strong>Naval Hill Plumbing</strong>
                  <small>Demo website</small>
                </p>
              </div>
              <p>Have a look on your phone and tell us what you'd change.</p>
              <time>10:42</time>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'c') {
    return (
      <section className="dd-sec fd fd-c">
        <div className="dd-container">
          <div className="dd-head fd-head">
            <p className="dd-eyebrow">Free demo</p>
            <h2 className="dd-h2">{TITLE}</h2>
            <p className="dd-sub">{LINE}</p>
          </div>
          <div className="fd-search-wrap">
            <button type="button" className="fd-search" onClick={open} aria-label="Search your business name to get a free demo">
              <GoogleG size={22} />
              <span className="fd-search-text">Search your business name</span>
              <span className="fd-search-btn">
                <Search size={18} aria-hidden="true" />
                Build my demo
              </span>
            </button>
            {/* A floating pointer with a note, as on the ReachMax homepage (DemoClickGuide.astro), so it's
                clear the box can be tapped (Jeremy, 8 Oct 2026) */}
            <span className="fd-guide" aria-hidden="true">
              <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
              <span className="fd-guide-label">Try it, it's free!</span>
            </span>
          </div>
          <p className="fd-small fd-small-c">{SMALL}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="dd-sec fd fd-a">
      <div className="dd-container">
        <div className="dd-head fd-head">
          <p className="dd-eyebrow">Free demo</p>
          <h2 className="dd-h2">{TITLE}</h2>
          <p className="dd-sub">{LINE}</p>
        </div>
        <div className="fd-center">
          <button type="button" className="dd-btn dd-btn-primary fd-btn" onClick={open}>
            Get my free demo
          </button>
          <p className="fd-small">{SMALL}</p>
        </div>
      </div>
    </section>
  );
}
