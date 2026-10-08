import '../../design-directions/directions.css';
import './servicerows.css';
import websiteImage from '../../../assets/images/portfolio/petport-desktop.webp';
import petportPhone from '../../../assets/images/portfolio/petport-mobile.webp';
import marambaPhone from '../../../assets/images/portfolio/maramba-mobile.webp';
import winelandsPhone from '../../../assets/images/portfolio/winelandsgas-mobile.webp';
import bkcPhone from '../../../assets/images/portfolio/bkcpet-mobile.webp';
import jacuzziPhone from '../../../assets/images/portfolio/jacuzzipros-mobile.webp';
import pavingPhone from '../../../assets/images/portfolio/pavingpros-mobile.webp';
import socialImage from '../../../assets/images/social-posting/Closeup phone using post creator.webp';
import reviewsImage from '../../../assets/images/Reviews/review from WhatsApp to google review side by side.webp';

// "What we do" as a classic services section (7 Oct 2026, Jeremy's request): one row per service
// with a photo, a heading and a short blurb. The photo side swaps each row on wider screens; on a
// phone each row stacks, photo first. Used on the join page; change it here only.
// websiteVisual and tone were added on 7 Oct 2026 to compare ways of showing more than one site
// and of setting the section apart: 'fan' (three phones), 'devices' (laptop plus phone), 'grid'
// (six client sites on phones); backgrounds white, cream, grey or dark.

// Same order as the hero (8 Oct 2026): reviews, social media, website.
const SERVICES = [
  {
    label: 'Google review collection',
    title: 'New 5-star reviews after every job',
    body: 'After each job, your customer gets a WhatsApp asking for a Google review, with a one-tap link and a friendly reminder if they forget.',
    image: reviewsImage,
    alt: 'A WhatsApp review request on a phone, and the 5-star Google review it leads to',
    fit: 'center',
  },
  {
    label: 'Social media posting',
    title: 'A Facebook and Instagram page that stays busy',
    body: 'Send us a photo of a job on WhatsApp. We write the post and publish it on Facebook, Instagram and Google, every week.',
    image: socialImage,
    alt: 'A business owner sending a job photo from his phone',
    fit: 'center',
  },
  {
    label: 'Website design',
    title: 'A website that gets you calls',
    body: 'We build you a new website, or refresh the one you have, so it works on a phone and shows your services, your areas and a tap-to-call button. It is live in 5 to 7 working days.',
    image: websiteImage,
    alt: 'The PETport website, a pet transport business site we built',
    fit: 'top',
  },
];

export type WebsiteVisual = 'single' | 'fan' | 'devices' | 'grid';
export type SectionTone = 'white' | 'cream' | 'grey' | 'dark';

const SITES = [
  { name: 'PETport', img: petportPhone },
  { name: 'Maramba Fence & Gates', img: marambaPhone },
  { name: 'Winelands Gas', img: winelandsPhone },
  { name: 'BKC Pet Boarding', img: bkcPhone },
  { name: 'Jacuzzi Pros', img: jacuzziPhone },
  { name: 'Paving Pros', img: pavingPhone },
];

const Phone = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
  <span className={`svr-phone ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
  </span>
);

function WebsiteVisualBlock({ visual }: { visual: WebsiteVisual }) {
  if (visual === 'fan') {
    return (
      <div className="svr-media is-fan">
        <Phone src={SITES[1].img} alt="The Maramba Fence & Gates website on a phone" className="is-left" />
        <Phone src={SITES[2].img} alt="The Winelands Gas website on a phone" className="is-right" />
        <Phone src={SITES[0].img} alt="The PETport website on a phone" className="is-mid" />
      </div>
    );
  }
  if (visual === 'devices') {
    return (
      <div className="svr-media is-devices">
        <span className="svr-desktop">
          <img src={websiteImage} alt="The PETport website on a computer" loading="lazy" />
        </span>
        <Phone src={petportPhone} alt="The same PETport website on a phone" className="is-front" />
      </div>
    );
  }
  if (visual === 'grid') {
    return (
      <ul className="svr-media is-grid" aria-label="Websites we have built">
        {SITES.map((s) => (
          <li key={s.name}>
            <Phone src={s.img} alt={`The ${s.name} website on a phone`} />
            <span>{s.name}</span>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function ServiceRows({ websiteVisual = 'single', tone = 'white' }: { websiteVisual?: WebsiteVisual; tone?: SectionTone }) {
  return (
    <section className={`dd dd-a dd-sec svr is-${tone}${tone === 'dark' ? ' dd-demo' : ''}`}>
      <div className="dd-container">
        <div className="dd-head">
          <p className="dd-eyebrow">What we do</p>
          <h2 className="dd-h2">Three things we take care of for you</h2>
        </div>
        <ul className="svr-list">
          {SERVICES.map((s) => (
            <li key={s.label} className="svr-row">
              {s.label === 'Website design' && websiteVisual !== 'single' ? (
                <WebsiteVisualBlock visual={websiteVisual} />
              ) : (
                <div className="svr-media">
                  <img src={s.image} alt={s.alt} loading="lazy" className={`is-${s.fit}`} />
                </div>
              )}
              <div className="svr-copy">
                <p className="svr-label">{s.label}</p>
                <h3 className="svr-title">{s.title}</h3>
                <p className="svr-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
