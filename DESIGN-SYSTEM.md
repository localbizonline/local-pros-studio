# Local Pros Studio design system

The rulebook for every page on studio.localpros.co.za. Read it before building, rewriting or reviewing a page.
Adapted on 3 October 2026 from what worked on ReachMax (`../ReachMax/DESIGN-PACKAGE.md`, `SITE-OVERHAUL-PRINCIPLES.md`, `SITE-TONE-AND-DESIGN.md`).

Status: direction A ("light and calm") chosen by Jeremy on 5 October 2026 over a cleaned-up dark look (B) and a site-signage look (C). The reference page is `/design-directions/a` (noindex), built from `src/components/design-directions/`. Until a page is rebuilt, it keeps its current look.

## 1. Who the pages are for

- South African service businesses that people have to trust, with a Google Business Profile and customers on WhatsApp (UK later). Trades and home services are one group among several: pet shippers and vets, accountants and attorneys, beauty and fitness, mechanics, driving schools and so on. Write for that situation, not for trades only (Jeremy, 7 October 2026).
- The owner is busy, on a phone, and does not know marketing jargon. They want more work, not "digital presence".
- Name software they actually use (Google Business Profile, WhatsApp, Facebook, Instagram, Xero, Sage). Never US-only tools (Jobber, ServiceM8, HubSpot, Zendesk).

## 2. Positioning and page flow

Learned from aevaai.com (AI phone answering for allied-health clinics), studied on 7 October 2026. Its look is not ours; its positioning, flow and copy are the model for every page. Worked example: `/review-versions/4`.

### The five-second test

Someone who only sees the first screen of the page on a phone must be able to say:

1. **What it is:** the service, in plain words.
2. **Who it is for:** the situation, for example "a business people need to trust, with a Google profile and customers on WhatsApp".
3. **Why it matters to them:** the problem in customers or money, in one line.
4. **What to do next:** one button.

If any of the four needs a scroll or a second read, rewrite the hero before touching anything else.

### Positioning

- **One page sells one thing.** A page selling three services is a menu: send people to each service's own page.
- **Name the service and the customer in the headline.** Aeva: "The Standard for AI Phone Answering in Allied Health." Ours: "More Google reviews for businesses people need to trust."
- **Then the problem in one plain line,** in customers or money. Aeva: "Missed calls mean missed bookings."
- **Speak to the situation, not one industry** (section 1). Focus on one type of business goes on its own page (for example "Google reviews for pet shippers"), linked from a "works well for" list. Aeva links a page per specialty from its footer.
- **Say who it is not for.** An honest "not ideal for" list earns more trust than another claim.

### Page flow

Each section has one job: it answers the next question a buyer has. Use this order and leave out what a page does not need. Add a section outside it only with a reason.

| # | Section | The buyer's question |
|---|---|---|
| 1 | Offer strip (optional): price from, no contract, guarantee, in one line | Is it risky? |
| 2 | Hero: what, who, the problem line, one main button, small print. The right side shows the product or lets them try it | Is this for me? |
| 3 | Works with: the tools they already use, as plain words or real logos | Will it fit how I work? |
| 4 | Proof, early: real name, business, type of business, town and result. Before features, not after | Does it work for people like me? |
| 5 | Why now (optional): what changed, shown with images rather than told | Why bother now? |
| 6 | How it works: three or four numbered steps beside one image, showing how little the owner does | How much work is it for me? |
| 7 | Numbers: a calculator or worked example using their own inputs | Is it worth the money? |
| 8 | Fit: ideal for, not ideal for, and a grouped "works well for" list | Is it really for me? |
| 9 | Price: one card, what is included, the guarantee | What does it cost? |
| 10 | FAQ: the objections, each answered in its first sentence | What could go wrong? |
| 11 | Closing band: one line, one button | Ready? |

### Section rules

- **One headline, one or two sentences, one visual, one button at most.** A section that needs two visuals or six bullets is two sections, or too much.
- **Headlines state the outcome:** "Turn missed calls into new bookings", never "Features" or "Our solution".
- **Three or four items at most** in a list or a row of steps.
- **One button label across the page.** Aeva says "Book A Demo Call" in every section. Ours is "Chat to us on WhatsApp"; a "Try it" button appears only in the hero.
- **Vary the layout** so neighbouring sections look different: text beside an image, then centred, then a dark band. Never three card grids in a row.
- **Leave room.** Generous space between sections (section 4 values) is what makes a page look calm and sure of itself. Never squeeze spacing to fit more in; cut content instead.

