// What the "websites for businesses like yours" chat and cards show (draft, 12 Oct 2026): the types of business
// a visitor picks from, and the websites we show for each. Real client sites are always labelled "Client site";
// the fictional ones made for the montage (design/web-montage/mock-sites) are always "Example design".
// Card pictures are the top of each site on a phone (585 x 780 webp in ./img, made from the montage screenshots).
// A site whose picture is missing is left out, so a new design shows up once its picture is added.

const PICTURES = import.meta.glob('./img/*.webp', { eager: true, import: 'default' }) as Record<string, string>;

export type Site = {
  slug: string;
  name: string;
  place: string;
  // What the business does, as a visitor would say it
  type: string;
  kind: 'client' | 'example';
  href?: string;
  // Picture only: the top of a design, with no working website behind it (no "See the full website" link)
  picture?: boolean;
  img: string;
};

const SITE_LIST: Omit<Site, 'img'>[] = [
  // Real client sites (the website page's Recent work)
  { slug: 'pavingpros', name: 'Paving Pros', place: 'Four cities', type: 'Paving contractors', kind: 'client', href: 'https://www.pavingpros.co.za/' },
  { slug: 'winelandsgas', name: 'Winelands Gas', place: 'Western Cape', type: 'Gas installations', kind: 'client', href: 'https://www.winelandsgas.co.za/' },
  { slug: 'petport', name: 'PETport', place: 'Four cities', type: 'Pet transport', kind: 'client', href: 'https://www.petport.co.za/' },
  { slug: 'bkcpet', name: 'BKC Pet', place: 'Benoni', type: 'Pet boarding and kennels', kind: 'client', href: 'https://bkcpet.co.za/' },
  { slug: 'jacuzzipros', name: 'Jacuzzi Pros', place: 'South Africa', type: 'Hot tub sales and repairs', kind: 'client', href: 'https://jacuzzipros.co.za/' },
  { slug: 'maramba', name: 'Maramba Fence & Gates', place: 'Cape Town', type: 'Fencing and gates', kind: 'client', href: 'https://maramba.co.za/' },
  // Example designs, made for the montage on 8 Oct 2026
  { slug: 'plumber', name: 'Naval Hill Plumbing', place: 'Bloemfontein', type: 'Plumber', kind: 'example' },
  { slug: 'solar', name: 'Brightveld Solar & Electrical', place: 'Centurion', type: 'Solar and electrical', kind: 'example' },
  { slug: 'pools', name: 'Saltline Pools', place: 'Umhlanga', type: 'Pool builders', kind: 'example' },
  { slug: 'pest', name: 'Marula Pest Control', place: 'Polokwane', type: 'Pest control', kind: 'example' },
  { slug: 'mechanic', name: 'Baakens Auto Works', place: 'Gqeberha', type: 'Mechanic', kind: 'example' },
  { slug: 'panel', name: 'Nahoon Panel & Paint', place: 'East London', type: 'Panel beater', kind: 'example' },
  { slug: 'vet', name: 'Bluegum Vet Clinic', place: 'Pretoria East', type: 'Vet', kind: 'example' },
  { slug: 'groomer', name: 'Woolly Dog Grooming', place: 'Fourways', type: 'Dog grooming', kind: 'example' },
  { slug: 'fitness', name: 'Saltwater Strength', place: 'Sea Point', type: 'Personal trainer', kind: 'example' },
  { slug: 'willa', name: 'Willa Nail & Lash Studio', place: 'Parkhurst', type: 'Nail and lash studio', kind: 'example' },
  { slug: 'ridgeway', name: 'Ridgeway Accounting', place: 'Claremont', type: 'Accountants', kind: 'example' },
  { slug: 'attorneys', name: 'Hollis Mkhize Attorneys', place: 'Durban North', type: 'Attorneys', kind: 'example' },
  { slug: 'estate', name: 'Papegaai Properties', place: 'Stellenbosch', type: 'Estate agents', kind: 'example' },
  { slug: 'tutor', name: 'Square One Tutoring', place: 'Rondebosch', type: 'Tutoring', kind: 'example' },
  { slug: 'driving', name: 'Lefa Driving School', place: 'Soweto', type: 'Driving school', kind: 'example' },
  { slug: 'guesthouse', name: 'Saltmarsh House', place: 'Knysna', type: 'Guest house', kind: 'example' },
  // Example designs made for this chat on 12 Oct 2026 (names filled in from the designs)
  { slug: 'electrician', name: 'Lakeside Electrical', place: 'Benoni', type: 'Electrician', kind: 'example' },
  { slug: 'builder', name: 'Kruger & Daniels Builders', place: 'Durbanville', type: 'Builders and renovations', kind: 'example' },
  { slug: 'painter', name: 'Sithole & Sons Painting', place: 'Hilton', type: 'Painting contractors', kind: 'example' },
  { slug: 'roofer', name: 'Helderberg Roofing', place: 'Somerset West', type: 'Roofing', kind: 'example' },
  { slug: 'cleaning', name: 'Neat Street Cleaning', place: 'Bedfordview', type: 'Cleaning services', kind: 'example' },
  { slug: 'garden', name: 'Wild Fig Garden Services', place: 'Hillcrest', type: 'Garden services', kind: 'example' },
  { slug: 'security', name: 'Klipview Security', place: 'Northcliff', type: 'Security company', kind: 'example' },
  { slug: 'salon', name: 'Seventh Street Hair', place: 'Linden', type: 'Hair salon', kind: 'example' },
  { slug: 'spa', name: 'Fynbos & Salt Day Spa', place: 'Hermanus', type: 'Day spa', kind: 'example' },
  { slug: 'physio', name: 'Hilton Physio & Rehab', place: 'Hilton, Pietermaritzburg', type: 'Physiotherapist', kind: 'example' },
  { slug: 'cafe', name: 'Tin Roof Kitchen', place: 'Durbanville', type: 'Restaurant and café', kind: 'example' },
  { slug: 'venue', name: 'Bergwind Barn', place: 'Magaliesberg', type: 'Wedding and events venue', kind: 'example' },
  { slug: 'shop', name: 'Karoo Hide Co.', place: 'Graaff-Reinet', type: 'Online shop', kind: 'example' },
  // Example designs made on 18 Oct 2026 for the thinner categories on the ads pages (ads-gate/AdsGate.tsx)
  { slug: 'advisor', name: 'Dube Hartley Financial Planning', place: 'Bryanston', type: 'Financial adviser', kind: 'example' },
  { slug: 'engineers', name: 'Vaalkrans Consulting Engineers', place: 'Bloemfontein', type: 'Consulting engineers', kind: 'example' },
  { slug: 'architect', name: 'Stoep Studio Architects', place: 'Woodstock', type: 'Architects', kind: 'example' },
  { slug: 'selfcatering', name: 'Three Willows Cottages', place: 'Clarens', type: 'Self-catering cottages', kind: 'example' },
  { slug: 'pizzeria', name: 'Woodpecker Pizza', place: 'Melville', type: 'Pizza restaurant', kind: 'example' },
  { slug: 'tours', name: 'Otterkloof Adventures', place: 'Storms River', type: 'Adventure tours', kind: 'example' },
  { slug: 'dentist', name: 'Palmiet Family Dental', place: 'Westville', type: 'Family dentist', kind: 'example' },
  // Picture-only example designs (18 Oct 2026): the top screen of a design, made to show more types of business
  { slug: 'plumber2', name: 'Kaaimans Plumbing', place: 'George', type: 'Plumber', kind: 'example', picture: true },
  { slug: 'electrician2', name: 'Rietspruit Electrical', place: 'Vanderbijlpark', type: 'Electrician', kind: 'example', picture: true },
  { slug: 'builder2', name: 'Rooiberg Building & Renovations', place: 'Bethlehem', type: 'Builders and renovations', kind: 'example', picture: true },
  { slug: 'painter2', name: 'Two Coats Painting', place: 'Kimberley', type: 'Painting contractors', kind: 'example', picture: true },
  { slug: 'roofer2', name: 'Letaba Roof & Waterproofing', place: 'Tzaneen', type: 'Roofing and waterproofing', kind: 'example', picture: true },
  { slug: 'cleaning2', name: 'Lemon & Linen', place: 'Sunninghill', type: 'Cleaning services', kind: 'example', picture: true },
  { slug: 'pest2', name: 'Kokerboom Pest Control', place: 'Upington', type: 'Pest control', kind: 'example', picture: true },
  { slug: 'security2', name: 'Keyline Gates & Alarms', place: 'Morningside, Durban', type: 'Gates, alarms and CCTV', kind: 'example', picture: true },
  { slug: 'fitness2', name: 'Oakline Gym', place: 'Potchefstroom', type: 'Gym and personal training', kind: 'example', picture: true },
  { slug: 'accountant2', name: 'Gwala & Botha Accountants', place: 'Makhanda', type: 'Accountants', kind: 'example', picture: true },
  { slug: 'estate2', name: 'Shorebreak Properties', place: 'Ballito', type: 'Estate agents', kind: 'example', picture: true },
  { slug: 'mechanic2', name: 'Legogote Auto', place: 'Mbombela', type: 'Mechanic', kind: 'example', picture: true },
  { slug: 'handyman', name: 'Goegap Handyman', place: 'Springbok', type: 'Handyman and small repairs', kind: 'example', picture: true },
  { slug: 'aircon', name: 'Oslo Beach Aircon', place: 'Port Shepstone', type: 'Aircon installation and servicing', kind: 'example', picture: true },
  { slug: 'glass', name: 'Kasteelberg Glass & Aluminium', place: 'Malmesbury', type: 'Glass and aluminium', kind: 'example', picture: true },
  { slug: 'tiling', name: 'Flamingo Tiling', place: 'Welkom', type: 'Tiling and flooring', kind: 'example', picture: true },
  { slug: 'kitchens', name: 'Brackendowns Kitchens', place: 'Alberton', type: 'Kitchens, cupboards and carpentry', kind: 'example', picture: true },
  { slug: 'borehole', name: 'Bosveld Boreholes & Pumps', place: 'Bela-Bela', type: 'Boreholes, pumps and water tanks', kind: 'example', picture: true },
  { slug: 'removals', name: 'Bongolo Removals', place: 'Komani (Queenstown)', type: 'Furniture removals', kind: 'example', picture: true },
  { slug: 'locksmith', name: 'Duvha Lock & Gate', place: 'eMalahleni', type: 'Locksmith, burglar bars and safety gates', kind: 'example', picture: true },
  { slug: 'carpets', name: 'Incandu Carpet Care', place: 'Newcastle', type: 'Carpet and upholstery cleaning', kind: 'example', picture: true },
  { slug: 'trees', name: 'Kosmos Tree Felling', place: 'Hartbeespoort', type: 'Tree felling and garden clean-ups', kind: 'example', picture: true },
  { slug: 'appliances', name: 'Rocklands Appliance Repairs', place: 'Mitchells Plain', type: 'Appliance repairs', kind: 'example', picture: true },
  { slug: 'rubble', name: 'Kromdraai Skips & Rubble', place: 'Krugersdorp', type: 'Rubble removal and skip hire', kind: 'example', picture: true },
  { slug: 'towing', name: 'Platberg Tow & Recovery', place: 'Harrismith', type: 'Towing and roadside assistance', kind: 'example', picture: true },
  { slug: 'tyres', name: 'Ridgeback Tyre & Alignment', place: 'Rustenburg', type: 'Tyres, wheel alignment and batteries', kind: 'example', picture: true },
  { slug: 'photographer', name: 'Amber Hour Photography', place: 'Paarl', type: 'Wedding and family photographer', kind: 'example', picture: true },
  { slug: 'creche', name: 'Kite & Crayon Creche', place: 'Kempton Park', type: 'Creche, daycare and aftercare', kind: 'example', picture: true },
  { slug: 'computers', name: 'Chip & Pixel Repairs', place: 'Mahikeng', type: 'Computer and cellphone repairs', kind: 'example', picture: true },
  { slug: 'partyhire', name: 'Red Dune Party Hire', place: 'Kuruman', type: 'Party hire', kind: 'example', picture: true },
  { slug: 'barber', name: 'Corner Chair Barbers', place: 'Mamelodi', type: 'Barber shop', kind: 'example', picture: true },
  { slug: 'optometrist', name: 'Lookout Optometrists', place: 'Secunda', type: 'Optometrist', kind: 'example', picture: true },
  { slug: 'doctor', name: 'Tall Trees Family Practice', place: 'Mthatha', type: 'Family doctor (GP)', kind: 'example', picture: true },
  { slug: 'insurance', name: 'Hex Valley Insurance Brokers', place: 'Worcester', type: 'Short-term insurance broker', kind: 'example', picture: true },
  { slug: 'itsupport', name: 'Tidewater IT Support', place: 'Richards Bay', type: 'IT support for small businesses', kind: 'example', picture: true },
  { slug: 'catering', name: 'Mopane & Clay Catering', place: 'Thohoyandou', type: 'Catering for functions and events', kind: 'example', picture: true },
  // Corporate example designs for the ads pages' Corporate category (18 Oct 2026), picture only
  { slug: 'construction', name: 'Jukskei Construction', place: 'Midrand', type: 'Commercial construction', kind: 'example', picture: true },
  { slug: 'manufacturer', name: 'Klip River Steel & Engineering', place: 'Vereeniging', type: 'Steel fabrication and engineering', kind: 'example', picture: true },
  { slug: 'logistics', name: 'Northbound Freight', place: 'Pinetown', type: 'Logistics and freight', kind: 'example', picture: true },
  { slug: 'software', name: 'Sandgrain Software', place: 'Century City', type: 'Software development', kind: 'example', picture: true },
  { slug: 'consulting', name: 'Mahlangu Carter Advisory', place: 'Rosebank', type: 'Business and management consulting', kind: 'example', picture: true },
  { slug: 'recruitment', name: 'Open Hand Recruitment', place: 'Hatfield, Pretoria', type: 'Staffing and recruitment agency', kind: 'example', picture: true },
];

