// One WhatsApp first message per door, so every chat can be counted by where it came from
// (Q4 2026 pilot plan). The WhatsApp bot and the weekly scoreboard match on these exact
// openings: change them together. Other doors (/join, Meta ads, broadcast, referrals,
// outreach) set their own messages outside this site.
export const WHATSAPP_NUMBER = '27832336716';

export const WHATSAPP_MESSAGES = {
  googleAds: "Hi, I'm interested in a website", // the old Google Ads page /website-design (until 9 Oct 2026)
  webDesign: "Hi, I'd like a quote for a website", // /website-design-package
  site: "Hi, I'd like to know more about Local Pros Studio", // every other page
} as const;

export const whatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const SITE_WHATSAPP_URL = whatsAppLink(WHATSAPP_MESSAGES.site);

// For shared parts of the site (header, footer, floating button) that appear on several doors
export const whatsAppUrlForPath = (pathname: string) => {
  if (pathname === '/website-design-package') return whatsAppLink(WHATSAPP_MESSAGES.webDesign);
  return SITE_WHATSAPP_URL;
};
