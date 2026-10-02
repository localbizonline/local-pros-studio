import React from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';

// Scrolling faces images

// Content images — unique recurring services images
import recurringHeroContractor from '../assets/images/recurring-services/recurring-hero-contractor-calendar.jpg';
import recurringHomeownerForgot from '../assets/images/recurring-services/recurring-homeowner-forgot.jpg';
import recurringContractorLogging from '../assets/images/recurring-services/recurring-contractor-logging-job.webp';
import recurringWhatsappPhone from '../assets/images/recurring-services/recurring-whatsapp-phone-closeup.jpg';
import recurringWindowCleaner from '../assets/images/recurring-services/recurring-window-cleaner-working.webp';
import recurringContractorTablet from '../assets/images/recurring-services/recurring-contractor-tablet-schedule.jpg';
import {
  avatarReviewContractor,
  avatarContractorPhoneCall,
  avatarHappyContractorInstagram,
  avatarReviewCustomer,
  avatarTeam,
  avatarHappyBusinessOwner,
  avatarHeroContractor,
  avatarContractorConfident,
} from '../assets/images/avatars';
import { SITE_WHATSAPP_URL } from '../whatsapp';

// Scrolling Faces Data
const scrollingFaces = [
  { src: avatarReviewContractor, alt: 'SA contractor checking bookings' },
  { src: avatarContractorPhoneCall, alt: 'Cape Town contractor on phone' },
  { src: avatarHappyContractorInstagram, alt: 'Construction worker with phone' },
  { src: avatarReviewCustomer, alt: 'Happy customer rebooking service' },
  { src: avatarTeam, alt: 'Local Pros team' },
  { src: avatarHappyBusinessOwner, alt: 'Happy business owner' },
  { src: avatarHeroContractor, alt: 'Contractor meeting customer' },
  { src: avatarContractorConfident, alt: 'Confident business owner' },
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
          <img src={face.src} alt={face.alt} className="w-full h-full object-cover object-top" />
        </div>
      ))}
      {scrollingFaces.map((face, index) => (
        <div
          key={`second-${index}`}
          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 mx-2 md:mx-3 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-amber-500 transition-colors"
        >
          <img src={face.src} alt={face.alt} className="w-full h-full object-cover object-top" />
        </div>
      ))}
    </div>
  </div>
);

