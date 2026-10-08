import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Star, X } from 'lucide-react';

import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
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
const PLAN: Record<ChatPlan, { chat: string; whatsApp: string; showsSite: boolean }> = {
  package: { chat: 'the full package', whatsApp: 'the full package', showsSite: true },
  reviews: { chat: 'your Google reviews', whatsApp: 'Google reviews', showsSite: false },
  social: { chat: 'your weekly social media posts', whatsApp: 'social media posting', showsSite: false },
  website: { chat: 'your new website', whatsApp: 'a new website', showsSite: true },
};

// Each page keeps the WhatsApp opening the bot and the weekly scoreboard already count (src/whatsapp.ts)
const OPENING: Record<ChatPage, string> = {
  'website-design': WHATSAPP_MESSAGES.googleAds,
  home: WHATSAPP_MESSAGES.site,
  join: WHATSAPP_MESSAGES.site,
};

// With a plan: "start the plan you picked". Without one: the free demo offer (/website-design)
const chatLines = (plan?: ChatPlan) =>
  plan
    ? [`Hi 👋 Let’s get ${PLAN[plan].chat} started.`, 'Find your business on Google below and tap send. We’ll reply on WhatsApp to set it up.']
    : [
        'Hi 👋 Want to see your new website before you pay anything?',
        'Find your business on Google below. We’ll build a free demo from your listing and WhatsApp it to you.',
      ];

const chatMessage = (page: ChatPage, plan: ChatPlan | undefined, business: Business | null, name: string, link: string) =>
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

// Google files many service businesses under a bare "Services"; that says nothing, so leave it out
const usefulCategory = (label: string) => (/^services?$/i.test(label.trim()) ? '' : label.trim());

// "https://www.example.co.za/contact" → "example.co.za"
const shortWebsite = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');

// Saves the lead to Airtable (Sales CRM, Source = Website) through netlify/functions/demo-lead.mts,
// so a visitor who never presses send in WhatsApp is still on the list. Once per business per visit.
const savedLeads = new Set<string>();
const saveLead = (lead: Record<string, unknown>) => {
  const key = JSON.stringify([lead.mode, lead.plan || '', lead.placeId || lead.name, lead.link || '']);
  if (savedLeads.has(key)) return;
  savedLeads.add(key);
  fetch('/api/demo-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
    keepalive: true,
  }).catch(() => {
    /* the WhatsApp message still carries the details */
  });
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

