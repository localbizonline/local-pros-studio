import React from 'react';
import { ArrowRight, Check, Zap, Shield, Settings, Globe2 } from 'lucide-react';
import GradientButton from './GradientButton';

const features = [
  { icon: Shield, text: "Free Domain & SSL Security" },
  { icon: Zap, text: "Mobile Responsive Design" },
  { icon: Settings, text: "Regular Updates & Backups" },
  { icon: Globe2, text: "Professional Hosting" }
];

const packages = [
  {
    name: "Pro Website",
    price: "R4,900",
    subtitle: "Once-Off",
    monthlyFee: "R290/month",
    description: "Perfect for local service businesses with 1-4 core services needing a professional website quickly using proven templates that convert.",
    timeline: "2 days development time",
    features: [
      "New website from proven template",
      "WhatsApp integration",
      "Professional content writing",
      "Stock photos and image selection",
      "R290/month hosting and management"
    ]
  },
  {
    name: "Advanced Pro",
    price: "R8,900",
    subtitle: "Once-Off",
    monthlyFee: "R320/month",
    description: "Ideal for growing businesses with 5-8 services OR who need more customisation and marketing features to stand out from competitors.",
    timeline: "2-4 days development time",
    features: [
      "Semi-custom design from premium templates",
      "WhatsApp integration",
      "Professional content writing",
      "Stock photos and custom image editing",
      "R320/month hosting and management",
      "Blog/news section",
      "Basic SEO optimisation",
      "Basic analytics dashboard"
    ],
    recommended: true
  },
  {
    name: "Premium Custom",
    price: "From R19,500",
    subtitle: "Once-Off",
    monthlyFee: "R290/month",
    description: "Ideal for established businesses with multiple service lines or unique requirements who need a fully customised web presence with self-management capabilities.",
    timeline: "5+ days development time",
    features: [
      "Full custom design and features",
      "WhatsApp integration",
      "Professional content writing",
      "Custom photos and images",
      "R290/month hosting and management",
      "Admin dashboard for self-updates",
      "Advanced customization options",
      "Advanced SEO setup",
      "Premium analytics and reporting"
    ]
  }
];

const AlternativeWebDesignPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 mix-blend-multiply" />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto pb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get a New Website for Your Business
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              At Netly, we help local service businesses like yours get more leads, grow their brand, and automate operations with professional websites that convert visitors into customers.
            </p>
            <GradientButton href="#packages" className="mx-auto">
              View Our Packages
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center justify-center text-center p-4">
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 text-primary-600 rounded-xl mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Our Website Design Packages
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Choose the perfect package for your business needs. All packages include professional design, development, and ongoing support.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border ${
                  pkg.recommended ? 'border-primary-500 scale-105' : 'border-gray-100'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-5 inset-x-0 flex justify-center">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-primary-600">{pkg.price}</span>
                    <span className="ml-2 text-gray-500">{pkg.subtitle}</span>
                  </div>
                  <p className="text-sm text-primary-600 font-medium mb-4">{pkg.monthlyFee}</p>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <p className="text-sm text-gray-500 mb-6">{pkg.timeline}</p>

                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`block text-center px-6 py-3 rounded-xl transition-colors ${
                      pkg.recommended
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              <span className="font-medium">Note:</span> All packages include Free Domain, SSL security and mobile responsiveness.
              Monthly fees include regular updates, security, and backup management.
              Annual domain renewal fees apply. Regular hosting fees apply after initial 3 months.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get started today with a free consultation and website audit.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Book Your Free Consultation
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AlternativeWebDesignPage;