import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Check, ChevronRight, SendHorizontal, X } from 'lucide-react';
import { GROUPS, SITES, groupById, type Group, type Site, type Sub } from './catalogue';
import { MAPS_KEY, searchGoogle, type Business } from '../demo-popup/googleSearch';
import { notifyStarted, useLeadRecord } from '../demo-popup/DemoPopup';
import { capture } from '../../analytics';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { OPEN_CHAT_EVENT, type ChatPage, type ChatPlan } from '../demo-popup/openSiteChat';
import '../design-directions/directions.css';
import './web-examples.css';
// A real done-for-you client post, for the homepage pop-up's social media picture
import socialPost from '../../assets/images/clients/posts-dfy/rj-master-plumbers-1.webp';

// "Websites for businesses like yours" chat (draft, 12 Oct 2026, Jeremy). Replaces "find your business on Google"
// as the first step. Jeremy's pick (mock-up E in design/examples-chat-mockups/): a full-screen chat with a 4-step
// progress bar, and no examples or prices in the chat itself ("the point is to WhatsApp them"):
//   1. type of business (7 rows)  2. the closest type  3. name + WhatsApp number ("Send me the designs": the lead is
//   saved here)  4. "what's your business called?" (Google check behind the scenes; "Is it one of these?" only for
//   close matches), then "On its way. Ashley from our team will WhatsApp you…" (Tyran for the package).
// The team sends the examples by hand (alert to Jeremy and Ashley, netlify/functions/demo-lead.mts, offer "examples").
// One Airtable record per chat: created at step 3, then updated with the business (the Google box rule).
// Every step is counted in PostHog (examples_chat_step) to see where people leave.
// The same chat runs on the homepage draft (variant "home", 12 Oct 2026, handed over by the homepage session):
// one extra step, "What would help most?" (reviews, posts, website or all three), and "our work" wording.

export const OPEN_EXAMPLES_EVENT = 'lps:open-examples-chat';

// start: from a price button. They've already chosen, so the chat skips the questions and samples and goes
// straight to "Where should we WhatsApp you?" (Jeremy, 12 Oct 2026: "more direct, get them started")
export type StartPlan = 'website' | 'package';
type OpenOptions = { group?: string; sub?: string; site?: string; from: string; start?: StartPlan };
const START = {
  website: { intro: 'Great, let’s get your website started. 🚀', done: 'to get your website started. Most websites are live in 7 days.' },
  package: {
    intro: 'Great, let’s get your R2,500 a month package started: your website, social media posts and Google review management.',
    done: 'to get your package started.',
  },
};
export const openExamplesChat = (opts: OpenOptions) => window.dispatchEvent(new CustomEvent(OPEN_EXAMPLES_EVENT, { detail: opts }));

