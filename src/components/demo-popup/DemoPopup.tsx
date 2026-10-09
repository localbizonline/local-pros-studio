import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Search, Star, X } from 'lucide-react';

import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { isTeamDevice } from '../../teamDevice';
import { capture, countDemoLead } from '../../analytics';
import { chatState, OPEN_CHAT_EVENT, type ChatPage, type ChatPlan } from './openSiteChat';
import { useGoogleSearch, type Business } from './googleSearch';

// The site chat (8 Oct 2026). Looks like a WhatsApp chat: we "type" the opening lines, the visitor
// finds their business on Google inside the chat (same Google search as the localpros.co.za/join/apply
// form, ../localpros-join/src/scripts/apply-form.ts), and WhatsApp opens with their Google details.
// Not on Google: business name plus Facebook page or website. Every lead is also saved to Airtable.
// - /website-design: opens by itself once per visit with the free demo offer (Jeremy's pick, version C).
// - Other pages (join, homepage): opens only from a button via openSiteChat(plan), with the plan picked.
// Render <SiteChat page="…" /> once per page.


const SEEN_KEY = 'lps_demo_popup_seen';


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
  reviews: WHATSAPP_MESSAGES.site,
  social: WHATSAPP_MESSAGES.site,
  pricing: WHATSAPP_MESSAGES.site,
};

// With a plan: "start the plan you picked". Without one: the free demo offer (/website-design)
// greet: false after the prices opening, which has already said hello
const chatLines = (plan?: ChatPlan, greet = true) =>
  plan
    ? [`${greet ? 'Hi 👋 ' : 'Great. '}Let’s get ${PLAN[plan].chat} started.`, 'Find your business on Google below and tap send. We’ll reply on WhatsApp to set it up.']
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
        const data = (await res.json()) as { dryRun?: boolean; record?: { id: string; pass: string } | null };
        if (!record.current && data.record?.id && data.record.pass) {
          record.current = data.record;
          // The lead now exists in Airtable: count it in Google Ads (test sites only dry-run, so they don't count)
          if (!data.dryRun) countDemoLead();
        }
      } catch {
        /* the WhatsApp message still carries the details */
      }
    });
  };
};

// "Someone started using the chat" alert: the first time a visitor taps into it, once per page per visit
const STARTED_KEY = 'lps_chat_started';
const startedThisLoad = new Set<string>();
export const notifyStarted = (page: ChatPage, plan?: ChatPlan) => {
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



// Opens once per visit after `delayMs`, unless the visitor has already opened the chat or WhatsApp themselves
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
    // Only if they haven't started anything themselves: a tap that opens the chat or a WhatsApp link cancels
    // it for the rest of the visit (Jeremy, 9 Oct 2026). The 40%-scroll trigger was dropped at the same time.
    const cancel = () => {
      done = true;
      window.clearTimeout(timer);
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* ignore */
      }
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href*="wa.me/"], a[href*="api.whatsapp.com/"]')) cancel();
    };
    const timer = window.setTimeout(show, delayMs);
    window.addEventListener(OPEN_CHAT_EVENT, cancel);
    document.addEventListener('click', onClick, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_CHAT_EVENT, cancel);
      document.removeEventListener('click', onClick, true);
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

// The prices opening (test, 9 Oct 2026, Jeremy's idea): when someone taps "Prices", the chat shows the prices
// straight away, asks what they're most interested in, and if they pick one service, points out once what the
// package adds for the difference. Their pick becomes the plan for the usual Google step. Prices as on
// sections/Pricing.tsx. Opened with openSiteChat(undefined, { prices: true }).
// The price messages look like small versions of the pricing page's cards (Jeremy: "make it look more like the
// pricing page"): a "Best value" badge, the big R2,500, ticks with emoji, prices lined up on the right, and the
// "all three" button in the site's amber. Emoji are fine here: it's a WhatsApp-style chat.
type PricesOption = { label: string; emoji?: string; price?: string; main?: boolean; onPick: () => void };
type PricesItem =
  | { who: 'bot'; body: React.ReactNode; card?: boolean }
  | { who: 'me'; body: React.ReactNode }
  | { who: 'buttons'; options: PricesOption[] };

