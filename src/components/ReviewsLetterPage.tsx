import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';

// Scrolling faces images (South African focused)
import reviewContractorHappy from '../assets/images/review-contractor-happy.jpg';
import contractorPhoneCallSA from '../assets/images/Reviews/contractor-phone-call-sa.jpg';
import happyContractorInstagram from '../assets/images/social-posting/happy contractor with instagram mockup copy.jpg';
import reviewCustomer from '../assets/images/review-customer.jpg';
import teamPhoto from '../assets/images/team.jpg';
import happyBusinessOwner from '../assets/images/reviews-pro/happy-business-owner.jpg';
import heroContractorHandshake from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import contractorConfidentReviews from '../assets/images/Reviews/contractor-confident-reviews.jpg';

// Scrolling Faces Data
const scrollingFaces = [
  { src: reviewContractorHappy, alt: 'SA contractor checking reviews' },
  { src: contractorPhoneCallSA, alt: 'Cape Town contractor on phone' },
  { src: happyContractorInstagram, alt: 'Construction worker with phone' },
  { src: reviewCustomer, alt: 'Happy customer leaving review' },
  { src: teamPhoto, alt: 'Local Pros team' },
  { src: happyBusinessOwner, alt: 'Happy business owner' },
  { src: heroContractorHandshake, alt: 'Contractor meeting customer' },
  { src: contractorConfidentReviews, alt: 'Confident business owner' },
];

