import { SITE_WHATSAPP_URL } from '../../whatsapp';
import { capture } from '../../analytics';
import type { Business } from './googleSearch';

// Opens the site chat (DemoPopup.tsx) from any button, with a plan picked (8 Oct 2026).
// The page must render <SiteChat page="…" /> once. Usage:
//   import { openSiteChat } from '../demo-popup/openSiteChat';
//   <button onClick={() => openSiteChat('package')}>Start now</button>
// Without a chat on the page it falls back to plain WhatsApp, so a button never does nothing.

export type ChatPlan = 'package' | 'reviews' | 'social' | 'website';
// Which page the chat is on: decides the opening lines, the WhatsApp opening and the Airtable note
export type ChatPage = 'website-design' | 'web-design' | 'home' | 'join' | 'reviews';

export const OPEN_CHAT_EVENT = 'lps:open-site-chat';

// Set by SiteChat while it is mounted
export const chatState = { mounted: 0 };

// focusSearch: from a search box (the website page's free demo band); the chat opens with its lines shown at
// once and the cursor in Google's box, so it works like the box they clicked (8 Oct 2026)
// business: picked in a search box on the page (BusinessSearchBox); the chat opens at "Is this your business?" with it
// typeDetails: "Not on Google?" under that box; the chat opens at name, Facebook page or website, and WhatsApp number
export const openSiteChat = (
  plan?: ChatPlan,
  { focusSearch = false, business, typeDetails = false }: { focusSearch?: boolean; business?: Business; typeDetails?: boolean } = {},
) => {
  if (chatState.mounted > 0) {
    window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { plan, focusSearch, business, typeDetails } }));
  } else {
    capture('whatsapp_click', { page: window.location.pathname, from: 'chat_button_without_chat', plan });
    window.open(SITE_WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  }
};
