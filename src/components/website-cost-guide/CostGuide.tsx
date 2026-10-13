import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import '../design-directions/directions.css';
import '../website-prices/websiteprices.css';
import './costguide.css';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../../whatsapp';
import { trackPriceIntent } from '../../analytics';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import SiteChat from '../demo-popup/DemoPopup';
import { Buttons, Facts, FaqItem, makeTrack, Montage, PriceClosing, PriceList, Rating } from '../website-prices/parts';
import { SURVEY_DATE } from './priceSurvey';
import {
  BUCKET_LABEL,
  BUCKETS,
  FIXED_TERM,
  INCLUDES,
  MONTHLY,
  MONTHLY_STATS,
  monthlyBucket,
  ONCE_OFF,
  RENEWAL_RANGE,
  RENEWAL_SHOWN,
  rand,
  SHOP_STATS,
  TOTAL,
} from './costGuideStats';

// Website design cost guide (11 Oct 2026), /prices/website-design-cost-guide. Jeremy's idea: many price searches
// ("how much does a website cost", "website design cost") want to understand what websites cost in general, not
// only our price. So this page leads with what 20 South African web design companies charge, how we found it, and
// what to ask before paying, then where we sit. Google Ads splits the price campaign's traffic between this page and
// /prices/website-design to see which brings more WhatsApps and demo requests.
// Same format idea as the localpros.co.za /cost/ guides (heading, headline range, sections, FAQ), plus what those
// lack: a price table, charts, a "how we got these numbers" box and the date checked.
// Every market figure comes from costGuideStats.ts. Company names are not shown on purpose.

const track = makeTrack('wcg');

const B1 = BUCKETS[0];
const B5 = BUCKETS[1];
const B10 = BUCKETS[2];
const M5 = monthlyBucket('5');
const M10 = monthlyBucket('10');
const WORDING = INCLUDES.find((i) => i.label.startsWith('The wording'))?.n ?? 0;

// The chart's scale: R0 to just above the dearest package, in R2,000 steps
const CHART_MAX = Math.ceil(Math.max(...BUCKETS.map((b) => b.max)) / 2000) * 2000;
const at = (price: number) => `${(price / CHART_MAX) * 100}%`;
const TICKS = Array.from({ length: CHART_MAX / 4000 + 1 }, (_, i) => i * 4000);
const OUR_PRICE = 9900;

const QUESTIONS = [
  { q: 'What do I pay after the first year?', a: 'Ask for the monthly or yearly hosting and domain price in rand, in writing.' },
  { q: 'Who writes the wording?', a: 'Most packages expect you to send it. Writing 5 to 10 pages yourself takes days.' },
  { q: 'How many pages, and what does an extra one cost?', a: 'A page per service and per area is what helps you show up on Google.' },
  { q: 'Who owns the website and the domain?', a: 'The domain should be in your business’s name. On some monthly plans the company keeps the website.' },
  { q: 'What do changes cost after launch?', a: 'Prices, photos and services change. Ask what a small change costs and how fast it is done.' },
  { q: 'Is there a contract, and what if I cancel?', a: 'Some monthly plans run for 24 months and charge most of what is left if you leave early.' },
];