const ONE_SERVICE: Record<
  Exclude<ChatPlan, 'package'>,
  { label: string; short: string; emoji: string; price: string; unit: string; just: string; alone: string; extra: number; adds: [string, string][] }
> = {
  reviews: {
    label: 'Google reviews',
    short: 'Google reviews',
    emoji: '⭐',
    price: 'R1,200',
    unit: 'a month',
    just: 'Just Google reviews',
    alone: 'Google reviews on their own is R1,200 a month, month to month.',
    extra: 1300,
    adds: [['📲', 'Facebook and Instagram posts, made and published for you'], ['🌐', 'A website, free on 12 months (worth R9,900)']],
  },
  social: {
    label: 'Social media posts',
    short: 'Social media posts',
    emoji: '📲',
    price: 'R2,000',
    unit: 'a month',
    just: 'Just social media posts',
    alone: 'Social media posts on their own is R2,000 a month, month to month.',
    extra: 500,
    adds: [['⭐', 'A Google review request to every customer'], ['🌐', 'A website, free on 12 months (worth R9,900)']],
  },
  website: {
    label: 'A website',
    short: 'Website',
    emoji: '🌐',
    price: 'R9,900',
    unit: 'once-off',
    just: 'Just the website',
    alone: 'A website on its own is R9,900 once-off, plus R290 a month for hosting.',
    extra: 0,
    adds: [['⭐', 'A Google review request to every customer'], ['📲', 'Facebook and Instagram posts, made and published for you']],
  },
};

const EmojiLine = ({ emoji, children, className = '' }: { emoji: string; children: React.ReactNode; className?: string }) => (
  <li className={`flex gap-2 ${className}`}>
    <span className="w-5 flex-none text-center" aria-hidden="true">
      {emoji}
    </span>
    <span>{children}</span>
  </li>
);

const PackageCard = () => (
  <div>
    <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-neutral-900">
      Best value
    </span>
    <p className="mt-1.5 flex items-baseline gap-1.5 text-neutral-900">
      <span className="text-[30px] font-extrabold leading-none tracking-tight">R2,500</span>
      <span className="text-[13px] text-neutral-500">a month for all three</span>
    </p>
    <ul className="mt-2.5 space-y-1.5 text-[14px] leading-snug">
      <EmojiLine emoji="⭐">More 5-star Google reviews</EmojiLine>
      <EmojiLine emoji="📲">Facebook and Instagram posts, done for you</EmojiLine>
      <EmojiLine emoji="🌐">
        A new website, free on 12 months{' '}
        <span className="whitespace-nowrap rounded-full bg-amber-100 px-1.5 text-[12px] font-bold">Worth R9,900</span>
      </EmojiLine>
      <EmojiLine emoji="✅" className="font-semibold">
        Free setup, normally R5,000
      </EmojiLine>
    </ul>
  </div>
);

const SinglesCard = () => (
  <div>
    <p className="text-[12px] font-bold uppercase tracking-wide text-neutral-500">Or one on its own</p>
    <ul className="mt-1.5 divide-y divide-neutral-100">
      {(Object.keys(ONE_SERVICE) as (keyof typeof ONE_SERVICE)[]).map((k) => {
        const s = ONE_SERVICE[k];
        return (
          <li key={k} className="flex items-baseline justify-between gap-3 py-1.5">
            <span className="text-[14px]">
              {s.emoji} {s.short}
            </span>
            <span className="whitespace-nowrap text-right">
              <strong className="text-[15px] text-neutral-900">{s.price}</strong>{' '}
              <span className="text-[12px] text-neutral-500">{s.unit}</span>
            </span>
          </li>
        );
      })}
    </ul>
  </div>
);