// Reusable CTA Button
const CTAWithRating = () => (
  <div className="py-8 md:py-10">
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-yellow-400 text-black font-black text-lg md:text-2xl lg:text-3xl px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30 uppercase tracking-tight"
    >
      Join the Waitlist
      <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
    </a>
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

const RecurringServicesLetterPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="text-center">
            {/* Pre-headline */}
            <p className="text-amber-400 font-semibold text-sm md:text-base uppercase tracking-wider mb-4">
              Automated Recurring Job Booking System — Coming 2026
            </p>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Never Lose a Repeat Customer{' '}
              <span className="text-yellow-400">To Forgetfulness Again...</span>{' '}
              <span className="text-white block md:inline">We Rebook Them For You</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-3xl mx-auto">
              The "Set & Forget" Rebooking System That Fills Your Calendar While You Work
            </p>

            {/* Hero Image with floating WhatsApp bubbles */}
            <div className="relative max-w-2xl mx-auto mb-10 rounded-2xl overflow-hidden shadow-2xl shadow-yellow-500/20 border-4 border-yellow-400/60">
              <img
                src={recurringHeroContractor}
                alt="SA contractor holding phone with WhatsApp booking messages floating around him"
                className="w-full object-cover"
              />
              {/* Floating WhatsApp bubbles - positioned around edges, not on face */}
              <div className="absolute top-3 left-3 md:top-5 md:left-4 bg-white rounded-2xl rounded-tl-md px-3 py-2 md:px-4 md:py-2.5 max-w-[55%] md:max-w-[50%] shadow-xl animate-fade-in-up">
                <p className="text-[10px] md:text-[11px] text-green-600 font-bold mb-0.5">Window Cleaning</p>
                <p className="text-neutral-800 text-xs md:text-sm">Hi! Your window clean is due next week. Book Johan for Tuesday 9am? 🪟</p>
              </div>
              <div className="absolute top-3 right-3 md:top-16 md:right-4 bg-[#dcf8c6] rounded-2xl rounded-tr-md px-3 py-2 md:px-4 md:py-2.5 max-w-[40%] md:max-w-[38%] shadow-xl animate-fade-in-up" style={{animationDelay: '0.15s'}}>
                <p className="text-neutral-800 text-xs md:text-sm">Yes please! Same time works ✅</p>
              </div>
              <div className="absolute bottom-12 left-3 md:bottom-16 md:left-4 bg-white rounded-2xl rounded-bl-md px-3 py-2 md:px-4 md:py-2.5 max-w-[52%] md:max-w-[48%] shadow-xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <p className="text-[10px] md:text-[11px] text-green-600 font-bold mb-0.5">Aircon Service</p>
                <p className="text-neutral-800 text-xs md:text-sm">Time for your 6-month aircon service! Shall I book you in? ❄️</p>
              </div>
              <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-[#dcf8c6] rounded-2xl rounded-br-md px-3 py-2 md:px-4 md:py-2.5 max-w-[45%] md:max-w-[40%] shadow-xl animate-fade-in-up" style={{animationDelay: '0.45s'}}>
                <p className="text-neutral-800 text-xs md:text-sm">Perfect, Thursday morning works 👍</p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xl md:text-2xl px-10 py-5 rounded-full shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all"
            >
              Join the Waitlist
              <ArrowRight className="w-6 h-6" />
            </a>

            <p className="text-neutral-500 text-sm mt-4">
              Be first in line when we launch — no commitment required
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-8 text-neutral-400 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>WhatsApp-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Fully Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Calendar Sync</span>
              </div>
            </div>

            {/* Scrolling Faces */}
            <div className="mt-10 pt-8 border-t border-neutral-800">
              <p className="text-neutral-500 text-xs text-center mb-2 uppercase tracking-widest">Trusted by SA business owners</p>
              <ScrollingFaces />
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
            Your best customers<br />
            aren't coming back.
          </h2>

          <p className="text-xl md:text-2xl font-bold text-white">
            Not because they're unhappy. Because they <span className="text-amber-400">forgot</span>.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You cleaned their windows 6 months ago. They were thrilled. They said <strong className="text-white">"see you next time."</strong>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            But life got busy. They forgot your name. They Googled "window cleaner near me" and called someone else.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Sound familiar?
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            You're losing <span className="text-amber-400">thousands</span> in repeat work every month.
          </p>

          {/* Image with floating missed rebooking bubbles */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
            <img
              src={recurringHomeownerForgot}
              loading="lazy"
              alt="Homeowner looking out dirty window with missed rebooking notifications floating around"
              className="w-full object-cover"
            />
            {/* Floating missed booking bubbles - red tinted, scattered around edges */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 backdrop-blur-sm rounded-2xl rounded-tr-md px-3 py-2 md:px-4 md:py-2.5 max-w-[55%] md:max-w-[48%] shadow-xl border border-red-200">
              <p className="text-[10px] md:text-[11px] text-red-500 font-bold mb-0.5">Aircon Service — Missed</p>
              <p className="text-neutral-700 text-xs md:text-sm">Due 3 months ago. Customer called a competitor 😔</p>
              <p className="text-[9px] md:text-[10px] text-red-400 text-right mt-1">4 jobs lost this year</p>
            </div>
            <div className="absolute bottom-14 left-3 md:bottom-20 md:left-4 bg-white/95 backdrop-blur-sm rounded-2xl rounded-bl-md px-3 py-2 md:px-4 md:py-2.5 max-w-[58%] md:max-w-[50%] shadow-xl border border-red-200">
              <p className="text-[10px] md:text-[11px] text-red-500 font-bold mb-0.5">Solar Panel Clean — Overdue</p>
              <p className="text-neutral-700 text-xs md:text-sm">5 months late. Customer forgot your number</p>
              <p className="text-[9px] md:text-[10px] text-red-400 text-right mt-1">2 jobs lost this year</p>
            </div>
            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white/95 backdrop-blur-sm rounded-2xl rounded-br-md px-3 py-2 md:px-4 md:py-2.5 max-w-[52%] md:max-w-[45%] shadow-xl border border-red-200">
              <p className="text-[10px] md:text-[11px] text-red-500 font-bold mb-0.5">Window Cleaning — Lost</p>
              <p className="text-neutral-700 text-xs md:text-sm">Customer Googled "window cleaner near me" instead 🔍</p>
              <p className="text-[9px] md:text-[10px] text-red-400 text-right mt-1">6 jobs lost this year</p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            The customers are there. The demand is there. They <strong className="text-white">want</strong> your service again.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            They just need a nudge at the right time.
          </p>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-900/50 py-3 pr-4 rounded-r-lg">
            (And let's be honest — you don't have time to track 50+ customers and call each one when their service is due.)
          </p>

          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE SOLUTION
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
            We rebook your customers<br />
            <span className="text-amber-400">automatically via WhatsApp</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            You finish a job. You tell us the customer details and <strong className="text-white">how often</strong> the service needs doing again.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            We handle everything else.
          </p>

          <p className="text-xl md:text-2xl font-black text-amber-400 italic">
            Here's exactly how it works:
          </p>

          <div className="space-y-4 pl-6 border-l-4 border-amber-500">
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Step 1:</strong> You log the job — customer name, service, and rebooking interval
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Step 2:</strong> When it's time, we send a friendly WhatsApp to your customer
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Step 3:</strong> Customer confirms with a single message — no calls, no forms
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Step 4:</strong> The booking appears in your calendar and you're notified
            </p>
          </div>

          <p className="text-2xl md:text-3xl font-black text-white pt-4">
            Zero admin. Zero chasing. Zero lost customers.
          </p>

          {/* Image */}
          <img
            src={recurringContractorLogging}
            loading="lazy"
            alt="Contractor leaning against van, logging a job on his phone"
            className="w-full rounded-xl shadow-2xl border border-neutral-800"
          />

          {/* Simple Box */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 md:p-10 border border-neutral-700">
            <p className="text-amber-400 font-black text-xl mb-4">Your part is simple:</p>
            <p className="text-neutral-200 text-lg md:text-xl mb-4">
              Finish the job. Log the details. Walk away.
            </p>
            <p className="text-2xl md:text-3xl font-black text-white">
              We'll make sure that customer comes back — <span className="text-amber-400">every single time</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3: WHY WHATSAPP
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Why WhatsApp
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            We use WhatsApp because<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">everyone already uses it</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Your customers don't need to download an app. They don't need to create an account. They don't need to fill in a form.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            They just reply to a WhatsApp message.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            In South Africa, <strong className="text-white">98% of smartphone users</strong> have WhatsApp. It's the one app everyone checks.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Compare that to emails that go to spam, SMSes that get ignored, and phone calls that go to voicemail.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            WhatsApp gets <span className="text-amber-400">opened</span>. WhatsApp gets <span className="text-amber-400">answered</span>.
          </p>

          {/* WhatsApp Phone Image */}
          <img
            src={recurringWhatsappPhone}
            loading="lazy"
            alt="Hands holding phone with WhatsApp booking conversation"
            className="w-full rounded-xl shadow-2xl"
          />

          {/* WhatsApp Conversation Mock */}
          <div className="bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-700 space-y-5">
            <p className="text-amber-400 font-black text-sm uppercase tracking-wider mb-2">What Your Customer Sees</p>

            {/* System message */}
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <p className="text-xs text-green-400 font-medium mb-2">Automated Reminder</p>
              <p className="text-base md:text-lg text-neutral-200">
                "Hi Mrs Van der Merwe, it's been 6 months since your last solar panel clean with <strong className="text-white">SunBright Cleaners</strong>. Shall we book you in for next week? Just reply <strong className="text-white">YES</strong> and we'll sort it out."
              </p>
            </div>

            {/* Customer reply */}
            <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20 ml-8 md:ml-16">
              <p className="text-xs text-amber-400 font-medium mb-2">Customer Replies</p>
              <p className="text-base md:text-lg text-neutral-200">
                "Yes please! Thursday morning works."
              </p>
            </div>

            {/* Confirmation */}
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
              <p className="text-xs text-green-400 font-medium mb-2">Booking Confirmed</p>
              <p className="text-base md:text-lg text-neutral-200">
                "Perfect! You're booked for <strong className="text-white">Thursday 8am</strong>. We'll send a reminder the day before. See you then!"
              </p>
            </div>
          </div>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-900/50 py-3 pr-4 rounded-r-lg">
            (No downloading apps. No logging into portals. No friction. Just a WhatsApp conversation that books the job.)
          </p>

          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 4: WHO IT'S FOR
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Built For You
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Perfect for any service that<br />
            <span className="text-amber-400">needs doing again</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            If your customers need your service on a regular basis — this system was built for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[
              { service: "Window Cleaning", interval: "Every 2-3 months" },
              { service: "Solar Panel Cleaning", interval: "Every 6 months" },
              { service: "Aircon Servicing", interval: "Every 6-12 months" },
              { service: "Pool Maintenance", interval: "Monthly" },
              { service: "Gutter Cleaning", interval: "Every 6 months" },
              { service: "Pest Control", interval: "Quarterly" },
              { service: "Garden Services", interval: "Weekly / Monthly" },
              { service: "Plumbing Inspections", interval: "Annually" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-xl p-5 flex items-center justify-between">
                <span className="text-white font-bold text-base">{item.service}</span>
                <span className="text-amber-400 text-sm font-medium">{item.interval}</span>
              </div>
            ))}
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            Painting, electrical inspections, fire equipment servicing, water tank cleaning, carpet cleaning, security system maintenance...
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            If the job repeats, we automate the rebooking.
          </p>

          {/* Image */}
          <img
            src={recurringWindowCleaner}
            loading="lazy"
            alt="Professional window cleaner working at a suburban South African home"
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
      </section>

      {/* ============================================
          SECTION 5: SMART FOLLOW-UPS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Smart Follow-Ups
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            What if they<br />
            <span className="text-amber-400">don't respond?</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Not everyone replies to the first message. That's normal.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            That's why we built smart follow-ups into the system.
          </p>

          <div className="space-y-4 pl-6 border-l-4 border-amber-500">
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Day 1:</strong> Friendly reminder sent via WhatsApp
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Day 3:</strong> Gentle follow-up if no response
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">Day 7:</strong> Final nudge — then we stop and notify you
            </p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            If they still don't respond after 3 attempts, <strong className="text-white">you're notified</strong> so you can decide whether to call them yourself or move on.
          </p>

          <p className="text-neutral-400 italic text-base border-l-2 border-amber-500/50 pl-4 bg-neutral-900/50 py-3 pr-4 rounded-r-lg">
            (We never spam your customers. The messages are spaced out, friendly, and professional. They feel personal — because they are.)
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white">
            The result? <span className="text-amber-400">More repeat jobs. Less empty days.</span>
          </h3>

          {/* Image */}
          <img
            src={recurringContractorTablet}
            loading="lazy"
            alt="Smiling contractor in van checking her booking schedule on tablet"
            className="w-full rounded-xl shadow-2xl border border-neutral-700"
          />

          <div className="space-y-4 bg-amber-950/20 border border-amber-900/30 rounded-2xl p-6">
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              No spam — max 3 friendly reminders
            </p>
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              You're notified if they don't respond
            </p>
            <p className="text-neutral-200 flex items-center text-lg font-medium">
              <Check className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0" />
              Messages feel personal, not robotic
            </p>
          </div>

          <CTAWithRating />
        </div>
      </section>

      {/* ============================================
          SECTION 6: CALENDAR & DASHBOARD
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">

          {/* Section Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">
              Your Command Centre
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Everything synced.<br />
            <span className="text-amber-400">Nothing falls through the cracks.</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            The system connects to your <strong className="text-white">existing booking system or calendar</strong>. Or, if you don't have one, we give you a simple dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-6">
              <p className="text-amber-400 font-black text-lg mb-3">If you use a booking system:</p>
              <p className="text-neutral-300 text-base leading-relaxed">We integrate directly. Confirmed bookings appear in your calendar automatically — Google Calendar, Outlook, or your existing software.</p>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-6">
              <p className="text-amber-400 font-black text-lg mb-3">If you don't:</p>
              <p className="text-neutral-300 text-base leading-relaxed">We give you a clean dashboard where you can see all upcoming jobs, confirmed bookings, and customers awaiting response — at a glance.</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-white pt-4">
            Either way, you always know <span className="text-amber-400">what's coming up</span>.
          </p>

          {/* Dashboard Mock */}
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-700">
            <p className="text-amber-400 font-black text-sm uppercase tracking-wider mb-6">Your Dashboard</p>
            <div className="space-y-3">
              <div className="bg-neutral-950 rounded-lg p-4 flex items-center justify-between">
                <span className="text-neutral-300 text-sm md:text-base">Upcoming This Week</span>
                <span className="text-amber-400 font-bold text-lg">8 jobs</span>
              </div>
              <div className="bg-neutral-950 rounded-lg p-4 flex items-center justify-between">
                <span className="text-neutral-300 text-sm md:text-base">Confirmed by Customer</span>
                <span className="text-green-400 font-bold text-lg">6 confirmed</span>
              </div>
              <div className="bg-neutral-950 rounded-lg p-4 flex items-center justify-between">
                <span className="text-neutral-300 text-sm md:text-base">Awaiting Response</span>
                <span className="text-neutral-400 font-bold text-lg">2 pending</span>
              </div>
              <div className="bg-neutral-950 rounded-lg p-4 flex items-center justify-between">
                <span className="text-neutral-300 text-sm md:text-base">Repeat Booking Rate</span>
                <span className="text-amber-400 font-bold text-lg">87%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: PRICING / WAITLIST
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
            Be First In Line<br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">When We Launch</span>
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            We're launching this system in 2026. Join the waitlist and you'll be the first to know — plus get <strong className="text-white">exclusive early-bird pricing</strong>.
          </p>

          {/* Pricing Card */}
          <div className="bg-neutral-950 border-2 border-amber-500/30 rounded-2xl md:rounded-3xl p-5 md:p-10 my-8 relative overflow-hidden">

            {/* Glow Effect */}
            <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            {/* Badge */}
            <div className="mb-6 md:mb-8 relative">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black px-4 md:px-6 py-2 md:py-3 rounded-full uppercase tracking-wide text-xs md:text-sm shadow-lg">
                Coming Soon 2026
              </span>
            </div>

            {/* Title */}
            <div className="mb-6 md:mb-8 relative">
              <p className="text-2xl md:text-3xl font-black text-white mb-2">Recurring Services System</p>
              <p className="text-base md:text-lg text-neutral-400">Automated rebooking via WhatsApp</p>
            </div>

            {/* Features List */}
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 relative">
              {[
                "Automated WhatsApp rebooking reminders",
                "Customer confirmation via WhatsApp",
                "Smart follow-ups (up to 3 reminders)",
                "Calendar or dashboard sync",
                "Real-time booking notifications",
                "Customer history & service records",
                "Customisable reminder intervals",
                "Full dashboard access"
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
              Join the Waitlist
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </a>

            {/* Early Bird */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-amber-950/20 border border-amber-800/30 rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 mt-6 md:mt-8 relative text-center sm:text-left">
              <svg className="w-10 h-10 md:w-14 md:h-14 text-amber-500 flex-shrink-0" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L8 14V30C8 46 18.4 58.4 32 62C45.6 58.4 56 46 56 30V14L32 4Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-white font-bold text-base md:text-lg">Early Bird Pricing Guaranteed</p>
                <p className="text-neutral-400 text-xs md:text-sm">Waitlist members get locked-in pricing before we launch to the public.</p>
              </div>
            </div>
          </div>

          <p className="text-neutral-500 text-sm italic">
            No payment required to join the waitlist. No commitment. Just be first to know.
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
            When you finish a job, you tell us three things:
          </p>

          <div className="space-y-4 pl-6 border-l-4 border-amber-500">
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">1.</strong> Customer name and number
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">2.</strong> What service you did
            </p>
            <p className="text-lg md:text-xl text-neutral-200">
              <strong className="text-white">3.</strong> How often it needs doing again
            </p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            That's it. Send it via <strong className="text-white">WhatsApp</strong> or log it in your <strong className="text-white">dashboard</strong>.
          </p>

          <p className="text-xl md:text-2xl font-bold text-white">
            We handle the rest — reminders, follow-ups, confirmations, and calendar updates.
          </p>

          <p className="text-2xl md:text-3xl font-black text-white">
            You get repeat customers.<br />
            <span className="text-amber-400">Without lifting a finger.</span>
          </p>

          <CTAWithRating />
        </div>
      </section>

    </div>
  );
};

export default RecurringServicesLetterPage;