type Stage = 'group' | 'sub' | 'other' | 'need' | 'services' | 'contact' | 'name' | 'checking' | 'matches' | 'done';
const ORDER: Stage[] = ['group', 'sub', 'other', 'need', 'services', 'contact', 'name', 'checking', 'matches', 'done'];
const reached = (stage: Stage, at: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(at);
// The progress bar: one segment per question; a page's extra question ("What would help most?" on the homepage,
// "How many services?" with the instant price) adds one
const STEP_OF: Record<Stage, string> = { group: 'group', sub: 'type', other: 'type', need: 'extra', services: 'extra', contact: 'contact', name: 'name', checking: 'name', matches: 'name', done: 'done' };
const progressSteps = (extra: boolean) => (extra ? ['group', 'type', 'extra', 'contact', 'name'] : ['group', 'type', 'contact', 'name']);

// The instant price (website page draft, Jeremy 12 Oct 2026). Shown in the chat only, never as a public table.
// Website prices exclude hosting: R290 a month for hosting and updates, first charged one month after the deposit (Jeremy, 16 Oct 2026).
const SERVICES = [
  { id: '1-3', label: '1 to 3' },
  { id: '4+', label: '4 or more' },
];
const priceOf = (g: Group, services: string | null) =>
  g.id === 'shop' ? 'from R30,000' : g.id === 'professional' || services === '4+' ? 'R9,900' : 'R6,500';

// The homepage's extra question; plan is what the lead is filed under, done is what the team sends
type Need = { id: string; label: string; plan: ChatPlan; done: (plural: string) => string };
const NEEDS: Need[] = [
  { id: 'reviews', label: 'More Google reviews', plan: 'reviews', done: (p) => `how we get ${p} more Google reviews` },
  { id: 'social', label: 'Social media posts', plan: 'social', done: (p) => `social media posts for ${p}` },
  { id: 'website', label: 'A new website', plan: 'website', done: (p) => `popular website designs for ${p}` },
  { id: 'package', label: 'All three, R2,500 a month', plan: 'package', done: (p) => `our work for ${p} (reviews, posts and websites)` },
];

// Everything that differs between the pages, in one place (wording included)
export type ChatVariant = 'website' | 'home' | 'website-price' | 'reviews' | 'social';
const VARIANTS = {
  website: {
    page: 'web-design' as ChatPage,
    plan: 'website' as ChatPlan,
    extra: null as null | 'need' | 'services',
    showPrice: false,
    price: null as null | ((g: Group, services: string | null) => string),
    priceNote: (_g: Group) => '',
    packageLine: null as ReactNode,
    onTheWay: (_plural: string) => '',
    doneTail: 'and our prices',
    intro: 'Hi 👋 Let’s find popular website designs for your industry.',
    promise: (plural: string, g: Group) =>
      g.id === 'shop' ? 'Great. We’ll WhatsApp you 3 popular online shop designs, and how we price them.' : `Great. We’ll WhatsApp you 3 popular designs for ${plural}, with our prices.`,
    nameAsk: 'Last one, so we can make the designs fit: ',
    send: 'Send me the designs',
    small: 'We only use your number to send you the designs and prices.',
    done: (plural: string) => `3 popular designs for ${plural}`,
    // The hero already asks the question, so the pop-up waits until they've scrolled past it (or 20 seconds)
    nudge: { wait: 'after-hero', title: 'See popular designs for your industry', text: 'Tap your industry and we’ll WhatsApp you 3 popular designs, with prices.', button: 'Show me popular designs', label: 'Popular designs for your industry' },
  },
  home: {
    page: 'home' as ChatPage,
    plan: 'package' as ChatPlan,
    extra: 'need' as null | 'need' | 'services',
    showPrice: false,
    price: null as null | ((g: Group, services: string | null) => string),
    priceNote: (_g: Group) => '',
    packageLine: null as ReactNode,
    onTheWay: (_plural: string) => '',
    doneTail: 'and our prices',
    intro: 'Hi 👋 Let’s show you our work for businesses like yours.',
    promise: (plural: string) => `Great. We’ll WhatsApp you our work for ${plural}, with our prices.`,
    nameAsk: 'Last one: ',
    send: 'Send me examples',
    small: 'We only use your number to send you the examples and prices.',
    done: (plural: string, need?: Need | null) => (need ? need.done(plural) : `our work for ${plural}`),
    // The homepage hero asks the question too (12 Oct 2026), so the pop-up waits until they've scrolled past it
    nudge: { wait: 'after-hero', title: 'See what’s popular for businesses like yours', text: 'Tap your type of business and we’ll WhatsApp you examples of our work, with prices.', button: 'Show me what’s popular', label: 'Our work for businesses like yours' },
  },
  // The website design page with the instant price (live 12 Oct 2026): one more question,
  // "How many services do you offer?", and their price on screen straight after their number
  'website-price': {
    page: 'web-design' as ChatPage,
    plan: 'website' as ChatPlan,
    extra: 'services' as null | 'need' | 'services',
    showPrice: true,
    price: priceOf as null | ((g: Group, services: string | null) => string),
    priceNote: (g: Group) =>
      g.id === 'shop'
        ? 'Online shop, quoted for what you sell. Hosting is quoted with your shop.'
        : 'Your website, once-off. Live in 7 days. Then R290 a month for hosting and updates.',
    packageLine: (
      <>
        Or get your website <strong>included</strong> in our <strong>R2,500 a month</strong> package, with social media posts and Google review management (12-month plan).
      </>
    ) as ReactNode,
    onTheWay: (plural: string) => `3 popular designs for ${plural} are on their way to your WhatsApp.`,
    doneTail: 'and your price',
    intro: 'Hi 👋 Let’s get your price and popular designs for your industry.',
    promise: (plural: string, g: Group) =>
      g.id === 'shop' ? 'Great, your price is ready. We’ll also WhatsApp you 3 popular online shop designs.' : `Great, your price is ready. We’ll also WhatsApp you 3 popular designs for ${plural}.`,
    nameAsk: 'Last one, so we can make the designs fit: ',
    send: 'Show my price',
    small: 'We only use your number to send you the designs and your price.',
    done: (plural: string) => `3 popular designs for ${plural}`,
    nudge: { wait: 'after-hero', title: 'See your price and popular designs', text: 'Tap your industry: your price shows in seconds, and we WhatsApp you 3 popular designs.', button: 'Get my price', label: 'Your price and popular designs' },
  },
  // Google reviews page (12 Oct 2026): the same picker and chat, with the reviews price
  reviews: {
    page: 'reviews' as ChatPage,
    plan: 'reviews' as ChatPlan,
    extra: null as null | 'need' | 'services',
    showPrice: true,
    price: (() => 'R1,200 a month') as null | ((g: Group, services: string | null) => string),
    priceNote: (_g: Group) => 'Month to month. Send us your customer’s name and number, and we WhatsApp them your review link.',
    packageLine: (
      <>
        Or get Google reviews, social media posts <strong>and a website</strong> in our <strong>R2,500 a month</strong> package (12-month plan).
      </>
    ) as ReactNode,
    onTheWay: (plural: string) => `How we get ${plural} more Google reviews is on its way to your WhatsApp.`,
    doneTail: 'and your price',
    intro: 'Hi 👋 Let’s get your price and show you how we get businesses like yours more Google reviews.',
    promise: (plural: string) => `Great, your price is ready. We’ll also WhatsApp you how we get ${plural} more Google reviews.`,
    nameAsk: 'Last one, so we can look you up on Google: ',
    send: 'Show my price',
    small: 'We only use your number to send you your price and examples.',
    done: (plural: string) => `how we get ${plural} more Google reviews`,
    nudge: { wait: 'after-hero', title: 'More Google reviews for your industry', text: 'Tap your industry: your price shows in seconds, and we WhatsApp you how we do it for businesses like yours.', button: 'Get my price', label: 'Google reviews for your industry' },
  },
  // Social media posting page (12 Oct 2026)
  social: {
    page: 'social' as ChatPage,
    plan: 'social' as ChatPlan,
    extra: null as null | 'need' | 'services',
    showPrice: true,
    price: (() => 'R2,000 a month') as null | ((g: Group, services: string | null) => string),
    priceNote: (_g: Group) => 'Month to month. We make your posts and publish them on Facebook, Instagram and Google.',
    packageLine: (
      <>
        Or get social media posts, Google reviews <strong>and a website</strong> in our <strong>R2,500 a month</strong> package (12-month plan).
      </>
    ) as ReactNode,
    onTheWay: (plural: string) => `Examples of posts for ${plural} are on their way to your WhatsApp.`,
    doneTail: 'and your price',
    intro: 'Hi 👋 Let’s get your price and examples of posts for your industry.',
    promise: (plural: string) => `Great, your price is ready. We’ll also WhatsApp you examples of posts for ${plural}.`,
    nameAsk: 'Last one, so we can look you up: ',
    send: 'Show my price',
    small: 'We only use your number to send you your price and examples.',
    done: (plural: string) => `examples of posts for ${plural}`,
    nudge: { wait: 'after-hero', title: 'Social media posts for your industry', text: 'Tap your industry: your price shows in seconds, and we WhatsApp you examples of posts for businesses like yours.', button: 'Get my price', label: 'Social media posts for your industry' },
  },
};
type VariantConfig = (typeof VARIANTS)[ChatVariant];

// Until they give their business name, the Airtable record is named after them (the server knows this wording)
const PLACEHOLDER = 'business name to follow';

// Close matches only: most of the words they typed are in the Google name ("Thabos Plumbing" finds "Thabo's Plumbing")
const STOP = new Set(['pty', 'ltd', 'cc', 'the', 'and', 'co', 'za', 'inc', 'sa']);
const words = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w));
const isClose = (typed: string, found: string) => {
  const t = words(typed);
  const f = words(found);
  if (!t.length) return false;
  const hits = t.filter((w) => f.some((x) => x === w || (Math.min(x.length, w.length) > 3 && (x.startsWith(w) || w.startsWith(x))))).length;
  return hits / t.length >= 0.6;
};
// "12 Main Rd, Durbanville, Cape Town, 7550, South Africa" -> "Durbanville, Cape Town"
const townOf = (address: string) =>
  address
    .split(',')
    .map((p) => p.trim().replace(/^\d{4}\s+/, ''))
    .filter((p) => p && !/south africa/i.test(p) && !/^\d+$/.test(p))
    .slice(-2)
    .join(', ');

