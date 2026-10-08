// Real proof from SP2 (the social posting system), read on 8 Oct 2026 08:23 UTC, read only.
// Clients: live in SP2 admin, on an active or past-due subscription, not internal or test accounts.
// Logos and posts were downloaded from rep.localpros.co.za and resized. Update by re-running the export;
// don't edit numbers by hand. Indy Artificial Turf (US) and the duplicate CDT Attorneys WC are left out.

export const PROOF_AS_OF = '8 October 2026';

// Totals across all active clients (definitions in the export): published = live on Facebook, Instagram or Google.
export const PROOF_NUMBERS = {
  clients: 64,
  postsLast30Days: 789,
  // Of those, made by our team from scratch (tips, service posts, public holidays); the rest came from client job photos
  postsDfyLast30Days: 461,
  postsTotal: 2926,
  reviewsReceived: 835,
  reviewsAverage: 4.9,
};

const logos = import.meta.glob<string>('../../../assets/images/clients/logos/*.webp', { eager: true, import: 'default' });
const posts = import.meta.glob<string>('../../../assets/images/clients/posts/*.webp', { eager: true, import: 'default' });
const logo = (slug: string) => logos[`../../../assets/images/clients/logos/${slug}.webp`];
const post = (slug: string) => posts[`../../../assets/images/clients/posts/${slug}.webp`];
const dfyImages = import.meta.glob<string>('../../../assets/images/clients/posts-dfy/*.webp', { eager: true, import: 'default' });
const dfy = (file: string) => dfyImages[`../../../assets/images/clients/posts-dfy/${file}`];

export type Client = { slug: string; name: string; type: string; area: string; logo: string };

