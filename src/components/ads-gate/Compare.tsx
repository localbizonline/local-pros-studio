import { Check, X } from 'lucide-react';
import { COMPARE } from './categories';

// "Why choose us" on the category pages: a scorecard, most web designers vs us (Jeremy picked it on 18 Oct 2026
// from three versions; the other two, two dark columns and a priced list, are in git history). The "most web
// designers" side is from the published packages of 20 South African web design companies (categories.ts COMPARE).

export default function Compare() {
  return (
    <section className="dd-sec gx-compare" data-section="Why choose us">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Why Local Pros Studio</p>
          <h2 className="dd-h2">Everything your website needs to bring in work. Included.</h2>
        </div>
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
                <span>{r.them}</span>
              </p>
              <p className="gx-c3-us" role="cell">
                <Check size={18} aria-hidden="true" />
                <span>{r.us}</span>
              </p>
            </div>
          ))}
          {/* Not "0 of 6": a few web designers do include the writing or deliver fast */}
          <div className="gx-c3-row gx-c3-score" role="row">
            <p className="gx-c3-topic" role="rowheader">
              Included
            </p>
            <p className="gx-c3-them" role="cell">
              Some, often extra
            </p>
            <p className="gx-c3-us" role="cell">
              All {COMPARE.length}
            </p>
          </div>
        </div>
        <p className="gx-cmp-proof">
          <strong>500+ websites built since 2015</strong>, and thousands of South African business owners helped through Local Pros.
        </p>
        <p className="gx-cmp-source">Most web designers: from the published packages and price lists of 20 South African web design companies, October 2026.</p>
      </div>
    </section>
  );
}
