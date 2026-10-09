import { useEffect, useRef, useState } from 'react';

// Google business search, shared by the site chat (DemoPopup.tsx) and the search boxes on the pages
// (BusinessSearchBox.tsx), so every box searches the same way (9 Oct 2026).

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

// Each match shows its phone number under the name, so owners can tell which one is theirs (Jeremy, 9 Oct 2026:
// the names alone, with a town, made it hard to know which to pick). The list comes from Google's Text Search
// (Places API New, REST): one request each time they pause typing, up to five businesses with everything the chat
// needs, so picking one needs no second request. Phone numbers are in Google's dearest price band.
// Until 9 Oct 2026 this used Maps JavaScript's Autocomplete (names and towns only), and before that Google's own
// box (PlaceAutocompleteElement), which opened a full-screen search page of its own on phones.
// REST, not Maps JavaScript's Place.searchByText: only REST can include businesses that hide their address
// (includePureServiceAreaBusinesses), which most trades and Local Pros Studio itself do. South Africa only.
const FIELDS = [
  'id',
  'displayName',
  'pureServiceAreaBusiness',
  'formattedAddress',
  'nationalPhoneNumber',
  'websiteUri',
  'rating',
  'userRatingCount',
  'primaryTypeDisplayName',
  'googleMapsUri',
]
  .map((f) => `places.${f}`)
  .join(',');
const SOUTH_AFRICA = { rectangle: { low: { latitude: -34.9, longitude: 16.4 }, high: { latitude: -22.1, longitude: 32.95 } } };

const searchGoogle = async (textQuery: string): Promise<Business[]> => {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': MAPS_KEY, 'X-Goog-FieldMask': FIELDS },
    body: JSON.stringify({ textQuery, includePureServiceAreaBusinesses: true, pageSize: 5, regionCode: 'za', locationRestriction: SOUTH_AFRICA }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.status || `HTTP ${res.status}`);
  return ((data.places || []) as any[]).map((p) => ({
    placeId: p.id || '',
    name: p.displayName?.text || '',
    address: p.formattedAddress || '',
    hiddenAddress: p.pureServiceAreaBusiness === true,
    mapsUri: p.googleMapsUri || '',
    category: usefulCategory(p.primaryTypeDisplayName?.text || ''),
    website: p.websiteUri || '',
    phone: p.nationalPhoneNumber || '',
    rating: typeof p.rating === 'number' ? p.rating : null,
    reviewCount: typeof p.userRatingCount === 'number' ? p.userRatingCount : null,
  }));
};

// secondary: the line under the name in the list, the phone number
export type Suggestion = { id: string; main: string; secondary: string; business: Business };

export const useGoogleSearch = (enabled: boolean, onPick: (b: Business) => void) => {
  // No key (or the key refused on this website): the boxes fall back to typed details
  const [status, setStatus] = useState<'ready' | 'failed'>(MAPS_KEY ? 'ready' : 'failed');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searching, setSearching] = useState(false);
  const version = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  // The name we put in the box after a pick: not a new search
  const picked = useRef('');
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  // Ask Google a moment after they stop typing
  useEffect(() => {
    const input = query.trim();
    if (query === picked.current) return;
    picked.current = '';
    const mine = ++version.current;
    if (!enabled || status === 'failed' || input.length < 2) {
      setSuggestions([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = window.setTimeout(async () => {
      try {
        const found = await searchGoogle(input);
        if (mine !== version.current) return;
        setSuggestions(
          found.map((b) => ({ id: b.placeId, main: b.name, secondary: b.phone ? `📞 ${b.phone}` : 'No phone number on Google', business: b })),
        );
      } catch (err) {
        if (mine !== version.current) return;
        setSuggestions([]);
        // Key refused (wrong website) or the API is down: fall back to typed details
        if (/REQUEST_DENIED|PERMISSION|API_KEY|403/i.test(String((err as Error)?.message || err))) setStatus('failed');
      } finally {
        if (mine === version.current) setSearching(false);
      }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [query, status, enabled]);

  // Google already sent everything with the list, so a pick is instant
  const pick = (s: Suggestion) => {
    version.current++;
    setSuggestions([]);
    picked.current = s.main;
    setQuery(s.main);
    onPickRef.current(s.business);
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