export const CLIENTS: Client[] = [
  { slug: 'aircons-for-africa', name: "Aircons for Africa", type: "Aircon installer", area: "Cape Town", logo: logo('aircons-for-africa') },
  { slug: 'alunite-east-rand', name: "Alunite East Rand", type: "Glass and aluminium", area: "East Rand", logo: logo('alunite-east-rand') },
  { slug: 'aquatic-pools', name: "Aquatic Pools", type: "Pool contractor", area: "Cape Town", logo: logo('aquatic-pools') },
  { slug: 'armour-fencing', name: "Armour Fencing", type: "Fencing contractor", area: "Johannesburg", logo: logo('armour-fencing') },
  { slug: 'bf-projects-pty-ltd', name: "BF Projects", type: "Plumber", area: "Johannesburg", logo: logo('bf-projects-pty-ltd') },
  { slug: 'bkc-pet', name: "BKC Pet", type: "Pet boarding", area: "Johannesburg", logo: logo('bkc-pet') },
  { slug: 'bms-contractors-corp', name: "BMS Contractors Corp", type: "Builder", area: "Centurion", logo: logo('bms-contractors-corp') },
  { slug: 'billtec-development', name: "Billtec Development", type: "Builder", area: "Johannesburg", logo: logo('billtec-development') },
  { slug: 'brano-industries-pretoria', name: "Brano Industries Pretoria", type: "Gas installer", area: "Pretoria", logo: logo('brano-industries-pretoria') },
  { slug: 'cdt-attorneys', name: "CDT Attorneys", type: "Attorneys", area: "Gauteng", logo: logo('cdt-attorneys') },
  { slug: 'csd-concrete-palisade', name: "CSD Concrete Palisade", type: "Fencing contractor", area: "Gauteng", logo: logo('csd-concrete-palisade') },
  { slug: 'cape-home-improvers', name: "Cape Home Improvers", type: "Tree felling", area: "Cape Town", logo: logo('cape-home-improvers') },
  { slug: 'critter-ridders-pest-control', name: "Critter Ridders Pest Control", type: "Pest control", area: "West Rand", logo: logo('critter-ridders-pest-control') },
  { slug: 'dish-africa-satellites', name: "Dish Africa Satellites", type: "Satellite and AV installer", area: "Gauteng", logo: logo('dish-africa-satellites') },
  { slug: 'ehl-gas', name: "EHL Gas", type: "Gas installer", area: "Bloemfontein", logo: logo('ehl-gas') },
  { slug: 'elangeni-buildings', name: "Elangeni Buildings", type: "Builder", area: "Durban", logo: logo('elangeni-buildings') },
  { slug: 'fencing-for-u', name: "Fencing For U", type: "Fencing contractor", area: "Johannesburg", logo: logo('fencing-for-u') },
  { slug: 'floorsbydesign', name: "FloorsByDesign", type: "Flooring", area: "Johannesburg", logo: logo('floorsbydesign') },
  { slug: 'fusion-plumbing', name: "Fusion Plumbing", type: "Plumber", area: "Helderberg", logo: logo('fusion-plumbing') },
  { slug: 'gfc-group', name: "GFC Group", type: "Security installer", area: "Johannesburg", logo: logo('gfc-group') },
  { slug: 'gt-tree-felling', name: "GT Tree Felling", type: "Tree felling", area: "East Rand", logo: logo('gt-tree-felling') },
  { slug: 'general-fencing-and-construction', name: "General Fencing and Construction", type: "Fencing contractor", area: "Garden Route", logo: logo('general-fencing-and-construction') },
  { slug: 'greenbay-shades-and-fencing', name: "Greenbay Shades and Fencing", type: "Fencing contractor", area: "East Rand", logo: logo('greenbay-shades-and-fencing') },
  { slug: 'halstead-law-and-mediation', name: "Halstead Law and Mediation", type: "Law and mediation", area: "Cape Town", logo: logo('halstead-law-and-mediation') },
  { slug: 'home-assist-and-garage-doors', name: "Home Assist & Garage Doors", type: "Garage doors", area: "Johannesburg", logo: logo('home-assist-and-garage-doors') },
  { slug: 'impact-emergency-electrical-and-plumbing', name: "Impact Emergency Electrical and Plumbing", type: "Emergency electrical and plumbing", area: "Pretoria", logo: logo('impact-emergency-electrical-and-plumbing') },
  { slug: 'its-all-in-the-details', name: "It's All In The Detail", type: "Event d\u00e9cor hire", area: "Johannesburg", logo: logo('its-all-in-the-details') },
  { slug: 'jj-locksmith', name: "JJ Locksmith", type: "Locksmith", area: "Johannesburg", logo: logo('jj-locksmith') },
  { slug: 'jvn-systems', name: "JVN Systems", type: "Security installer", area: "East Rand", logo: logo('jvn-systems') },
  { slug: 'jw-projects', name: "JW Projects", type: "Glass and aluminium", area: "East Rand", logo: logo('jw-projects') },
  { slug: 'johns-cleaning-rb', name: "John's Cleaning", type: "Cleaning", area: "Richards Bay", logo: logo('johns-cleaning-rb') },
  { slug: 'lukisa-construction-and-roofing', name: "Lukisa Construction and Roofing", type: "Builder", area: "Bloemfontein", logo: logo('lukisa-construction-and-roofing') },
  { slug: 'mse-plumbing', name: "MSE Plumbing", type: "Plumber", area: "Johannesburg", logo: logo('mse-plumbing') },
  { slug: 'maramba-fencing-and-gates', name: "Maramba Fencing and Gates", type: "Fencing contractor", area: "Cape Town", logo: logo('maramba-fencing-and-gates') },
  { slug: 'mcoll-construction', name: "Mcoll Construction", type: "Builder", area: "Richards Bay", logo: logo('mcoll-construction') },
  { slug: 'moon-electrical-and-consulting-services', name: "Moon Electrical and Consulting Services", type: "Electrician", area: "East Rand", logo: logo('moon-electrical-and-consulting-services') },
  { slug: 'mothetho-civils', name: "Mothetho Civils", type: "Paving and civils", area: "East Rand", logo: logo('mothetho-civils') },
  { slug: 'mr-bin', name: "Mr Bin", type: "Skip hire", area: "Johannesburg", logo: logo('mr-bin') },
  { slug: 'nph-engineering-consultants', name: "NPH Engineering Consultants", type: "Engineering consultants", area: "Centurion", logo: logo('nph-engineering-consultants') },
  { slug: 'national-fitment-solutions', name: "National Fitment Solutions", type: "Vehicle fitment", area: "Paarl", logo: logo('national-fitment-solutions') },
  { slug: 'petport', name: "PETport", type: "Pet transport", area: "Johannesburg", logo: logo('petport') },
  { slug: 'perimeter-cctv', name: "Perimeter CCTV", type: "Security installer", area: "Cape Town", logo: logo('perimeter-cctv') },
  { slug: 'pool-king', name: "Pool King", type: "Pool contractor", area: "Cape Town", logo: logo('pool-king') },
  { slug: 'qp-construction-and-roofing', name: "QP Construction & Roofing", type: "Builder", area: "Johannesburg", logo: logo('qp-construction-and-roofing') },
  { slug: 'qonstrukt', name: "Qonstrukt", type: "Waterproofing", area: "Cape Town", logo: logo('qonstrukt') },
  { slug: 'quick-skipz', name: "Quick Skipz", type: "Skip hire", area: "Cape Town", logo: logo('quick-skipz') },
  { slug: 'rj-master-plumbers', name: "R J Master Plumbers & Renovators", type: "Plumber", area: "Cape Town", logo: logo('rj-master-plumbers') },
  { slug: 'rewog-projects', name: "Rewog Projects", type: "Electrician", area: "East Rand", logo: logo('rewog-projects') },
  { slug: 'sa-gutter', name: "SA Gutter", type: "Gutters", area: "Johannesburg", logo: logo('sa-gutter') },
  { slug: 'sq-trellis', name: "SQ Trellis", type: "Security installer", area: "Johannesburg", logo: logo('sq-trellis') },
  { slug: 'secure-western-cape', name: "SeCure Western Cape", type: "Security installer", area: "Helderberg", logo: logo('secure-western-cape') },
  { slug: 'shadeports-down-to-earth-cc', name: "Shadeports Down to Earth", type: "Shadeports", area: "Cape Town", logo: logo('shadeports-down-to-earth-cc') },
  { slug: 'shinebright-solutions', name: "ShineBright Solutions", type: "Electrician", area: "Centurion", logo: logo('shinebright-solutions') },
  { slug: 'slip-technologies', name: "Slip Technologies", type: "Security installer", area: "Gqeberha", logo: logo('slip-technologies') },
  { slug: 'tns-electrical-services', name: "TNS Electrical Services", type: "Electrician", area: "Johannesburg", logo: logo('tns-electrical-services') },
  { slug: 'the-installer-sa', name: "The Installer SA", type: "Garage doors", area: "Pretoria", logo: logo('the-installer-sa') },
  { slug: 'timber-construction', name: "Timber Construction", type: "Carpentry and decking", area: "Cape Town", logo: logo('timber-construction') },
  { slug: 'top-spec-gas-installations', name: "Top Spec Gas Installations", type: "Gas installer", area: "East Rand", logo: logo('top-spec-gas-installations') },
  { slug: 'u-and-f-removals', name: "U and F Removals", type: "Skip hire", area: "Cape Town", logo: logo('u-and-f-removals') },
  { slug: 'ventatile', name: "Ventatile Trading", type: "Roof ventilation", area: "South Africa", logo: logo('ventatile') },
  { slug: 'winelands-gas-pty-ltd', name: "Winelands Gas", type: "Gas installer", area: "Helderberg", logo: logo('winelands-gas-pty-ltd') },
];

