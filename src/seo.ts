// One source for every page's search title, description and address.
// Used three ways: the browser tab title while someone clicks around (PageMeta in App.tsx),
// the pre-built HTML each page is served with (scripts/prerender.mjs), and sitemap.xml.
// Add a new page here when you add its <Route>, or it ships with the homepage's title.

export const SITE_URL = 'https://studio.localpros.co.za';

export type PageSeo = {
  title: string;
  description: string;
  // Point Google at another address that carries the same content
  canonicalPath?: string;
  // Keep out of Google and the sitemap
  noindex?: boolean;
};

export const PAGES: Record<string, PageSeo> = {
  '/': {
    title: 'Google Reviews & Social Media for SA Businesses | Local Pros Studio',
    description:
      'We collect Google reviews on WhatsApp, make and publish your Facebook and Instagram posts, and build websites for South African service businesses.',
  },
  '/reviews': {
    title: 'Get More Google Reviews on WhatsApp | Local Pros Studio',
    description:
      'Send us your customer’s name and number and we WhatsApp them your Google review link, with a reminder if they forget. R1,200 a month, month to month.',
  },
  '/social-media-posting-service': {
    title: 'Social Media Posting Service for SA Businesses | Local Pros Studio',
    description:
      'We turn your job photos into Facebook, Instagram and Google posts and publish them for you every week. Done-for-you social media for South African service businesses.',
  },
  '/web-design': {
    title: 'Website Design South Africa | Local Pros Studio',
    description:
      'We write, build and look after websites for South African businesses, set up for Google with WhatsApp and call buttons. Live in 7 days, from R450 a month.',
  },
  // Google Ads landing page: same content as /web-design without the site navigation
  '/website-design': {
    title: 'Website Design South Africa | Local Pros Studio',
    description:
      'We write, build and look after websites for South African businesses, set up for Google with WhatsApp and call buttons. Live in 7 days, from R450 a month.',
    canonicalPath: '/web-design',
  },
  '/special-offer-bundle': {
    title: 'Google Reviews and Weekly Posts, Done For You | Local Pros Studio',
    description:
      'Reviews collected for you, your jobs posted every week, and a free website if you need one. One plan for South African service businesses.',
  },
  '/autopilot': {
    title: 'Reviews and Weekly Posts on Autopilot | Local Pros Studio',
    description:
      'We collect your reviews on WhatsApp, post the jobs you have completed and keep your business active on Google, Facebook and Instagram every week.',
  },
  '/recurring-service-booking-system': {
    title: 'Rebook Repeat Customers on WhatsApp | Local Pros Studio',
    description:
      'We remind your past customers on WhatsApp when their next service is due and help them rebook, so repeat work does not slip away. For South African service businesses.',
  },
  '/about': {
    title: 'About Us | Local Pros Studio',
    description:
      'Local Pros Studio has helped South African home service businesses get found online for over a decade, with reviews, social media and websites done for you.',
  },
  '/terms': {
    title: 'Terms and Conditions | Local Pros Studio',
    description: 'The terms and conditions for Local Pros Studio services.',
  },
  '/privacy': {
    title: 'Privacy Policy | Local Pros Studio',
    description: 'How Local Pros Studio collects, uses and protects your personal information.',
  },
  '/refunds-cancellations': {
    title: 'Refund and Cancellation Policy | Local Pros Studio',
    description: 'How refunds and cancellations work for Local Pros Studio services.',
  },
  '/website-faq': {
    title: 'Website Terms and FAQ | Local Pros Studio',
    description: 'Answers to common questions about Local Pros Studio websites, hosting and changes.',
  },
};

const NOT_LISTED: PageSeo = { ...PAGES['/'], noindex: true };

// Review pages and unknown addresses keep the homepage wording but stay out of Google
export const seoForPath = (pathname: string): PageSeo => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PAGES[path] ?? NOT_LISTED;
};

export const canonicalUrl = (pathname: string) => {
  const seo = seoForPath(pathname);
  const path = seo.canonicalPath ?? (pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/');
  return `${SITE_URL}${path === '/' ? '/' : path}`;
};
