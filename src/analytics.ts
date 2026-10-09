// Visitor behaviour in PostHog (8 Oct 2026). PostHog itself loads in index.html (project
// "studio.localpros", which also receives www.localpros.co.za: filter by $host). On top of its own
// page views, scroll depth, clicks, heatmaps and recordings, this file adds:
// - whatsapp_click: every WhatsApp button on the site, with the page, section and button text
// - section_viewed: each <section> a visitor actually looked at, and for how many seconds
// - site_chat_* events: sent from demo-popup/DemoPopup.tsx
// Team devices (?team=on, src/teamDevice.ts) carry team_device = true on every event, so they can be filtered out.

import { isTeamDevice } from './teamDevice';

type Props = Record<string, string | number | boolean | undefined>;

export const capture = (event: string, props: Props = {}) => {
  try {
    window.posthog?.capture(event, props);
  } catch {
    /* analytics must never break the page */
  }
};

// Called on every load and after ?team=on / ?team=off
export const markTeamDevice = () => {
  try {
    if (isTeamDevice()) window.posthog?.register({ team_device: true });
    else window.posthog?.unregister('team_device');
  } catch {
    /* ignore */
  }
};

const clean = (text: string | null | undefined, max = 60) => (text || '').replace(/\s+/g, ' ').trim().slice(0, max);

// A section's name: data-section if set, else its first heading, else its id
export const sectionName = (el: Element | null) => {
  const section = el?.closest('section');
  if (!section) return el?.closest('header, nav') ? 'menu' : el?.closest('footer') ? 'footer' : undefined;
  return (
    clean(section.getAttribute('data-section')) ||
    clean(section.querySelector('h1, h2, h3')?.textContent) ||
    clean(section.querySelector('[class*="eyebrow"]')?.textContent) ||
    clean(section.id) ||
    'untitled section'
  );
};

// Every link to wa.me, wherever it is. data-wa-from on the link (or a parent) names special ones.
const onClick = (e: MouseEvent) => {
  const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]');
  if (!link) return;
  capture('whatsapp_click', {
    page: window.location.pathname,
    from: link.closest('[data-wa-from]')?.getAttribute('data-wa-from') || 'button',
    section: sectionName(link),
    button: clean(link.textContent) || clean(link.getAttribute('aria-label')),
  });
};

export const trackWhatsAppClicks = () => {
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
};

// Google Ads conversions (tag AW-18487782572, Website Design account 422-396-2250). The WhatsApp click one is
// set in index.html; this one, "Free demo request - Web Design", counts a site chat lead (demo-popup/DemoPopup.tsx).
export const ADS_FREE_DEMO_LEAD = 'AW-18487782572/LSx5CNXi05YdEKzZ1O9E';

// Once per visit: changing business, later steps and reloads don't count it again
const DEMO_LEAD_KEY = 'lps_ads_demo_lead';
let demoLeadCounted = false;
export const countDemoLead = () => {
  try {
    if (sessionStorage.getItem(DEMO_LEAD_KEY)) return;
    sessionStorage.setItem(DEMO_LEAD_KEY, '1');
  } catch {
    /* storage blocked: at most once per page load */
    if (demoLeadCounted) return;
  }
  demoLeadCounted = true;
  try {
    window.gtag?.('event', 'conversion', { send_to: ADS_FREE_DEMO_LEAD, transport_type: 'beacon' });
  } catch {
    /* analytics must never break the page */
  }
};

// Section views: a section counts once it fills half the screen (or half of itself, if shorter) for
// at least a second. One event per section per page view, sent when it leaves the screen or the page
// closes, with the total seconds it was in view.
const MIN_MS = 1000;

export const trackSectionViews = (page: string) => {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  const visibleSince = new Map<Element, number>();
  const totalMs = new Map<Element, number>();
  const sent = new Set<Element>();
  // Name and place on the page, noted while the section is still on the page
  const meta = new Map<Element, { section?: string; position: number }>();

  const inView = (entry: IntersectionObserverEntry) =>
    entry.isIntersecting &&
    (entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= window.innerHeight * 0.5);

  const pause = (el: Element, now: number) => {
    const since = visibleSince.get(el);
    if (since === undefined) return;
    visibleSince.delete(el);
    totalMs.set(el, (totalMs.get(el) || 0) + now - since);
  };

  const flush = () => {
    const now = performance.now();
    Array.from(visibleSince.keys()).forEach((el) => pause(el, now));
    totalMs.forEach((ms, el) => {
      if (ms < MIN_MS || sent.has(el)) return;
      sent.add(el);
      capture('section_viewed', { page, ...meta.get(el), seconds: Math.round(ms / 100) / 10 });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const now = performance.now();
      entries.forEach((entry) => {
        if (inView(entry)) {
          if (!visibleSince.has(entry.target)) visibleSince.set(entry.target, now);
          if (!meta.has(entry.target)) {
            const position = Array.from(document.querySelectorAll('section')).indexOf(entry.target as HTMLElement) + 1;
            meta.set(entry.target, { section: sectionName(entry.target), position });
          }
        } else {
          pause(entry.target, now);
        }
      });
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  // Pages load in pieces (lazy routes, the chat), so pick up sections added later too
  const observeAll = () => document.querySelectorAll('section').forEach((el) => observer.observe(el));
  observeAll();
  const mutations = new MutationObserver(observeAll);
  const root = document.getElementById('root');
  if (root) mutations.observe(root, { childList: true, subtree: true });

  const onHide = () => document.visibilityState === 'hidden' && flush();
  document.addEventListener('visibilitychange', onHide);
  window.addEventListener('pagehide', flush);

  // Leaving for another page on the site
  return () => {
    flush();
    observer.disconnect();
    mutations.disconnect();
    document.removeEventListener('visibilitychange', onHide);
    window.removeEventListener('pagehide', flush);
  };
};
