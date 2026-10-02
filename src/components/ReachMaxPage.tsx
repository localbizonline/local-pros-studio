import React from 'react';
import { ArrowRight, Check, MessageSquare, Users, Zap, BarChart3, Bot, Send, ExternalLink } from 'lucide-react';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '2,000+', label: 'Businesses Served' },
  { value: '15,000+', label: 'WhatsApps/Month' },
  { value: '98%', label: 'Open Rate' },
];

const features = [
  {
    icon: Send,
    title: 'Bulk Messaging',
    description: 'Send personalized WhatsApp messages to thousands of customers at once with 98% open rates.',
  },
  {
    icon: Bot,
    title: 'Smart Automation',
    description: 'Set up automated responses, appointment reminders, and follow-ups with no coding required.',
  },
  {
    icon: Users,
    title: 'Shared Team Inbox',
    description: 'All your WhatsApp messages in one place. Your team can collaborate and respond together.',
  },
  {
    icon: BarChart3,
    title: 'CRM Integration',
    description: 'Connect with HubSpot, Salesforce, Zoho and more. Customer info syncs automatically.',
  },
];

const useCases = [
  {
    emoji: '📄',
    title: 'Quotes & Invoices',
    description: 'Get quotes approved 3x faster with instant delivery.',
  },
  {
    emoji: '📅',
    title: 'Appointment Reminders',
    description: 'Reduce no-shows by 70% with automated confirmations.',
  },
  {
    emoji: '📦',
    title: 'Order Tracking',
    description: 'Keep customers informed with real-time updates.',
  },
  {
    emoji: '💬',
    title: 'Customer Support',
    description: 'Provide instant 24/7 support with smart chatbots.',
  },
  {
    emoji: '🎯',
    title: 'Lead Follow-up',
    description: 'Engage leads while they\'re still interested.',
  },
  {
    emoji: '📢',
    title: 'Marketing Campaigns',
    description: 'Send promotions that actually get read.',
  },
];

const ReachMaxPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-neutral-950">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container-lg relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-8">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">A Local Pros Product</span>
            </div>

            <h1 className="text-white mb-6 text-balance">
              We Built <span className="text-emerald-400">ReachMax</span> to Transform Business Communication
            </h1>

            <p className="text-emerald-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              After 5 years of using WhatsApp internally and sending 15,000+ messages monthly, 
              we knew other businesses needed this power too.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://www.reachmax.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-400 transition-colors duration-200"
              >
                Visit ReachMax
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-emerald-500/50 text-white hover:bg-emerald-500/20 hover:border-emerald-400"
              >
                Talk to Our Team
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-emerald-500/20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-emerald-300/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-white">
        <div className="container-md">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge mb-4">Our Story</span>
              <h2 className="text-neutral-900 mb-6">
                From Internal Tool to Industry Solution
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Local Pros has been at the forefront of digital business solutions since 2015. 
                  Over the past decade, we've partnered with over <strong className="text-neutral-900">2,000 businesses</strong> across 
                  South Africa, helping them grow and thrive in the digital age.
                </p>
                <p>
                  WhatsApp has been integral to our own operations for the past 5 years. We send over 
                  <strong className="text-neutral-900"> 15,000 WhatsApp messages per month</strong> for internal communications 
                  and client engagement. The incredible results we achieved – from improved customer 
                  response rates to streamlined operations – inspired us to create ReachMax in 2025.
                </p>
                <p>
                  ReachMax was born from a simple realization: if WhatsApp could transform our business 
                  so dramatically, we needed to help other businesses experience the same success.
                </p>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8">
                {/* WhatsApp conversation mockup */}
                <div className="bg-white rounded-2xl shadow-soft-lg overflow-hidden">
                  <div className="bg-emerald-600 px-4 py-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">ReachMax Business</div>
                      <div className="text-emerald-200 text-xs">Online</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3 bg-[#e5ddd5]">
                    <div className="flex justify-end">
                      <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-neutral-800">Your quote is ready! 📄</p>
                        <p className="text-xs text-neutral-500 text-right mt-1">14:32 ✓✓</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-neutral-800">R45,000 for the complete project</p>
                        <p className="text-xs text-neutral-500 text-right mt-1">14:32 ✓✓</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-neutral-800">Perfect! Let's proceed 👍</p>
                        <p className="text-xs text-neutral-500 text-right mt-1">14:33</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#dcf8c6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-neutral-800">Great! Payment link sent 💳</p>
                        <p className="text-xs text-neutral-500 text-right mt-1">14:33 ✓✓</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stat badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2 shadow-soft-lg">
                  <div className="text-emerald-600 font-bold text-lg">98%</div>
                  <div className="text-neutral-500 text-xs">Open Rate</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-soft-lg">
                  <div className="text-emerald-600 font-bold text-lg">3x</div>
                  <div className="text-neutral-500 text-xs">Faster Approvals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why WhatsApp Section */}
      <section className="section-sm bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="badge mb-4">The Problem</span>
            <h2 className="text-neutral-900 mb-4">Email is Broken</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              People receive 100+ emails daily and feel overwhelmed. They put off "catching up" indefinitely. 
              WhatsApp is different – it's immediate and manageable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email */}
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-500 text-xl">📧</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">Traditional Email</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '15-25% open rates',
                  'Buried in overflowing inboxes',
                  '"I\'ll catch up later" (never happens)',
                  'Quotes sit unopened for days',
                  'Missed appointment reminders',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-neutral-600">
                    <span className="text-red-400 mr-2">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">WhatsApp with ReachMax</h3>
              </div>
              <ul className="space-y-3">
                {[
                  '98% open rates guaranteed',
                  'Read within minutes',
                  'Immediate customer responses',
                  'Quotes approved 3x faster',
                  '70% reduction in no-shows',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">Platform Features</span>
            <h2 className="text-neutral-900 mb-4">Powerful WhatsApp Automation</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Everything you need to transform your business communication, 
              whether you DIY or let us handle it for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-hover">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-sm bg-emerald-50">
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mb-4">
              Use Cases
            </span>
            <h2 className="text-neutral-900 mb-4">Built for Real Business Needs</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              See how businesses are transforming their operations with WhatsApp automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-soft-lg transition-shadow">
                <div className="text-3xl mb-3">{useCase.emoji}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">Service Options</span>
            <h2 className="text-neutral-900 mb-4">Choose Your Path</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Whether you want full control or prefer us to handle everything, ReachMax has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* DIY */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-neutral-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                DIY Platform Access
              </h3>
              <p className="text-neutral-600 text-sm mb-6">
                Take control with our intuitive platform. Perfect for tech-savvy teams.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Step-by-step setup wizard',
                  'Video tutorials & guides',
                  '24/7 platform access',
                  'Email & chat support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Done For You */}
            <div className="bg-emerald-600 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Done-For-You Service
              </h3>
              <p className="text-emerald-100 text-sm mb-6">
                We handle everything from A to Z. Perfect for busy businesses.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Complete setup & configuration',
                  'Campaign management',
                  'Dedicated account manager',
                  'Performance optimization',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="w-5 h-5 text-emerald-300 mr-2 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm bg-gradient-to-br from-emerald-950 via-emerald-900 to-neutral-950">
        <div className="container-md text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">Ready to Get Started?</span>
          </div>
          
          <h2 className="text-white mb-4">Transform Your Business Communication</h2>
          <p className="text-emerald-100/80 mb-8 max-w-xl mx-auto">
            Join 500+ businesses already using WhatsApp automation. 
            Book a free 15-minute demo – no obligations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.reachmax.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-400 transition-colors duration-200"
            >
              Visit ReachMax
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-emerald-500/50 text-white hover:bg-emerald-500/20 hover:border-emerald-400"
            >
              Book a Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-emerald-300/70 text-sm">
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-emerald-400" />
              15-minute consultation
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-emerald-400" />
              No obligations
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-emerald-400" />
              Honest recommendations
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReachMaxPage;