### Proof

- **Proof from the same kind of customer beats bigger proof from anyone.** Show name, role, business, town and the result.
- **Short quotes high up** (one line each), longer stories lower down, with the phrase that matters highlighted.
- **Every number has its source beside it,** for example "in 6 weeks at one client's business". No source, no number.
- **Our own result (29 to 789 reviews) shows we use the system ourselves.** Client results still matter more.
- **Never fill proof with invented clients.** Empty slots stay visibly marked as drafts until real ones arrive.

### Make the decision quick

Learned from localpros.co.za/join/reviews-and-social (7 October 2026). Worked example: `/review-versions/home-c`.

- **Answer the price from the first screen.** The second button in the opening section is "See what it costs", and the first section after it ends with the price in one line.
- **Lead with one package.** Single services go in one line of small print under it.
- **Say what we do in two plain sentences,** for example "We'll get you 5-star Google reviews. We'll keep your Facebook and Instagram busy."
- **Explain why it matters with two reasons:** your customers check you first, and so does Google.
- **Keep all the proof in one section:** results before and after, real posts made for clients, our own review count.
- **Put a rating badge on the opening photo,** using real numbers with their source ("789 Google reviews, our own profile").
- **List everything included in the price card,** grouped by service, with what is free and what it is worth.
- **Close with the offer as a checklist** beside the button, and say what the button does: "Opens WhatsApp. A real person replies."
- **Aim for about seven sections.** Merge or cut before adding.

### Objections every FAQ answers

How is this different from doing it myself or using someone else? How much of my time does it take? Can I trust you with my customers? Does it work with what I already use? What happens when something goes wrong? Is there a contract?

### What not to copy from Aeva

Blue gradients, glass panels, cartoon illustrations, carousels and "Read more" toggles that hide the point. The look stays direction A (section 4).

## 3. How a page is built

1. **Start from the page's intent, not the previous version.** Who arrives, what did they search, what do they need to decide? Old copy is reference only: keep facts that are still true.
2. **One search phrase per page, in the H1.** The H1 can be a small line above a bigger value headline. Title about 60 characters, description about 155, both unique, set in `src/seo.ts` (the only place).
3. **Literal headlines.** Say what the service does: "Get more Google reviews after every job." No slogans, no "hell of a lot easier".
4. **Lead with the result the buyer pays for,** then how it works. Name the task: request a review, post a job, rebook a customer.
5. **Show the change with real-looking images.** Jeremy prefers the photographic before/after images on the current homepage (for example our own Google profile, 29 to 789 reviews) over code-built phone and screen mock-ups, which he found looked generated, unreal and repetitive (7 October 2026). Use at most one code-built mock-up on a page, only where an exact interaction needs showing, and never the same kind twice.
6. **Let readers find themselves.** A "Popular with" list of about 20 trades on service pages, plus who it suits less, said once.
7. **Prices live on one page.** Other pages explain the value and link to pricing. (Today prices are repeated in nine files; fix as each page is rebuilt.)
8. **Combine pages that do the same job;** delete review and test pages when a choice is made, with a 301 in `public/_redirects`.

## 4. The look: light and calm

### In five lines

1. A white page with near-black headlines, warm grey body text and one accent: amber.
2. Amber has one job: buttons and the odd highlighted word. Deep brown-amber for small labels, prices and text links.
3. Big, heavy, tight headlines in Bricolage Grotesque over short subtitles; body in Source Sans 3.
4. Real product moments instead of icon grids: a working phone showing the review request, real job photos.
5. Flat surfaces, hairline borders, soft downward shadows, corners of 12 and 16px. No gradients, glows or gradient text.

Three moments break the white on purpose: one dark band for the product demo, warm cream for Jeremy's personal note, and a deep brown closing call-to-action before the dark footer.

### Colour

