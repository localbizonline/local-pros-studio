import React from 'react';
import { ArrowRight, Check, Star, Globe, Share2, Calendar, Shield, Zap } from 'lucide-react';
import { SITE_WHATSAPP_URL } from '../whatsapp';

// Import existing images
import happyContractorInstagram from '../assets/images/social-posting/happy contractor with instagram mockup copy.jpg';
import happyContractorLandscape from '../assets/images/social-posting/happy contractor with social posting landscape ratio.webp';
import reviewContractorHappy from '../assets/images/review-contractor-happy.jpg';

// Scrolling faces images
import contractorPhoneCallSA from '../assets/images/Reviews/contractor-phone-call-sa.jpg';
import reviewCustomer from '../assets/images/review-customer.jpg';
import teamPhoto from '../assets/images/team.jpg';
import happyBusinessOwner from '../assets/images/reviews-pro/happy-business-owner.jpg';
import heroContractorHandshake from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import contractorConfident from '../assets/images/Reviews/contractor-confident-reviews.jpg';

// Scrolling Faces Data
const scrollingFaces = [
  { src: reviewContractorHappy, alt: 'SA contractor checking reviews' },
  { src: contractorPhoneCallSA, alt: 'Cape Town contractor on phone' },
  { src: happyContractorInstagram, alt: 'Construction worker with phone' },
  { src: reviewCustomer, alt: 'Happy customer leaving review' },
  { src: teamPhoto, alt: 'Local Pros team' },
  { src: happyBusinessOwner, alt: 'Happy business owner' },
  { src: heroContractorHandshake, alt: 'Contractor meeting customer' },
  { src: contractorConfident, alt: 'Confident business owner' },
];

