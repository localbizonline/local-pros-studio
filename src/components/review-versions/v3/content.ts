// Copy for homepage version 3, "Which one would you call?".
// Facts come from the live site (see DESIGN-SYSTEM.md and design-directions/content.ts).
// The Google and Facebook mock-ups use a fictional demo business (Mokoena Plumbing) and
// fictional competitors: they demonstrate what a customer sees, they are not client results.

export const HERO = {
  keywordH1: 'Google reviews and social media for South African trades businesses',
  headline: "More Google reviews, so you're the one they call",
  highlight: 'the one they call',
  subtitle:
    'Customers compare you on Google before they pick up the phone. We get you fresh reviews after every job and post your work every week, so you look like the busy, trusted one.',
  primary: 'Chat to us on WhatsApp',
  secondary: 'See how it works',
  note: 'Month-to-month on single services · 30-day money-back guarantee on reviews',
};

export const SEARCH = {
  query: 'plumber near me',
  question: 'Which one would you call?',
  captionBefore: 'Six reviews, the newest a year old. Thornbush sits on top and gets the call.',
  captionAfter: 'Sixty-four reviews, the newest from this week. You move to the top of the map and get the call.',
};

export type Listing = {
  name: string;
  rating: number;
  count: number;
  hours: string;
  snippet: string;
  when: string;
};

export const COMPETITOR_TOP: Listing = {
  name: 'Thornbush Plumbing',
  rating: 4.7,
  count: 48,
  hours: 'Open 24 hours',
  snippet: 'Came out the same evening and sorted the leak.',
  when: '3 days ago',
};

export const YOU_BEFORE: Listing = {
  name: 'Mokoena Plumbing',
  rating: 4.0,
  count: 6,
  hours: 'Open · Closes 17:00',
  snippet: 'Good service.',
  when: '1 year ago',
};

export const YOU_AFTER: Listing = {
  ...YOU_BEFORE,
  rating: 4.9,
  count: 64,
  snippet: 'Arrived on time and fixed the geyser the same day.',
  when: '2 days ago',
};

export const COMPETITOR_LOW: Listing = {
  name: 'Kudu Pipe & Drain',
  rating: 4.2,
  count: 19,
  hours: 'Open · Closes 18:00',
  snippet: 'Fair price, arrived a bit late.',
  when: '5 months ago',
};

export const CHECKS_HEAD = {
  eyebrow: 'What customers check',
  title: 'Before they call, customers compare you with the next business',
  subtitle: 'They look at three things on Google and Facebook. Then they pick one and call.',
};

export const CHECKS = [
  {
    title: 'How many reviews',
    before: '(6)',
    after: '(64)',
    body: 'Six reviews looks like a business nobody has heard of. Sixty looks like one people trust.',
  },
  {
    title: 'How recent they are',
    before: '1 year ago',
    after: '2 days ago',
    body: 'A review from last year makes people wonder if you are still around. One from this week says you are.',
  },
  {
    title: 'Whether you look busy',
    before: 'Last post 2021',
    after: 'Posted Tuesday',
    body: 'A quiet Facebook page looks like a closed business. Photos of this week’s jobs show you are working.',
  },
];

export const COST = {
  label: 'What doing nothing costs',
  title: 'You never see the jobs you lose this way.',
  body: 'There is no missed call and no lost quote. The customer just calls the other number.',
};

export const SOCIAL = {
  eyebrow: 'Then they check your Facebook',
  title: "Last post in 2021? Customers wonder if you've closed",
  subtitle:
    'Customers often click through to your Facebook or Instagram before they call. We post your jobs every week, so they see a business that is working.',
  thinkLabel: 'What the customer thinks',
  thinkBefore: 'Are they still in business? I’ll try the next one.',
  thinkAfter: 'They were out on a job this week. Let’s call them.',
  howTitle: 'How posting works',
  how: 'WhatsApp us photos of your jobs. We write the posts and publish them to Facebook, Instagram and Google every week, and a person checks every post.',
  link: { label: 'How social posting works', to: '/social-media-posting-service' },
};

export const HOW = {
  eyebrow: 'How Google reviews work',
  title: 'A review request goes out on WhatsApp after every job',
  subtitle: 'You don’t have to ask anyone. Your customer taps one link and the review goes up on your Google profile.',
  link: { label: 'How Google reviews work', to: '/reviews' },
};

export const PROOF = {
  eyebrow: 'Proof',
  title: 'We did it on our own Google profile first',
  subtitle: 'Same WhatsApp review system, our own business, 18 months from start to finish.',
  before: { label: 'Before', rating: 3.0, count: 29 },
  after: { label: '18 months later', rating: 4.6, count: 789 },
  name: 'Local Pros',
  category: 'Internet marketing service',
  caption: 'This is our own Google Business Profile, not a client’s.',
  reviewsTitle: 'What our own customers say on Google',
};

export const OFFER_HEAD = {
  eyebrow: 'What it costs',
  title: 'Pick one service, or take both for R2,500 a month',
  subtitle: 'Single services are month-to-month. You keep doing the work, we make sure people see it.',
};

export const GUARANTEE = {
  eyebrow: 'Our guarantee',
  title: 'New 5-star reviews in your first 30 days, or your money back',
  body: [
    'The guarantee covers Google reviews. If we don’t get you any new 5-star reviews in your first 30 days, we refund you.',
    'Reviews and social posting on their own are month-to-month.',
  ],
  cta: 'Start with Google reviews',
};

export const FAQ_HEAD = {
  eyebrow: 'Questions',
  title: 'What business owners ask us',
};

export const FAQ = [
  {
    q: 'Will this get me to the top of Google?',
    a: 'We can’t promise a position on Google, and nobody honest can. What we do is give customers what they check before they call: plenty of recent reviews and pages that show you are working.',
  },
  {
    q: 'What if a customer is unhappy?',
    a: 'Before anyone leaves a review, we ask how the job went. Unhappy customers go to a private feedback form and you are notified straight away, so you can call and sort it out.',
  },
  {
    q: 'Are the reviews real?',
    a: 'Yes. We only ask your own customers, after a real job, and they write the review themselves on your Google profile.',
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
  title: 'Make your business the one they call',
  subtitle: 'Send us a WhatsApp and we will show you how it works for your business.',
  cta: 'Chat to us on WhatsApp',
  note: 'Month-to-month on single services · 30-day money-back guarantee on reviews',
};