Use these values only. Anything else on a marketing page is a mistake to fix. Phone and Google mock-ups keep their own real-app colours.

| Role | Value | Use |
|---|---|---|
| Ink | `#1C1917` | headlines, card titles, button text |
| Body | `#44403C` | paragraphs, nav links |
| Muted | `#78716C` | notes, small print |
| Line | `#E7E5E4` | card borders, hairlines between sections |
| Line, strong | `#D6D3D1` | secondary button border |
| Surface | `#FFFFFF` | page and cards |
| Surface, grey | `#FAFAF9` | plan strip, quiet panels |
| Tag | `#F5F5F4` | "Popular with" trade labels |
| Accent | `#F59E0B` | primary buttons, highlight underline |
| Accent, hover | `#FBBF24` | primary button hover; amber text on dark |
| Accent, deep | `#92400E` | eyebrows, prices, text links, focus outline |
| Accent, soft | `#FEF3C7` | price badges |
| Dark | `#1C1917` | product-demo band and footer (text on it `#FAFAF9`, body `#D6D3D1`) |
| Cream | `#FBF6EC` | personal note background; closing button |
| Closing band | `#78350F` | closing call-to-action background (text `#FBF6EC`, body `#F5E6CC`) |

Rules: one accent per element; never amber text on amber; no blue anywhere except inside a Google or WhatsApp mock-up. The logo is red: keep it as it is and let it be the only red on the page.

### Type

Bricolage Grotesque for headings, Source Sans 3 for body and buttons, both already loaded in `index.html`. No other fonts.

| Role | Size | Weight | Spacing | Line height |
|---|---|---|---|---|
| Eyebrow (and keyword H1 line) | 13px, uppercase | 700 | 0.1em | 1.45 |
| Display (hero headline) | `clamp(2.5rem, 5.2vw, 4.25rem)` (68px max, 40px phone) | 800 | -0.03em | 1.04 |
| Section headline | `clamp(2rem, 3.6vw, 2.875rem)` (46px max) | 800 | -0.025em | 1.1 |
| Card title | 22px (20px phone) | 700 | -0.01em | 1.25 |
| Hero subtitle | `clamp(1.125rem, 1.6vw, 1.3125rem)` | 400 | 0 | 1.55 |
| Section subtitle | 19px, max 34em wide | 400 | 0 | 1.55 |
| Body | 18px (17px phone) | 400 | 0 | 1.6 |
| Card body | 17px | 400 | 0 | 1.6 |
| Note | 15px | 400 | 0 | 1.5 |

The hero headline is always the largest text. Headlines max about 17em wide; section heads centred.

### Spacing and shape

| Item | Value |
|---|---|
| Container | 1200px wide, 24px side gutter (20px phone): the only width |
| Section padding | 96px top and bottom (64px phone); quiet sections 72px; closing band 120px (80px phone) |
| Section head to content | 48px |
| Between two light sections | 1px `#E7E5E4` line on top; none after a dark or coloured section |
| Corners | buttons 12px, cards and frames 16px, labels fully round |
| Card shadow | `0 3px 12px rgba(28,25,23,.04)` |
| Photo shadow | `0 18px 40px -24px rgba(28,25,23,.45)` |
| Phone on dark | `0 40px 80px -36px rgba(0,0,0,.7)` |

Buttons never have shadows.

### Buttons and links

| Kind | Use | Style |
|---|---|---|
| Primary | one per section, the main next step | amber `#F59E0B`, ink text, 700, 17px, `14px 24px`, min 52px tall, hover `#FBBF24` |
| Secondary | beside a primary | white, ink text, 1.5px `#D6D3D1` border, border turns ink on hover |
| Header | top right, every page | as primary, 44px tall |
| Closing | on the brown closing band | cream `#FBF6EC`, `#78350F` text, 19px, min 60px tall, hover `#FEF3C7` |
| Text link | inline next step | deep amber, 700, underlined 1.5px, 4px offset |

Focus: a visible 3px outline in deep amber. Hover changes take 0.15s.

### Section patterns