// Scrolling Faces Component
const ScrollingFaces = () => (
  <div className="relative w-full overflow-hidden py-6">
    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    
    <div className="flex animate-scroll-left">
      {scrollingFaces.map((face, index) => (
        <div
          key={`first-${index}`}
          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 mx-2 md:mx-3 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-amber-500 transition-colors"
        >
          <img
            src={face.src}
            alt={face.alt}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
      {scrollingFaces.map((face, index) => (
        <div
          key={`second-${index}`}
          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 mx-2 md:mx-3 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-amber-500 transition-colors"
        >
          <img
            src={face.src}
            alt={face.alt}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
    </div>
  </div>
);

// Bundle Items
const bundleItems = [
  {
    icon: Star,
    title: 'Review Collection',
    description: 'Automated review requests via WhatsApp & email. Smart filtering catches unhappy customers privately. 30-day money-back guarantee.',
    value: 'R1,200/month',
    features: ['WhatsApp + email requests', 'Smart filtering', 'AI review responses', 'Real-time alerts'],
  },
  {
    icon: Share2,
    title: 'Social Media Posting',
    description: 'Weekly posts to Facebook, Instagram & Google. Holiday posts, review highlights, and job showcases.',
    value: 'R2,000/month',
    features: ['3 platforms covered', '4+ posts/month', 'Holiday posts automatic', 'Review highlights'],
  },
  {
    icon: Globe,
    title: 'Professional Website',
    description: 'Free if you need one. Mobile-friendly, written for your services and area, with hosting looked after while you are on the plan.',
    value: 'R9,900',
    features: ['Written and designed for you', 'Mobile first', 'Basic on-page SEO', 'Click-to-call and WhatsApp'],
  },
];

// FAQ Items
const faqItems = [
  {
    question: 'Why is there a 6-month commitment?',
    answer: 'Google rewards steady reviews and regular activity, and that takes a few months to show. Six months also lets us build your website (worth R9,900) without charging you for it upfront.',
  },
  {
    question: 'How does the money-back guarantee work?',
    answer: 'It covers reviews. If we don\'t get you any new 5-star reviews in your first 30 days, you get your money back.',
  },
  {
    question: 'What happens to my website if I cancel?',
    answer: 'The website is part of the plan, so it stays live while you are subscribed. If you cancel the plan, the website and its hosting end with it.',
  },
  {
    question: 'Can I start with just reviews or social?',
    answer: 'Yes. Reviews on their own are R1,200/month and posting on its own is R2,000/month, both month-to-month. The free website only comes with the R2,500 plan.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'Review collection and social posting are live within 7 days. Most websites go live within 5–7 business days once we have your details.',
  },
  {
    question: 'What\'s included in the website hosting?',
    answer: 'Domain, SSL, hosting, backups, security and support, plus 1 hour of website changes every month. All included while you are on the plan.',
  },
  {
    question: 'Do I need to provide content for social posts?',
    answer: 'We make it easy. Send us job photos via WhatsApp and we handle the rest. We also create service posts and holiday content automatically.',
  },
];

// CTA Component
const CTAButton = () => (
  <div className="py-8 md:py-10">
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30"
    >
      <span className="flex items-center gap-2 md:gap-3 font-black text-lg md:text-2xl lg:text-3xl uppercase tracking-tight">
        Start the R2,500 Plan
        <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
      </span>
      <span className="text-sm font-bold opacity-80 mt-1">6-month commitment · 30-day money-back guarantee on reviews</span>
    </a>

    <div className="flex flex-col items-center justify-center gap-1 mt-5 md:mt-6">
      <p className="text-amber-400 font-bold text-sm md:text-base">
        We take on about 12 new clients a month
      </p>
    </div>
  </div>
);

const SpecialOfferOpusPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">

            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs md:text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Calendar className="w-4 h-4" />
              About 12 new clients a month
            </div>

            {/* Big Promise Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Google Reviews and Weekly Posts,<br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Done For You</span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-4 max-w-3xl mx-auto">
              Reviews collected for you. Your jobs posted every week. Plus a free website if you need one.<br />
              <span className="text-white font-semibold">One plan. One price.</span>
            </p>

            {/* Price Display */}
            <div className="mb-8">
              <div className="inline-block bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1 mb-3">
                <span className="text-amber-400 font-bold text-sm">6-MONTH COMMITMENT</span>
              </div>
              <p className="text-neutral-400 text-base mb-2">
                <span className="line-through">R3,200/month bought separately + R9,900 website</span>
              </p>
              <p className="text-4xl md:text-5xl font-black text-white mb-3">
                R2,500<span className="text-neutral-400 text-xl font-normal">/month</span>
              </p>
              <p className="text-green-400 font-bold text-lg">
                Free website worth R9,900 + save R700 every month
              </p>
            </div>

            {/* Main CTA */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all mb-4"
            >
              <span className="flex items-center gap-3 font-black text-xl md:text-2xl">
                Start the R2,500 Plan
                <ArrowRight className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold opacity-80">6-month commitment</span>
            </a>

            {/* Trust Indicators */}
            <p className="text-neutral-500 text-sm mb-8">
              30-day money-back guarantee on reviews. No hidden fees.
            </p>

            {/* Scrolling Faces */}
            <div className="mb-8">
              <p className="text-neutral-500 text-xs text-center mb-2 uppercase tracking-widest">Trusted by SA contractors</p>
              <ScrollingFaces />
            </div>

            {/* Hero Image */}
            <div className="max-w-2xl mx-auto">
              <img
                src={happyContractorInstagram}
                alt="Happy contractor with complete online presence"
                className="w-full rounded-2xl border-2 border-neutral-700 shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          THE PROBLEM SECTION
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Problem
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Your online presence needs three things.<br />
            <span className="text-amber-400">Most business owners don't have time for any of them.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            When someone does their homework on your business, this is what they look at:
          </p>

          <div className="space-y-4">
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">A website</p>
              <p className="text-neutral-300 text-sm">R9,900 once-off, then R290/month hosting</p>
            </div>
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">Review collection system</p>
              <p className="text-neutral-300 text-sm">R1,200/month for automated requests</p>
            </div>
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">Social media management</p>
              <p className="text-neutral-300 text-sm">R2,000/month for consistent posting</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white">
            That's <span className="text-red-400">R3,200/month</span> plus a R9,900 website build.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And it only works if you stay constant and stay active, month after month.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Most contractors give up before they start, or lose <strong className="text-white">hours every week</strong> trying to do it themselves instead of doing actual work.
          </p>

        </div>
      </section>

      {/* ============================================
          THE SOLUTION SECTION
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Solution
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            What if you could get<br />
            <span className="text-amber-400">everything for R2,500/month?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            We put reviews, posting and your website into <strong className="text-white">one plan</strong>. We do the heavy lifting; you send us job photos.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            One invoice. One team. One price.
          </p>

          <div className="bg-green-900/40 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-green-400 font-black text-lg mb-4">The R2,500 Plan:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Free Website</strong> (worth R9,900, if you need one): mobile-friendly, written for your services and area</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Website Hosting</strong>: SSL, backups, security and 1 hour of changes a month</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Review Collection</strong>: automated requests via WhatsApp & email, with a 30-day money-back guarantee</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Social Media Posting</strong>: weekly posts to Facebook, Instagram and Google</span>
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-green-500/30">
              <p className="text-neutral-300">All of this for:</p>
              <p className="text-3xl md:text-4xl font-black text-green-400">R2,500/month</p>
              <p className="text-neutral-400 text-sm mt-1">6-month commitment</p>
            </div>
          </div>

          <CTAButton />

        </div>
      </section>

      {/* ============================================
          WHAT'S INCLUDED - DETAILED BREAKDOWN
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-8">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              What's Included
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              Three Services.<br />
              <span className="text-amber-400">One Plan.</span>
            </h2>
            <p className="text-lg text-neutral-300">
              Here's exactly what you get on the plan, and what each piece costs on its own.
            </p>
          </div>

          {/* Bundle Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bundleItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 hover:border-amber-500/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-amber-400 text-sm font-bold">Valued at {item.value}</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <p key={idx} className="text-neutral-400 text-sm flex items-center">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================
          VALUE STACK - THE MATH
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Value
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight text-center">
            Let's Do The Maths
          </h2>

          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8">
            <p className="text-neutral-400 text-sm uppercase tracking-wide mb-6 text-center">If you bought everything separately:</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300">Review Collection</span>
                <span className="text-white font-bold">R1,200/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300">Social Media Posting</span>
                <span className="text-white font-bold">R2,000/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300">Website Hosting</span>
                <span className="text-white font-bold">R290/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300">Website Build (once-off)</span>
                <span className="text-white font-bold">R9,900</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 bg-neutral-800 rounded-xl px-4 mb-4">
              <span className="text-neutral-300 font-bold">Total monthly value</span>
              <span className="text-red-400 font-black text-2xl line-through">R3,490</span>
            </div>

            <div className="bg-gradient-to-r from-green-900/60 to-green-800/40 border-2 border-green-500/50 rounded-xl p-6 text-center">
              <p className="text-green-400 text-sm font-bold uppercase tracking-wide mb-2">With a 6-Month Commitment</p>
              <p className="text-white font-black text-4xl md:text-5xl mb-2">R2,500<span className="text-xl text-neutral-400 font-normal">/month</span></p>
              <p className="text-green-400 font-bold">+ free website worth R9,900, hosting included</p>
            </div>

            <p className="text-center text-neutral-300 text-lg mt-6">
              Save <span className="text-green-400 font-bold">R700 a month</span> on reviews and posting, get the R9,900 website free, and pay nothing extra for hosting.
            </p>
          </div>

          <CTAButton />

        </div>
      </section>

      {/* ============================================
          WHY NOW - URGENCY
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Why Now
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Google is changing how people find contractors.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Google's AI now recommends businesses based on how many reviews they have, how recent they are, and whether the business looks <strong className="text-white">active</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Businesses that keep collecting reviews and posting their work climb the ladder. The ones that go quiet get pushed down.
          </p>

          <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-white font-black text-xl">About 12 new clients a month</p>
                <p className="text-neutral-300">So every setup gets proper attention</p>
              </div>
            </div>
            <p className="text-neutral-300">
              When we're full for the month, new clients start the following month. WhatsApp us to check if there's a spot.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-neutral-300">
              <strong className="text-amber-400">What is the cost of doing nothing?</strong>
            </p>
            <p className="text-lg md:text-xl text-neutral-300">
              Businesses with fresh reviews, active social media, and modern websites get featured in AI search results. Dormant businesses get buried.
            </p>
            <p className="text-lg md:text-xl text-neutral-300">
              The contractors who start now will have a <strong className="text-white">head start</strong> on everyone who waits.
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          HOW IT WORKS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Getting Started
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            How It Works
          </h2>

          <div className="space-y-4">
            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">WhatsApp us</p>
                  <p className="text-neutral-300">A quick Online Presence Review to see where you stand and if the plan fits.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">We set everything up</p>
                  <p className="text-neutral-300">Review collection and social posting live in 7 days. Your website, if you need one, goes live within 5–7 business days of getting your details.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">You focus on your work</p>
                  <p className="text-neutral-300">We handle your online presence. You handle your customers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={happyContractorLandscape}
              alt="Contractor with complete online business presence"
              className="w-full aspect-[16/9] object-cover object-center"
            />
          </div>

          <CTAButton />

        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Common Questions
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-neutral-900 border border-neutral-700 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-neutral-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================
          GUARANTEE / TRUST
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-8">

          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-12 h-12 text-amber-400" />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Built by People Who<br />
            <span className="text-amber-400">Understand Your Business</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            We've been working with South African contractors for over 10 years. We built this plan because we know what gets a business found and chosen online, and we know you don't have time to do it yourself.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>10+ years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span>3,000+ businesses served</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-amber-400" />
              <span>South African team</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-8">

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Make it easy for customers to choose you.
          </h2>

          <p className="text-2xl md:text-3xl font-black text-white">
            Get everything for <span className="text-amber-400">R2,500/month</span>.
          </p>

          <p className="text-lg text-neutral-400">
            Reviews. Weekly posts. A free website if you need one.
          </p>

          <CTAButton />

          <p className="text-neutral-500 text-center italic">
            Questions? WhatsApp us anytime.
          </p>

          {/* Fine Print */}
          <div className="pt-8 border-t border-neutral-800">
            <p className="text-neutral-600 text-xs leading-relaxed">
              * 6-month commitment. The 30-day money-back guarantee covers review collection. The website (worth R9,900)
              is included as part of the plan and stays live while you are subscribed; if you cancel the plan, website access
              and hosting end with it. Standard terms and conditions apply.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SpecialOfferOpusPage;
