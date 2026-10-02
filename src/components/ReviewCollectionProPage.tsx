import React from 'react';
import { ArrowRight, Check, Star, Shield, Clock, Zap, TrendingUp, Users, AlertTriangle, ChevronRight } from 'lucide-react';

// Import hero image
import heroImage from '../assets/images/review-screen-focus.jpg';
import { SITE_WHATSAPP_URL } from '../whatsapp';

// =============================================================================
// DATA ARRAYS
// =============================================================================

const resultCards = [
  { industry: "Plumbing", before: { reviews: 8, rating: 4.1 }, after: { reviews: 67, rating: 4.9 }, period: "6 months" },
  { industry: "Electrical", before: { reviews: 12, rating: 4.3 }, after: { reviews: 89, rating: 4.8 }, period: "8 months" },
  { industry: "HVAC", before: { reviews: 5, rating: 4.0 }, after: { reviews: 52, rating: 4.9 }, period: "5 months" },
  { industry: "Roofing", before: { reviews: 15, rating: 4.2 }, after: { reviews: 94, rating: 4.8 }, period: "7 months" },
  { industry: "Landscaping", before: { reviews: 3, rating: 3.8 }, after: { reviews: 41, rating: 4.9 }, period: "4 months" },
  { industry: "Pest Control", before: { reviews: 9, rating: 4.4 }, after: { reviews: 76, rating: 4.9 }, period: "6 months" },
  { industry: "Pool Service", before: { reviews: 6, rating: 4.0 }, after: { reviews: 58, rating: 4.8 }, period: "5 months" },
  { industry: "Painting", before: { reviews: 11, rating: 4.2 }, after: { reviews: 83, rating: 4.9 }, period: "7 months" },
];

const speedCards = [
  { industry: "Plumbing Co.", before: "1 review/month", after: "12 reviews/month", multiplier: "12x" },
  { industry: "Electrical Services", before: "2 reviews/month", after: "15 reviews/month", multiplier: "7.5x" },
  { industry: "Home Renovations", before: "0.5 reviews/month", after: "8 reviews/month", multiplier: "16x" },
  { industry: "Cleaning Service", before: "3 reviews/month", after: "22 reviews/month", multiplier: "7x" },
  { industry: "Security Install", before: "1 review/month", after: "9 reviews/month", multiplier: "9x" },
  { industry: "Flooring Specialist", before: "2 reviews/month", after: "14 reviews/month", multiplier: "7x" },
  { industry: "Kitchen Fitters", before: "1.5 reviews/month", after: "11 reviews/month", multiplier: "7x" },
  { industry: "Garden Services", before: "2 reviews/month", after: "18 reviews/month", multiplier: "9x" },
];

const timelineCards = [
  { industry: "Plumbing", firstReview: "Day 2", after30: "18 reviews", after90: "54 reviews" },
  { industry: "Electrical", firstReview: "Day 4", after30: "14 reviews", after90: "48 reviews" },
  { industry: "Roofing", firstReview: "Day 3", after30: "16 reviews", after90: "52 reviews" },
  { industry: "HVAC", firstReview: "Day 5", after30: "12 reviews", after90: "41 reviews" },
  { industry: "Landscaping", firstReview: "Day 2", after30: "20 reviews", after90: "61 reviews" },
  { industry: "Cleaning", firstReview: "Day 1", after30: "24 reviews", after90: "72 reviews" },
  { industry: "Pest Control", firstReview: "Day 3", after30: "15 reviews", after90: "49 reviews" },
  { industry: "Painting", firstReview: "Day 4", after30: "13 reviews", after90: "44 reviews" },
];

const stats = [
  { icon: Star, value: "500+", label: "Reviews Collected" },
  { icon: Shield, value: "50+", label: "Negative Reviews Avoided" },
  { icon: Users, value: "25+", label: "Clients Served" },
  { icon: Star, value: "4.8", label: "Average Rating" },
  { icon: TrendingUp, value: "+900%", label: "Reviews/Year Increase" },
];

