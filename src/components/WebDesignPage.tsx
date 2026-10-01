import React from 'react';
import { ArrowRight, Check, Clock, Zap, Shield, HeartHandshake, ChevronDown } from 'lucide-react';
import SocialProofSection from './SocialProofSection';
import PortfolioGallery from './PortfolioGallery';

const benefits = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Your website live in 5-7 days, not months."
  },
  {
    icon: Shield,
    title: "Proven Templates",
    description: "Pre-built, high-converting templates customised to your brand."
  },
  {
    icon: HeartHandshake,
    title: "We Handle Everything",
    description: "Content, images, and setup all included."
  },
  {
    icon: Clock,
    title: "Ongoing Support",
    description: "1 hour of free changes every month with your hosting plan."
  }
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "Quick 15-minute chat to understand your business and goals."
  },
  {
    step: "02",
    title: "Content & Design",
    description: "We select the best template for your trade and customise it with your branding, content, and images."
  },
  {
    step: "03",
    title: "Review & Refine",
    description: "You get a 2-day revision period to request minor changes or corrections."
  },
  {
    step: "04",
    title: "Launch",
    description: "Your website goes live and starts working for your business."
  }
];

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Most websites are completed within 5-7 business days. We use pre-built, proven templates customised to your brand, which means faster delivery without compromising on quality."
  },
  {
    question: "Is this a custom-designed website?",
    answer: "We use pre-designed templates tailored to meet the common needs of most businesses. It's not a fully custom-designed solution -- it's a proven, high-converting layout customised with your branding, content, and images."
  },
  {
    question: "Can I edit my website myself?",
    answer: "You won't have direct access to edit your website. All changes are handled by us to ensure quality and consistency. Your monthly plan includes 1 hour of free changes per month."
  },
  {
    question: "What if I need changes after launch?",
    answer: "You get a 2-day revision period after delivery for minor changes. After that, your monthly hosting includes 1 hour of free changes per month. Additional changes are billed at R890 per hour."
  },
  {
    question: "What about email and contact forms?",
    answer: "Email hosting is not included but we can point you to a provider. We use WhatsApp click-to-chat instead of contact forms -- it's far more effective for conversions in South Africa."
  },
  {
    question: "Will my website rank on Google?",
    answer: "We include basic on-page SEO tuned for your brand name, primary keyword, and location. However, search rankings are not guaranteed. For new domains, allow 2-3 months for indexing. We'll provide a directory list to help."
  },
  {
    question: "How do I cancel?",
    answer: "60 days' written notice is required for all cancellations. Early termination of the 12-month commitment will result in a settlement fee equal to the remaining months on your contract."
  }
];

const WebDesignPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="container-md relative">
          <div className="text-center">
            <span className="badge-dark mb-6">Website Design</span>
            
            <h1 className="text-white mb-6 text-balance">
              Professional Websites<br className="hidden sm:block" /> That Get Results
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Get a modern, mobile-friendly website that turns visitors into customers.
              Delivered in 7 days, from R9,900.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="https://wa.me/27832336716?text=Hi%2C%20I'm%20interested%20in%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="#portfolio" className="btn-secondary border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600">
                See Our Work
              </a>
            </div>

            {/* Quick stats */}
            <div className="flex items-center justify-center gap-8 text-neutral-400 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                5-7 day delivery
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                Mobile responsive
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2 text-green-500" />
                SEO optimized
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

      {/* Portfolio Section */}
      <section id="portfolio" className="section bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">Our Work</span>
            <h2 className="text-neutral-900 mb-4">Recent Projects</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Browse some of our latest website designs for South African businesses.
            </p>
          </div>
          <PortfolioGallery />
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-white">
        <div className="container-md">
          <div className="text-center mb-16">
            <span className="badge mb-4">Our Process</span>
            <h2 className="text-neutral-900 mb-4">How It Works</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              A simple, straightforward process to get your website live quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-neutral-100 mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">Pricing</span>
            <h2 className="text-neutral-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              No hidden fees. Choose the option that works best for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* One-time Package */}
            <div className="bg-white rounded-2xl p-8 shadow-soft relative">
              <div className="absolute -top-3 left-6">
                <span className="bg-neutral-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>

              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Pro Website Package
              </h3>
              <p className="text-neutral-600 text-sm mb-6">
                Everything you need to get online professionally.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-neutral-900">R9,900</span>
                <span className="text-neutral-500 ml-2">once-off</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Pre-built template customised to your brand",
                  "Up to 10 pages depending on your services",
                  "Mobile responsive design",
                  "Professional copywriting & image selection",
                  "WhatsApp click-to-chat & click-to-call",
                  "Social media & reviews integration",
                  "Basic on-page SEO setup",
                  "2-day revision period after delivery"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/27832336716?text=Hi%2C%20I'm%20interested%20in%20the%20Pro%20Website%20Package"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Monthly Retainer */}
            <div className="bg-neutral-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-2">
                Growth Retainer
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                Ongoing support and updates for your website.
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold">R290</span>
                <span className="text-neutral-400 ml-2">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Domain registration & hosting",
                  "1 hour free changes per month",
                  "Security & performance updates",
                  "Monthly backups",
                  "Priority support",
                  "Additional changes at R890/hour"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/27832336716?text=Hi%2C%20I'm%20interested%20in%20the%20Growth%20Retainer"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 w-full justify-center"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
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

      {/* Terms & Conditions */}
      <section id="terms" className="section bg-neutral-50">
        <div className="container-md">
          <div className="text-center mb-12">
            <span className="badge mb-4">Terms & Conditions</span>
            <h2 className="text-neutral-900 mb-4">Website Service Terms</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Please review our terms below. By using our services, you agree to these conditions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Service Overview */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Service Overview
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>This service utilises pre-designed templates tailored to meet the common needs of most businesses effectively and efficiently. It is not a fully custom-designed solution.</p>
                <p>You will not have direct access to edit your website. All changes are handled by us.</p>
              </div>
            </details>

            {/* What's Included */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                What's Included
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-4">
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Website</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Professional website design and development with up to 10 pages depending on the number of services you offer</li>
                    <li>Domain registration and website hosting for the duration of your contract</li>
                    <li>Responsive design ensuring your website looks great on all devices (desktop, tablet, and mobile)</li>
                    <li>Professional branding incorporating your logo, colour scheme, and branding elements</li>
                    <li>Quality content writing and assistance with image selection</li>
                    <li>Social media and reviews integration (dependant on your Google Business Profile access) and sharing buttons</li>
                    <li>Mobile click-to-call button for instant phone contact</li>
                    <li>WhatsApp click-to-chat for quick enquiries and bookings</li>
                    <li>Basic on-page SEO tuned for your brand name, primary keyword, and location</li>
                  </ul>
                </div>
              </div>
            </details>

            {/* Monthly Maintenance and Changes */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Monthly Maintenance & Changes
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>Your monthly fee includes up to 1 hour of website changes per month (content updates, minor layout modifications, and bug fixes).</p>
                <p>Additional changes beyond this allowance will be billed at <strong className="text-neutral-800">R890 per hour</strong>.</p>
              </div>
            </details>

            {/* Revision Period */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Revision Period
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>A <strong className="text-neutral-800">2-day revision period</strong> is provided after delivery of your website for minor changes or corrections.</p>
                <p>Revisions requested after this period are subject to the additional hourly rate above.</p>
              </div>
            </details>

            {/* Content and Images */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Content & Images
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>We provide complimentary content writing and image selection to enhance your website.</p>
                <p>If the provided content or images do not meet your requirements, you are responsible for sourcing and providing alternatives.</p>
              </div>
            </details>

            {/* What's Not Included */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                What's Not Included
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong className="text-neutral-800">Email hosting</strong> -- not included in this package. We can assist with directions and put you in touch with external email providers.</li>
                  <li><strong className="text-neutral-800">Contact forms</strong> -- we use WhatsApp click-to-chat instead, which is more effective for conversions.</li>
                  <li><strong className="text-neutral-800">Link building or ongoing SEO</strong> -- we optimise on-page SEO for your brand and primary keyword, but do not perform ongoing SEO adjustments.</li>
                  <li><strong className="text-neutral-800">Search rankings are not guaranteed</strong> -- if your domain has had a website recently, you should expect to rank for your brand name. For new domains, allow 2-3 months for indexing. We'll provide a directory list to assist.</li>
                  <li><strong className="text-neutral-800">Third-party integrations</strong> -- booking systems, payment gateways, or custom functionality beyond standard features.</li>
                  <li><strong className="text-neutral-800">E-commerce functionality</strong> -- online shops or product catalogues with checkout.</li>
                </ul>
              </div>
            </details>

            {/* Payment Terms */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Payment Terms
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>Payment is collected monthly via card subscription.</p>
                <p>A <strong className="text-neutral-800">7-day grace period</strong> applies for failed payments, after which your service will be suspended until payment is received.</p>
              </div>
            </details>

            {/* Website Ownership */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Website Ownership
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>The website remains the property of Local Pros for the duration of your contract.</p>
                <p>You own all written content created for your website.</p>
                <p>If you cancel, you have two options to keep your website:</p>
                <ul className="space-y-1.5 list-disc list-inside ml-2">
                  <li><strong className="text-neutral-800">Purchase:</strong> Pay a once-off fee of R9,900 (as at January 2026 -- see our website for the current rate) to take full ownership.</li>
                  <li><strong className="text-neutral-800">Rent:</strong> Pay R490 per month, which includes hosting and ongoing management.</li>
                </ul>
                <p>These fees are payable in addition to any early termination or notice period fees.</p>
              </div>
            </details>

            {/* Content Creation */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Content Creation
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>Social media posts and website content are created using our team and AI tools.</p>
                <p>While we strive for accuracy and quality, we cannot be held liable for any inaccuracies in content.</p>
              </div>
            </details>

            {/* Cancellation */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                Cancellation
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-3">
                <p><strong className="text-neutral-800">60 days' written notice</strong> is required for all cancellations.</p>
                <p>Early termination of the 12-month commitment will result in a settlement fee equal to the remaining months on your contract.</p>
              </div>
            </details>

            {/* General Terms */}
            <details className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-semibold text-neutral-900 hover:bg-neutral-50 transition-colors">
                General Terms
                <ChevronDown className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed space-y-4">
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Your Responsibilities</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Provide accurate business information and access to relevant platforms.</li>
                    <li>Respond to any queries within a reasonable timeframe.</li>
                    <li>Notify us of any changes to your business details.</li>
                    <li>Ensure all information you provide for your website, social media, or marketing materials is accurate, truthful, and does not contain false claims (e.g., qualifications, certifications, or credentials you do not hold). We are not responsible for verifying the accuracy of information you supply.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Our Responsibilities</h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Deliver services as described in your selected package.</li>
                    <li>Maintain reasonable quality standards.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Changes to Services</h4>
                  <p>We reserve the right to update these terms with 30 days' written notice. Continued use of our services after such notice constitutes acceptance of the updated terms.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 mb-2">Governing Law</h4>
                  <p>These terms are governed by the laws of the Republic of South Africa. Any disputes will be subject to the jurisdiction of the South African courts.</p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-sm bg-neutral-950">
        <div className="container-md text-center">
          <h2 className="text-white mb-4">Ready for Your New Website?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Let's chat about your project. No pressure, just a friendly conversation 
            about how we can help.
          </p>
          <a
            href="https://wa.me/27832336716?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20website%20project"
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

export default WebDesignPage;
