import React, { useState } from 'react';
import { ArrowRight, Check, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReputationReviewWidget from './ReputationReviewWidget';

// Import images
import reviewContractor from '../assets/images/review-contractor-happy.jpg';
import deadBusinessNoSocials from '../assets/images/social-posting/dead business if no socials since 2021.jpg';
import heroContractor from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import facebookBeforeAfterGasTablet from '../assets/images/social-posting/facebook-before-after-gas-tablet.webp';
import beforeAfterProof from '../assets/images/Reviews/Local Pros reviews before and after.png';
import googleAiOverviewRoofingPhone from '../assets/images/social-posting/google-ai-overview-roofing-phone.webp';
import oneUploadPostEverywhere from '../assets/images/social-posting/one-upload post everywhere.webp';
import happyContractorLandscape from '../assets/images/social-posting/happy contractor with social posting landscape ratio.webp';

// Scrolling faces images
import contractorConfident from '../assets/images/Reviews/contractor-confident-reviews.jpg';
import contractorPhoneCall from '../assets/images/Reviews/contractor-phone-call-sa.jpg';
import happyBusinessOwner from '../assets/images/reviews-pro/happy-business-owner.jpg';
import happyContractorInstagram from '../assets/images/social-posting/happy contractor with instagram mockup copy.jpg';
import reviewCustomer from '../assets/images/review-customer.jpg';
import teamPhoto from '../assets/images/team.jpg';
import { SITE_WHATSAPP_URL } from '../whatsapp';

// Reusable CTA Button
const CTAButton = ({ text = "Get Started Today", subtext }: { text?: string, subtext?: string }) => (
  <div className="py-8 md:py-10">
    <a
      href={SITE_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-yellow-400 text-black font-black text-lg md:text-2xl lg:text-3xl px-6 md:px-10 py-5 md:py-6 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30 uppercase tracking-tight"
    >
      {text}
      <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
    </a>
    {subtext && (
      <p className="text-neutral-400 text-sm md:text-base text-center mt-4 italic">
        {subtext}
      </p>
    )}
  </div>
);

// Scrolling Faces Data
const scrollingFaces = [
  { src: reviewContractor, alt: 'Contractor checking reviews' },
  { src: contractorConfident, alt: 'Confident business owner' },
  { src: contractorPhoneCall, alt: 'Contractor on phone call' },
  { src: happyBusinessOwner, alt: 'Happy business owner' },
  { src: happyContractorInstagram, alt: 'Contractor with phone' },
  { src: reviewCustomer, alt: 'Happy customer' },
  { src: teamPhoto, alt: 'Local Pros team' },
  { src: heroContractor, alt: 'Contractor handshake' },
];

// Scrolling Faces Component
const ScrollingFaces = () => (
  <div className="relative w-full overflow-hidden py-8">
    {/* Gradient overlays for fade effect */}
    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
    
    {/* Scrolling container */}
    <div className="flex animate-scroll-left">
      {/* First set of images */}
      {scrollingFaces.map((face, index) => (
        <div
          key={`first-${index}`}
          className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 mx-2 md:mx-3 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-amber-500 transition-colors"
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
          className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 mx-2 md:mx-3 rounded-full overflow-hidden border-2 border-neutral-700 hover:border-amber-500 transition-colors"
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

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-800 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg md:text-xl font-bold text-white">{question}</span>
        {isOpen ? <ChevronUp className="text-amber-400" /> : <ChevronDown className="text-neutral-500" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-neutral-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const HomeGeminiPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white selection:bg-amber-500/30">

      {/* ============================================
          SECTION 1: HERO — The Bold Promise
          ============================================ */}
      <section className="relative bg-neutral-950 overflow-hidden pt-12 pb-16 md:py-24">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm md:text-base mb-6">
            For Local Business Owners Who Are Tired of Being Invisible
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            Growing a Local Business is Hard.<br className="hidden md:block" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              We Make It a Hell of a Lot Easier.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional reviews. Consistent social media. Websites that actually convert. <br className="hidden md:block" />
            <span className="text-white font-semibold">Without you lifting a finger.</span>
          </p>

          <div className="max-w-md mx-auto mb-8">
            <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 md:gap-3 w-full bg-yellow-400 text-black font-black text-lg md:text-2xl px-6 py-5 rounded-full hover:scale-105 transition-all shadow-xl shadow-yellow-400/30 uppercase tracking-tight"
            >
                Get Started Today
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <div className="mt-4 flex justify-center">
                <a href="#how-it-works" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium border-b border-neutral-700 hover:border-white pb-0.5">
                    See How It Works ↓
                </a>
            </div>
          </div>

          {/* Scrolling Faces Section */}
          <div className="mb-12">
            <p className="text-neutral-500 text-sm text-center mb-4 uppercase tracking-wide">Trusted by local business owners across South Africa</p>
            <ScrollingFaces />
          </div>

          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-neutral-800">
            <img
              src={reviewContractor}
              alt="Confident contractor checking reviews on phone"
              className="w-full object-cover"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60"></div>
          </div>


        </div>
      </section>

      {/* ============================================
          SECTION 2: THE PROBLEM
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">THE PROBLEM</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Look, we get it.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            Running a local business is a full-time war.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            You're quoting jobs. Chasing payments. Managing staff that doesn't show up. Dealing with suppliers who "lost" your order.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And somewhere in between all that chaos...
          </p>

          <div className="bg-neutral-900/50 p-6 rounded-xl border-l-4 border-amber-500">
             <p className="text-lg md:text-xl text-white font-bold mb-4">You're supposed to:</p>
             <ul className="space-y-2 text-neutral-300">
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Post on Facebook 3x a week</li>
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Collect reviews from happy customers</li>
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Update your Google profile</li>
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Reply to enquiries on Instagram</li>
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Make sure your website actually works on mobile</li>
                <li className="flex items-start gap-3"><span className="text-red-400">✗</span> Figure out what the hell SEO even means</li>
             </ul>
             <p className="mt-4 text-neutral-400 italic font-medium">— somebody please pull out my eyelashes</p>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            You're not lazy. You're not stupid. <span className="text-white font-bold">You're drowning.</span>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            And every marketing "expert" keeps telling you to "just post more content" like that's going to magically fix everything.
          </p>
          
          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700 my-8">
            <img 
                src={deadBusinessNoSocials} 
                alt="Frustrated business owner overwhelmed by tasks" 
                className="w-full opacity-80"
            />
          </div>

          <div className="bg-white text-neutral-900 p-8 rounded-xl shadow-xl transform rotate-1">
            <p className="text-xl md:text-2xl font-black text-center leading-tight">
              "You're not failing because you don't work hard enough. 
              <br className="hidden md:block" />
              You're failing because you're trying to do everything yourself."
            </p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 3: THE ORIGIN STORY
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">WHO WE ARE</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            We're not some fancy agency with a glass-front office.
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            We're local business people. Just like you.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            We've driven around with magnets on our trucks. Handed out flyers at the traffic lights. Begged family for 5-star reviews.
          </p>

          <div className="space-y-4">
             <p className="text-lg md:text-xl text-neutral-300">We've felt the gut-punch of:</p>
             <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-neutral-200 text-lg"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Losing a job to a competitor with a better website</li>
                 <li className="flex items-center gap-3 text-neutral-200 text-lg"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Getting a 1-star review from a customer who never even used us</li>
                 <li className="flex items-center gap-3 text-neutral-200 text-lg"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Watching our Facebook page collect dust for 6 months</li>
             </ul>
          </div>

          <p className="text-lg md:text-xl text-neutral-300">
            We spent 10+ years in the trenches. We made every mistake in the book. <br/>
            <span className="text-white font-bold text-2xl">And then we figured out what actually works.</span>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Not fancy marketing theory. Not "content strategies" from people who've never run a business. <strong className="text-amber-400">REAL systems that we tested on ourselves first.</strong>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Now we're making those systems available to you. So you can skip the 10 years of trial and error. And get straight to the good part.
          </p>

          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-800 my-6">
            <img 
                src={heroContractor} 
                alt="Local Pros team shaking hands with client" 
                className="w-full"
            />
          </div>

          <div className="pt-4">
             <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold text-lg hover:text-white transition-colors border-b-2 border-amber-400 hover:border-white pb-1">
                Chat with us on WhatsApp →
             </a>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: THE SOLUTION
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
            
          <div className="max-w-3xl mx-auto text-left mb-16 space-y-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
                <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">THE SOLUTION</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                We handle your entire digital presence. <br className="hidden md:block"/>
                <span className="text-amber-400">You handle your business.</span>
            </h2>
            <p className="text-xl text-neutral-300">
                You do what you're good at — delivering great work. <br/>
                We do what we're good at — making sure everyone sees it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors text-amber-500">
                    <Star className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">5-Star Reviews on Autopilot</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                    Our WhatsApp-based system collects reviews from happy customers automatically. Negative feedback gets caught privately before it goes public.
                </p>
                <Link to="/reviews" className="text-white font-bold text-sm uppercase tracking-wide border-b border-amber-500 pb-1 hover:text-amber-400 transition-colors">
                    See Review Collection →
                </Link>
            </div>

            {/* Pillar 2 */}
            <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors text-amber-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Social Media That Posts Itself</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                    Send us your job photos. We turn them into professional posts. Published to Facebook, Instagram, and Google — every single week.
                </p>
                <Link to="/social-media-posting-service" className="text-white font-bold text-sm uppercase tracking-wide border-b border-amber-500 pb-1 hover:text-amber-400 transition-colors">
                    See Social Posting →
                </Link>
            </div>

            {/* Pillar 3 */}
            <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors text-amber-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">Websites That Actually Work</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                    Mobile-first. Fast-loading. Built to convert visitors into customers. Delivered in 5-7 days with proven templates.
                </p>
                <Link to="/web-design" className="text-white font-bold text-sm uppercase tracking-wide border-b border-amber-500 pb-1 hover:text-amber-400 transition-colors">
                    See Website Packages →
                </Link>
            </div>

            {/* Pillar 4 - FieldCard */}
            <div className="bg-neutral-900 border border-neutral-700 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-colors text-amber-500">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-4">FieldCard App</h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                    The simplest job management app for contractors. Create quotes, send invoices, and manage jobs from your phone.
                </p>
                <Link to="/fieldcard" className="text-white font-bold text-sm uppercase tracking-wide border-b border-amber-500 pb-1 hover:text-amber-400 transition-colors">
                    See FieldCard →
                </Link>
            </div>
          </div>
          
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
             <img 
                src={facebookBeforeAfterGasTablet} 
                alt="Before and after transformation of business online presence" 
                className="w-full"
            />
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 5: SOCIAL PROOF
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
            
          <div className="text-center mb-16">
             <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black mb-4">THE PROOF</p>
             <h2 className="text-3xl md:text-5xl font-black text-white">
                Marketers lie. <span className="text-amber-500">Numbers don't.</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center border-b border-neutral-800 pb-12 mb-12">
             <div>
                <p className="text-3xl md:text-4xl font-black text-white mb-2">500+</p>
                <p className="text-neutral-400 text-sm uppercase tracking-wide">Websites Built</p>
             </div>
             <div>
                <p className="text-3xl md:text-4xl font-black text-white mb-2">10+</p>
                <p className="text-neutral-400 text-sm uppercase tracking-wide">Years Experience</p>
             </div>
             <div>
                <p className="text-3xl md:text-4xl font-black text-white mb-2">350+</p>
                <p className="text-neutral-400 text-sm uppercase tracking-wide">active clients</p>
             </div>
          </div>

          <div className="max-w-4xl mx-auto">
             <img 
                src={beforeAfterProof} 
                alt="Client results collage" 
                className="w-full rounded-2xl shadow-2xl border border-neutral-800"
            />
             <p className="text-center text-neutral-500 mt-4 italic">Real client results from the Local Pros system</p>
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 6: THE AI WARNING
          ============================================ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-800 to-neutral-900">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-left space-y-8 leading-relaxed">
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gradient-to-r from-amber-500 to-transparent flex-1 max-w-[60px]"></div>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black">⚠️ THE WAKE-UP CALL</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Google is Changing. Are You Ready?
          </h2>

          <p className="text-lg md:text-xl text-neutral-300">
            This isn't scare tactics. This is reality.
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            Google is rolling out <strong className="text-white">AI-powered search results</strong>. Instead of showing a list of websites, it now SUMMARIZES businesses using reviews, social media activity, and online presence.
          </p>

          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-700 my-6">
            <img 
                src={googleAiOverviewRoofingPhone} 
                alt="Google AI Overview showing local business summary" 
                className="w-full"
            />
          </div>

          <p className="text-xl md:text-2xl font-bold text-white">
            Here's what this means for you:
          </p>

          <ul className="space-y-4">
             <li className="flex gap-4">
                <Check className="text-green-500 w-6 h-6 flex-shrink-0" />
                <span className="text-lg text-neutral-200">Businesses with fresh reviews and active social media get featured.</span>
             </li>
             <li className="flex gap-4">
                <span className="text-red-500 text-2xl font-bold leading-none w-6 text-center flex-shrink-0">×</span>
                <span className="text-lg text-neutral-200">Businesses with dead profiles get buried.</span>
             </li>
          </ul>

          <p className="text-lg md:text-xl text-neutral-300">
            It's no longer about having a website. <br/>
            <span className="text-amber-400 font-bold text-2xl">It's about being VISIBLE everywhere.</span>
          </p>

          <p className="text-lg md:text-xl text-neutral-300">
            The contractors who adapt now will dominate for the next decade. The ones who wait will be fighting for scraps.
          </p>

          <CTAButton text="Don't Get Left Behind" subtext="Secure your online future today" />

        </div>
      </section>

      {/* ============================================
          SECTION 7: DIY VS US
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
            
          <div className="text-center mb-12">
             <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black mb-4">THE COMPARISON</p>
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">"I could just do this myself..."</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             
             {/* DIY */}
             <div className="bg-red-900/20 border-2 border-red-500/30 rounded-2xl p-8">
                <h3 className="text-2xl font-black text-red-400 mb-6">Doing It Yourself</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-red-400 font-bold">✗</span> Log into Facebook, write post, upload
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-red-400 font-bold">✗</span> Log into Instagram, resize, write caption
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-red-400 font-bold">✗</span> Log into Google Business, upload again
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-red-400 font-bold">✗</span> Send review requests manually
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-red-400 font-bold">✗</span> Remember to do this every. single. week.
                    </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-red-500/20">
                    <p className="text-neutral-400 text-sm uppercase tracking-wide mb-1">Weekly Time Cost</p>
                    <p className="text-3xl font-black text-white">5-8 Hours</p>
                    <p className="text-red-400 text-sm mt-2 font-bold">Cost: YOUR FREE TIME</p>
                </div>
             </div>

             {/* US */}
             <div className="bg-green-900/20 border-2 border-green-500/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">SMARTER CHOICE</div>
                <h3 className="text-2xl font-black text-green-400 mb-6">With Local Pros</h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-green-400 font-bold">✓</span> We handle ALL your platforms
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-green-400 font-bold">✓</span> We write captions & optimize posts
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-green-400 font-bold">✓</span> Reviews collected automatically
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-green-400 font-bold">✓</span> Posts created from job photos
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300">
                        <span className="text-green-400 font-bold">✓</span> Consistency guaranteed
                    </li>
                </ul>
                <div className="mt-8 pt-8 border-t border-green-500/20">
                    <p className="text-neutral-400 text-sm uppercase tracking-wide mb-1">Weekly Time Cost</p>
                    <p className="text-3xl font-black text-white">60 Seconds</p>
                    <p className="text-green-400 text-sm mt-2 font-bold">Cost: Less than one job</p>
                </div>
             </div>

          </div>

          <div className="mt-12 text-center bg-neutral-900 p-6 rounded-xl border border-neutral-700">
             <p className="text-xl font-bold text-white">
                You didn't start a business to become a social media manager.
             </p>
          </div>

          <div className="mt-12 rounded-xl overflow-hidden shadow-2xl border border-neutral-700">
             <img 
                src={oneUploadPostEverywhere} 
                alt="One upload to rule them all" 
                className="w-full"
            />
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 8: OBJECTIONS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
            
          <div className="text-center mb-12">
             <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black mb-4">FAQ</p>
             <h2 className="text-3xl md:text-4xl font-black text-white">But what about...</h2>
          </div>

          <div className="space-y-2">
             <AccordionItem 
                question='Q: "What if I get negative reviews?"' 
                answer="A: Our system catches unhappy customers BEFORE they leave public reviews. They get routed to a private feedback form. You get notified immediately so you can call and resolve the issue. Most 'negative reviews' never happen." 
             />
             <AccordionItem 
                question='Q: "What if I work with a different accounting system?"' 
                answer="A: No problem. You can simply BCC us on your invoices, or use a simple form we provide. As long as we get the customer's name and number, our system does the rest." 
             />
             <AccordionItem 
                question='Q: "What if I am too busy to send photos?"' 
                answer="A: That's the whole point. You're always too busy. That's why we build automatic content into the system — service promotions, holiday posts, review highlights. You'll always have something going out." 
             />
             <AccordionItem 
                question='Q: "I have been burned by agencies before."' 
                answer="A: So have we. That's why reviews come with a 30-day money-back guarantee. Reviews (R1,200) and posting (R2,000) on their own are month-to-month. The R2,500 plan is a 6-month commitment, because that's how long it takes Google to notice steady reviews and activity, and it includes a free website if you need one (12-month commitment with the website)." 
             />
              <AccordionItem 
                question='Q: "Is this only for contractors?"' 
                answer="A: We specialize in home service businesses — plumbers, electricians, fencing, pest control, cleaning — but the system works for any local business that relies on reviews and visibility." 
             />
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 9: PACKAGES
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
            
          <div className="text-center mb-16">
             <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black mb-4">CHOOSE YOUR PACKAGE</p>
             <h2 className="text-3xl md:text-5xl font-black text-white">Everything You Need To Grow</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Essential */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 flex flex-col hover:border-amber-500/30 transition-colors">
                <div className="mb-6">
                    <h3 className="text-amber-400 font-bold text-lg uppercase tracking-wide">Reviews</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white">R1,200</span>
                        <span className="text-neutral-400">/mo</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-2">Automated collection</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> WhatsApp requests
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> Negative review shield
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> Google & Facebook
                    </li>
                </ul>
                <Link to="/reviews" className="block w-full py-4 rounded-xl border border-neutral-600 text-white font-bold text-center hover:bg-neutral-800 transition-colors">
                    View Details
                </Link>
            </div>

            {/* Growth */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 flex flex-col hover:border-amber-500/30 transition-colors">
                <div className="mb-6">
                    <h3 className="text-amber-400 font-bold text-lg uppercase tracking-wide">Social</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white">R2,000</span>
                        <span className="text-neutral-400">/mo</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-2">Done-for-you posting</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                     <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> Weekly posts
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> FB, IG & Google
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-amber-500 shrink-0" /> Holiday posts
                    </li>
                </ul>
                <Link to="/social-media-posting-service" className="block w-full py-4 rounded-xl border border-neutral-600 text-white font-bold text-center hover:bg-neutral-800 transition-colors">
                    View Details
                </Link>
            </div>

            {/* Complete */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 flex flex-col hover:border-amber-500/30 transition-colors">
                <div className="mb-6">
                    <h3 className="text-amber-400 font-bold text-lg uppercase tracking-wide">Complete</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white">R2,500</span>
                        <span className="text-neutral-400">/mo</span>
                    </div>
                    <p className="text-green-400 text-sm font-bold mt-2">6 months · free website on 12 months</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-green-400 shrink-0" /> Reviews + Social
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-green-400 shrink-0" /> Priority support
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-green-400 shrink-0" /> Strategy calls
                    </li>
                </ul>
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl bg-amber-500 text-black font-bold text-center hover:bg-amber-400 transition-colors shadow-lg">
                    Get Started
                </a>
            </div>

            {/* Web Design */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 flex flex-col hover:border-blue-500/30 transition-colors">
                <div className="mb-6">
                    <h3 className="text-blue-400 font-bold text-lg uppercase tracking-wide">Web Design</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white">R9,900</span>
                        <span className="text-neutral-400">once-off</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-2">High-converting sites</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-blue-500 shrink-0" /> Mobile-first design
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-blue-500 shrink-0" /> SEO optimized
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-blue-500 shrink-0" /> Fast turnaround
                    </li>
                </ul>
                <Link to="/web-design" className="block w-full py-4 rounded-xl border border-neutral-600 text-white font-bold text-center hover:bg-neutral-800 transition-colors">
                    View Details
                </Link>
            </div>

            {/* FieldCard */}
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 md:p-8 flex flex-col hover:border-red-500/30 transition-colors">
                <div className="mb-6">
                    <h3 className="text-red-400 font-bold text-lg uppercase tracking-wide">FieldCard</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white">R290-R590</span>
                        <span className="text-neutral-400">pm</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-2">Job Management App</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-red-500 shrink-0" /> Quotes & Invoices
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-red-500 shrink-0" /> Job Cards
                    </li>
                    <li className="flex items-start gap-3 text-neutral-300 text-sm">
                        <Check className="w-5 h-5 text-red-500 shrink-0" /> Client Management
                    </li>
                </ul>
                <Link to="/fieldcard" className="block w-full py-4 rounded-xl border border-neutral-600 text-white font-bold text-center hover:bg-neutral-800 transition-colors">
                    View Details
                </Link>
            </div>

          </div>


        </div>
      </section>

      {/* ============================================
          SECTION 10: FINAL CTA
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-950 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
            
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
            While Your Competitors Are Still "Figuring It Out"... <br/>
            <span className="text-amber-500">You'll Already Be Everywhere.</span>
          </h2>

          <p className="text-xl md:text-2xl text-neutral-300 mb-12">
            Stop drowning in digital marketing. <br/>
            Start running your actual business.
          </p>

          <CTAButton text="Get Started Today — WhatsApp Us Now" />

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-neutral-400 text-sm font-medium">
             <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> 30-Day Money-Back Guarantee on Reviews</span>
             <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> Single Services Month-to-Month</span>
             <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500"/> WhatsApp Support</span>
          </div>

          <p className="text-neutral-500 mt-8">
            Real people. Real support. Real results.
          </p>

          <div className="mt-12 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
             <img 
                src={happyContractorLandscape} 
                alt="Happy contractor looking at future" 
                className="w-full opacity-80 hover:opacity-100 transition-opacity duration-700 object-cover object-center h-48 md:h-auto"
            />
          </div>

        </div>
      </section>

      {/* ============================================
          SECTION 11: CUSTOMER REVIEWS
          ============================================ */}
      <section className="py-16 md:py-24 bg-neutral-800">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-black mb-4">CUSTOMER REVIEWS</p>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              What Our Customers Say
            </h2>
          </div>
          <ReputationReviewWidget variant="dark" />
        </div>
      </section>

    </div>
  );
};

export default HomeGeminiPage;
