// "Trusted by businesses across South Africa": a wall of client logos at the top of the footer (9 Oct 2026),
// on every page with the shared footer (SiteFooter.tsx). Ported from the join site (localpros-join,
// src/components/grow/TrustedLogos.astro) and styled after the websites montage: rows get bigger and
// brighter towards the front. Logos are live Local Pros Studio clients from the Social Posting (SP2)
// database, read 9 Oct 2026. To change one, put a trimmed .webp in assets/images/trusted-logos/ and edit
// the lists below. Styles: .tl in sitechrome.css.
import type { CSSProperties } from 'react';

const files = import.meta.glob<string>('../../../assets/images/trusted-logos/*.webp', {
  eager: true,
  import: 'default',
});
const logo = (slug: string) => files[`../../../assets/images/trusted-logos/${slug}.webp`];

// File slug → business name (the alt text).
const L: Record<string, string> = {
  'petport': 'PETport',
  'mr-bin': 'Mr Bin',
  'top-spec-gas-installations': 'Top Spec Gas Installations',
  'maramba-fencing-and-gates': 'Maramba Fencing and Gates',
  'critter-ridders-pest-control': 'Critter Ridders Pest Control',
  'fusion-plumbing': 'Fusion Plumbing',
  'winelands-gas-pty-ltd': 'Winelands Gas',
  'jj-locksmith': 'JJ Locksmith',
  'alunite-east-rand': 'Alunite East Rand',
  'aquatic-pools': 'Aquatic Pools',
  'bkc-pet': 'BKC Pet',
  'csd-concrete-palisade': 'CSD Concrete Palisade',
  'dish-africa-satellites': 'Dish Africa Satellites',
  'ehl-gas': 'EHL Gas',
  'elangeni-buildings': 'Elangeni Buildings',
  'floorsbydesign': 'Floors By Design',
  'general-fencing-and-construction': 'General Fencing and Construction',
  'holmes-waterproofing-and-painting': 'Holmes Painting and Waterproofing',
  'impact-emergency-electrical-and-plumbing': 'Impact Emergency Services',
  'mse-plumbing': 'MSE Plumbing',
  'nph-engineering-consultants': 'NPH Engineering',
  'national-fitment-solutions': 'National Fitment Solutions',
  'perimeter-cctv': 'Perimeter CCTV',
  'pool-king': 'Pool King',
  'qp-construction-roofing': 'QP Construction and Roofing',
  'qonstrukt': 'Qonstrukt',
  'sa-gutter': 'SA Gutter',
  'secure-western-cape': 'SeCure Western Cape',
  'slip-technologies': 'Slip Technologies',
  'timber-construction': 'Timber Construction',
};

// Desktop: 9, 8, 7, 6 (back to front). Phone: six rows of 5, same order.
const desktop = [
  ['nph-engineering-consultants', 'dish-africa-satellites', 'ehl-gas', 'sa-gutter', 'pool-king', 'national-fitment-solutions', 'qonstrukt', 'slip-technologies', 'bkc-pet'],
  ['perimeter-cctv', 'aquatic-pools', 'elangeni-buildings', 'holmes-waterproofing-and-painting', 'impact-emergency-electrical-and-plumbing', 'floorsbydesign', 'csd-concrete-palisade', 'qp-construction-roofing'],
  ['timber-construction', 'secure-western-cape', 'general-fencing-and-construction', 'alunite-east-rand', 'jj-locksmith', 'winelands-gas-pty-ltd', 'mse-plumbing'],
  ['critter-ridders-pest-control', 'top-spec-gas-installations', 'petport', 'mr-bin', 'maramba-fencing-and-gates', 'fusion-plumbing'],
];
const flat = desktop.flat();
const phone = Array.from({ length: 6 }, (_, i) => flat.slice(i * 5, i * 5 + 5));

const walls = [
  { rows: desktop, cls: 'tl-wall is-desktop', step: 0.06 },
  { rows: phone, cls: 'tl-wall is-phone', step: 0.035 },
];

export default function TrustedLogos() {
  return (
    <section className="dd dd-a tl" aria-labelledby="trusted-title">
      <div className="dd-container">
        <div className="dd-head tl-head">
          <p className="dd-eyebrow">Our clients</p>
          <h2 id="trusted-title" className="dd-h2">
            Trusted by businesses across South Africa.
          </h2>
          <p className="dd-sub">
            Plumbers, gas installers, fencing, pest control, pet transport and more.{' '}
            <span className="tl-line">From Cape Town to Durban.</span>
          </p>
        </div>

        {walls.map(({ rows, cls, step }) => (
          <div key={cls} className={cls} style={{ '--step': step } as CSSProperties}>
            {rows.map((row, r) => (
              <div
                key={r}
                className="tl-row"
                style={{ '--depth': rows.length - 1 - r, '--n': row.length, zIndex: r + 1 } as CSSProperties}
              >
                {row.map((slug) => (
                  <div key={slug} className="tl-tile">
                    <img src={logo(slug)} alt={L[slug]} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
