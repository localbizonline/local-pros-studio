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
  // Under the label on the question screen
  examples: string;
  // "Websites for …" on the category page
  heading: string;
  price: string;
  // What every website in this category has: three items, literal
  includes: { title: string; body: string }[];
};

const PRICE = 'R6,500 for 1 to 3 services, or R9,900 for 4 or more.';

export const CATEGORIES: Category[] = [
  {
    id: 'trades',
    group: 'trades',
    label: 'Trades and home services',
    examples: 'Plumber, builder, electrician, cleaning',
    heading: 'Websites for trades and home services',
    price: PRICE,
    includes: [
      { title: 'A page for each service', body: 'Geysers, rewiring, roof repairs: each service gets its own page, so Google can match it to what people search.' },
      { title: 'The areas you work in', body: 'Your call-out areas on the site, so people nearby can see you cover them.' },
      { title: 'Your work and your reviews', body: 'Photos of your jobs and your Google reviews up front, so you look like the safe choice.' },
    ],
  },
  {
    id: 'local',
    group: 'local',
    label: 'Local services',
    examples: 'Mechanic, vet, tutor, driving school',
    heading: 'Websites for local service businesses',
    price: PRICE,
    includes: [
      { title: 'A page for each service', body: 'Services, car repairs or lessons: each gets its own page, so Google can match it to what people search.' },
      { title: 'Your hours and where to find you', body: 'Opening hours, a map and directions, easy to find on a phone.' },
      { title: 'Your reviews up front', body: 'Your Google reviews on the page, so new customers trust you before they call.' },
    ],
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
  },
  {
    id: 'hospitality',
    group: 'hospitality',
    label: 'Hospitality',
    examples: 'Guest house, B&B, restaurant, venue',
    heading: 'Websites for guest houses, restaurants and venues',
    price: PRICE,
    includes: [
      { title: 'Your rooms, menu or spaces', body: 'Real photos and plain descriptions, so guests know what they’re booking.' },
      { title: 'Directions and what’s nearby', body: 'A map and how to get there, easy to find on a phone.' },
      { title: 'Enquiries by WhatsApp or phone', body: 'WhatsApp and call buttons on every page, so guests ask you directly.' },
    ],
  },
  {
    id: 'other',
    group: 'other',
    label: 'Something else',
    examples: 'Any other business, including online shops',
    heading: 'Websites for your business',
    price: `${PRICE} Online shops are quoted separately.`,
    includes: [
      { title: 'A page for each service', body: 'Each thing you offer gets its own page, so Google can match it to what people search.' },
      { title: 'Your work and your reviews', body: 'Your real photos and Google reviews up front, so you look like the safe choice.' },
      { title: 'Easy to get in touch', body: 'WhatsApp, call and quote buttons on every page, easy to tap on a phone.' },
    ],
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