- **Hero:** keyword H1 as a small eyebrow line, big literal headline with one amber-underlined phrase, two-sentence subtitle, primary plus secondary button, one line of small print. Text left, real photo right (stacked on a phone).
- **Product demo:** dark band, code-built phone looping through the real moment, three steps beside it that light up in time.
- **Services:** white cards with title, price badge, two sentences, small print and a text link.
- **Popular with:** about 20 trade labels in soft grey pills, clearly not buttons.
- **Personal note:** cream background, plain text, signature-style name, one button.
- **FAQ:** closed accordions with hairline rules.
- **Closing band:** brown, one headline, one cream button, one line of small print.

Until the homepage is rebuilt, these values live in `src/components/design-directions/directions.css` (on `.dd-a`). The first real rebuild moves them into `tailwind.config.js` as named colours (`ink`, `body`, `accent` and so on) and shared components, so pages use names, never hex codes.

## 5. Visual rules (all directions)

- **One type scale.** Hero headline is the largest text on the page, then section headline, card title, body. Nothing between tiers.
- **Section head:** small uppercase eyebrow, headline, one-sentence subtitle. Centred.
- **One main button per section.** Buttons look like buttons; nothing else does. Tags are clearly labels.
- **One container width,** consistent section padding, a light line only between two light sections.
- **No** emoji, decorative icon grids, glows, blobs, gradient text, glassmorphism, fake browser chrome or stock-looking illustration sets. Functional icons only where they help.
- **Different sections have different jobs.** The personal note from Jeremy looks different from the feature rows; not every section is a card grid.
- **Images:** real job photos, real screenshots and the photographic before/after style of the current homepage first. Code-built mock-ups sparingly (see section 3, point 5). Generated images only when chosen, in one consistent style. Never captions like "illustrative" or "example only".
- **FAQ:** closed accordions, real questions, answer in the first sentence.
- **Motion:** small and functional, respects reduced-motion, never shifts the layout.

## 6. Copy rules

- "We" and "our" always mean Local Pros Studio; "you" and "your" mean the reader.
- Two sentences per paragraph at most. Short lines that start with the words that matter.
- No made-up numbers, no superlatives, no "hidden fees" claims. A figure in a headline needs a source on the page.
- South African English. Confident selling copy; genuine limits once, plainly, in the FAQ.

## 7. Shared parts

Header, footer, WhatsApp button and closing call-to-action are shared components: change once, change everywhere. Page-specific headers (Google Ads landing pages) are the only exception and are listed in `App.tsx` as standalone pages.

## 8. Checking a page before it ships

- The five-second test (section 2) passes on a phone screenshot of the first screen.
- Sections follow the page flow in section 2, and each one has a single job.
- Desktop and phone screenshots, top to bottom. No sideways scroll, tap targets 44px, hero headline within four lines on a phone.
- `npm run build` passes. It pre-builds every page in `src/seo.ts` as real HTML and writes `sitemap.xml`; check the page's title, description and H1 in `dist/`.
- Whole-page read for tone, names, claims and repeated layouts, not just the section that changed.
- Say where it stands: local, committed, pushed, live.

## 9. Logged choices

When Jeremy picks an option (a divider, a section style, a button), record it here with the date so it is reused, not reinvented.

| Date | Choice | Where |
|---|---|---|
| 3 Oct 2026 | Every page gets its own title, description and pre-built HTML from `src/seo.ts` | `scripts/prerender.mjs` |
| 5 Oct 2026 | Direction A, light and calm, for the whole site (over B warm dark and C site signage) | section 4, `/design-directions/a` |
| 7 Oct 2026 | Quick-decision format from localpros.co.za/join: price from the first screen, one package, proof in one place, closing checklist, say what the button does | section 2; /review-versions/home-c |
| 7 Oct 2026 | Positioning and page flow learned from aevaai.com apply to every page: five-second test, one page one thing, proof early, one button label | section 2; /review-versions/4 |
| 7 Oct 2026 | Audience is any trust-based service business with a Google Business Profile and customers on WhatsApp, not only trades | section 1; /review-versions/4 |
| 7 Oct 2026 | Homepage stays as it is: its copy and images beat six rebuilt versions (three review-led, three full-offer). Code-built mock-ups looked generated and repetitive | section 3, point 5; review-led drafts kept at `/review-versions/1-3` for the /reviews rebuild |
