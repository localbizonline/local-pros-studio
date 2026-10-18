import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { COMPARE } from './categories';

// "Why choose us" on the category pages (Jeremy, 18 Oct 2026): three side-by-side versions to pick from. The
// typical side is from the published packages of 20 South African web design companies (categories.ts COMPARE).
// Pick one with ?cmp=1, ?cmp=2 or ?cmp=3 on the page's address; without it, visitors see version 1.

const VERSIONS = ['1', '2', '3'] as const;
type Version = (typeof VERSIONS)[number];

// Read after the pre-built page has been taken over, so the first render matches the HTML
const useVersion = (): Version => {
  const [v, setV] = useState<Version>('1');
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get('cmp');
    if (asked && (VERSIONS as readonly string[]).includes(asked)) setV(asked as Version);
  }, []);
  return v;
};

function Footnote() {
  return (
    <>
      <p className="gx-cmp-proof">
        <strong>500+ websites built since 2015</strong>, and thousands of South African business owners helped through Local Pros.
      </p>
      <p className="gx-cmp-source">
        Most web designers: from the published packages and price lists of 20 South African web design companies, October 2026.
      </p>
    </>
  );
}

function Head({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="dd-head">
      <p className="dd-eyebrow">{eyebrow}</p>
      <h2 className="dd-h2">{title}</h2>
      {sub && <p className="dd-sub">{sub}</p>}
    </div>
  );
}

// 1. Two columns, ours a dark card running down the whole table
function Columns({ who }: { who: string }) {
  return (
    <>
      <Head eyebrow="Why Local Pros Studio" title="Most web designers charge extra for this. We include it." />
      <div className="gx-c1" role="table" aria-label="Most web designers compared with Local Pros Studio">
        <div className="gx-c1-row gx-c1-head" role="row">
          <span className="gx-c1-them" role="columnheader">
            Most web designers
          </span>
          <span className="gx-c1-us" role="columnheader">
            Local Pros Studio
          </span>
        </div>
        {COMPARE.map((r) => (
          <div key={r.topic} className="gx-c1-row" role="row">
            <p className="gx-c1-them" role="cell">
              <span className="gx-c1-topic">{r.topic}</span>
              {r.them}
            </p>
            <p className="gx-c1-us" role="cell">
              <span className="gx-c1-topic">{r.topic}</span>
              <span className="gx-c1-tick">
                <Check size={16} aria-hidden="true" />
                {r.us(who)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

// 2. What it costs: their extras priced, ours included, then the bottom line
function Costs({ who }: { who: string }) {
  return (
    <>
      <Head eyebrow="What a website really costs" title="Same budget. Far more done for you." sub="The extras most web designers add on, next to what our price includes." />
      <div className="gx-c2" role="table" aria-label="What most web designers charge extra for, and what Local Pros Studio includes">
        <div className="gx-c2-row gx-c2-head" role="row">
          <span role="columnheader">Most web designers</span>
          <span role="columnheader">Local Pros Studio</span>
        </div>
        {COMPARE.map((r) => (
          <div key={r.topic} className="gx-c2-row" role="row">
            <p className="gx-c2-topic" role="rowheader">
              {r.topic}
            </p>
            <p className="gx-c2-them" role="cell">
              <span className="gx-c2-price">{r.themCost}</span>
            </p>
            <p className="gx-c2-us" role="cell">
              <span className="gx-c2-in">{r.usShort === 'Included' ? 'Included' : r.us(who)}</span>
            </p>
          </div>
        ))}
        <div className="gx-c2-row gx-c2-total" role="row">
          <p className="gx-c2-topic" role="rowheader">
            Your price
          </p>
          <p className="gx-c2-them" role="cell">
            From about R4,500, plus the extras above
          </p>
          <p className="gx-c2-us" role="cell">
            From R6,500, then R290 a month. All of the above included.
          </p>
        </div>
      </div>
    </>
  );
}

// 3. A scorecard: one or two words each side, our column counted up at the bottom
function Scorecard() {
  const ours = COMPARE.length;
  return (
    <>
      <Head eyebrow="Why Local Pros Studio" title="Everything your website needs to bring in work. Included." />
      <div className="gx-c3" role="table" aria-label="Scorecard: most web designers compared with Local Pros Studio">
        <div className="gx-c3-row gx-c3-head" role="row">
          <span role="columnheader" />
          <span role="columnheader">Most web designers</span>
          <span role="columnheader" className="gx-c3-us-head">
            Local Pros Studio
          </span>
        </div>
        {COMPARE.map((r) => (
          <div key={r.topic} className="gx-c3-row" role="row">
            <p className="gx-c3-topic" role="rowheader">
              {r.topic}
            </p>
            <p className="gx-c3-them" role="cell">
              <X size={18} aria-hidden="true" />
              <span>{r.themShort}</span>
            </p>
            <p className="gx-c3-us" role="cell">
              <Check size={18} aria-hidden="true" />
              <span>{r.usShort}</span>
            </p>
          </div>
        ))}
        <div className="gx-c3-row gx-c3-score" role="row">
          <p className="gx-c3-topic" role="rowheader">
            Included
          </p>
          {/* Not "0 of 6": a few web designers do include the writing or deliver fast */}
          <p className="gx-c3-them" role="cell">
            Some, often extra
          </p>
          <p className="gx-c3-us" role="cell">
            All {ours}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Compare({ who }: { who: string }) {
  const v = useVersion();
  return (
    <section className={`dd-sec gx-compare gx-compare-${v}`} data-section={`Why choose us (version ${v})`}>
      <div className="dd-container">
        {v === '1' && <Columns who={who} />}
        {v === '2' && <Costs who={who} />}
        {v === '3' && <Scorecard />}
        <Footnote />
      </div>
    </section>
  );
}
