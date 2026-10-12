import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Check, ChevronRight, SendHorizontal, X } from 'lucide-react';
import { GROUPS, SITES, groupById, type Group, type Site, type Sub } from './catalogue';
import { MAPS_KEY, searchGoogle, type Business } from '../demo-popup/googleSearch';
import { notifyStarted, useLeadRecord } from '../demo-popup/DemoPopup';
import { capture } from '../../analytics';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';

// "Websites for businesses like yours" chat (draft, 12 Oct 2026, Jeremy). Replaces "find your business on Google"
// as the first step. Jeremy's pick (mock-up E in design/examples-chat-mockups/): a full-screen chat with a 4-step
// progress bar, and no examples or prices in the chat itself ("the point is to WhatsApp them"):
//   1. type of business (7 rows)  2. the closest type  3. name + WhatsApp number ("Send me examples": the lead is
//   saved here)  4. "what's your business called?" (Google check behind the scenes; "Is it one of these?" only for
//   close matches), then "On its way. Tyran from our team will WhatsApp you…".
// The team sends the examples by hand (alert to Jeremy and Ashley, netlify/functions/demo-lead.mts, offer "examples").
// One Airtable record per chat: created at step 3, then updated with the business (the Google box rule).
// Every step is counted in PostHog (examples_chat_step) to see where people leave.

export const OPEN_EXAMPLES_EVENT = 'lps:open-examples-chat';

type OpenOptions = { group?: string; sub?: string; site?: string; from: string };
export const openExamplesChat = (opts: OpenOptions) => window.dispatchEvent(new CustomEvent(OPEN_EXAMPLES_EVENT, { detail: opts }));

