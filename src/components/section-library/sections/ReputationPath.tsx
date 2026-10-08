import type { ReactNode } from 'react';
import { Globe, Phone, Search } from 'lucide-react';
import '../../design-directions/directions.css';
import './reputationpath.css';

// "Your reputation" section picked by Jeremy on 7 Oct 2026 (version A of /review-versions/reputation),
// chosen on phone first. Problem then solution: people look a business up before they use it, the
// five steps they take, and the three we handle. Used under the join page hero; change it here only.

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const Icon = ({ children, strong = false }: { children: ReactNode; strong?: boolean }) => (
  <span className={`rpath-icon${strong ? ' is-strong' : ''}`}>{children}</span>
);

// The path someone takes before they get in touch. Steps 2 to 4 are what we look after.
const JOURNEY = [
  { title: 'They search on Google', body: 'Your business name, or what you do in their area.', icon: <Search size={20} /> },
  { title: 'They read your reviews', body: 'How many you have, how recent they are, and what people say.', icon: <GoogleIcon />, ours: 'Google review collection' },
  { title: 'They check your socials', body: 'Are you still posting, or has the page gone quiet?', icon: <FacebookIcon />, ours: 'Social media posting' },
  { title: 'They open your website', body: 'Does it work on a phone? Can they call you?', icon: <Globe size={20} />, ours: 'Website design' },
  { title: 'They get in touch', body: 'They WhatsApp or call the business that looks best.', icon: <Phone size={20} />, end: true },
];

export default function ReputationPath() {
  return (
    <section className="dd dd-a dd-sec rpath">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Your reputation</p>
          <h2 className="dd-h2">Before anyone uses you, they look you up</h2>
          <p className="dd-sub">
            They find your Google reviews, your Facebook and Instagram, and your website. Together, that's your reputation.
          </p>
        </div>
        <ol className="rpath-journey">
          {JOURNEY.map((s, i) => (
            <li key={s.title} className={s.end ? 'is-end' : ''}>
              <Icon strong={s.end}>{s.icon}</Icon>
              <span className="rpath-step">Step {i + 1}</span>
              <strong>{s.title}</strong>
              <span className="rpath-body">{s.body}</span>
              {s.ours && (
                <span className="rpath-ours" title={s.ours}>
                  We handle this
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="rpath-a-close">
          They check your competitors the same way. <strong>Make sure you're the one they pick.</strong>
        </p>
      </div>
    </section>
  );
}
