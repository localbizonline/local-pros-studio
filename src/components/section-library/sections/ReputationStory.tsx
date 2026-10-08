import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Globe, Phone, Search, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './reputationstory.css';

// "Your reputation" with animation that tells the story (7 Oct 2026). Jeremy wanted motion only in
// this section, used to convey the customer's path, not decoration across the page. Three versions:
//   follow:  the path fills in and each step lights up as the visitor reaches it
//   find:    plus what the customer actually sees at each step
//   versus:  plus your business (with us) against a competitor at each step, until they pick you
// The steps play in order and loop while the section is on screen (8 Oct 2026). Reduced-motion
// visitors see every step lit straight away. The "Before anyone uses you, they look you up" headline
// was removed on 8 Oct 2026 (Jeremy).
// Jeremy picked 'follow' for the join page (7 Oct 2026); the other two stay for comparison at
// /review-versions/rep-motion.

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

interface Step {
  title: string;
  body: string;
  icon: ReactNode;
  ours?: boolean;
  end?: boolean;
  find: ReactNode;
  you: string;
  them: string;
}

const STEPS: Step[] = [
  {
    title: 'They search on Google',
    body: 'Your business name, or what you do in their area.',
    icon: <Search size={20} />,
    find: (
      <span className="rs-search">
        <Search size={14} aria-hidden="true" />
        <span className="rs-typed">plumber near me</span>
      </span>
    ),
    you: 'You show up',
    them: 'They show up',
  },
  {
    title: 'They read your reviews',
    body: 'How many you have, how recent they are, and what people say.',
    icon: <GoogleIcon />,
    ours: true,
    find: (
      <span className="rs-find-line">
        <span className="rs-stars">★★★★★</span> "Arrived on time, fair price." <em>2 days ago</em>
      </span>
    ),
    you: '★ 4.9, new review this week',
    them: '★ 3.8, last review in 2023',
  },
  {
    title: 'They check your socials',
    body: 'Are you still posting, or has the page gone quiet?',
    icon: <FacebookIcon />,
    ours: true,
    find: (
      <span className="rs-find-line">
        <FacebookIcon /> New job posted <em>2 days ago</em>
      </span>
    ),
    you: 'Posted 2 days ago',
    them: 'Last post in 2023',
  },
  {
    title: 'They open your website',
    body: 'Does it work on a phone? Can they call you?',
    icon: <Globe size={20} />,
    ours: true,
    find: (
      <span className="rs-find-line">
        <Check size={14} aria-hidden="true" /> Works on a phone <Check size={14} aria-hidden="true" /> Tap to call
      </span>
    ),
    you: 'Works on a phone',
    them: 'Hard to use on a phone',
  },
  {
    title: 'They get in touch',
    body: 'They WhatsApp or call the business that looks best.',
    icon: <Phone size={20} />,
    end: true,
    find: <span className="rs-bubble">Hi, are you free on Saturday?</span>,
    you: 'They message you',
    them: 'Skipped',
  },
];

export type StoryVariant = 'follow' | 'find' | 'versus';

/** How many steps are lit. Plays in order and loops while the section is on screen: the steps light up
 *  one by one, all stay lit for a moment, then it starts again (Jeremy, 8 Oct 2026; it used to follow
 *  the scroll on phones and play once on wider screens). Pauses off screen; reduced motion sees all lit. */
const STEP_MS = 550; // faster since 8 Oct 2026 (Jeremy)
const HOLD_STEPS = 4; // all lit for about 2 seconds before it starts again

function useActiveSteps(listRef: React.RefObject<HTMLOListElement>, count: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(count);
      return;
    }
    let timer = 0;
    let n = 0;
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return stop();
        if (timer) return;
        timer = window.setInterval(() => {
          n = n >= count + HOLD_STEPS ? 0 : n + 1;
          setActive(Math.min(n, count));
        }, STEP_MS);
      },
      { threshold: 0.25 },
    );
    io.observe(list);
    return () => {
      io.disconnect();
      stop();
    };
  }, [listRef, count]);

  return active;
}

/** The amber fill runs from the first icon to the latest lit one. */
function useFill(listRef: React.RefObject<HTMLOListElement>, active: number) {
  const [fill, setFill] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const icons = Array.from(list.querySelectorAll<HTMLElement>('.rs-icon'));
      if (!icons.length) return;
      const first = icons[0].getBoundingClientRect();
      const last = icons[Math.max(0, Math.min(active, icons.length) - 1)].getBoundingClientRect();
      setFill(active === 0 ? { x: 0, y: 0 } : { x: last.left - first.left, y: last.top - first.top });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [listRef, active]);
  return fill;
}

export default function ReputationStory({ variant = 'follow' }: { variant?: StoryVariant }) {
  const listRef = useRef<HTMLOListElement>(null);
  const active = useActiveSteps(listRef, STEPS.length);
  const fill = useFill(listRef, active);
  // The closing line appears once the path has played through and stays while it loops
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (active >= STEPS.length) setDone(true);
  }, [active]);

  return (
    <section className={`dd dd-a dd-sec rs is-${variant}`}>
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Your reputation</p>
          <p className="dd-sub">
            They find your Google reviews, your Facebook and Instagram, and your website. Together, that's your reputation.
          </p>
        </div>

        {variant === 'versus' && (
          <p className="rs-legend" aria-hidden="true">
            <span className="rs-key is-you">You, with us</span>
            <span className="rs-key is-them">A competitor</span>
          </p>
        )}

        <ol ref={listRef} className="rs-path" style={{ ['--fill-x' as string]: `${fill.x}px`, ['--fill-y' as string]: `${fill.y}px` }}>
          {STEPS.map((s, i) => {
            const on = i < active;
            // The step that has just lit up gets a pop and a ring, so the eye follows the path
            const now = i === active - 1;
            return (
              <li key={s.title} className={`${on ? 'is-on' : ''}${now ? ' is-now' : ''}${s.end ? ' is-end' : ''}`}>
                <span className="rs-icon">{s.icon}</span>
                <div className="rs-copy">
                  <strong>{s.title}</strong>
                  <span className="rs-body">{s.body}</span>
                  {s.ours && <span className="rs-ours">We handle this</span>}
                  {variant === 'find' && <span className="rs-find">{s.find}</span>}
                  {variant === 'versus' && (
                    <span className="rs-versus">
                      <span className="rs-vs is-you">
                        <Check size={14} aria-hidden="true" />
                        {s.you}
                      </span>
                      <span className="rs-vs is-them">
                        {s.ours && <X size={14} aria-hidden="true" />}
                        {s.them}
                      </span>
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p className={`rs-close${done ? ' is-on' : ''}`}>
          {variant === 'versus' ? (
            <>
              Same customer, same search. <strong>They pick the business that looks better, and we make sure that's you.</strong>
            </>
          ) : (
            <>
              They check your competitors the same way. <strong>Make sure you're the one they pick.</strong>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
