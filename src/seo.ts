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
  // Also ask search engines not to follow the page's links (unlisted pages shared only by link)
  nofollow?: boolean;
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
      'Google reviews, social media posts and a website for R2,500 a month, with free setup. Or one service on its own: reviews R1,200, posts R2,000, website from R6,500.',
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
  // One page since 9 Oct 2026 (was /web-design and /website-design); Google Ads use its no-menu copy below
  '/website-design-package': {
    title: 'Website Design South Africa | Local Pros Studio',
    description:
      'Website design for South African businesses from R6,500. Get your instant price and popular designs for your industry. Written and built for you, live in 7 days.',
  },
  // Google Ads land on this copy of /website-design-package without the menu links (13 Oct 2026)
  '/go/website-design': {
    title: 'Website Design South Africa | Local Pros Studio',
    description:
      'Website design for South African businesses from R6,500. Get your instant price and popular designs for your industry. Written and built for you, live in 7 days.',
    noindex: true,
  },
  // The R9,900 standard website in detail: 4 to 8 pages, a strict 7-day process (15 Oct 2026)
  '/7-day-website': {
    title: 'A New Website in 7 Days for R9,900 | Local Pros Studio',
    description:
      'A modern 4 to 8 page website for R9,900, written and built for you in 7 days. Sample designs on day 1, your changes on day 6, live on day 7.',
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
  // Unlisted: for Local Pros lead partners moving onto the package (14 Oct 2026). Shared only by link from the
  // walkthrough and WhatsApp; no menu, footer or other page links here, and it stays out of the sitemap
  '/lead-partners': {
    title: 'Local Pros lead partners: what’s changing',
    description:
      'What’s changing for Local Pros lead partners: your leads, the Local Pros Studio package, the terms in plain English and your questions answered.',
    noindex: true,
    nofollow: true,
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

// The robots tag both the browser (PageMeta in App.tsx) and the pre-built HTML (scripts/prerender.mjs) write
export const robotsContent = (seo: PageSeo) =>
  seo.noindex ? (seo.nofollow ? 'noindex, nofollow' : 'noindex') : 'index, follow';

export const canonicalUrl = (pathname: string) => {
  const seo = seoForPath(pathname);
  const path = seo.canonicalPath ?? (pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/');
  return `${SITE_URL}${path === '/' ? '/' : path}`;
};
