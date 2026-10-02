import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import SocialProofSection from './components/SocialProofSection';
import LeadGenSection from './components/LeadGenSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FieldCardPage from './components/FieldCardPage';
import SocialMediaPage from './components/SocialMediaPage';
import WebDesignPage from './components/WebDesignPage';
import WebDesignPageV2 from './components/WebDesignPageV2';
import AboutPage from './components/AboutPage';
import MobileCTA from './components/MobileCTA';
import GoogleAdsPage from './components/GoogleAdsPage';
import AlternativeWebDesignPage from './components/AlternativeWebDesignPage';
import ReachMaxPage from './components/ReachMaxPage';
import ImageGallery from './components/ImageGallery';
import ReviewCollectionProPage from './components/ReviewCollectionProPage';
import ReviewsProClientiPage from './components/ReviewsProClientiPage';
import ReviewsLetterPage from './components/ReviewsLetterPage';
import LandingPagesDirectory from './components/LandingPagesDirectory';
import SocialPostingPageV2 from './components/SocialPostingPageV2';
import HomeGeminiPage from './components/HomeGeminiPage';
import HomeSalesLetterPage from './components/HomeSalesLetterPage';
import SpecialOfferOpusPage from './components/SpecialOfferOpusPage';
import RecurringServicesLetterPage from './components/RecurringServicesLetterPage';
import AutopilotLandingPage from './components/AutopilotLandingPage';
import WebDesignAdsPage from './components/WebDesignAdsPage';
import { PrivacyPage, RefundsCancellationsPage, TermsPage, WebsiteFaqPage } from './components/LegalPages';
import logo from './assets/images/Compressed/Local Pros Studio logo transparent.png';
import { whatsAppUrlForPath } from './whatsapp';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isWebDesignPreview = ['/web-design', '/web-design-v2'].includes(location.pathname);
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

// Original HomePage with Services
const HomePage = () => (
  <>
    <HeroSection />
    <ServicesSection />
    <SocialProofSection />
    <LeadGenSection />
    <CallToAction />
  </>
);

const AppContent = () => {
  const location = useLocation();

  // Landing pages that should NOT show footer or mobile CTA (but we'll show Nav for switching)
  const isSpecialLandingPage = [
    '/pages',
  ].includes(location.pathname);

  // Standalone pages that ship their own navigation, footer and type system
  const isStandalonePage = ['/autopilot', '/website-design'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      {!isStandalonePage && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeGeminiPage />} />
          <Route path="/reviews" element={<ReviewsLetterPage />} />
          <Route path="/reviews-pro" element={<ReviewCollectionProPage />} />
          <Route path="/reviews-clienti" element={<ReviewsProClientiPage />} />
          <Route path="/social-media-posting-service" element={<SocialPostingPageV2 />} />
          <Route path="/social-posting-v2" element={<SocialPostingPageV2 />} />
          <Route path="/sales" element={<HomeSalesLetterPage />} />
          <Route path="/web-design" element={<WebDesignAdsPage variant="site" />} />
          {/* Archived 1 Oct 2026: previous main web design page, replaced by WebDesignAdsPage */}
          <Route path="/web-design-archive" element={<WebDesignPage />} />
          <Route path="/web-design-v2" element={<WebDesignPageV2 />} />
          <Route path="/fieldcard" element={<FieldCardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recurring-service-booking-system" element={<RecurringServicesLetterPage />} />
          <Route path="/autopilot" element={<AutopilotLandingPage />} />
          {/* Google Ads landing page: same page as /web-design without the site navigation */}
          <Route path="/website-design" element={<WebDesignAdsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refunds-cancellations" element={<RefundsCancellationsPage />} />
          <Route path="/website-faq" element={<WebsiteFaqPage />} />
          <Route path="/google-ads" element={<GoogleAdsPage />} />
          <Route path="/web-design-alt" element={<AlternativeWebDesignPage />} />
          <Route path="/reachmax" element={<ReachMaxPage />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/pages" element={<LandingPagesDirectory />} />

          {/* Special Landing Pages */}
          <Route path="/special-offer-bundle" element={<SpecialOfferOpusPage />} />

          {/* Legacy routes */}
        </Routes>
      </main>
      {!isSpecialLandingPage && !isStandalonePage && <Footer />}
      {!isSpecialLandingPage && !isStandalonePage && <MobileCTA />}
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
