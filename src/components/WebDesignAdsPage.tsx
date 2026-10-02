import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  FileText,
  Gauge,
  Home,
  MessageCircle,
  PawPrint,
  PenTool,
  Phone,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Star,
  X,
} from 'lucide-react';

import logo from '../assets/images/Compressed/Local Pros Studio logo transparent.png';
import { formatReviewDate, getInitials, useReputationReviews, type WidgetReview } from './reputationReviews';
import logoDarkText from '../assets/images/Compressed/Local Pros Studio logo dark text.png';
import pavingDesktop from '../assets/images/portfolio/pavingpros-desktop.webp';
import pavingMobile from '../assets/images/portfolio/pavingpros-mobile.webp';
import bkcDesktop from '../assets/images/portfolio/bkcpet-desktop.webp';
import bkcMobile from '../assets/images/portfolio/bkcpet-mobile.webp';
import petportDesktop from '../assets/images/portfolio/petport-desktop.webp';
import petportMobile from '../assets/images/portfolio/petport-mobile.webp';
import jacuzziDesktop from '../assets/images/portfolio/jacuzzipros-desktop.webp';
import jacuzziMobile from '../assets/images/portfolio/jacuzzipros-mobile.webp';
import winelandsDesktop from '../assets/images/portfolio/winelandsgas-desktop.webp';
import winelandsMobile from '../assets/images/portfolio/winelandsgas-mobile.webp';
import marambaDesktop from '../assets/images/portfolio/maramba-desktop.webp';
import marambaMobile from '../assets/images/portfolio/maramba-mobile.webp';

const WHATSAPP_URL =
  'https://wa.me/27832336716?text=Hi%2C%20I%20saw%20your%20website%20design%20page%20and%20would%20like%20a%20quote%20for%20my%20business';
const PHONE_URL = 'tel:+27832336716';

const trackCTA = (label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: label,
      value: 1,
    });
  }
};

const stats = [
  { value: '500+', label: 'websites built' },
  { value: '2015', label: 'building since' },
  { value: '7 days', label: 'typical turnaround' },
  { value: '100%', label: 'South African businesses' },
];

const caseStudies = [
  {
    name: 'Paving Pros',
    domain: 'pavingpros.co.za',
    href: 'https://www.pavingpros.co.za/',
    industry: 'Home services · Paving contractors',
    area: 'Johannesburg, Pretoria, Durban & Cape Town',
    headline: 'One brand, four cities, a steady flow of quote requests.',
    text: 'Service pages for driveways, pools and walkways, plus city targeting so the business shows up where it actually works.',
    features: ['Online quote request', 'Multi-city SEO pages', 'Live chat lead capture'],
    desktop: pavingDesktop,
    mobile: pavingMobile,
  },
  {
    name: 'Winelands Gas',
    domain: 'winelandsgas.co.za',
    href: 'https://www.winelandsgas.co.za/',
    industry: 'Home & commercial services · Gas installations',
    area: 'Western Cape',
    headline: 'Installs, repairs and COC certificates, all in one place.',
    text: 'Residential and commercial gas services laid out clearly, with registered-installer trust signals and a quote button on every screen.',
    features: ['Get-a-quote buttons', 'Residential + commercial pages', 'Click-to-call header'],
    desktop: winelandsDesktop,
    mobile: winelandsMobile,
  },
  {
    name: 'BKC Pet',
    domain: 'bkcpet.co.za',
    href: 'https://bkcpet.co.za/',
    industry: 'Pet services · Boarding & kennels',
    area: 'Benoni, Gauteng',
    headline: 'A local kennel that looks like the obvious, trusted choice.',
    text: 'Real photos of the facility, clear services and pricing questions answered before the owner ever picks up the phone.',
    features: ['Free quote form', 'Click-to-call header', 'Local Gauteng SEO'],
    desktop: bkcDesktop,
    mobile: bkcMobile,
  },
  {
    name: 'PETport',
    domain: 'petport.co.za',
    href: 'https://www.petport.co.za/',
    industry: 'Pet services · Local & international transport',
    area: 'Nationwide, with offices in four cities',
    headline: 'A complex service made simple to book.',
    text: 'Separate paths for local moves, export consults and crate fittings, so every visitor lands on the right next step.',
    features: ['Online estimate tool', 'WhatsApp enquiries', 'Booking for consults'],
    desktop: petportDesktop,
    mobile: petportMobile,
  },
  {
    name: 'Jacuzzi Pros',
    domain: 'jacuzzipros.co.za',
    href: 'https://www.jacuzzipros.co.za/',
    industry: 'Home services · Hot tub sales & repairs',
    area: 'South Africa',
    headline: 'Premium product, premium first impression.',
    text: 'Big, aspirational imagery for new installs alongside a clear route for repair and servicing enquiries.',
    features: ['Get-a-quote funnel', 'Sales + service pages', 'Live chat lead capture'],
    desktop: jacuzziDesktop,
    mobile: jacuzziMobile,
  },
  {
    name: 'Maramba Fence & Gates',
    domain: 'maramba.co.za',
    href: 'https://www.maramba.co.za/',
    industry: 'Home services · Fencing & gates',
    area: 'Cape Town',
    headline: 'Google reviews up front, a quote one tap away.',
    text: 'Live Google reviews straight under the hero, the full range of fencing options, and WhatsApp and call buttons on every screen.',
    features: ['Live Google reviews', 'WhatsApp chat button', 'Free quote requests'],
    desktop: marambaDesktop,
    mobile: marambaMobile,
  },
];

