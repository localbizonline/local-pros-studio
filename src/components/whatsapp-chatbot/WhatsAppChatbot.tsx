import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellRing, Briefcase, CalendarCheck, Camera, Car, ChevronDown, Church, Dumbbell, Factory, FileText,
  GraduationCap, Hammer, Home, Megaphone, MessageCircle, MessageCircleQuestion, Receipt, Scissors,
  ShieldCheck, ShoppingCart, Star, Stethoscope, Truck, Users, UtensilsCrossed, Building2,
  type LucideIcon,
} from 'lucide-react';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import { CHATBOT_TYPES, DEFAULT_TYPE, chatbotType } from './chatbotTypes';
import reviewsPhoto from '../reviews-light/img/hero-wide.webp';
import socialPhoto from '../social-light/img/hero-wide.webp';
import websitePhoto from '../web-design-light/img/team-new-enquiries.webp';
// Generated scenes (GPT Image 2.6, 20 Nov 2026), not photos of clients. One per group of types.
import church640 from './img/church-640.webp';
import church1024 from './img/church-1024.webp';
import school640 from './img/school-640.webp';
import school1024 from './img/school-1024.webp';
import medical640 from './img/medical-640.webp';
import medical1024 from './img/medical-1024.webp';
import property640 from './img/property-640.webp';
import property1024 from './img/property-1024.webp';
import trade640 from './img/trade-640.webp';
import trade1024 from './img/trade-1024.webp';
import office640 from './img/office-640.webp';
import office1024 from './img/office-1024.webp';

type Photo = { small: string; large: string; alt: string };
const PHOTOS: Record<string, Photo> = {
  church: { small: church640, large: church1024, alt: 'A church administrator smiling at a WhatsApp message in the church office' },
  school: { small: school640, large: school1024, alt: 'A school bursar reading a WhatsApp message in the school office' },
  medical: { small: medical640, large: medical1024, alt: 'A receptionist checking WhatsApp at the front desk of a practice' },
  property: { small: property640, large: property1024, alt: 'An estate manager reading a WhatsApp message at a townhouse complex' },
  trade: { small: trade640, large: trade1024, alt: 'A trade business owner checking WhatsApp beside his work bakkie' },
  office: { small: office640, large: office1024, alt: 'A business owner smiling at a WhatsApp message in her office' },
};
const PHOTO_FOR_TYPE: Record<string, string> = {
  church: 'church', school: 'school', club: 'school', medical: 'medical', salon: 'medical',
  bodycorp: 'property', property: 'property', trade: 'trade', security: 'trade', workshop: 'trade',
  supplier: 'trade', business: 'office', professional: 'office', shop: 'office', hospitality: 'office',
};

const TYPE_ICONS: Record<string, LucideIcon> = {
  trade: Hammer, security: ShieldCheck, bodycorp: Building2, property: Home, church: Church,
  school: GraduationCap, club: Dumbbell, salon: Scissors, medical: Stethoscope, professional: Briefcase,
  shop: ShoppingCart, hospitality: UtensilsCrossed, workshop: Car, supplier: Factory,
};

// An icon for each idea card, from the words in its title
const IDEA_ICONS: [RegExp, LucideIcon][] = [
  [/health/i, ShieldCheck],
  [/review/i, Star],
  [/quote/i, FileText],
  [/fee|levy|rent|invoice/i, Receipt],
  [/remind/i, BellRing],
  [/book|viewing|trial|spot/i, CalendarCheck],
  [/photo|report|document/i, Camera],
  [/notice|update|special/i, Megaphone],
  [/cart|order/i, Truck],
  [/person|team/i, Users],
  [/question|enquir|member/i, MessageCircleQuestion],
];
const ideaIcon = (title: string) => IDEA_ICONS.find(([re]) => re.test(title))?.[1] ?? MessageCircle;

// WhatsApp chatbot page (20 Nov 2026). Local Pros customers land here from the Local Pros
// WhatsApp bot after tapping "Tell me more" (?type=church&src=lp-bot&r=<code>). Local Pros Studio
// sells, sets up and supports the chatbot; the platform behind it is never named on this page.
// Unlisted (noindex) while the bot flow is tested. No prices here: we quote first.

