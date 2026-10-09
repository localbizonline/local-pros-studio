import './joinlight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import HeroThreeServices from '../section-library/sections/HeroThreeServices';
import ServiceRows from '../section-library/sections/ServiceRows';
import FitCheck from '../section-library/sections/FitCheck';
import ProofSection from '../section-library/sections/ProofSection';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import Pricing from '../section-library/sections/Pricing';
import SiteChat from '../demo-popup/DemoPopup';
import BusinessSearchBox from '../demo-popup/BusinessSearchBox';
import ReputationStory from '../section-library/sections/ReputationStory';
import ClosingCard from '../section-library/sections/ClosingCard';
import closingPhoto from '../../assets/images/review-contractor-happy.webp';

// localpros.co.za/join/reviews-and-social/ rebuilt section for section in the Local Pros Studio look
// (7 Oct 2026, Jeremy's request). Source: ../localpros-join/src/pages/reviews-and-social/index.astro
// and its components/grow/* parts. Copy is the same except two review-gating lines (the "unhappy
// customers come to you privately" list item and FAQ answer), which Google does not allow.
// The hero, "Why it matters" and the fit section are shared sections from the section library
// (7 Oct 2026), replacing the original "Buying leads" hero and the code-built Google phone.
// The homepage since 8 Oct 2026 (route "/" in App.tsx); /review-versions/join forwards here.

const CTA = SITE_WHATSAPP_URL;

const faqs = [
  {
    question: 'Why does it cost R2,500 a month?',
    answer: 'You get two services for one price, plus a bonus website worth R9,900 if you need a new one or a refresh (on a 12-month commitment). An agency usually charges R5,000 a month or more for social media alone, and hiring someone costs R3,000 to R11,000 a month plus your time managing them. We can charge R2,500 because most of the repetitive work is automated, using the same system that got Local Pros over 1,400 Google reviews.',
  },
  {
    question: 'Do you build websites too?',
    answer: 'Yes. If you sign up and don’t have a website, or yours is outdated, we’ll build you a new one for free (normally R9,900) on a 12-month commitment. After 12 months it’s yours. If you then stop the plan, you keep it on our R290 a month hosting and management, which includes 1 hour of changes a month.',
  },
  {
    question: 'I already have a website. Can you refresh it?',
    answer: 'Yes. If yours is outdated or hard to use on a phone, we build you a new one with your services, your areas and a tap-to-call button. It’s free (normally R9,900) on the 12-month plan, or R9,900 once-off on its own, plus R290 a month for hosting.',
  },
  {
    question: 'What if a customer is unhappy?',
    answer: 'Every customer gets the same Google link. If something went wrong, they can reply on the same WhatsApp and you get an alert straight away, so you can phone them and sort it out. We only ever collect real reviews from your real customers.',
  },
  {
    question: 'Can I trust you with my customers?',
    answer: 'Yes. Your customers only get what this page describes: a review request after the job, with a friendly reminder, and the same Google link as everyone else. We only collect real reviews from your real customers, and we never sell their details (see our privacy policy).',
  },
  {
    question: 'How much of my time does it take?',
    answer: 'Very little. For reviews, you BCC us on your invoices or fill in a short form with the customer’s name and number, and our system does the rest. For posts, we make them for you. Send us job photos on WhatsApp when you have them and we turn them into posts too, or post them yourself from our system.',
  },
  {
    question: 'Is there a contract?',
    answer: 'Yes. The plan is a 6-month commitment, or 12 months if you take the free website (after that the website is yours). There’s a R5,000 setup fee, which we waive when you commit for 6 months. Six months gives it time to work: Google takes a few months to notice steady reviews and posts. Reviews come with a 30-day money-back guarantee if we don’t get you any 5-star reviews. Reviews (R1,200) or posts (R2,000) on their own are month-to-month.',
  },
];

// Four points (8 Oct 2026): setup and website details are in the price section above
const recap = [
  'More 5-star Google reviews',
  'Posts on Facebook and Instagram, done for you',
  'A new website, or yours refreshed',
  'All in one for R2,500 a month',
];

export default function JoinLight() {

  return (
    <div className="jl bg-white text-[#1C1917]">
      {/* HEADER: the shared light header with the menu (8 Oct 2026) */}
      <SiteHeader pricingHref="#pricing" />

      <main>
        {/* HERO: "More Google reviews. Social media posts. A better website." (picked 8 Oct 2026) */}
        <HeroThreeServices costsHref="#pricing" search={<BusinessSearchBox page="home" plan="package" buttonLabel="Get started" />} />

        {/* YOUR REPUTATION: the customer path, animated "Follow the customer" (picked 7 Oct 2026) */}
        <ReputationStory variant="follow" />

        {/* WHAT WE DO: one row per service, photo + heading + blurb, on cream, with three client sites
            fanned out for website design (option A, picked 7 Oct 2026). The animated phone
            "How it works" moved off this page; it is saved in the section library for /reviews. */}
        <ServiceRows websiteVisual="fan" tone="cream" />

        {/* THE PROOF: reviews, posts and websites in swipe rows, with our live Google reviews (option C, 8 Oct 2026).
            Kept separate from What we do on purpose: different jobs (Jeremy, 8 Oct 2026) */}
        <ProofSection />

        {/* WHO IT IS FOR: the shared fit section (7 Oct 2026) */}
        <FitCheck />

        {/* PRICE: the package first with the website as an optional free extra, then each service on its own
            (option A, picked 8 Oct 2026) */}
        <Pricing />

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 px-6">
          <div className="measure">
            <div className="text-center mb-10">
              <p className="eyebrow mb-4">Questions</p>
              <h2 className="section-title">Before you ask.</h2>
            </div>
            <div className="border-t border-[#E7E5E4]">
              {faqs.map((f) => (
                <details key={f.question} className="border-b border-[#E7E5E4]">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none">
                    <span className="jl-head font-semibold text-[18px]">{f.question}</span>
                    <svg className="chev w-5 h-5 text-[#78716C] shrink-0 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-[17px] leading-[1.6] text-[#44403C] pb-6">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA: the shared closing card (8 Oct 2026) */}
        <ClosingCard
          title="Start growing your business this month."
          items={recap}
          photo={closingPhoto}
          photoAlt="Contractor smiling at a new 5-star Google review on his phone"
          href={CTA}
        />
      </main>

      {/* FOOTER: the shared footer with links to every page (8 Oct 2026) */}
      <SiteFooter pricingHref="#pricing" faqHref="#faq" />

      {/* The site chat: "Start now" buttons open it with the plan picked; it saves the lead to Airtable
          and opens WhatsApp (8 Oct 2026). It never opens by itself on the homepage. */}
      <SiteChat page="home" />
    </div>
  );
}
