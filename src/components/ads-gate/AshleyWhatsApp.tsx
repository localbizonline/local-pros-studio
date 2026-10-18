import { useEffect, useState, type RefObject } from 'react';
import { GoogleG } from '../web-design-light/ClientReviews';
import { ashleyWhatsAppLink } from '../../whatsapp';
import ashley from './img/ashley.webp';

// WhatsApp with Ashley as the next step on the category pages (Jeremy, 18 Oct 2026: "make it seem like we are
// live on WA to answer any questions from 7 to 6pm", with her face). Her WhatsApp profile photo, her own number
// (078 362 8921): chats there are hers to answer by hand; the bot only answers leads handed to it.
// Online means Monday to Friday, 07:00 to 18:00 South African time. Outside those hours it says when she'll
// reply, so the page never says she's online when she isn't.

// line: in the card; short: in the bar at the bottom of a phone screen
type Status = { online: boolean; line: string; short: string };

// What the pre-built page shows until the code knows the time
const HOURS: Status = { online: false, line: 'Replies on WhatsApp, 7am to 6pm', short: 'On WhatsApp 7am to 6pm' };

const statusAt = (now: Date): Status => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-ZA', { timeZone: 'Africa/Johannesburg', weekday: 'short', hour: 'numeric', hourCycle: 'h23' })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const day = parts.weekday as string;
  const hour = Number(parts.hour);
  const weekday = !['Sat', 'Sun'].includes(day);
  if (weekday && hour >= 7 && hour < 18) return { online: true, line: 'Online now · replies on WhatsApp', short: 'Online now' };
  if (weekday && hour < 7) return { online: false, line: 'Replies from 7am today', short: 'Back at 7am' };
  if (day === 'Fri' || !weekday) return { online: false, line: 'Replies on Monday from 7am', short: 'Back Monday 7am' };
  return { online: false, line: 'Replies tomorrow from 7am', short: 'Back tomorrow 7am' };
};

const useAshleyStatus = () => {
  const [status, setStatus] = useState<Status>(HOURS);
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

function StatusLine({ status, short = false }: { status: Status; short?: boolean }) {
  return (
    <span className={`gx-status${status.online ? ' is-online' : ''}`}>
      {status.online && <span className="gx-dot" aria-hidden="true" />}
      {short ? status.short : status.line}
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
      <a href={ashleyWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="gx-wa-btn" onClick={onWhatsApp}>
        WhatsApp Ashley
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
      <Face size={40} />
      <div className="gx-bar-text">
        <strong>Ashley</strong>
        <StatusLine status={status} short />
      </div>
      <a href={ashleyWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="gx-wa-btn gx-bar-btn" tabIndex={show ? 0 : -1} onClick={onWhatsApp}>
        WhatsApp
      </a>
    </div>
  );
}
