import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import pavingDesktop from '../../assets/images/portfolio/pavingpros-desktop.webp';
import pavingMobile from '../../assets/images/portfolio/pavingpros-mobile.webp';
import bkcDesktop from '../../assets/images/portfolio/bkcpet-desktop.webp';
import bkcMobile from '../../assets/images/portfolio/bkcpet-mobile.webp';
import petportDesktop from '../../assets/images/portfolio/petport-desktop.webp';
import petportMobile from '../../assets/images/portfolio/petport-mobile.webp';
import jacuzziDesktop from '../../assets/images/portfolio/jacuzzipros-desktop.webp';
import jacuzziMobile from '../../assets/images/portfolio/jacuzzipros-mobile.webp';
import winelandsDesktop from '../../assets/images/portfolio/winelandsgas-desktop.webp';
import winelandsMobile from '../../assets/images/portfolio/winelandsgas-mobile.webp';
import marambaDesktop from '../../assets/images/portfolio/maramba-desktop.webp';
import marambaMobile from '../../assets/images/portfolio/maramba-mobile.webp';

// "Recent work" from the old dark /website-design page, which Jeremy liked (8 Oct 2026), in the light
// look: one row per client, the site on a computer (scrolling through the whole homepage once it is in
// view) with the phone version in front, then what we built and why. Rows swap sides on wider screens.

const SITES = [
  {
    name: 'Paving Pros',
    domain: 'pavingpros.co.za',
    href: 'https://www.pavingpros.co.za/',
    industry: 'Paving contractors',
    area: 'Johannesburg, Pretoria, Durban and Cape Town',
    headline: 'One brand, four cities, a steady flow of quote requests.',
    text: 'Pages for driveways, pools and walkways, and a page for each city, so the business shows up where it works.',
    features: ['Online quote request', 'A page per city', 'Live chat'],
    desktop: pavingDesktop,
    mobile: pavingMobile,
  },
  {
    name: 'Winelands Gas',
    domain: 'winelandsgas.co.za',
    href: 'https://www.winelandsgas.co.za/',
    industry: 'Gas installations, homes and businesses',
    area: 'Western Cape',
    headline: 'Installs, repairs and CoC certificates, all in one place.',
    text: 'Home and business gas services laid out clearly, with registered-installer details and a quote button on every screen.',
    features: ['Quote buttons', 'Home and business pages', 'Tap to call'],
    desktop: winelandsDesktop,
    mobile: winelandsMobile,
  },
  {
    name: 'PETport',
    domain: 'petport.co.za',
    href: 'https://www.petport.co.za/',
    industry: 'Pet transport, local and international',
    area: 'Offices in four cities',
    headline: 'A complicated service made simple to book.',
    text: 'Separate paths for local moves, export consults and crate fittings, so every visitor lands on the right next step.',
    features: ['Online estimate tool', 'WhatsApp enquiries', 'Consult bookings'],
    desktop: petportDesktop,
    mobile: petportMobile,
  },
  {
    name: 'BKC Pet',
    domain: 'bkcpet.co.za',
    href: 'https://bkcpet.co.za/',
    industry: 'Pet boarding and kennels',
    area: 'Benoni',
    headline: 'A local kennel that looks like the obvious, trusted choice.',
    text: 'Real photos of the kennels, clear services, and the usual questions answered before the owner picks up the phone.',
    features: ['Quote form', 'Tap to call', 'Set up for local searches'],
    desktop: bkcDesktop,
    mobile: bkcMobile,
  },
  {
    name: 'Jacuzzi Pros',
    domain: 'jacuzzipros.co.za',
    href: 'https://www.jacuzzipros.co.za/',
    industry: 'Hot tub sales and repairs',
    area: 'South Africa',
    headline: 'A premium product with a first impression to match.',
    text: 'Big photos of new installs, with a clear separate route for repair and servicing enquiries.',
    features: ['Quote requests', 'Sales and service pages', 'Live chat'],
    desktop: jacuzziDesktop,
    mobile: jacuzziMobile,
  },
  {
    name: 'Maramba Fence & Gates',
    domain: 'maramba.co.za',
    href: 'https://www.maramba.co.za/',
    industry: 'Fencing and gates',
    area: 'Cape Town',
    headline: 'Google reviews up front, a quote one tap away.',
    text: 'Live Google reviews straight under the opening photo, every type of fencing, and WhatsApp and call buttons on every screen.',
    features: ['Live Google reviews', 'WhatsApp button', 'Free quote requests'],
    desktop: marambaDesktop,
    mobile: marambaMobile,
  },
];

// Starts once the frame is on screen, so the scroll always begins at the client's opening section
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [inView]);
  return { ref, inView };
}

function Screens({ site }: { site: (typeof SITES)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div className="rw-screens" ref={ref}>
      <div className="rw-desk">
        <p className="rw-bar" aria-hidden="true">
          {site.domain}
        </p>
        <div className="rw-desk-view">
          <img
            src={site.desktop}
            alt={`The ${site.name} website on a computer`}
            width={960}
            height={2880}
            loading="lazy"
            className={inView ? 'is-panning' : ''}
          />
        </div>
      </div>
      <div className="rw-phone">
        <img src={site.mobile} alt={`The ${site.name} website on a phone`} width={585} height={1266} loading="lazy" />
      </div>
    </div>
  );
}

export default function RecentWork({ onVisit }: { onVisit?: (domain: string) => void }) {
  return (
    <section className="dd-sec rw" id="work">
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">Recent work</p>
          <h2 className="dd-h2">Real websites for real South African businesses</h2>
          <p className="dd-sub">A few of the 500+ websites we have built since 2015. Every one is live: open them on your phone.</p>
        </div>
        <ul className="rw-list">
          {SITES.map((s) => (
            <li key={s.name} className="rw-row">
              <Screens site={s} />
              <div className="rw-copy">
                <p className="rw-industry">{s.industry}</p>
                <h3 className="rw-name">{s.name}</h3>
                <p className="rw-area">{s.area}</p>
                <p className="rw-headline">{s.headline}</p>
                <p className="rw-text">{s.text}</p>
                <ul className="rw-tags">
                  {s.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="dd-link rw-link" onClick={() => onVisit?.(s.domain)}>
                  Visit {s.domain}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <figure className="rw-result">
          <p className="rw-result-label">One website, one job</p>
          <blockquote>
            A Cape Town gas installation client landed an <span className="wdl-u">R2 million installation job</span> through the online
            presence we built and manage for them.
          </blockquote>
          <figcaption>That one job paid for everything many times over.</figcaption>
        </figure>
      </div>
    </section>
  );
}
