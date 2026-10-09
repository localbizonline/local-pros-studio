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

`/website-design-package` also has the "free demo website" chat (`src/components/demo-popup/`): the visitor finds their business on Google (same key as the localpros.co.za/join form; since 9 Oct 2026 every match shows its phone number, from Google's Text Search, `demo-popup/googleSearch.ts`) and WhatsApp opens with their details. It needs `VITE_GOOGLE_MAPS_API_KEY`: set in Netlify, locally in the git-ignored `.env.local`. The key only works on studio.localpros.co.za and `http://localhost:4321`, so run the dev server on port 4321 to test it; anywhere else the popup falls back to typed boxes.

The same chat opens from buttons on other pages: render `<SiteChat page="join" />` (or `"home"`, `"web-design"`) once and call `openSiteChat(plan)` from `src/components/demo-popup/openSiteChat.ts` with `package`, `reviews`, `social` or `website`. Every lead is saved to Airtable Sales CRM (Source = Website) by `netlify/functions/demo-lead.mts`: one record per chat, created the moment they select their business in the Google box and updated as they confirm, change it or press send (a rule for every Google business search box, Jeremy, 8 Oct 2026); it writes only where `DEMO_LEAD_LIVE_WRITES=true` (Netlify production) and needs `AIRTABLE_TOKEN`.

## Key Services & Pricing
- **Google reviews**: R1,200/month
- **Social media posting**: R2,000/month
- **R2,500 plan**: reviews + social posting, 6-month commitment; free website on a 12-month commitment
- **Web design**: R9,900 once-off

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
