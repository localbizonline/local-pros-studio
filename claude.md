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

`/lead-partners` (14 Oct 2026, draft) is an unlisted page for Local Pros lead partners moving onto the R2,500 package, linked only from the walkthrough and WhatsApp: noindex, nofollow (`seo.ts` and `public/_headers`), out of the sitemap, and never linked from the menu, footer or other pages. Undecided wording is in `src/components/lead-partners/decisions.ts` and shows as a yellow "To confirm:" highlight until filled in. The swipe deck sent before it is a static file at `/lead-partners/intro` (`public/lead-partners/intro.html`, 16 Oct 2026, copied from the marketing repo's `swipe-page/v4.html`): its own look, noindex, nofollow (meta tag and `public/_headers`), not in `seo.ts` so not in the sitemap. No fixed switch or reply-by dates on either page (16 Oct 2026): lead partners move over one at a time on a start date agreed on WhatsApp, all by March 2027.

`/7-day-website` (15 Oct 2026, `src/components/seven-day-website/`) explains the R9,900 standard website in detail: 4 to 8 pages, a strict 7-day process (day 1 two or three sample designs, days 2–3 we build, days 4–5 the client reviews, day 6 changes, day 7 live), wording written once, then R290 a month for hosting and updates (its own section, #hosting), which covers basic changes after launch at no extra cost (photos, colours, contact details, new wording the client sends); design changes R850 an hour. No email hosting: email stays with the client's own provider (FAQ). Its buttons open the short "start my website" chat (leads show as the website design page, site menu). Not linked from other pages yet.

**Website proposals (16 Oct 2026)** live on their own subdomain, **clients.localpros.co.za**, a separate private project (`../localpros-clients`, GitHub localbizonline/localpros-clients, Cloudflare Worker), not in this public repo. Ashley drafts each proposal in Airtable (New Lead Gen Clients > Website Proposals) and sends its link. The client types their full name to accept, which creates their Lead Gen Partners record. They pay a 50% deposit by PayFast, and the same checkout sets up R290 a month starting one month later. Ashley sets Status to Live on launch day for the balance. The proposal wording mirrors /7-day-website and /website-faq: change them together.

The website design page is `/website-design-package`, `src/components/web-design-light/WebDesignLight.tsx` (light rebuild, 8 Oct 2026), with the shared menu and footer. Since 9 Oct 2026 it is the only one: the old `/web-design` and the Google Ads page `/website-design` redirect to it, and Google Ads visitors see the same page as everyone else (Jeremy's call). Since 13 Oct 2026 the ads land on `/go/website-design`: the same component with `ads` switched on (no menu links, short footer, kept out of Google), so a change to the page shows on both addresses. Chat leads from it are tagged "Website – website design page" in Airtable (page key `website-design`); from `/website-design-package`, "(site menu)". Its hero montage of client sites and example designs is built from `design/web-montage/` (see the README there).

Since 12 Oct 2026 `/website-design-package` has the instant price (Jeremy, after comparing with cosmopools.co.za): "★ 500+ websites built since 2015 / Websites from R6,500. Instant price. Live in 7 days.", an industry picker (`IndustryPicker`, `src/components/web-examples/ExamplesSections.tsx`) and "Instant price" in the menu bar (SiteHeader `cta`). The shared examples chat (`src/components/web-examples/ExamplesChat.tsx`, variant "website-price") asks industry, closest type and how many services, takes name + WhatsApp number (the lead is saved here), shows their price on screen, then asks the business name (Google check, "Is it one of these?" only for close matches). Prices, shown only in the chat (no public table): professional R9,900; online shop from R30,000; everyone else R6,500 for 1–3 services, R9,900 for 4+. They exclude hosting: since 15 Oct 2026 say "then R290 a month for hosting and updates" (from launch). The price section's "Start my website" / "Start the package" open a short chat (name, number, business). Ashley then WhatsApps 3 popular designs and confirms the price (since 15 Oct 2026 Ashley, from her number 078 362 8921, handles every website, reviews and social lead; the chat names Ashley for those and Tyran for the R2,500 package) (alerts via `netlify/functions/demo-lead.mts`, offer "examples"). The homepage shows the same chat as a pop-up (variant "home"); each page's wording lives in `VARIANTS` in ExamplesChat.tsx. Example designs come from `design/web-montage/mock-sites`. The Google search needs `VITE_GOOGLE_MAPS_API_KEY`: set in Netlify, locally in the git-ignored `.env.local`. The key only works on studio.localpros.co.za and `http://localhost:4321`, so run the dev server on port 4321 to test it; anywhere else the chat skips the Google check.

**Category-first ads pages (18 Oct 2026, Jeremy).** Every visitor to `/go/website-design` (where all the ads land) gets the category-first page from the edge function `netlify/edge-functions/ads-split.ts` (it ran as a 50/50 test for its first day; Jeremy then said send everyone; `ADS_GATE_SHARE` below 100 brings the split back) at `/go/websites`: the general page under a pop-up, "What type of business do you run?", with a small "Skip, show me all designs" link under the choices (added 18 Oct 2026 evening after 3 of the first 6 ad visitors left without picking; PostHog event `ads_gate_skip`; it shows the general page behind with every design). Google landing page rating on 18 Oct: average on "website design", "web design" and "website design company", below average on "website designer" and the two Cape Town keywords, seven broad categories (no online shop; it sits under "Something else"; Corporate added as its own on 18 Oct 2026, with its own type buttons and designs, the chat treating it as a professional "Company website", R9,900), then `/go/websites-for/<id>` (trades, local, health, professional, corporate, hospitality, other) with the price, four designs on the first screen, type chips (plumbing, electrical…) and the examples chat opened at their category. Code: `src/components/ads-gate/` (wording in `categories.ts`). The campaign's final URL suffix adds `loc={loc_physical_ms}&kw={keyword}`; `netlify/edge-functions/ads-area.ts` writes "Website designers in Sandton" into the HTML (place names in `netlify/lib/sa-areas.ts`, rebuilt with `scripts/make-sa-areas.py`; an unknown place is left out). Leads are tagged "Website – website design page (category first)" (page key `website-gate`). Netlify `ADS_GATE_SHARE` sets the share sent to the new pages (default 50; 0 stops the test, redeploy needed); `?arm=gate` or `?arm=page` picks a side by hand. Compare against `/go/website-design` on ad visitors, real leads and cost per lead after 3 to 4 weeks. The category pages lead with WhatsApp to Ashley (`AshleyWhatsApp.tsx`: her WhatsApp profile photo, her own number 078 362 8921, "online" Monday to Friday 07:00–18:00 SA time, otherwise "Replies on Monday from 7am" and so on), a bar at the bottom of a phone screen, and "Start my website" (the short chat, keeping their category); no "get designs" buttons there (Jeremy, 18 Oct 2026).

The Google Ads price pages `/prices/website-design` and `/prices/website-design-cost-guide` (11 Oct 2026) were retired on 13 Oct 2026 when every ad moved to `/go/website-design`: both redirect to `/website-design-package` (public/_redirects) and their code was removed (in git history before that date). The named survey of 20 SA web design companies (`research-private/`, git-ignored because the repo is public) stays on this machine.

The same chat opens from buttons on other pages: render `<SiteChat page="join" />` (or `"home"`) once and call `openSiteChat(plan)` from `src/components/demo-popup/openSiteChat.ts` with `package`, `reviews`, `social` or `website`. Every lead is saved to Airtable Sales CRM (Source = Website) by `netlify/functions/demo-lead.mts`: one record per chat, created the moment they select their business in the Google box and updated as they confirm, change it or press send (a rule for every Google business search box, Jeremy, 8 Oct 2026); it writes only where `DEMO_LEAD_LIVE_WRITES=true` (Netlify production) and needs `AIRTABLE_TOKEN`.

**Free demo website, built automatically (11 Oct 2026).** When a visitor who asked for a website (the free demo, or plan `website`, found on Google) presses send, `demo-lead.mts` starts the Claude Code routine `studio-demo-website` (claude.ai/code/routines, on Jeremy's Claude subscription; `netlify/lib/demo.mts`). It follows `docs/DEMO-BUILD.md` in `../site-builder-v3` and publishes `demo-{slug}.emailsync.co.za` (kept out of Google) through the site-builder worker's `/api/demo-publish`, which calls `netlify/functions/demo-ready.mts`: Jeremy and Ashley get a WhatsApp with the link and a "Send it" link (`demo-send.mts`), which WhatsApps the visitor from Ashley's number (078 362 8921, `DEMO_BOT_SESSION_ID` = "ashley" since 15 Oct 2026; the bot there answers only the website leads handed to it, Ashley answers everything else by hand) through the WhatsApp bot service. Nothing goes to the visitor until someone presses Send. Airtable keeps "Demo status", "Demo website" and "Demo requested"; one demo per lead, at most `DEMO_DAILY_CAP` (10) a day. Netlify settings: `DEMO_SECRET` (also a site-builder worker secret), `DEMO_ROUTINE_URL`, `DEMO_ROUTINE_TOKEN` (generated on the routine's edit page; regenerating it breaks this until Netlify has the new one), `DEMO_BOT_URL`, `DEMO_BOT_SECRET`, `DEMO_BOT_SESSION_ID`, `DEMO_DAILY_CAP`.

## Client logos above the footer
The shared footer (`section-library/sections/SiteFooter.tsx`, on every live page) opens with "Trusted by businesses across South Africa": 30 client logos from `src/assets/images/trusted-logos/`, listed in `sections/TrustedLogos.tsx` (added 9 Oct 2026, same section as the join site). They are live clients from SP2 (`organizations.logo_url`, `is_live_client = 1`); Local Pros' own brands and the US client are left out on purpose. To add or swap one, put a trimmed .webp in that folder and edit the lists in `TrustedLogos.tsx`.

## Key Services & Pricing
- **Google reviews**: R1,200/month
- **Social media posting**: R2,000/month
- **R2,500 plan**: reviews + social posting, 6-month commitment; free website on a 12-month commitment
- **Web design** (since 12 Oct 2026): from R6,500 once-off (1–3 services), R9,900 (4+ services or professional), online shops from R30,000; then R290 a month for hosting and updates, first charged one month after the deposit (Jeremy, 16 Oct 2026; was "from launch"; on every website page, the chats and /website-faq; online shops: hosting quoted with the shop). Design changes R850 an hour. The exact price shows only in the examples chat. Free (worth up to R9,900) with the R2,500 package on 12 months.
- **Still open on the website terms page (/website-faq)**: rent to own at R450 a month (not offered on marketing pages; kept on the terms page on purpose, Jeremy, 16 Oct 2026); its changes wording matches the 7-day page since 16 Oct 2026 (7-day build section, basic changes at no extra cost, design changes R850 an hour).

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

**Examples chat leads to Ashley's bot (15 Oct 2026).** An examples-chat lead who wants a website (not reviews, social, the package or a "get started" button; on the homepage only when "What would help most?" is a website) is handed by `demo-lead.mts` (`tellSamplesBot`) to the WhatsApp bot on Ashley's number, playbook `website-samples` (repo lp-studio-whatsapp-inbound, `docs/website-samples-flow.md`). 2 to 5 minutes later, inside 08:00 to 18:00, the bot asks 2 short questions; only when they answer does it pick or build 3 sample designs (cloud routine, `kind: samples`) and send them, clearly marked as samples. The team alert then says "Ashley's bot will WhatsApp them at about …" instead of "WhatsApp them now". Off unless Netlify `SAMPLES_BOT_ON=true`.

