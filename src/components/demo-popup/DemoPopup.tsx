import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Star, X } from 'lucide-react';

import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { isTeamDevice } from '../../teamDevice';
import { capture } from '../../analytics';
import { chatState, OPEN_CHAT_EVENT, type ChatPage, type ChatPlan } from './openSiteChat';

// The site chat (8 Oct 2026). Looks like a WhatsApp chat: we "type" the opening lines, the visitor
// finds their business on Google inside the chat (same Google search as the localpros.co.za/join/apply
// form, ../localpros-join/src/scripts/apply-form.ts), and WhatsApp opens with their Google details.
// Not on Google: business name plus Facebook page or website. Every lead is also saved to Airtable.
// - /website-design: opens by itself once per visit with the free demo offer (Jeremy's pick, version C).
// - Other pages (join, homepage): opens only from a button via openSiteChat(plan), with the plan picked.
// Render <SiteChat page="…" /> once per page.

type Business = {
  placeId: string;
  name: string;
  address: string;
  hiddenAddress: boolean;
  mapsUri: string;
  category: string;
  website: string;
  phone: string;
  rating: number | null;
  reviewCount: number | null;
};

const SEEN_KEY = 'lps_demo_popup_seen';
// Public browser key, the same one the join form uses; its website restrictions decide where it works
const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();

// How each plan is said: in the chat, in the WhatsApp message (the Airtable wording is in demo-lead.mts)
const PLAN: Record<ChatPlan, { chat: string; whatsApp: string }> = {
  package: { chat: 'the full package', whatsApp: 'the full package' },
  reviews: { chat: 'your Google reviews', whatsApp: 'Google reviews' },
  social: { chat: 'your social media posts', whatsApp: 'social media posting' },
  website: { chat: 'your new website', whatsApp: 'a new website' },
};

