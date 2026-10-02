import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

// Import social posting images - Before/After comparisons and AI overviews
import facebookBeforeAfterFencing from '../assets/images/social-posting/facebook-before-after-fencing.webp';
import facebookBeforeAfterGasDesktop from '../assets/images/social-posting/facebook-before-after-gas-desktop.webp';
import facebookBeforeAfterGasTablet from '../assets/images/social-posting/facebook-before-after-gas-tablet.webp';
import googleAiOverviewRenovations from '../assets/images/social-posting/google-ai-overview-renovations.webp';
import googleAiOverviewRoofingPhone from '../assets/images/social-posting/google-ai-overview-roofing-phone.webp';
import googleAiOverviewSearch from '../assets/images/social-posting/google-ai-overview-search.webp';

// Gallery images - Real client post examples
import socialPostFencingCarportJob from '../assets/images/social-posting/social-post-fencing-carport-job.webp';
import socialPostFencingGallery from '../assets/images/social-posting/social-post-fencing-gallery.webp';
import socialPostGasGeyserService from '../assets/images/social-posting/social-post-gas-geyser-service.webp';
import socialPostGasHobsService from '../assets/images/social-posting/social-post-gas-hobs-service.webp';
import socialPostFencingHoliday from '../assets/images/social-posting/social-post-fencing-holiday.webp';
import socialPostFencingNewYear from '../assets/images/social-posting/social-post-fencing-new-year.webp';
import closeupPhonePostCreator from '../assets/images/social-posting/Closeup phone using post creator.webp';
import sideBySide3Platforms from '../assets/images/social-posting/side by side 3 platforms with lable.webp';
import oneUploadPostEverywhere from '../assets/images/social-posting/one-upload post everywhere.webp';
import greenbayFacebookGallery from '../assets/images/social-posting/Greenbay fencing Facebook gallery.png';
import postCalendar from '../assets/images/social-posting/post calender.webp';
import oneUploadEverywhereContractors from '../assets/images/social-posting/one upload everywhere for contractors.webp';
import socialInstagramTruck from '../assets/images/social-instagram-truck.jpg';
import happyContractorInstagram from '../assets/images/social-posting/happy contractor with instagram mockup copy.jpg';
import happyContractorLandscape from '../assets/images/social-posting/happy contractor with social posting landscape ratio.webp';
import deadBusinessNoSocials from '../assets/images/social-posting/dead business if no socials since 2021.jpg';

// Scrolling faces images (South African focused)
import reviewContractorHappy from '../assets/images/review-contractor-happy.jpg';
import contractorPhoneCallSA from '../assets/images/Reviews/contractor-phone-call-sa.jpg';
import reviewCustomer from '../assets/images/review-customer.jpg';
import teamPhoto from '../assets/images/team.jpg';
import happyBusinessOwner from '../assets/images/reviews-pro/happy-business-owner.jpg';
import heroContractorHandshake from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import contractorConfident from '../assets/images/Reviews/contractor-confident-reviews.jpg';
import { SITE_WHATSAPP_URL } from '../whatsapp';

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

// Reusable CTA Button with Scarcity
const CTAWithRating = () => (
  <div className="py-8 md:py-10">
    {/* Big Amber CTA Button */}
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-yellow-400 text-black font-black text-lg md:text-2xl lg:text-3xl px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30 uppercase tracking-tight"
    >
      Get Started
      <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
    </a>

    {/* Capacity Message Below */}
    <div className="flex flex-col items-center justify-center gap-2 mt-5 md:mt-6">
      <p className="text-amber-400 font-bold text-sm md:text-base">
        We take on about 12 new clients a month
      </p>
    </div>
  </div>
);