// What the package adds to the one service they picked, and what it costs on top
const NudgeCard = ({ plan }: { plan: keyof typeof ONE_SERVICE }) => {
  const s = ONE_SERVICE[plan];
  return (
    <div>
      <p className="font-semibold text-neutral-900">
        {s.extra ? `For R${s.extra.toLocaleString('en-ZA').replace(/\s/g, ',')} more a month, you also get:` : 'Or get it free on a 12-month commitment when you take all three:'}
      </p>
      <ul className="mt-1.5 space-y-1 text-[14px] leading-snug">
        {s.adds.map(([emoji, text]) => (
          <EmojiLine key={text} emoji={emoji}>
            {text}
          </EmojiLine>
        ))}
      </ul>
      <p className="mt-2 flex items-baseline justify-between gap-3 rounded-lg bg-amber-50 px-2.5 py-1.5 ring-1 ring-amber-200">
        <span className="text-[13px] font-semibold">All three</span>
        <span>
          <strong className="text-[17px] text-neutral-900">R2,500</strong> <span className="text-[12px] text-neutral-500">a month</span>
        </span>
      </p>
    </div>
  );
};

function PricesStep({ open, onPick, onTyping }: { open: boolean; onPick: (plan: ChatPlan) => void; onTyping: (typing: boolean) => void }) {
  const [items, setItems] = useState<PricesItem[]>([]);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  // Answer: their tap becomes their bubble in place of the buttons
  const answer = (label: string, next: PricesItem[]) =>
    setItems((list) => [...list.filter((i) => i.who !== 'buttons'), { who: 'me', body: label }, ...next]);

  const takePackage = (label: string, from?: ChatPlan) => {
    capture(from ? 'prices_chat_nudge' : 'prices_chat_choice', from ? { from, took_package: true } : { choice: 'package' });
    answer(label, []);
    onPick('package');
  };

  const chooseOne = (plan: keyof typeof ONE_SERVICE) => {
    const one = ONE_SERVICE[plan];
    capture('prices_chat_choice', { choice: plan });
    answer(`${one.emoji} ${one.label}`, [
      { who: 'bot', body: one.alone },
      { who: 'bot', body: <NudgeCard plan={plan} />, card: true },
      {
        who: 'buttons',
        options: [
          { label: 'Yes, all three for R2,500', main: true, onPick: () => takePackage('Yes, all three for R2,500', plan) },
          {
            label: one.just,
            onPick: () => {
              capture('prices_chat_nudge', { from: plan, took_package: false });
              answer(one.just, []);
              onPick(plan);
            },
          },
        ],
      },
    ]);
  };

  // The opening, set once the chat first opens
  useEffect(() => {
    if (!open || items.length) return;
    setItems([
      { who: 'bot', body: 'Hi 👋 Here are our prices.' },
      { who: 'bot', body: <PackageCard />, card: true },
      { who: 'bot', body: <SinglesCard /> },
      { who: 'bot', body: 'What are you most interested in?' },
      {
        who: 'buttons',
        options: [
          { label: 'All three', emoji: '🙌', price: 'R2,500 a month', main: true, onPick: () => takePackage('🙌 All three') },
          ...(Object.keys(ONE_SERVICE) as (keyof typeof ONE_SERVICE)[]).map((k) => ({
            label: ONE_SERVICE[k].label,
            emoji: ONE_SERVICE[k].emoji,
            price: `${ONE_SERVICE[k].price} ${ONE_SERVICE[k].unit === 'a month' ? '/ month' : 'once-off'}`,
            onPick: () => chooseOne(k),
          })),
        ],
      },
    ]);
  }, [open, items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Shows the next item: our bubbles after a short "typing…", their taps and the buttons straight away
  useEffect(() => {
    if (shown >= items.length) return;
    if (items[shown].who !== 'bot' || prefersReducedMotion()) {
      setShown((n) => n + 1);
      return;
    }
    setTyping(true);
    onTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      onTyping(false);
      setShown((n) => n + 1);
    }, shown === 0 ? 700 : 550);
    return () => window.clearTimeout(t);
  }, [shown, items]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {items.slice(0, shown).map((item, i) =>
        item.who === 'buttons' ? (
          <div key={i} className="flex flex-col items-stretch gap-1.5 pl-8">
            {item.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={o.onPick}
                className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14px] font-semibold shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
                  o.main ? 'bg-amber-400 text-neutral-950 hover:bg-amber-300' : 'bg-white text-neutral-900 ring-1 ring-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <span>
                  {o.emoji && <span className="mr-1.5">{o.emoji}</span>}
                  {o.label}
                </span>
                {o.price && <span className={`whitespace-nowrap text-[12px] font-bold ${o.main ? 'text-neutral-900' : 'text-neutral-500'}`}>{o.price}</span>}
              </button>
            ))}
          </div>
        ) : item.who === 'me' ? (
          <Bubble key={i} mine>
            <span className="font-semibold">{item.body}</span>
          </Bubble>
        ) : item.card ? (
          <div key={i} className="flex justify-start">
            <div className="w-[92%] rounded-lg rounded-tl-none border-2 border-neutral-900 bg-white px-3.5 py-3 text-[14px] text-neutral-900">
              {item.body}
            </div>
          </div>
        ) : (
          <Bubble key={i}>{item.body}</Bubble>
        ),
      )}
      {typing && <TypingDots />}
    </>
  );
}

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
  const [chat, setChat] = useState<{ open: boolean; plan?: ChatPlan; session: number; modal: boolean; focusSearch: boolean; picked?: Business; typeDetails?: boolean; prices?: boolean }>({
    open: false,
    session: 0,
    modal: false,
    focusSearch: false,
  });

  useOpenOnce(autoOpen, delayMs, force, () => setChat((c) => (c.open ? c : { ...c, open: true })));

  useEffect(() => {
    chatState.mounted += 1;
    const onOpen = (e: Event) => {
      const { plan, focusSearch = false, business, typeDetails = false, prices = false } = (e as CustomEvent<{ plan?: ChatPlan; focusSearch?: boolean; business?: Business; typeDetails?: boolean; prices?: boolean }>).detail || {};
      setChat((c) =>
        // A business picked in a search box on the page, or "Not on Google?", always starts a fresh chat at that step.
        // The prices opening reopens where they left it if it was the last chat opened.
        business || typeDetails || (prices ? !(c.prices && c.session > 0) : c.prices || !(c.plan === plan && c.session > 0))
          ? { open: true, plan, session: c.session + 1, modal: true, focusSearch: focusSearch || !!business || typeDetails, picked: business, typeDetails, prices }
          : { ...c, open: true, modal: true, focusSearch },
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
      picked={chat.picked}
      typeDetails={chat.typeDetails}
      prices={chat.prices}
      onClose={() => setChat((c) => ({ ...c, open: false }))}
      onExpand={() => setChat((c) => (c.modal ? c : { ...c, modal: true }))}
      trackPrefix={`${trackPrefix}_${chat.prices ? 'prices' : chat.plan || 'demo'}`}
    />
  );
}

// The part of the screen not covered by a phone's keyboard, so the centred chat can fit above it
const useVisibleArea = (active: boolean) => {
  const [area, setArea] = useState<{ height: number; top: number } | null>(null);
  useEffect(() => {
    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!active || !vv) return;
    const update = () => setArea({ height: vv.height, top: vv.offsetTop });
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, [active]);
  return area;
};

function ChatWindow({
  page,
  plan: planFromButton,
  open,
  modal,
  focusSearch,
  picked,
  typeDetails,
  prices = false,
  onClose,
  onExpand,
  trackPrefix,
}: {
  page: ChatPage;
  plan?: ChatPlan;
  open: boolean;
  modal: boolean;
  focusSearch: boolean;
  onClose: () => void;
  // Picked in a search box on the page (DemoSearchBox): the chat starts at "Is this your business?"
  picked?: Business;
  // "Not on Google?" under the search box on the page: start at the typed details
  typeDetails?: boolean;
  // Open with the prices first and let them pick a plan in the chat (PricesStep), then the usual Google step
  prices?: boolean;
  // On a phone, typing in the small corner chat moves it to the centred window, above the keyboard
  onExpand: () => void;
  trackPrefix: string;
}) {
  const visible = useVisibleArea(open && modal);
  // The plan from the button, or the one they pick in the prices opening; the usual chat waits until it's picked
  const [pickedPlan, setPickedPlan] = useState<ChatPlan>();
  const plan = planFromButton ?? pickedPlan;
  const planPicked = !prices || !!pickedPlan;
  const lines = useMemo(() => chatLines(plan, !prices), [plan, prices]);
  const { typed, typing, finished } = useTypedLines(lines, open && planPicked, focusSearch);
  const [pending, setPending] = useState<Business | null>(null); // shown as "Is this you?"
  const [business, setBusiness] = useState<Business | null>(null); // confirmed
  const [manual, setManual] = useState(!!typeDetails); // "Not on Google?"
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  // The number we can WhatsApp them on: their Google number if it's a cellphone and they say yes, or one they type
  const [whatsApp, setWhatsApp] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [numberError, setNumberError] = useState('');
  const [otherNumber, setOtherNumber] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const questions = useMemo(() => questionsFor(plan), [plan]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [pricesTyping, setPricesTyping] = useState(false);
  const saveLead = useLeadRecord(page, plan);
  const { status, query, setQuery, suggestions, searching, pick, clear, focus, inputRef, showPicked } = useGoogleSearch(open, (b) => {
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
  }, [typed, typing, finished, pending, business, typeByHand, whatsApp, otherNumber, answers, pricesTyping]);

  // While they search, keep the search box at the top of the chat so the matches below it stay in view
  // above a phone's keyboard
  const searchIntoView = () => {
    const chat = chatRef.current;
    const box = inputRef.current;
    if (!chat || !box) return;
    const top = chat.scrollTop + box.getBoundingClientRect().top - chat.getBoundingClientRect().top - 8;
    chat.scrollTo({ top, behavior: 'smooth' });
  };
  useEffect(() => {
    if (suggestions.length) searchIntoView();
  }, [suggestions]); // eslint-disable-line react-hooks/exhaustive-deps

  // PostHog: the chat steps are site_chat_opened → site_chat_started → site_chat_business_found → site_chat_sent
  useEffect(() => {
    if (open) capture('site_chat_opened', { page, plan: prices ? 'prices' : planFromButton || 'demo', how: modal ? 'button' : 'opened_by_itself' });
  }, [open, page, planFromButton, prices, modal]);

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

  // Picked on the page: save it straight away (the rule for every Google box) and show "Is this your business?"
  useEffect(() => {
    if (!picked) return;
    showPicked(picked.name);
    setPending(picked);
    saveLead(['picked'], { mode: 'google', ...picked });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Opened from a button: a centred window over a darkened page, so it's clear what the click did and what to
  // do next (Jeremy, 8 Oct 2026; since then for every button, including the free demo search box on the website
  // page, not only buttons with a plan). Opened by itself (the free demo offer on /website-design): the corner chat.

  // Opened from a search box: the cursor goes straight into Google's box once it shows
  useEffect(() => {
    if (open && focusSearch && !picked && !typeDetails && finished && status === 'ready') focus();
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
      // Hidden with a class, not the hidden attribute: Tailwind's flex/fixed classes win over [hidden], which left
      // the darkened page on screen after closing (Jeremy, 9 Oct 2026)
      className={
        !open
          ? 'hidden'
          : modal
          ? 'relative flex max-h-full w-full max-w-[520px] animate-[demoPopIn_.3s_ease-out] flex-col rounded-2xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.6)]'
          : 'fixed inset-x-3 bottom-[84px] z-[60] mx-auto max-w-[380px] animate-[demoPopIn_.35s_ease-out] rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] md:inset-x-auto md:bottom-6 md:right-6'
      }
    >
      <style>{`@keyframes demoPopIn{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:none}}
        @keyframes demoFadeIn{from{opacity:0}to{opacity:1}}
        @media (prefers-reduced-motion: reduce){[aria-label="Chat with Local Pros Studio"]{animation:none!important}}
`}</style>

      {/* Chat header, WhatsApp style */}
      <div className="flex flex-none items-center gap-3 rounded-t-2xl bg-[#008069] px-3 py-2.5 text-white">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-amber-400 font-display text-sm font-extrabold text-neutral-950">
          LP
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[15px] font-semibold text-white">Local Pros Studio</p>
          <p className="text-[12px] text-white/80">{typing || pricesTyping ? 'typing…' : 'online'}</p>
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
      <div ref={chatRef} className={`${modal ? 'min-h-0 flex-1 px-4 py-4 md:min-h-[340px] md:max-h-[62vh] md:px-5' : 'max-h-[52vh] px-3 py-3'} space-y-2 overflow-y-auto bg-[#efeae2]`} aria-live="polite">
        {prices && <PricesStep open={open} onPick={setPickedPlan} onTyping={setPricesTyping} />}
        {typed.map((line, i) => (
          <Bubble key={i}>{line}</Bubble>
        ))}
        {typing && <TypingDots />}

        {/* Their reply is a Google search, or name + link if they're not on Google */}
        {finished && !business && (
          <Bubble mine>
            <div
              className="w-[280px] max-w-full space-y-1.5"
              onFocus={() => {
                notifyStarted(page, plan);
                if (!modal && window.matchMedia('(max-width: 767px)').matches) onExpand();
              }}
            >
              {!typeByHand && (
                <>
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={searchIntoView}
                      placeholder="Search your business name"
                      aria-label="Find your business on Google"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                      enterKeyHint="search"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && suggestions[0]) {
                          e.preventDefault();
                          pick(suggestions[0]);
                        }
                      }}
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                  {suggestions.length > 0 && (
                    <div>
                      <ul className="overflow-hidden rounded-md border border-[#b9dfb2] bg-white" role="listbox" aria-label="Businesses on Google">
                        {suggestions.map((s) => (
                          <li key={s.id} className="border-b border-neutral-100 last:border-b-0">
                            <button type="button" role="option" aria-selected="false" onClick={() => pick(s)} className="block w-full px-2.5 py-2 text-left hover:bg-[#e7f4ef] active:bg-[#e7f4ef]">
                              <span className="block text-[14px] font-semibold leading-tight text-neutral-900">{s.main}</span>
                              {/* The phone number, so they can tell which one is theirs */}
                              <span className="block text-[12px] font-semibold text-neutral-700">{s.secondary}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-0.5 text-right text-[10px] text-neutral-400">Results from Google Maps</p>
                    </div>
                  )}
                  {searching && !suggestions.length && <p className="text-[12px] text-neutral-600">Searching Google…</p>}
                  {!searching && status === 'ready' && query.trim().length >= 3 && !suggestions.length && !pending && (
                    <p className="text-[12px] text-neutral-600">No match on Google. Try your business name and town.</p>
                  )}
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

      {/* While they're still picking in the prices opening, only the chat's rounded bottom edge (no send button yet) */}
      {!planPicked && <div className="h-3 flex-none rounded-b-2xl bg-[#efeae2]" />}

      {/* One button: opens WhatsApp with the message filled in */}
      <div className={`${planPicked ? 'flex-none' : 'hidden'} rounded-b-2xl bg-[#efeae2] ${modal ? 'px-4 pb-4 md:px-5' : 'px-3 pb-3'} pt-1 transition-opacity duration-300 ${finished ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
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
    <div
      className={open ? 'fixed inset-x-0 top-0 z-[60] flex h-full items-center justify-center p-3 md:p-6' : 'hidden'}
      style={open && visible ? { height: visible.height, top: visible.top } : undefined}
    >
      {/* Darkened page behind; a tap outside the chat closes it */}
      <div className="absolute inset-0 bg-[#1C1917]/70 backdrop-blur-[2px] animate-[demoFadeIn_.2s_ease-out]" onClick={close} aria-hidden="true" />
      {windowEl}
    </div>
  );
}