const FAQ: { q: string; a: string; link?: boolean }[] = [
  {
    q: 'How much does a website cost in South Africa?',
    a: `Of the ${TOTAL} companies we checked, a one-page website cost ${rand(B1.min)} to ${rand(B1.max)} once-off. About 5 pages cost ${rand(B5.median)} in the middle, and about 10 pages ${rand(B10.median)}. Pay-monthly websites cost ${rand(MONTHLY_STATS.min)} to ${rand(MONTHLY_STATS.max)} a month.`,
  },
  {
    q: 'Why do website prices vary so much?',
    a: 'The number of pages, who writes the wording, whether hosting is included after year one, and how much design work goes in. A cheap package often leaves the wording, photos and later changes to you.',
  },
  {
    q: 'What do I pay after the first year?',
    a: `Most companies include the domain and hosting for year one, but only ${RENEWAL_SHOWN} of the ${ONCE_OFF.length} with once-off prices show what it costs after that. Where shown, it was ${rand(RENEWAL_RANGE.min)} to ${rand(RENEWAL_RANGE.max)} a month.`,
  },
  {
    q: 'Is a pay-monthly website cheaper?',
    a: `It is cheaper to start, at ${rand(MONTHLY_STATS.min)} to ${rand(MONTHLY_STATS.max)} a month with little or nothing upfront. Over two or three years it often costs more than paying once, and on some plans the company keeps the website.`,
  },
  {
    q: 'How much does an online shop cost?',
    a: `Shops started at ${rand(SHOP_STATS.min)} to ${rand(SHOP_STATS.max)} once-off across ${SHOP_STATS.count} companies, ${rand(SHOP_STATS.median)} in the middle. The product list, payments and delivery options drive the price.`,
  },
  {
    q: 'What does a website cost with Local Pros Studio?',
    a: 'R9,900 once-off, including the first 12 months of hosting and changes (worth R3,000), or R450 a month for 36 months with nothing upfront. It is free with our R2,500 a month Google reviews and social media package on a 12-month commitment.',
  },
  {
    q: 'Who owns the website and the domain with you?',
    a: 'The domain is always registered for your business. The website is yours from launch if you pay once, after your 36th payment on rent to own, or after 12 months on the package.',
    link: true,
  },
];

// One row of the chart: a dot per company, the middle price marked, and our price on the 10-page row
function ChartRow({ b }: { b: (typeof BUCKETS)[number] }) {
  const ours = b.bucket === '10';
  return (
    <div className="cg-row">
      <p className="cg-row-label">
        <strong>{BUCKET_LABEL[b.bucket]}</strong>
        <span>
          {b.count} companies, middle {rand(b.median)}
        </span>
      </p>
      <div className="cg-track" aria-hidden="true">
        <span className="cg-range" style={{ left: at(b.min), width: `calc(${at(b.max)} - ${at(b.min)})` }} />
        {b.prices.map((p, i) => (
          <span key={i} className="cg-dot" style={{ left: at(p) }} />
        ))}
        <span className="cg-median" style={{ left: at(b.median) }} />
        {ours && <span className="cg-us-mark" style={{ left: at(OUR_PRICE) }} />}
      </div>
    </div>
  );
}

