// No imports: src/seo.ts reads this list, and the main bundle must not pull in the example pictures.
// The six broad categories on the category-first ads pages (Jeremy, 18 Oct 2026: broad categories, not one page
// per trade, because SA searches are general). Each is the examples chat's type of business (catalogue.ts), so
// the examples, the second question and the lead's "type of business" stay the same as on the other pages.
// Online shop is not a main choice here: nobody searched for one, and the R30,000 price confused people who
// tapped it (ad visitors 13–18 Oct). It sits under "Something else", quoted separately.
// Prices match the examples chat (ExamplesChat.tsx priceOf): professional R9,900, everyone else R6,500 for
// 1 to 3 services and R9,900 for 4 or more; then R290 a month for hosting and updates.

export type Category = {
  id: string;
  // The examples chat's type of business
  group: string;
  label: string;
  // Under the label in the pop-up: short, so it stays on one line beside the two design pictures
  examples: string;
  // "Websites for …" on the category page
  heading: string;
  price: string;
  // What every website in this category has: three items, literal
  includes: { title: string; body: string }[];
  // The result they pay for, in their words (Jeremy, 18 Oct 2026: "sell the outcome", a trade wants booked jobs,
  // a professional wants consultations). No numbers: only what the website does and the message they'll get.
  outcome: Outcome;
};

// line: under the headline at the top. headline: the outcome section. message: the WhatsApp a customer sends.
export type Outcome = { line: string; headline: string; message: string };

// Sharper versions when they tap their type of business (catalogue.ts sub ids)
export const SUB_OUTCOMES: Record<string, Pick<Outcome, 'headline' | 'message'>> = {
  plumbing: { headline: 'More call-outs for leaks, geysers and drains', message: 'Hi, my geyser burst this morning. Can you come today?' },
  electrical: { headline: 'More call-outs and COC jobs', message: 'Hi, half my plugs keep tripping. Can you come out tomorrow?' },
  building: { headline: 'More quote requests for building work', message: 'Hi, we want to add a room at the back. Can you come and quote?' },
  painting: { headline: 'More painting quotes', message: 'Hi, can you quote to paint the outside of a 3-bedroom house?' },
  roofing: { headline: 'More roof repair quotes', message: 'Hi, our roof leaks when it rains. Can you take a look this week?' },
  solar: { headline: 'More solar quote requests', message: 'Hi, what would a backup system for a 3-bedroom house cost?' },
  paving: { headline: 'More paving, fencing and landscaping quotes', message: 'Hi, can you quote for paving our driveway?' },
  pools: { headline: 'More pool and hot tub jobs', message: 'Hi, our pool has gone green. Can you come and sort it out?' },
  cleaning: { headline: 'More cleaning bookings', message: 'Hi, can I book a deep clean for Saturday?' },
  garden: { headline: 'More garden service clients', message: 'Hi, can you do our garden every second week?' },
  pest: { headline: 'More pest control call-outs', message: 'Hi, we’ve got cockroaches in the kitchen. When can you come?' },
  security: { headline: 'More gate motor and alarm call-outs', message: 'Hi, our gate motor stopped working. Can you come today?' },
  car: { headline: 'More cars booked in', message: 'Hi, my car’s making a grinding noise. Can I bring it in tomorrow?' },
  pet: { headline: 'More appointments and bookings', message: 'Hi, can I book Max in for a wash and cut on Saturday?' },
  tutor: { headline: 'More lessons booked', message: 'Hi, my son needs help with matric maths. Do you have space?' },
  salon: { headline: 'More bookings for hair, nails and lashes', message: 'Hi, can I book a cut and colour for Saturday?' },
  spa: { headline: 'More treatments booked', message: 'Hi, can I book two massages for Friday afternoon?' },
  fitness: { headline: 'More sign-ups and sessions booked', message: 'Hi, I’d like to start training. Can I book a trial session?' },
  medical: { headline: 'More appointments booked', message: 'Hi, can I book a check-up for my daughter this week?' },
  accountants: { headline: 'More tax and bookkeeping clients', message: 'Hi, I need help with my tax return. Can we set up a meeting?' },
  lawyers: { headline: 'More consultations booked', message: 'Hi, I need advice on a divorce. Can I book a consultation?' },
  estate: { headline: 'More valuations and buyer enquiries', message: 'Hi, we’re thinking of selling. Can you value our house?' },
  corporate: { headline: 'More enquiries from the right clients', message: 'Hi, we’d like a proposal for a project. Who should I speak to?' },
  restaurant: { headline: 'More table bookings and orders', message: 'Hi, can I book a table for 6 on Friday at 7?' },
  venue: { headline: 'More wedding and event enquiries', message: 'Hi, is your venue free on 14 March? It’s a wedding for 120.' },
};

const PRICE = 'R6,500 for 1 to 3 services, or R9,900 for 4 or more.';

