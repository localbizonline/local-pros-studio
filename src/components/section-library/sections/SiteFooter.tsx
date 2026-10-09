import { Link } from 'react-router-dom';
import '../../design-directions/directions.css';
import './sitechrome.css';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';
import { NavItem } from './SiteHeader';
import logoLight from '../../../assets/images/Compressed/Local Pros Studio logo transparent.png';

// Site footer in the light look (8 Oct 2026): dark band with links to every page, so visitors and
// Google can reach the whole site from the homepage. Pages move onto it as they are rebuilt;
// until then the older pages keep the footer in components/Footer.tsx. Change it here only.

// minimal: brand, contact and legal links only, for Google Ads landing pages (8 Oct 2026)
export default function SiteFooter({
  faqHref = '/#faq',
  minimal = false,
  whatsAppUrl = SITE_WHATSAPP_URL,
}: {
  // Not used since 9 Oct 2026: "Prices" always opens /pricing. Kept so pages that still pass it build.
  pricingHref?: string;
  faqHref?: string;
  minimal?: boolean;
  whatsAppUrl?: string;
}) {
  const services = [
    { label: 'Google reviews', to: '/reviews' },
    { label: 'Social media posting', to: '/social-media-posting-service' },
    { label: 'Website design', to: '/web-design' },
    { label: 'R2,500 plan', to: '/special-offer-bundle' },
  ];
  const company = [
    { label: 'About us', to: '/about' },
    { label: 'Prices', to: '/pricing' },
    { label: 'Questions', to: faqHref },
  ];
  const legal = [
    { label: 'Terms and conditions', to: '/terms' },
    { label: 'Privacy policy', to: '/privacy' },
    { label: 'Refunds and cancellations', to: '/refunds-cancellations' },
    { label: 'Website terms and FAQ', to: '/website-faq' },
  ];
  const groups = minimal
    ? [{ title: 'Legal', links: legal }]
    : [
        { title: 'Services', links: services },
        { title: 'Company', links: company },
        { title: 'Legal', links: legal },
      ];

  return (
    <footer className="dd dd-a dd-footer sf">
      <div className="dd-container">
        <div className={`sf-grid${minimal ? ' is-minimal' : ''}`}>
          <div className="sf-brand">
            {minimal ? (
              <img src={logoLight} alt="Local Pros Studio" width={124} height={28} className="sf-logo" />
            ) : (
              <Link to="/" aria-label="Local Pros Studio home">
                <img src={logoLight} alt="Local Pros Studio" width={124} height={28} className="sf-logo" />
              </Link>
            )}
            <p>Google reviews, social media posts and websites for South African businesses.</p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <p className="dd-footer-title">{g.title}</p>
              <ul>
                {g.links.map((l) => (
                  <li key={l.label}>
                    <NavItem link={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="dd-footer-title">Contact</p>
            <ul>
              <li>
                <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp 083 233 6716
                </a>
              </li>
              <li>
                <a href="mailto:hello@localpros.co.za">hello@localpros.co.za</a>
              </li>
              <li>South Africa</li>
            </ul>
          </div>
        </div>
        <p className="dd-footer-base">© {new Date().getFullYear()} Local Pros Studio</p>
      </div>
    </footer>
  );
}
