import { useEffect, useState, type RefObject } from 'react';
import { GoogleG } from '../web-design-light/ClientReviews';
import { ashleyWhatsAppLink } from '../../whatsapp';
import ashley from './img/ashley.webp';

// WhatsApp with Ashley as the next step on the category pages (Jeremy, 18 Oct 2026: "make it seem like we are
// live on WA to answer any questions from 7 to 6pm", with her face). Her WhatsApp profile photo, her own number
// (078 362 8921): chats there are hers to answer by hand; the bot only answers leads handed to it.
// Online means Monday to Friday, 07:00 to 18:00 South African time. Outside those hours it says only "Replies on
// WhatsApp", so the page never says she's online when she isn't.

// Online, or a neutral line: never "Replies on Monday from 7am" (Jeremy, 18 Oct 2026: on the card and the bar)
type Status = { online: boolean; line: string };

// What the pre-built page shows until the code knows the time, and outside her hours
const OFFLINE: Status = { online: false, line: 'Replies on WhatsApp' };

const statusAt = (now: Date): Status => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', weekday: 'short', hour: 'numeric', hourCycle: 'h23' })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const hour = Number(parts.hour);
  const weekday = !['Sat', 'Sun'].includes(parts.weekday as string);
  return weekday && hour >= 7 && hour < 18 ? { online: true, line: 'Online now' } : OFFLINE;
};

const useAshleyStatus = () => {
  const [status, setStatus] = useState<Status>(OFFLINE);
  useEffect(() => {
    const update = () => setStatus(statusAt(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return status;
};

function Face({ size }: { size: number }) {
  return <img src={ashley} alt="Ashley from Local Pros Studio" width={size} height={size} className="gx-face" />;
}

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

function StatusLine({ status }: { status: Status }) {
  return (
    <span className={`gx-status${status.online ? ' is-online' : ''}`}>
      {status.online && <span className="gx-dot" aria-hidden="true" />}
      {status.line}
    </span>
  );
}

// The card in the opening section: looks like the top of a WhatsApp chat with Ashley
export function AshleyCard({ message, onWhatsApp }: { message: string; onWhatsApp: () => void }) {
  const status = useAshleyStatus();
  return (
    <div className="gx-wa" data-wa-from="ashley-card">
      <div className="gx-wa-head">
        <Face size={48} />
        <div>
          <strong>Ashley · Local Pros Studio</strong>
          <StatusLine status={status} />
        </div>
      </div>
      <p className="gx-wa-bubble">Hi, I’m Ashley. Ask me anything about your website. I’ll send you designs for businesses like yours and your price.</p>
      {/* The same words as the bar at the bottom (Jeremy, 18 Oct 2026) */}
      <a href={ashleyWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="gx-wa-btn" onClick={onWhatsApp}>
        <WhatsAppIcon />
        Chat to Ashley
      </a>
      <p className="gx-wa-review">
        <GoogleG size={16} />
        <span>
          “Outstanding service for my custom website build. Kept me informed all through and was very responsive.”{' '}
          <span className="gx-wa-by">Gavin Trusler, Google review</span>
        </span>
      </p>
    </div>
  );
}

// The bar at the bottom of a phone screen once the card has scrolled away
export function AshleyBar({ message, watch, onWhatsApp }: { message: string; watch: RefObject<HTMLElement>; onWhatsApp: () => void }) {
  const status = useAshleyStatus();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = watch.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const seen = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    seen.observe(el);
    return () => seen.disconnect();
  }, [watch]);

  return (
    <div className={`gx-bar${show ? ' is-shown' : ''}`} data-wa-from="ashley-bar" aria-hidden={!show}>
      {/* Her photo with a green dot while she's online; never "Back Monday 7am" here (Jeremy, 18 Oct 2026) */}
      <span className="gx-bar-face">
        <Face size={44} />
        {status.online && <span className="gx-bar-dot" aria-label="Online now" />}
      </span>
      <div className="gx-bar-text">
        <strong>Ashley</strong>
        {/* A small sign of proof (Jeremy, 18 Oct 2026): our Local Pros Google rating */}
        <span className="gx-bar-stars" aria-label="Rated 4.7 on Google">
          <GoogleG size={13} />
          <span className="gx-stars" aria-hidden="true">
            ★★★★★
          </span>
          <b aria-hidden="true">4.7</b>
        </span>
      </div>
      <a href={ashleyWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="gx-wa-btn gx-bar-btn" tabIndex={show ? 0 : -1} onClick={onWhatsApp}>
        <WhatsAppIcon />
        Chat to Ashley
      </a>
    </div>
  );
}