export const CATEGORIES: Category[] = [
  {
    id: 'trades',
    group: 'trades',
    label: 'Trades and home services',
    examples: 'Plumber, builder, electrician',
    heading: 'Websites for trades and home services',
    price: PRICE,
    includes: [
      { title: 'A page for each service', body: 'Geysers, rewiring, roof repairs: each service gets its own page, so Google can match it to what people search.' },
      { title: 'The areas you work in', body: 'Your call-out areas on the site, so people nearby can see you cover them.' },
      { title: 'Your work and your reviews', body: 'Photos of your jobs and your Google reviews up front, so you look like the safe choice.' },
    ],
    outcome: {
      line: 'Built to bring you quote requests on WhatsApp.',
      headline: 'More quote requests on WhatsApp',
      message: 'Hi, can you quote me for a job this week?',
    },
  },
  {
    id: 'local',
    group: 'local',
    label: 'Local services',
    examples: 'Mechanic, vet, tutor',
    heading: 'Websites for local service businesses',
    price: PRICE,
    includes: [
      { title: 'A page for each service', body: 'Services, car repairs or lessons: each gets its own page, so Google can match it to what people search.' },
      { title: 'Your hours and where to find you', body: 'Opening hours, a map and directions, easy to find on a phone.' },
      { title: 'Your reviews up front', body: 'Your Google reviews on the page, so new customers trust you before they call.' },
    ],
    outcome: {
      line: 'Built to bring you bookings on WhatsApp.',
      headline: 'More bookings, fewer missed calls',
      message: 'Hi, can I book for tomorrow morning?',
    },
  },
  {
    id: 'health',
    group: 'health',
    label: 'Health and beauty',
    examples: 'Salon, spa, physio, fitness',
    heading: 'Websites for health and beauty businesses',
    price: PRICE,
    includes: [
      { title: 'Your treatments and prices', body: 'Each treatment or service listed clearly, so people know what you offer before they book.' },
      { title: 'Photos of your work and space', body: 'Your real photos, so people can see what to expect.' },
      { title: 'Booking by WhatsApp or phone', body: 'WhatsApp and call buttons on every page, easy to tap on a phone.' },
    ],
    outcome: {
      line: 'Built to fill your appointment book.',
      headline: 'Fill your appointment book',
      message: 'Hi, do you have a gap on Saturday morning?',
    },
  },
  {
    id: 'professional',
    group: 'professional',
    label: 'Professional',
    examples: 'Attorney, accountant, estate agent',
    heading: 'Websites for professional firms',
    price: 'R9,900 once-off.',
    includes: [
      { title: 'A page for each service', body: 'Conveyancing, tax returns, rentals: each service gets its own page, so Google can match it to what people search.' },
      { title: 'Your team and experience', body: 'Who you are and what you specialise in, so clients feel they know you before they call.' },
      { title: 'Easy to get in touch', body: 'Call, WhatsApp and email on every page, easy to tap on a phone.' },
    ],
    outcome: {
      line: 'Built to bring you consultations with the right clients.',
      headline: 'More consultations from the right clients',
      message: 'Hi, can I book a consultation this week?',
    },
  },
  {
    id: 'hospitality',
    group: 'hospitality',
    label: 'Hospitality',
    examples: 'Guest house, restaurant, venue',
    heading: 'Websites for guest houses, restaurants and venues',
    price: PRICE,
    includes: [
      { title: 'Your rooms, menu or spaces', body: 'Real photos and plain descriptions, so guests know what they’re booking.' },
      { title: 'Directions and what’s nearby', body: 'A map and how to get there, easy to find on a phone.' },
      { title: 'Enquiries by WhatsApp or phone', body: 'WhatsApp and call buttons on every page, so guests ask you directly.' },
    ],
    outcome: {
      line: 'Built to bring you direct bookings.',
      headline: 'More direct bookings, less commission',
      message: 'Hi, do you have a room for 2 adults from 12 to 14 December?',
    },
  },
  {
    id: 'other',
    group: 'other',
    label: 'Something else',
    examples: 'Any other business',
    heading: 'Websites for your business',
    price: `${PRICE} Online shops are quoted separately.`,
    includes: [
      { title: 'A page for each service', body: 'Each thing you offer gets its own page, so Google can match it to what people search.' },
      { title: 'Your work and your reviews', body: 'Your real photos and Google reviews up front, so you look like the safe choice.' },
      { title: 'Easy to get in touch', body: 'WhatsApp, call and quote buttons on every page, easy to tap on a phone.' },
    ],
    outcome: {
      line: 'Built to bring you enquiries on WhatsApp.',
      headline: 'More enquiries on WhatsApp',
      message: 'Hi, I found you on Google. Can you help me?',
    },
  },
];

// What the page behind the question shows before they pick (/go/websites): every design, the general wording
export const ALL: Category = {
  ...(CATEGORIES.find((c) => c.id === 'other') as Category),
  id: 'all',
  label: 'All',
  examples: '',
  price: PRICE,
};

export const categoryById = (id: string | undefined) => CATEGORIES.find((c) => c.id === id);

// The addresses (each pre-built as its own page, see src/seo.ts)
export const GATE_PATH = '/go/websites';
export const categoryPath = (c: Category) => `/go/websites-for/${c.id}`;

// The "why choose us" scorecard (Compare.tsx, Jeremy 18 Oct 2026). The "most web designers" side comes from the published packages of 20
// South African web design companies, read on 11 Oct 2026 (research-private/website-design-price-survey-2026-10.json,
// on Jeremy's machine): writing included in 3 packages and extra or excluded in 16; 3 to 7 pages in a typical
// package; delivery dates mostly counted from when the client sends their content; extra pages, writing and
// changes priced on top. Keep it to what that survey shows; we are not the cheapest on sticker price.
export const COMPARE: { topic: string; them: string; us: string }[] = [
  { topic: 'A page for each service and area', them: 'Extra', us: 'Included' },
  { topic: 'Designed for your kind of business', them: 'Template', us: 'Made for you' },
  { topic: 'The writing', them: 'Extra', us: 'Included' },
  { topic: 'Photos', them: 'You do it', us: 'Included' },
  { topic: 'How fast', them: 'After your content', us: '7 days' },
  { topic: 'Changes after launch', them: 'Extra', us: 'Included' },
];
