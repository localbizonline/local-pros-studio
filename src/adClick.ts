// Which Google Ads click brought this visitor (15 Oct 2026), so a lead can be tied to the ad lead by lead.
// Google's auto-tagging adds gclid (or gbraid/wbraid on iOS) to every ad landing URL; utm_ tags come from
// the campaigns' final URL suffix when one is set. Remembered for 30 days (Google Ads' own click window):
// a visitor who clicks an ad today and comes back tomorrow to leave their number still came from the ad.
// A newer ad click replaces an older one. Sent with every site chat save (demo-popup/DemoPopup.tsx) and
// stored on the Airtable lead by netlify/functions/demo-lead.mts ("From Google Ads", "Ad click details").

const KEY = 'lps_ad_click';
const DAYS = 30;
const PARAMS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export type AdClick = Partial<Record<(typeof PARAMS)[number], string>>;

const fromUrl = (search: string): AdClick => {
  const params = new URLSearchParams(search);
  const click: AdClick = {};
  for (const name of PARAMS) {
    const value = params.get(name)?.trim();
    if (value) click[name] = value.slice(0, 200);
  }
  return click;
};

// Called once on every page load (src/main.tsx). Only a landing URL with tags changes what is kept.
export const rememberAdClick = () => {
  try {
    const click = fromUrl(window.location.search);
    if (Object.keys(click).length === 0) return;
    localStorage.setItem(KEY, JSON.stringify({ click, at: Date.now() }));
  } catch {
    /* storage blocked: the lead is saved without it */
  }
};

// The remembered click, or undefined when there is none or it is older than 30 days
export const adClick = (): AdClick | undefined => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null') as { click?: AdClick; at?: number } | null;
    if (!saved?.click || !saved.at || Date.now() - saved.at > DAYS * 86_400_000) return undefined;
    return saved.click;
  } catch {
    return undefined;
  }
};
