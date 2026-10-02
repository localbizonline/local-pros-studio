import React from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';

// Import images - Using existing assets where possible
import happyContractorInstagram from '../assets/images/social-posting/happy contractor with instagram mockup copy.jpg';
import happyContractorLandscape from '../assets/images/social-posting/happy contractor with social posting landscape ratio.webp';
import deadBusinessNoSocials from '../assets/images/social-posting/dead business if no socials since 2021.jpg';
import googleAiOverviewRoofingPhone from '../assets/images/social-posting/google-ai-overview-roofing-phone.webp';
import googleAiOverviewSearch from '../assets/images/social-posting/google-ai-overview-search.webp';
import oneUploadEverywhereContractors from '../assets/images/social-posting/one upload everywhere for contractors.webp';
import beforeAfterReviews from '../assets/images/reviews-pro/before-after-reviews.jpg';
import contractorConfidentReviews from '../assets/images/Reviews/contractor-confident-reviews.jpg';
import { SITE_WHATSAPP_URL } from '../whatsapp';

// Reusable CTA Button with WhatsApp link
const CTAWithRating = () => (
  <div className="py-8 md:py-10">
    {/* Big Amber CTA Button */}
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-yellow-400 text-black font-black text-lg md:text-2xl lg:text-3xl px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30 uppercase tracking-tight"
    >
      Get Started Today
      <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
    </a>

    {/* Trust indicators below */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-5 md:mt-6 text-neutral-400 text-sm">
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-500" />
        No contracts
      </span>
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-500" />
        Cancel anytime
      </span>
      <span className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-500" />
        WhatsApp support
      </span>
    </div>
  </div>
);

const HomeSalesLetterPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* ============================================
          SECTION 1: HERO — The Bold Promise
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">

            {/* Pre-headline */}
            <p className="text-amber-400 font-bold text-sm md:text-base uppercase tracking-wider mb-6">
              For Local Business Owners Who Are Tired of Being Invisible Online
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Growing a Local Business is Hard.<br />
              <span className="text-yellow-400">We Make It a Hell of a Lot Easier.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto">
              Professional reviews. Consistent social media. Websites that actually convert.{' '}
              <span className="text-white font-semibold">Without you lifting a finger.</span>
            </p>

            {/* Main CTA */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all mb-4"
            >
              <span className="font-black text-xl md:text-2xl">Get Started Today</span>
              <ArrowRight className="w-6 h-6" />
            </a>

            {/* Secondary CTA */}
            <p className="text-neutral-400 text-sm mb-10">
              <a href="#how-it-works" className="hover:text-white transition-colors">
                See How It Works ↓
              </a>
            </p>

            {/* Hero Image */}
            <div className="max-w-2xl mx-auto mb-10">
              <img
                src={happyContractorInstagram}
                alt="Confident contractor with professional online presence"
                className="w-full rounded-2xl border-2 border-neutral-700 shadow-2xl"
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-neutral-300 text-sm md:text-base">
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-amber-400">500+</span>
                <span>Websites Built</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-amber-400">10+</span>
                <span>Years Experience</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-amber-400">R7M+</span>
                <span>Revenue Generated</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-black text-amber-400">4.9★</span>
                <span>HelloPeter Rating</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE PROBLEM — Calling Out The Bullsh*t
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              ⚡ The Problem
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Look, we get it.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Running a local business is a full-time war.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You're quoting jobs. Chasing payments. Managing staff that doesn't show up.
            Dealing with suppliers who "lost" your order.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And somewhere in between all that chaos...
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            You're supposed to:
          </p>

          <div className="pl-6 border-l-4 border-amber-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">Post on Facebook 3x a week</p>
            <p className="text-lg md:text-xl text-neutral-200">Collect reviews from happy customers</p>
            <p className="text-lg md:text-xl text-neutral-200">Update your Google profile</p>
            <p className="text-lg md:text-xl text-neutral-200">Reply to enquiries on Instagram</p>
            <p className="text-lg md:text-xl text-neutral-200">Make sure your website actually works on mobile</p>
            <p className="text-lg md:text-xl text-neutral-200">Figure out what the hell SEO even means</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-400 italic">
            *somebody please pull out my eyelashes*
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You're not lazy.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You're not stupid.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            You're <span className="text-amber-400">drowning</span>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And every marketing "expert" keeps telling you to "just post more content"
            like that's going to magically fix everything.
          </p>

          {/* Image: Overwhelmed business owner */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={deadBusinessNoSocials}
              alt="Business appears inactive when social media hasn't been updated"
              className="w-full"
            />
          </div>

          {/* Pull Quote Box */}
          <div className="bg-neutral-900 border-l-4 border-amber-500 rounded-r-xl p-6 md:p-8">
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
              "You're not failing because you don't work hard enough.<br />
              <span className="text-amber-400">You're failing because you're trying to do everything yourself."</span>
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 3: THE ORIGIN STORY — Why We Give a Damn
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Who We Are
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We're not some fancy agency<br />with a glass-front office.
          </h2>

          <p className="text-xl md:text-2xl font-bold text-white">
            We're local business people. Just like you.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We've driven around with magnets on our trucks.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Handed out flyers at the traffic lights.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Begged family for 5-star reviews.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And we've felt the gut-punch of:
          </p>

          <div className="pl-6 border-l-4 border-red-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">Losing a job to a competitor with a better website</p>
            <p className="text-lg md:text-xl text-neutral-200">Getting a 1-star review from a customer who never even used us</p>
            <p className="text-lg md:text-xl text-neutral-200">Watching our Facebook page collect dust for 6 months</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            We spent <strong className="text-white">10+ years</strong> in the trenches.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We made every mistake in the book.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            And then we figured out what actually works.
          </p>

          <div className="pl-6 border-l-4 border-amber-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">Not fancy marketing theory.</p>
            <p className="text-lg md:text-xl text-neutral-200">Not "content strategies" from people who've never run a business.</p>
            <p className="text-lg md:text-xl text-neutral-200"><strong className="text-amber-400">REAL systems</strong> that we tested on ourselves first.</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            Now we're making those systems available to you.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            So you can skip the 10 years of trial and error.<br />
            And get straight to <span className="text-amber-400">the good part</span>.
          </p>

          {/* Team Image Placeholder */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={happyContractorLandscape}
              alt="Local Pros team - real people who understand local business"
              className="w-full"
            />
          </div>

          {/* CTA */}
          <CTAWithRating />

        </div>
      </section>

      {/* ============================================
          SECTION 4: THE SOLUTION — What We Actually Do
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800" id="how-it-works">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Solution
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We handle your entire digital presence.<br />
            <span className="text-amber-400">You handle your business.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Here's how it works:
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You do what you're good at — <strong className="text-white">delivering great work</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We do what we're good at — <strong className="text-white">making sure everyone sees it</strong>.
          </p>

          {/* Three Pillars */}
          <div className="space-y-6 pt-6">

            {/* Pillar 1: Reviews */}
            <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-700 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500 text-black font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">5-Star Reviews on Autopilot</h3>
                  <p className="text-neutral-300 mb-4">
                    Our WhatsApp-based system collects reviews from happy customers automatically.
                    Negative feedback gets caught privately before it goes public.
                  </p>
                  <p className="text-amber-400 font-bold">
                    Result: More 5-star reviews. Better Google rankings. More trust.
                  </p>
                  <a href="/reviews" className="inline-flex items-center gap-2 text-white hover:text-amber-400 mt-4 font-medium transition-colors">
                    See Review Collection <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Pillar 2: Social Media */}
            <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-700 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500 text-black font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">Social Media That Posts Itself</h3>
                  <p className="text-neutral-300 mb-4">
                    Send us your job photos. We turn them into professional posts.
                    Published to Facebook, Instagram, and Google — every single week.
                  </p>
                  <p className="text-amber-400 font-bold">
                    Result: You look active and professional. Without opening a single app.
                  </p>
                  <a href="/social-media-posting-service" className="inline-flex items-center gap-2 text-white hover:text-amber-400 mt-4 font-medium transition-colors">
                    See Social Posting <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Pillar 3: Websites */}
            <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-700 hover:border-amber-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500 text-black font-black text-xl w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">Websites That Actually Work</h3>
                  <p className="text-neutral-300 mb-4">
                    Mobile-first. Fast-loading. Built to convert visitors into customers.
                    Delivered in 5-7 days with proven templates.
                  </p>
                  <p className="text-amber-400 font-bold">
                    Result: A website that works as hard as you do.
                  </p>
                  <a href="/web-design" className="inline-flex items-center gap-2 text-white hover:text-amber-400 mt-4 font-medium transition-colors">
                    See Website Packages <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Before/After Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={oneUploadEverywhereContractors}
              alt="Before and after transformation - professional social media presence"
              className="w-full"
            />
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 5: SOCIAL PROOF — Numbers Don't Lie
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Proof
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Marketers lie.<br />
            <span className="text-amber-400">Numbers don't.</span>
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">500+</p>
              <p className="text-neutral-300 text-sm md:text-base">Websites Built</p>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">10+</p>
              <p className="text-neutral-300 text-sm md:text-base">Years Experience</p>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">R7M+</p>
              <p className="text-neutral-300 text-sm md:text-base">Revenue Generated</p>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">4.9★</p>
              <p className="text-neutral-300 text-sm md:text-base">HelloPeter Rating</p>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">700+</p>
              <p className="text-neutral-300 text-sm md:text-base">Reviews Collected</p>
            </div>
            <div className="bg-neutral-800 rounded-xl p-6 text-center border border-neutral-700">
              <p className="text-3xl md:text-4xl font-black text-amber-400 mb-2">50+</p>
              <p className="text-neutral-300 text-sm md:text-base">Active Clients</p>
            </div>
          </div>

          {/* Results Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={beforeAfterReviews}
              alt="Real client results - before and after review growth"
              className="w-full"
            />
          </div>

          {/* CTA */}
          <CTAWithRating />

        </div>
      </section>

      {/* ============================================
          SECTION 6: THE AI WARNING — Why Now Matters
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-800 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              ⚠️ The Wake-Up Call
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Google is Changing.<br />
            <span className="text-amber-400">Are You Ready?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            This isn't scare tactics. This is reality.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Google is rolling out <strong className="text-white">AI-powered search results</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Instead of showing a list of websites, it now <strong className="text-white">SUMMARIZES businesses</strong>
            using reviews, social media activity, and online presence.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            Here's what this means for you:
          </p>

          <div className="space-y-4">
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-5">
              <p className="text-green-400 font-bold text-lg">
                ✓ Businesses with fresh reviews and active social media get featured.
              </p>
            </div>
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-5">
              <p className="text-red-400 font-bold text-lg">
                ✗ Businesses with dead profiles get buried.
              </p>
            </div>
          </div>

          {/* AI Overview Image */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
              <img
                src={googleAiOverviewRoofingPhone}
                alt="Google AI Overview showing how businesses are featured based on reviews and social activity"
                className="w-full"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            It's no longer about having a website.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            It's about being <span className="text-amber-400">VISIBLE everywhere</span>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            The contractors who adapt now will dominate for the next decade.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            The ones who wait will be fighting for scraps.
          </p>

          {/* CTA */}
          <CTAWithRating />

        </div>
      </section>

      {/* ============================================
          SECTION 7: DIY VS US — The Real Cost
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Comparison
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            "I could just do this myself..."
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            You could. But here's what that actually looks like:
          </p>

          {/* DIY Card */}
          <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-red-400 font-black text-lg mb-4">Doing It Yourself:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Facebook, write post, upload, publish
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Instagram, resize, write different caption, publish
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Google Business, write another version, upload
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Send review requests via WhatsApp manually
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Remember to do this every. single. week.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-red-500/30">
              <p className="text-neutral-200">Time per week:</p>
              <p className="text-2xl font-black text-red-400">5-8 hours</p>
              <p className="text-neutral-300 text-sm mt-1">Time you could be spending on actual paying work.</p>
            </div>
          </div>

          {/* With Us Card */}
          <div className="bg-green-900/40 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-green-400 font-black text-lg mb-4">With Local Pros Studio:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                We handle ALL your platforms
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                We write the captions, optimize for each platform
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                Reviews collected automatically via WhatsApp
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                Posts created from your job photos
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                Consistency guaranteed — we never miss a week
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-green-500/30">
              <p className="text-neutral-200">Your time per week:</p>
              <p className="text-2xl font-black text-green-400">60 seconds</p>
              <p className="text-neutral-300 text-sm mt-1">Upload photos. We handle the rest.</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white text-center pt-4">
            You didn't start a business to become a <span className="text-amber-400">social media manager</span>.
          </p>

        </div>
      </section>

      {/* ============================================
          SECTION 8: OBJECTION HANDLING — The Hard Questions
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              🤔 But What About...
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We Get It.<br />
            <span className="text-amber-400">You Have Questions.</span>
          </h2>

          {/* FAQ Cards */}
          <div className="space-y-4">

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <p className="text-white font-bold text-lg mb-3">"What if I get negative reviews?"</p>
              <p className="text-neutral-300">
                Our system catches unhappy customers <strong className="text-white">BEFORE</strong> they leave public reviews.
                They get routed to a private feedback form. You get notified immediately
                so you can call and resolve the issue. Most "negative reviews" never happen.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <p className="text-white font-bold text-lg mb-3">"What if I'm too busy to send you content?"</p>
              <p className="text-neutral-300">
                That's the whole point. You're <em>always</em> too busy. That's why we build
                automatic content into the system — service promotions, holiday posts,
                review highlights. You'll always have something going out.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <p className="text-white font-bold text-lg mb-3">"I've been burned by agencies before."</p>
              <p className="text-neutral-300">
                So have we. That's why we have: <strong className="text-amber-400">No long contracts</strong>. Cancel anytime.
                30-day money-back guarantee on reviews. You're never locked in.
              </p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700">
              <p className="text-white font-bold text-lg mb-3">"Is this only for contractors?"</p>
              <p className="text-neutral-300">
                We specialize in home service businesses — plumbers, electricians,
                fencing, pest control, cleaning — but the system works for any local
                business that relies on reviews and visibility.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 9: THE PACKAGES — Clear, Simple Pricing
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Choose Your Package
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight text-center">
            Pick Your Path to <span className="text-amber-400">Visibility</span>
          </h2>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-6">

            {/* Essential */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 relative">
              <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">Essential</p>
              <p className="text-neutral-400 text-sm mb-4">Best for: Businesses that need reviews</p>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-black text-white">R1,200</span>
                <span className="text-neutral-400">/mo</span>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "Automated review collection",
                  "WhatsApp + email requests",
                  "Negative review safeguards",
                  "AI-powered review responses",
                  "Real-time alerts"
                ].map((feature, i) => (
                  <p key={i} className="text-neutral-300 flex items-center text-sm">
                    <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" /> {feature}
                  </p>
                ))}
              </div>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 border-2 border-amber-500/50 text-white font-bold text-base px-6 py-4 rounded-full hover:bg-neutral-700 transition-all w-full"
              >
                Start Collecting Reviews
              </a>
            </div>

            {/* Growth */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 relative">
              <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">Growth</p>
              <p className="text-neutral-400 text-sm mb-4">Best for: Businesses that need social presence</p>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-black text-white">R2,000</span>
                <span className="text-neutral-400">/mo</span>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "Everything in Essential, plus:",
                  "Weekly social posts (FB, IG, Google)",
                  "4 service promotion posts/month",
                  "Holiday posts automated",
                  "Image posts + video reels"
                ].map((feature, i) => (
                  <p key={i} className="text-neutral-300 flex items-center text-sm">
                    <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" /> {feature}
                  </p>
                ))}
              </div>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 border-2 border-amber-500/50 text-white font-bold text-base px-6 py-4 rounded-full hover:bg-neutral-700 transition-all w-full"
              >
                Start Social Posting
              </a>
            </div>

            {/* Complete - Highlighted */}
            <div className="bg-neutral-900 border-2 border-amber-500 rounded-2xl p-6 relative overflow-hidden">
              {/* Best Value Badge */}
              <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-black px-3 py-1.5 rounded-full">
                BEST VALUE
              </div>
              {/* Glow */}
              <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-yellow-400/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">Complete</p>
              <p className="text-neutral-400 text-sm mb-4">Best for: Businesses that want it all</p>
              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-black text-white">R2,500</span>
                <span className="text-neutral-400">/mo</span>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "Reviews + Social combined",
                  "Priority support",
                  "Monthly strategy calls",
                  "Website review embedding",
                  "Save R700/month"
                ].map((feature, i) => (
                  <p key={i} className="text-neutral-300 flex items-center text-sm">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" /> {feature}
                  </p>
                ))}
              </div>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-black text-base px-6 py-4 rounded-full hover:scale-105 transition-all w-full shadow-lg shadow-yellow-400/30"
              >
                Get The Complete Package
              </a>
            </div>

          </div>

          {/* Setup Fee Note */}
          <p className="text-neutral-500 text-sm text-center pt-4">
            Setup fee: R2,500 (waived with 6-month commitment) • No long contracts • Cancel anytime
          </p>

        </div>
      </section>

      {/* ============================================
          SECTION 10: FINAL CTA — The Close
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden">
        {/* Subtle amber glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent"></div>

        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-8 leading-relaxed relative z-10">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            While Your Competitors Are Still<br />"Figuring It Out"...
          </h2>

          <p className="text-2xl md:text-3xl font-black text-amber-400">
            You'll Already Be Everywhere.
          </p>

          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Stop drowning in digital marketing.<br />
            Start running your actual business.
          </p>

          {/* Big CTA */}
          <div className="pt-4">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-400 text-black px-12 py-6 rounded-full shadow-xl shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all"
            >
              <span className="font-black text-xl md:text-2xl">Get Started Today — WhatsApp Us Now</span>
              <ArrowRight className="w-7 h-7" />
            </a>
          </div>

          <p className="text-neutral-400 text-base">
            Real people. Real support. Real results.<br />
            Not bots. Not generic templates. Not bullsh*t.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 pt-6 text-neutral-300 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>No Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>WhatsApp Support</span>
            </div>
          </div>

          {/* Final Image */}
          <div className="rounded-xl overflow-hidden border border-neutral-700 shadow-2xl max-w-2xl mx-auto">
            <img
              src={happyContractorLandscape}
              alt="Confident business owner with professional online presence"
              className="w-full"
            />
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeSalesLetterPage;