// Scrolling Faces Component
const ScrollingFaces = () => (
  <div className="relative w-full overflow-hidden py-6">
    {/* Gradient overlays for fade effect */}
    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    
    {/* Scrolling container */}
    <div className="flex animate-scroll-left">
      {/* First set of images */}
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
      {/* Duplicate set for seamless loop */}
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

// Reusable CTA Button with Star Rating
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
    
    {/* Star Rating Below */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-5 md:mt-6">
      <div className="flex">
        {[1, 2, 3, 4].map((i) => (
          <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
        ))}
        <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400/60" />
      </div>
      <p className="text-neutral-300 text-sm md:text-lg">
        <span className="font-bold text-white">4.6 stars</span> out of <span className="font-bold text-white">780 reviews</span>
      </p>
    </div>
  </div>
);

// Import proof images
import beforeAfterProof from '../assets/images/Reviews/Local Pros reviews before and after.png';
import reviewTransformation from '../assets/images/Reviews/tile-3x2-review-transformation.png';
import whatsappToReview from '../assets/images/Reviews/review from WhatsApp to google review side by side.png';
import heroBackground from '../assets/images/Reviews/hero-background-phone-reviews.jpg';
import reviewContractor from '../assets/images/review-contractor-happy.jpg';
import heroContractor from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import aiSearchNow from '../assets/images/Reviews/M6b-Ph5SpZpZyCzraej9O (1).webp';
import aiSearchFuture from '../assets/images/Reviews/nWsKTYC36b0cx6bns6MGz (1).png';
import contractorConfident from '../assets/images/Reviews/before and after pest control review.png';
import feedbackResolution from '../assets/images/Reviews/M6-nb4_Y5cLufwXr3N9E_ copy.jpg';
import facebookReviewPost from '../assets/images/aObjgryy3RyUZWZAcLX7g.webp';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const ReviewsLetterPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden">

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">
            {/* Pre-headline / Callout */}
            <p className="text-amber-400 font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
              Done-For-You Review Collection Service
            </p>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Get New Five-Star Reviews{' '}
              <span className="text-yellow-400">In Your First 30 Days...</span>{' '}
              <span className="text-white block md:inline">Or Your Money Back</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-3xl mx-auto">
              The "Set & Forget" Review System That Works While You Sleep
            </p>

            {/* Hero Image with overlay */}
            <div className="relative max-w-2xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20 border-4 border-yellow-400/60">
              <img
                src={reviewContractor}
                alt="Happy contractor checking 5-star reviews on phone"
                className="w-full object-cover"
              />
            </div>

            {/* CTA Button */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl md:text-2xl px-10 py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
            >
              Get Started Today
              <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-neutral-500 text-sm mt-4">
              Join 50+ local businesses already getting more reviews
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 text-neutral-400 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Month-to-Month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>7-Day Setup</span>
              </div>
            </div>

            {/* Scrolling Faces Section */}
            <div className="mt-10 pt-8 border-t border-neutral-800">
              <p className="text-neutral-500 text-xs text-center mb-2 uppercase tracking-widest">Trusted by SA business owners</p>
              <ScrollingFaces />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 1: THE GUIDE STORY
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Who We Are
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We're not some faceless<br />marketing agency.
          </h2>

          <p className="text-xl md:text-2xl font-bold text-white">
            We're local business owners who cracked the code.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            18 months ago, we had less than 20 Google reviews.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Today? <span className="text-3xl md:text-4xl font-black text-amber-400">Over 700.</span>
          </p>

          {/* Proof Image */}
          <img
            src={beforeAfterProof}
            alt="Local Pros reviews growth - from under 20 to over 700 reviews"
            className="w-full rounded-xl shadow-2xl"
          />

          <p className="text-lg md:text-xl text-neutral-300">
            We didn't get lucky.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We didn't buy fake reviews.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            We figured out what actually works.
          </p>

          <div className="pl-6 border-l-4 border-amber-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">The right time to ask.</p>
            <p className="text-lg md:text-xl text-neutral-200">The right way to ask.</p>
            <p className="text-lg md:text-xl text-neutral-200">And making it <strong className="text-amber-400">ridiculously easy</strong> for happy customers to say yes.</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            We tested everything in our own business first.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Now we're opening up that same system to you — so you can skip the 18 months of trial and error.
          </p>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-900/50 py-3 pr-4 rounded-r-lg">
            (And yes, we'll sidestep negative reviews too — all while staying fully compliant with Google and Facebook guidelines.)
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            We walked this path.<br />
            Now let us <span className="text-amber-400">guide you</span>.
          </p>

          {/* Contractor Image */}
          <img
            src={heroContractor}
            alt="Happy customer with contractor after job completion"
            className="w-full rounded-xl shadow-2xl"
          />

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE SECRET SAUCE
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950" id="how-it-works">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Secret Sauce
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Here's what we figured out<br />
            <span className="text-amber-400">(so you don't have to)</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Most customers <strong className="text-white">want</strong> to leave you a review.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            They just... forget. Life gets busy.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            We discovered that most people don't take action until the third reminder.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And that <strong className="text-amber-400">WhatsApp</strong> gets opened way more than email or SMS.
          </p>

          <p className="text-xl md:text-2xl font-black text-amber-400 italic">
            So we built a system around it:
          </p>

          {/* WhatsApp to Review Image */}
          <img
            src={whatsappToReview}
            alt="WhatsApp message leading to Google review - the complete flow"
            className="w-full rounded-xl shadow-2xl border border-neutral-800"
          />

          <div className="space-y-4 pl-6 border-l-4 border-amber-500">
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Automated WhatsApp messages</strong> — sent at the perfect time
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">One-tap review links</strong> — no friction, no confusion
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Friendly follow-up reminders</strong> — because life happens
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">The right words</strong> — that feel personal, not pushy
            </p>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white pt-4">
            We only work with REAL reviews from YOUR real customers.
          </p>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-800/50 py-3 pr-4 rounded-r-lg">
            (No fake reviews, no buying reviews, ever.)
          </p>

          {/* Simple Box */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 md:p-10 border border-neutral-700">
            <p className="text-amber-400 font-black text-xl mb-4">Your part is simple:</p>
            <p className="text-neutral-200 text-lg md:text-xl mb-4">
              You finish a job. Send us the customer details. We handle everything else.
            </p>
            <p className="text-2xl md:text-3xl font-black text-white">
              Then just watch your review count climb — <span className="text-amber-400">week after week</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: RESULTS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Real Results
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We Make Review Collection<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Effortless</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Most great local businesses <strong className="text-white">lack the reviews they deserve</strong> simply because their review collection system is either <strong className="text-white">ineffective</strong> or <strong className="text-white">non-existent</strong>.
          </p>

          {/* Transformation Image */}
          <img
            src={reviewTransformation}
            alt="Review transformation results - before and after"
            className="w-full rounded-xl shadow-2xl"
          />

          <p className="text-xl md:text-2xl font-black text-white">
            We've perfected every aspect of review collection.
          </p>

          <p className="text-xl md:text-2xl font-bold text-amber-400">
            The results speak for themselves.
          </p>

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 4: WHY NOW - URGENCY
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              ⚠️ Important
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Why you need to focus<br />on your reviews <span className="text-amber-400">NOW</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Google is rolling out <strong className="text-white">AI-powered overviews</strong> at the top of search results.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Instead of just listing websites, Google now <strong className="text-white">summarizes what people say about you</strong> — pulling directly from your reviews.
          </p>

          <p className="text-lg md:text-xl text-neutral-400 italic">
            This is already happening. Here's what it looks like:
          </p>

          {/* AI Search Examples */}
          <div className="space-y-6">
            <img
              src={aiSearchNow}
              alt="Google AI Overview on desktop - reviews featured prominently"
              className="hidden md:block w-full rounded-xl shadow-2xl border border-neutral-800"
            />
            <img
              src={aiSearchFuture}
              alt="Google AI Overview on mobile - reviews featured prominently"
              className="w-full rounded-xl shadow-2xl border border-neutral-800"
            />
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            It's no longer about <strong className="text-white">keywords</strong> or what you say on your website...
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            ...it's about what <span className="text-amber-400">others</span> say about you.
          </p>

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 5: NEGATIVE REVIEW SAFEGUARDS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              🛡️ Built-In Protection
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            What About<br />
            <span className="text-amber-400">Negative Reviews?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Most local businesses secretly worry about this.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            That's why we built safeguards directly into the system.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-4">
            Unhappy customers never reach Google.
          </h3>

          <p className="text-lg md:text-xl text-neutral-300">
            Before anyone leaves a review, they're asked a simple question: <strong className="text-white">"How was your experience?"</strong>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            If they indicate anything less than satisfied, they're directed to a <strong className="text-white">private feedback form</strong> instead of a public review site.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            You get notified immediately — giving you the chance to <span className="text-amber-400">call and resolve the issue</span> before it ever becomes public.
          </p>

          {/* Image */}
          <img
            src={feedbackResolution}
            alt="Negative feedback routed privately, then resolved with a phone call"
            className="w-full rounded-xl shadow-2xl border border-neutral-700"
          />

          <h3 className="text-2xl md:text-3xl font-black text-white">
            The result? <span className="text-amber-400">Near-perfect ratings.</span>
          </h3>

          <p className="text-lg md:text-xl text-neutral-300">
            Our clients consistently achieve average ratings of <span className="text-2xl font-black text-amber-400">4.7, 4.8, 4.9</span> — and some hit a perfect <span className="text-2xl font-black text-amber-400">5.0</span>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Not because we hide bad reviews — but because we help you <strong className="text-white">fix problems before they go public</strong>.
          </p>

          {/* Image */}
          <img
            src={contractorConfident}
            alt="Confident contractor with wall of 5-star reviews"
            className="w-full rounded-xl shadow-2xl border border-neutral-700"
          />

          <div className="space-y-4 bg-amber-950/20 border border-amber-900/30 rounded-2xl p-6">
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              100% compliant with Google & Facebook
            </p>
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              No fake reviews, ever
            </p>
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              Real feedback from real customers
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: SOCIAL PROOF BONUS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              🎁 Bonus Included
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Your Best Reviews.<br />
            <span className="text-amber-400">Posted to Facebook.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Every great review you receive gets turned into a <strong className="text-white">beautiful social post</strong> — and shared on your Facebook page automatically.
          </p>

          <p className="text-lg md:text-xl text-neutral-300 italic border-l-2 border-amber-500/50 pl-4 bg-neutral-900/50 py-3 pr-4 rounded-r-lg">
            Build social proof while you sleep. Your happy customers become your marketing — without you lifting a finger.
          </p>

          {/* Image */}
          <img
            src={facebookReviewPost}
            alt="5-star Google review posted to Facebook as social proof"
            className="w-full rounded-xl shadow-2xl border border-neutral-800"
          />
        </div>
      </section>

      {/* ============================================
          SECTION 7: PRICING
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Get Started
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Start Collecting Reviews<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">This Week</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Get set up in days. See your first reviews rolling in.
          </p>

          {/* Pricing Card */}
          <div className="bg-neutral-950 border-2 border-amber-500/30 rounded-2xl md:rounded-3xl p-5 md:p-10 my-8 relative overflow-hidden text-black">
            
            {/* Glow Effect - hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            {/* Badge */}
            <div className="mb-6 md:mb-8 relative">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black px-4 md:px-6 py-2 md:py-3 rounded-full uppercase tracking-wide text-xs md:text-sm shadow-lg">
                Month-to-Month
              </span>
            </div>

            {/* Price Display */}
            <div className="mb-6 md:mb-8 relative">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-4xl md:text-6xl lg:text-7xl font-black text-white">R1,200</span>
                <span className="text-lg md:text-xl text-neutral-400">/mo</span>
              </div>
              <p className="text-sm md:text-base text-neutral-400 mt-2">Month-to-month. Cancel anytime.</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 relative">
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
                <p key={i} className="text-neutral-200 flex items-center text-sm md:text-lg font-medium">
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-amber-400 mr-3 md:mr-4 flex-shrink-0" /> {feature}
                </p>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 bg-yellow-400 text-black font-black text-base md:text-xl px-6 md:px-10 py-4 md:py-5 rounded-full hover:scale-105 transition-all w-full shadow-lg shadow-yellow-400/30"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </a>

            {/* Money-Back Guarantee */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-amber-950/20 border border-amber-800/30 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 mt-6 md:mt-8 relative text-center sm:text-left">
              <svg className="w-10 h-10 md:w-14 md:h-14 text-amber-500 flex-shrink-0" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L8 14V30C8 46 18.4 58.4 32 62C45.6 58.4 56 46 56 30V14L32 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-white font-bold text-base md:text-lg">30-Day Money-Back Guarantee</p>
                <p className="text-neutral-400 text-xs md:text-sm">If we don't generate any 5-star reviews, you get your money back.</p>
              </div>
            </div>
          </div>

          <p className="text-neutral-500 text-sm italic">
            Want weekly social posts too? The <Link to="/special-offer-bundle" className="underline hover:text-white">R2,500 plan</Link> adds
            posting and a free website worth R9,900 (6-month commitment).
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 8: WHAT WE NEED
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          <h3 className="text-2xl md:text-3xl font-black text-white">
            What Do We Need From You?
          </h3>

          <p className="text-2xl md:text-3xl font-black text-amber-400">
            Almost nothing.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We've built this system to be <strong className="text-white">completely hands-off</strong> for you.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We know you're busy running your business — so we designed it to work without you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-6">
              <p className="text-amber-400 font-black text-lg mb-3">If you use Sage or QuickBooks:</p>
              <p className="text-neutral-300 text-base leading-relaxed">Our system connects directly to your accounting software and automatically pulls your completed jobs. Reviews start going out without you doing anything.</p>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-6">
              <p className="text-amber-400 font-black text-lg mb-3">If you don't:</p>
              <p className="text-neutral-300 text-base leading-relaxed">Simply BCC us on your invoice emails, or fill in a quick form. That's it — we handle everything else.</p>
            </div>
          </div>


        </div>
      </section>

    </div>
  );
};

export default ReviewsLetterPage;