// The usual ways a business gets a website, compared with ours (shown just before pricing)
const otherOptions = [
  {
    title: 'Build it yourself',
    points: [
      'Evenings and weekends lost to a website builder',
      'You write every page and choose every photo',
      'It usually looks like you built it yourself',
    ],
  },
  {
    title: 'A cheap R199/month website',
    points: [
      'A one-size-fits-all template with your name dropped in',
      'Little or no wording written for your services and area',
      'Often rebuilt properly within a year',
    ],
  },
  {
    title: 'A big agency',
    points: [
      'Large once-off quotes for a local business',
      'Weeks of meetings before anything goes live',
      'Built for corporates and priced that way',
    ],
  },
];

const ourOption = [
  'Written and designed for your services and area',
  'Live in about 7 days',
  'From R450/month with hosting and support included',
];

const industries = [
  {
    icon: Home,
    title: 'Home services',
    items: ['Plumbers', 'Electricians', 'Paving', 'Roofing', 'Solar', 'Builders', 'Painters', 'Pest control', 'Pools & spas', 'Gates & fencing'],
  },
  {
    icon: Briefcase,
    title: 'Professional services',
    items: ['Accountants', 'Attorneys', 'Medical & dental', 'Consultants', 'Financial advisors', 'Engineers', 'Estate agents'],
  },
  {
    icon: PawPrint,
    title: 'Local & lifestyle',
    items: ['Pet boarding', 'Pet transport', 'Vets & grooming', 'Beauty & wellness', 'Gyms & studios', 'Events'],
  },
];

const buildPillars = [
  {
    icon: Search,
    title: 'Built to be found',
    text: 'Clean structure, service and area pages, titles and descriptions set up so Google understands what you do and where.',
  },
  {
    icon: MessageCircle,
    title: 'Built to get enquiries',
    text: 'Click-to-call, WhatsApp, and quote forms on every page — the next step is always one tap away.',
  },
  {
    icon: Smartphone,
    title: 'Built for phones first',
    text: 'Most of your customers will see you on a phone. We design for that screen first, then scale up.',
  },
  {
    icon: Star,
    title: 'Built to be trusted',
    text: 'Real photos, Google reviews, and clear wording so you look like the safe choice before you say a word.',
  },
];

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=local+pros#lrd=0x1efa235edd61726f:0x2d27a3ca84715414,1,,,,';

const whatsAppLink = (message: string) => `https://wa.me/27832336716?text=${encodeURIComponent(message)}`;

// Three ways to pay. Terms confirmed by Jeremy (1 Oct 2026); the free-website terms match /special-offer-bundle.
const pricingOptions = [
  {
    key: 'buy',
    name: 'Buy it outright',
    tag: '',
    price: 'R9,900',
    unit: 'once-off',
    terms: '+ R290/month hosting & care',
    summary: 'Pay once and the website is yours from day one.',
    points: [
      'You own it from launch',
      'R290/month covers domain, hosting, security, backups and support',
      '1 hour of free changes every month',
    ],
    cta: 'Buy Now',
    href: whatsAppLink('Hi, I would like to buy a website outright (R9,900 once-off).'),
    featured: false,
  },
  {
    key: 'rent',
    name: 'Rent to own',
    tag: 'Easiest start',
    price: 'R450',
    unit: '/month',
    terms: 'for 24 months, then it is yours',
    summary: 'No big upfront cost. Hosting and care included while you pay it off.',
    points: [
      'No upfront build fee',
      'Hosting, support and 1 hour of free changes a month included',
      'After 24 months you own it and move to R290/month hosting',
    ],
    cta: 'Rent to Own',
    href: whatsAppLink('Hi, I am interested in the Rent to Own website at R450/month.'),
    featured: true,
  },
  {
    key: 'free',
    name: 'Free with marketing',
    tag: 'Best value',
    price: 'R0',
    unit: 'website',
    terms: 'with Social Posting + Reviews at R2,500/month',
    summary: 'We build your website free when we also run your social media and Google reviews.',
    points: [
      'Weekly posts to Facebook, Instagram and Google',
      'Automatic Google review requests by WhatsApp and email',
      '12-month commitment. The website stays live while you are subscribed',
    ],
    cta: 'Get It Free',
    href: whatsAppLink('Hi, I am interested in the free website with the Social Posting + Reviews package (R2,500/month).'),
    featured: false,
  },
];

