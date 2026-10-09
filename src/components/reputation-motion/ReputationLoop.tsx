import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Globe, Phone, Search } from 'lucide-react';
import '../design-directions/directions.css';
import './reputationloop.css';
import postImage from '../../assets/images/social-posting/social-post-gas-geyser-service.webp';

// "Your reputation", version 2 spread out (7 Oct 2026). Jeremy liked "What they find" but found it
// busy and cramped, and wanted it to loop. One step at a time on a large card, a row of five step
// icons under it, and it plays through by itself, then starts again. It only plays while on screen,
// tapping a step jumps to it, and visitors who ask for reduced motion step through by tapping.

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

const STEP_MS = 3200;

interface Step {
  title: string;
  icon: ReactNode;
  ours?: boolean;
  end?: boolean;
  scene: ReactNode;
}

const STEPS: Step[] = [
  {
    title: 'They search on Google',
    icon: <Search size={20} />,
    scene: (
      <div className="rl-scene rl-search">
        <div className="rl-searchbar">
          <Search size={18} aria-hidden="true" />
          <span className="rl-typed">plumber near me</span>
        </div>
        <span className="rl-result" />
        <span className="rl-result is-short" />
        <span className="rl-result" />
      </div>
    ),
  },
  {
    title: 'They read your reviews',
    icon: <GoogleIcon />,
    ours: true,
    scene: (
      <div className="rl-scene rl-review">
        <div className="rl-review-head">
          <span className="rl-avatar">T</span>
          <span>
            <strong>Thandi M.</strong>
            <span className="rl-muted">2 days ago</span>
          </span>
        </div>
        <span className="rl-stars">★★★★★</span>
        <p>Arrived on time and the price was fair. Would use again.</p>
      </div>
    ),
  },
  {
    title: 'They check your socials',
    icon: <FacebookIcon />,
    ours: true,
    scene: (
      <div className="rl-scene rl-post">
        <div className="rl-post-head">
          <span className="rl-fb">
            <FacebookIcon />
          </span>
          <span>
            <strong>Your business</strong>
            <span className="rl-muted">2 days ago</span>
          </span>
        </div>
        <img src={postImage} alt="" />
      </div>
    ),
  },
  {
    title: 'They open your website',
    icon: <Globe size={20} />,
    ours: true,
    scene: (
      <div className="rl-scene rl-site">
        {['Works on a phone', 'Tap to call or WhatsApp', 'Your services and areas'].map((t) => (
          <p key={t}>
            <span className="rl-tick">
              <Check size={16} aria-hidden="true" />
            </span>
            {t}
          </p>
        ))}
      </div>
    ),
  },
  {
    title: 'They get in touch',
    icon: <Phone size={20} />,
    end: true,
    scene: (
      <div className="rl-scene rl-chat">
        <span className="rl-bubble">Hi, are you free on Saturday?</span>
        <span className="rl-typing" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
    ),
  },
];

export default function ReputationLoop() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Move on every few seconds while the section is on screen; after the last step, start again
  useEffect(() => {
    if (!visible || still) return;
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [step, visible, still]);

  const current = STEPS[step];

  return (
    <section ref={ref} className="dd dd-a dd-sec rl">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Your reputation</p>
          <h2 className="dd-h2">Before anyone uses you, they look you up</h2>
          <p className="dd-sub">
            They find your Google reviews, your Facebook and Instagram, and your website. Together, that's your reputation.
          </p>
        </div>

        <div className="rl-stage-wrap">
          <div className={`rl-stage${current.end ? ' is-end' : ''}`} aria-live="polite">
            <div className="rl-stage-top">
              <span className="rl-count">
                Step {step + 1} of {STEPS.length}
              </span>
              {current.ours && <span className="rl-ours">We handle this</span>}
            </div>
            <h3 className="rl-title">{current.title}</h3>
            {/* key restarts the little scene animation each time the step changes */}
            <div key={step} className="rl-scene-wrap">
              {current.scene}
            </div>
            {!still && visible && <span key={`bar-${step}`} className="rl-timer" style={{ animationDuration: `${STEP_MS}ms` }} />}
          </div>

          <ol className="rl-steps" aria-label="The five steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  className={`rl-dot${i === step ? ' is-on' : ''}${i < step ? ' is-done' : ''}${s.end ? ' is-end' : ''}`}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={i === step ? 'step' : undefined}
                  onClick={() => setStep(i)}
                >
                  {s.icon}
                </button>
                <span className="rl-dot-label">{s.title.replace('They ', '')}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="rl-close">
          They check your competitors the same way. <strong>Make sure you're the one they pick.</strong>
        </p>
      </div>
    </section>
  );
}
