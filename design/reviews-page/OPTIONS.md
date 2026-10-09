# New Google reviews page: choices for Jeremy (9 Oct 2026)

Draft: http://localhost:4321/reviews-new (dev server on port 4321, so the Google search box works).
**Compare everything:** http://localhost:4321/compare-reviews.html: the old page beside the new one, then every choice
as a working version (Phone / Desktop switch at the top).
Code: `src/components/reviews-light/`. Not live: `/reviews` still shows the old dark page.

Built from the 3 to 9 Oct sessions: the homepage hero pattern (literal headline, Google business search box as the
main action), proof early from real client data, the animated WhatsApp phone you kept for this page on 7 Oct, the
shared fit, closing and footer sections, and your rules (no posting frequency, no review-gating wording, "WhatsApp us",
literal copy, phone first).

## Page order

1. Hero: "Get 5-star Google reviews from your customers." + search your business + photo with our 4.7 / 1,491 rating
2. Results: 835 new Google reviews for clients (4.9 average), then the top 5 clients (Mr Bin +84, PETport +63...)
3. Why it matters (cream): your reviews decide who gets the call; Google now recommends from reviews
4. How it works (dark, animated phone): "You send a name. We get the review." in three steps
5. Who it's for: the shared fit section
6. Price: R1,200 a month card, with the R2,500 package beside it
7. Questions: 7 objections
8. Closing card with the dog groomer photo

## Choices (my pick first)

1. **Hero photo** (see `options-hero-photo.jpg`)
   - **A. Owner at his bakkie (in the draft).** Your 7 Oct brief: Coloured South African man in his 30s, navy polo.
   - B. Dog groomer at her counter. Shows it's not only for trades. Used in the closing card for that reason.
   - C. Customer on her couch leaving the review as the van drives off. Tells the story, but the owner isn't in it.
2. **Headline** (see `options-headline.jpg`)
   - **1. "Get 5-star Google reviews from your customers."** (in the draft; "Get" over "More", your 7 Oct call)
   - 2. "Get a Google review from every customer." Stronger promise, shorter.
   - 3. "More 5-star Google reviews, without the awkward ask." Uses your own pitch line ("asking for reviews feels
     awkward") but brings back "More", which you dropped.
3. **Money-back guarantee strip.** A thin line above the menu: "R1,200 a month · Month to month · Money back if no new
   5-star reviews in 30 days". **My pick: add it.** The old live /reviews page leads with the same promise, so it's
   one we already make, and it's the strongest risk-remover we have.
4. **"Why it matters" before or after "How it works".** Now after Results, so the visitor sees it works, then why,
   then how. Alternative: move it straight under the hero.
5. **When you approve:** `/reviews` switches to this page, `/reviews-new` goes, and the old dark page is deleted
   (one change in `App.tsx` and `seo.ts`).

## Review rounds (9 Oct, done without you)

1. Phone: price card for the package broke into a narrow column; fixed. Result numbers now sit side by side.
2. Sales read (your note): price list cut from five system-style lines to four plain benefits.
3. Phone: rating badge hid the phone in his hand; it now sits under the photo on phones.
4. Tracking: the page's sections are counted in PostHog like every other page (automatic).
5. Tap sizes: "WhatsApp us", "See what it costs", "Not on Google?" and "See them on Google" were 21 to 32px tall,
   under the 44px rule. Fixed here and in the shared parts, so the homepage and website page are fixed too.
6. Matched the other session's change: search buttons say "Find my business" everywhere.
7. Added your approved homepage line under "Why it matters": "They check your competitors the same way. Make sure
   you're the one they pick."
8. Fresh-eyes critique (a second reviewer against the design rules and your session notes). Taken: shorter how-it-works
   steps ("after each customer", not "after the job"), shorter "Why it matters" intro, FAQ down to 6, no repeated fit
   subtitle, price button "Start now" like the homepage, "Can't find your business?" instead of "Not on Google yet?",
   "We remind you if you forget to send names" instead of the Friday report. Not taken: badge back over the photo on
   phones (it hid the review on his screen), rewording the shared client rows (you approved them on the homepage).
9. Closing button: it went straight to WhatsApp (like the homepage), so no lead record was made from it. My pick: it
   opens the chat first, which saves the lead. Same choice could apply to the homepage.
10. The draft now shows all my picks by default (guarantee strip on, closing button opens the chat); the comparison
    page shows the versions without them. On a phone the strip shows only "Money back if no new 5-star reviews in
    30 days", so it stays one line.

## One thing outside this page

The review system's notes (social-posting-v2, `features/botpenguin-review-sending.md`) still describe a
"happy / unhappy" question in WhatsApp before the Google link. This page doesn't mention it either way, but if that
step is still on, it's the review gating Google doesn't allow. Worth checking in its own session.
