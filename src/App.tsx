import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
// The home page loads with the site; every other page downloads only when someone opens it
import HomeGeminiPage from './components/HomeGeminiPage';
const AboutPage = lazy(() => import('./components/AboutPage'));
const ReviewsLetterPage = lazy(() => import('./components/ReviewsLetterPage'));
const SocialPostingPageV2 = lazy(() => import('./components/SocialPostingPageV2'));
const SpecialOfferOpusPage = lazy(() => import('./components/SpecialOfferOpusPage'));
const RecurringServicesLetterPage = lazy(() => import('./components/RecurringServicesLetterPage'));
const AutopilotLandingPage = lazy(() => import('./components/AutopilotLandingPage'));
const WebDesignAdsPage = lazy(() => import('./components/WebDesignAdsPage'));
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
  const isWebDesignPreview = location.pathname === '/web-design';
  const whatsAppUrl = whatsAppUrlForPath(location.pathname);

  const navLinks = [
    { name: 'Reviews', href: '/reviews' },
    { name: 'Social Media', href: '/social-media-posting-service' },
    { name: 'Web Design', href: '/web-design' },
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
              {isWebDesignPreview ? 'Build My Website' : 'Get Started'}
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
                {isWebDesignPreview ? 'Build My Website' : 'Get Started'}
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

  // Standalone pages that ship their own navigation, footer and type system
  const isStandalonePage =
    ['/autopilot', '/website-design'].includes(location.pathname) || location.pathname.startsWith('/design-directions') ||
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
          <Route path="/" element={<HomeGeminiPage />} />
          <Route path="/reviews" element={<ReviewsLetterPage />} />
          <Route path="/social-media-posting-service" element={<SocialPostingPageV2 />} />
          <Route path="/web-design" element={<WebDesignAdsPage variant="site" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recurring-service-booking-system" element={<RecurringServicesLetterPage />} />
          <Route path="/autopilot" element={<AutopilotLandingPage />} />
          {/* Google Ads landing page: same page as /web-design without the site navigation */}
          <Route path="/website-design" element={<WebDesignAdsPage />} />
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
