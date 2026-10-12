import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { GROUPS, SITES, groupById, sitesFor, type Group, type Site, type Sub } from './catalogue';
import { MAPS_KEY, searchGoogle, type Business } from '../demo-popup/googleSearch';
import { notifyStarted, useLeadRecord } from '../demo-popup/DemoPopup';
import { capture } from '../../analytics';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';

// "Websites for businesses like yours" chat (draft, 12 Oct 2026, Jeremy). Replaces "find your business on Google"
// as the first step: the visitor taps their type of business, sees websites we made for that kind of business
// with the price, then gives their business name (we look it up on Google behind the scenes and only ask
// "Is it one of these?" when there are close matches) and the WhatsApp number we send more examples to.
// The team sends the examples by hand (alert to Jeremy and Ashley, netlify/functions/demo-lead.mts, offer "examples").
// Leads follow the Google box rule: one Airtable record, created when they pick their business on Google (or
// give their number), then updated. Every step is counted in PostHog (examples_chat_step) to see where people leave.
// Look and pop-up from cosmopools.co.za: a card slides up from the bottom after a few seconds, once per visit.

export const OPEN_EXAMPLES_EVENT = 'lps:open-examples-chat';

type OpenOptions = { group?: string; sub?: string; site?: string; from: string };
export const openExamplesChat = (opts: OpenOptions) => window.dispatchEvent(new CustomEvent(OPEN_EXAMPLES_EVENT, { detail: opts }));

type Stage = 'group' | 'sub' | 'other' | 'examples' | 'checking' | 'matches' | 'contact' | 'done';
const ORDER: Stage[] = ['group', 'sub', 'other', 'examples', 'checking', 'matches', 'contact', 'done'];
const reached = (stage: Stage, at: Stage) => ORDER.indexOf(stage) >= ORDER.indexOf(at);

const PAGE = 'web-design' as const;
const step = (name: string, props: Record<string, string | undefined> = {}) => capture('examples_chat_step', { step: name, page: PAGE, ...props });

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

function Bot({ children }: { children: ReactNode }) {
  return <div className="wx-bot">{children}</div>;
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

// The card that slides up after a few seconds (Cosmo Pools' "Not sure where to start?"), once per visit
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
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.35) trigger();
    };
    const timer = window.setTimeout(trigger, 8000);
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
        <p className="wx-nudge-text">Pick your type of business and see examples, with prices.</p>
        <button type="button" className="dd-btn dd-btn-primary wx-nudge-btn" onClick={() => hide('opened')}>
          Show me examples
        </button>
        <button type="button" className="wx-nudge-no" onClick={() => hide('dismissed')}>
          No thanks, I’ll look around
        </button>
      </div>
    </aside>
  );
}

