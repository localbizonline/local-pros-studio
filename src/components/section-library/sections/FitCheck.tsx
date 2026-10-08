import { Check, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './fitcheck.css';

// "Is it a fit?" section, 7 Oct 2026. Jeremy found "Built for businesses people need to trust"
// confusing, so the wording is plain: who it works for and who it does not. Health practitioners
// (doctors, dentists, physios) stay off the list until we check HPCSA rules on testimonials.
// Used on the join page; change it here only.

const GOOD_FIT = [
  'People look you up on Google before they call or book',
  'Your customers use WhatsApp',
  'You have happy customers who would leave a review',
];

const NOT_A_FIT = [
  'You only sell online and have no Google Business Profile',
  'You want bought or fake reviews',
  'Your customers do not use WhatsApp',
];

// Grouped by type of business, each group on one line (layout taken from the /home-hybrid draft,
// which Jeremy liked for this part only, 7 Oct 2026).
const BUSINESS_GROUPS = [
  { name: 'Trades and home services', items: 'plumbers, electricians, roofers, solar, pest control, pool and cleaning services' },
  { name: 'Vets and pet services', items: 'vets, pet shippers, dog groomers, kennels' },
  { name: 'Professional services', items: 'accountants, attorneys, estate agents, financial advisers' },
  { name: 'Beauty, fitness and motor', items: 'salons, hairdressers, personal trainers, mechanics, driving schools' },
];

export default function FitCheck() {
  return (
    <section className="dd dd-a dd-sec fit">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Who it's for</p>
          <h2 className="dd-h2">Is this for your business?</h2>
        </div>
        <div className="fit-cols">
          <div className="fit-col">
            <h3 className="dd-h3">A good fit if</h3>
            <ul>
              {GOOD_FIT.map((t) => (
                <li key={t}>
                  <Check size={20} aria-hidden="true" className="fit-yes" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="fit-col">
            <h3 className="dd-h3">Not a fit if</h3>
            <ul>
              {NOT_A_FIT.map((t) => (
                <li key={t}>
                  <X size={20} aria-hidden="true" className="fit-no" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="fit-groups">
          <p className="dd-tags-label">Works well for</p>
          <ul>
            {BUSINESS_GROUPS.map((g) => (
              <li key={g.name}>
                <strong>{g.name}:</strong> {g.items}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