export const SITES: Record<string, Site> = Object.fromEntries(
  SITE_LIST.flatMap((s) => {
    const img = PICTURES[`./img/${s.slug}.webp`];
    return img && s.name ? [[s.slug, { ...s, img }]] : [];
  }),
);

export type Sub = { id: string; label: string; plural: string; sites: string[] };
export type Group = { id: string; label: string; hint: string; subs: Sub[]; sites: string[] };

// Jeremy, 12 Oct 2026: trades and home services together, local services on their own, corporate with the
// professionals. The second question is skipped for an online shop and "something else".
export const GROUPS: Group[] = [
  {
    id: 'trades',
    label: 'Trades and home services',
    hint: 'Plumbing, building, cleaning…',
    sites: ['plumber', 'pavingpros', 'builder', 'electrician', 'winelandsgas', 'maramba', 'cleaning', 'pest', 'plumber2', 'electrician2', 'builder2', 'painter2', 'roofer2', 'cleaning2', 'pest2', 'security2', 'handyman', 'aircon', 'glass', 'tiling', 'kitchens', 'borehole', 'removals', 'locksmith', 'carpets', 'trees', 'appliances', 'rubble'],
    subs: [
      { id: 'plumbing', label: 'Plumbing', plural: 'plumbers', sites: ['plumber', 'plumber2'] },
      { id: 'electrical', label: 'Electrical', plural: 'electricians', sites: ['electrician', 'solar', 'electrician2'] },
      { id: 'building', label: 'Building and renovations', plural: 'builders', sites: ['builder', 'builder2'] },
      { id: 'painting', label: 'Painting', plural: 'painting contractors', sites: ['painter', 'painter2'] },
      { id: 'roofing', label: 'Roofing', plural: 'roofers', sites: ['roofer', 'roofer2'] },
      { id: 'solar', label: 'Solar', plural: 'solar installers', sites: ['solar', 'electrician'] },
      { id: 'paving', label: 'Paving, fencing and landscaping', plural: 'paving and outdoor businesses', sites: ['pavingpros', 'maramba', 'garden'] },
      { id: 'pools', label: 'Pools and hot tubs', plural: 'pool businesses', sites: ['pools', 'jacuzzipros'] },
      { id: 'cleaning', label: 'Cleaning', plural: 'cleaning businesses', sites: ['cleaning', 'cleaning2'] },
      { id: 'garden', label: 'Garden services', plural: 'garden services', sites: ['garden', 'pavingpros'] },
      { id: 'pest', label: 'Pest control', plural: 'pest control businesses', sites: ['pest', 'pest2'] },
      { id: 'security', label: 'Security', plural: 'security companies', sites: ['security', 'security2'] },
      { id: 'other-trade', label: 'Other', plural: 'trades and home services', sites: ['winelandsgas', 'maramba', 'plumber', 'handyman', 'aircon', 'glass', 'tiling', 'kitchens', 'borehole', 'removals', 'locksmith', 'carpets', 'trees', 'appliances', 'rubble'] },
    ],
  },
  {
    id: 'local',
    label: 'Local services',
    hint: 'Car, pet, tutoring…',
    sites: ['mechanic', 'petport', 'vet', 'panel', 'bkcpet', 'groomer', 'driving', 'tutor', 'mechanic2', 'towing', 'tyres', 'photographer', 'creche', 'computers', 'partyhire'],
    subs: [
      { id: 'car', label: 'Mechanic or panel beater', plural: 'car businesses', sites: ['mechanic', 'panel', 'mechanic2'] },
      { id: 'pet', label: 'Vet, grooming or pet care', plural: 'pet businesses', sites: ['vet', 'groomer', 'petport', 'bkcpet'] },
      { id: 'tutor', label: 'Tutoring or driving school', plural: 'tutors and driving schools', sites: ['tutor', 'driving'] },
      { id: 'other-local', label: 'Other', plural: 'local services', sites: ['mechanic', 'petport', 'driving', 'towing', 'tyres', 'photographer', 'creche', 'computers', 'partyhire'] },
    ],
  },
  {
    id: 'health',
    label: 'Health and beauty',
    hint: 'Salon, spa, physio…',
    sites: ['willa', 'salon', 'fitness', 'spa', 'physio', 'dentist', 'fitness2', 'barber', 'optometrist', 'doctor'],
    subs: [
      { id: 'salon', label: 'Hair, nails or lashes', plural: 'salons', sites: ['salon', 'willa'] },
      { id: 'spa', label: 'Spa or beauty', plural: 'spas and beauty businesses', sites: ['spa', 'willa'] },
      { id: 'fitness', label: 'Fitness', plural: 'fitness businesses', sites: ['fitness', 'fitness2'] },
      { id: 'medical', label: 'Doctor, dentist or physio', plural: 'practices', sites: ['dentist', 'physio'] },
      { id: 'other-health', label: 'Other', plural: 'health and beauty businesses', sites: ['willa', 'fitness', 'spa', 'barber', 'optometrist', 'doctor'] },
    ],
  },
  {
    id: 'professional',
    label: 'Professional and corporate',
    hint: 'Accountants, attorneys…',
    sites: ['ridgeway', 'attorneys', 'estate', 'advisor', 'engineers', 'architect', 'accountant2', 'estate2', 'insurance', 'itsupport', 'construction', 'manufacturer', 'logistics', 'software', 'consulting', 'recruitment'],
    subs: [
      { id: 'accountants', label: 'Accountants', plural: 'accountants', sites: ['ridgeway', 'accountant2'] },
      { id: 'lawyers', label: 'Attorneys', plural: 'attorneys', sites: ['attorneys'] },
      { id: 'estate', label: 'Estate agents', plural: 'estate agents', sites: ['estate', 'estate2'] },
      { id: 'corporate', label: 'Company website', plural: 'companies', sites: ['engineers', 'construction', 'logistics', 'software', 'manufacturer', 'consulting', 'recruitment', 'architect'] },
      { id: 'other-pro', label: 'Other', plural: 'professional businesses', sites: ['advisor', 'architect', 'engineers', 'insurance', 'itsupport'] },
    ],
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    hint: 'Guest house, café, venue…',
    sites: ['guesthouse', 'cafe', 'venue', 'selfcatering', 'pizzeria', 'tours', 'catering'],
    subs: [
      { id: 'guesthouse', label: 'Guest house or B&B', plural: 'guest houses', sites: ['guesthouse', 'selfcatering'] },
      { id: 'restaurant', label: 'Restaurant or café', plural: 'restaurants and cafés', sites: ['cafe', 'pizzeria'] },
      { id: 'venue', label: 'Venue', plural: 'venues', sites: ['venue'] },
      { id: 'other-hosp', label: 'Other', plural: 'hospitality businesses', sites: ['tours', 'guesthouse', 'cafe', 'catering'] },
    ],
  },
  { id: 'shop', label: 'Online shop', hint: 'Sell products online', sites: ['shop'], subs: [] },
  { id: 'other', label: 'Something else', hint: 'Tell us what you do', sites: ['plumber', 'ridgeway', 'guesthouse'], subs: [] },
];

export const groupById = (id: string) => GROUPS.find((g) => g.id === id);

// Up to three sites: the closest ones first, then others from the same group so there are always a few
export const sitesFor = (group: Group, sub?: Sub, first?: string) => {
  const slugs = [...new Set([...(first ? [first] : []), ...(sub?.sites ?? []), ...group.sites])];
  return slugs.map((s) => SITES[s]).filter(Boolean).slice(0, 3);
};