const steps = [
  {
    title: 'Tell us what your customers ask',
    body: 'A short WhatsApp chat about the questions you get, the reminders you send and how you take bookings.',
  },
  {
    title: 'We set it up on your number',
    body: 'We write the messages, connect your WhatsApp number and test it with you before anyone sees it.',
  },
  {
    title: 'Your team steps in when needed',
    body: 'The chat handles the routine messages. Anything it can’t answer goes to the right person on your team.',
  },
];

const questions = [
  {
    question: 'Does it use our own WhatsApp number?',
    answer: 'Yes. Messages go out in your name from your business number. Your team can still reply in the same chat.',
  },
  {
    question: 'Who replies when the chatbot can’t answer?',
    answer: 'Your team. The chatbot passes the conversation on with the details it has collected, so nobody has to ask again.',
  },
  {
    question: 'Do our customers need to agree to get messages?',
    answer: 'Yes. Reminders and updates go to people who asked to hear from you, and anyone can reply STOP. We help you ask for permission.',
  },
  {
    question: 'How long does it take to set up?',
    answer: 'It depends on what you want it to do. We give you a time when we quote, and you see it working before it goes live.',
  },
  {
    question: 'What does it cost?',
    answer: 'We quote before we start. The price depends on what the chatbot does and how many customers you message.',
  },
];

const studioServices = [
  { to: '/website-design-package', image: websitePhoto, alt: 'Two people at a computer looking at new enquiries', title: 'A website', body: 'Written and built for you, so customers who find you can WhatsApp you.' },
  { to: '/reviews', image: reviewsPhoto, alt: 'A builder on site next to a phone showing his Google reviews', title: 'Google reviews', body: 'We WhatsApp your customers your Google review link, with a reminder.' },
  { to: '/social-media-posting-service', image: socialPhoto, alt: 'A builder on site next to a phone showing his Instagram posts', title: 'Social media posts', body: 'We make and publish your Facebook, Instagram and Google posts.' },
];