const pricingFeatures = [
  "Unlimited review requests",
  "WhatsApp + Email outreach",
  "Gentle follow-up system",
  "Negative review safeguards",
  "Real-time review alerts",
  "AI-powered review responses",
  "Dashboard access",
  "Monthly check-ins",
  "Past 90 days kickstart",
];

const beforeAfterCards = [
  { industry: "Plumbing Pro", before: { reviews: 7, rating: 4.0 }, after: { reviews: 89, rating: 4.9 } },
  { industry: "Spark Electric", before: { reviews: 11, rating: 4.2 }, after: { reviews: 112, rating: 4.8 } },
  { industry: "Cool Air HVAC", before: { reviews: 4, rating: 3.9 }, after: { reviews: 67, rating: 4.9 } },
  { industry: "TopRoof Co.", before: { reviews: 9, rating: 4.1 }, after: { reviews: 94, rating: 4.8 } },
  { industry: "Green Gardens", before: { reviews: 6, rating: 4.0 }, after: { reviews: 58, rating: 4.9 } },
  { industry: "BugFree Pest", before: { reviews: 13, rating: 4.3 }, after: { reviews: 98, rating: 4.9 } },
  { industry: "Crystal Pools", before: { reviews: 5, rating: 3.8 }, after: { reviews: 71, rating: 4.8 } },
  { industry: "Perfect Paint", before: { reviews: 8, rating: 4.1 }, after: { reviews: 86, rating: 4.9 } },
];

// =============================================================================
// PLATFORM LOGOS
// =============================================================================

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const HelloPeterLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <circle cx="12" cy="12" r="12" fill="#00BCD4"/>
    <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">HP</text>
  </svg>
);

const platforms = [
  { name: 'Google', Logo: GoogleLogo },
  { name: 'Facebook', Logo: FacebookLogo },
  { name: 'HelloPeter', Logo: HelloPeterLogo },
  { name: 'WhatsApp', Logo: WhatsAppLogo },
];

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

