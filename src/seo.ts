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
  '/pricing': {
    title: 'Prices: Google Reviews, Social Media & Websites | Local Pros Studio',
    description:
      'Google reviews, social media posts and a website for R2,500 a month, with free setup. Or one service on its own: reviews R1,200, posts R2,000, website R9,900.',
  },
  '/social-media-posting-service': {
    title: 'Social Media Posting Service for SA Businesses | Local Pros Studio',
    description:
      'We make your Facebook, Instagram and Google posts, turn your job photos into posts and publish them for you. R2,000 a month, month to month.',
  },
  // The old dark social page, archived 9 Oct 2026 when the light rebuild took its place
  '/social-media-posting-service-archived': {
    title: 'Social Media Posting Service (archived) | Local Pros Studio',
    description: 'The previous version of our social media posting page, kept for reference.',
    noindex: true,
  },
  // One page for everyone since 9 Oct 2026, Google Ads included (was /web-design and /website-design)
  '/website-design-package': {
    title: 'Website Design South Africa | Local Pros Studio',
    description:
      'We write, build and look after websites for South African businesses, set up for Google with WhatsApp and call buttons. Live in 7 days, from R450 a month.',
  },
  '/about': {
    title: 'About Local Pros Studio | Google Reviews, Social Media & Websites',
    description:
      'A small team in Cape Town helping South African businesses get found online with Google reviews, social media posts and websites. Building websites since 2015.',
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
