# Local Pros Studio - Reputation & Social Media

## Project Overview
A React/TypeScript marketing website for Local Pros Studio, focused on reputation management services (review collection and social media posting) for South African contractors.

## Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Deployment**: Netlify

## Project Structure
```
src/
├── App.tsx            # Navigation, routes, PageMeta (per-page search tags)
├── seo.ts             # Every page's title, description and canonical: the only place
├── entry-server.tsx   # Build-time render used by scripts/prerender.mjs
├── whatsapp.ts        # WhatsApp number and first message per door
├── components/        # One file per page plus shared Footer, MobileCTA, ScrollToTop
│   ├── design-directions/  # Noindex reference page for the chosen look (/design-directions/a)
│   ├── review-versions/    # Draft switcher: noindex drafts at /review-versions/<id>
│   ├── section-library/    # Sections Jeremy picked, as shared components (/review-versions/sections)
│   └── join-light/         # Join page draft (/review-versions/join), built from the library
└── assets/images/
scripts/prerender.mjs  # Saves each page in seo.ts as finished HTML, writes sitemap.xml and robots.txt
```

## Routes
Routes live in `src/App.tsx`. Every public route needs an entry in `src/seo.ts`, or it ships with the homepage's title and is kept out of Google. The old `/autopilot` and `/special-offer-bundle` pages were retired on 9 Oct 2026 and redirect to `/pricing`.

The website design page is `/website-design-package`, `src/components/web-design-light/WebDesignLight.tsx` (light rebuild, 8 Oct 2026), with the shared menu and footer. Since 9 Oct 2026 it is the only one: the old `/web-design` and the Google Ads page `/website-design` redirect to it, and Google Ads visitors see the same page as everyone else (Jeremy's call). Its hero montage of client sites and example designs is built from `design/web-montage/` (see the README there).

Since 12 Oct 2026 `/website-design-package` is "examples first": the hero asks "What type of business do you run?" (7 industries, `src/components/web-examples/catalogue.ts`) and the shared examples chat (`src/components/web-examples/ExamplesChat.tsx`, full screen, Jeremy's mock-up E) asks the closest type, their name and WhatsApp number (the lead is saved here) and their business name, checked on Google behind the scenes ("Is it one of these?" only for close matches). Tyran then WhatsApps 3 popular designs for their industry with our prices (alert to Jeremy and Ashley, offer "examples" in `netlify/functions/demo-lead.mts`). No free demo and no examples inside the chat (Jeremy). The same chat runs on the homepage as a Cosmo Pools style pop-up (variant "home": an extra "What would help most?" step, "our work" wording); each page's wording lives in `VARIANTS` in ExamplesChat.tsx. Example designs for the cards come from `design/web-montage/mock-sites` (see the README there). The Google search needs `VITE_GOOGLE_MAPS_API_KEY`: set in Netlify, locally in the git-ignored `.env.local`. The key only works on studio.localpros.co.za and `http://localhost:4321`, so run the dev server on port 4321 to test it; anywhere else the chat skips the Google check.

`/prices/website-design` (`src/components/website-prices/`, 11 Oct 2026) is the website design price page, the landing page of the Google Ads price campaign: the three ways to pay on the first phone screen, what costs extra, a comparison, price questions. Its address must start with `/pric` (Google Ads audience "Studio - Price page visitors (180d)"). It sends PostHog `price_page_viewed` and marks visitors `price_intent` (src/analytics.ts); chat leads are tagged "website design prices page" in Airtable. Since 11 Oct 2026 Google Ads tests it against `/prices/website-design-cost-guide` (`src/components/website-cost-guide/`): what 20 SA web design companies charge, worked out in `costGuideStats.ts` from `priceSurvey.ts`. The named survey (`research-private/`, git-ignored because the repo is public) stays on this machine.

The same chat opens from buttons on other pages: render `<SiteChat page="join" />` (or `"home"`) once and call `openSiteChat(plan)` from `src/components/demo-popup/openSiteChat.ts` with `package`, `reviews`, `social` or `website`. Every lead is saved to Airtable Sales CRM (Source = Website) by `netlify/functions/demo-lead.mts`: one record per chat, created the moment they select their business in the Google box and updated as they confirm, change it or press send (a rule for every Google business search box, Jeremy, 8 Oct 2026); it writes only where `DEMO_LEAD_LIVE_WRITES=true` (Netlify production) and needs `AIRTABLE_TOKEN`.

**Free demo website, built automatically (11 Oct 2026).** When a visitor who asked for a website (the free demo, or plan `website`, found on Google) presses send, `demo-lead.mts` starts the Claude Code routine `studio-demo-website` (claude.ai/code/routines, on Jeremy's Claude subscription; `netlify/lib/demo.mts`). It follows `docs/DEMO-BUILD.md` in `../site-builder-v3` and publishes `demo-{slug}.emailsync.co.za` (kept out of Google) through the site-builder worker's `/api/demo-publish`, which calls `netlify/functions/demo-ready.mts`: Jeremy and Ashley get a WhatsApp with the link and a "Send it" link (`demo-send.mts`), which WhatsApps the visitor from the sales number (072 703 3269, the bot speaks as Tyran) through the WhatsApp bot service. Nothing goes to the visitor until someone presses Send. Airtable keeps "Demo status", "Demo website" and "Demo requested"; one demo per lead, at most `DEMO_DAILY_CAP` (10) a day. Netlify settings: `DEMO_SECRET` (also a site-builder worker secret), `DEMO_ROUTINE_URL`, `DEMO_ROUTINE_TOKEN` (generated on the routine's edit page; regenerating it breaks this until Netlify has the new one), `DEMO_BOT_URL`, `DEMO_BOT_SECRET`, `DEMO_BOT_SESSION_ID`, `DEMO_DAILY_CAP`.

## Key Services & Pricing
- **Google reviews**: R1,200/month
- **Social media posting**: R2,000/month
- **R2,500 plan**: reviews + social posting, 6-month commitment; free website on a 12-month commitment
- **Web design**: R9,900 once-off, including the first 12 months of hosting and changes ("worth R3,000", 11 Oct 2026); rent to own R450 a month for 36 months. The monthly fee after year one (R290) appears only on the website terms page (/website-faq), not on marketing pages (Jeremy's call)

Check the live pages before quoting a price; prices are still repeated across several page files.

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Design System
Read `DESIGN-SYSTEM.md` before building, rewriting or reviewing any page. It holds the positioning and page-flow rules (section 2, learned from aevaai.com on 7 October 2026: start every page there), the chosen look (direction A, "light and calm", picked 5 October 2026), the page-building rules and the pre-ship checks.

Pages not yet rebuilt still use the older dark, gradient-heavy styles in `src/index.css` and `tailwind.config.js`. Do not copy those patterns into new work.

## Reviews: no gating
Every customer gets the same Google review link. Never write or show that unhappy customers are sent to a private form or filtered before Google (DESIGN-SYSTEM.md section 6). Google does not allow it.

## WhatsApp Contact
Primary CTA links to: `wa.me/27832336716`

## Related Projects
- Original full-service site: `../localprosstudio`