// South African cellphone, as 0XXXXXXXXX (same check as the server)
const mobileOf = (value: string) => {
  let d = value.replace(/\D/g, '');
  if (d.startsWith('27') && d.length === 11) d = `0${d.slice(2)}`;
  else if (d.length === 9) d = `0${d}`;
  return /^0[6-8]\d{8}$/.test(d) ? d : '';
};

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Bot({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return <div className={`wx-bot${strong ? ' is-strong' : ''}`}>{children}</div>;
}
function Me({ children }: { children: ReactNode }) {
  return <div className="wx-me">{children}</div>;
}
function Typing({ label }: { label?: string }) {
  return (
    <div className="wx-bot wx-typing" aria-live="polite">
      <span className="wx-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {label && <span className="wx-typing-label">{label}</span>}
    </div>
  );
}

export function SiteCard({ site, small = false }: { site: Site; small?: boolean }) {
  return (
    <figure className={`wx-site${small ? ' is-small' : ''}`}>
      <div className="wx-site-shot">
        <img src={site.img} alt={`${site.kind === 'client' ? 'Website we built for' : 'Example website design for'} ${site.name}, ${site.type.toLowerCase()}`} width={585} height={780} loading="lazy" />
        <span className={`wx-tag ${site.kind === 'client' ? 'is-client' : ''}`}>{site.kind === 'client' ? 'Client site' : 'Example design'}</span>
      </div>
      <figcaption>
        <strong>{site.name}</strong>
        <span>
          {site.type} · {site.place}
        </span>
      </figcaption>
    </figure>
  );
}

// The card that slides up from the bottom (Cosmo Pools' "Not sure where to start?"), once per visit, and never
// once they've opened a chat or tapped WhatsApp themselves
const GoogleG = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

// Three pictures fanned out: websites on the website page; a website, a client's social post and our Google
// rating on the homepage (one per service)
function NudgeFan({ variant }: { variant: ChatVariant }) {
  if (variant !== 'home')
    return (
      <div className="wx-fan" aria-hidden="true">
        {['plumber', 'willa', 'pavingpros'].map((slug) => SITES[slug] && <img key={slug} src={SITES[slug].img} alt="" width={585} height={780} />)}
      </div>
    );
  return (
    <div className="wx-fan" aria-hidden="true">
      {SITES.plumber && <img src={SITES.plumber.img} alt="" width={585} height={780} />}
      <img src={socialPost} alt="" width={640} height={800} />
      <span className="wx-fan-card">
        <GoogleG />
        <strong>4.7</strong>
        <span className="wx-fan-stars">★★★★★</span>
        <span>1,400+ reviews</span>
      </span>
    </div>
  );
}

// What counts as them scrolling, not the page
const INPUT_EVENTS = ['wheel', 'touchmove', 'keydown', 'pointerdown'] as const;

function Nudge({ variant, blocked, onOpen }: { variant: ChatVariant; blocked: boolean; onOpen: () => void }) {
  const cfg = VARIANTS[variant];
  const key = `lps_examples_nudge_${variant}`;
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const blockedRef = useRef(blocked);
  blockedRef.current = blocked;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {
      /* storage blocked: show it once per page load */
    }
    let done = false;
    const trigger = () => {
      if (done || blockedRef.current) return;
      done = true;
      try {
        sessionStorage.setItem(key, '1');
      } catch {
        /* ignore */
      }
      setShow(true);
      capture('examples_nudge', { action: 'shown', page: cfg.page });
      cleanup();
    };
    // Arrived on a section (a Google Ads sitelink such as #pricing, 13 Oct 2026): no pop-up until they've scrolled
    // half a screen themselves, so the page's own jump to the section doesn't count and they see what they asked for
    const fromLink = !!window.location.hash;
    let ownScrollFrom: number | null = null;
    const onInput = () => {
      if (ownScrollFrom === null) ownScrollFrom = window.scrollY;
    };
    const onScroll = () => {
      if (fromLink && (ownScrollFrom === null || Math.abs(window.scrollY - ownScrollFrom) < window.innerHeight / 2)) return;
      if (cfg.nudge.wait === 'timer') {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY / max > 0.35) trigger();
        return;
      }
      const pick = document.querySelector('.wx-pick');
      if (pick ? pick.getBoundingClientRect().bottom < 0 : window.scrollY > window.innerHeight) trigger();
    };
    // They opened the site chat (a hero button) or tapped WhatsApp: no pop-up this visit
    const stop = () => {
      blockedRef.current = true;
      setShow(false);
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href*="wa.me/"]')) stop();
    };
    const timer = fromLink ? 0 : window.setTimeout(trigger, cfg.nudge.wait === 'timer' ? 8000 : 20000);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (fromLink) for (const type of INPUT_EVENTS) window.addEventListener(type, onInput, { passive: true });
    window.addEventListener(OPEN_CHAT_EVENT, stop);
    document.addEventListener('click', onClick, true);
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      for (const type of INPUT_EVENTS) window.removeEventListener(type, onInput);
    };
    return () => {
      cleanup();
      window.removeEventListener(OPEN_CHAT_EVENT, stop);
      document.removeEventListener('click', onClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (blocked && show) setShow(false);
  }, [blocked, show]);

  if (!show) return null;
  const hide = (action: 'dismissed' | 'opened') => {
    capture('examples_nudge', { action, page: cfg.page });
    if (action === 'opened') {
      setShow(false);
      onOpen();
      return;
    }
    if (reducedMotion()) return setShow(false);
    setClosing(true);
    window.setTimeout(() => setShow(false), 200);
  };

  return (
    <aside className={`wx-nudge${closing ? ' is-closing' : ''}`} aria-label={cfg.nudge.label}>
      <button type="button" className="wx-icon-btn wx-nudge-x" aria-label="Close" onClick={() => hide('dismissed')}>
        <X size={18} aria-hidden="true" />
      </button>
      <NudgeFan variant={variant} />
      <div className="wx-nudge-body">
        <p className="wx-nudge-eyebrow">Not sure where to start?</p>
        <p className="wx-nudge-title">{cfg.nudge.title}</p>
        <p className="wx-nudge-text">{cfg.nudge.text}</p>
        <button type="button" className="dd-btn dd-btn-primary wx-nudge-btn" onClick={() => hide('opened')}>
          {cfg.nudge.button}
        </button>
        <button type="button" className="wx-nudge-no" onClick={() => hide('dismissed')}>
          No thanks, I’ll look around
        </button>
      </div>
    </aside>
  );
}