export default function CostGuide() {
  const WA_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

  useEffect(() => trackPriceIntent('/prices/website-design-cost-guide'), []);

  return (
    <div className="dd dd-a wdl wp cg">
      <SiteHeader minimal whatsAppUrl={WA_URL} />

      <main>
        {/* HERO: the answer first, as the middle price for each size, with the date and the number of companies */}
        <section className="dd-hero wp-hero">
          <div className="dd-container wp-hero-in">
            <h1 className="dd-kw">How much does a website cost in South Africa?</h1>
            <p className="dd-display wp-display cg-display">
              Website design prices, <span className="wp-u">compared</span>
            </p>
            <p className="dd-lede wp-lede">
              What {TOTAL} South African web design companies charge, from their own price pages on {SURVEY_DATE}.
            </p>
            <div className="cg-short">
              <p className="cg-short-label">Once-off, in the middle</p>
              <ul>
                {BUCKETS.map((b) => (
                  <li key={b.bucket}>
                    <span>{BUCKET_LABEL[b.bucket]}</span>
                    <strong>{rand(b.median)}</strong>
                  </li>
                ))}
                <li>
                  <span>Pay monthly</span>
                  <strong>
                    {rand(MONTHLY_STATS.min)} to {rand(MONTHLY_STATS.max)}
                    <small> a month</small>
                  </strong>
                </li>
              </ul>
            </div>
            <Buttons waUrl={WA_URL} track={track} />
            <p className="cg-jump">
              <a href="#ours" className="wp-link" onClick={() => track('hero_our_prices')}>
                See what we charge
              </a>
              <a href="#method" className="wp-link" onClick={() => track('hero_method')}>
                How we got these numbers
              </a>
            </p>
          </div>
        </section>

        {/* THE PRICES: one dot per company for each size, the middle marked, then the same numbers as a table */}
        <section className="dd-sec cg-prices" id="prices">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Once-off prices</p>
              <h2 className="dd-h2">What a website costs, by size</h2>
              <p className="dd-sub">Each dot is one company’s package. The black line is the middle price: half charge less, half charge more.</p>
            </div>
            <div className="cg-chart">
              {BUCKETS.map((b) => (
                <ChartRow key={b.bucket} b={b} />
              ))}
              <div className="cg-axis" aria-hidden="true">
                {TICKS.map((t) => (
                  <span key={t} style={{ left: at(t) }}>
                    {t === 0 ? 'R0' : `R${t / 1000}k`}
                  </span>
                ))}
              </div>
              <p className="cg-legend">
                <span>
                  <span className="cg-key cg-key-dot" /> A company
                </span>
                <span>
                  <span className="cg-key cg-key-median" /> Middle price
                </span>
                <span>
                  <span className="cg-key cg-key-ours" /> Local Pros Studio, R9,900 for up to 10 pages
                </span>
              </p>
            </div>
            <table className="cg-table">
              <thead>
                <tr>
                  <th scope="col">Size</th>
                  <th scope="col">Companies</th>
                  <th scope="col">Middle</th>
                  <th scope="col">Range</th>
                </tr>
              </thead>
              <tbody>
                {BUCKETS.map((b) => (
                  <tr key={b.bucket}>
                    <th scope="row">{BUCKET_LABEL[b.bucket]}</th>
                    <td>{b.count}</td>
                    <td>{rand(b.median)}</td>
                    <td>
                      {rand(b.min)} to {rand(b.max)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Online shop</th>
                  <td>{SHOP_STATS.count}</td>
                  <td>{rand(SHOP_STATS.median)}</td>
                  <td>
                    {rand(SHOP_STATS.min)} to {rand(SHOP_STATS.max)}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="wp-compare-note">“About 5 pages” is 3 to 7 pages, “about 10 pages” 8 to 12. Prices as shown on each page; most don’t say whether VAT is included.</p>
          </div>
        </section>

        {/* AFTER YEAR ONE: what's included, and the cost most pages leave out */}
        <section className="dd-sec cg-incl">
          <div className="dd-container cg-split">
            <div>
              <p className="dd-eyebrow">What’s included</p>
              <h2 className="dd-h2 cg-left-h2">The first year is covered. After that, few say.</h2>
              <p className="cg-p">
                Of the {ONCE_OFF.length} companies with once-off prices, most include the domain for year one. Only {RENEWAL_SHOWN} show
                what hosting costs after that: {rand(RENEWAL_RANGE.min)} to {rand(RENEWAL_RANGE.max)} a month where shown.
              </p>
              <p className="cg-p">
                And only {WORDING} of {ONCE_OFF.length} write the wording for you. With the rest, you send it.
              </p>
            </div>
            <div className="wp-card cg-bars">
              <p className="wp-card-label">Included in year one, out of {ONCE_OFF.length}</p>
              <ul>
                {INCLUDES.map((i) => (
                  <li key={i.label}>
                    <span className="cg-bar-label">
                      {i.label}
                      <strong>{i.n}</strong>
                    </span>
                    <span className="cg-bar" aria-hidden="true">
                      <span style={{ width: `${(i.n / ONCE_OFF.length) * 100}%` }} />
                    </span>
                  </li>
                ))}
                <li className="cg-bar-warn">
                  <span className="cg-bar-label">
                    Shows the price after year one
                    <strong>{RENEWAL_SHOWN}</strong>
                  </span>
                  <span className="cg-bar" aria-hidden="true">
                    <span style={{ width: `${(RENEWAL_SHOWN / ONCE_OFF.length) * 100}%` }} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PAY MONTHLY: the other way SA companies sell websites */}
        <section className="dd-sec cg-monthly">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Pay monthly</p>
              <h2 className="dd-h2">Pay-monthly websites</h2>
              <p className="dd-sub">
                {MONTHLY.length} of the {TOTAL} companies sell websites by the month, with little or nothing to pay upfront.
              </p>
            </div>
            <div className="cg-stats">
              <div className="wp-card">
                <strong>
                  {rand(MONTHLY_STATS.min)} to {rand(MONTHLY_STATS.max)}
                </strong>
                <span>a month, {rand(MONTHLY_STATS.median)} in the middle</span>
              </div>
              <div className="wp-card">
                <strong>
                  {rand(M5.min)} to {rand(M5.max)}
                </strong>
                <span>a month for about 5 pages</span>
              </div>
              <div className="wp-card">
                <strong>
                  {rand(M10.min)} to {rand(M10.max)}
                </strong>
                <span>a month for about 10 pages</span>
              </div>
            </div>
            <p className="cg-note">
              {FIXED_TERM} of the {MONTHLY.length} tie you in for 24 months. Check who owns the website: on some plans the company keeps it
              unless you pay to buy it out.
            </p>
          </div>
        </section>

        {/* BEFORE YOU PAY: the questions that separate the quotes */}
        <section className="dd-sec wp-compare cg-ask">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Before you pay</p>
              <h2 className="dd-h2">Six questions to ask any web designer</h2>
            </div>
            <ol className="cg-questions">
              {QUESTIONS.map((x, i) => (
                <li key={x.q} className="wp-card">
                  <span className="cg-num">{i + 1}</span>
                  <div>
                    <h3>{x.q}</h3>
                    <p>{x.a}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHERE WE SIT: our prices against the middle, honestly */}
        <section className="dd-sec cg-ours" id="ours">
          <div className="dd-container cg-split">
            <div>
              <p className="dd-eyebrow">Our prices</p>
              <h2 className="dd-h2 cg-left-h2">Where Local Pros Studio sits</h2>
              <p className="cg-p">
                Our R9,900 for up to 10 pages is a little above the {rand(B10.median)} middle for a 10-page website. It includes the
                wording and photos, and 1 hour of changes every month.
              </p>
              <p className="cg-p">
                The first 12 months of hosting and changes are included, worth R3,000; the fee after that is on our{' '}
                <Link to="/website-faq" className="wp-link">
                  website terms page
                </Link>
                . Rent to own is R450 a month for up to 10 pages, below the{' '}
                {rand(M10.min)} to {rand(M10.max)} pay-monthly price for a site that size.
              </p>
              <ul className="wp-ticks cg-ticks">
                {['Wording and photos done for you', 'Domain in your business’s name', 'Live in 7 days'].map((t) => (
                  <li key={t}>
                    <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <PriceList />
              <Buttons waUrl={WA_URL} track={track} from="ours" />
              <Facts />
              <Rating track={track} />
            </div>
          </div>
          <div className="dd-container">
            <Montage />
          </div>
        </section>

        {/* METHOD: how the numbers were found, so they can be trusted (and checked) */}
        <section className="dd-sec cg-method" id="method">
          <div className="dd-container">
            <div className="cg-method-box">
              <p className="dd-eyebrow">How we got these numbers</p>
              <ul>
                <li>
                  On {SURVEY_DATE} we searched Google for South African website design packages and prices and opened each company’s
                  own price page.
                </li>
                <li>
                  We counted {TOTAL} companies that publish real prices: {ONCE_OFF.length} once-off and {MONTHLY.length} pay-monthly. Two more
                  were left out: one page wouldn’t open, and one charges by the hour.
                </li>
                <li>We only used prices printed on the company’s own page, not ads or search results.</li>
                <li>
                  Packages are grouped by size, one price per company per size. The middle is the median: half charge less, half more.
                </li>
                <li>Our own prices are not in the numbers. We don’t name the companies: the point is the market, not any one business.</li>
              </ul>
              <p className="cg-method-foot">
                Prices change. If you see one that is out of date,{' '}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="wp-link">
                  WhatsApp us
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* FAQ: the guide questions, each answered in its first sentence */}
        <section className="dd-sec" id="faq">
          <div className="dd-container">
            <div className="dd-head">
              <p className="dd-eyebrow">Questions</p>
              <h2 className="dd-h2">Website cost questions</h2>
            </div>
            <div className="dd-faq-list">
              {FAQ.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} link={f.link} id={`wcg-faq-${i}`} />
              ))}
            </div>
          </div>
        </section>

        <PriceClosing waUrl={WA_URL} track={track} />
      </main>

      <SiteFooter minimal whatsAppUrl={WA_URL} faqHref="#faq" />

      {/* The site chat (free demo); leads go to Airtable tagged "website design cost guide" */}
      <SiteChat page="website-cost-guide" trackPrefix="wcg_demo_popup" />
    </div>
  );
}
