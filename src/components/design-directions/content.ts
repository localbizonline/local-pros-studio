// Shared copy for the three design directions, so Jeremy compares looks, not words.
// Every fact here already appears on the live site (homepage, /reviews, /social-media-posting-service,
// /web-design, /about). Do not add figures that are not on the site.
import { SITE_WHATSAPP_URL } from '../../whatsapp';

export const WHATSAPP_URL = SITE_WHATSAPP_URL;

export const NAV = [
  { label: 'Google reviews', to: '/reviews' },
  { label: 'Social posting', to: '/social-media-posting-service' },
  { label: 'Websites', to: '/web-design' },
  { label: 'About', to: '/about' },
];

export const HERO = {
  keywordH1: 'Google reviews and social media for South African trades businesses',
  headline: 'Get more Google reviews after every job',
  // Words in the headline that a direction may highlight
  highlight: 'Google reviews',
  subtitle:
    'We send your customers a WhatsApp review request when the job is done. We also post your work to Facebook, Instagram and Google every week.',
  primary: 'Chat to us on WhatsApp',
  secondary: 'See how it works',
  note: 'Month-to-month on single services · 30-day money-back guarantee on reviews',
};

export const DEMO = {
  eyebrow: 'How it works',
  title: 'A review request goes out on WhatsApp after every job',
  subtitle: 'Your customer taps one link and the review goes up on your Google profile.',
  steps: [
    {
      title: 'You finish the job',
      body: 'We pick it up from your Sage or QuickBooks invoices, a BCC on your invoice email, or a quick form.',
    },
    {
      title: 'Your customer gets a WhatsApp',
      body: 'It thanks them and asks for a Google review. If something went wrong, they can reply and you hear about it straight away.',
    },
    {
      title: 'They leave a Google review',
      body: 'Happy customers get a one-tap link to your Google profile, with a friendly reminder if they forget.',
    },
  ],
};

export const SERVICES_HEAD = {
  eyebrow: 'What we do',
  title: 'Reviews, social posts and a website, done for you',
  subtitle: 'Take one service or combine them. You keep doing the work, we make sure people see it.',
};

export const SERVICES = [
  {
    name: 'Google reviews',
    price: 'R1,200 a month',
    body: 'We send a WhatsApp review request after every job, with a one-tap link and a reminder. If a customer is unhappy, they can reply and you hear about it straight away.',
    note: 'Month-to-month · 30-day money-back guarantee',
    link: { label: 'How Google reviews work', to: '/reviews' },
  },
  {
    name: 'Social media posting',
    price: 'R2,000 a month',
    body: 'WhatsApp us photos of your jobs and we turn them into posts. We publish them to Facebook, Instagram and Google every week.',
    note: 'Month-to-month · every post checked by a person',
    link: { label: 'How social posting works', to: '/social-media-posting-service' },
  },
  {
    name: 'Websites',
    price: 'R9,900 once-off',
    body: 'A fast, mobile-friendly website for your business, built on templates that already work for trades. Delivered in 5 to 7 days.',
    note: 'Free with the R2,500 plan on a 12-month commitment',
    link: { label: 'See website packages', to: '/web-design' },
  },
];

export const PLAN = {
  name: 'The R2,500 plan',
  body: 'Google reviews and weekly social posts together for R2,500 a month, on a 6-month commitment. Add a free website if you need one, on a 12-month commitment.',
  cta: 'Ask about the R2,500 plan',
};

export const TRADES_HEAD = {
  eyebrow: 'Who it is for',
  title: 'Built for trades and home-service businesses',
  subtitle: 'If your customers find you on Google and check your reviews before they call, this is for you.',
  label: 'Popular with',
};

export const TRADES = [
  'Plumbers',
  'Electricians',
  'Roofers',
  'Pool cleaners',
  'Painters',
  'Builders',
  'Fencing contractors',
  'Paving contractors',
  'Pest control',
  'Cleaning services',
  'Garden services',
  'Landscapers',
  'Gate motor installers',
  'Solar installers',
  'Gas installers',
  'Borehole drillers',
  'Air conditioning',
  'Waterproofing',
  'Tilers',
  'Carpenters',
  'Handymen',
  'Security installers',
  'Appliance repairs',
  'Locksmiths',
];

export const NOTE = {
  title: 'A note from Jeremy',
  paragraphs: [
    'We have run local businesses ourselves. Magnets on the bakkie, flyers at the robots and asking family for reviews: we have done all of it.',
    'After more than 10 years of finding out what works, we built the system we wish we had. You send us the job details, and we handle the reviews and the posts.',
    'If you have a question, WhatsApp me. You will get a reply from a real person, not a call centre.',
  ],
  name: 'Jeremy',
  role: 'Founder, Local Pros Studio',
  cta: 'Message Jeremy on WhatsApp',
};

export const FAQ_HEAD = {
  eyebrow: 'Questions',
  title: 'What business owners ask us',
};

export const FAQ = [
  {
    q: 'What if a customer is unhappy?',
    a: 'Every customer gets the same Google link. If something went wrong, they can reply on the same WhatsApp and you are notified straight away, so you can call and sort it out.',
  },
  {
    q: 'How do you know when I have finished a job?',
    a: 'If you use Sage or QuickBooks, we connect to it and pick up completed jobs. If not, BCC us on your invoice emails or fill in a quick form.',
  },
  {
    q: 'What if I am too busy to send photos?',
    a: 'We add service posts, public holiday posts and your best reviews to your schedule. Your pages keep going even in a busy month.',
  },
  {
    q: 'Is there a contract?',
    a: 'Reviews (R1,200) and posting (R2,000) are month-to-month, and reviews come with a 30-day money-back guarantee. The R2,500 plan is a 6-month commitment, or 12 months with the free website.',
  },
];

export const CLOSING = {
  title: 'Get more Google reviews, starting with your next job',
  subtitle: 'Send us a WhatsApp and we will show you how it works for your business.',
  cta: 'Chat to us on WhatsApp',
  note: 'Month-to-month on single services · 30-day money-back guarantee on reviews',
};

export const FOOTER = {
  blurb: 'Google reviews, social media posting and websites for South African trades businesses.',
  services: [
    { label: 'Google reviews', to: '/reviews' },
    { label: 'Social media posting', to: '/social-media-posting-service' },
    { label: 'Websites', to: '/web-design' },
    { label: 'R2,500 plan', to: '/special-offer-bundle' },
  ],
  company: [
    { label: 'About', to: '/about' },
    { label: 'Terms and conditions', to: '/terms' },
    { label: 'Privacy policy', to: '/privacy' },
    { label: 'Refunds and cancellations', to: '/refunds-cancellations' },
  ],
  phone: '+27 83 233 6716',
  email: 'hello@localpros.co.za',
};
