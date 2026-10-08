import './joinlight.css';
import { SITE_WHATSAPP_URL } from '../../whatsapp';
import HeroThreeServices from '../section-library/sections/HeroThreeServices';
import ServiceRows from '../section-library/sections/ServiceRows';
import FitCheck from '../section-library/sections/FitCheck';
import ProofSection from '../section-library/sections/ProofSection';
import SiteHeader from '../section-library/sections/SiteHeader';
import SiteFooter from '../section-library/sections/SiteFooter';
import Pricing from '../section-library/sections/Pricing';
import ReputationStory from '../section-library/sections/ReputationStory';
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
    answer: 'You get two services for one price. An agency usually charges R5,000 a month or more for social media alone, and hiring someone costs R3,000 to R11,000 a month plus your time managing them. We can charge R2,500 because most of the repetitive work is automated, using the same system that got Local Pros over 1,400 Google reviews.',
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
    answer: 'Very little. For reviews, you BCC us on your invoices or fill in a short form with the customer’s name and number, and our system does the rest. For posts, send us a job photo on WhatsApp when you have one; on weeks you send nothing, we still post your services, public holidays and your best new reviews.',
  },
  {
    question: 'Is there a contract?',
    answer: 'Yes. The plan is a 6-month commitment, or 12 months if you take the free website (after that the website is yours). There’s a R5,000 setup fee, which we waive when you commit for 6 months. Six months gives it time to work: Google takes a few months to notice steady reviews and posts. Reviews come with a 30-day money-back guarantee if we don’t get you any 5-star reviews. Reviews (R1,200) or posts (R2,000) on their own are month-to-month.',
  },
];

const recap = [
  'More 5-star Google reviews',
  'Your best reviews posted on Facebook and Instagram',
  'A new Facebook and Instagram post every week',
  'All in one for R2,500 a month',
  'Free setup (normally R5,000) with a 6-month commitment',
  'Free website, worth R9,900, if you need one (12-month commitment)',
];

export default function JoinLight() {

  return (
    <div className="jl bg-white text-[#1C1917]">
      {/* HEADER: the shared light header with the menu (8 Oct 2026) */}
      <SiteHeader pricingHref="#pricing" />

      <main>
        {/* HERO: "More Google reviews. Social media posts. A better website." (picked 8 Oct 2026) */}
        <HeroThreeServices costsHref="#pricing" />

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

        {/* CLOSING CTA */}
        <section className="py-16 md:py-24 px-6 bg-[#FBF6EC]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden bg-[#1C1917]">
            <img
              src={closingPhoto}
              alt="Contractor smiling at a new 5-star Google review on his phone"
              loading="lazy"
              className="w-full h-full min-h-[260px] object-cover"
            />
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="jl-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-8">
                Start growing your business this month.
              </h2>
              <ul className="flex flex-col gap-3.5 mb-9">
                {recap.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.2rem)] text-[#FBF6EC] font-semibold">
                    <span className="w-7 h-7 rounded-full bg-[#FBF6EC]/15 text-[#FBBF24] flex items-center justify-center shrink-0 text-[0.9rem]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href={CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[12px] bg-[#F59E0B] text-[#1C1917] font-bold text-[1.2rem] px-9 py-4 hover:bg-[#FBBF24] transition-colors"
                >
                  WhatsApp us
                </a>
                <p className="text-[15px] text-[#FBF6EC]/70 mt-3">Opens WhatsApp. A real person replies.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: the shared footer with links to every page (8 Oct 2026) */}
      <SiteFooter pricingHref="#pricing" faqHref="#faq" />
    </div>
  );
}
