import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const packages = [
  {
    name: "Starter",
    price: "R4,999",
    description: "Perfect for small businesses just starting their digital journey",
    features: [
      "Responsive Website Design",
      "Basic SEO Setup",
      "Social Media Setup",
      "WhatsApp Business Integration",
      "Monthly Performance Report"
    ]
  },
  {
    name: "Growth",
    price: "R9,999",
    description: "Ideal for businesses ready to accelerate their online growth",
    features: [
      "Everything in Starter",
      "Google Ads Management",
      "Social Media Management",
      "Content Creation",
      "AI Chatbot Integration",
      "Bi-weekly Strategy Calls"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Comprehensive solution for established businesses",
    features: [
      "Everything in Growth",
      "Advanced AI Automation",
      "Custom Integration Development",
      "Dedicated Account Manager",
      "Priority Support",
      "Weekly Strategy Sessions"
    ]
  }
];

const LeadGenSection = () => {

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Get your free digital marketing audit and discover untapped growth opportunities for your business.
            </p>

            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-base sm:text-lg"
            >
              Get Your Free Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">
              Our Packages
            </h3>
            <div className="space-y-6">
              {packages.map((pkg, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">{pkg.name}</h4>
                      <p className="text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-indigo-600">{pkg.price}</div>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green- 500 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#audit"
                    className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-700"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenSection;