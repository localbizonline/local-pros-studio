import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

// Import proof images
import beforeAfterProof from '../assets/images/Reviews/Local Pros reviews before and after.png';
import reviewTransformation from '../assets/images/Reviews/tile-3x2-review-transformation.png';
import whatsappToReview from '../assets/images/Reviews/review from WhatsApp to google review side by side.png';
import heroBackground from '../assets/images/Reviews/hero-background-phone-reviews.jpg';
import heroContractor from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import aiSearchNow from '../assets/images/Reviews/M6b-Ph5SpZpZyCzraej9O (1).webp';
import aiSearchFuture from '../assets/images/Reviews/nWsKTYC36b0cx6bns6MGz (1).png';
import contractorConfident from '../assets/images/Reviews/before and after pest control review.png';
import feedbackResolution from '../assets/images/Reviews/M6-nb4_Y5cLufwXr3N9E_ copy.jpg';
import facebookReviewPost from '../assets/images/aObjgryy3RyUZWZAcLX7g.webp';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const ReviewsProClientiPage = () => {
  const faqs = [
    {
      question: "How many reviews can I expect?",
      answer: "We can't guarantee a specific number — it depends on your customers responding. What we do guarantee: We follow industry best practices with multi-channel outreach and strategic follow-ups to give you the best possible chance of success."
    },
    {
      question: "Do you offer rewards for reviews?",
      answer: "No — this violates Google and Facebook rules. We never offer incentives for reviews, and we never post fake reviews. We build your reputation the right way."
    },
    {
      question: "What happens with negative feedback?",
      answer: "Unhappy customers are routed to a private feedback form instead of public review sites. You're alerted immediately so you can call and resolve the issue before it becomes a public problem."
    },
    {
      question: "How quickly will I see results?",
      answer: "We reach out to your past 90 days of customers during onboarding. Many clients see their first new reviews within the first week — sometimes within 48 hours."
    }
  ];

  return (
    <div className="min-h-screen">

      {/* ============================================
          HERO SECTION - With background image
          ============================================ */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/80 to-neutral-950" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
          {/* Service Label */}
          <p className="text-amber-400 text-base md:text-lg lg:text-xl font-bold tracking-wide mb-4 md:mb-6">
            Done-For-You Review Collection Service
          </p>

          {/* Main Headline - Direct & Bold */}
          <h1 className="font-['Bricolage_Grotesque'] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.0] mb-4 md:mb-6">
            Get More<br />
            <span className="text-amber-400">5-Star Reviews.</span>
          </h1>

          {/* Subhead - The "How" */}
          <p className="text-xl md:text-3xl lg:text-4xl text-neutral-300 mb-8 md:mb-12 leading-relaxed">
            Without lifting a finger.
          </p>

          <div className="flex flex-col gap-3 md:gap-4 justify-center max-w-md mx-auto sm:max-w-none sm:flex-row">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base md:text-xl lg:text-2xl px-6 md:px-10 py-4 md:py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
            >
              <span className="sm:hidden">Get Started</span>
              <span className="hidden sm:inline">Get Started Now</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center bg-transparent border-2 border-neutral-600 text-neutral-300 font-bold py-4 md:py-5 px-6 md:px-10 text-base md:text-xl rounded-full hover:bg-neutral-800 transition-all"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT IS SECTION - The Guide Story
          ============================================ */}
      <section className="bg-neutral-900 py-16 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-6 md:mb-8">What is Local Pros Studio?</p>

          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-6 md:mb-8">
            We're not some faceless marketing agency.<br />
            <span className="text-amber-400 font-bold">We're contractors who cracked the code.</span>
          </p>

          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-300 mb-8 md:mb-10">
            18 months ago, we had less than 20 Google reviews.<br />
            Today? <span className="font-bold text-white text-2xl md:text-3xl lg:text-4xl">Over 700.</span>
          </p>

          {/* Proof Image */}
          <div className="mb-8 md:mb-12">
            <img
              src={beforeAfterProof}
              alt="Local Pros reviews growth - from under 20 to over 700 reviews"
              className="max-w-full md:max-w-2xl mx-auto rounded-xl md:rounded-2xl shadow-2xl"
            />
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 mb-5 md:mb-6">
            We didn't get lucky. We didn't buy fake reviews.<br />
            We <span className="font-bold text-white">figured out what actually works</span>.
          </p>

          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-5 md:mb-6">
            The right time to ask.<br />
            The right way to ask.<br />
            And making it <span className="text-amber-400 font-bold">ridiculously easy</span> for happy customers to say yes.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-8 md:mb-10">
            We tested everything in our own business first.<br />
            Now we're opening up that same system to you —<br />
            so you can skip the 18 months of trial and error.
          </p>

          <p className="text-neutral-500 italic text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            (And yes, we'll sidestep negative reviews too — all while staying fully compliant with Google and Facebook guidelines.)
          </p>

          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 md:mb-10">
            We walked this path.<br />
            Now let us <span className="text-amber-400">guide you</span>.
          </p>

          {/* Contractor Image */}
          <div className="mb-8 md:mb-12">
            <img
              src={heroContractor}
              alt="Happy customer with contractor after job completion"
              className="max-w-full md:max-w-xl mx-auto rounded-xl md:rounded-2xl shadow-2xl"
            />
          </div>

          <a
            href={SITE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base md:text-lg lg:text-xl px-6 md:px-10 py-4 md:py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ============================================
          DONE FOR YOU SECTION - The Secret Sauce
          ============================================ */}
      <section id="how-it-works" className="bg-neutral-950 py-16 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-6 md:mb-8">The Secret Sauce</p>

          <h2 className="font-['Bricolage_Grotesque'] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8">
            Here's what we figured out<br />
            <span className="text-amber-400">(so you don't have to)</span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 mb-8 md:mb-10">
            Most customers <span className="font-bold text-white">want</span> to leave you a review.<br />
            They just... forget. Life gets busy.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-3 md:mb-4">
            We discovered that most people don't take action until the{' '}
            <span className="font-bold text-white">third reminder</span>.
          </p>

          <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-8 md:mb-10">
            And that <span className="font-bold text-white">WhatsApp</span> gets opened way more than email or SMS.
          </p>

          <p className="text-amber-400 italic text-base md:text-lg lg:text-xl mb-6 md:mb-8">So we built a system around it:</p>

          {/* WhatsApp to Review Image */}
          <div className="mb-8 md:mb-12">
            <img
              src={whatsappToReview}
              alt="WhatsApp message leading to Google review - the complete flow"
              className="max-w-full md:max-w-3xl mx-auto rounded-xl md:rounded-2xl shadow-2xl border border-neutral-800"
            />
          </div>

          <div className="space-y-3 md:space-y-4 text-left max-w-xl mx-auto mb-8 md:mb-12">
            <p className="text-base md:text-lg lg:text-xl text-white flex items-start">
              <span className="text-amber-400 mr-2 md:mr-3">→</span>
              <span><span className="font-bold">Automated WhatsApp messages</span> — sent at the perfect time</span>
            </p>
            <p className="text-base md:text-lg lg:text-xl text-white flex items-start">
              <span className="text-amber-400 mr-2 md:mr-3">→</span>
              <span><span className="font-bold">One-tap review links</span> — no friction, no confusion</span>
            </p>
            <p className="text-base md:text-lg lg:text-xl text-white flex items-start">
              <span className="text-amber-400 mr-2 md:mr-3">→</span>
              <span><span className="font-bold">Friendly follow-up reminders</span> — because life happens</span>
            </p>
            <p className="text-base md:text-lg lg:text-xl text-white flex items-start">
              <span className="text-amber-400 mr-2 md:mr-3">→</span>
              <span><span className="font-bold">The right words</span> — that feel personal, not pushy</span>
            </p>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 mb-3 md:mb-4">
            We only work with{' '}
            <span className="font-bold text-white">REAL reviews</span>{' '}
            from <span className="font-bold text-white">YOUR real customers</span>.
          </p>

          <p className="text-neutral-500 italic text-sm md:text-base lg:text-lg mb-8 md:mb-12">
            (No fake reviews, no buying reviews, ever.)
          </p>

          <div className="bg-neutral-900 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10 max-w-2xl mx-auto">
            <p className="text-amber-400 font-bold text-lg md:text-xl mb-3 md:mb-4">Your part is simple:</p>
            <p className="text-neutral-300 text-base md:text-lg mb-3 md:mb-4">
              You finish a job. Send us the customer details. We handle everything else.
            </p>
            <p className="text-white font-bold text-lg md:text-xl lg:text-2xl">
              Then just watch your review count climb —{' '}
              <span className="text-amber-400">week after week</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          RESULTS SECTION - Clean copywriting
          ============================================ */}
      <section className="bg-neutral-900 py-16 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-6 md:mb-8">Real Results</p>

          <h2 className="font-['Bricolage_Grotesque'] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 md:mb-8">
            We Make Review Collection{' '}
            <span className="text-amber-400">Effortless</span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 mb-6 md:mb-8 max-w-3xl mx-auto">
            Most great contractors <span className="font-bold text-white">lack the reviews they deserve</span>{' '}
            simply because their review collection system is either{' '}
            <span className="font-bold text-white">ineffective</span> or{' '}
            <span className="font-bold text-white">non-existent</span>.
          </p>

          {/* Transformation Image */}
          <div className="mb-8 md:mb-12">
            <img
              src={reviewTransformation}
              alt="Review transformation results - before and after"
              className="max-w-full md:max-w-3xl mx-auto rounded-xl md:rounded-2xl shadow-2xl"
            />
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold mb-4 md:mb-6">
            We've perfected every aspect of review collection.
          </p>

          <p className="text-lg md:text-xl lg:text-2xl text-amber-400 mb-8 md:mb-12">
            The results speak for themselves.
          </p>

          <a
            href={SITE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base md:text-lg lg:text-xl px-6 md:px-10 py-4 md:py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ============================================
          WHY NOW SECTION - Copywriting style
          ============================================ */}
      <section className="bg-neutral-950 py-16 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-4 md:mb-6">Important</p>
            <h2 className="font-['Bricolage_Grotesque'] text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
              Why you need to focus on your reviews{' '}
              <span className="text-amber-400">NOW</span>:
            </h2>
          </div>

          <div className="text-center mb-10 md:mb-16">
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-200 mb-4 md:mb-6">
              Google is rolling out <span className="font-bold text-white">AI-powered overviews</span> at the top of search results.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-4 md:mb-6">
              Instead of just listing websites, Google now <span className="font-bold text-white">summarizes what people say about you</span> —
              pulling directly from your reviews.
            </p>

            <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-6 md:mb-8">
              This is already happening. Here's what it looks like:
            </p>

            {/* AI Search Examples - Stacked */}
            <div className="space-y-4 md:space-y-6 max-w-3xl mx-auto mb-8 md:mb-10">
              <div className="hidden md:block">
                <img
                  src={aiSearchNow}
                  alt="Google AI Overview on desktop - reviews featured prominently"
                  className="w-full rounded-xl md:rounded-2xl shadow-2xl border border-neutral-800"
                />
              </div>
              <div>
                <img
                  src={aiSearchFuture}
                  alt="Google AI Overview on mobile - reviews featured prominently"
                  className="w-full rounded-xl md:rounded-2xl shadow-2xl border border-neutral-800"
                />
              </div>
            </div>

            <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-3 md:mb-4">
              It's no longer about <span className="font-bold text-white">keywords</span> or what you say on your website...
            </p>

            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-400">
              ...it's about what <span className="text-white">others</span> say about you.
            </p>
          </div>

          <div className="text-center">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-base md:text-lg lg:text-xl px-6 md:px-10 py-4 md:py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================
          NEGATIVE REVIEW SAFEGUARDS
          ============================================ */}
      <section className="bg-neutral-900 py-16 md:py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16">
            <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-4 md:mb-6">Built-In Protection</p>
            <h2 className="font-['Bricolage_Grotesque'] text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
              What About{' '}
              <span className="text-amber-400">Negative Reviews?</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 max-w-3xl mx-auto">
              Most contractors secretly worry about this. That's why we built safeguards directly into the system.
            </p>
          </div>

          {/* How It Works - With Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
                Unhappy customers never reach Google.
              </h3>
              <p className="text-base md:text-lg text-neutral-300 mb-4 md:mb-6">
                Before anyone leaves a review, they're asked a simple question: <span className="text-white font-bold">"How was your experience?"</span>
              </p>
              <p className="text-base md:text-lg text-neutral-300 mb-4 md:mb-6">
                If they indicate anything less than satisfied, they're directed to a <span className="text-white font-bold">private feedback form</span> instead of a public review site.
              </p>
              <p className="text-base md:text-lg text-neutral-300">
                You get notified immediately — giving you the chance to <span className="text-amber-400 font-bold">call and resolve the issue</span> before it ever becomes public.
              </p>
            </div>
            <div>
              <img
                src={feedbackResolution}
                alt="Negative feedback routed privately, then resolved with a phone call"
                className="w-full rounded-xl md:rounded-2xl shadow-2xl border border-neutral-700"
              />
            </div>
          </div>

          {/* The Result - With Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={contractorConfident}
                alt="Confident contractor with wall of 5-star reviews"
                className="w-full rounded-xl md:rounded-2xl shadow-2xl border border-neutral-700"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="font-['Bricolage_Grotesque'] text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
                The result? Near-perfect ratings.
              </h3>
              <p className="text-base md:text-lg text-neutral-300 mb-4 md:mb-6">
                Our clients consistently achieve average ratings of <span className="text-amber-400 font-bold text-lg md:text-xl">4.7, 4.8, 4.9</span> — and some hit a perfect <span className="text-amber-400 font-bold text-lg md:text-xl">5.0</span>.
              </p>
              <p className="text-base md:text-lg text-neutral-300 mb-6 md:mb-8">
                Not because we hide bad reviews — but because we help you <span className="text-white font-bold">fix problems before they go public</span>.
              </p>
              <div className="space-y-2 md:space-y-3">
                <p className="text-neutral-200 flex items-center text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 md:mr-3 flex-shrink-0" />
                  100% compliant with Google & Facebook
                </p>
                <p className="text-neutral-200 flex items-center text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 md:mr-3 flex-shrink-0" />
                  No fake reviews, ever
                </p>
                <p className="text-neutral-200 flex items-center text-sm md:text-base">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 mr-2 md:mr-3 flex-shrink-0" />
                  Real feedback from real customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SOCIAL PROOF BONUS - Facebook posting
          ============================================ */}
      <section className="bg-neutral-950 py-16 md:py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-4 md:mb-6">Bonus Feature Included</p>
              <h2 className="font-['Bricolage_Grotesque'] text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 md:mb-6">
                Your Best Reviews.<br />
                <span className="text-amber-400">Posted to Facebook.</span>
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-neutral-300 mb-4 md:mb-6">
                Every great review you receive gets turned into a <span className="text-white font-bold">beautiful social post</span> — and shared on your Facebook page automatically.
              </p>

              <p className="text-sm md:text-base lg:text-lg text-neutral-400">
                Build social proof while you sleep. Your happy customers become your marketing — without you lifting a finger.
              </p>
            </div>

            <div className="mt-6 lg:mt-0">
              <img
                src={facebookReviewPost}
                alt="5-star Google review posted to Facebook as social proof"
                className="w-full rounded-xl md:rounded-2xl shadow-2xl border border-neutral-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PRICING SECTION - Final Section
          ============================================ */}
      <section className="bg-neutral-950 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          {/* Headline */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-amber-400 text-sm tracking-[3px] uppercase mb-4 md:mb-6">Get Started</p>
            <h2 className="font-['Bricolage_Grotesque'] text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
              Start Collecting Reviews<br />
              <span className="text-amber-400">This Week</span>
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-300">
              Get set up in days. See your first reviews rolling in.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-10 lg:p-12 mb-6 md:mb-8">

            {/* 50% Off Badge */}
            <div className="flex justify-center mb-6 md:mb-10">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold px-4 md:px-8 py-2 md:py-3 rounded-full uppercase tracking-wide text-sm md:text-base">
                50% Off First 3 Months
              </div>
            </div>

            {/* Price Display */}
            <div className="text-center mb-8 md:mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-2 md:mb-3">
                <span className="text-2xl md:text-3xl text-neutral-500 line-through">R1,200</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">R600</span>
                  <span className="text-xl md:text-2xl text-neutral-400">/mo</span>
                </div>
              </div>
              <p className="text-base md:text-lg text-neutral-400">for your first 3 months, then R1,200/mo</p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
              {[
                "High-Response Review Requests",
                "Automated Follow-Up System",
                "Negative Review Safeguards",
                "Real-Time Review Alerts",
                "AI-Powered Review Responses",
                "Full Dashboard Access",
                "Monthly Strategy Check-ins",
                "Past 90 Days Kickstart"
              ].map((feature, i) => (
                <p key={i} className="text-neutral-200 flex items-center text-base md:text-lg">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" /> {feature}
                </p>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mb-8 md:mb-10">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-lg md:text-xl lg:text-2xl px-8 md:px-12 py-4 md:py-6 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>

            {/* Money-Back Guarantee Badge */}
            <div className="flex justify-center">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-neutral-950 border border-neutral-700 rounded-xl px-5 md:px-8 py-5 text-center sm:text-left">
                {/* Shield Badge */}
                <div className="relative flex-shrink-0">
                  <svg className="w-14 h-14 md:w-20 md:h-20 text-green-500" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 4L8 14V30C8 46 18.4 58.4 32 62C45.6 58.4 56 46 56 30V14L32 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-lg md:text-xl">30-Day Money-Back Guarantee</p>
                  <p className="text-neutral-400 text-sm md:text-base">If we don't generate any 5-star reviews, you get your money back.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Setup note */}
          <p className="text-center text-neutral-500 text-sm md:text-base">
            Setup fee: R2,500 (waived with 6-month commitment)
          </p>

          {/* What We Need Section - Inside Pricing */}
          <div className="mt-12 md:mt-20 pt-12 md:pt-16 border-t border-neutral-800">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="font-['Bricolage_Grotesque'] text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                What Do We Need From You?
              </h3>
              <p className="text-lg md:text-xl text-amber-400 font-bold">
                Almost nothing.
              </p>
            </div>

            <p className="text-base md:text-lg text-neutral-300 text-center max-w-3xl mx-auto mb-6 md:mb-8">
              We've built this system to be <span className="text-white font-bold">completely hands-off</span> for you. We know you're busy running your business — so we designed it to work without you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 md:p-6">
                <p className="text-amber-400 font-bold mb-2 md:mb-3 text-sm md:text-base">If you use Sage or QuickBooks:</p>
                <p className="text-neutral-300 text-sm md:text-base">Our system connects directly to your accounting software and automatically pulls your completed jobs. Reviews start going out without you doing anything.</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 md:p-6">
                <p className="text-amber-400 font-bold mb-2 md:mb-3 text-sm md:text-base">If you don't:</p>
                <p className="text-neutral-300 text-sm md:text-base">Simply BCC us on your invoice emails, or fill in a quick form. That's it — we handle everything else.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ReviewsProClientiPage;
