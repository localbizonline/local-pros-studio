import { Link } from 'react-router-dom';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';

// Shown for any address the site doesn't know (9 Oct 2026): before this, a mistyped or old address showed an empty
// page in the old dark style. Kept out of Google by seo.ts (unknown addresses are noindex). Styles in notfound.css.

const PAGES = [
  { to: '/', label: 'Home' },
  { to: '/reviews', label: 'Google reviews' },
  { to: '/social-media-posting-service', label: 'Social media posting' },
  { to: '/website-design-package', label: 'Website design' },
  { to: '/pricing', label: 'Prices' },
];

export default function NotFound() {
  return (
    <div className="dd dd-a nf">
      <SiteHeader />
      <main className="nf-main">
        <div className="dd-container nf-in">
          <p className="dd-eyebrow">Page not found</p>
          <h1 className="nf-title">We can’t find that page.</h1>
          <p className="nf-lede">It may have moved, or the link may be old. These are the pages people look for most:</p>
          <ul className="nf-links">
            {PAGES.map((p) => (
              <li key={p.to}>
                <Link to={p.to}>{p.label}</Link>
              </li>
            ))}
          </ul>
          <p className="nf-or">
            Or{' '}
            <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>{' '}
            and a real person will help.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
