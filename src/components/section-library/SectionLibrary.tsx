import type { ComponentType } from 'react';
import '../design-directions/directions.css';
import './sectionlibrary.css';
import HowItWorksPhone from './sections/HowItWorksPhone';
import HeroThreeServices from './sections/HeroThreeServices';
import WhyItMatters from './sections/WhyItMatters';
import FitCheck from './sections/FitCheck';
import WhatWeDoOffer from './sections/WhatWeDoOffer';
import ServiceRows from './sections/ServiceRows';
import ReputationPath from './sections/ReputationPath';
import ReputationStory from './sections/ReputationStory';
import ProofSection from './sections/ProofSection';
import Pricing from './sections/Pricing';

// Section library (started 7 Oct 2026): sections Jeremy has picked from drafts, saved as their own
// components so they outlive the drafts they came from. New pages should start from these.
// Shown at /review-versions/sections (noindex). Add one entry per saved section.

interface SavedSection {
  name: string;
  from: string;
  saved: string;
  note?: string;
  Section: ComponentType;
}

const SECTIONS: SavedSection[] = [
  {
    name: 'What we do: one row per service',
    from: 'Built for the join page',
    saved: '7 Oct 2026',
    note: 'Photo, heading and blurb for website design, social media posting and Google review collection; photo side swaps each row. On cream, with three client sites fanned out (option A).',
    Section: () => <ServiceRows websiteVisual="fan" tone="cream" />,
  },
  {
    name: 'Price: the package, or one service',
    from: 'Price section options A to C, version A',
    saved: '8 Oct 2026',
    note: 'Package card first (R2,500 a month, R700 less than reviews and posts on their own) with the new website as an optional free extra on a 12-month commitment, worth R9,900; then each service on its own with its price and terms. Used on the join page.',
    Section: () => <Pricing />,
  },
  {
    name: 'The proof: real client numbers, posts and logos',
    from: 'Proof options A to C with SP2 data, version C',
    saved: '8 Oct 2026',
    note: 'Real totals from SP2 (64 businesses, 789 posts in 30 days, 461 of them done-for-you, new reviews at 4.9 on average), a wall of 12 client posts (mostly done-for-you, a few from job photos), the top 5 client review gains as rows with logo and Google mark, our own Local Pros row, our reviews feed, then websites as numbers (500+ since 2015) over one montage. Used on the join page.',
    Section: () => <ProofSection />,
  },
  {
    name: 'Hero: three services',
    from: 'Hero options A to J (since deleted), version A',
    saved: '8 Oct 2026',
    note: 'Search phrase as a small H1 line, "More Google reviews. Social media posts. A better website.", one sentence on how, two buttons, price in small print, wide photo. Used on the join page.',
    Section: () => <HeroThreeServices />,
  },
  {
    name: 'Your reputation: the customer path',
    from: 'Reputation section options, version A',
    saved: '7 Oct 2026',
    note: 'Five steps people take before they get in touch; the three we handle are tagged. The still version; the join page now uses the animated one.',
    Section: ReputationPath,
  },
  {
    name: 'Your reputation, animated: follow the customer',
    from: 'Reputation, animated, version 1',
    saved: '7 Oct 2026',
    note: 'The path fills in and each step lights up as you scroll to it; the last step turns amber. On the join page.',
    Section: () => <ReputationStory variant="follow" />,
  },
  {
    name: 'Why it matters now, with two phone photos',
    from: 'Homepage draft B',
    saved: '7 Oct 2026',
    note: 'Dark band: customers write reviews, Google repeats them, plus the closing line. Used on the join page.',
    Section: WhyItMatters,
  },
  {
    name: 'Is this for your business?',
    from: 'Homepage draft C (since deleted), reworded',
    saved: '7 Oct 2026',
    note: 'Good fit / not a fit, plus the business types. Plain wording instead of "businesses people need to trust".',
    Section: FitCheck,
  },
  {
    name: 'What we do, with the price',
    from: 'Join page (localpros.co.za/join), our colours',
    saved: '7 Oct 2026',
    note: 'Two plain sentences with the Facebook, Instagram and Google logos, then "All in one for R2,500". Taken off the join page because it repeated the hero.',
    Section: WhatWeDoOffer,
  },
  {
    name: 'How it works, with the animated phone',
    from: 'Draft 1, "Before / after slider"',
    saved: '7 Oct 2026',
    note: 'The phone plays a WhatsApp review request turning into a Google review; the steps light up in time. Meant for the /reviews page.',
    Section: HowItWorksPhone,
  },
];

export default function SectionLibrary() {
  return (
    <div className="dd dd-a sl">
      <header className="sl-intro">
        <div className="dd-container">
          <p className="dd-eyebrow">Reference, not live</p>
          <h1 className="dd-h2">Section library</h1>
          <p>
            Sections picked from the drafts, saved for future pages. {SECTIONS.length} saved so far.
          </p>
        </div>
      </header>

      {SECTIONS.map(({ name, from, saved, note, Section }, i) => (
        <article key={name} className="sl-item">
          <div className="sl-label">
            <div className="dd-container sl-label-in">
              <span className="sl-num">{i + 1}</span>
              <div>
                <strong>{name}</strong>
                <span>
                  From {from} · saved {saved}
                  {note ? ` · ${note}` : ''}
                </span>
              </div>
            </div>
          </div>
          <Section />
        </article>
      ))}
    </div>
  );
}
