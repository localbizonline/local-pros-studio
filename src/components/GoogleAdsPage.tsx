import React from 'react';
import { ArrowRight, Check, Target, TrendingUp, BarChart3, Users } from 'lucide-react';
import SocialProofSection from './SocialProofSection';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const benefits = [
  {
    icon: Target,
    title: "Strategic Targeting",
    description: "Reach high-intent customers actively searching for your services across South Africa."
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Full transparency with detailed reporting on every rand spent and lead generated."
  },
  {
    icon: BarChart3,
    title: "Expert Optimization",
    description: "Dedicated account management with continuous campaign refinement for maximum performance."
  },
  {
    icon: Users,
    title: "Quality Over Quantity",
    description: "Focus on high-value leads that convert, not vanity metrics."
  }
];

const included = [
  "Dedicated account manager",
  "Campaign strategy & setup",
  "Keyword research & targeting",
  "Ad copywriting & A/B testing",
  "Conversion tracking setup",
  "Weekly performance reports",
  "Budget optimization",
  "Competitor analysis",
  "Ongoing campaign management",
  "Direct support via WhatsApp"
];

const notIncluded = [
  "Landing page design & development",
  "Landing page optimization",
  "Ad spend budget (paid directly to Google)"
];

const faqs = [
  {
    question: "What's the minimum ad spend budget?",
    answer: "We work with businesses investing R15,000 or more per month in Google Ads. This budget level allows for meaningful data collection, proper A/B testing, and the ability to compete effectively in your market."
  },
  {
    question: "What's the setup fee for?",
    answer: "The R10,000 setup fee covers comprehensive campaign architecture, including competitor analysis, keyword research, account structure, conversion tracking setup, and initial ad creation. This foundation ensures your campaigns launch optimally."
  },
  {
    question: "Do you provide landing pages?",
    answer: "Landing page design and optimization is available as an additional service. We can create high-converting landing pages tailored to your campaigns, or work with your existing pages. Contact us for a quote."
  },
  {
    question: "How quickly will I see results?",
    answer: "You can start receiving leads within days of launching. However, campaigns typically need 2-4 weeks of optimization to reach peak performance. With proper budgets, we can accelerate testing and optimization."
  },
  {
    question: "What reporting do you provide?",
    answer: "You'll receive weekly performance reports with full transparency on spend, leads, cost per acquisition, and ROI. We also provide monthly strategy reviews to discuss optimization opportunities."
  },
  {
    question: "Can I pause or stop anytime?",
    answer: "Yes, there's no long-term contract. You can pause or cancel your campaign at any time. We believe in earning your business every month through results."
  }
];

const GoogleAdsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="container-md relative">
          <div className="text-center">
            <span className="badge-dark mb-6">Google Ads Management</span>
            
            <h1 className="text-white mb-6 text-balance">
              Google Ads Management<br className="hidden sm:block" /> For Growing Businesses
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Professional Google Ads management for established businesses ready to scale. 
              Expert strategy, transparent reporting, and measurable ROI.
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
                R15,000+ monthly budgets
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Dedicated account manager
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Weekly reporting
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

      {/* How It Works */}
      <section className="section bg-neutral-50">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">How It Works</span>
            <h2 className="text-neutral-900 mb-4">Your Ads, Managed Properly</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We handle everything from strategy to execution, so you can focus on 
              serving your customers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Strategy Session</h3>
                    <p className="text-neutral-600 text-sm">We learn about your business, target customers, and goals to create a winning strategy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Campaign Setup</h3>
                    <p className="text-neutral-600 text-sm">We build your campaigns with targeted keywords, compelling ads, and proper tracking.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Launch & Optimize</h3>
                    <p className="text-neutral-600 text-sm">Your campaigns go live and we continuously optimize for better results.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Report & Scale</h3>
                    <p className="text-neutral-600 text-sm">Monthly reports show your ROI, and we scale what works to grow your business.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">What's Included</h3>
              <ul className="space-y-3 mb-8">
                {included.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Additional Services</h3>
              <ul className="space-y-3">
                {notIncluded.map((item, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="w-5 h-5 bg-neutral-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-neutral-500 text-xs">+</span>
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section bg-white">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">Pricing</span>
            <h2 className="text-neutral-900 mb-4">Professional Google Ads Management</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Transparent pricing for established businesses ready to invest in growth.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-neutral-900 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Google Ads Management</h3>
                <p className="text-neutral-400 text-sm">For businesses with R15,000+ monthly ad budgets</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                  <span className="text-neutral-300">Setup Fee (once-off)</span>
                  <span className="text-xl font-bold">R10,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-neutral-800">
                  <span className="text-neutral-300">Monthly Management</span>
                  <span className="text-xl font-bold">R5,000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-neutral-300">Minimum Ad Spend</span>
                  <span className="text-xl font-bold">R15,000+</span>
                </div>
              </div>

              <div className="bg-neutral-800 rounded-lg p-4 mb-8">
                <p className="text-neutral-400 text-sm">
                  <strong className="text-white">Note:</strong> Landing page design and optimization is available as an additional service. Contact us for a custom quote.
                </p>
              </div>

              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 w-full justify-center"
              >
                Discuss Your Campaign
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>

              <p className="text-neutral-500 text-xs mt-4 text-center">
                No long-term contract. Cancel anytime.
              </p>
            </div>
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
          <h2 className="text-white mb-4">Ready to Get More Leads?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Let's discuss your advertising goals and create a strategy that works for your business.
          </p>
          <a
            href={SITE_WHATSAPP_URL}
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

export default GoogleAdsPage;