const packageItems = [
  'Up to 10 pages depending on your services',
  'Copywriting and image selection done for you',
  'Mobile, tablet and desktop design',
  'Click-to-call, WhatsApp and quote forms',
  'Basic on-page SEO for your services and area',
  'Google reviews and social links where access allows',
  'Domain, SSL, hosting, backups and security',
  '1 hour of free changes every month',
];

const processSteps = [
  { icon: MessageCircle, title: 'Quick chat', text: 'A 15-minute WhatsApp or call about your business, services and areas.' },
  { icon: PenTool, title: 'We build it', text: 'Layout, wording, images, service pages and lead capture — handled.' },
  { icon: FileText, title: 'You review', text: 'A focused 2-day window for corrections and small changes.' },
  { icon: Rocket, title: 'Go live', text: 'We launch, then look after hosting, security and updates.' },
];

const faqs = [
  {
    question: 'How much does a website cost?',
    answer:
      'Three options: buy it for R9,900 once-off plus R290/month for hosting, support and 1 hour of free changes; rent to own for R450/month all-in over 24 months, then R290/month; or get it free with our Social Posting + Reviews package at R2,500/month on a 12-month commitment. No surprise invoices.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Most websites go live within 5–7 business days once we have your details and access. Slow feedback or missing information can move that date.',
  },
  {
    question: 'Will my website rank on Google?',
    answer:
      'Every site is built with the SEO basics in place: fast pages, service and area structure, titles and descriptions. No honest provider can guarantee position one, and new domains can take 2–3 months to be indexed.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'Your business details, services, areas you work in, your logo if you have one, and any real photos of your work. We handle the structure, writing and image selection.',
  },
  {
    question: 'I already have a website. Can you redo it?',
    answer:
      'Yes. A lot of our work is rebuilding older sites that look dated, break on phones, or never bring in enquiries. We keep what works and fix what does not.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We keep looking after your hosting, SSL, backups, security and support, plus 1 hour of free changes every month. Bigger changes beyond that are quoted before we start.',
  },
  {
    question: 'Is it a fully custom website?',
    answer:
      'We use proven layouts built for local businesses, then customise the branding, wording, images, pages and calls to action for you. That is how we keep the price fair and the turnaround fast.',
  },
];


// One page, two colour schemes: every colour class comes from here so copy and layout stay shared
const themes = {
  dark: {
    logo,
    page: 'bg-neutral-950 text-white',
    header: 'border-neutral-800 bg-neutral-950/90',
    navLink: 'text-neutral-300 hover:text-white',
    hero: 'bg-dark-warm',
    finalCta: 'bg-dark-warm',
    sectionAlt: 'bg-neutral-900',
    heading: 'text-white',
    subheading: 'text-neutral-100',
    body: 'text-neutral-300',
    muted: 'text-neutral-400',
    faint: 'text-neutral-500',
    label: 'text-amber-400',
    highlight: 'text-amber-400',
    icon: 'text-amber-400',
    link: 'text-amber-400 hover:text-amber-300',
    border: 'border-neutral-800',
    divide: 'divide-neutral-800',
    card: 'border-neutral-800 bg-neutral-900',
    cardOnAlt: 'border-neutral-800 bg-neutral-950',
    chip: 'bg-neutral-800 text-neutral-300',
    pill: 'border-neutral-700 bg-neutral-900 text-neutral-200',
    outlineButton: 'border-neutral-700 text-white hover:border-neutral-500',
    badge: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    floatCard: 'border-neutral-700 bg-neutral-900/95',
    glow: 'bg-amber-500/10',
    priceCard: 'bg-neutral-950 shadow-[0_0_60px_-15px_rgba(251,191,36,0.35)]',
    priceItem: 'bg-neutral-900 text-neutral-200',
    stepNumber: 'text-neutral-800',
    browser: 'border-neutral-700 bg-neutral-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]',
    browserBar: 'border-neutral-700',
    browserDot: 'bg-neutral-600',
    browserUrl: 'bg-neutral-900 text-neutral-400',
    phone: 'border-neutral-600 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)]',
    stickyBar: 'border-neutral-800 bg-neutral-950/95',
    footer: 'border-neutral-800 bg-neutral-950 text-neutral-500',
    footerLink: 'hover:text-neutral-300',
  },
  light: {
    logo: logoDarkText,
    page: 'bg-[#faf7f2] text-neutral-900',
    header: 'border-neutral-200 bg-white/90',
    navLink: 'text-neutral-700 hover:text-neutral-950',
    hero: 'bg-warm-gradient',
    finalCta: 'bg-warm-gradient bg-amber-50',
    sectionAlt: 'bg-white',
    heading: 'text-neutral-950',
    subheading: 'text-neutral-900',
    body: 'text-neutral-700',
    muted: 'text-neutral-600',
    faint: 'text-neutral-500',
    label: 'text-amber-700',
    highlight: 'text-amber-600',
    icon: 'text-amber-600',
    link: 'text-amber-700 hover:text-amber-800',
    border: 'border-neutral-200',
    divide: 'divide-neutral-200',
    card: 'border-neutral-200 bg-white shadow-soft',
    cardOnAlt: 'border-neutral-200 bg-[#faf7f2]',
    chip: 'bg-amber-50 text-neutral-700',
    pill: 'border-neutral-200 bg-white text-neutral-800',
    outlineButton: 'border-neutral-300 bg-white text-neutral-900 hover:border-neutral-500',
    badge: 'border-amber-300 bg-amber-100 text-amber-800',
    floatCard: 'border-neutral-200 bg-white/95',
    glow: 'bg-amber-400/20',
    priceCard: 'bg-white shadow-soft-xl',
    priceItem: 'bg-amber-50/70 text-neutral-800',
    stepNumber: 'text-amber-100',
    browser: 'border-neutral-200 bg-neutral-100 shadow-[0_40px_80px_-30px_rgba(23,23,23,0.35)]',
    browserBar: 'border-neutral-200',
    browserDot: 'bg-neutral-300',
    browserUrl: 'bg-white text-neutral-500',
    phone: 'border-neutral-800 shadow-[0_30px_60px_-20px_rgba(23,23,23,0.45)]',
    stickyBar: 'border-neutral-200 bg-white/95',
    footer: 'border-neutral-200 bg-white text-neutral-500',
    footerLink: 'hover:text-neutral-900',
  },
};