// Quick questions after we have their number, one tap each (Jeremy, 8 Oct 2026): a feel for how they would
// pay and how ready they are. Nothing is binding; the answers go to Airtable, the alert and the WhatsApp message.
// Prices are the website page's (src/components/web-design-light). Never mention a posting frequency.
type QuestionId = 'pay' | 'site' | 'when';
const QUESTIONS: Record<QuestionId, { ask: string; options: { value: string; label: string }[] }> = {
  pay: {
    ask: 'Which way of paying suits you best? Just so we know: it doesn’t lock you in.',
    options: [
      { value: 'once', label: 'Once-off: R9,900' },
      { value: 'rent', label: 'Rent to own: R450 a month' },
      { value: 'package', label: 'Free with reviews + social posts (R2,500 a month)' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  site: {
    ask: 'Do you have a website now?',
    options: [
      { value: 'none', label: 'No' },
      { value: 'needs-work', label: 'Yes, but it needs work' },
      { value: 'fine', label: 'Yes, and it’s fine' },
    ],
  },
  when: {
    ask: 'When would you like to get going?',
    options: [
      { value: 'asap', label: 'As soon as possible' },
      { value: 'month', label: 'In the next month' },
      { value: 'looking', label: 'Just looking for now' },
    ],
  },
};
// The free demo and the website plan ask all three; the package skips paying; reviews or social only ask when
const questionsFor = (plan?: ChatPlan): QuestionId[] =>
  !plan || plan === 'website' ? ['pay', 'site', 'when'] : plan === 'package' ? ['site', 'when'] : ['when'];
type Answers = Partial<Record<QuestionId, string>>;
const answerLabel = (id: QuestionId, value?: string) => QUESTIONS[id].options.find((o) => o.value === value)?.label || '';

// Each page keeps the WhatsApp opening the bot and the weekly scoreboard already count (src/whatsapp.ts)
const OPENING: Record<ChatPage, string> = {
  'website-design': WHATSAPP_MESSAGES.googleAds,
  'web-design': WHATSAPP_MESSAGES.webDesign,
  home: WHATSAPP_MESSAGES.site,
  join: WHATSAPP_MESSAGES.site,
};

// With a plan: "start the plan you picked". Without one: the free demo offer (/website-design)
const chatLines = (plan?: ChatPlan) =>
  plan
    ? [`Hi 👋 Let’s get ${PLAN[plan].chat} started.`, 'Find your business on Google below and tap send. We’ll reply on WhatsApp to set it up.']
    : [
        'Hi 👋 Want to see what your new website could look like?',
        'Find your business on Google below. We’ll build a free demo from your listing and WhatsApp it to you.',
      ];

const chatMessage = (page: ChatPage, plan: ChatPlan | undefined, business: Business | null, name: string, link: string, whatsApp: string, answers: Answers) =>
  [
    `${OPENING[page]}. ${plan ? `I’d like to start ${PLAN[plan].whatsApp}.` : 'Please send me a free demo.'}`,
    ...(business
      ? [
          `Business: ${business.name}`,
          business.category && `Type: ${business.category}`,
          business.phone && `Phone: ${business.phone}`,
          business.website && `Website: ${business.website}`,
          business.mapsUri && `Google: ${cleanMapsLink(business.mapsUri)}`,
        ]
      : [name.trim() && `Business name: ${name.trim()}`, link.trim() && `Facebook or website: ${link.trim()}`]),
    whatsApp && `My WhatsApp: ${showMobile(whatsApp)}`,
    answers.pay && `Paying: ${answerLabel('pay', answers.pay)}`,
    answers.site && `Website now: ${answerLabel('site', answers.site)}`,
    answers.when && `When: ${answerLabel('when', answers.when)}`,
  ]
    .filter(Boolean)
    .join('\n');

// Google's link carries tracking extras; the listing id (cid) is all the team needs to open it
const cleanMapsLink = (uri: string) => {
  try {
    const cid = new URL(uri).searchParams.get('cid');
    return cid ? `https://maps.google.com/?cid=${cid}` : uri;
  } catch {
    return uri;
  }
};

// South African number we can WhatsApp: 0XXXXXXXXX starting 06, 07 or 08 (same check as the join form)
const normaliseMobile = (value: string) => {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('27') && digits.length === 11) digits = `0${digits.slice(2)}`;
  else if (digits.length === 9) digits = `0${digits}`;
  return /^0[6-8]\d{8}$/.test(digits) ? digits : '';
};
const showMobile = (m: string) => `${m.slice(0, 3)} ${m.slice(3, 6)} ${m.slice(6)}`;

// Google files many service businesses under a bare "Services"; that says nothing, so leave it out
const usefulCategory = (label: string) => (/^services?$/i.test(label.trim()) ? '' : label.trim());

// "https://www.example.co.za/contact" → "example.co.za"
const shortWebsite = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');

// Talks to netlify/functions/demo-lead.mts, which saves leads to Airtable (Sales CRM, Source = Website)
// and WhatsApps Jeremy and Ashley through SP2. Team devices (src/teamDevice.ts) send nothing.
const postLead = (body: Record<string, unknown>) => {
  if (isTeamDevice()) return;
  fetch('/api/demo-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    /* the WhatsApp message still carries the details */
  });
};

// One Airtable record per chat (Jeremy, 8 Oct 2026): created the moment they pick their business on Google
// (or send typed details), then updated as they confirm, change business or press send, so a visitor who
// never presses send is still on the list. The server hands back the record id and a pass for the updates.
type LeadStep = 'picked' | 'confirmed' | 'number' | 'typed' | 'answered' | 'sent';
const useLeadRecord = (page: ChatPage, plan?: ChatPlan) => {
  const record = useRef<{ id: string; pass: string } | null>(null);
  const steps = useRef<LeadStep[]>([]);
  // One request at a time, so an update never overtakes the create it depends on
  const queue = useRef<Promise<void>>(Promise.resolve());
  return (newSteps: LeadStep[], lead: Record<string, unknown>) => {
    if (isTeamDevice()) return;
    // Picking a business (again) or typing details starts the story over: earlier steps were for another listing
    const restart = newSteps.includes('picked') || (newSteps.includes('typed') && !steps.current.includes('typed'));
    steps.current = restart ? [...newSteps] : [...new Set([...steps.current, ...newSteps])];
    const body = { kind: 'lead', page, plan, steps: steps.current, ...lead };
    queue.current = queue.current.then(async () => {
      try {
        const res = await fetch('/api/demo-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record.current ? { ...body, recordId: record.current.id, pass: record.current.pass } : body),
          keepalive: true,
        });
        const data = (await res.json()) as { record?: { id: string; pass: string } | null };
        if (!record.current && data.record?.id && data.record.pass) record.current = data.record;
      } catch {
        /* the WhatsApp message still carries the details */
      }
    });
  };
};

