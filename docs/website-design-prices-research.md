# Website design prices page: search intent research

Checked 11 October 2026 for `/prices/website-design` (`src/components/website-prices/`), the landing page of the Google Ads price campaign.

## Why the page exists

The website design campaign (launched 9 Oct 2026) sent price searches ("website design cost", "website design prices/packages", "web design prices") to `/website-design-package`. That page opens with the free demo, and its prices are far down.
7 of the first 12 clicks were price searches. PostHog showed ad visitors leaving in 3 to 40 seconds on a phone without tapping anything. On 11 Oct the price keywords were paused; a separate price campaign will land here.

## Search volume (Keywords Everywhere, monthly)

South Africa, CPC in rand:

| Keyword | Volume | CPC | Competition |
|---|---|---|---|
| website design prices / cost, web design prices / cost | 480 (one shared pool, not 4 x 480) | R8.76 | 0.36 |
| website design prices south africa | 390 | R10.90 | 0.20 |
| website cost south africa | 210 | R9.91 | 0.44 |
| website design packages | 170 | R11.89 | 0.11 |
| cost of a website / website price | 140 each | R11.07 / R8.43 | |
| how much does a website cost | 110 | R8.59 | |
| how much does a website cost in south africa | 90 | R5.29 | |
| web design packages | 90 | R8.09 | |
| cheap website design south africa / affordable website design | 90 each | about R20 | |
| website development cost / how much is a website | 70 each | | |

In total about 1,500 to 2,000 price searches a month in SA, mostly R5 to R12 a click. "Cheap" and "affordable" cost about R20 a click and attract the wrong buyer for a R9,900 site.
UK: "website design prices/cost" 880 (£2.02), "how much does a website cost" 720 (£1.41), "website design cost uk" 590; roughly twice SA volume.

## What they want to know (ranked)

1. How much does a website cost? (often "for 5 pages")
2. What is included: domain, hosting, email, SSL, SEO?
3. Once-off or monthly? What do I pay after year one?
4. Do I own the website and the domain if I leave?
5. How long does it take?
6. Why do quotes range from R1,500 to R40,000+?
7. Cheap options, Wix or a free builder instead?
8. Can I add pages or a shop later, and what does that cost?
9. Is there a payment plan?
10. Can I edit it myself? Is SEO included?

## What competitors show (SA price pages, 11 Oct 2026)

| Site | Prices | Monthly after | Notes |
|---|---|---|---|
| creativewebsitedesign.co.za | R2,950 (3 pages), R4,950 (7), R7,950 (12) | R150 to R250 from year 2 | Extra pages R450 each; shop from R12,000; 50/50 payment; price on first screen |
| designcorp.co.za | R1,400 (1 page) to R7,500 (15+) | R85 to R395 from year 2 | Year 1 includes domain, hosting, email; trust stats on first screen |
| webluno.co.za | R2,500 (1 page), R4,500 (5), R9,500 (10) | not shown | Only 3 months of hosting included |
| dalkom.co.za | R2,500 (5 pages), R5,000 (10), shop R6,500 | "contact us" | "From R2,500 once-off" in the hero |
| gwebdesign.co.za | R4,500 (3 pages) to R10,000 (10) | not priced | Shops R7,000 to R15,000 |
| webpartner.co.za | R299 to R699 a month | month to month | Agency owns the design on the cheapest plan; updates R500 an hour |

Price bands quoted by SA guides: cheap template R1,500 to R5,000 (sowebsites.co.za, Apr 2026); small business R8,000 to R15,000 (sowebsites) or R7,500 to R20,000 (Procompare 2026); custom R20,000 to R60,000; pay-monthly R299 to R799.

## Worries

1. Costs after year one: "free" hosting and domain often end after 12 months (or 3), and renewal prices are hidden.
2. Ownership and lock-in: developers holding the domain or code; agencies owning the design on monthly plans (MyBroadband threads).
3. The huge price spread and cheap reused templates.
4. Extras that creep in: pages, wording, photos, shop, SEO.
5. Slow delivery that depends on the client sending content.
6. DIY or pay someone: Wix is fine for simple sites, but owners rarely finish them.

Gap: Reddit was blocked for the research tool, so forum points come from MyBroadband and agency pages only.

## What the page does with it

- First phone screen: all three ways to pay with their rand amounts, including the monthly fee, then "WhatsApp us for a quote" and "Get a free demo first". Under the buttons: live in 7 days, domain in your business's name, hosting R290 a month from day one (answers worries 1, 2 and 5).
- "What's in the price, and what costs extra": everything included, and the four things that cost extra (over 10 pages, shop or bookings, big changes, business email).
- "Why not a cheaper website?": builder, cheap template and us compared. Only one outside figure, the template range seen on SA price pages, with its source under the table. R9,900 sits above the R2,500 to R7,950 package crowd, so the comparison shows what the extra pays for (wording, pages per service, hosting, changes, ownership).
- Proof: 500+ websites since 2015, six real client sites, 4.7 stars from 1,400+ Google reviews (Local Pros profile).
- FAQ: the ranked questions above, each answered in its first sentence.

## For the Google Ads build (Google Ads repo)

Leave "cheap" and "affordable" out of the price campaign, or bid them low: a R9,900 site is not what those searchers want.
Rent to own (R450 x 24 = R10,800, hosting included) costs less over two years than paying once (R9,900 + R290 x 24 = R16,860). Price shoppers who do the sum will notice; the page does not show the sum.
