import ReputationStory, { type StoryVariant } from '../section-library/sections/ReputationStory';
import ReputationLoop from './ReputationLoop';

// The three animated versions of "Your reputation", one after another with a label each.
// Shown at /review-versions/rep-motion (noindex).

const VERSIONS: { variant: StoryVariant; name: string; note: string }[] = [
  { variant: 'follow', name: '1. Follow the customer', note: 'The path fills in and each step lights up as you reach it' },
  { variant: 'find', name: '2. What they find', note: 'Plus what the customer actually sees at each step' },
  { variant: 'versus', name: '3. You vs a competitor', note: 'Plus your business and a competitor side by side, until they pick you' },
];

export default function ReputationMotionOptions() {
  return (
    <div>
      <div style={{ background: '#fef3c7', borderTop: '1px solid #fde68a', borderBottom: '1px solid #fde68a', padding: '10px 20px', font: '14px/1.35 system-ui, sans-serif' }}>
        <strong style={{ color: '#1c1917' }}>New: 2, spread out and looping</strong>
        <br />
        <span style={{ color: '#44403c' }}>One step at a time on a big card; plays through by itself, then starts again</span>
      </div>
      <ReputationLoop />
      {VERSIONS.map((v) => (
        <div key={v.variant}>
          <div style={{ background: '#fef3c7', borderTop: '1px solid #fde68a', borderBottom: '1px solid #fde68a', padding: '10px 20px', font: '14px/1.35 system-ui, sans-serif' }}>
            <strong style={{ color: '#1c1917' }}>{v.name}</strong>
            <br />
            <span style={{ color: '#44403c' }}>{v.note}</span>
          </div>
          <ReputationStory variant={v.variant} />
        </div>
      ))}
    </div>
  );
}