// "Someone started using the chat" alert: the first time a visitor taps into it, once per page per visit
const STARTED_KEY = 'lps_chat_started';
const startedThisLoad = new Set<string>();
const notifyStarted = (page: ChatPage, plan?: ChatPlan) => {
  try {
    const seen = JSON.parse(sessionStorage.getItem(STARTED_KEY) || '[]') as string[];
    if (seen.includes(page)) return;
    sessionStorage.setItem(STARTED_KEY, JSON.stringify([...seen, page]));
  } catch {
    /* storage blocked: still alert, at most once per page load */
    if (startedThisLoad.has(page)) return;
  }
  startedThisLoad.add(page);
  capture('site_chat_started', { page, plan: plan || 'demo' });
  postLead({ kind: 'started', page, plan });
};

const track = (label: string) => window.gtag?.('event', 'cta_click', { event_category: 'engagement', event_label: label, value: 1 });

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Same loader as the join form: Maps JavaScript, weekly channel, loaded only when needed
let mapsPromise: Promise<void> | null = null;
const loadMaps = () => {
  const w = window as any;
  if (w.google?.maps?.importLibrary) return Promise.resolve();
  mapsPromise ??= new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('timeout')), 20000);
    w.initDemoPopupMaps = () => {
      window.clearTimeout(timer);
      resolve();
    };
    const script = document.createElement('script');
    script.onerror = () => {
      window.clearTimeout(timer);
      mapsPromise = null;
      reject(new Error('load'));
    };
    const params = new URLSearchParams({ key: MAPS_KEY, loading: 'async', callback: 'initDemoPopupMaps', v: 'weekly' });
    script.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    script.async = true;
    document.head.append(script);
  });
  return mapsPromise;
};

// Opens once per visit: after `delayMs`, or sooner once the visitor is 40% down the page
const useOpenOnce = (enabled: boolean, delayMs: number, force: boolean, show: () => void) => {
  const showRef = useRef(show);
  showRef.current = show;
  useEffect(() => {
    if (!enabled) return;
    if (!force) {
      try {
        if (sessionStorage.getItem(SEEN_KEY)) return;
      } catch {
        /* storage blocked: still show it */
      }
    }
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      showRef.current();
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* ignore */
      }
    };
    const timer = window.setTimeout(show, delayMs);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.4) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled, delayMs, force]);
};

// Types the offer line by line, with a "typing…" pause before each bubble, like a real chat.
// instant: show the lines at once (opened from a search box, where the visitor expects to type straight away)
const useTypedLines = (lines: string[], active: boolean, instant = false) => {
  const [typed, setTyped] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  // Starts the first time the chat opens; closing and reopening keeps the lines already shown
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (active) setGo(true);
  }, [active]);
  useEffect(() => {
    if (!go) return;
    if (instant || prefersReducedMotion()) {
      setTyped(lines);
      return;
    }
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => window.setTimeout(r, ms));
    (async () => {
      for (let i = 0; i < lines.length; i++) {
        setTyping(true);
        await wait(i === 0 ? 900 : 700);
        if (cancelled) return;
        setTyping(false);
        setTyped((prev) => [...prev, '']);
        for (let c = 1; c <= lines[i].length; c++) {
          await wait(lines[i][c - 1] === ' ' ? 12 : 22);
          if (cancelled) return;
          setTyped((prev) => [...prev.slice(0, i), lines[i].slice(0, c)]);
        }
        await wait(350);
      }
    })();
    return () => {
      cancelled = true;
      setTyped([]);
      setTyping(false);
    };
  }, [go, lines, instant]);
  return { typed, typing, finished: typed.length === lines.length && typed[lines.length - 1] === lines[lines.length - 1] };
};

