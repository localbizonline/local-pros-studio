import { useEffect, useState, type RefObject } from 'react';

// A small looping product moment: a WhatsApp review request arrives after a job, the customer
// taps through and a 5-star Google review appears. Every element is always rendered and only
// fades in, inside a fixed-size phone, so the page never changes height. The phone carries its
// own WhatsApp/Google micro-palette; it is a screen, not part of the page palette.

// Phase timeline (ms). The loop pauses while off screen and stops on the final frame for
// visitors who prefer reduced motion.
const PHASES = [1100, 2200, 1500, 2200, 1100, 1700, 2600, 3400];
export const FINAL_PHASE = PHASES.length - 1;

// Which of the three steps beside the phone is active in each phase
export const stepForPhase = (phase: number) => (phase === 0 ? 0 : phase <= 4 ? 1 : 2);

const REVIEW_TEXT = 'Arrived on time and fixed the geyser the same day. Neat, friendly and fairly priced.';

export function useDemoPhase(target: RefObject<HTMLElement>) {
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = target.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  useEffect(() => {
    if (reduced || !visible) return;
    const t = window.setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase]);
    return () => window.clearTimeout(t);
  }, [phase, reduced, visible]);

  return reduced ? FINAL_PHASE : phase;
}

const Stars = ({ filled = 5, size = 14, animate = false }: { filled?: number; size?: number; animate?: boolean }) => (
  <span className="ddp-stars" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={animate ? { transitionDelay: `${i * 160}ms` } : undefined}
        className={i < filled ? 'on' : ''}
      >
        <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
      </svg>
    ))}
  </span>
);

const Ticks = () => (
  <svg className="ddp-ticks" width="16" height="11" viewBox="0 0 16 11" aria-hidden="true">
    <path d="M1 6l3 3 6-7M6 9l1 1 7-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GoogleG = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

function useTyped(text: string, active: boolean, done: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (done) {
      setCount(text.length);
      return;
    }
    if (!active) {
      setCount(0);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => setCount((c) => (c >= text.length ? c : c + 2)), 45);
    return () => window.clearInterval(id);
  }, [text, active, done]);
  return text.slice(0, count);
}

export default function ReviewPhone({ phase }: { phase: number }) {
  const show = (p: number) => (phase >= p ? 'is-on' : '');
  const onGoogle = phase >= 5;
  const posted = phase >= 7;
  const typed = useTyped(REVIEW_TEXT, phase === 6, phase >= 7);

  return (
    <div className="ddp-phone" role="img" aria-label="A WhatsApp message asks a customer how the job went, she taps Great, follows the review link and posts a 5-star Google review">
      <div className="ddp-screen">
        <div className="ddp-status">
          <span>14:32</span>
          <span className="ddp-status-icons" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>

        {/* WhatsApp chat */}
        <div className={`ddp-layer ddp-wa ${onGoogle ? '' : 'is-front'}`}>
          <div className="ddp-wa-head">
            <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
              <path d="M8 2L2 8l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="ddp-avatar">MP</span>
            <span className="ddp-wa-name">
              <strong>Mokoena Plumbing</strong>
              <small>Business account</small>
            </span>
          </div>
          <div className="ddp-wa-body">
            <span className="ddp-day">Today</span>

            <div className="ddp-slot">
              <div className={`ddp-typing ${phase === 0 ? 'is-on' : ''}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className={`ddp-bubble in ${show(1)}`}>
                Hi Thandi, thanks for choosing Mokoena Plumbing today. How did we do?
                <span className="ddp-time">14:31</span>
              </div>
            </div>
            <div className={`ddp-replies ${show(1)}`}>
              <span className={phase >= 2 ? 'is-tapped' : ''}>
                Great
                {phase === 2 && <b className="ddp-tap" aria-hidden="true" />}
              </span>
              <span>Could be better</span>
            </div>

            <div className={`ddp-bubble out ${show(2)}`}>
              Great
              <span className="ddp-time">
                14:32 <Ticks />
              </span>
            </div>

            <div className={`ddp-bubble in ${show(3)}`}>
              Thank you! Would you mind leaving us a Google review? It helps a small business like ours.
              <span className={`ddp-link ${phase === 4 ? 'is-tapped' : ''}`}>
                <GoogleG size={14} /> Leave a Google review
                {phase === 4 && <b className="ddp-tap" aria-hidden="true" />}
              </span>
              <span className="ddp-time">14:32</span>
            </div>
          </div>
          <div className="ddp-wa-input" aria-hidden="true">
            <span>Message</span>
          </div>
        </div>

        {/* Google review sheet, then the posted review */}
        <div className={`ddp-layer ddp-g ${onGoogle ? 'is-front' : ''}`}>
          <div className="ddp-g-head">
            <GoogleG size={18} />
            <span>
              <strong>Mokoena Plumbing</strong>
              <small>Plumber · Pretoria East</small>
            </span>
          </div>

          <div className={`ddp-g-write ${posted ? '' : 'is-on'}`}>
            <p className="ddp-g-who">
              <span className="ddp-avatar g">T</span>
              <span>
                <strong>Thandi M.</strong>
                <small>Posting publicly on Google</small>
              </span>
            </p>
            <Stars filled={phase >= 5 ? 5 : 0} size={30} animate />
            <div className="ddp-g-text">
              {typed}
              {phase === 6 && <span className="ddp-caret" />}
              {phase < 6 && <span className="ddp-placeholder">Share details of your experience</span>}
            </div>
            <span className={`ddp-g-post ${phase >= 6 ? 'ready' : ''}`}>Post</span>
          </div>

          <div className={`ddp-g-posted ${posted ? 'is-on' : ''}`}>
            <div className="ddp-g-score">
              <strong>5.0</strong>
              <Stars size={16} />
              <small>Google reviews</small>
            </div>
            <div className="ddp-g-review">
              <p className="ddp-g-who">
                <span className="ddp-avatar g">T</span>
                <span>
                  <strong>Thandi M.</strong>
                  <small>
                    <Stars size={11} /> just now
                  </small>
                </span>
                <em>New</em>
              </p>
              <p className="ddp-g-copy">{REVIEW_TEXT}</p>
            </div>
            <div className="ddp-g-review faded">
              <p className="ddp-g-who">
                <span className="ddp-avatar g alt">S</span>
                <span>
                  <strong>Sipho N.</strong>
                  <small>
                    <Stars size={11} /> 2 days ago
                  </small>
                </span>
              </p>
              <p className="ddp-g-copy">Sorted our burst pipe on a Sunday. Would use again.</p>
            </div>
            <div className="ddp-g-review faded">
              <p className="ddp-g-who">
                <span className="ddp-avatar g alt2">L</span>
                <span>
                  <strong>Lerato K.</strong>
                  <small>
                    <Stars size={11} /> 1 week ago
                  </small>
                </span>
              </p>
              <p className="ddp-g-copy">Quick quote and neat work. They cleaned up after themselves.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
