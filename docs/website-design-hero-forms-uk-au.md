# Website design first screens: UK and Australia (12 Oct 2026)

Why: we are simplifying the first-screen box on `/website-design-package`. South Africa was checked first (none ask for a Google business search first; LoopTech asks "What's your business called?"). This repeats the check for the UK and Australia.

**How it was done**
- Who advertises: Google ads for website design, web design, website designer, web design company, small business website design, website design packages, website design prices / cost, how much does a website cost, and web design + London / Manchester / Sydney / Melbourne. Pulled through DataForSEO (UK: London, Manchester, Birmingham; Australia: Sydney, Melbourne, Brisbane; desktop results, because mobile pulls returned almost no ads) plus live Google UK checks in the browser (`gl=uk&hl=en&pws=0`). From South Africa, the live Google check mixed in SA ads (ours included), so the city pulls are the main source. The Ads Transparency Center wasn't used: the ad pulls already gave each ad's exact landing page.
- Each page is the **exact page the ad links to**, opened directly with tracking removed (no ad was clicked). Where an ad only showed a domain, the homepage was used and that is marked.
- Phone size (375 × 812), non-essential cookies declined where the site allowed it. Nothing was typed into or sent through any competitor form. Later steps of multi-step boxes were read from the page code, not by filling them in.
- Screenshots: `research-private/hero-forms-uk-au/screenshots/` (git-ignored; one folder per company, listed in `screenshot-manifest.json`). Raw notes and ad pulls sit next to them.
- One snapshot from a South African connection, not a full picture of every advertiser. Wolf IQ (a big Sydney advertiser) blocks visitors from outside Australia, so it isn't covered.

## United Kingdom

| Company | Ad page | Headline | Main button | Box on first screen? | First thing asked | Steps | Free offer | Trust line by the button |
|---|---|---|---|---|---|---|---|---|
| Ubie Websites | ubiewebsites.co.uk/website-design-london/ | Website Design in London, from £39 a Month | Book a free call | Yes | Phone **or** email (one box needed) | 1 | Free call | ★★★★★ Rated "Excellent" on Trustpilot & Google |
| DotGO | dotgo.uk/lp-web-design/small-business-websites | Bespoke Web Design for Small UK Businesses | Build My Quote ("Takes 45 sec") | Yes, full-screen quiz | "What are you looking for?" New website / Update my current website | Several, one question per screen | Quote | (none on first screen) |
| Digital Royalty | digitalroyalty.co.uk/lp/cost/ | A small business website, £499. Here's exactly what you get | Get my fixed quote | Yes, starts at the bottom | "What do you need?" New website / Redesign | 3; contact details last (name, business name, email, phone, postcode) | Free quote, "we reply within a few hours" | ★★★★★ 5.0 on Google from 7 reviews (above the button) |
| Adcentric | adcentric.co.uk/ads-web-designer/ | Get Your Free Web Design Quote (the whole screen is the box) | Complete → | Yes | "What's your full name, please?", then email, then "And finally, what's the best phone number?" | 1 (3 boxes) | Free quote, "takes 30 seconds" | "We've built websites for over 300 happy customers" (below) |
| NexQ | nexq.co.uk (homepage) | Your new website. Built and live in 48 hours | Start my 48-hour draft | No; the button opens a separate form page | Step 1 "So we know who to send your draft to": name, phone, email, type of business | 3 (contact → business → website) | 48-hour first draft (50% deposit to start) | "50% deposit to start · UK-based team" |
| Create | createdesigns.co.uk/web-design-agency/ | Website design that fast-tracks growth | Discuss My Project | No (no form on page) | n/a | n/a | None | None |
| Get You Online | getyouonline.co.uk/web-designers/quote | Need A Web Designer? Custom websites from £1,000 | Get A Free Quote + phone number button | No; form far down | Name, email, phone, about your business | 1 | Free quote; free review of your current site | "Rated 5 Stars On Google", 120+ customers (lower down) |
| CreativeWeb | cbwebsitedesign.co.uk/web-design-cost-estimator/ | website design quote uk | (the questions are the button) | Yes, step box | "Do you have a website already?" Yes / No | Several (website → timing → branding → contact) | Cost estimate within 24 hours | 50+ reviews, 5.0 (homepage) |
| Pixel | builtbypixel.com/web-design | Your next web design partner | Discuss your project today | No | n/a | n/a | None | None |
| ModernFlow | modernflow.uk (homepage) | Complete Website Solution, one monthly fee | View Pricing / Learn More | No | n/a | n/a | None | None |

DIY builders and platforms also advertising in the UK: Wix, Fiverr, Lovable, Macaly, Fasthosts, GoDaddy, plus a Forbes "best website builders" list.

## Australia