// Google's business search box. Calls onPick with the listing's details once one is chosen.
// The box is made once and moved into whichever chat bubble is showing (it can unmount and come back).
const useGoogleSearch = (enabled: boolean, onPick: (b: Business) => void) => {
  const hostNode = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLElement | null>(null);
  const hostRef = (node: HTMLDivElement | null) => {
    hostNode.current = node;
    if (node && boxRef.current && boxRef.current.parentNode !== node) node.replaceChildren(boxRef.current);
  };
  const [status, setStatus] = useState<'loading' | 'ready' | 'fetching' | 'failed'>('loading');
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    if (!enabled) return;
    if (!MAPS_KEY) {
      setStatus('failed');
      return;
    }
    let cancelled = false;
    let version = 0;
    (async () => {
      try {
        await loadMaps();
        const { PlaceAutocompleteElement } = await (window as any).google.maps.importLibrary('places');
        if (cancelled) return;
        const el = new PlaceAutocompleteElement();
        el.pureServiceAreaBusinessesIncluded = true;
        el.includedRegionCodes = ['za'];
        el.placeholder = 'Search your business name';
        el.setAttribute('aria-label', 'Find your business on Google');
        el.addEventListener('gmp-error', () => setStatus('failed'));
        el.addEventListener('gmp-select', async ({ placePrediction }: any) => {
          const mine = ++version;
          setStatus('fetching');
          try {
            const place = placePrediction.toPlace();
            await place.fetchFields({
              fields: ['id', 'displayName', 'isPureServiceAreaBusiness', 'formattedAddress', 'nationalPhoneNumber', 'websiteURI', 'rating', 'userRatingCount', 'primaryType', 'primaryTypeDisplayName', 'googleMapsURI'],
            });
            if (cancelled || mine !== version) return;
            setStatus('ready');
            onPickRef.current({
              placeId: place.id || '',
              name: place.displayName || '',
              address: place.formattedAddress || '',
              // Maps JavaScript calls this isPureServiceAreaBusiness (not the REST field name)
              hiddenAddress: place.isPureServiceAreaBusiness === true,
              mapsUri: place.googleMapsURI || '',
              category: usefulCategory(place.primaryTypeDisplayName || ''),
              website: place.websiteURI || '',
              phone: place.nationalPhoneNumber || '',
              rating: typeof place.rating === 'number' ? place.rating : null,
              reviewCount: typeof place.userRatingCount === 'number' ? place.userRatingCount : null,
            });
          } catch {
            if (!cancelled && mine === version) setStatus('ready');
          }
        });
        boxRef.current = el;
        hostNode.current?.replaceChildren(el);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('failed');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const clear = () => {
    try {
      if (boxRef.current) (boxRef.current as any).value = '';
    } catch {
      /* older versions have no value setter */
    }
  };
  // Puts the cursor in Google's box, so the visitor can type straight away
  const focus = () => {
    try {
      boxRef.current?.focus();
    } catch {
      /* not focusable in this version */
    }
  };
  return { hostRef, status, clear, focus };
};

const WhatsAppGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.22-3.74.99 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.49-8.42" />
  </svg>
);

const Bubble = ({ children, mine = false }: { children: React.ReactNode; mine?: boolean }) => (
  <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[92%] rounded-lg px-3 py-2 text-[14px] leading-snug text-neutral-900 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
        mine ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'
      }`}
    >
      {children}
    </div>
  </div>
);

const TypingDots = () => (
  <Bubble>
    <span className="flex items-center gap-1 py-1" aria-label="typing">
      {[0, 150, 300].map((d) => (
        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" style={{ animationDelay: `${d}ms` }} />
      ))}
    </span>
  </Bubble>
);

const RatingLine = ({ b }: { b: Business }) =>
  b.rating != null && b.reviewCount ? (
    <span className="inline-flex items-center gap-1">
      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
      {b.rating.toFixed(1)} · {b.reviewCount} Google review{b.reviewCount === 1 ? '' : 's'}
    </span>
  ) : (
    <span>No Google reviews yet</span>
  );

const inputClass =
  'w-full rounded-md border border-[#b9dfb2] bg-white px-2.5 py-2 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-[#008069]';

export default function SiteChat({
  page,
  autoOpen = false,
  delayMs = 10000,
  force = false,
  trackPrefix = `${page}_chat`,
}: {
  page: ChatPage;
  // Open by itself once per visit with the free demo offer (only /website-design does this)
  autoOpen?: boolean;
  delayMs?: number;
  // Drafts only: ignore "already seen this visit"
  force?: boolean;
  trackPrefix?: string;
}) {
  // `session` changes when a button picks a different plan, which starts a fresh chat
  // modal: opened from a button (any button, with or without a plan); the chat that opens by itself stays in the corner
  const [chat, setChat] = useState<{ open: boolean; plan?: ChatPlan; session: number; modal: boolean; focusSearch: boolean }>({
    open: false,
    session: 0,
    modal: false,
    focusSearch: false,
  });

  useOpenOnce(autoOpen, delayMs, force, () => setChat((c) => (c.open ? c : { ...c, open: true })));

  useEffect(() => {
    chatState.mounted += 1;
    const onOpen = (e: Event) => {
      const { plan, focusSearch = false } = (e as CustomEvent<{ plan?: ChatPlan; focusSearch?: boolean }>).detail || {};
      setChat((c) =>
        c.plan === plan && c.session > 0
          ? { ...c, open: true, modal: true, focusSearch }
          : { open: true, plan, session: c.session + 1, modal: true, focusSearch },
      );
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => {
      chatState.mounted -= 1;
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
    };
  }, []);

  // Stays mounted while closed, so reopening with the same plan keeps what they typed
  if (!chat.open && chat.session === 0) return null;
  return (
    <ChatWindow
      key={chat.session}
      page={page}
      plan={chat.plan}
      open={chat.open}
      modal={chat.modal}
      focusSearch={chat.focusSearch}
      onClose={() => setChat((c) => ({ ...c, open: false }))}
      trackPrefix={`${trackPrefix}_${chat.plan || 'demo'}`}
    />
  );
}

function ChatWindow({
  page,
  plan,
  open,
  modal,
  focusSearch,
  onClose,
  trackPrefix,
}: {
  page: ChatPage;
  plan?: ChatPlan;
  open: boolean;
  modal: boolean;
  focusSearch: boolean;
  onClose: () => void;
  trackPrefix: string;
}) {
  const [lines] = useState(() => chatLines(plan));
  const { typed, typing, finished } = useTypedLines(lines, open, focusSearch);
  const [pending, setPending] = useState<Business | null>(null); // shown as "Is this you?"
  const [business, setBusiness] = useState<Business | null>(null); // confirmed
  const [manual, setManual] = useState(false); // "Not on Google?"
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  // The number we can WhatsApp them on: their Google number if it's a cellphone and they say yes, or one they type
  const [whatsApp, setWhatsApp] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [numberError, setNumberError] = useState('');
  const [otherNumber, setOtherNumber] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [questions] = useState(() => questionsFor(plan));
  const chatRef = useRef<HTMLDivElement>(null);
  const saveLead = useLeadRecord(page, plan);
  const { hostRef, status, clear, focus } = useGoogleSearch(open, (b) => {
    setBusiness(null);
    setPending(b);
    setWhatsApp('');
    setOtherNumber(false);
    saveLead(['picked'], { mode: 'google', ...b });
  });
  const typeByHand = manual || status === 'failed';

  // Keep the newest bubble in view as the chat grows
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [typed, typing, finished, pending, business, typeByHand, whatsApp, otherNumber, answers]);

  // PostHog: the chat steps are site_chat_opened → site_chat_started → site_chat_business_found → site_chat_sent
  useEffect(() => {
    if (open) capture('site_chat_opened', { page, plan: plan || 'demo', how: modal ? 'button' : 'opened_by_itself' });
  }, [open, page, plan, modal]);

  useEffect(() => {
    if (!open) return;
    track(`${trackPrefix}_shown`);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, trackPrefix]);

  const href = whatsAppLink(chatMessage(page, plan, business, name, link, whatsApp, answers));
  const typedMobile = normaliseMobile(numberInput);
  const googleMobile = business ? normaliseMobile(business.phone) : '';
  // We can reach them: a confirmed business with a number, or typed details with a valid number
  const haveContact = (!!business && !!whatsApp) || (typeByHand && !business && !!name.trim() && !!typedMobile);
  const answeredAll = questions.every((id) => answers[id]);
  const ready = haveContact && answeredAll;
  // What we know so far, sent with every save so the record always holds the latest
  const leadNow = () =>
    business
      ? { mode: 'google', ...business, whatsApp, whatsAppFrom: whatsApp === googleMobile ? 'google' : 'typed', answers }
      : { mode: 'manual', name: name.trim(), link: link.trim(), whatsApp: typedMobile, whatsAppFrom: 'typed', answers };
  const answer = (id: QuestionId, value: string) => {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    const done = questions.every((q) => next[q]);
    capture('site_chat_answered', { page, plan: plan || 'demo', question: id, answer: value });
    saveLead([...(business ? [] : (['typed'] as LeadStep[])), ...(done ? (['answered'] as LeadStep[]) : [])], { ...leadNow(), answers: next });
  };
  const searchAgain = () => {
    clear();
    setPending(null);
    setBusiness(null);
    setManual(false);
    setWhatsApp('');
    setOtherNumber(false);
  };
  // Saves the number on their record (Airtable "Mobile") and shows it as their reply
  const chooseNumber = (mobile: string, from: 'google' | 'typed') => {
    if (!business) return;
    setWhatsApp(mobile);
    setNumberError('');
    capture('site_chat_number_given', { page, plan: plan || 'demo', from });
    saveLead(['number'], { mode: 'google', ...business, whatsApp: mobile, whatsAppFrom: from, answers });
  };

  // Opened from a button: a centred window over a darkened page, so it's clear what the click did and what to
  // do next (Jeremy, 8 Oct 2026; since then for every button, including the free demo search box on the website
  // page, not only buttons with a plan). Opened by itself (the free demo offer on /website-design): the corner chat.

  // Opened from a search box: the cursor goes straight into Google's box once it shows
  useEffect(() => {
    if (open && focusSearch && finished && status === 'ready') focus();
  }, [open, focusSearch, finished, status]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the page behind still while the centred window is open
  useEffect(() => {
    if (!modal || !open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
    };
  }, [modal, open]);

  const close = () => {
    onClose();
    track(`${trackPrefix}_closed`);
  };

  const windowEl = (
    <div
      role="dialog"
      aria-label="Chat with Local Pros Studio"
      aria-modal={modal || undefined}
      hidden={!open}
      className={
        modal
          ? 'relative w-full max-w-[520px] animate-[demoPopIn_.3s_ease-out] rounded-2xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)]'
          : 'fixed inset-x-3 bottom-[84px] z-[60] mx-auto max-w-[380px] animate-[demoPopIn_.35s_ease-out] rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] md:inset-x-auto md:bottom-6 md:right-6'
      }
    >
      <style>{`@keyframes demoPopIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
        @keyframes demoFadeIn{from{opacity:0}to{opacity:1}}
        @media (prefers-reduced-motion: reduce){[aria-label="Chat with Local Pros Studio"]{animation:none!important}}
        .demo-gbp gmp-place-autocomplete{display:block;width:100%;color-scheme:light;background:#fff;border:1px solid #b9dfb2;border-radius:6px;font-size:15px}
        .demo-gbp gmp-place-autocomplete:focus-within{border-color:#008069}
        .demo-gbp gmp-place-autocomplete::part(focus-ring){display:none}
        .demo-gbp gmp-place-autocomplete::part(prediction-list){border-radius:8px}
        .demo-gbp gmp-place-autocomplete::part(prediction-item){padding-top:8px;padding-bottom:8px;font-size:14px}
        .demo-gbp gmp-place-autocomplete::part(prediction-item-match){color:#008069}`}</style>

      {/* Chat header, WhatsApp style */}
      <div className="flex items-center gap-3 rounded-t-2xl bg-[#008069] px-3 py-2.5 text-white">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-amber-400 font-display text-sm font-extrabold text-neutral-950">
          LP
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold text-white">Local Pros Studio</p>
          <p className="text-[12px] text-white/80">{typing ? 'typing…' : 'online'}</p>
        </div>
        <button
          type="button"
          onClick={close}
          className="rounded-full p-1.5 text-white/90 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat body */}
      <div ref={chatRef} className={`${modal ? 'min-h-[300px] max-h-[62vh] px-4 py-4 md:min-h-[340px] md:px-5' : 'max-h-[52vh] px-3 py-3'} space-y-2 overflow-y-auto bg-[#efeae2]`} aria-live="polite">
        {typed.map((line, i) => (
          <Bubble key={i}>{line}</Bubble>
        ))}
        {typing && <TypingDots />}

        {/* Their reply is a Google search, or name + link if they're not on Google */}
        {finished && !business && (
          <Bubble mine>
            <div className="w-[260px] max-w-full space-y-1.5" onFocus={() => notifyStarted(page, plan)}>
              {!typeByHand && (
                <>
                  {/* Google's box goes in here; React leaves this div's contents alone */}
                  <div ref={hostRef} className="demo-gbp" />
                  {status === 'loading' && (
                    <div className="flex h-[42px] items-center rounded-md border border-[#b9dfb2] bg-white px-2.5 text-[15px] text-neutral-400">
                      Loading Google search…
                    </div>
                  )}
                  {status === 'fetching' && <p className="text-[12px] text-neutral-600">Loading your business…</p>}
                  <button
                    type="button"
                    onClick={() => {
                      notifyStarted(page, plan);
                      setManual(true);
                    }}
                    className="text-[12px] font-semibold text-[#008069] underline">
                    Not on Google? Type your details instead
                  </button>
                </>
              )}
              {typeByHand && (
                <>
                  <p className="text-[12px] text-neutral-600">Your business name, Facebook page or website, and the number we can WhatsApp you on:</p>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Business name" aria-label="Business name" autoComplete="organization" className={inputClass} />
                  <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Facebook page or website" aria-label="Facebook page or website" inputMode="url" className={inputClass} />
                  <input value={numberInput} onChange={(e) => setNumberInput(e.target.value)} placeholder="Your WhatsApp number" aria-label="Your WhatsApp number" inputMode="tel" autoComplete="tel" className={inputClass} />
                  {numberInput.trim().length >= 10 && !typedMobile && <p className="text-[12px] text-red-700">Enter a cellphone number, for example 082 123 4567.</p>}
                  {status !== 'failed' && (
                    <button type="button" onClick={searchAgain} className="text-[12px] font-semibold text-[#008069] underline">
                      Search Google instead
                    </button>
                  )}
                </>
              )}
            </div>
          </Bubble>
        )}

        {/* A pick: "Is this you?" card, like the join form */}
        {pending && !business && (
          <Bubble>
            <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">Is this your business?</p>
            <p className="mt-0.5 font-semibold">{pending.name}</p>
            <div className="mt-0.5 space-y-0.5 text-[13px] text-neutral-600">
              {pending.category && <p>{pending.category}</p>}
              <p>{pending.hiddenAddress ? 'Address hidden on Google' : pending.address || 'No address on Google'}</p>
              {pending.phone && <p>{pending.phone}</p>}
              {pending.website && <p className="truncate">{shortWebsite(pending.website)}</p>}
              <p className="text-neutral-700"><RatingLine b={pending} /></p>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setBusiness(pending);
                  track(`${trackPrefix}_gbp_picked`);
                  capture('site_chat_business_found', { page, plan: plan || 'demo', how: 'google', google_reviews: pending.reviewCount ?? 0 });
                  saveLead(['confirmed'], { mode: 'google', ...pending });
                }}
                className="flex-1 whitespace-nowrap rounded-full bg-[#008069] px-3 py-2 text-[13px] font-bold text-white"
              >
                Yes, that’s me
              </button>
              <button type="button" onClick={searchAgain} className="flex-1 whitespace-nowrap rounded-full border border-neutral-300 px-3 py-2 text-[13px] font-bold text-neutral-800">
                Search again
              </button>
            </div>
          </Bubble>
        )}

        {business && (
          <>
            <Bubble mine>
              <span className="flex items-center gap-1.5 font-semibold">
                <Check className="h-4 w-4 text-[#008069]" aria-hidden="true" />
                {business.name}
              </span>
              <button type="button" onClick={searchAgain} className="text-[12px] text-[#008069] underline">
                Change
              </button>
            </Bubble>
            {/* Can we WhatsApp them? Their Google number if it's a cellphone, otherwise ask for one */}
            {googleMobile && !otherNumber ? (
              <Bubble>
                <p>Can we WhatsApp you on <span className="font-semibold">{showMobile(googleMobile)}</span>?</p>
                {!whatsApp && (
                  <div className="mt-2 flex gap-2">
                    <button type="button" onClick={() => chooseNumber(googleMobile, 'google')} className="flex-1 whitespace-nowrap rounded-full bg-[#008069] px-3 py-2 text-[13px] font-bold text-white">
                      Yes, WhatsApp me there
                    </button>
                    <button type="button" onClick={() => setOtherNumber(true)} className="flex-1 whitespace-nowrap rounded-full border border-neutral-300 px-3 py-2 text-[13px] font-bold text-neutral-800">
                      Another number
                    </button>
                  </div>
                )}
              </Bubble>
            ) : (
              <Bubble>
                {otherNumber ? 'No problem. Which number can we WhatsApp you on?' : `We can’t WhatsApp the number on your Google listing. Which number can we WhatsApp you on?`}
              </Bubble>
            )}
            {!whatsApp && (otherNumber || !googleMobile) && (
              <Bubble mine>
                <form
                  className="w-[240px] max-w-full space-y-1.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (typedMobile) chooseNumber(typedMobile, 'typed');
                    else setNumberError('Enter a cellphone number, for example 082 123 4567.');
                  }}
                >
                  <input value={numberInput} onChange={(e) => setNumberInput(e.target.value)} placeholder="082 123 4567" aria-label="Your WhatsApp number" inputMode="tel" autoComplete="tel" autoFocus className={inputClass} />
                  {numberError && <p className="text-[12px] text-red-700">{numberError}</p>}
                  <button type="submit" className="w-full rounded-full bg-[#008069] px-3 py-2 text-[13px] font-bold text-white">
                    Use this number
                  </button>
                </form>
              </Bubble>
            )}
            {whatsApp && (
              <>
                <Bubble mine>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Check className="h-4 w-4 text-[#008069]" aria-hidden="true" />
                    {showMobile(whatsApp)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setWhatsApp('');
                      setOtherNumber(true);
                    }}
                    className="text-[12px] text-[#008069] underline"
                  >
                    Change
                  </button>
                </Bubble>
              </>
            )}
          </>
        )}

        {/* Quick questions, one tap each, once we can reach them */}
        {haveContact &&
          questions.map((id, i) =>
            questions.slice(0, i).every((q) => answers[q]) ? (
              <div key={id} className="space-y-2">
                <Bubble>
                  <p>{QUESTIONS[id].ask}</p>
                  {!answers[id] && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {QUESTIONS[id].options.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => answer(id, o.value)}
                          className="rounded-full border border-[#008069]/40 bg-white px-3 py-2 text-left text-[13px] font-semibold text-[#00634f] hover:bg-[#e7f4ef]"
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </Bubble>
                {answers[id] && (
                  <Bubble mine>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Check className="h-4 w-4 flex-none text-[#008069]" aria-hidden="true" />
                      {answerLabel(id, answers[id])}
                    </span>
                  </Bubble>
                )}
              </div>
            ) : null,
          )}
        {ready && (
          <Bubble>
            {plan
              ? `Thanks. Tap send and we’ll set up ${PLAN[plan].whatsApp} for ${business?.name || name.trim()} on WhatsApp.`
              : `Thanks. Tap send and we’ll start on the free demo for ${business?.name || name.trim()}.`}
          </Bubble>
        )}
      </div>

      {/* One button: opens WhatsApp with the message filled in */}
      <div className={`rounded-b-2xl bg-[#efeae2] ${modal ? 'px-4 pb-4 md:px-5' : 'px-3 pb-3'} pt-1 transition-opacity duration-300 ${finished ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <a
          href={ready ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          data-wa-from="site_chat"
          onClick={() => {
            if (!ready) return;
            track(`${trackPrefix}_whatsapp`);
            capture('site_chat_sent', { page, plan: plan || 'demo', how: business ? 'google' : 'typed' });
            // Updates the record made when they picked their business, or creates it for typed details
            saveLead(business ? ['sent'] : ['typed', 'sent'], leadNow());
          }}
          className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-display text-[15px] font-extrabold ${
            ready ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300' : 'cursor-default bg-amber-400/40 text-neutral-950/50'
          }`}
        >
          <WhatsAppGlyph className="h-5 w-5" />
          {plan ? 'Send to get started' : 'Send for my free demo'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="mt-1.5 text-center text-[11px] text-neutral-500">Opens WhatsApp. A real person replies.{plan ? '' : ' No cost, no obligation.'}</p>
      </div>
    </div>
  );

  if (!modal) return windowEl;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-6" hidden={!open}>
      {/* Darkened page behind; a tap outside the chat closes it */}
      <div className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-[2px] animate-[demoFadeIn_.2s_ease-out]" onClick={close} aria-hidden="true" />
      {windowEl}
    </div>
  );
}
