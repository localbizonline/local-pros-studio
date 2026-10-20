// A WhatsApp chat started from a Google ad is the Website Design account's conversion (Jeremy, 20 Oct 2026:
// "track the actual conversation start as the conversion not just the tap"). When a visitor who came from an
// ad (src/adClick.ts) taps a link to Ashley's number, a short ref goes on the end of their first message,
// "(ref K7Q2M)", and netlify/functions/wa-tap.mts hands the ref and Google's click id to the WhatsApp bot. When
// that message reaches Ashley's number, the bot tells Google Ads the chat started (lp-studio-whatsapp-inbound,
// services/ad-chat-start.ts). The tap itself stays a secondary conversion (index.html).

import { adClick } from './adClick';
import { ASHLEY_WHATSAPP_NUMBER } from './whatsapp';

const KEY = 'lps_wa_ref';
// No 0/O, 1/I/L: easy to read back from a chat
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const REF_IN_TEXT = /\s*\(ref [A-Z0-9]{5}\)$/;

const newRef = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return [...bytes].map((b) => ALPHABET[b % ALPHABET.length]).join('');
};

// One ref per visit, so several taps (or buttons) are one chat
const visitRef = () => {
  try {
    const kept = sessionStorage.getItem(KEY);
    if (kept) return kept;
    const ref = newRef();
    sessionStorage.setItem(KEY, ref);
    return ref;
  } catch {
    return newRef();
  }
};

const sent = new Set<string>();

const onClick = (e: MouseEvent) => {
  const link = (e.target as Element | null)?.closest?.(`a[href*="wa.me/${ASHLEY_WHATSAPP_NUMBER}"]`) as HTMLAnchorElement | null;
  if (!link) return;
  const click = adClick();
  if (!click?.gclid && !click?.gbraid && !click?.wbraid) return;
  const ref = visitRef();
  try {
    // Changed before the browser follows the link, so WhatsApp opens with the ref in the message
    const url = new URL(link.href);
    const text = (url.searchParams.get('text') || '').replace(REF_IN_TEXT, '');
    // encodeURIComponent, not searchParams.set: WhatsApp should get %20 for spaces, as whatsAppLink() writes them
    link.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(`${text} (ref ${ref})`.trim())}`;
  } catch {
    return;
  }
  if (sent.has(ref)) return;
  sent.add(ref);
  const body = JSON.stringify({ ref, gclid: click.gclid, gbraid: click.gbraid, wbraid: click.wbraid, page: window.location.pathname });
  try {
    if (!navigator.sendBeacon?.('/.netlify/functions/wa-tap', new Blob([body], { type: 'application/json' }))) {
      void fetch('/.netlify/functions/wa-tap', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => undefined);
    }
  } catch {
    /* the chat still counts as a tap */
  }
};

// Called once on load (src/main.tsx). Capture phase: before any link's own handler and before the browser opens it.
export const tagAdWhatsAppTaps = () => {
  document.addEventListener('click', onClick, true);
};
