import { useEffect, useRef, useState } from 'react';
import { MousePointer2, Search } from 'lucide-react';
import { openSiteChat, type ChatPage } from '../demo-popup/openSiteChat';
import { useGoogleSearch } from '../demo-popup/googleSearch';
import { notifyStarted } from '../demo-popup/DemoPopup';
import { GoogleG } from './ClientReviews';
import './demo-search-box.css';

// The free demo search box (8 Oct 2026): looks like Google's search box, with a floating pointer and note as on
// the ReachMax homepage (DemoClickGuide.astro). Used in the free demo band and the opening section.
// Since 9 Oct 2026 it is a real search (Jeremy): they type here, Google's matches drop down under the box, and
// picking one opens the site chat at "Is this your business?" with it selected (the chat saves the lead then).
// If Google search isn't available here, the button opens the chat, which has the typed-details fallback.
const chatPage = (): ChatPage => (typeof window !== 'undefined' && window.location.pathname === '/web-design' ? 'web-design' : 'website-design');

export default function DemoSearchBox({ onOpen, note = "Try it, it's free!" }: { onOpen?: () => void; note?: string }) {
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
    openSiteChat(undefined, { business });
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
      notifyStarted(chatPage());
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
      openSiteChat(undefined, { focusSearch: true });
      return;
    }
    inputRef.current?.focus();
  };

  const showList = listOpen && suggestions.length > 0;
  return (
    <div className="fd-search-wrap" ref={wrapRef}>
      <div className="fd-search ds-live" onClick={() => inputRef.current?.focus()}>
        <GoogleG size={22} />
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
          aria-label="Search your business name to get a free demo"
          role="combobox"
          aria-expanded={showList}
          aria-controls="ds-matches"
          aria-autocomplete="list"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <button type="button" className="fd-search-btn" onClick={go}>
          <Search size={18} aria-hidden="true" />
          Build my demo
        </button>
      </div>

      {showList && (
        <div className="ds-list">
          <ul id="ds-matches" role="listbox" aria-label="Businesses on Google">
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
        <p className="ds-hint">No match on Google. Try your business name and town, or tap Build my demo.</p>
      )}
      {status === 'fetching' && <p className="ds-hint">Opening your demo chat…</p>}

      {!listOpen && (
        <span className="fd-guide" aria-hidden="true">
          <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
          <span className="fd-guide-label">{note}</span>
        </span>
      )}
    </div>
  );
}