export const clientBySlug = (slug: string) => CLIENTS.find((c) => c.slug === slug);

// One recent published post per client, real job photos (most in the client's branded template)
// kind: 'ugc' = made from a job photo the client sent; 'dfy' = made by our team from scratch
export type ClientPost = { slug: string; date: string; img: string; w: number; h: number; caption: string; link?: string; kind?: 'dfy' | 'ugc'; type?: string };

export const CLIENT_POSTS: ClientPost[] = [
  { slug: 'rewog-projects', date: '2026-09-07', img: post('rewog-projects'), w: 640, h: 800, caption: "Rewog Projects completed electric fence repairs in Northmead, Benoni, last week after hail damaged the fence. The repair", link: "https://www.facebook.com/122118917145394945/posts/122118974565394945" },
  { slug: 'rj-master-plumbers', date: '2026-10-01', img: post('rj-master-plumbers'), w: 640, h: 800, caption: "R J Master Plumbers & Renovators recently completed this bathroom renovation in Montague. These additional photos offer", link: "https://www.facebook.com/1682367579688789/posts/1911900946735450" },
  { slug: 'mse-plumbing', date: '2026-10-02', img: post('mse-plumbing'), w: 640, h: 800, caption: "MSE Plumbing recently completed pressure testing in Midrand after a leak was suspected. The test assessed the plumbing s", link: "https://www.facebook.com/1563860652420628/posts/1587772783362748" },
  { slug: 'qp-construction-and-roofing', date: '2026-09-08', img: post('qp-construction-and-roofing'), w: 640, h: 800, caption: "QP Construction & Roofing is currently refurbishing a deck in Fairlands. The work includes essential structural repairs", link: "https://www.facebook.com/1468506095078515/posts/1558856472710143" },
  { slug: 'alunite-east-rand', date: '2026-08-26', img: post('alunite-east-rand'), w: 640, h: 800, caption: "Alunite East Rand recently completed a custom front door installation, designed and fitted to match the customer's exact", link: "https://www.facebook.com/1028843616624340/posts/1063691359806232" },
  { slug: 'sa-gutter', date: '2026-10-07', img: post('sa-gutter'), w: 640, h: 800, caption: "SA Gutter completed gutter work at a school in Soweto, delivering a clean, functional finish for the property. For simil", link: "https://www.facebook.com/122100587745067655/posts/122126109213067655" },
  { slug: 'cape-home-improvers', date: '2026-10-06', img: post('cape-home-improvers'), w: 640, h: 800, caption: "Cape Home Improvers recently cleared garden refuse from a Cape Town homestead and transported it to recycling facilities", link: "https://www.facebook.com/122103955167224867/posts/122135747541224867" },
  { slug: 'gt-tree-felling', date: '2026-10-06', img: post('gt-tree-felling'), w: 640, h: 800, caption: "GT Tree Felling recently completed the topping of a big thorn tree in Benoni. The tree was carefully reduced as requeste", link: "https://www.facebook.com/813102898437596/posts/1032532139828003" },
  { slug: 'armour-fencing', date: '2026-09-17', img: post('armour-fencing'), w: 640, h: 800, caption: "Armour Fencing completed a triple cantilever shadeport in Rivonia, providing covered parking for three cars. The cantile", link: "https://www.facebook.com/867739748982719/posts/1090834023339956" },
  { slug: 'billtec-development', date: '2026-09-22', img: post('billtec-development'), w: 640, h: 800, caption: "This double-storey building project in Centurion is almost complete, marking an exciting final stage in the construction", link: "https://www.facebook.com/1821624159226668/posts/1902419007813849" },
  { slug: 'winelands-gas-pty-ltd', date: '2026-09-16', img: post('winelands-gas-pty-ltd'), w: 640, h: 800, caption: "Winelands Gas Pty Ltd recently completed a gas geyser installation, followed by thorough system testing to confirm every", link: "https://www.facebook.com/1370305825152723/posts/1458930446290260" },
  { slug: 'national-fitment-solutions', date: '2026-09-25', img: post('national-fitment-solutions'), w: 640, h: 800, caption: "National Fitment Solutions completed a radio upgrade and fitment in a Land Cruiser, giving the vehicle an updated audio", link: "https://www.facebook.com/1232649602409756/posts/1399724065702308" },
  { slug: 'slip-technologies', date: '2026-09-07', img: post('slip-technologies'), w: 640, h: 800, caption: "Slip Technologies completed a new Clearview fence installation for a customer in Parsons Hill. The finished fence create", link: "https://www.facebook.com/1425459559368021/posts/1595856555661653" },
  { slug: 'mr-bin', date: '2026-08-29', img: post('mr-bin'), w: 640, h: 800, caption: "Mr Bin recently delivered and positioned a skip bin for a renovation project in Johannesburg, giving the team a practica", link: "https://www.facebook.com/1861147708166543/posts/1994135664867746" },
  { slug: 'tns-electrical-services', date: '2026-08-17', img: post('tns-electrical-services'), w: 640, h: 800, caption: "TNS Electrical Services recently repaired an electric fence in Centurion that had stopped holding charge due to broken w", link: "https://www.facebook.com/122232683516936300/posts/122252342090936300" },
  { slug: 'pool-king', date: '2026-08-10', img: post('pool-king'), w: 640, h: 800, caption: "Pool King recently refurbished an old fibreglass shell for a long-standing client in Welgelegen, Cape Town. The restored", link: "https://www.facebook.com/1293840916256553/posts/1342579158049395" },
  { slug: 'shinebright-solutions', date: '2026-09-23', img: post('shinebright-solutions'), w: 640, h: 800, caption: "ShineBright Solutions installed a 16L Dewhot Constant Temperature Gas Geyser in partnership with a plumbing company in R", link: "https://www.facebook.com/122294062718024457/posts/122320226006024457" },
  { slug: 'bf-projects-pty-ltd', date: '2026-08-25', img: post('bf-projects-pty-ltd'), w: 640, h: 800, caption: "Blue Fuel (BF Projects) has completed a bulk gas installation at Fleurhof Mall, supplying three tenant shops from a sing", link: "https://www.facebook.com/122118913982734703/posts/122123878142734703" },
  { slug: 'top-spec-gas-installations', date: '2026-09-11', img: post('top-spec-gas-installations'), w: 640, h: 800, caption: "Top Spec Gas Installations completed the installation of a new 16L Cadac gas geyser for a client in Springs. The unit is", link: "https://www.facebook.com/122248009748084191/posts/122280732542084191" },
  { slug: 'qonstrukt', date: '2026-09-01', img: post('qonstrukt'), w: 640, h: 800, caption: "Qonstrukt is renovating a home exterior in Vredehoek, Cape Town, with repairs to the main building wall and the installa", link: "https://www.facebook.com/978531024923554/posts/1063931903050132" },
  { slug: 'bms-contractors-corp', date: '2026-10-01', img: post('bms-contractors-corp'), w: 640, h: 800, caption: "Before: visible water ingress and wall damage. After: the affected area was restored with a solution focused on preventi", link: "https://www.facebook.com/885319543873212/posts/1090262920045539" },
  { slug: 'the-installer-sa', date: '2026-09-10', img: post('the-installer-sa'), w: 640, h: 800, caption: "The Installer SA recently completed a Megamaster Tarragon 16kW fireplace installation, paired with a Megamaster 150mm fl", link: "https://www.facebook.com/1614937070181142/posts/1791618269179687" },
  { slug: 'ventatile', date: '2026-10-07', img: post('ventatile'), w: 640, h: 800, caption: "Ventatile Trading (Pty) Ltd recently fitted Universal roof vents to a tiled roof in Somerset West. The vents improve air", link: "https://www.facebook.com/122327374184232753/posts/122333024504232753" },
  { slug: 'ehl-gas', date: '2026-09-17', img: post('ehl-gas'), w: 640, h: 800, caption: "EHL Gas recently completed an in-cupboard gas installation in Uitsig, Bloemfontein. The installation reflects our focus", link: "https://www.facebook.com/122192585042445648/posts/122203318136445648" },
  { slug: 'csd-concrete-palisade', date: '2026-09-21', img: post('csd-concrete-palisade'), w: 640, h: 800, caption: "CSD Concrete Palisade recently completed a 1.8m concrete palisade installation in Marble Hall. The completed boundary pr", link: "https://www.facebook.com/1476811094470922/posts/1505538361598195" },
  { slug: 'dish-africa-satellites', date: '2026-09-17', img: post('dish-africa-satellites'), w: 640, h: 800, caption: "Dish Africa Satellites recently completed a multi-point home-entertainment installation at Benmore Gardens in Sandton. T", link: "https://www.facebook.com/122190846626853921/posts/122191799834853921" },
  { slug: 'jw-projects', date: '2026-09-29', img: post('jw-projects'), w: 640, h: 800, caption: "JW Projects recently completed a residential aluminium window installation in Benoni, giving the property a clean, durab", link: "https://www.facebook.com/1579256447535790/posts/1702752328519534" },
  { slug: 'home-assist-and-garage-doors', date: '2026-09-14', img: post('home-assist-and-garage-doors'), w: 640, h: 800, caption: "A recent Fourways job required two different Centurion motors: one for a roll-up garage door and another for a sectional", link: "https://www.facebook.com/122248290056092626/posts/122255535296092626" },
  { slug: 'secure-western-cape', date: '2026-09-15', img: post('secure-western-cape'), w: 640, h: 800, caption: "SeCure Western Cape installed a retractable security gate across a double doorway at a property in Woodstock. It provide", link: "https://www.facebook.com/1252247997068461/posts/1380811447545448" },
  { slug: 'sq-trellis', date: '2026-09-22', img: post('sq-trellis'), w: 640, h: 800, caption: "SQ Trellis recently installed an SQHigh Security Expandable Trellis gate at a business premises in Honeydew Industrial", link: "https://www.facebook.com/1474886961326866/posts/1516814427134119" },
  { slug: 'maramba-fencing-and-gates', date: '2026-09-15', img: post('maramba-fencing-and-gates'), w: 640, h: 800, caption: "Before: a damaged 2.4 m-high Clearview fence panel weakened the perimeter. After replacement, the new high-security pane", link: "https://www.facebook.com/1198483099106193/posts/1400286092259225" },
  { slug: 'bkc-pet', date: '2026-09-26', img: post('bkc-pet'), w: 600, h: 800, caption: "Take a look through these lovely photos of Bubbles, Muffin and Bamboo enjoying their stay in BKC Pet\u2019s secure, quiet cat", link: "https://www.facebook.com/1479788744171831/posts/1518814833602555" },
];