// Types the offer line by line, with a "typing…" pause before each bubble, like a real chat
const useTypedLines = (lines: string[], active: boolean) => {
  const [typed, setTyped] = useState<string[]>([]);
  const [typing, setTyping] = useState(false);
  // Starts the first time the chat opens; closing and reopening keeps the lines already shown
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (active) setGo(true);
  }, [active]);
  useEffect(() => {
    if (!go) return;
    if (prefersReducedMotion()) {
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
  }, [go, lines]);
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
  return { hostRef, status, clear };
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

// A tiny phone with a website built from their Google name, phone and rating
const MiniSitePreview = ({ b }: { b: Business }) => (
  <div className="w-[104px] flex-none overflow-hidden rounded-[14px] border-4 border-neutral-900 bg-white shadow-md" aria-hidden="true">
    <div className="flex items-center justify-between gap-1 bg-neutral-900 px-1.5 py-1">
      <span className="truncate font-display text-[7px] font-extrabold text-white">{b.name}</span>
      <span className="h-1.5 w-4 flex-none rounded-full bg-amber-400" />
    </div>
    <div className="bg-gradient-to-br from-amber-50 to-white px-1.5 pb-1.5 pt-2">
      <p className="break-words font-display text-[9px] font-extrabold leading-tight text-neutral-950">{b.name}</p>
      {b.category && <p className="truncate text-[6px] text-neutral-500">{b.category}</p>}
      {b.rating != null && b.reviewCount ? (
        <p className="text-[6px] text-amber-500">
          ★★★★★ <span className="text-neutral-600">{b.rating.toFixed(1)} · {b.reviewCount} reviews</span>
        </p>
      ) : null}
      <div className="mt-1 h-7 rounded bg-neutral-200" />
      {b.phone && <p className="mt-1 text-center text-[6px] font-bold text-neutral-800">Call {b.phone}</p>}
      <div className="mt-1 rounded-full bg-amber-400 py-0.5 text-center text-[6px] font-bold text-neutral-950">WhatsApp us</div>
    </div>
  </div>
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
  const [chat, setChat] = useState<{ open: boolean; plan?: ChatPlan; session: number }>({ open: false, session: 0 });

  useOpenOnce(autoOpen, delayMs, force, () => setChat((c) => (c.open ? c : { ...c, open: true })));

  useEffect(() => {
    chatState.mounted += 1;
    const onOpen = (e: Event) => {
      const plan = (e as CustomEvent<{ plan?: ChatPlan }>).detail?.plan;
      setChat((c) => (c.plan === plan && c.session > 0 ? { ...c, open: true } : { open: true, plan, session: c.session + 1 }));
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
      onClose={() => setChat((c) => ({ ...c, open: false }))}
      trackPrefix={`${trackPrefix}_${chat.plan || 'demo'}`}
    />
  );
}

function ChatWindow({
  page,
  plan,
  open,
  onClose,
  trackPrefix,
}: {
  page: ChatPage;
  plan?: ChatPlan;
  open: boolean;
  onClose: () => void;
  trackPrefix: string;
}) {
  const [lines] = useState(() => chatLines(plan));
  const { typed, typing, finished } = useTypedLines(lines, open);
  const [pending, setPending] = useState<Business | null>(null); // shown as "Is this you?"
  const [business, setBusiness] = useState<Business | null>(null); // confirmed
  const [manual, setManual] = useState(false); // "Not on Google?"
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const { hostRef, status, clear } = useGoogleSearch(open, (b) => {
    setBusiness(null);
    setPending(b);
  });
  const typeByHand = manual || status === 'failed';

  // Keep the newest bubble in view as the chat grows
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [typed, typing, finished, pending, business, typeByHand]);

  useEffect(() => {
    if (!open) return;
    track(`${trackPrefix}_shown`);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, trackPrefix]);

  const href = whatsAppLink(chatMessage(page, plan, business, name, link));
  const showsSite = !plan || PLAN[plan].showsSite;
  const ready = !!business || (typeByHand && !!name.trim());
  const searchAgain = () => {
    clear();
    setPending(null);
    setBusiness(null);
    setManual(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Chat with Local Pros Studio"
      hidden={!open}
      className="fixed inset-x-3 bottom-[84px] z-[60] mx-auto max-w-[380px] animate-[demoPopIn_.35s_ease-out] rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] md:inset-x-auto md:bottom-6 md:right-6"
    >
      <style>{`@keyframes demoPopIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
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
          onClick={() => {
            onClose();
            track(`${trackPrefix}_closed`);
          }}
          className="rounded-full p-1.5 text-white/90 hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat body */}
      <div ref={chatRef} className="max-h-[52vh] space-y-2 overflow-y-auto bg-[#efeae2] px-3 py-3" aria-live="polite">
        {typed.map((line, i) => (
          <Bubble key={i}>{line}</Bubble>
        ))}
        {typing && <TypingDots />}

        {/* Their reply is a Google search, or name + link if they're not on Google */}
        {finished && !business && (
          <Bubble mine>
            <div className="w-[260px] max-w-full space-y-1.5">
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
                  <button type="button" onClick={() => setManual(true)} className="text-[12px] font-semibold text-[#008069] underline">
                    Not on Google? Type your details instead
                  </button>
                </>
              )}
              {typeByHand && (
                <>
                  <p className="text-[12px] text-neutral-600">Your business name, and your Facebook page or website:</p>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Business name" aria-label="Business name" autoComplete="organization" className={inputClass} />
                  <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Facebook page or website" aria-label="Facebook page or website" inputMode="url" className={inputClass} />
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
                  saveLead({ mode: 'google', page, plan, ...pending });
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
            {showsSite ? (
              <div className="flex justify-start">
                <div className="flex max-w-[92%] items-center gap-3 rounded-lg rounded-tl-none bg-white p-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
                  <MiniSitePreview b={business} />
                  <p className="text-[13px] leading-snug text-neutral-800">
                    {plan
                      ? `Got it. Here’s a peek at ${business.name}. Tap send and we’ll set it up on WhatsApp.`
                      : `Got it. Here’s a peek at ${business.name}. The real demo uses your Google photos and reviews.`}
                  </p>
                </div>
              </div>
            ) : (
              <Bubble>Got it. Tap send and we’ll set it up for {business.name} on WhatsApp.</Bubble>
            )}
          </>
        )}
      </div>

      {/* One button: opens WhatsApp with the message filled in */}
      <div className={`rounded-b-2xl bg-[#efeae2] px-3 pb-3 pt-1 transition-opacity duration-300 ${finished ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <a
          href={ready ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          onClick={() => {
            if (!ready) return;
            track(`${trackPrefix}_whatsapp`);
            // Google picks are saved when confirmed; typed details are saved here
            if (!business) saveLead({ mode: 'manual', page, plan, name: name.trim(), link: link.trim() });
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
}
