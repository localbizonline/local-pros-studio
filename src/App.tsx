import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
// Each page's code downloads only when someone opens it, the homepage's too (9 Oct 2026), so the ad
// landing pages don't carry the homepage. The pre-built HTML shows straight away either way.
// Since 8 Oct 2026 the homepage is the light "join" page (src/components/join-light/), with its own header and footer.
const JoinLight = lazy(() => import('./components/join-light/JoinLight'));
const AboutPage = lazy(() => import('./components/AboutPage'));
// The old dark social page, archived 9 Oct 2026 (noindex, /social-media-posting-service-archived)
const SocialPostingPageArchived = lazy(() => import('./components/archive/SocialPostingPageArchived'));
const SpecialOfferOpusPage = lazy(() => import('./components/SpecialOfferOpusPage'));
const RecurringServicesLetterPage = lazy(() => import('./components/RecurringServicesLetterPage'));
const AutopilotLandingPage = lazy(() => import('./components/AutopilotLandingPage'));
const WebDesignLight = lazy(() => import('./components/web-design-light/WebDesignLight'));
// Google reviews page in the light look, live on /reviews since 9 Oct 2026 (replaced the old dark ReviewsLetterPage)
const ReviewsLight = lazy(() => import('./components/reviews-light/ReviewsLight'));
// Social media posting page in the light look, the main social page since 9 Oct 2026 (drafted at /social-new)
const SocialLight = lazy(() => import('./components/social-light/SocialLight'));
// Every service and its price, with the package first (9 Oct 2026)
const PricingLight = lazy(() => import('./components/pricing-light/PricingLight'));
// Its styles load with the site's main stylesheet, not with the page's code: the pre-built HTML only links
// the main stylesheet, so a lazy page's own CSS arrived late and the hero flashed unstyled on refresh
// (8 Oct 2026). Do the same for any lazy-loaded page that has its own CSS file.
import './components/design-directions/directions.css';
import './components/web-design-light/webdesignlight.css';
import './components/reviews-light/reviewslight.css';
import './components/social-light/sociallight.css';
import './components/section-library/sections/whynote.css';
import './components/reviews-light/resultscards.css';
import './components/section-library/sections/howitworksphone.css';
import './components/join-light/styles';
const TermsPage = lazy(() => import('./components/LegalPages').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./components/LegalPages').then((m) => ({ default: m.PrivacyPage })));
const RefundsCancellationsPage = lazy(() => import('./components/LegalPages').then((m) => ({ default: m.RefundsCancellationsPage })));
const WebsiteFaqPage = lazy(() => import('./components/LegalPages').then((m) => ({ default: m.WebsiteFaqPage })));
// Temporary noindex review pages for choosing the site-wide design direction
const DesignDirections = lazy(() => import('./components/design-directions/DesignDirections'));
const ReviewVersions = lazy(() => import('./components/review-versions/ReviewVersions'));
import logo from './assets/images/Compressed/Local Pros Studio logo transparent.png';
import { whatsAppUrlForPath } from './whatsapp';
import { canonicalUrl, seoForPath } from './seo';
import { applyTeamDeviceLink } from './teamDevice';
import { markTeamDevice, trackSectionViews, trackWhatsAppClicks } from './analytics';

const setHeadTag = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const metaTag = (attrName: 'name' | 'property', key: string) => () => {
  const el = document.createElement('meta');
  el.setAttribute(attrName, key);
  return el;
};

// Keeps the tab title and search tags right as people click between pages.
// The first page load already arrives with them, written by scripts/prerender.mjs from the same list.
const PageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoForPath(pathname);
    const url = canonicalUrl(pathname);
    document.title = seo.title;
    setHeadTag('meta[name="description"]', metaTag('name', 'description'), 'content', seo.description);
    setHeadTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url);
    setHeadTag('meta[name="robots"]', metaTag('name', 'robots'), 'content', seo.noindex ? 'noindex' : 'index, follow');
    setHeadTag('meta[property="og:title"]', metaTag('property', 'og:title'), 'content', seo.title);
    setHeadTag('meta[property="og:description"]', metaTag('property', 'og:description'), 'content', seo.description);
    setHeadTag('meta[property="og:url"]', metaTag('property', 'og:url'), 'content', url);
  }, [pathname]);

  return null;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const whatsAppUrl = whatsAppUrlForPath(location.pathname);

  const navLinks = [
    { name: 'Reviews', href: '/reviews' },
    { name: 'Social Media', href: '/social-media-posting-service' },
    { name: 'Web Design', href: '/website-design-package' },
    { name: 'R2,500 Plan', href: '/special-offer-bundle' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 w-full backdrop-blur-lg z-50 bg-neutral-950/90 border-b border-neutral-800">
      <div className="container-lg">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Local Pros Studio"
              className="h-8 w-auto"
              width="120"
              height="32"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-neutral-800'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: 'header_get_started',
                    value: 1
                  });
                }
              }}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-neutral-800"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-white bg-neutral-800'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 mx-4"
                onClick={() => {
                  setIsOpen(false);
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'cta_click', {
                      event_category: 'engagement',
                      event_label: 'mobile_menu_get_started',
                      value: 1
                    });
                  }
                }}
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export const AppContent = () => {
  const location = useLocation();

  // studio.localpros.co.za/?team=on marks this browser as ours: the site chat then sends no alerts
  useEffect(() => {
    applyTeamDeviceLink();
    markTeamDevice();
    return trackWhatsAppClicks();
  }, []);

  // Which parts of each page visitors look at, for PostHog (src/analytics.ts)
  useEffect(() => trackSectionViews(location.pathname), [location.pathname]);

  // Standalone pages that ship their own navigation, footer and type system (the homepage too, since 8 Oct 2026)
  const isStandalonePage =
    ['/', '/autopilot', '/website-design-package', '/reviews', '/social-media-posting-service', '/pricing'].includes(location.pathname) || location.pathname.startsWith('/design-directions') ||
    location.pathname.startsWith('/review-versions');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      <PageMeta />
      {!isStandalonePage && <Navigation />}
      <main className="flex-1">
        {/* Blank full-height space while a page downloads, so the footer stays below the fold */}
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<JoinLight />} />
          <Route path="/reviews" element={<ReviewsLight />} />
          <Route path="/pricing" element={<PricingLight />} />
          <Route path="/social-media-posting-service" element={<SocialLight />} />
          <Route path="/social-media-posting-service-archived" element={<SocialPostingPageArchived />} />
          {/* Website design page (light rebuild, 8 Oct 2026); /web-design and the Google Ads page /website-design
              became this one address on 9 Oct 2026 */}
          <Route path="/website-design-package" element={<WebDesignLight />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recurring-service-booking-system" element={<RecurringServicesLetterPage />} />
          <Route path="/autopilot" element={<AutopilotLandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refunds-cancellations" element={<RefundsCancellationsPage />} />
          <Route path="/website-faq" element={<WebsiteFaqPage />} />

          {/* Special Landing Pages */}
          <Route path="/special-offer-bundle" element={<SpecialOfferOpusPage />} />

          <Route path="/design-directions/:id" element={<DesignDirections />} />
          <Route path="/review-versions/:id" element={<ReviewVersions />} />

        </Routes>
        </Suspense>
      </main>
      {!isStandalonePage && <Footer />}
      {!isStandalonePage && <MobileCTA />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
