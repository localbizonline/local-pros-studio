# New Google reviews page: choices for Jeremy (9 Oct 2026)

**Decided and live on /reviews (9 Oct 2026, Jeremy: "go").** All my picks went live: photo A, headline 1, the
guarantee strip, the closing button opening the chat. The option versions and compare-reviews.html were removed;
the old dark page was deleted and /reviews-new redirects to /reviews. The record below is kept for reference.

Live: https://studio.localpros.co.za/reviews. Code: `src/components/reviews-light/`.

Built from the 3 to 9 Oct sessions: the homepage hero pattern (literal headline, Google business search box as the
main action), proof early from real client data, the animated WhatsApp phone you kept for this page on 7 Oct, the
shared fit, closing and footer sections, and your rules (no posting frequency, no review-gating wording, "WhatsApp us",
literal copy, phone first).

## Page order

1. Hero: "Get 5-star Google reviews from your customers." + search your business + photo with our 4.7 / 1,491 rating
1b. What we do (cream, added 9 Oct at your request): "We get your customers to leave you Google reviews." in three plain
   lines, beside the WhatsApp-to-Google picture from the homepage
2. Results: 835 new Google reviews for clients (4.9 average), then the top 5 clients (Mr Bin +84, PETport +63...)
3. Why it matters (cream): your reviews decide who gets the call; Google now recommends from reviews
4. How it works (dark, animated phone): now "See what your customer gets", so it shows the moment rather than repeating What we do
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
11. Production build check: headings in order (one H1), every image described, the pre-built page arrives styled.
    First load is about 2.5 MB, but about 1.6 MB of it is Google's tags and PostHog on every page (the homepage is
    the same, 2.6 MB). The page's own code and pictures are small. Worth a separate look site-wide: load the Google
    tags after the page is up.
12. Your note: a clear "What we do" under the hero. Added: "We get your customers to leave you Google reviews. You send
    us a customer's name and number. We do the rest:" then three ticks (we WhatsApp them in your business name, one tap
    to your Google profile, we remind them and tell you when each review comes in), beside the homepage's
    WhatsApp-to-Google picture. The dark animated section became "See what your customer gets" so the two don't repeat.

## One thing outside this page

**Checked 9 Oct (read only): the "happy / unhappy" question before the Google link is still live.** Last 14 days:
153 customers answered "happy" (88 then clicked the Google link), 2 answered "unhappy" (none clicked), 93 didn't
answer (5 clicked). That is the review gating Google doesn't allow, and it can get a client's reviews removed.

This page never mentions a filter, and it says an unhappy customer can reply and the owner hears straight away, which
is true. The animated phone shows the link in the first message, which is how it should work once the step is removed.
Fixing it belongs in the review system (social-posting-v2): there's a ready task "Remove the happy/unhappy step before
the Google link" waiting for you in the app.
