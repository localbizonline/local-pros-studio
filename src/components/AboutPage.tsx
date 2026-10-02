import React from 'react';
import { ArrowRight, Check, Users, Target, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamImage from '../assets/images/Compressed/TinyPNG Feb 10 174841.jpg';
import localProsImage from '../assets/images/mockups/localprospeople.jpg';
import { SITE_WHATSAPP_URL } from '../whatsapp';

const values = [
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by the leads and customers we generate for your business, not vanity metrics."
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "We respect your time. Websites in 5-7 days, quick responses, and no unnecessary delays."
  },
  {
    icon: Heart,
    title: "Genuinely Care",
    description: "Your success is our success. We build long-term partnerships, not one-time transactions."
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "We understand the South African market and build solutions that work for local businesses."
  }
];

const milestones = [
  { number: "500+", label: "Websites Built" },
  { number: "10+", label: "Years Experience" },
  { number: "100K+", label: "Leads Generated" },
  { number: "4.9★", label: "HelloPeter Rating" }
];

const services = [
  { name: "Website Design", href: "/web-design", description: "Modern, mobile-friendly websites delivered in 5-7 days" },
  { name: "Google Ads", href: "/", description: "Targeted advertising that puts you in front of ready buyers" },
  { name: "Social Media", href: "/social-media-posting-service", description: "Stay visible with consistent, professional posting" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        
        <div className="container-md relative">
          <div className="text-center">
            <span className="badge-dark mb-6">About Us</span>
            
            <h1 className="text-white mb-6 text-balance">
              Helping Local Businesses<br className="hidden sm:block" /> Succeed Online
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              For over a decade, we've been the digital partner for South African 
              home service businesses—from plumbers to electricians, contractors to cleaners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <Link to="/web-design" className="btn-secondary border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="badge mb-4">Our Story</span>
              <h2 className="text-neutral-900 mb-6">
                Built for Businesses Like Yours
              </h2>
              <div className="space-y-4 text-neutral-600">
                <p>
                  Local Pros Studio started with a simple observation: too many talented 
                  tradespeople and service providers were losing business because they 
                  didn't have a professional online presence.
                </p>
                <p>
                  We've spent over 10 years perfecting our approach—creating proven 
                  website templates that have generated more than 100,000 leads for 
                  businesses across South Africa. We know what works because we've 
                  tested it thousands of times.
                </p>
                <p>
                  Today, we offer a complete suite of digital marketing services: 
                  websites, Google Ads, social media management, and reputation tools. 
                  Everything a local business needs to compete and win online.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Specialists in home service businesses",
                  "Proven templates that convert visitors to leads",
                  "Ongoing support, not just a one-time service",
                  "Fair pricing designed for small businesses"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative">
              <img
                src={teamImage}
                alt="Local Pros Studio team"
                className="rounded-2xl shadow-soft-xl w-full"
                width={600}
                height={400}
              />
              <div className="absolute -bottom-6 -left-6 bg-neutral-900 text-white px-6 py-4 rounded-xl shadow-lg hidden md:block">
                <div className="text-2xl font-bold">10+</div>
                <div className="text-sm text-neutral-400">Years in Business</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-neutral-50">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">Our Values</span>
            <h2 className="text-neutral-900 mb-4">What We Stand For</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We're not just another agency. We're partners invested in your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-soft">
                  <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section bg-white">
        <div className="container-lg">
          <div className="text-center mb-16">
            <span className="badge mb-4">What We Do</span>
            <h2 className="text-neutral-900 mb-4">Our Services</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Everything you need to grow your business online, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group flex items-start p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-neutral-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {service.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/#services" className="btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm bg-neutral-950">
        <div className="container-md text-center">
          <h2 className="text-white mb-4">Ready to Work Together?</h2>
          <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
            Let's chat about your business goals. No pressure, just a friendly 
            conversation about how we can help you grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
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
              href="mailto:hello@localpros.co.za"
              className="btn-secondary border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600"
            >
              Email Us
            </a>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <img
              src={localProsImage}
              alt="Local Pros Studio team working together"
              className="rounded-2xl shadow-soft-xl w-full"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
