import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../../design-directions/directions.css';
import './sitechrome.css';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';

// Site header in the light look (8 Oct 2026), built for the join page as it becomes the homepage:
// logo, links to every service page, prices and about, and the amber "WhatsApp us" button.
// On a phone the links sit behind a menu button. Pages are moved onto it as they are rebuilt;
// until then the older pages keep the dark header in App.tsx. Change it here only.

type NavLink = { label: string; to: string };

const SITE_NAV: NavLink[] = [
  { label: 'Google reviews', to: '/reviews' },
  { label: 'Social media', to: '/social-media-posting-service' },
  { label: 'Websites', to: '/website-design-package' },
  { label: 'Prices', to: '/pricing' },
  { label: 'About', to: '/about' },
];

// Same-page links (#pricing) are plain anchors, WhatsApp opens in a new tab; pages go through the router
export function NavItem({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  if (/^https?:/.test(link.to))
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {link.label}
      </a>
    );
  return link.to.startsWith('#') ? (
    <a href={link.to} onClick={onClick}>
      {link.label}
    </a>
  ) : (
    <Link to={link.to} onClick={onClick}>
      {link.label}
    </Link>
  );
}

// minimal: logo and button only, for Google Ads landing pages, so ad visitors stay on the page (8 Oct 2026).
// whatsAppUrl: the page's own WhatsApp opening (src/whatsapp.ts), so its chats can be counted apart.
// cta: the page's own main action in the always-visible bar instead of "WhatsApp us" (the website page's
// "Instant price", like Cosmo Pools' "Get Quote", 12 Oct 2026); WhatsApp then moves into the links.
export default function SiteHeader({
  minimal = false,
  whatsAppUrl = SITE_WHATSAPP_URL,
  cta,
}: {
  // Not used since 9 Oct 2026: "Prices" always opens /pricing. Kept so pages that still pass it build.
  pricingHref?: string;
  minimal?: boolean;
  whatsAppUrl?: string;
  cta?: { label: string; onClick: () => void };
}) {
  const [open, setOpen] = useState(false);
  const nav = minimal ? [] : cta ? [...SITE_NAV, { label: 'WhatsApp us', to: whatsAppUrl }] : SITE_NAV;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="dd dd-a dd-header sh" id="top">
      <div className="dd-container dd-header-in">
        {minimal ? (
          <span className="sh-logo">
            <img src={logoLight} alt="Local Pros Studio" width={124} height={28} />
          </span>
        ) : (
          <Link to="/" className="sh-logo" aria-label="Local Pros Studio home">
            <img src={logoLight} alt="Local Pros Studio" width={124} height={28} />
          </Link>
        )}
        {!minimal && (
          <nav className="dd-nav" aria-label="Main">
            {nav.map((l) => (
              <NavItem key={l.label} link={l} />
            ))}
          </nav>
        )}
        {cta ? (
          <button type="button" className="dd-btn dd-btn-nav sh-cta" onClick={cta.onClick}>
            {cta.label}
          </button>
        ) : (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`dd-btn dd-btn-nav${minimal ? ' sh-btn-end' : ''}`}
          >
            WhatsApp us
          </a>
        )}
        {!minimal && (
          <button
            type="button"
            className="sh-menu-btn"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      {open && (
        <nav id="site-menu" className="sh-panel" aria-label="Main">
          <ul className="dd-container">
            {nav.map((l) => (
              <li key={l.label}>
                <NavItem link={l} onClick={() => setOpen(false)} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