// Google reviews that came in for these clients while they were on the programme (SP2's 'Reviews received'),
// from the first one counted. Only clients with a long, steady record; not proof each review came from a request.
export const CLIENT_REVIEW_RESULTS = [
  { slug: 'mr-bin', reviews: 84, average: 4.9, since: 'March 2026', posts: 100 },
  { slug: 'petport', reviews: 63, average: 4.7, since: 'May 2026', posts: 42 },
  { slug: 'top-spec-gas-installations', reviews: 45, average: 5.0, since: 'December 2025', posts: 45 },
  { slug: 'critter-ridders-pest-control', reviews: 39, average: 4.9, since: 'February 2026', posts: 36 },
  { slug: 'fusion-plumbing', reviews: 33, average: 4.9, since: 'March 2026', posts: 39 },
  { slug: 'rewog-projects', reviews: 30, average: 4.9, since: 'June 2026', posts: 44 },
  { slug: 'aircons-for-africa', reviews: 28, average: 5, since: 'January 2026', posts: 51 },
  { slug: 'gt-tree-felling', reviews: 24, average: 5.0, since: 'January 2026', posts: 133 },
  { slug: 'sa-gutter', reviews: 23, average: 5.0, since: 'April 2026', posts: 62 },
  { slug: 'perimeter-cctv', reviews: 20, average: 5.0, since: 'May 2026', posts: 78 },
];

