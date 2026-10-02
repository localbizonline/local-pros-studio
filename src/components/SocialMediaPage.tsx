import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Camera, Calendar, TrendingUp, Zap, Clock, Image, Video, Sparkles } from 'lucide-react';
import SocialProofSection from './SocialProofSection';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const benefits = [
  {
    icon: Zap,
    title: "60-Second Posts",
    description: "Create posts in under a minute with our simple posting form."
  },
  {
    icon: Calendar,
    title: "We Handle Consistency",
    description: "Weekly service posts, holiday content, and review highlights — automatic."
  },
  {
    icon: Sparkles,
    title: "AI Text Polishing",
    description: "We make everything sound professional and engaging."
  },
  {
    icon: TrendingUp,
    title: "Stay Visible",
    description: "Never go silent — even during your busiest weeks."
  }
];

const included = [
  "Quick 60-second posting form",
  "5 post templates to choose from",
  "AI text polishing",
  "Unlimited posts from your submissions",
  "4 service promotion posts/month (we create)",
  "Public holiday posts (automatic)",
  "Review highlight posts (automatic)",
  "Posts to Facebook, Instagram & Google",
  "Dashboard access",
  "Monthly check-ins"
];

const platforms = [
  "Facebook Business Page",
  "Instagram Business Account",
  "Google Business Profile (Maps)"
];

const postTypes = [
  {
    type: "Recent Job",
    description: "Show off completed work",
    photos: "1-8"
  },
  {
    type: "Before & After",
    description: "Transformation shots",
    photos: "2-8"
  },
  {
    type: "Service Highlight",
    description: "Promote a specific service",
    photos: "2-8"
  },
  {
    type: "Special Offer",
    description: "Promotions and deals",
    photos: "1-4"
  },
  {
    type: "Tips & Updates",
    description: "Helpful info for customers",
    photos: "1-4"
  }
];

const faqs = [
  {
    question: "How do I create a post?",
    answer: "Use your posting form — it takes about 60 seconds. Upload photos, add a quick description, and we handle the rest. We polish the text, create the visuals, and send you a preview before it goes live."
  },
  {
    question: "What if I'm too busy to submit content?",
    answer: "No problem! We create 4 service promotion posts per month for you automatically, plus public holiday posts and review highlights. You'll always have content going out, even during your busiest weeks."
  },
  {
    question: "Can I approve posts before they go live?",
    answer: "Yes! You receive a WhatsApp notification when your post is ready. Go to your dashboard to preview the text and image/video. You can approve, edit, or delete it — you have full control."
  },
  {
    question: "What do you create from my photos?",
    answer: "1-2 photos become an image post. 4-8 photos become BOTH a gallery post AND a video reel for maximum reach. Real work photos perform better than anything else."
  }
];

const SocialMediaPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="container-md relative">
          <div className="text-center">
            <span className="badge-dark mb-6">Social Posting</span>
            
            <h1 className="text-white mb-6 text-balance">
              Stay Visible.<br className="hidden sm:block" /> Never Go Silent.
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Create posts in 60 seconds. We handle the consistency with weekly service posts, 
              holiday content, and review highlights — all automatic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="#pricing" className="btn-secondary border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600">
                View Pricing
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-neutral-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                60-second posts
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Unlimited submissions
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                AI polishing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-sm bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* We Handle Consistency */}
      <section className="section bg-neutral-50">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">We Handle Consistency</span>
            <h2 className="text-neutral-900 mb-4">You'll Always Have Content Going Out</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Even if you're too busy to submit anything, we keep you visible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">4x</div>
              <div className="text-sm text-neutral-600 mb-1">Service promotion posts</div>
              <div className="text-xs text-neutral-400">Weekly — we create everything</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">Every</div>
              <div className="text-sm text-neutral-600 mb-1">Public holiday</div>
              <div className="text-xs text-neutral-400">Automatic — relevant, timely posts</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-soft text-center">
              <div className="text-3xl font-bold text-neutral-900 mb-2">Every</div>
              <div className="text-sm text-neutral-600 mb-1">Positive review</div>
              <div className="text-xs text-neutral-400">Automatic — shared to your socials</div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-8 text-white text-center">
            <p className="text-neutral-300 text-lg">
              <span className="text-white font-semibold">Anything YOU submit is bonus content</span> on top of this. 
              Your job photos make the best content — real work photos perform better than anything else.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="section bg-white">
        <div className="container-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="badge mb-4">What's Included</span>
              <h2 className="text-neutral-900 mb-4">Everything You Need</h2>
              <p className="text-neutral-600 mb-8">
                We handle your entire social media presence so you can focus on your work.
              </p>
              <ul className="space-y-3">
                {included.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-neutral-50 rounded-2xl p-8 mb-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Platforms We Post To</h3>
                <ul className="space-y-3">
                  {platforms.map((platform, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700">{platform}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">What We Create From Your Photos</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image className="w-5 h-5 text-neutral-500" />
                      <span className="text-sm text-neutral-700">1-2 photos</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">→ Image post</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-neutral-500" />
                      <span className="text-sm text-neutral-700">4-8 photos</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">→ Gallery post</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-neutral-500" />
                      <span className="text-sm text-neutral-700">4-8 photos</span>
                    </div>
                    <span className="text-sm font-medium text-neutral-900">→ Video reel</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-4">
                  Upload 4-8 photos and we create BOTH a gallery AND a reel for maximum reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Types */}
      <section className="section-sm bg-neutral-50">
        <div className="container-md">
          <div className="text-center mb-12">
            <span className="badge mb-4">Post Types</span>
            <h2 className="text-neutral-900 mb-4">5 Templates to Choose From</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {postTypes.map((post, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-soft">
                <h4 className="font-semibold text-neutral-900 text-sm mb-1">{post.type}</h4>
                <p className="text-neutral-500 text-xs mb-2">{post.description}</p>
                <span className="text-xs text-neutral-400">{post.photos} photos</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section bg-white">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">Pricing</span>
            <h2 className="text-neutral-900 mb-4">Simple Monthly Pricing</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              One flat fee for complete social posting. Setup fee waived with 6-month commitment.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-neutral-900 rounded-2xl p-8 text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Social Posting</h3>
              <p className="text-neutral-400 text-sm mb-6">Complete social media management</p>

              <div className="mb-2">
                <span className="text-5xl font-bold">R2,000</span>
                <span className="text-neutral-400 ml-2">/month</span>
              </div>

              <p className="text-neutral-500 text-sm mb-8">
                Setup: R2,500 (waived with 6-month commitment)
              </p>

              <a
                href="https://wa.me/27787869161?text=Hi%2C%20I'm%20interested%20in%20Social%20Posting"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 w-full justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>

              <p className="text-neutral-500 text-xs mt-4">
                No long-term contract required. Cancel anytime.
              </p>
            </div>
          </div>

          {/* Combined Package Upsell */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600 mb-4">
              Want review collection too? Get both services for less.
            </p>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-900 font-medium hover:underline"
            >
              Get the Complete Package (50% OFF)
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-neutral-50">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">FAQ</span>
            <h2 className="text-neutral-900 mb-4">Common Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProofSection />

      {/* Final CTA */}
      <section className="section-sm bg-neutral-950">
        <div className="container-md text-center">
          <h2 className="text-white mb-4">Ready to Stay Visible?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Let's discuss how we can help you build a consistent social media presence.
          </p>
          <a
            href="https://wa.me/27787869161?text=Hi%2C%20I'd%20like%20to%20discuss%20Social%20Posting"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
          >
            Start a Conversation
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default SocialMediaPage;
