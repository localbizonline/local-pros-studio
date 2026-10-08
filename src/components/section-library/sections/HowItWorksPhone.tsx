import { useRef } from 'react';
import '../../design-directions/directions.css';
import './howitworksphone.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from '../../design-directions/ReviewDemo';

// "How it works" with the looping WhatsApp-to-Google phone. Saved from the "Before / after
// slider" draft (/review-versions/1) on 7 Oct 2026 because Jeremy liked it. Dark band; the three
// steps light up in time with the phone. Step 2 no longer says unhappy customers go to a private
// form (review gating, which Google does not allow).

const STEPS = [
  {
    title: 'You finish the job',
    body: 'We pick it up from your Sage or QuickBooks invoices, a BCC on your invoice email, or a quick form.',
  },
  {
    title: 'Your customer gets a WhatsApp',
    body: 'It thanks them and asks for a Google review. If something went wrong, they can reply and you hear about it straight away.',
  },
  {
    title: 'They leave a Google review',
    body: 'One tap opens your Google profile, ready to rate, with a friendly reminder if they forget.',
  },
];

export default function HowItWorksPhone() {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);

  return (
    <section ref={ref} className="dd dd-a dd-sec dd-demo hiw">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">You finish the job. We do the rest.</h2>
          <p className="dd-sub">
            Three steps, and only the first one is yours. Your customer taps one link and the review goes up on your Google
            profile.
          </p>
        </div>
        <div className="dd-demo-grid">
          <div>
            <ReviewPhone phase={phase} />
          </div>
          <div>
            <ol className="dd-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className={i === active ? 'is-active' : ''}>
                  <span className="dd-step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="dd-h3">{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="hiw-posts">
              <strong>For your posts:</strong> WhatsApp us your job photos. We write the posts and publish them every week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
