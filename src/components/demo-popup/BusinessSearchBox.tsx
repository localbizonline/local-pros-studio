import { useEffect, useRef, useState } from 'react';
import { MousePointer2, Search } from 'lucide-react';
import { openSiteChat, type ChatPage, type ChatPlan } from './openSiteChat';
import { useGoogleSearch } from './googleSearch';
import { notifyStarted } from './DemoPopup';
import './business-search-box.css';

// A Google business search box on the page itself (9 Oct 2026, Jeremy): they type here, Google's matches drop
// down under the box, and picking one opens the site chat at "Is this your business?" with it selected (the chat
// saves the lead then, the rule for every Google box). The page must render <SiteChat page="…" /> too.
// Used by the website page's free demo box (../web-design-light/DemoSearchBox.tsx) and the homepage hero.
// If Google search isn't available, the button opens the chat, which has the typed-details fallback.

// Google's "G", the same mark as the website page's reviews (../web-design-light/ClientReviews.tsx)
const GoogleG = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

export default function BusinessSearchBox({
  page,
  plan,
  buttonLabel,
  note,
  onOpen,
}: {
  page: ChatPage;
  // The chat that opens: a plan's "Let's get … started", or the free demo when left out
  plan?: ChatPlan;
  buttonLabel: string;
  // The floating pointer's note under the box; leave out for no pointer
  note?: string;
  onOpen?: () => void;
}) {
  // Google's script loads the first time they touch the box, not on every page view
  const [active, setActive] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { status, query, setQuery, suggestions, searching, pick, clear, inputRef } = useGoogleSearch(active, (business) => {
    onOpen?.();
    inputRef.current?.blur();
    setListOpen(false);
    clear();
    openSiteChat(plan, { business });
  });

  useEffect(() => setHighlight(0), [suggestions]);

  // Close the list when they tap elsewhere on the page
  useEffect(() => {
    if (!listOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setListOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [listOpen]);

  const start = () => {
    if (!active) {
      setActive(true);
      notifyStarted(page, plan);
    }
    setListOpen(true);
    // On a phone, lift the box to the top of the screen so the matches show above the keyboard
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.setTimeout(() => {
        const box = wrapRef.current;
        if (box) window.scrollTo({ top: window.scrollY + box.getBoundingClientRect().top - 84, behavior: 'smooth' });
      }, 250);
    }
  };

  // The button: pick the top match, or open the chat when there is nothing to pick (or no Google search here)
  const go = () => {
    if (suggestions[highlight]) return pick(suggestions[highlight]);
    if (status === 'failed' || query.trim().length >= 3) {
      onOpen?.();
      openSiteChat(plan, { focusSearch: true });
      return;
    }
    inputRef.current?.focus();
  };

  const showList = listOpen && suggestions.length > 0;
  return (
    <div className={`fd-search-wrap bsb${note ? ' has-note' : ''}`} ref={wrapRef}>
      {/* The box, its matches and the pointer, measured from the box (the Facebook link sits below) */}
      <div className="bsb-anchor">
      <div className="fd-search ds-live" onClick={() => inputRef.current?.focus()}>
        <GoogleG />
        <input
          ref={inputRef}
          className="ds-input"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setListOpen(true);
          }}
          onFocus={start}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlight((h) => Math.max(h - 1, 0));
            } else if (e.key === 'Enter') {
              e.preventDefault();
              go();
            } else if (e.key === 'Escape') {
              setListOpen(false);
            }
          }}
          placeholder="Search your business name"
          aria-label={`Search your business name: ${buttonLabel}`}
          role="combobox"
          aria-expanded={showList}
          aria-controls={`bsb-matches-${page}`}
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <button type="button" className="fd-search-btn" onClick={go}>
          <Search size={18} aria-hidden="true" />
          {buttonLabel}
        </button>
      </div>

      {showList && (
        <div className="ds-list">
          <ul id={`bsb-matches-${page}`} role="listbox" aria-label="Businesses on Google">
            {suggestions.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={i === highlight}
                  className={i === highlight ? 'is-on' : ''}
                  // Keep the keyboard open until the tap lands
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(s)}
                >
                  <span className="ds-main">{s.main}</span>
                  {s.secondary && <span className="ds-sub">{s.secondary}</span>}
                </button>
              </li>
            ))}
          </ul>
          <p className="ds-credit">Results from Google Maps</p>
        </div>
      )}
      {listOpen && !showList && searching && <p className="ds-hint">Searching Google…</p>}
      {listOpen && !showList && !searching && status === 'ready' && query.trim().length >= 3 && (
        <p className="ds-hint">No match on Google. Try your business name and town, or tap {buttonLabel}.</p>
      )}
      {status === 'fetching' && <p className="ds-hint">Opening the chat…</p>}

      {note && !listOpen && (
        <span className="fd-guide" aria-hidden="true">
          <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
          <span className="fd-guide-label">{note}</span>
        </span>
      )}
      </div>

      <button
        type="button"
        className="bsb-fb"
        onClick={() => {
          onOpen?.();
          notifyStarted(page, plan);
          openSiteChat(plan, { typeDetails: true });
        }}
      >
        {/* Short beside the pointer's note, which sits under the right of the box */}
        {note ? 'Not on Google? Use Facebook' : 'Not on Google? Use your Facebook page instead'}
      </button>
    </div>
  );
}
