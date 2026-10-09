import ServiceRows, { type SectionTone, type WebsiteVisual } from '../section-library/sections/ServiceRows';

// "What we do" rows with three ways to show more than one website, each on a different
// background (7 Oct 2026). Shown at /review-versions/services (noindex).

const OPTIONS: { visual: WebsiteVisual; tone: SectionTone; name: string; note: string }[] = [
  { visual: 'fan', tone: 'cream', name: 'A. Three phones, cream background', note: 'PETport, Maramba Fence & Gates and Winelands Gas on phones, fanned out' },
  { visual: 'devices', tone: 'grey', name: 'B. Laptop and phone, light grey background', note: 'The PETport site on a computer with the same site on a phone in front' },
  { visual: 'grid', tone: 'dark', name: 'C. Six sites, dark background', note: 'Six client sites on phones with their names' },
];

export default function ServicesOptions() {
  return (
    <div>
      {OPTIONS.map((o) => (
        <div key={o.visual}>
          <div style={{ background: '#fef3c7', borderTop: '1px solid #fde68a', borderBottom: '1px solid #fde68a', padding: '10px 20px', font: '14px/1.35 system-ui, sans-serif' }}>
            <strong style={{ color: '#1c1917' }}>{o.name}</strong>
            <br />
            <span style={{ color: '#44403c' }}>{o.note}</span>
          </div>
          <ServiceRows websiteVisual={o.visual} tone={o.tone} />
        </div>
      ))}
    </div>
  );
}
