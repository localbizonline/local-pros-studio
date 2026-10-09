import { useEffect, useRef, useState } from 'react';

// Google business search, shared by the site chat (DemoPopup.tsx) and the free demo search pill on the website
// page (../web-design-light/DemoSearchBox.tsx), so both search the same way (9 Oct 2026).

export type Business = {
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

// Public browser key, the same one the join form uses; its website restrictions decide where it works
const MAPS_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();

// Google files many service businesses under a bare "Services"; that says nothing, so leave it out
export const usefulCategory = (label: string) => (/^services?$/i.test(label.trim()) ? '' : label.trim());

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

// Google business search, drawn inside the chat (9 Oct 2026). Google's own box (PlaceAutocompleteElement) opened
// a full-screen search page of its own on phones, which was hard to use inside the chat (Jeremy). This uses the same
// Places API (New) data with our own box and list: type, see up to five matches, tap one.
// pureServiceAreaBusinessesIncluded keeps businesses that hide their address (most trades, and Local Pros Studio
// itself) in the results. One session token per search, ended by the pick, so Google bills it as one session.
export type Suggestion = { id: string; main: string; secondary: string; prediction: any };
const PLACE_FIELDS = ['id', 'displayName', 'isPureServiceAreaBusiness', 'formattedAddress', 'nationalPhoneNumber', 'websiteURI', 'rating', 'userRatingCount', 'primaryType', 'primaryTypeDisplayName', 'googleMapsURI'];

export const useGoogleSearch = (enabled: boolean, onPick: (b: Business) => void) => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'fetching' | 'failed'>('loading');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const places = useRef<any>(null);
  const token = useRef<any>(null);
  const version = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // The name we put in the box after a pick: not a new search
  const picked = useRef('');
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  useEffect(() => {
    if (!enabled || places.current) return;
    if (!MAPS_KEY) {
      setStatus('failed');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await loadMaps();
        const lib = await (window as any).google.maps.importLibrary('places');
        if (cancelled) return;
        places.current = lib;
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('failed');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  // Ask Google a moment after they stop typing
  useEffect(() => {
    const input = query.trim();
    if (query === picked.current) return;
    picked.current = '';
    const mine = ++version.current;
    if (!places.current || input.length < 2) {
      setSuggestions([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const { AutocompleteSuggestion, AutocompleteSessionToken } = places.current;
        token.current ??= new AutocompleteSessionToken();
        const { suggestions: found } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input,
          includedRegionCodes: ['za'],
          pureServiceAreaBusinessesIncluded: true,
          sessionToken: token.current,
        });
        if (mine !== version.current) return;
        setSuggestions(
          (found as any[])
            .map((x) => x.placePrediction)
            .filter(Boolean)
            .slice(0, 5)
            .map((p) => ({ id: p.placeId, main: p.mainText?.text || p.text?.text || '', secondary: p.secondaryText?.text || '', prediction: p })),
        );
      } catch (err) {
        if (mine !== version.current) return;
        setSuggestions([]);
        // Key refused (wrong website) or the API is down: fall back to typed details
        if (/REQUEST_DENIED|PERMISSION|referer|API key|403/i.test(String((err as Error)?.message || err))) setStatus('failed');
      } finally {
        if (mine === version.current) setSearching(false);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query, status]);

  const pick = async (s: Suggestion) => {
    const mine = ++version.current;
    setStatus('fetching');
    setSuggestions([]);
    picked.current = s.main;
    setQuery(s.main);
    try {
      const place = s.prediction.toPlace();
      await place.fetchFields({ fields: PLACE_FIELDS });
      token.current = null; // the pick ends Google's search session
      if (mine !== version.current) return;
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
      if (mine === version.current) setStatus('ready');
    }
  };

  const clear = () => {
    version.current++;
    picked.current = '';
    setQuery('');
    setSuggestions([]);
    setSearching(false);
  };
  // Puts the cursor in the search box, so the visitor can type straight away
  const focus = () => inputRef.current?.focus();
  // Shows a business picked elsewhere (the page's search box) in this box, without searching again
  const showPicked = (name: string) => {
    picked.current = name;
    setQuery(name);
  };
  return { status, query, setQuery, suggestions, searching, pick, clear, focus, inputRef, showPicked };
};