type Stage = 'group' | 'sub' | 'other' | 'contact' | 'name' | 'checking' | 'matches' | 'done';
const ORDER: Stage[] = ['group', 'sub', 'other', 'contact', 'name', 'checking', 'matches', 'done'];
const reached = (stage: Stage, at: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(at);
// The progress bar's four steps
const PROGRESS: Record<Stage, number> = { group: 1, sub: 2, other: 2, contact: 3, name: 4, checking: 4, matches: 4, done: 5 };

const PAGE = 'web-design' as const;
const step = (name: string, props: Record<string, string | undefined> = {}) => capture('examples_chat_step', { step: name, page: PAGE, ...props });

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

// The card that slides up once they scroll past the hero's question (Cosmo Pools' "Not sure where to start?"), once per visit
const NUDGE_KEY = 'lps_examples_nudge';
const NUDGE_SITES = ['plumber', 'willa', 'pavingpros'];
function Nudge({ blocked, onOpen }: { blocked: boolean; onOpen: () => void }) {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const blockedRef = useRef(blocked);
  blockedRef.current = blocked;

  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {
      /* storage blocked: show it once per page load */
    }
    let done = false;
    const trigger = () => {
      if (done || blockedRef.current) return;
      done = true;
      try {
        sessionStorage.setItem(NUDGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setShow(true);
      capture('examples_nudge', { action: 'shown', page: PAGE });
      cleanup();
    };
    // The hero already asks the question, so the card waits until they've scrolled past it (or 20 seconds)
    const onScroll = () => {
      const pick = document.querySelector('.wx-pick');
      if (pick ? pick.getBoundingClientRect().bottom < 0 : window.scrollY > window.innerHeight) trigger();
    };
    const timer = window.setTimeout(trigger, 20000);
    window.addEventListener('scroll', onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
    return cleanup;
  }, []);

  useEffect(() => {
    if (blocked && show) setShow(false);
  }, [blocked, show]);

  if (!show) return null;
  const hide = (action: 'dismissed' | 'opened') => {
    capture('examples_nudge', { action, page: PAGE });
    if (action === 'opened') {
      setShow(false);
      onOpen();
      return;
    }
    if (reducedMotion()) return setShow(false);
    setClosing(true);
    window.setTimeout(() => setShow(false), 200);
  };
  const sites = NUDGE_SITES.map((s) => SITES[s]).filter(Boolean);

  return (
    <aside className={`wx-nudge${closing ? ' is-closing' : ''}`} aria-label="See websites for businesses like yours">
      <button type="button" className="wx-x wx-nudge-x" aria-label="Close" onClick={() => hide('dismissed')}>
        <X size={18} aria-hidden="true" />
      </button>
      <div className="wx-fan" aria-hidden="true">
        {sites.map((s) => (
          <img key={s.slug} src={s.img} alt="" width={585} height={780} />
        ))}
      </div>
      <div className="wx-nudge-body">
        <p className="wx-nudge-eyebrow">Not sure where to start?</p>
        <p className="wx-nudge-title">See websites for businesses like yours</p>
        <p className="wx-nudge-text">Pick your type of business and we’ll WhatsApp you examples, with prices.</p>
        <button type="button" className="dd-btn dd-btn-primary wx-nudge-btn" onClick={() => hide('opened')}>
          Send me examples
        </button>
        <button type="button" className="wx-nudge-no" onClick={() => hide('dismissed')}>
          No thanks, I’ll look around
        </button>
      </div>
    </aside>
  );
}

// Two small website pictures for a type of business, on its row in the chat
const thumbsFor = (g: Group) => g.sites.map((s) => SITES[s]).filter(Boolean).slice(0, 2);

export default function ExamplesChat() {
  const [open, setOpen] = useState(false);
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
  const logRef = useRef<HTMLDivElement>(null);
  const saveLead = useLeadRecord(PAGE, 'website', 'examples');

  const businessType = group ? [group.label, sub?.label ?? otherText].filter(Boolean).join(' – ') : '';
  const props = () => ({ group: group?.id, sub: sub?.id, from });
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
    notifyStarted(PAGE, 'website', 'examples');
    if (g.subs.length) advance('sub');
    else if (g.id === 'other') advance('other');
    else advance('contact');
  };
  const chooseSub = (s: Sub) => {
    setSub(s);
    step('sub', { group: group?.id, sub: s.id, from });
    advance('contact');
  };

  // Opened from a button, a card or the slide-up card; a card opens straight at its type of business
  useEffect(() => {
    const onOpen = (e: Event) => {
      const o = (e as CustomEvent<OpenOptions>).detail;
      setOpen(true);
      setEverOpened(true);
      setFrom(o.from);
      step('opened', { from: o.from, group: o.group, sub: o.sub });
      const g = o.group ? groupById(o.group) : undefined;
      // Already part-way through: carry on where they were
      if (!g || stage !== 'group') return;
      const s = o.sub ? g.subs.find((x) => x.id === o.sub) : undefined;
      if (!s) return chooseGroup(g, o.from);
      setGroup(g);
      setSub(s);
      step('group', { group: g.id, from: o.from });
      step('sub', { group: g.id, sub: s.id, from: o.from });
      notifyStarted(PAGE, 'website', 'examples');
      advance('contact');
    };
    window.addEventListener(OPEN_EXAMPLES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EXAMPLES_EVENT, onOpen);
  });

  // Keep the newest line in view
  useEffect(() => {
    const el = logRef.current;
    if (!el || !open) return;
    window.requestAnimationFrame(() => el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' }));
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
  const canGoBack = stage === 'sub' || stage === 'other' || stage === 'contact';
  const goBack = () => {
    step('back', { ...props(), at: stage });
    setError('');
    if (stage === 'contact' && group?.subs.length) {
      setSub(null);
      return setStage('sub');
    }
    if (stage === 'contact' && group?.id === 'other') return setStage('other');
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
    advance('contact');
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
    });
    step('requested', props());
    advance('name');
  };

  const lead = () => ({ businessType, contactName: contactName.trim().slice(0, 60), whatsApp: mobile, whatsAppFrom: 'typed' });
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
  const progress = PROGRESS[stage];

  return (
    <>
      <Nudge blocked={everOpened} onOpen={() => openExamplesChat({ from: 'nudge' })} />
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
              <p className="wx-head-sub">500+ websites since 2015</p>
            </div>
            <button type="button" className="wx-icon-btn wx-x" aria-label="Close" onClick={() => setOpen(false)}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="wx-progress" role="progressbar" aria-label="Steps" aria-valuemin={1} aria-valuemax={4} aria-valuenow={Math.min(progress, 4)}>
            {[1, 2, 3, 4].map((n) => (
              <i key={n} className={n <= progress ? 'is-on' : ''} />
            ))}
          </div>

          <div className="wx-log" ref={logRef}>
            <div className="wx-log-start" />
            <Bot>Hi 👋 Let’s find websites like the one you want.</Bot>
            <Bot strong>What type of business do you run?</Bot>
            {stage === 'group' ? (
              <div className="wx-rows">
                {GROUPS.map((g) => {
                  const thumbs = thumbsFor(g);
                  return (
                    <button key={g.id} type="button" className="wx-row-btn" onClick={() => chooseGroup(g)}>
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
            ) : (
              group && <Me>{group.label}</Me>
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

            {group && reached(stage, 'contact') && (
              <>
                {latest('contact') ? (
                  <Typing />
                ) : (
                  <>
                    <Bot>
                      {group.id === 'shop'
                        ? 'Great. We’ll WhatsApp you online shops we’ve made, and how we price them.'
                        : `Great. We’ll WhatsApp you websites we’ve made for ${plural}, with our prices.`}
                    </Bot>
                    <Bot strong>Where should we WhatsApp them?</Bot>
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
                    <Bot>
                      Last one, so we send the closest examples: <strong>what’s your business called?</strong>
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
                      Tyran from our team will WhatsApp you websites for {plural} and our prices on {shownNumber}.
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
                Send me examples
              </button>
              <p className="wx-small">We only use your number to send you the examples and prices.</p>
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
    </>
  );
}
