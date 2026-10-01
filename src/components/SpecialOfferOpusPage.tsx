import React from 'react';
import { ArrowRight, Check, Star, Globe, Share2, Smartphone, Calendar, Shield, Zap, Clock } from 'lucide-react';

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
    description: 'Automated review requests via WhatsApp & email. Smart filtering catches unhappy customers privately.',
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
    description: 'Mobile-friendly, SEO-optimised website designed to convert visitors into customers.',
    value: 'R12,000',
    features: ['Custom design', 'Mobile responsive', 'SEO optimised', 'WhatsApp integration'],
  },
  {
    icon: Smartphone,
    title: 'FieldCard Team Access',
    description: 'Job management app for quotes, invoices, and job cards. As simple as WhatsApp.',
    value: 'R580/month',
    features: ['Instant quotes', 'Digital job cards', 'Team scheduling', 'Customer sign-off'],
  },
];

// FAQ Items
const faqItems = [
  {
    question: 'Why is there a 12-month commitment?',
    answer: 'We\'re including a R12,000 website at no extra cost. The 12-month commitment ensures we can deliver this value without charging you upfront for the website build.',
  },
  {
    question: 'What happens to my website if I cancel?',
    answer: 'The website is included as part of the bundle at no extra cost. If you cancel the subscription, website access ends because it\'s part of what makes this offer possible. You\'d need to purchase a standalone website separately.',
  },
  {
    question: 'Can I start with just reviews or social?',
    answer: 'This bundle is specifically for contractors who want the complete solution. If you only need one service, check out our individual offerings on the main site.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'We can have your review collection and social posting live within 7 days. Your website typically takes 2-3 weeks for custom design and build.',
  },
  {
    question: 'What\'s included in the website hosting?',
    answer: 'SSL certificate, regular backups, security updates, performance monitoring, and unlimited content updates — all included in your monthly fee.',
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
      href="https://wa.me/27832336716?text=Hi%2C%20I%20want%20to%20claim%20the%20Complete%20Business%20Bundle%20at%20R2%2C500%2Fmonth%20(12-month%20commitment)"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-col items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30"
    >
      <span className="flex items-center gap-2 md:gap-3 font-black text-lg md:text-2xl lg:text-3xl uppercase tracking-tight">
        Claim This Bundle
        <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
      </span>
      <span className="text-sm font-bold opacity-80 mt-1">12-Month Commitment</span>
    </a>

    <div className="flex flex-col items-center justify-center gap-1 mt-5 md:mt-6">
      <p className="text-amber-400 font-bold text-sm md:text-base">
        Offer ends March 2026
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
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 text-xs md:text-sm font-bold px-4 py-2 rounded-full mb-6">
              <Clock className="w-4 h-4" />
              Limited Offer — Ends March 2026
            </div>

            {/* Big Promise Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Everything You Need to<br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Dominate Online</span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-4 max-w-3xl mx-auto">
              Website. Reviews. Social Media. Job Management.<br />
              <span className="text-white font-semibold">One price. Zero hassle.</span>
            </p>

            {/* Price Display */}
            <div className="mb-8">
              <div className="inline-block bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1 mb-3">
                <span className="text-amber-400 font-bold text-sm">12-MONTH COMMITMENT</span>
              </div>
              <p className="text-neutral-400 text-base mb-2">
                <span className="line-through">Normally R4,070/month + R12,000 website</span>
              </p>
              <p className="text-4xl md:text-5xl font-black text-white mb-3">
                R2,500<span className="text-neutral-400 text-xl font-normal">/month</span>
              </p>
              <p className="text-green-400 font-bold text-lg">
                Website included FREE + over 50% off monthly services
              </p>
            </div>

            {/* Main CTA */}
            <a
              href="https://wa.me/27832336716?text=Hi%2C%20I%20want%20to%20claim%20the%20Complete%20Business%20Bundle%20at%20R2%2C500%2Fmonth%20(12-month%20commitment)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-5 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all mb-4"
            >
              <span className="flex items-center gap-3 font-black text-xl md:text-2xl">
                Claim This Bundle Now
                <ArrowRight className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold opacity-80">12-month commitment</span>
            </a>

            {/* Trust Indicators */}
            <p className="text-neutral-500 text-sm mb-8">
              Everything included. No hidden fees. Cancel policy applies.
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
            You're paying for 4 different services.<br />
            <span className="text-amber-400">And none of them talk to each other.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Right now, if you want to run your business properly online, you need:
          </p>

          <div className="space-y-4">
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">A website</p>
              <p className="text-neutral-300 text-sm">R9,900+ once-off, then R290/month hosting</p>
            </div>
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">Review collection system</p>
              <p className="text-neutral-300 text-sm">R1,200/month for automated requests</p>
            </div>
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">Social media management</p>
              <p className="text-neutral-300 text-sm">R2,000/month for consistent posting</p>
            </div>
            <div className="bg-neutral-700 rounded-xl p-5 border-l-4 border-red-500">
              <p className="text-white font-bold mb-1">Job management software</p>
              <p className="text-neutral-300 text-sm">R580/month for quotes and job cards</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white">
            That's <span className="text-red-400">R4,070/month</span> plus a R12,000 website build.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Four different logins. Four different invoices. Four different support teams to chase.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Most contractors give up before they even start — or they try to DIY it and waste <strong className="text-white">hours every week</strong> on admin instead of doing actual work.
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
            We bundled everything a contractor needs to succeed online into <strong className="text-white">one simple package</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            One invoice. One team. One price.
          </p>

          <div className="bg-green-900/40 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-green-400 font-black text-lg mb-4">The Complete Business Bundle:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Professional Website</strong> — custom designed, mobile-friendly, SEO-ready</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Website Hosting</strong> — SSL, backups, updates, all included</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Review Collection</strong> — automated requests via WhatsApp & email</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Social Media Posting</strong> — weekly posts to 3 platforms</span>
              </p>
              <p className="text-neutral-200 flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">FieldCard Team Access</strong> — quotes, invoices, job management</span>
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-green-500/30">
              <p className="text-neutral-300">All of this for:</p>
              <p className="text-3xl md:text-4xl font-black text-green-400">R2,500/month</p>
              <p className="text-neutral-400 text-sm mt-1">12-month commitment</p>
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
              Four Powerful Services.<br />
              <span className="text-amber-400">One Unbeatable Price.</span>
            </h2>
            <p className="text-lg text-neutral-300">
              Here's exactly what you get in the bundle — and what each piece is worth on its own.
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
                <span className="text-neutral-300">FieldCard Team Access</span>
                <span className="text-white font-bold">R580/month</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                <span className="text-neutral-300">Website Build (once-off)</span>
                <span className="text-white font-bold">R12,000</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 bg-neutral-800 rounded-xl px-4 mb-4">
              <span className="text-neutral-300 font-bold">Total monthly value</span>
              <span className="text-red-400 font-black text-2xl line-through">R4,070+</span>
            </div>

            <div className="bg-gradient-to-r from-green-900/60 to-green-800/40 border-2 border-green-500/50 rounded-xl p-6 text-center">
              <p className="text-green-400 text-sm font-bold uppercase tracking-wide mb-2">With 12-Month Commitment</p>
              <p className="text-white font-black text-4xl md:text-5xl mb-2">R2,500<span className="text-xl text-neutral-400 font-normal">/month</span></p>
              <p className="text-green-400 font-bold">+ FREE R12,000 website included</p>
            </div>

            <p className="text-center text-neutral-300 text-lg mt-6">
              Lock in this price for 12 months and save <span className="text-green-400 font-bold">over 50%</span> on everything.
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
            This offer won't last forever.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            We're offering this bundle at an <strong className="text-white">introductory price</strong> to get more contractors set up for success in 2026.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Once we've onboarded our target clients, the price goes up — and the free website inclusion goes away.
          </p>

          <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-white font-black text-xl">Offer Expires March 2026</p>
                <p className="text-neutral-300">After that, standard pricing applies</p>
              </div>
            </div>
            <p className="text-neutral-300">
              Lock in R2,500/month now, and you keep this rate for as long as you stay subscribed — even when new customers pay more.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-neutral-300">
              <strong className="text-amber-400">Google AI is changing how people find contractors.</strong>
            </p>
            <p className="text-lg md:text-xl text-neutral-300">
              Businesses with fresh reviews, active social media, and modern websites get featured in AI search results. Dormant businesses get buried.
            </p>
            <p className="text-lg md:text-xl text-neutral-300">
              The contractors who set up now will have a <strong className="text-white">12-month head start</strong> on everyone else.
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
                  <p className="text-white font-black text-lg mb-1">WhatsApp us to claim your spot</p>
                  <p className="text-neutral-300">Quick chat to confirm you're a good fit for the bundle.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">We set everything up</p>
                  <p className="text-neutral-300">Review collection and social posting live in 7 days. Website design starts immediately.</p>
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
            We've been working with South African contractors for over 10 years. We built this bundle because we know exactly what you need to succeed online — and we know you don't have time to figure it out yourself.
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
            Stop juggling four different services.
          </h2>

          <p className="text-2xl md:text-3xl font-black text-white">
            Get everything for <span className="text-amber-400">R2,500/month</span>.
          </p>

          <p className="text-lg text-neutral-400">
            Website. Reviews. Social Media. Job Management.
          </p>

          <CTAButton />

          <p className="text-neutral-500 text-center italic">
            Questions? WhatsApp us anytime — we're real people, not bots.
          </p>

          {/* Fine Print */}
          <div className="pt-8 border-t border-neutral-800">
            <p className="text-neutral-600 text-xs leading-relaxed">
              * 12-month commitment required. The website is included as part of the bundle subscription. 
              If you cancel your subscription, website access and hosting ends as it is part of the bundled services. 
              Standard terms and conditions apply. Offer valid until March 2026 or while capacity lasts.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default SpecialOfferOpusPage;