// Two small website pictures for a type of business, on its row
const thumbsFor = (g: Group) => g.sites.map((s) => SITES[s]).filter(Boolean).slice(0, 2);

// The seven types of business as rows with two small website pictures each. One piece for the chat's first
// step and the page heroes (ExamplesSections.tsx IndustryPicker), so both always look and read the same.
export function IndustryRows({ onPick }: { onPick: (g: Group) => void }) {
  return (
    <div className="wx-rows">
      {GROUPS.map((g) => {
        const thumbs = thumbsFor(g);
        return (
          <button key={g.id} type="button" className="wx-row-btn" data-pick-group={g.id} onClick={() => onPick(g)}>
            {g.id !== 'other' && thumbs.length > 0 && (
              <span className="wx-thumbs" aria-hidden="true">
                {thumbs.map((t: Site) => (
                  <img key={t.slug} src={t.img} alt="" width={585} height={780} loading="lazy" />
                ))}
              </span>
            )}
            <span className="wx-row-text">
              <strong>{g.label}</strong>
              {g.id !== 'other' && <span>{g.hint.replace('…', '')}</span>}
            </span>
            <ChevronRight size={20} aria-hidden="true" className="wx-chev" />
          </button>
        );
      })}
    </div>
  );
}

// page: tags the leads by door when one variant runs on two (the ads copy /go/website-design sends 'website-design')
// nudge: false leaves out the "Not sure where to start?" pop-up, for pages selling one fixed package (/7-day-website)
export default function ExamplesChat({ variant = 'website', page, nudge = true }: { variant?: ChatVariant; page?: ChatPage; nudge?: boolean }) {
  const cfg: VariantConfig = page ? { ...VARIANTS[variant], page } : VARIANTS[variant];
  const step = (name: string, p: Record<string, string | undefined> = {}) => capture('examples_chat_step', { step: name, page: cfg.page, ...p });
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState<Need | null>(null);
  const [services, setServices] = useState<string | null>(null);
  const [everOpened, setEverOpened] = useState(false);
  const [stage, setStage] = useState<Stage>('group');
  const [typing, setTyping] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [sub, setSub] = useState<Sub | null>(null);
  const [otherText, setOtherText] = useState('');
  const [draft, setDraft] = useState('');
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [bizName, setBizName] = useState('');
  const [matches, setMatches] = useState<Business[]>([]);
  const [picked, setPicked] = useState<Business | 'none' | null>(null);
  const [from, setFrom] = useState('');
  const [start, setStart] = useState<StartPlan | null>(null);
  // Who WhatsApps them: Ashley handles website, reviews and social leads from her number (Jeremy, 15 Oct 2026), Tyran the package
  const who = (start ?? need?.plan ?? cfg.plan) === 'package' ? 'Tyran' : 'Ashley';
  const logRef = useRef<HTMLDivElement>(null);
  const saveLead = useLeadRecord(cfg.page, cfg.plan, 'examples');

  const businessType = group ? [group.label, sub?.label ?? otherText].filter(Boolean).join(' – ') : '';
  const props = () => ({ group: group?.id, sub: sub?.id, need: need?.id, from });
  const afterType = (g: Group | null): Stage => (cfg.extra === 'need' ? 'need' : cfg.extra === 'services' && g?.id !== 'shop' ? 'services' : 'contact');
  const plural = sub?.plural ?? (group?.id === 'shop' ? 'online shops' : group?.id === 'other' ? 'businesses like yours' : group?.label.toLowerCase());
  const firstName = contactName.trim().split(' ')[0];
  const shownNumber = mobile.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');

  // A short "typing" pause before each new bot line, so it reads like a conversation
  const advance = (next: Stage) => {
    setStage(next);
    setDraft('');
    if (reducedMotion()) return;
    setTyping(true);
    window.setTimeout(() => setTyping(false), 650);
  };

  const chooseGroup = (g: Group, how = from) => {
    setGroup(g);
    setSub(null);
    step('group', { group: g.id, from: how });
    notifyStarted(cfg.page, cfg.plan, 'examples');
    if (g.subs.length) advance('sub');
    else if (g.id === 'other') advance('other');
    else advance(afterType(g));
  };
  const chooseSub = (s: Sub) => {
    setSub(s);
    step('sub', { group: group?.id, sub: s.id, from });
    advance(afterType(group));
  };
  const chooseServices = (id: string) => {
    setServices(id);
    step('services', { group: group?.id, sub: sub?.id, services: id, from });
    advance('contact');
  };
  const chooseNeed = (n: Need) => {
    setNeed(n);
    step('need', { group: group?.id, sub: sub?.id, need: n.id, from });
    advance('contact');
  };

  // Opened from a button, a card or the slide-up card; a card opens straight at its type of business
  useEffect(() => {
    const onOpen = (e: Event) => {
      const o = (e as CustomEvent<OpenOptions>).detail;
      setOpen(true);
      setEverOpened(true);
      setFrom(o.from);
      step('opened', { from: o.from, group: o.group, sub: o.sub, start: o.start });
      // A price button: straight to their number, unless they're already part-way through
      if (o.start && (stage === 'group' || stage === 'done')) {
        setStart(o.start);
        setGroup(null);
        setSub(null);
        notifyStarted(cfg.page, o.start, 'examples');
        return advance('contact');
      }
      const g = o.group ? groupById(o.group) : undefined;
      // Already part-way through: carry on where they were
      if (!g || stage !== 'group') return;
      const s = o.sub ? g.subs.find((x) => x.id === o.sub) : undefined;
      if (!s) return chooseGroup(g, o.from);
      setGroup(g);
      setSub(s);
      step('group', { group: g.id, from: o.from });
      step('sub', { group: g.id, sub: s.id, from: o.from });
      notifyStarted(cfg.page, cfg.plan, 'examples');
      advance(afterType(g));
    };
    window.addEventListener(OPEN_EXAMPLES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EXAMPLES_EVENT, onOpen);
  });

  // A tap on the hero's picker before the code loaded (index.html remembers it): open the chat at that type now
  useEffect(() => {
    const w = window as Window & { __lpsChatReady?: boolean; __lpsEarlyPick?: string };
    w.__lpsChatReady = true;
    const early = w.__lpsEarlyPick;
    if (!early) return;
    delete w.__lpsEarlyPick;
    window.setTimeout(() => openExamplesChat({ group: early, from: 'hero-early' }), 0);
  }, []);

  // Keep the newest lines in view, but never scroll past the start of the new question: on a short screen
  // the first step (greeting, question and seven rows) is taller than the chat, so it starts at the top and
  // they scroll down, as on any page (Jeremy, 12 Oct 2026: it used to open at the bottom)
  useEffect(() => {
    const el = logRef.current;
    if (!el || !open) return;
    window.requestAnimationFrame(() => {
      const bottom = el.scrollHeight - el.clientHeight;
      const answers = el.querySelectorAll<HTMLElement>('.wx-me');
      const lastAnswer = answers[answers.length - 1];
      const top = stage === 'group' || !lastAnswer ? (stage === 'group' ? 0 : bottom) : Math.min(bottom, lastAnswer.offsetTop - 12);
      el.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
    });
  }, [stage, typing, open, matches.length, error]);

  // Escape closes; the page behind doesn't scroll while the chat is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Back, until they've left their number
  const canGoBack = !start && (stage === 'sub' || stage === 'other' || stage === 'need' || stage === 'services' || stage === 'contact');
  const goBack = () => {
    step('back', { ...props(), at: stage });
    setError('');
    if (stage === 'contact' && cfg.extra === 'need') {
      setNeed(null);
      return setStage('need');
    }
    if (stage === 'contact' && cfg.extra === 'services' && group?.id !== 'shop') {
      setServices(null);
      return setStage('services');
    }
    const fromType = stage === 'contact' || stage === 'need' || stage === 'services';
    if (fromType && group?.subs.length) {
      setSub(null);
      return setStage('sub');
    }
    if (fromType && group?.id === 'other') return setStage('other');
    setGroup(null);
    setSub(null);
    setOtherText('');
    setStage('group');
  };

  const submitOther = (e: FormEvent) => {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    setOtherText(t.slice(0, 80));
    step('other_typed', { group: group?.id, from });
    advance(afterType(group));
  };

  // Step 3: where to WhatsApp them. The lead is saved here, named after them until they give the business name.
  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    const m = mobileOf(number);
    if (!m) {
      setError('Enter a South African cellphone number, like 082 123 4567.');
      return;
    }
    setError('');
    setMobile(m);
    const who = contactName.trim().slice(0, 60);
    saveLead(['number', 'requested'], {
      mode: 'manual',
      name: `${who || 'Website visitor'} (${PLACEHOLDER})`,
      businessType,
      contactName: who,
      whatsApp: m,
      whatsAppFrom: 'typed',
      ...(need ? { need: need.id, plan: need.plan } : {}),
      ...(cfg.price && group ? { services: services ?? undefined, price: cfg.price(group, services) } : {}),
      ...(start ? { start: true, plan: start } : {}),
    });
    step('requested', props());
    advance('name');
  };

  const lead = () => ({
    businessType,
    contactName: contactName.trim().slice(0, 60),
    whatsApp: mobile,
    whatsAppFrom: 'typed',
    ...(need ? { need: need.id, plan: need.plan } : {}),
    ...(cfg.price && group ? { services: services ?? undefined, price: cfg.price(group, services) } : {}),
    ...(start ? { start: true, plan: start } : {}),
  });
  const finishTyped = (name: string) => {
    saveLead(['typed', 'number', 'requested'], { mode: 'manual', name, ...lead() });
    advance('done');
  };

  // Step 4: their business name. Look it up on Google; only ask "Is it one of these?" when something is close.
  const submitName = async (e: FormEvent) => {
    e.preventDefault();
    const name = draft.trim();
    if (name.length < 2) return;
    setBizName(name);
    setDraft('');
    step('name_entered', props());
    setStage('checking');
    let close: Business[] = [];
    if (MAPS_KEY) {
      try {
        const found = await Promise.race([searchGoogle(name), new Promise<Business[]>((_, reject) => window.setTimeout(() => reject(new Error('timeout')), 6000))]);
        close = found.filter((b) => isClose(name, b.name)).slice(0, 3);
      } catch {
        close = [];
      }
    }
    setMatches(close);
    step(close.length ? 'matches_shown' : 'no_matches', props());
    if (close.length) advance('matches');
    else finishTyped(name);
  };

  const pickMatch = (b: Business | 'none') => {
    setPicked(b);
    if (b === 'none') {
      step('none_of_these', props());
      return finishTyped(bizName);
    }
    step('match_picked', props());
    saveLead(['picked', 'number', 'requested'], { mode: 'google', ...b, ...lead() });
    advance('done');
  };

  useEffect(() => {
    if (stage === 'done') step('done', props());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const latest = (s: Stage) => stage === s && typing;
  const stepsShown = start ? ['contact', 'name'] : progressSteps(!!cfg.extra);
  const segments = stepsShown.length;
  const progress = stage === 'done' ? segments : stepsShown.indexOf(STEP_OF[stage]) + 1;

  // Its own token scope, so it looks the same on any page (the homepage isn't inside .dd)
  return (
    <div className="dd dd-a wx-page wx-root">
      {nudge && <Nudge variant={variant} blocked={everOpened} onOpen={() => openExamplesChat({ from: 'nudge' })} />}
      {open && <div className="wx-backdrop" onClick={() => setOpen(false)} />}
      {open && (
        <div className="wx-sheet" role="dialog" aria-modal="true" aria-label="Websites for businesses like yours">
          <div className="wx-head">
            {canGoBack && (
              <button type="button" className="wx-icon-btn" aria-label="Back" onClick={goBack}>
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
            )}
            <span className="wx-avatar" aria-hidden="true">
              LP
            </span>
            <div className="wx-head-text">
              <p className="wx-head-title">Local Pros Studio</p>
              {/* Our Google rating on every step (Jeremy, 12 Oct 2026); the reviews are on the Local Pros profile */}
              <p className="wx-head-sub wx-head-rating">
                <GoogleG size={14} />
                <strong>4.7</strong>
                <span className="wx-stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>1,400+ reviews</span>
              </p>
            </div>
            <button type="button" className="wx-icon-btn wx-x" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="wx-progress" role="progressbar" aria-label="Steps" aria-valuemin={1} aria-valuemax={segments} aria-valuenow={Math.min(progress, segments)}>
            {Array.from({ length: segments }, (_, i) => i + 1).map((n) => (
              <i key={n} className={n <= progress ? 'is-on' : ''} />
            ))}
          </div>

          <div className="wx-log" ref={logRef}>
            <div className="wx-log-start" />
            {!start && (
              <>
                <Bot>{cfg.intro}</Bot>
                <Bot strong>What type of business do you run?</Bot>
                {stage === 'group' ? <IndustryRows onPick={(g) => chooseGroup(g)} /> : group && <Me>{group.label}</Me>}
              </>
            )}

            {group && group.subs.length > 0 && reached(stage, 'sub') && (
              <>
                {latest('sub') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot strong>Which is closest?</Bot>
                    {stage === 'sub' ? (
                      <div className="wx-chips">
                        {group.subs.map((s) => (
                          <button key={s.id} type="button" className="wx-chip" onClick={() => chooseSub(s)}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      sub && <Me>{sub.label}</Me>
                    )}
                  </>
                )}
              </>
            )}

            {group?.id === 'other' && reached(stage, 'other') && (
              <>{latest('other') ? <Typing /> : <>{<Bot strong>What does your business do?</Bot>}{stage !== 'other' && <Me>{otherText}</Me>}</>}</>
            )}

            {cfg.extra === 'services' && group && group.id !== 'shop' && reached(stage, 'services') && (
              <>
                {latest('services') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot strong>How many services do you offer?</Bot>
                    {stage === 'services' ? (
                      <div className="wx-chips">
                        {SERVICES.map((o) => (
                          <button key={o.id} type="button" className="wx-chip" onClick={() => chooseServices(o.id)}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      services && <Me>{SERVICES.find((o) => o.id === services)?.label}</Me>
                    )}
                  </>
                )}
              </>
            )}

            {cfg.extra === 'need' && group && reached(stage, 'need') && (
              <>
                {latest('need') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot strong>What would help most?</Bot>
                    {stage === 'need' ? (
                      <div className="wx-chips">
                        {NEEDS.map((n) => (
                          <button key={n.id} type="button" className="wx-chip" onClick={() => chooseNeed(n)}>
                            {n.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      need && <Me>{need.label}</Me>
                    )}
                  </>
                )}
              </>
            )}

            {(group || start) && reached(stage, 'contact') && (
              <>
                {latest('contact') ? (
                  <Typing />
                ) : (
                  <>
                    {start ? <Bot>{START[start].intro}</Bot> : group && <Bot>{cfg.promise(plural ?? 'businesses like yours', group)}</Bot>}
                    <Bot strong>{start ? 'Where should we WhatsApp you?' : 'Where should we WhatsApp them?'}</Bot>
                    {stage !== 'contact' && <Me>{[contactName.trim(), shownNumber].filter(Boolean).join(' · ')}</Me>}
                  </>
                )}
              </>
            )}

            {reached(stage, 'name') && (
              <>
                {latest('name') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot>Thanks{firstName ? ` ${firstName}` : ''}, got it. 👍</Bot>
                    {cfg.showPrice && cfg.price && group && (
                      <>
                        <div className="wx-bot wx-price">
                          <span className="wx-price-label">Your price</span>
                          <strong className="wx-price-amount">{cfg.price(group, services)}</strong>
                          <span className="wx-price-note">{cfg.priceNote(group)}</span>
                        </div>
                        {cfg.packageLine && <Bot>{cfg.packageLine}</Bot>}
                        <Bot>{cfg.onTheWay(plural ?? 'businesses like yours')}</Bot>
                      </>
                    )}
                    <Bot>
                      {start ? 'Last one: ' : cfg.nameAsk}
                      <strong>what’s your business called?</strong>
                    </Bot>
                    {bizName && stage !== 'name' && <Me>{bizName}</Me>}
                  </>
                )}
              </>
            )}

            {stage === 'checking' && <Typing label="Looking you up on Google…" />}

            {matches.length > 0 && reached(stage, 'matches') && (
              <>
                {latest('matches') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot strong>Is it one of these?</Bot>
                    {stage === 'matches' ? (
                      <div className="wx-matches">
                        {matches.map((b) => (
                          <button key={b.placeId} type="button" className="wx-match" onClick={() => pickMatch(b)}>
                            <strong>{b.name}</strong>
                            <span>{[townOf(b.address), b.phone].filter(Boolean).join(' · ') || 'On Google'}</span>
                          </button>
                        ))}
                        <button type="button" className="wx-match is-none" onClick={() => pickMatch('none')}>
                          None of these
                        </button>
                      </div>
                    ) : (
                      <Me>{picked && picked !== 'none' ? [picked.name, townOf(picked.address).split(',')[0]].filter(Boolean).join(' · ') : 'None of these'}</Me>
                    )}
                  </>
                )}
              </>
            )}

            {stage === 'done' &&
              (typing ? (
                <Typing />
              ) : (
                <>
                  <div className="wx-bot wx-done">
                    <span className="wx-done-tick" aria-hidden="true">
                      <Check size={20} strokeWidth={3} />
                    </span>
                    <span>
                      <strong>On its way</strong>
                      {start
                        ? `${who} from our team will WhatsApp you on ${shownNumber} ${START[start].done}`
                        : `${who} from our team will WhatsApp you on ${shownNumber} with ${cfg.done(plural ?? 'businesses like yours', need)} ${cfg.doneTail}.`}
                    </span>
                  </div>
                  <Bot>
                    Rather talk now?{' '}
                    <a href={whatsAppLink(WHATSAPP_MESSAGES.webDesign)} target="_blank" rel="noopener noreferrer" className="wdl-inline-link" onClick={() => step('whatsapp_now', props())}>
                      WhatsApp us
                    </a>
                  </Bot>
                </>
              ))}
          </div>

          {/* What they type goes at the bottom, like a messaging app */}
          {stage === 'contact' && !typing && (
            <form className="wx-foot wx-contact" onSubmit={submitContact} noValidate>
              <label className="wx-label">
                Your name
                <input className="wx-input" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Thabo" autoComplete="given-name" />
              </label>
              <label className="wx-label">
                WhatsApp number
                <span className="wx-phone">
                  <span className="wx-cc" aria-hidden="true">
                    🇿🇦 +27
                  </span>
                  <input
                    className="wx-input"
                    value={number}
                    onChange={(e) => {
                      setNumber(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="082 123 4567"
                    inputMode="tel"
                    autoComplete="tel-national"
                    aria-invalid={!!error}
                    aria-describedby={error ? 'wx-num-error' : undefined}
                  />
                </span>
              </label>
              {error && (
                <p className="wx-error" id="wx-num-error">
                  {error}
                </p>
              )}
              <button type="submit" className="dd-btn dd-btn-primary wx-send">
                {start ? 'Get started' : cfg.send}
              </button>
              <p className="wx-small">{start ? `${who} from our team WhatsApps you to get started.` : cfg.small}</p>
            </form>
          )}
          {(stage === 'name' || stage === 'other') && !typing && (
            <form className="wx-foot wx-composer" onSubmit={stage === 'name' ? submitName : submitOther}>
              <input
                className="wx-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={stage === 'name' ? 'Your business name' : 'What your business does'}
                aria-label={stage === 'name' ? 'Your business name' : 'What your business does'}
                autoComplete={stage === 'name' ? 'organization' : 'off'}
                enterKeyHint="send"
              />
              <button type="submit" className="wx-send-round" aria-label="Send">
                <SendHorizontal size={20} aria-hidden="true" />
              </button>
            </form>
          )}
          {stage === 'done' && !typing && (
            <div className="wx-foot">
              <button type="button" className="dd-btn dd-btn-secondary wx-back-page" onClick={() => setOpen(false)}>
                Back to the page
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