// Done-for-you posts (made by our team, no photo from the client), picked for the post wall
export const DFY_POSTS: ClientPost[] = [
  { slug: 'rj-master-plumbers', date: '2026-09-30', img: dfy('rj-master-plumbers-1.webp'), w: 640, h: 800, caption: "Low water pressure is one of the most common calls we get from Cape Town homeowners. The first thing worth checking is w", link: "https://www.facebook.com/1682367579688789/posts/1910610416864503", kind: 'dfy', type: 'Tip post' },
  { slug: 'petport', date: '2026-10-07', img: dfy('petport-1.webp'), w: 640, h: 794, caption: "Planning to relocate internationally with your fur-baby? The paperwork is just as important as the plane ticket \u2014 and so", link: "https://www.facebook.com/1498325455656575/posts/1554931349995985", kind: 'dfy', type: 'Tip post' },
  { slug: 'aircons-for-africa', date: '2026-09-26', img: dfy('aircons-for-africa-1.webp'), w: 640, h: 794, caption: "Cape Town is warming up, and so are the electricity bills. The good news is that a few small habits make a genuine diffe", link: "https://www.facebook.com/1593892212128971/posts/1827468915437965", kind: 'dfy', type: 'Tip post' },
  { slug: 'gt-tree-felling', date: '2026-09-19', img: dfy('gt-tree-felling-1.webp'), w: 640, h: 800, caption: "Storm season can turn a struggling tree into a serious hazard. Before the weather turns, GT Tree Felling recommends ever", link: "https://www.facebook.com/813102898437596/posts/1016213938126490", kind: 'dfy', type: 'Tip post' },
  { slug: 'armour-fencing', date: '2026-10-02', img: dfy('armour-fencing-1.webp'), w: 640, h: 800, caption: "Armour Fencing provides shadeport repair services for damaged cover and related structure concerns. An assessment helps", link: "https://www.facebook.com/867739748982719/posts/1103846972038661", kind: 'dfy', type: 'Service post' },
  { slug: 'mr-bin', date: '2026-10-06', img: dfy('mr-bin-1.webp'), w: 640, h: 800, caption: "Mr Bin provides approachable, family-operated service across Johannesburg and surrounding areas. Our coverage includes R", link: "https://www.facebook.com/1861147708166543/posts/2030303914584254", kind: 'dfy', type: 'Service post' },
  { slug: 'shinebright-solutions', date: '2026-10-08', img: dfy('shinebright-solutions-1.webp'), w: 640, h: 794, caption: "Planning to cook and entertain more this season? ShineBright Solutions installs gas hobs and stoves for homes and busine", link: "https://www.facebook.com/122294062718024457/posts/122322609818024457", kind: 'dfy', type: 'Service post' },
  { slug: 'jw-projects', date: '2026-10-06', img: dfy('jw-projects-1.webp'), w: 640, h: 800, caption: "Need a little more privacy around glass? JW Projects offers window frosting and sandblast-vinyl options for residential", link: "https://www.facebook.com/1579256447535790/posts/1710360281092072", kind: 'dfy', type: 'Service post' },
  { slug: 'cdt-attorneys', date: '2026-09-24', img: dfy('cdt-attorneys-1.webp'), w: 640, h: 800, caption: "Happy Heritage Day from CDT Attorneys. Celebrating the traditions and communities that make South Africa home", link: "https://www.facebook.com/122118930999304818/posts/122120973417304818", kind: 'dfy', type: 'Public holiday post' },
];

// The post wall: mostly done-for-you, with a few made from client job photos, every one a different business
const ugc = (slug: string): ClientPost => ({ ...(CLIENT_POSTS.find((p) => p.slug === slug) as ClientPost), kind: 'ugc', type: 'Job photo post' });
const d = (slug: string) => DFY_POSTS.find((p) => p.slug === slug) as ClientPost;
export const WALL_POSTS: ClientPost[] = [
  d('rj-master-plumbers'),
  d('petport'),
  ugc('winelands-gas-pty-ltd'),
  d('armour-fencing'),
  d('aircons-for-africa'),
  ugc('maramba-fencing-and-gates'),
  d('mr-bin'),
  d('cdt-attorneys'),
  ugc('alunite-east-rand'),
  d('gt-tree-felling'),
  d('shinebright-solutions'),
  d('jw-projects'),
];
