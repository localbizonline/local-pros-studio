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

// Other pages pass their own lists (the website page since 8 Oct 2026); the defaults are the join page's.
type FitCheckProps = {
  title?: string;
  sub?: string;
  goodFit?: string[];
  notAFit?: string[];
  groups?: { name: string; items: string }[];
};

export default function FitCheck({
  title = 'Is this for your business?',
  sub,
  goodFit = GOOD_FIT,
  notAFit = NOT_A_FIT,
  groups = BUSINESS_GROUPS,
}: FitCheckProps) {
  return (
    <section className="dd dd-a dd-sec fit">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Who it's for</p>
          <h2 className="dd-h2">{title}</h2>
          {sub && <p className="dd-sub">{sub}</p>}
        </div>
        <div className="fit-cols">
          <div className="fit-col">
            <h3 className="dd-h3">A good fit if</h3>
            <ul>
              {goodFit.map((t) => (
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
              {notAFit.map((t) => (
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
            {groups.map((g) => (
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
