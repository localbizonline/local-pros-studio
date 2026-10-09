import { useRef } from 'react';
import '../../design-directions/directions.css';
import './howitworksphone.css';
import ReviewPhone, { useDemoPhase, stepForPhase } from '../../design-directions/ReviewDemo';

// "How it works" with the looping WhatsApp-to-Google phone. Saved from the "Before / after
// slider" draft (/review-versions/1) on 7 Oct 2026 because Jeremy liked it. Dark band; the three
// steps light up in time with the phone. Step 2 no longer says unhappy customers go to a private
// form (review gating, which Google does not allow).

type Step = { title: string; body: string };

const STEPS: Step[] = [
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

// The reviews page passes its own wording and leaves out the posts line (9 Oct 2026); the defaults are the
// section library's.
export default function HowItWorksPhone({
  title = 'You finish the job. We do the rest.',
  sub = 'Three steps, and only the first one is yours. Your customer taps one link and the review goes up on your Google profile.',
  steps = STEPS,
  postsLine = true,
  id,
}: {
  title?: string;
  sub?: string;
  steps?: Step[];
  postsLine?: boolean;
  id?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const phase = useDemoPhase(ref);
  const active = stepForPhase(phase);

  return (
    <section ref={ref} id={id} className="dd dd-a dd-sec dd-demo hiw">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">How it works</p>
          <h2 className="dd-h2">{title}</h2>
          <p className="dd-sub">{sub}</p>
        </div>
        <div className="dd-demo-grid">
          <div>
            <ReviewPhone phase={phase} />
          </div>
          <div>
            <ol className="dd-steps">
              {steps.map((s, i) => (
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
            {postsLine && (
              <p className="hiw-posts">
                <strong>For your posts:</strong> WhatsApp us your job photos and we turn them into posts.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