type Theme = typeof themes.dark;
const ThemeContext = createContext<Theme>(themes.dark);

// Starts true once the frame scrolls into view, so the pan always begins at the client's hero
const useInView = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);
  return { ref, inView };
};

const BrowserFrame = ({ src, domain, animated = false, className = '' }: {
  src: string;
  domain: string;
  animated?: boolean;
  className?: string;
}) => {
  const t = useContext(ThemeContext);
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`overflow-hidden rounded-xl border ${t.browser} ${className}`}>
      <div className={`flex items-center gap-3 border-b px-3 py-2.5 sm:px-4 ${t.browserBar}`}>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className={`h-2.5 w-2.5 rounded-full ${t.browserDot}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${t.browserDot}`} />
          <span className={`h-2.5 w-2.5 rounded-full ${t.browserDot}`} />
        </div>
        <div className={`flex flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 text-[11px] font-semibold sm:text-xs ${t.browserUrl}`}>
          <ShieldCheck className={`h-3 w-3 flex-none ${t.icon}`} aria-hidden="true" />
          {domain}
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        <img
          src={src}
          alt={`${domain} website on desktop`}
          className={`absolute inset-x-0 top-0 h-auto w-full ${animated && inView ? 'animate-site-pan motion-reduce:animate-none' : ''}`}
          loading="lazy"
          width="960"
          height="2880"
        />
      </div>
    </div>
  );
};

const PhoneFrame = ({ src, domain, className = '' }: { src: string; domain: string; className?: string }) => {
  const t = useContext(ThemeContext);
  return (
    <div className={`rounded-[2rem] border bg-neutral-950 p-1.5 ${t.phone} ${className}`}>
      <div className="overflow-hidden rounded-[1.6rem] bg-neutral-950">
        <div className="flex h-5 items-center justify-center" aria-hidden="true">
          <span className="h-2.5 w-12 rounded-full bg-neutral-800" />
        </div>
        <img src={src} alt={`${domain} website on mobile`} className="h-auto w-full" loading="lazy" width="585" height="1266" />
      </div>
    </div>
  );
};

const GoogleIcon = ({ className = 'h-5 w-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6H1.4a12 12 0 0 0 0 10.9l4-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
  </svg>
);

const Stars = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <span className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`${className} fill-amber-400 text-amber-400`} aria-hidden="true" />)}
  </span>
);