export default function ExamplesChat() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [stage, setStage] = useState<Stage>('group');
  const [typing, setTyping] = useState(false);
  const [group, setGroup] = useState<Group | null>(null);
  const [sub, setSub] = useState<Sub | null>(null);
  const [firstSite, setFirstSite] = useState<string | undefined>();
  const [otherText, setOtherText] = useState('');
  const [otherDraft, setOtherDraft] = useState('');
  const [bizDraft, setBizDraft] = useState('');
  const [bizName, setBizName] = useState('');
  const [matches, setMatches] = useState<Business[]>([]);
  const [picked, setPicked] = useState<Business | 'none' | null>(null);
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [from, setFrom] = useState('');
  const logRef = useRef<HTMLDivElement>(null);
  const examplesRef = useRef<HTMLDivElement>(null);
  const saveLead = useLeadRecord(PAGE, 'website', 'examples');

  const businessType = group ? [group.label, sub?.label ?? otherText].filter(Boolean).join(' – ') : '';
  const props = () => ({ group: group?.id, sub: sub?.id, from });

  // A short "typing" pause before each new bot line, so it reads like a conversation
  const advance = (next: Stage) => {
    setStage(next);
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
    else advance('examples');
  };
  const chooseSub = (s: Sub) => {
    setSub(s);
    step('sub', { group: group?.id, sub: s.id, from });
    advance('examples');
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
      if (!g || (group && stage !== 'group')) return;
      setFirstSite(o.site);
      if (o.sub) {
        const s = g.subs.find((x) => x.id === o.sub) ?? null;
        setGroup(g);
        setSub(s);
        step('group', { group: g.id, from: o.from });
        if (s) step('sub', { group: g.id, sub: s.id, from: o.from });
        notifyStarted(PAGE, 'website', 'examples');
        advance(s || !g.subs.length ? 'examples' : 'sub');
      } else chooseGroup(g, o.from);
    };
    window.addEventListener(OPEN_EXAMPLES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EXAMPLES_EVENT, onOpen);
  });

  useEffect(() => {
    if (stage === 'examples') step('examples_seen', props());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Keep the newest line in view; when the examples arrive, start them at the top so the pictures are seen
  useEffect(() => {
    const el = logRef.current;
    if (!el || !open) return;
    const behavior = reducedMotion() ? 'auto' : 'smooth';
    window.requestAnimationFrame(() => {
      const ex = examplesRef.current;
      if (stage === 'examples' && !typing && ex) el.scrollTo({ top: ex.offsetTop - 12, behavior });
      else el.scrollTo({ top: el.scrollHeight, behavior });
    });
  }, [stage, typing, open, matches.length, error]);

  // Escape closes; the page behind doesn't scroll while the chat is open on a phone
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

  const restart = () => {
    setStage('group');
    setGroup(null);
    setSub(null);
    setFirstSite(undefined);
    setOtherText('');
    setBizName('');
    setMatches([]);
    setPicked(null);
    setError('');
    step('restart', props());
  };

  const submitOther = (e: FormEvent) => {
    e.preventDefault();
    const t = otherDraft.trim();
    if (!t) return;
    setOtherText(t.slice(0, 80));
    step('other_typed', { group: group?.id, from });
    advance('examples');
  };

  // Their business name: look it up on Google and only ask "Is it one of these?" when something is close
  const submitName = async (e: FormEvent) => {
    e.preventDefault();
    const name = bizDraft.trim();
    if (name.length < 2) return;
    setBizName(name);
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
    advance(close.length ? 'matches' : 'contact');
  };

  const pickMatch = (b: Business | 'none') => {
    setPicked(b);
    if (b === 'none') step('none_of_these', props());
    else {
      step('match_picked', props());
      saveLead(['picked'], { mode: 'google', ...b, businessType });
    }
    advance('contact');
  };

  const submitContact = (e: FormEvent) => {
    e.preventDefault();
    const mobile = mobileOf(number);
    if (!mobile) {
      setError('Enter a South African cellphone number, like 082 123 4567.');
      return;
    }
    setError('');
    const who = contactName.trim().slice(0, 60);
    const business = picked && picked !== 'none' ? { mode: 'google', ...picked } : { mode: 'manual', name: bizName };
    saveLead(picked && picked !== 'none' ? ['number', 'requested'] : ['typed', 'number', 'requested'], {
      ...business,
      businessType,
      contactName: who,
      whatsApp: mobile,
      whatsAppFrom: 'typed',
    });
    step('requested', props());
    advance('done');
  };

  const sites = group ? sitesFor(group, sub ?? undefined, firstSite) : [];
  const plural = sub?.plural ?? (group?.id === 'shop' ? 'online shops' : group?.id === 'other' ? 'businesses like yours' : group?.label.toLowerCase());
  const latest = (s: Stage) => stage === s && typing;
  const shownNumber = mobileOf(number).replace(/^(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3');

  return (
    <>
      <Nudge blocked={everOpened} onOpen={() => openExamplesChat({ from: 'nudge' })} />
      {open && <div className="wx-backdrop" onClick={() => setOpen(false)} />}
      {open && (
      <div className="wx-sheet" role="dialog" aria-modal="true" aria-label="Websites for businesses like yours">
        <div className="wx-head">
          <div>
            <p className="wx-head-title">Websites like yours</p>
            <p className="wx-head-sub">500+ websites since 2015</p>
          </div>
          {stage !== 'group' && stage !== 'done' && (
            <button type="button" className="wx-restart" onClick={restart}>
              Start again
            </button>
          )}
          <button type="button" className="wx-x" aria-label="Close" onClick={() => setOpen(false)}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="wx-log" ref={logRef}>
          <Bot>To show you websites and prices for your kind of business: what type of business do you run?</Bot>
          {stage === 'group' ? (
            <div className="wx-chips is-groups">
              {GROUPS.map((g) => (
                <button key={g.id} type="button" className="wx-chip" onClick={() => chooseGroup(g)}>
                  <strong>{g.label}</strong>
                  <span>{g.hint}</span>
                </button>
              ))}
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
                  <Bot>Which is closest?</Bot>
                  {stage === 'sub' ? (
                    <div className="wx-chips">
                      {group.subs.map((s) => (
                        <button key={s.id} type="button" className="wx-chip is-small" onClick={() => chooseSub(s)}>
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
            <>
              {latest('other') ? (
                <Typing />
              ) : (
                <>
                  <Bot>What does your business do?</Bot>
                  {stage === 'other' ? (
                    <form className="wx-form wx-inline" onSubmit={submitOther}>
                      <input className="wx-input" value={otherDraft} onChange={(e) => setOtherDraft(e.target.value)} placeholder="Upholstery and curtains" aria-label="What your business does" autoFocus />
                      <button type="submit" className="dd-btn dd-btn-primary wx-go">
                        Next
                      </button>
                    </form>
                  ) : (
                    <Me>{otherText}</Me>
                  )}
                </>
              )}
            </>
          )}

          {group && reached(stage, 'examples') && (
            <>
              {latest('examples') ? (
                <Typing />
              ) : (
                <>
                  <div ref={examplesRef}>
                    <Bot>Here are websites we’ve made for {plural}:</Bot>
                  </div>
                  <div className="wx-row">
                    {sites.map((s) => (
                      <SiteCard key={s.slug} site={s} small />
                    ))}
                  </div>
                  {/* Prices as on the live pages (R9,900 once-off, rent to own R450 a month) */}
                  <Bot>
                    {group.id === 'shop' ? (
                      <>Online shops are quoted separately: tell us what you sell and roughly how many products.</>
                    ) : (
                      <>
                        Websites like these: <strong>R9,900</strong> once-off, or <strong>R450 a month</strong> on rent to own. Wording, photos, hosting and changes included.
                      </>
                    )}
                  </Bot>
                  <Bot>Want more examples and our prices on WhatsApp? First, what’s your business called?</Bot>
                  {stage === 'examples' ? (
                    <form className="wx-form wx-inline" onSubmit={submitName}>
                      <input
                        className="wx-input"
                        value={bizDraft}
                        onChange={(e) => setBizDraft(e.target.value)}
                        placeholder="Your business name"
                        aria-label="Your business name"
                        autoComplete="organization"
                        enterKeyHint="next"
                      />
                      <button type="submit" className="dd-btn dd-btn-primary wx-go">
                        Next
                      </button>
                    </form>
                  ) : (
                    <Me>{bizName}</Me>
                  )}
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
                  <Bot>Is it one of these?</Bot>
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
                    <Me>{picked && picked !== 'none' ? picked.name : 'None of these'}</Me>
                  )}
                </>
              )}
            </>
          )}

          {reached(stage, 'contact') && (
            <>
              {latest('contact') ? (
                <Typing />
              ) : (
                <>
                  <Bot>Where should we WhatsApp the examples and prices?</Bot>
                  {stage === 'contact' ? (
                    <form className="wx-form" onSubmit={submitContact} noValidate>
                      <label className="wx-label">
                        Your name
                        <input className="wx-input" value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Thabo" autoComplete="given-name" />
                      </label>
                      <label className="wx-label">
                        WhatsApp number
                        <span className="wx-phone">
                          <span className="wx-cc" aria-hidden="true">
                            +27
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
                        Send me the examples
                      </button>
                      <p className="wx-small">We only use your number to send you the examples and prices.</p>
                    </form>
                  ) : (
                    <Me>Send me the examples</Me>
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
                <Bot>
                  Thanks{contactName.trim() ? ` ${contactName.trim().split(' ')[0]}` : ''}. Tyran from our team will WhatsApp you on {shownNumber} with websites for {plural} and our prices.
                </Bot>
                <Bot>
                  Rather talk now?{' '}
                  <a href={whatsAppLink(WHATSAPP_MESSAGES.webDesign)} target="_blank" rel="noopener noreferrer" className="wdl-inline-link" onClick={() => step('whatsapp_now', props())}>
                    WhatsApp us
                  </a>
                </Bot>
                <button type="button" className="dd-btn dd-btn-secondary wx-close" onClick={() => setOpen(false)}>
                  Back to the page
                </button>
              </>
            ))}
        </div>
      </div>
      )}
    </>
  );
}