const ImagePlaceholder = ({ id, description, className = "" }: { id: string; description: string; className?: string }) => (
  <div className={`bg-neutral-200 rounded-xl flex items-center justify-center p-6 ${className}`}>
    <div className="text-center">
      <p className="text-neutral-500 text-xs font-mono mb-2">[{id}]</p>
      <p className="text-neutral-600 text-sm max-w-xs">{description}</p>
    </div>
  </div>
);

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`}
        />
      ))}
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const ReviewCollectionProPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ===================================================================== */}
      {/* SECTION 1: HERO (Reviews Funnel Style) */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Customer reading reviews" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-900/60" />
        </div>
        <div className="container-md relative z-10 py-20 md:py-28">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs uppercase tracking-[0.2em] text-white/80">
              Done-For-You Review Collection
            </div>
            
            <h1 className="text-white text-balance leading-tight text-4xl md:text-5xl lg:text-6xl font-bold">
              One bad review can cost you the next job.
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                We get you more 5-star reviews.
              </span>
            </h1>
            
            <div className="flex items-center gap-1 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-neutral-200 max-w-2xl leading-relaxed">
              <strong className="text-white">Done-For-You</strong> review collection built for service businesses.
              <br /><br />
              We handle the <strong className="text-white">follow-ups</strong>, <strong className="text-white">filtering</strong>, and <strong className="text-white">responses</strong>...
              <br />
              ...while you focus on the work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="#how-it-works" className="btn-secondary border-white/40 text-white hover:bg-white/10">
                How it works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: PLATFORMS BAR */}
      {/* ===================================================================== */}
      <section className="py-10 bg-white border-b border-neutral-100">
        <div className="container-lg">
          <p className="text-center text-neutral-500 text-sm mb-6 uppercase tracking-wider font-medium">
            We collect reviews on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <platform.Logo />
                <span className="font-medium text-neutral-900 text-sm">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: DONE-FOR-YOU EXPLANATION */}
      {/* ===================================================================== */}
      <section className="section bg-neutral-950 text-white">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* IMAGE PLACEHOLDER */}
            <ImagePlaceholder
              id="PHONE-REVIEW-NOTIFICATION"
              description="Close-up of smartphone screen showing a Google review notification or WhatsApp message. Phone held in hand, blurred background. Shows excitement of receiving a new 5-star review."
              className="aspect-[5/6] min-h-[400px] order-2 lg:order-1 bg-neutral-800 border border-neutral-700"
            />
            
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 mb-6 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/15 text-yellow-300 uppercase tracking-widest">
                The Service
              </span>
              
              <h2 className="text-white mb-6 text-4xl md:text-5xl font-bold leading-tight">
                Done-For-You<br />Review Collection
              </h2>
              
              <p className="text-neutral-200 mb-4 text-xl leading-relaxed">
                We effortlessly charm the <strong className="text-white">best</strong> and <strong className="text-white">most</strong> reviews from your delighted customers.
              </p>
              
              <p className="text-neutral-300 mb-4 text-lg leading-relaxed">
                Our clients often experience results considered "<strong className="text-white">unheard of</strong>" in the industry.
              </p>
              
              <p className="text-yellow-300 font-semibold mb-3 text-xl">Our Secret?</p>
              
              <p className="text-neutral-100 mb-4 text-lg leading-relaxed">
                <strong>Behavioral psychology</strong>.
                <br />
                <strong>Statistical precision</strong>.
                <br />
                And a deep commitment to your customers' happiness.
              </p>
              
              <p className="text-neutral-300 mb-3 text-lg leading-relaxed">
                We only work with <strong className="text-white">authentic reviews</strong>.
                <br />
                From <strong className="text-white">your</strong> real customers.
              </p>
              
              <p className="text-neutral-500 italic mb-6 text-base">
                (No fake reviews, no purchased reviews — ever.)
              </p>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="text-neutral-400 text-sm mb-2">How does it work?</p>
                <p className="text-white leading-relaxed">
                  You provide your latest customer list.
                  <br />
                  We take care of <strong>everything</strong> from there.
                </p>
                <p className="text-yellow-300 font-semibold mt-4 text-lg">
                  Sit back and watch your review count soar — week after week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: RESULTS GRID */}
      {/* ===================================================================== */}
      <section className="section bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="badge mb-4">Results</span>
            <h2 className="text-neutral-900 mb-4 text-4xl md:text-5xl font-bold">We Make Review Collection Effortless</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto text-xl leading-relaxed">
              Most great businesses <strong>lack the reviews they deserve</strong>...
              <br />
              ...simply because their review collection system is either <strong>ineffective</strong> or <strong>non-existent</strong>.
            </p>
          </div>
          
          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resultCards.map((card, index) => (
              <div key={index} className="bg-neutral-900 rounded-xl p-5 text-white shadow-lg border border-neutral-800">
                <p className="text-neutral-300 text-sm mb-3 font-semibold flex items-center justify-between">
                  {card.industry}
                  <span className="text-yellow-300 text-[11px] px-2 py-1 rounded-full bg-white/10 border border-white/10">+{card.after.reviews - card.before.reviews} reviews</span>
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 text-xs">Before</span>
                    <div className="text-right">
                      <span className="text-neutral-400 text-sm">{card.before.reviews} reviews</span>
                      <div className="flex justify-end">
                        <StarRating rating={card.before.rating} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-700"></div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-xs font-medium">After</span>
                    <div className="text-right">
                      <span className="text-white text-sm font-semibold">{card.after.reviews} reviews</span>
                      <div className="flex justify-end">
                        <StarRating rating={card.after.rating} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-neutral-500 text-xs mt-3 text-center">{card.period}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-neutral-700 mb-4 text-xl">
              Discover how <strong>outsourcing your review collection</strong> can transform your business:
            </p>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: WHY FOCUS ON REVIEWS NOW */}
      {/* ===================================================================== */}
      <section className="section bg-black text-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/15 border border-yellow-500/25 text-yellow-300 text-xs font-bold uppercase tracking-[0.2em] mb-6">
              Important
            </span>

            <h2 className="text-white mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Why you need to focus on your reviews <span className="text-yellow-300">NOW</span>:
            </h2>

            <div className="max-w-3xl mx-auto text-left md:text-center">
              <p className="text-neutral-200 text-xl md:text-2xl leading-relaxed mb-6">
                Google is shifting to <strong className="text-white">AI-powered summaries</strong> as the main way to display search results.
              </p>
              
              <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-6">
                It's no longer about <strong className="text-white">keywords</strong> or what you say on your website...
              </p>
              
              <p className="text-yellow-300 text-2xl md:text-3xl font-bold">
                ...it's about what <span className="text-white">others</span> say about you.
              </p>
            </div>
          </div>

          {/* NOW vs FUTURE Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-neutral-300 text-xs font-bold uppercase tracking-widest">NOW</span>
                <span className="text-neutral-500 text-xs">What Google looks like today</span>
              </div>
              <ImagePlaceholder
                id="GOOGLE-SEARCH-NOW"
                description="Screenshot-style mockup of current Google search results showing a local business with map pack and reviews visible."
                className="aspect-[4/3] bg-neutral-800 border border-neutral-700"
              />
            </div>

            <div className="bg-neutral-900 rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">FUTURE</span>
                <span className="text-neutral-500 text-xs">AI summary pulls review sentiment</span>
              </div>
              <ImagePlaceholder
                id="GOOGLE-SEARCH-FUTURE"
                description="Mockup showing Google AI-powered search summary pulling in review quotes and ratings prominently. Reviews become THE deciding factor."
                className="aspect-[4/3] bg-neutral-800 border border-neutral-700"
              />
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-8 border border-neutral-800 mb-12">
            <p className="text-white text-2xl md:text-3xl font-bold mb-4">
              When "beta" becomes the norm, your reviews will be the deciding factor...
            </p>
            
            <div className="space-y-3 text-neutral-200 mb-6">
              {[
                "Whether you're visible online or get drowned out",
                "Whether you maintain your ranking or drop below competition",
                "Whether new customers keep coming in or the flow stops altogether",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span className="text-xl">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-700 pt-6">
              <p className="text-white text-xl md:text-2xl font-semibold mb-2">
                It's a <span className="text-red-400 font-bold">RISK</span> to do nothing.
              </p>
              <p className="text-white text-xl md:text-2xl font-semibold">
                And a <span className="text-green-400 font-bold">HUGE opportunity</span> if you act now.
              </p>
            </div>
          </div>

          {/* What you don't have to do */}
          <div className="text-center mb-8">
            <p className="text-neutral-300 text-xl mb-6">Unlike other "solutions":</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                "No figuring out",
                "No building",
                "No hiring",
                "No training",
                "No learning curve",
                "We do it all for you",
              ].map((item, index) => (
                <div key={index} className="bg-neutral-900 rounded-xl p-4 flex items-center border border-neutral-800">
                  <Check className="w-5 h-5 text-yellow-300 mr-3 flex-shrink-0" />
                  <span className="text-neutral-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-neutral-200 mb-6 text-xl">
              Our clients see results <strong className="text-white">right out the gate</strong>.
            </p>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
            >
              Book a Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: SPEED RESULTS */}
      {/* ===================================================================== */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="bg-neutral-950 rounded-2xl p-8 md:p-12 text-center border border-neutral-800">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-300 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
              Speed
              <Zap className="w-4 h-4" />
            </span>
            <h2 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Want More Reviews, <span className="text-yellow-300">FASTER?</span>
            </h2>
            <p className="text-neutral-200 text-xl md:text-2xl max-w-3xl mx-auto">
              On average, our clients collect reviews <strong className="text-white">9x faster</strong>.
            </p>
          </div>

          {/* Speed Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {speedCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-200">
                <p className="text-neutral-500 text-sm mb-4 font-semibold">{card.industry}</p>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-xs uppercase tracking-widest font-semibold">Before</span>
                    <span className="text-neutral-600 text-sm font-medium">{card.before}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-900 text-xs uppercase tracking-widest font-semibold">After</span>
                    <span className="text-neutral-950 text-sm font-bold">{card.after}</span>
                  </div>
                </div>
                
                <div className="bg-neutral-950 text-yellow-300 text-center py-3 rounded-xl font-bold text-lg border border-neutral-900">
                  {card.multiplier} faster
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center text-neutral-500 text-sm mt-6">
            *Based on a sample of clients from various service industries
          </p>
          
          <div className="text-center mt-8">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Speed Up My Reviews
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: WORRIED ABOUT NEGATIVE REVIEWS */}
      {/* ===================================================================== */}
      <section className="section bg-neutral-950 text-white">
        <div className="container-md">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-300 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
              Objection handling
              <Shield className="w-4 h-4" />
            </span>
            <h2 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Worried About <span className="text-yellow-300">Negative Reviews?</span>
            </h2>
            <p className="text-neutral-200 text-xl max-w-2xl mx-auto">
              Most business owners secretly are.
              <br />
              That's normal. We built safeguards specifically for this.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-yellow-300/15 text-yellow-200 text-xs font-bold px-4 py-2 rounded-full border border-yellow-300/20 uppercase tracking-widest mb-6">
                Negative Review Safeguards
              </span>
              
              <p className="text-neutral-400 text-sm italic mb-6">
                It's important to understand what this does and does not do:
              </p>
              
              {/* What it DOES */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 rounded-xl p-6 border border-green-500/20">
                  <p className="text-green-300 font-bold mb-3 flex items-center uppercase tracking-widest text-xs">
                    <Check className="w-5 h-5 mr-2" /> What it does
                  </p>
                  <ul className="space-y-2 text-neutral-200">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-300 mr-2 flex-shrink-0 mt-1" />
                      Helps avoid almost all negative reviews
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-300 mr-2 flex-shrink-0 mt-1" />
                      Identifies problems early
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-300 mr-2 flex-shrink-0 mt-1" />
                      Keeps you compliant
                    </li>
                  </ul>
                </div>

                <div className="bg-neutral-900 rounded-xl p-6 border border-yellow-300/20">
                  <p className="text-yellow-200 font-bold mb-3 flex items-center uppercase tracking-widest text-xs">
                    <AlertTriangle className="w-5 h-5 mr-2" /> What it doesn't
                  </p>
                  <ul className="space-y-2 text-neutral-300">
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-yellow-200 mr-2 flex-shrink-0 mt-1" />
                      Not built to cover up neglect
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-4 h-4 text-yellow-200 mr-2 flex-shrink-0 mt-1" />
                      Not built to hide bad service
                    </li>
                  </ul>
                </div>
              </div>
              
              <p className="text-neutral-300 text-lg leading-relaxed">
                This is how our clients end up with <strong className="text-white">hundreds</strong> of 4-star and 5-star reviews...
                <br />
                <br />
                ...AND average ratings of <strong className="text-yellow-300">4.7, 4.8, 4.9</strong> and even <strong className="text-yellow-300">5.0</strong>.
              </p>
            </div>
            
            <div className="text-center">
              {/* Big Rating Display */}
              <div className="bg-neutral-900 rounded-2xl p-10 inline-block border border-neutral-800">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-6xl font-bold text-white mb-2">4.9</div>
                <p className="text-neutral-300 font-medium">Average Client Rating</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
            >
              Protect My Reputation
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: HOW IT WORKS (Brief) */}
      {/* ===================================================================== */}
      <section id="how-it-works" className="section-sm bg-neutral-50">
        <div className="container-md">
          <div className="bg-white rounded-xl p-8 md:p-12 text-center shadow-soft border border-neutral-200">
            <span className="badge mb-4">The Process</span>
            <h2 className="text-neutral-900 mb-4">How It Works</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
              With our Done-For-You Service we use the <strong>principles of behavioral psychology</strong> and <strong>statistical likelihoods</strong> to create spectacular results.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center text-neutral-900 font-medium hover:underline"
            >
              See Pricing & Get Started
              <ChevronRight className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: TIMELINE */}
      {/* ===================================================================== */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-800 bg-neutral-100 border border-neutral-200 px-4 py-2 rounded-full mb-6">
              Timeline
              <Clock className="w-4 h-4" />
            </span>
            <h2 className="text-neutral-950 mb-4 text-4xl md:text-5xl font-bold">
              How long until you see results?
            </h2>
            <p className="text-neutral-700 text-xl max-w-3xl mx-auto">
              Real client timelines. Real outcomes. No fluff.
            </p>
          </div>
          
          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timelineCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-neutral-200 shadow-lg">
                <p className="text-neutral-500 text-sm mb-4 font-semibold">{card.industry}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-xs uppercase tracking-widest font-semibold">First review</span>
                    <span className="text-neutral-950 text-sm font-bold">{card.firstReview}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-xs uppercase tracking-widest font-semibold">After 30 days</span>
                    <span className="text-neutral-800 text-sm font-medium">{card.after30}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-xs uppercase tracking-widest font-semibold">After 90 days</span>
                    <span className="text-neutral-950 text-sm font-bold">{card.after90}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <div className="inline-block rounded-xl border border-neutral-200 bg-neutral-50 px-8 py-6 mb-6">
              <p className="text-neutral-800 font-bold text-xl">
                Your first "hands-free" reviews could arrive as early as
                <br />
                <span className="text-yellow-600">2 business days</span> from today...
              </p>
            </div>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: STATS BAR */}
      {/* ===================================================================== */}
      <section className="section-sm bg-neutral-950">
        <div className="container-lg">
          <div className="text-center mb-10">
            <p className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
              Proof in numbers
            </p>
            <h3 className="text-white text-2xl md:text-3xl font-bold mt-3">
              Collecting raving reviews for SA's highest-rated service businesses
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="w-12 h-12 bg-black/30 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-yellow-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <p className="text-neutral-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 11: PRICING */}
      {/* ===================================================================== */}
      <section id="pricing" className="section bg-neutral-950 text-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-yellow-300 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-6">
              Pricing & Plans
            </span>
            <h2 className="text-white mb-4 text-4xl md:text-5xl font-bold">
              Done-For-You Review Collection
            </h2>
            <p className="text-neutral-200 text-xl max-w-3xl mx-auto">
              One fixed price for <strong className="text-white">unlimited</strong> results. Always.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white text-neutral-950 rounded-xl p-8 border border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-widest">
                  Monthly
                </span>
                <span className="text-neutral-500 text-xs font-semibold">Cancel anytime</span>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-950">R1,200</span>
                <span className="text-neutral-500 ml-2 text-lg">/month</span>
              </div>
              
              <div className="border border-dashed border-neutral-300 rounded-xl p-5 mb-6">
                <p className="text-neutral-700 text-sm mb-1">Setup</p>
                <p className="text-neutral-950 font-bold text-xl">R2,500</p>
                <p className="text-neutral-600 text-sm mt-2">Unlimited Review Requests</p>
              </div>
              
              <p className="text-neutral-950 font-bold mb-3">Everything included:</p>
              <ul className="space-y-2 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-neutral-800">
                    <Check className="w-4 h-4 text-neutral-950 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center bg-neutral-950 text-white hover:bg-neutral-800"
              >
                Get Started Monthly
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            
            {/* 6-Month Plan */}
            <div className="bg-neutral-900 rounded-xl p-8 text-white relative overflow-hidden border border-neutral-800">
              <div className="absolute top-5 right-5 bg-yellow-300 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full">
                SAVE R2,500
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="px-4 py-2 rounded-full bg-yellow-300/15 border border-yellow-300/20 text-yellow-200 text-xs font-bold uppercase tracking-widest">
                  6-Month
                </span>
                <span className="text-neutral-400 text-xs font-semibold">Best value</span>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R1,200</span>
                <span className="text-neutral-400 ml-2 text-lg">/month</span>
              </div>
              
              <div className="border border-dashed border-yellow-300/25 rounded-xl p-5 mb-6 bg-black/20">
                <p className="text-neutral-300 text-sm mb-1">Setup</p>
                <p className="text-yellow-200 font-bold text-xl">FREE</p>
                <p className="text-neutral-300 text-sm mt-2">Unlimited Review Requests</p>
              </div>
              
              <p className="text-white font-bold mb-3">Everything included:</p>
              <ul className="space-y-2 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-neutral-200">
                    <Check className="w-4 h-4 text-yellow-300 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 w-full justify-center"
              >
                Get Started (Best Value)
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 border border-white/10">
              <Shield className="w-5 h-5 text-yellow-300" />
              <span className="text-neutral-200 font-semibold">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 12: GUARANTEE */}
      {/* ===================================================================== */}
      <section className="section-sm bg-neutral-950">
        <div className="container-md">
          <div className="bg-neutral-900 rounded-xl p-8 md:p-12 text-center border border-neutral-800">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/15">
              <Shield className="w-10 h-10 text-yellow-300" />
            </div>
            
            <h2 className="text-white mb-4 text-3xl md:text-4xl font-bold">
              Results in Less Than 30 Days — <span className="text-yellow-300">Guaranteed</span>
            </h2>
            
            <p className="text-neutral-200 max-w-2xl mx-auto mb-6 text-lg leading-relaxed">
              We guarantee that you'll get your first <strong className="text-white">"hands-off" 4-star and 5-star reviews</strong> in less than 30 days...
              <br /><br />
              ...or we will refund 100% of your money, no questions asked.
            </p>
            
            <p className="text-neutral-400 mb-6 text-lg">
              With our clients, it has <strong className="text-white">NEVER</strong> taken longer than 30 days to see results.
            </p>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 inline-block mb-8">
              <p className="text-neutral-300 font-medium">The fastest results?</p>
              <p className="text-yellow-300 text-2xl font-bold">Just 2 business days</p>
            </div>
            
            <div>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Give Me Guaranteed Results
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 13: BEFORE & AFTER GALLERY */}
      {/* ===================================================================== */}
      <section className="section bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="badge mb-4">Proof</span>
            <h2 className="text-neutral-900 mb-4 text-4xl md:text-5xl font-bold">Before & After</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              Here are some of our clients' <strong>Before & After</strong> results...
            </p>
          </div>
          
          {/* Before/After Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {beforeAfterCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-neutral-200">
                <div className="p-4 border-b border-neutral-100">
                  <p className="text-neutral-700 font-medium text-center">{card.industry}</p>
                </div>
                
                <div className="grid grid-cols-2 divide-x divide-neutral-100">
                  {/* Before */}
                  <div className="p-4 bg-neutral-50">
                    <p className="text-neutral-400 text-xs text-center mb-2 uppercase tracking-widest font-semibold">Before</p>
                    <p className="text-neutral-600 text-lg font-semibold text-center">{card.before.reviews}</p>
                    <p className="text-neutral-400 text-xs text-center mb-2">reviews</p>
                    <div className="flex justify-center">
                      <StarRating rating={card.before.rating} size="sm" />
                    </div>
                    <p className="text-neutral-500 text-xs text-center mt-1">{card.before.rating}</p>
                  </div>
                  
                  {/* After */}
                  <div className="p-4 bg-green-50">
                    <p className="text-green-600 text-xs text-center mb-2 uppercase tracking-widest font-semibold">After</p>
                    <p className="text-green-700 text-lg font-bold text-center">{card.after.reviews}</p>
                    <p className="text-green-600 text-xs text-center mb-2">reviews</p>
                    <div className="flex justify-center">
                      <StarRating rating={card.after.rating} size="sm" />
                    </div>
                    <p className="text-green-700 text-xs text-center mt-1 font-medium">{card.after.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 14: FINAL CTA */}
      {/* ===================================================================== */}
      <section className="section bg-neutral-950">
        <div className="container-md text-center">
          <div className="inline-flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          
          <h2 className="text-white mb-4 text-4xl md:text-5xl font-bold">Ready to Get More Reviews?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Let's discuss how automated review collection can grow your reputation and bring in more customers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="btn-secondary border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default ReviewCollectionProPage;