const ReviewCard = ({ review, className = '' }: { review: WidgetReview; className?: string }) => {
  const t = useContext(ThemeContext);
  return (
    <figure className={`rounded-2xl border p-6 ${t.card} ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-amber-400 font-display font-bold text-neutral-950" aria-hidden="true">
            {getInitials(review.reviewerName)}
          </span>
          <figcaption>
            <p className={`font-display font-bold leading-tight ${t.heading}`}>{review.reviewerName}</p>
            <p className={`text-xs ${t.faint}`}>{formatReviewDate(review.dateAdded)}</p>
          </figcaption>
        </div>
        <GoogleIcon className="h-5 w-5 flex-none" />
      </div>
      <div className="mt-4">
        <Stars />
      </div>
      <blockquote className={`mt-3 leading-relaxed ${t.body}`}>{review.comment}</blockquote>
    </figure>
  );
};

const CTAButton = ({ label, children = 'Get a Free Website Quote', className = '', href = WHATSAPP_URL }: {
  label: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA(label)}
    className={`inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-7 py-4 font-display text-base font-extrabold text-neutral-950 shadow-[0_16px_45px_rgba(251,191,36,0.2)] transition-transform duration-200 hover:scale-[1.02] hover:bg-amber-300 sm:w-auto md:text-lg ${className}`}
  >
    {children}
    <ArrowRight className="h-5 w-5" aria-hidden="true" />
  </a>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => {
  const t = useContext(ThemeContext);
  return <p className={`mb-4 text-xs font-bold uppercase tracking-[0.24em] md:text-sm ${t.label}`}>{children}</p>;
};

// variant 'ad': standalone Google Ads landing page with its own minimal header, footer and sticky bar.
// variant 'site': the main /web-design page, wrapped in the normal site navigation, footer and mobile CTA.
const WebDesignAdsPage = ({ theme = 'dark', variant = 'ad' }: { theme?: keyof typeof themes; variant?: 'ad' | 'site' }) => {
  const t = themes[theme];
  const isAd = variant === 'ad';
  // Separate analytics labels per version so ad traffic and site traffic can be compared
  const track = !isAd ? 'wd_site' : theme === 'light' ? 'wd_ads_light' : 'wd_ads';
  // Live Google reviews from the same ReputationHub feed as the home page.
  // The longest review is featured beside the price; the rest fill the grid.
  const { reviews, isLoading: reviewsLoading } = useReputationReviews();
  const fiveStarReviews = reviews.filter((review) => review.starRating === 5);
  const featuredReview = [...fiveStarReviews].sort((a, b) => b.comment.length - a.comment.length)[0];
  const gridReviews = fiveStarReviews.filter((review) => review !== featuredReview).slice(0, 9);

  useEffect(() => {
    document.title = 'Website Design South Africa | 500+ Sites Built Since 2015 | Local Pros Studio';
  }, []);

  return (
    <ThemeContext.Provider value={t}>
      <div className={`min-h-screen font-sans selection:bg-amber-400/30 ${t.page}`}>
        {/* Minimal header: no site navigation so ad traffic stays on this page */}
        {isAd && (
          <header className={`sticky top-0 z-40 border-b px-4 py-3 backdrop-blur-lg sm:px-6 ${t.header}`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between">
              <img src={t.logo} alt="Local Pros Studio" className="h-8 w-auto" width="120" height="32" />
              <div className="flex items-center gap-4">
                <a
                  href={PHONE_URL}
                  onClick={() => trackCTA(`${track}_header_call`)}
                  className={`hidden items-center gap-2 text-sm font-bold sm:inline-flex ${t.navLink}`}
                >
                  <Phone className={`h-4 w-4 ${t.icon}`} aria-hidden="true" />
                  083 233 6716
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTA(`${track}_header_whatsapp`)}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 font-display text-sm font-bold text-neutral-950 hover:bg-amber-300"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </header>
        )}

        {/* Hero: matches "website design" search intent, leads with the 500+ proof */}
        <section className={`relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 ${t.hero}`}>
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div className="animate-fade-in-up">
              <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold ${t.badge}`}>
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </span>
                500+ websites built since 2015
              </div>
              <h1 className={`font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl ${t.heading}`}>
                Website design that brings in <span className={t.highlight}>customers</span>, not just compliments.
              </h1>
              <p className={`mt-6 max-w-xl text-lg leading-relaxed md:text-xl ${t.body}`}>
                We build fast, mobile-first websites for South African service businesses — set up for Google and
                designed to turn visitors into calls, WhatsApps and quote requests.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <CTAButton label={`${track}_hero_whatsapp`} />
                <a
                  href={PHONE_URL}
                  onClick={() => trackCTA(`${track}_hero_call`)}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-4 font-display font-bold ${t.outlineButton}`}
                >
                  <Phone className={`h-5 w-5 ${t.icon}`} aria-hidden="true" />
                  083 233 6716
                </a>
              </div>
              <ul className={`mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold ${t.body}`}>
                {['Rent to own from R450/month', 'Live in about 7 days', 'Writing & images done for you', 'Hosting & support included'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 flex-none ${t.icon}`} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA(`${track}_hero_google_reviews`)}
                className={`mt-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 ${t.outlineButton}`}
              >
                <GoogleIcon />
                <Stars />
                <span className="text-sm font-bold">1,000+ Google reviews</span>
              </a>
            </div>

            {/* Mockup stack: real client sites */}
            <div className="relative mx-auto w-full max-w-2xl animate-fade-in-up pb-10 pr-8 sm:pb-14 sm:pr-16 lg:max-w-none">
              <BrowserFrame src={pavingDesktop} domain="pavingpros.co.za" className="rotate-[-1deg]" />
              <BrowserFrame
                src={jacuzziDesktop}
                domain="jacuzzipros.co.za"
                className="absolute -left-4 -top-8 -z-10 hidden w-[70%] rotate-[-5deg] opacity-60 sm:block"
              />
              <PhoneFrame src={petportMobile} domain="petport.co.za" className="absolute bottom-0 right-0 w-[30%] rotate-[3deg]" />
              <div className={`absolute -bottom-2 left-4 hidden items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur sm:flex ${t.floatCard}`}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-neutral-950">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className={`font-display text-sm font-bold ${t.heading}`}>Quote forms + WhatsApp</p>
                  <p className={`text-xs ${t.muted}`}>on every page, every screen</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className={`border-y px-4 sm:px-6 ${t.border} ${t.sectionAlt}`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-4 py-7 text-center md:py-9 ${t.border} ${index % 2 === 0 ? 'border-r' : ''} ${index < 2 ? 'border-b md:border-b-0' : ''} ${index === 1 ? 'md:border-r' : ''}`}
              >
                <p className={`font-display text-3xl font-extrabold md:text-4xl ${t.highlight}`}>{stat.value}</p>
                <p className={`mt-1 text-sm font-semibold uppercase tracking-wide ${t.muted}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The problem, stated directly, before the proof */}
        <section className={`border-b px-4 py-16 sm:px-6 md:py-20 ${t.border}`}>
          <div className="mx-auto max-w-4xl">
            <SectionLabel>The real problem</SectionLabel>
            <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
              Your website is either winning you work or costing you work<span className={t.highlight}>.</span>
            </h2>
            <div className="mt-7 space-y-4 text-lg leading-relaxed">
              <p className={t.body}>
                A customer gets your name. They Google you. They open your website on their phone. Before you ever
                speak to them, they have decided whether you look like the safer choice.
              </p>
              <p className={t.body}>
                If your website is outdated, breaks on a phone, or has no obvious way to call or WhatsApp, they move on
                to the next name on the list. You never even find out you lost the job.
              </p>
              <p className={`font-display text-xl font-bold ${t.heading}`}>What is that costing you every month?</p>
            </div>
          </div>
        </section>

        {/* Portfolio: the proof, shown big */}
        <section className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Recent work</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                Real websites for real South African businesses.
              </h2>
              <p className={`mt-5 text-lg leading-relaxed ${t.muted}`}>
                A few of the 500+ sites we have built. Every one is live — click through and try them on your phone.
              </p>
            </div>

            <div className="mt-16 space-y-20 md:space-y-28">
              {caseStudies.map((site, index) => (
                <article
                  key={site.name}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div className="relative pb-8 pr-10 sm:pb-10 sm:pr-16">
                    <div className={`pointer-events-none absolute inset-6 rounded-full blur-3xl ${t.glow}`} aria-hidden="true" />
                    <BrowserFrame src={site.desktop} domain={site.domain} animated className="relative" />
                    <PhoneFrame src={site.mobile} domain={site.domain} className="absolute bottom-0 right-0 w-[28%]" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-[0.2em] ${t.label}`}>{site.industry}</p>
                    <h3 className={`mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl ${t.heading}`}>{site.name}</h3>
                    <p className={`mt-1 text-sm ${t.faint}`}>{site.area}</p>
                    <p className={`mt-5 font-display text-xl font-bold leading-snug ${t.subheading}`}>{site.headline}</p>
                    <p className={`mt-3 text-base leading-relaxed md:text-lg ${t.muted}`}>{site.text}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {site.features.map((feature) => (
                        <li key={feature} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold ${t.pill}`}>
                          <Check className={`h-3.5 w-3.5 ${t.icon}`} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackCTA(`${track}_portfolio_${site.domain}`)}
                      className={`mt-7 inline-flex items-center gap-2 font-display font-bold ${t.link}`}
                    >
                      Visit {site.domain}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <figure className={`mx-auto mt-20 max-w-4xl rounded-3xl border-2 border-amber-400 px-6 py-10 text-center md:px-12 ${t.priceCard}`}>
              <p className={`text-xs font-bold uppercase tracking-[0.2em] ${t.label}`}>One website, one job</p>
              <blockquote className={`mt-4 font-display text-2xl font-extrabold leading-snug md:text-3xl ${t.heading}`}>
                A Cape Town gas installation client landed an <span className={t.highlight}>R2 million installation job</span> through
                the online presence we built and manage for them.
              </blockquote>
              <figcaption className={`mt-4 ${t.muted}`}>That one job paid for everything many times over.</figcaption>
            </figure>

            <div className={`mt-10 rounded-3xl border px-6 py-10 text-center md:px-12 ${t.card}`}>
              <p className={`font-display text-2xl font-extrabold md:text-3xl ${t.heading}`}>
                Plus <span className={t.highlight}>500+ more</span> since 2015.
              </p>
              <p className={`mx-auto mt-3 max-w-2xl ${t.muted}`}>
                Ask us for examples in your industry — chances are we have built for a business just like yours.
              </p>
              <div className="mt-7">
                <CTAButton label={`${track}_portfolio_whatsapp`}>Show Me Examples in My Industry</CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* Google reviews: social proof straight after the work itself */}
        <section className={`border-y px-4 py-16 sm:px-6 md:py-24 ${t.border} ${t.sectionAlt}`}>
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <SectionLabel>What our clients say</SectionLabel>
                <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                  Over <span className={t.highlight}>1,000</span> reviews on Google.
                </h2>
              </div>
              <div className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${t.cardOnAlt}`}>
                <GoogleIcon className="h-8 w-8" />
                <div>
                  <Stars className="h-5 w-5" />
                  <p className={`mt-1 text-sm font-semibold ${t.muted}`}>1,000+ reviews from South African businesses</p>
                </div>
              </div>
            </div>
            <div className="mt-12 gap-5 sm:columns-2 lg:columns-3">
              {reviewsLoading
                ? [0, 1, 2].map((i) => <div key={i} className={`mb-5 h-48 animate-pulse rounded-2xl border ${t.card}`} />)
                : gridReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} className="mb-5 break-inside-avoid" />
                ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA(`${track}_reviews_google`)}
                className={`inline-flex items-center gap-2 font-display font-bold ${t.link}`}
              >
                Read all our reviews on Google
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* What makes them work */}
        <section className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>Why they work</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                A pretty website that nobody finds is just an expensive business card.
              </h2>
              <p className={`mt-5 text-lg leading-relaxed ${t.muted}`}>
                Every site we build has one job: get the right people to contact you. That shapes every decision.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {buildPillars.map(({ icon: Icon, title, text }) => (
                <div key={title} className={`rounded-2xl border p-6 transition-transform duration-200 hover:-translate-y-0.5 ${t.card}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-neutral-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className={`mt-5 font-display text-xl font-bold ${t.heading}`}>{title}</h3>
                  <p className={`mt-2 leading-relaxed ${t.muted}`}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Who we build for</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                Service businesses are our speciality.
              </h2>
              <p className={`mt-5 text-lg leading-relaxed ${t.muted}`}>
                We know how your customers search, what they need to see, and what makes them pick up the phone.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {industries.map(({ icon: Icon, title, items }) => (
                <div key={title} className={`rounded-2xl border p-6 md:p-8 ${t.card}`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${t.icon}`} aria-hidden="true" />
                    <h3 className={`font-display text-xl font-bold ${t.heading}`}>{title}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li key={item} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${t.chip}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other ways to get a website, so the price has context */}
        <section className={`border-t px-4 py-16 sm:px-6 md:py-24 ${t.border}`}>
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Your options</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                Most businesses get a website one of three ways. We built a better one<span className={t.highlight}>.</span>
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {otherOptions.map((option) => (
                <div key={option.title} className={`rounded-2xl border p-6 ${t.card}`}>
                  <h3 className={`font-display text-lg font-bold ${t.heading}`}>{option.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {option.points.map((point) => (
                      <li key={point} className={`flex items-start gap-3 text-sm leading-relaxed ${t.muted}`}>
                        <X className="mt-0.5 h-4 w-4 flex-none text-red-500" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className={`rounded-2xl border-2 border-amber-400 p-6 ${t.priceCard}`}>
                <h3 className={`font-display text-lg font-bold ${t.heading}`}>Local Pros Studio</h3>
                <ul className="mt-5 space-y-3">
                  {ourOption.map((point) => (
                    <li key={point} className={`flex items-start gap-3 text-sm font-semibold leading-relaxed ${t.body}`}>
                      <Check className={`mt-0.5 h-4 w-4 flex-none ${t.icon}`} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className={`mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed ${t.muted}`}>
              If price is the only thing that matters to you, we are not the right fit.{' '}
              <span className={`font-bold ${t.heading}`}>Cheap websites usually get bought twice.</span>
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={`scroll-mt-20 border-y px-4 py-16 sm:px-6 md:py-24 ${t.border} ${t.sectionAlt}`}>
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                Three ways to get your website.
              </h2>
              <p className={`mt-5 text-lg leading-relaxed ${t.muted}`}>
                Same website, same care. Pick the way of paying that suits your business.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
              {pricingOptions.map((option) => (
                <div
                  key={option.key}
                  className={`relative flex flex-col rounded-3xl border p-7 md:p-8 ${option.featured ? `${t.priceCard} border-2 border-amber-400` : t.cardOnAlt}`}
                >
                  {option.tag && (
                    <span className={`absolute -top-3 left-7 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${option.featured ? 'bg-amber-400 text-neutral-950' : t.badge + ' border'}`}>
                      {option.tag}
                    </span>
                  )}
                  <p className={`font-display text-lg font-bold ${t.body}`}>{option.name}</p>
                  <p className={`mt-4 font-display text-5xl font-extrabold tracking-tight ${t.heading}`}>
                    {option.price} <span className={`text-lg font-bold ${t.muted}`}>{option.unit}</span>
                  </p>
                  <p className={`mt-2 font-display font-bold ${t.highlight}`}>{option.terms}</p>
                  <p className={`mt-4 leading-relaxed ${t.muted}`}>{option.summary}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {option.points.map((point) => (
                      <li key={point} className={`flex items-start gap-3 text-sm leading-relaxed ${t.body}`}>
                        <Check className={`mt-0.5 h-4 w-4 flex-none ${t.icon}`} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <CTAButton label={`${track}_pricing_${option.key}`} href={option.href} className="sm:w-full">
                      {option.cta}
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-8 rounded-3xl border p-7 md:p-8 ${t.cardOnAlt}`}>
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <p className={`font-display text-lg font-bold ${t.heading}`}>Every option includes</p>
                <p className={`flex items-center gap-2 text-sm ${t.muted}`}>
                  <Gauge className={`h-4 w-4 ${t.icon}`} aria-hidden="true" />
                  Most sites live in 5–7 business days
                </p>
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {packageItems.map((item) => (
                  <li key={item} className={`flex items-start gap-3 rounded-xl px-4 py-4 text-sm leading-relaxed ${t.priceItem}`}>
                    <Check className={`mt-0.5 h-5 w-5 flex-none ${t.icon}`} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {featuredReview && (
              <figure className="mx-auto mt-10 max-w-3xl text-center">
                <div className="flex items-center justify-center gap-2">
                  <GoogleIcon />
                  <Stars className="h-5 w-5" />
                </div>
                <blockquote className={`mt-4 font-display text-xl font-bold leading-snug md:text-2xl ${t.subheading}`}>
                  “{featuredReview.comment}”
                </blockquote>
                <figcaption className={`mt-3 text-sm ${t.muted}`}>
                  {featuredReview.reviewerName} · Google review
                </figcaption>
              </figure>
            )}
          </div>
        </section>

        {/* Process */}
        <section className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <SectionLabel>How it works</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold leading-tight md:text-5xl ${t.heading}`}>
                Your part takes about 15 minutes.
              </h2>
            </div>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className={`relative rounded-2xl border p-6 ${t.card}`}>
                  <span className={`font-display text-5xl font-extrabold ${t.stepNumber}`}>0{index + 1}</span>
                  <Icon className={`absolute right-6 top-7 h-6 w-6 ${t.icon}`} aria-hidden="true" />
                  <h3 className={`mt-3 font-display text-xl font-bold ${t.heading}`}>{title}</h3>
                  <p className={`mt-2 leading-relaxed ${t.muted}`}>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className={`px-4 py-16 sm:px-6 md:py-24 ${t.sectionAlt}`}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <SectionLabel>Questions</SectionLabel>
              <h2 className={`font-display text-3xl font-extrabold md:text-5xl ${t.heading}`}>Straight answers.</h2>
            </div>
            <div className={`mt-10 divide-y border-y ${t.divide} ${t.border}`}>
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className={`flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-display text-lg font-bold marker:content-none md:text-xl ${t.heading}`}>
                    {faq.question}
                    <ChevronDown className={`h-5 w-5 flex-none transition-transform group-open:rotate-180 ${t.icon}`} aria-hidden="true" />
                  </summary>
                  <p className={`pb-6 leading-relaxed md:text-lg ${t.muted}`}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className={`px-4 py-20 sm:px-6 md:py-28 ${t.finalCta}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={`font-display text-4xl font-extrabold leading-tight md:text-6xl ${t.heading}`}>
              Your customers are searching right now. <span className={t.highlight}>Make sure they find you.</span>
            </h2>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed ${t.body}`}>
              We take on a limited number of builds each month so every website gets proper attention. Send us a
              WhatsApp with your business name and what you do. We will reply with examples in your industry and a
              straight answer on whether we are a fit.
            </p>
            <div className="mt-9 flex flex-col items-center gap-5">
              <CTAButton label={`${track}_final_whatsapp`} />
              <a
                href={PHONE_URL}
                onClick={() => trackCTA(`${track}_final_call`)}
                className={`inline-flex items-center gap-2 text-sm font-bold ${t.navLink}`}
              >
                <Phone className={`h-4 w-4 ${t.icon}`} aria-hidden="true" />
                Prefer to talk? Call 083 233 6716
              </a>
            </div>
          </div>
        </section>

        {isAd && (
          <footer className={`border-t px-4 py-8 pb-28 sm:px-6 md:pb-8 ${t.footer}`}>
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
              <p className={t.faint}>© {new Date().getFullYear()} Local Pros Studio · Building websites for South African businesses since 2015</p>
              <div className="flex items-center gap-6">
                <a href="/privacy" className={t.footerLink}>Privacy</a>
                <a href="/terms" className={t.footerLink}>Terms</a>
                <a href="/refunds-cancellations" className={t.footerLink}>Refunds</a>
              </div>
            </div>
          </footer>
        )}

        {/* Sticky mobile CTA bar */}
        {isAd && (
          <div className={`fixed inset-x-0 bottom-0 z-50 border-t px-4 py-3 backdrop-blur-lg md:hidden ${t.stickyBar}`}>
            <div className="flex gap-3">
              <a
                href={PHONE_URL}
                onClick={() => trackCTA(`${track}_sticky_call`)}
                className={`flex flex-none items-center justify-center rounded-full border px-5 py-3.5 ${t.outlineButton}`}
                aria-label="Call Local Pros Studio"
              >
                <Phone className={`h-5 w-5 ${t.icon}`} aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA(`${track}_sticky_whatsapp`)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3.5 font-display text-sm font-extrabold text-neutral-950"
              >
                Get a Free Website Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default WebDesignAdsPage;