const SocialPostingPageV2 = () => {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* ============================================
          HERO SECTION - Sales Funnel Psychology
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">

            {/* Quick Proof Statement */}
            <p className="text-amber-400 font-bold text-sm md:text-base mb-6">
              Done-for-you social media posting for local businesses who don't have time.
            </p>

            {/* Big Promise Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Get <span className="text-yellow-400">Professional Social Media Posts</span><br />
              Without Lifting a Finger
            </h1>

            {/* The Hook - What They Actually Get */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-4 max-w-3xl mx-auto">
              We take your job photos and turn them into scroll-stopping posts for Facebook, Instagram, and Google — <span className="text-white font-semibold">published for you every week.</span>
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl md:text-5xl font-black text-white mb-3">
                R2,000<span className="text-neutral-400 text-xl font-normal">/month</span>
              </p>
            </div>

            {/* Main CTA with scarcity built in */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center bg-yellow-400 text-black px-10 py-5 rounded-full shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all mb-4"
            >
              <span className="flex items-center gap-3 font-black text-xl md:text-2xl">
                Get Started
                <ArrowRight className="w-6 h-6" />
              </span>
              <span className="text-sm font-bold opacity-80">Month-to-month</span>
            </a>

            {/* Risk Reversal */}
            <p className="text-neutral-400 text-sm mb-6">
              Month-to-month. Cancel anytime. Or add reviews with the R2,500 plan.
            </p>

            {/* Scrolling Faces Section */}
            <div className="mb-8">
              <p className="text-neutral-500 text-xs text-center mb-2 uppercase tracking-widest">Trusted by SA business owners</p>
              <ScrollingFaces />
            </div>

            {/* Hero Image */}
            <div className="max-w-2xl mx-auto">
              <img
                src={happyContractorInstagram}
                alt="Happy contractor with professional Instagram social media presence"
                className="w-full rounded-2xl border-2 border-neutral-700 shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 1: THE PROBLEM
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Problem
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            You know social media matters.<br />You just don't have the time.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            You're not alone. Every local business we talk to says the same thing:
          </p>

          <div className="pl-6 pr-4 py-4 border-l-4 border-amber-500 bg-white rounded-r-lg space-y-3">
            <p className="text-lg md:text-xl text-neutral-800 italic font-semibold">"I know I should post more, but I never have time."</p>
            <p className="text-lg md:text-xl text-neutral-800 italic font-semibold">"I take photos of my work but never do anything with them."</p>
            <p className="text-lg md:text-xl text-neutral-800 italic font-semibold">"I don't know what to say or how to make it look professional."</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            And hiring a marketing agency? <span className="text-red-400 font-bold">Forget it.</span>
          </p>

          <p className="text-lg md:text-xl text-neutral-400 line-through">
            R8,000 to R15,000 per month.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            For most local businesses, that's <strong className="text-white">completely out of reach</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            So what happens?
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            You go silent. Weeks turn into months. Your last post was... when exactly?
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Meanwhile, your competitors are showing up in people's feeds <strong className="text-white">every single week</strong>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            When a homeowner gets a quote, the first thing they do is <strong className="text-white">look you up</strong>. They check your Facebook. Your Instagram. Your Google listing.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And if your last post was <strong className="text-red-400">6 months ago</strong>? They assume you're out of business — or worse, not worth calling.
          </p>

          {/* Image: Dead business with no socials */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={deadBusinessNoSocials}
              alt="Business appears dead when social media hasn't been updated since 2021"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE SOLUTION - OUR SYSTEM
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950" id="how-it-works">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Solution
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We built something<br />
            <span className="text-amber-400">that changes everything.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Over the last <strong className="text-white">12 months</strong>, we developed a proprietary content system.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            It combines <strong className="text-amber-400">AI tools</strong> with <strong className="text-amber-400">human oversight</strong> — specifically designed for local businesses.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            What used to take a marketing agency 4 hours...
          </p>

          <p className="text-2xl md:text-3xl font-black text-amber-400">
            Our system does in 15 minutes.
          </p>

          {/* Image: AI System Visualization - Before/After Gas Business */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={facebookBeforeAfterGasTablet}
              alt="Before and after comparison showing a gas installation business Facebook page transformation with professional posts"
              className="w-full aspect-[4/3] object-cover object-top"
            />
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            That's why we can charge <strong className="text-white">R2,000 per month</strong> instead of R8,000+.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Same quality. Same consistency. Same results.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            Just <span className="text-amber-400">75% cheaper</span>.
          </p>

          <div className="space-y-4 pl-6 border-l-4 border-amber-500">
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">AI-powered content creation</strong> — turns your job updates into polished posts in minutes
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Customised for YOUR business</strong> — learns your services, your area, your style
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Human quality control</strong> — every post reviewed before it goes live
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Three platforms, one upload</strong> — Facebook, Instagram, and Google Business
            </p>
          </div>

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION: GALLERY - REAL CLIENT EXAMPLES
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Real Results
            </p>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-4">
              This Is What Your Feed<br />
              <span className="text-amber-400">Could Look Like</span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-300 mb-2">
              Real posts. Real clients. <strong className="text-white">Created in minutes.</strong>
            </p>

            <p className="text-base text-neutral-400">
              While you're on the job site, we're turning your photos into scroll-stopping content that makes your business look like a million bucks.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Job Completion Post */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostFencingCarportJob}
                alt="Carport fencing job completion post - professional social media content"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Job Completion Post</p>
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostFencingGallery}
                alt="Fencing gallery portfolio post - showcasing recent work"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Portfolio Gallery</p>
              </div>
            </div>

            {/* Service Promotion - Geyser */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostGasGeyserService}
                alt="Gas geyser service promotion post - professional service highlight"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Service Promotion</p>
              </div>
            </div>

            {/* Service Promotion - Hobs */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostGasHobsService}
                alt="Gas hobs installation service post - driving awareness"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Service Highlight</p>
              </div>
            </div>

            {/* Holiday Post */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostFencingHoliday}
                alt="Holiday greeting post - automated seasonal content"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Holiday Post (Automatic)</p>
              </div>
            </div>

            {/* New Year Post */}
            <div className="group relative rounded-xl overflow-hidden shadow-xl border border-neutral-700 hover:border-amber-500/50 transition-all hover:scale-[1.02]">
              <img
                src={socialPostFencingNewYear}
                alt="New Year post - seasonal greeting content"
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white text-xs md:text-sm font-medium p-3">Seasonal Content</p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* ============================================
          SECTION 3: HOW IT WORKS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              How It Works
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Your part takes<br />
            <span className="text-amber-400">60 seconds.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            We've stripped away everything complicated.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            Here's your entire workflow:
          </p>


          <div className="space-y-4">
            <div className="bg-neutral-700 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">Finish a job</p>
                  <p className="text-neutral-200">Take a few photos of your completed work. You're probably doing this already.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-700 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">Upload in 60 seconds</p>
                  <p className="text-neutral-200">Use our simple form or just WhatsApp us the photos. Add a quick description of what you did.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-700 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <div className="flex items-start gap-4">
                <span className="bg-amber-500 text-black font-black text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <div>
                  <p className="text-white font-black text-lg mb-1">We handle everything else</p>
                  <p className="text-neutral-200">Our AI polishes your description into an engaging caption. We create the visuals. You get a preview to approve.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Image: Job Photo to Post */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={closeupPhonePostCreator}
              alt="Close-up of business owner's hands on phone, uploading job photos through simple form"
              className="w-full aspect-[4/3] object-cover object-top"
            />
          </div>

          <p className="text-2xl md:text-3xl font-black text-white">
            Then we post to <span className="text-amber-400">three platforms</span> automatically.
          </p>

          {/* Image: Multi-platform */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={sideBySide3Platforms}
              alt="Same post shown on Facebook, Instagram, and Google Business Profile - one upload to three platforms"
              className="w-full"
            />
          </div>

          <div className="space-y-4 bg-neutral-700 border-2 border-neutral-600 rounded-2xl p-6 shadow-xl">
            <p className="text-white flex items-center text-lg font-bold">
              <svg className="w-6 h-6 mr-4 flex-shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook Business Page
            </p>
            <p className="text-white flex items-center text-lg font-bold">
              <svg className="w-6 h-6 mr-4 flex-shrink-0" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80"/>
                    <stop offset="25%" stopColor="#F77737"/>
                    <stop offset="50%" stopColor="#E1306C"/>
                    <stop offset="75%" stopColor="#C13584"/>
                    <stop offset="100%" stopColor="#833AB4"/>
                  </linearGradient>
                </defs>
                <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram Business Account
            </p>
            <p className="text-white flex items-center text-lg font-bold">
              <svg className="w-6 h-6 mr-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Business Profile
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: DIY VS US
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Difference
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            "I could just do this myself..."
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            You could. But here's what that actually looks like:
          </p>

          <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-red-400 font-black text-lg mb-4">Doing It Yourself:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Facebook, write a post, upload photos, publish
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Instagram, resize photos, write a different caption, publish
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Log into Google Business, write another version, upload again
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Create a reel? That's another 30 minutes of editing
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-red-400 mr-3">✗</span>
                Remember to do this consistently, every week, forever
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-red-500/30">
              <p className="text-neutral-200">Time per post (all platforms):</p>
              <p className="text-2xl font-black text-red-400">45–60 minutes</p>
              <p className="text-neutral-300 text-sm mt-1">And that's if you actually remember to do it.</p>
            </div>
          </div>

          <div className="bg-green-900/40 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-green-400 font-black text-lg mb-4">With Local Pros Studio:</p>
            <div className="space-y-3">
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                Upload photos once — we post to ALL your platforms
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                We write the captions, optimised for each platform
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                We create reels automatically from your photos
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                We create image posts AND video content
              </p>
              <p className="text-neutral-200 flex items-start">
                <span className="text-green-400 mr-3">✓</span>
                Consistency is guaranteed — we never miss a week
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-green-500/30">
              <p className="text-neutral-200">Your time per post:</p>
              <p className="text-2xl font-black text-green-400">60 seconds</p>
              <p className="text-neutral-300 text-sm mt-1">Upload photos. Add a description. Done.</p>
            </div>
          </div>

          {/* Image: Multi-platform spread */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={oneUploadPostEverywhere}
              alt="One photo upload spreading to Facebook, Instagram, Instagram Reel, and Google Business - one upload posts everywhere"
              className="w-full"
            />
          </div>

          <p className="text-xl md:text-2xl font-bold text-white">
            We spread your reach to <span className="text-amber-400">everywhere</span> you have a social account.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Facebook. Instagram. Google Business. Image posts. Video reels.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            All from <strong className="text-white">one 60-second upload</strong>.
          </p>

          <div className="pl-6 pr-4 py-4 border-l-4 border-amber-500 bg-white rounded-r-lg">
            <p className="text-lg md:text-xl text-neutral-800 italic font-semibold">The best part? We post consistently. Week after week. Even when you're slammed with work and can't think about social media.</p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: WE HANDLE CONSISTENCY
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Built-In Consistency
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            What if you're too busy<br />
            <span className="text-amber-400">to submit content?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            This is the #1 concern we hear.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            "What if I get slammed with work and don't send you anything for weeks?"
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            You'll <span className="text-amber-400">still</span> have content going out.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We've built automatic content into the system:
          </p>

          <div className="space-y-4">
            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <p className="text-3xl font-black text-amber-400 mb-2">4x</p>
              <p className="text-white font-bold text-lg mb-1">Service Promotion Posts</p>
              <p className="text-neutral-300">Every month, we create posts highlighting your services. Professionally designed. Ready to go.</p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <p className="text-3xl font-black text-amber-400 mb-2">Every</p>
              <p className="text-white font-bold text-lg mb-1">Public Holiday</p>
              <p className="text-neutral-300">Heritage Day, Christmas, New Year — relevant, timely posts that keep you visible without you thinking about it.</p>
            </div>

            <div className="bg-neutral-800 rounded-xl p-6 border-l-4 border-amber-500 shadow-xl">
              <p className="text-3xl font-black text-amber-400 mb-2">Every</p>
              <p className="text-white font-bold text-lg mb-1">Positive Review</p>
              <p className="text-neutral-300">Great reviews automatically become social posts. Your happy customers become your marketing.</p>
            </div>
          </div>

          {/* Image: Content Calendar */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={postCalendar}
              alt="Monthly post calendar showing consistent posting schedule with service posts, holiday posts, and review highlights"
              className="w-full"
            />
          </div>


          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 5: WHY SOCIAL MATTERS - THE TRUST FACTOR
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              The Trust Factor
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Here's what happens when<br />
            <span className="text-amber-400">a customer gets 3 quotes.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            They look you up.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            <strong className="text-white">Every single time.</strong>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            They type your business name into Google. They check your Facebook page. They look at your Instagram.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            They're asking themselves three questions:
          </p>

          <p className="text-xl md:text-2xl font-bold text-amber-400">
            1. "Are they legitimate?"
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            A dormant Facebook page with no posts for 6 months? That's a red flag. An active page with recent job photos? That's proof you're a real, operating business.
          </p>

          <p className="text-xl md:text-2xl font-bold text-amber-400">
            2. "Do they have experience?"
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Your social media is your portfolio. Every before-and-after photo, every completed project — it's evidence that you know what you're doing.
          </p>

          <p className="text-xl md:text-2xl font-bold text-amber-400">
            3. "Are they still active?"
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Recent posts show you have a heartbeat. You're working. You're busy. You're not some fly-by-night operation that might disappear after taking their deposit.
          </p>

          {/* Image: Customer researching contractors */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={socialInstagramTruck}
              alt="Contractor's truck with social media presence - professional business image"
              className="w-full aspect-[16/9] object-cover object-center"
            />
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            Now imagine you're up against two other competitors.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Your prices are similar. Your reviews are similar.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            But YOUR Facebook page shows:
          </p>

          <div className="pl-6 border-l-4 border-green-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">A job you completed last week</p>
            <p className="text-lg md:text-xl text-neutral-200">A before-and-after transformation</p>
            <p className="text-lg md:text-xl text-neutral-200">A happy customer's 5-star review</p>
            <p className="text-lg md:text-xl text-neutral-200">A post wishing everyone a happy holiday</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            And THEIR Facebook pages show:
          </p>

          <div className="pl-6 border-l-4 border-red-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-300">Last post: 8 months ago</p>
            <p className="text-lg md:text-xl text-neutral-300">Profile photo from 2019</p>
            <p className="text-lg md:text-xl text-neutral-300">No recent activity</p>
          </div>

          <p className="text-2xl md:text-3xl font-black text-white">
            Who do you think gets the job?
          </p>

          <p className="text-xl md:text-2xl font-bold text-amber-400">
            The one who looks like they're actually in business.
          </p>
          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 6: AI SEARCH - THE FUTURE
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              🤖 The AI Revolution
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Google AI is changing<br />
            <span className="text-amber-400">how people find you.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Google is rolling out <strong className="text-white">AI-powered overviews</strong> at the top of search results.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Instead of just listing websites, Google now <strong className="text-white">summarizes everything about your business</strong> — pulling from your reviews, your social posts, and your Google Business Profile.
          </p>

          <p className="text-lg md:text-xl text-neutral-300 italic">
            This is already happening. Here's what it looks like:
          </p>

          {/* AI Search Images - Google AI Overview examples */}
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
              <img
                src={googleAiOverviewRoofingPhone}
                alt="Google AI Overview on mobile showing Apex Roofing business with synthesized information from social posts and reviews"
                className="w-full"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
              <img
                src={googleAiOverviewRenovations}
                alt="Google AI Overview for ABC Home Renovations - showing recent activity and social presence"
                className="w-full aspect-[4/3] object-cover object-top"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            When someone searches for a local business in your area, Google's AI looks at:
          </p>

          <div className="pl-6 border-l-4 border-amber-500 space-y-3">
            <p className="text-lg md:text-xl text-neutral-200">Your recent reviews</p>
            <p className="text-lg md:text-xl text-neutral-200">Your Google Business posts</p>
            <p className="text-lg md:text-xl text-neutral-200">Your social media activity</p>
            <p className="text-lg md:text-xl text-neutral-200">How recently you've been active</p>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white">
            Businesses with fresh content get featured.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            Dormant businesses get <span className="text-amber-400">buried</span>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            It's no longer enough to have a website and hope people find you.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            You need to be <span className="text-amber-400">actively visible</span> — everywhere.
          </p>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-800/50 py-3 pr-4 rounded-r-lg">
            (Our system posts to Google Business Profile automatically — feeding Google's AI exactly what it wants to see.)
          </p>

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 7: THE COST COMPARISON
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
            Agency vs. Our System<br />
            <span className="text-amber-400">Let's do the maths.</span>
          </h2>

          {/* Comparison Cards */}
          <div className="space-y-6">
            <div className="bg-red-900/40 border-2 border-red-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-red-400 font-black text-lg mb-4">Traditional Marketing Agency</p>
              <div className="space-y-3">
                <p className="text-neutral-200 flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  R8,000 – R15,000 per month
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  Generic content that could be for any business
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  Slow turnaround — days or weeks for posts
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  Long contracts, difficult to cancel
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-red-400 mr-3">✗</span>
                  Account manager who doesn't understand local businesses
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-red-500/30">
                <p className="text-neutral-300">Annual cost:</p>
                <p className="text-3xl font-black text-red-400">R96,000 – R180,000</p>
              </div>
            </div>

            <div className="bg-green-900/40 border-2 border-green-500/50 rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-green-400 font-black text-lg mb-4">Local Pros Studio</p>
              <div className="space-y-3">
                <p className="text-neutral-200 flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Content customised for YOUR business
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  AI-speed — posts ready in minutes
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Month-to-month — cancel anytime
                </p>
                <p className="text-neutral-200 flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  Built for local businesses
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-green-500/30">
                <p className="text-neutral-300">Monthly cost:</p>
                <p className="text-3xl font-black text-green-400">R2,000</p>
              </div>
            </div>
          </div>

          <p className="text-2xl md:text-3xl font-black text-white text-center">
            There's no longer an excuse.
          </p>

          <p className="text-xl md:text-2xl text-neutral-300 text-center">
            Professional social media is now <span className="text-amber-400 font-bold">affordable for every local business</span>.
          </p>

          {/* CTA with Rating */}
          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 8: WHAT'S INCLUDED
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Everything Included
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Here's what you get<br />
            <span className="text-amber-400">for R2,000/month:</span>
          </h2>

          <div className="space-y-4">
            {[
              "60-second posting form (submit jobs from anywhere)",
              "5 post templates to choose from",
              "AI text polishing on everything you submit",
              "Unlimited posts from your submissions",
              "4 service promotion posts/month (we create these)",
              "Public holiday posts (automatic)",
              "Review highlight posts (automatic)",
              "Dashboard access to see all your content",
              "Monthly strategy check-ins",
            ].map((feature, i) => (
              <p key={i} className="text-neutral-200 flex items-center text-lg md:text-xl">
                <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" /> {feature}
              </p>
            ))}
          </div>

          {/* Platform Icons */}
          <div className="bg-neutral-700 border-2 border-neutral-600 rounded-2xl p-6 shadow-lg">
            <p className="text-neutral-300 text-sm uppercase tracking-wide mb-4">Posts to all your platforms:</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white font-medium">Facebook</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFDC80"/>
                      <stop offset="25%" stopColor="#F77737"/>
                      <stop offset="50%" stopColor="#E1306C"/>
                      <stop offset="75%" stopColor="#C13584"/>
                      <stop offset="100%" stopColor="#833AB4"/>
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-gradient-2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-white font-medium">Instagram</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-white font-medium">Google</span>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
            <img
              src={oneUploadEverywhereContractors}
              alt="One upload posts everywhere - contractor dashboard showing scheduled posts across Facebook, Instagram, and Google"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 9: PRICING
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Pricing
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Pick Your<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Package</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Posting on its own, or posting and Google reviews together on the <strong className="text-white">R2,500 plan</strong>, with a free website if you need one.
          </p>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 my-8">

            {/* Social Posting Only Card */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-5 md:p-8 relative">

              {/* Price Display */}
              <div className="mb-6">
                <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">Social Posting</p>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-white">R2,000</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <p className="text-green-400 text-sm font-bold mt-2">
                  Month-to-month
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {[
                  "AI-Powered Content System",
                  "Posts to Facebook, Instagram & Google",
                  "60-Second Submission Form",
                  "4 Service Posts/Month (We Create)",
                  "Holiday Posts (Automatic)",
                  "Reels + Image Posts",
                  "Full Dashboard Access",
                  "WhatsApp Approval Notifications"
                ].map((feature, i) => (
                  <p key={i} className="text-neutral-300 flex items-center text-sm">
                    <Check className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" /> {feature}
                  </p>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neutral-800 border-2 border-amber-500/50 text-white font-bold text-base px-6 py-4 rounded-full hover:bg-neutral-700 transition-all w-full"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Complete Package Card - HIGHLIGHTED */}
            <div className="bg-neutral-900 border-2 border-amber-500 rounded-2xl p-5 md:p-8 relative overflow-hidden">

              {/* Glow Effect */}
              <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              {/* Best Value Badge */}
              <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-black px-3 py-1.5 rounded-full">
                ⚡ BEST VALUE
              </div>

              {/* Price Display */}
              <div className="mb-6 relative">
                <p className="text-amber-400 text-sm font-bold uppercase tracking-wide mb-2">R2,500 Plan</p>
                <div className="flex flex-wrap items-center justify-center gap-2 mb-4 bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3">
                  <span className="text-amber-400 font-black text-sm">Social Posting</span>
                  <span className="text-white font-black">+</span>
                  <span className="text-amber-400 font-black text-sm">Review Collection</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="text-neutral-500 line-through text-lg">R3,200</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-white">R2,500</span>
                  <span className="text-neutral-400">/month</span>
                </div>
                <p className="text-green-400 text-sm font-bold mt-2">
                  Save R700/month, plus a free website worth R9,900
                </p>
                <p className="text-neutral-400 text-xs mt-1">6-month commitment · 30-day money-back guarantee on reviews</p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-8 relative">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-wide">Everything in Social Posting, plus:</p>
                {[
                  "Automatic Review Requests (WhatsApp + Email)",
                  "Smart Filtering for Unhappy Customers",
                  "Real-Time Alerts for All Reviews",
                  "AI-Generated Review Responses",
                  "Review Highlights Posted Automatically",
                  "Website Review Embedding",
                  "Priority Support"
                ].map((feature, i) => (
                  <p key={i} className="text-neutral-300 flex items-center text-sm">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" /> {feature}
                  </p>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-black text-base px-6 py-4 rounded-full hover:scale-105 transition-all w-full shadow-lg shadow-yellow-400/30"
              >
                Get The R2,500 Plan
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Capacity Message */}
          <div className="text-center bg-neutral-900/50 border border-neutral-700 rounded-xl p-6">
            <p className="text-amber-400 font-bold text-sm md:text-base">
              We take on about 12 new clients a month
            </p>
            <p className="text-neutral-500 text-sm mt-1">
              So every setup gets proper attention
            </p>
          </div>

          {/* Guarantee */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-neutral-900 border border-neutral-700 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 text-center sm:text-left">
            <svg className="w-10 h-10 md:w-14 md:h-14 text-amber-500 flex-shrink-0" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L8 14V30C8 46 18.4 58.4 32 62C45.6 58.4 56 46 56 30V14L32 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
              <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <p className="text-white font-bold text-base md:text-lg">Clear Terms</p>
              <p className="text-neutral-300 text-xs md:text-sm">Social Posting is month-to-month. The R2,500 plan is a 6-month commitment, with a 30-day money-back guarantee on reviews.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 10: FINAL CTA
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight text-center">
            While your competitors figure out what to post...<br />
            <span className="text-amber-400">You'll already be everywhere.</span>
          </h2>

          <p className="text-2xl md:text-3xl font-black text-white text-center">
            R2,000/month. <span className="text-amber-400">Month-to-month.</span>
          </p>

          {/* Final CTA */}
          <CTAWithRating />

          <p className="text-neutral-500 text-center italic">
            Questions? WhatsApp us anytime — we're real people, not bots.
          </p>

          {/* Footer Image */}
          <div className="rounded-xl overflow-hidden border border-neutral-700 shadow-2xl">
            <img
              src={happyContractorLandscape}
              alt="Happy contractor with professional social media presence"
              className="w-full aspect-[16/9] md:aspect-auto object-cover object-center"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default SocialPostingPageV2;