export default function WhatsAppChatbot() {
  // Read on the client: the page is prerendered once, without a query string
  const [typeKey, setTypeKey] = useState(DEFAULT_TYPE);
  const [fromBot, setFromBot] = useState(false);
  const [ref, setRef] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('type');
    if (key && CHATBOT_TYPES[key]) setTypeKey(key);
    setFromBot(params.get('src') === 'lp-bot');
    setRef((params.get('r') || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 12));
  }, []);

  const type = chatbotType(typeKey);
  const photo = PHOTOS[PHOTO_FOR_TYPE[typeKey] ?? 'office'];
  const message =
    WHATSAPP_MESSAGES.whatsAppChatbot.replace('{org}', type.org) + (ref ? ` (ref ${ref})` : '');
  const whatsAppUrl = whatsAppLink(message);

  const WhatsAppButton = () => (
    <a className="dd-btn dd-btn-primary" href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
      WhatsApp us
    </a>
  );

  return (
    <>
      <SiteHeader whatsAppUrl={whatsAppUrl} />
      <div className="dd dd-a wac">
        <section className="dd-hero" aria-labelledby="wac-title">
          <div className="dd-container dd-hero-grid">
            <div>
              <h1 className="dd-display" id="wac-title">
                A <span className="dd-hl">WhatsApp chatbot</span> for {type.org}
              </h1>
              <p className="dd-lede">
                {fromBot
                  ? 'The Local Pros chat you just used answered you, kept you updated and followed up on WhatsApp by itself. We set up the same kind of chat for your customers, on your own number.'
                  : 'Answer customers, send reminders and follow up on WhatsApp automatically, on your own number. Your team steps in when it’s needed.'}
              </p>
              <p className="wac-problem">{type.problem}</p>
              <div className="dd-actions"><WhatsAppButton /></div>
            </div>
            <div className="wac-hero-media">
            <img
              className="wac-hero-photo"
              src={photo.large}
              srcSet={`${photo.small} 640w, ${photo.large} 1024w`}
              sizes="(max-width: 820px) calc(100vw - 40px), 520px"
              alt={photo.alt}
              width={1024}
              height={768}
            />
            <figure className="wac-chat">
              <figcaption>
                <strong>{type.chatName}</strong>
                <span>Example WhatsApp chat</span>
              </figcaption>
              <ol aria-label={`Example chat for ${type.org}`}>
                {type.chat.map((line, index) => (
                  <li key={index} className={line.from === 'customer' ? 'wac-reply' : undefined}>
                    <p>{line.text}</p>
                    {line.button && <span className="wac-chat-button">{line.button}</span>}
                  </li>
                ))}
              </ol>
            </figure>
            </div>
          </div>
        </section>

        <section className="dd-sec wac-ideas" aria-labelledby="wac-ideas-title">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="wac-ideas-title">What it could do for {type.org}</h2>
            </div>
            <ul className="wac-idea-list">
              {type.ideas.map(({ title, body }) => {
                const Icon = ideaIcon(title);
                return (
                <li key={title}>
                  <span className="wac-icon" aria-hidden="true"><Icon size={24} /></span>
                  <h3 className="dd-h3">{title}</h3>
                  <p>{body}</p>
                </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="dd-sec" aria-labelledby="wac-how-title">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="wac-how-title">How it works</h2>
            </div>
            <ol className="dd-steps wac-steps" aria-label="How we set up your WhatsApp chatbot">
              {steps.map(({ title, body }, index) => (
                <li key={title} className="is-active">
                  <span className="dd-step-num" aria-hidden="true">{index + 1}</span>
                  <div><h3 className="dd-h3">{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="dd-sec wac-fit" aria-labelledby="wac-fit-title">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="wac-fit-title">Works well for</h2>
            </div>
            <ul className="wac-fit-list">
              {Object.entries(CHATBOT_TYPES)
                .filter(([key]) => key !== DEFAULT_TYPE)
                .map(([key, t]) => {
                  const Icon = TYPE_ICONS[key] ?? MessageCircle;
                  return (
                  <li key={key}>
                    <a
                      href={`?type=${key}`}
                      aria-current={key === typeKey ? 'true' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        setTypeKey(key);
                        window.history.replaceState(null, '', `?type=${key}${fromBot ? '&src=lp-bot' : ''}${ref ? `&r=${ref}` : ''}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {t.group}
                    </a>
                  </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <section className="dd-sec" aria-labelledby="wac-studio-title">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="wac-studio-title">Also from Local Pros Studio</h2>
            </div>
            <ul className="wac-studio-list">
              {studioServices.map(({ to, image, alt, title, body }) => (
                <li key={to}>
                  <Link to={to}>
                    <img src={image} alt={alt} width={480} height={300} loading="lazy" decoding="async" />
                    <h3 className="dd-h3">{title}</h3>
                    <p>{body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="dd-sec" aria-labelledby="wac-questions">
          <div className="dd-container">
            <div className="dd-head">
              <h2 className="dd-h2" id="wac-questions">Questions about a WhatsApp chatbot</h2>
            </div>
            <div className="dd-faq-list">
              {questions.map(({ question, answer }) => (
                <details key={question} className="dd-faq-item">
                  <summary className="wac-question">
                    {question}<ChevronDown size={20} aria-hidden="true" />
                  </summary>
                  <div className="dd-faq-a"><p>{answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="dd-sec dd-closing" aria-labelledby="wac-contact">
          <div className="dd-container dd-closing-in">
            <h2 className="dd-h2" id="wac-contact">See what it would look like for {type.org}</h2>
            <p className="dd-sub">Tell us what your customers ask most. We’ll show you what they would see.</p>
            <WhatsAppButton />
          </div>
        </section>
      </div>
      <SiteFooter faqHref="#wac-questions" whatsAppUrl={whatsAppUrl} />
    </>
  );
}