| Company | Ad page | Headline | Main button | Box on first screen? | First thing asked | Steps | Free offer | Trust line by the button |
|---|---|---|---|---|---|---|---|---|
| Creadiv | creadiv.com.au/free-homepage-concept/ | See your new homepage before you pay a cent | Get my free homepage concept (+ sticky "Call / Get my concept") | Yes, starts at the bottom | Name, business name, email, mobile, then optional: current website, what you do, budget, timing | 1 (8 boxes, 4 optional) | **Free homepage concept in 2 days**, "limited to 8 a month" | 5.0 Google rating · 10+ years · 100% Sydney-based (above the box) |
| Impacto | impactoagency.com.au/offer/web-design/ | See your new homepage. Before you pay a build deposit | Request my homepage concept | No; button jumps to a form at the bottom | Name, email, phone, then: have a website?, website, "Does a A$3,000 build fit your budget?", about your business | 1 | **Free homepage concept**; "2 spots available this month" | ★★★★★ Rated 5 stars on Google (under the button) |
| Hayz | hayz.com.au/lp/website-redesign-melbourne/ | Website redesign in Melbourne. Your old site is costing you customers | (step box) | Yes, starts at the bottom | "What is wrong with your current site?" (4 choices), then your web address, then contact | 3 | Free site review | ★★★★★ 5.0 On Google · 350 projects · 15+ yrs (above the box) |
| Launch North | launchnorth.com.au/go/website-packages | A custom website for your business, at a fixed price | See the packages / Call | No (no form on page) | Pick a package, then "Chris will call you" | n/a | None | "Built by an SEO specialist with 18 years' agency experience" |
| Kyritech | kyritech.com/website-in-7-days/ | Your business website. Live in 7 days. AU$1,990 fixed | **Pay & lock your slot, AU$1,990** | Yes, under the pay button | "Prefer to talk first?": name, email, phone (optional), your business in one line | 1 | None (refund if not a fit) | "Secure checkout · full refund if we're not right for your project" |
| Uniweb | uniwebau.com (homepage) | Custom WordPress Development Services Sydney | Get in Touch / Our Work (+ WhatsApp bubble) | No (no form on page) | n/a | n/a | None | 15+ years · 1,000+ websites · Sydney-based team |
| Noknok | noknokstudios.com (homepage) | A quality website that does your business justice | Start your website / See pricing | No; button opens a step box | "Do you have a website at the moment?" (address, or "we don't have one yet") | 5; contact last | First working version in 3 days; refundable A$500 deposit | Money-back guarantee box |
| Alta Image | altaimage.com.au/web-design-for-small-business/ | Web Design for Small Business, websites from $1,295 | Get a free quote / Call | No | Name, phone, email (popup) | 1 | Free quote | Award winning · 15 years in business (badges) |
| Chromatix | chromatix.com.au (homepage) | Websites that capture your full attention | Watch showreel / Latest client results; sticky "Request a call" | No | n/a | n/a | None | None |

DIY builders and platforms also advertising in Australia: SiteRoot (one box first: "Describe your business… Build my site free", A$15 a month), Lovable, Wix, Crazy Domains, Loro Labs.

## What this means for our page

These are things competitors do, not proof that they work better.

1. **Nobody in the UK or Australia asks visitors to find their business on Google first.** That's 0 of 18 here and 0 in South Africa. Business name is never the very first box either: it sits beside name and phone (Creadiv) or at the end (Digital Royalty, NexQ).
2. **Pages with a box on the first screen open in one of two ways:**
   - **Contact first**: Ubie (phone or email), Adcentric (name, email, phone), NexQ step 1 (name, phone, email: "so we know who to send your draft to"), Kyritech, Creadiv. This is our **option A**.
   - **One easy tap-question first, contact last**: DotGO, Digital Royalty ("What do you need?"), CreativeWeb and Noknok ("Do you have a website?"), Hayz ("What's wrong with your site?"). These questions take one tap, with no typing.
   Nobody does **option B** (type the name, then "Is this you?"). Nobody uses a chat that asks one thing at a time (**option C**). The nearest are the one-question-per-screen quizzes (DotGO, Digital Royalty, Noknok), but those are forms.
3. **Free homepage before you pay is a live offer in Australia**, and it reads almost word for word like ours: Creadiv "See your new homepage before you pay a cent" and Impacto "See your new homepage. Before you pay a build deposit." Both make it scarce ("limited to 8 a month", "2 spots this month"). Both ask for business name on the same form, and Impacto also asks about budget. NexQ (UK) sells a 48-hour draft, but you pay a deposit first.
4. **Patterns worth copying:**
   - The line that says *why* we ask for contact details: NexQ's "So we know who to send your draft to." For us, something like "So we know where to WhatsApp your demo."
   - A time promise on the box: "Takes 30 seconds" (Adcentric), "Takes 45 sec" (DotGO), "Takes about 2 minutes" (Creadiv).
   - Google rating right next to the button: Ubie, Digital Royalty, Impacto, Creadiv, Hayz.
   - Keep the box short: Adcentric's 3 boxes worded as questions, or Ubie's one box.
   - Don't copy the long bottom-of-page forms (Impacto, Get You Online). The ones that put the box on the first phone screen are closer to what we want.

**Verdict: this supports option A.** The closest competitors (NexQ, Creadiv, Adcentric) all ask for name + number first, then the business details. Our Google lookup as step 2 ("Which one is your business?") is something nobody else has. It's fine as a second step, but it shouldn't come back as the first thing visitors see. If A ever needs a challenger, test a one-tap first question (for example "Do you have a website yet? Yes / No") before name + WhatsApp, not option B or C.
