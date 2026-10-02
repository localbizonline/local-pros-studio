import React, { useEffect } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  PenTool,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';

import winelandsMockup from '../assets/images/Compressed/MacBook iPhone 8 Mockup (1).png';
import marambaMockup from '../assets/images/Compressed/MacBook iPhone 8 Mockup (2).png';
import petportMockup from '../assets/images/Compressed/MacBook iPhone 8 mockup (5).png';
import logo from '../assets/images/Compressed/Local Pros Studio logo transparent.png';

const WHATSAPP_URL =
  'https://wa.me/27832336716?text=Hi%2C%20I%27m%20interested%20in%20the%20R9%2C900%20website%20package%20for%20my%20business';
const PHONE_URL = 'tel:+27832336716';

const trackCTA = (label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: label,
      value: 1,
    });
  }
};

const trustItems = [
  { icon: MapPin, label: 'Built for South African businesses' },
  { icon: CalendarDays, label: 'Live in 5–7 business days' },
  { icon: PenTool, label: 'Writing and images handled for you' },
  { icon: BadgeCheck, label: 'One price. No surprises.' },
];

const portfolioItems = [
  {
    name: 'Winelands Gas',
    title: 'One-stop-shop for all your gas needs.',
    summary: 'Clear services, instant trust, and a simple route to a quote.',
    image: winelandsMockup,
    href: 'https://www.winelandsgas.co.za/',
  },
  {
    name: 'Maramba Fence & Gates',
    title: 'Fencing and gate experts in Cape Town.',
    summary: 'Strong visuals, a local offer, and obvious call and WhatsApp actions.',
    image: marambaMockup,
    href: 'https://www.maramba.co.za/',
  },
  {
    name: 'PETport',
    title: 'Pet transport that cares as much as you do.',
    summary: 'An emotional promise backed by a clear online quote path.',
    image: petportMockup,
    href: 'https://www.petport.co.za/',
  },
];

const packageItems = [
  'Up to 10 pages depending on your services',
  'Professional copywriting and image selection',
  'Responsive desktop, tablet, and mobile design',
  'Click-to-call and WhatsApp enquiry actions',
  'Reviews and social integration where access allows',
  'Basic on-page SEO for your brand, main service, and area',
  'Domain, SSL, hosting, backups, and security upkeep',
  '1 hour of small changes each month',
  '2-day revision period after delivery',
  'Real support after launch — you WhatsApp us, we fix it',
];

const otherOptions = [
  {
    title: 'Do it yourself',
    cost: 'Your evenings and weekends',
    points: [
      'You fight a website builder after hours',
      'You write every page yourself',
      'It usually looks like you built it yourself',
    ],
  },
  {
    title: 'Employ someone',
    cost: 'R3,000 – R11,000 every month',
    points: [
      'Part-time to full-time salary, every month',
      'You still manage the work',
      'One person, one skill set',
    ],
  },
  {
    title: 'Hire an agency',
    cost: 'R5,000 – R15,000 every month',
    points: [
      'Retainers and hourly billing',
      'A six-month "creative process"',
      'Built for corporates, priced like it',
    ],
  },
];

const processSteps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Tell us about your business',
    text: 'A quick 15-minute WhatsApp or call gives us what we need to start.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'We build the first version',
    text: 'We handle the layout, copy, images, service pages, and mobile actions.',
  },
  {
    icon: Search,
    step: '03',
    title: 'You review it',
    text: 'You get a focused 2-day revision window for corrections and minor changes.',
  },
  {
    icon: ShieldCheck,
    step: '04',
    title: 'We launch and look after it',
    text: 'We take care of hosting, SSL, backups, and ongoing small updates.',
  },
];

const faqs = [
  {
    question: 'Is R9,900 really the full price?',
    answer:
      'Yes. R9,900 once-off for the build, and R290 per month for domain, hosting, SSL, backups, security, and 1 hour of small changes. There are no surprise invoices.',
  },
  {
    question: 'How quickly can it go live?',
    answer:
      'Most websites are completed within 5–7 business days once we have the information and access we need. Delays in feedback or missing information can move that date.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'Your correct business details, services, service areas, logo if you have one, and any real project photos you want us to use. We handle the structure, writing, and image selection.',
  },
  {
    question: 'Is this a fully custom website?',
    answer:
      'This package uses proven layouts built for local businesses, then customises the branding, wording, images, pages, and calls to action for your business. It is not a fully custom-coded platform — and at this price, that is the point.',
  },
  {
    question: 'Will it rank first on Google?',
    answer:
      'No honest provider can guarantee first place. We include basic on-page SEO for your brand, main service, and area. New domains can take 2–3 months to be indexed.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'We continue to manage hosting, SSL, backups, security, and your included monthly small changes. Additional work beyond the allowance is quoted at the current hourly rate.',
  },
];

const CTAButton = ({ label, className = '', children = 'Get My Website Started' }: {
  label: string;
  className?: string;
  children?: React.ReactNode;
}) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackCTA(label)}
    className={`inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-5 text-base font-black uppercase tracking-tight text-black shadow-[0_16px_45px_rgba(250,204,21,0.18)] transition-transform duration-200 hover:scale-[1.02] hover:bg-yellow-300 focus-visible:ring-yellow-300 md:text-lg ${className}`}
  >
    {children}
    <ArrowRight className="h-5 w-5" aria-hidden="true" />
  </a>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-400 md:text-sm">
    {children}
  </p>
);

const WebDesignLeadsPage = () => {
  useEffect(() => {
    document.title = 'Website Design R9,900 Once-Off | Local Pros Studio';
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-yellow-400/30">
      {/* Minimal header: logo + contact only, no site navigation */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <img src={logo} alt="Local Pros Studio" className="h-8 w-auto" width="120" height="32" />
          <div className="flex items-center gap-3">
            <a
              href={PHONE_URL}
              onClick={() => trackCTA('lp_header_call')}
              className="hidden items-center gap-2 text-sm font-bold text-neutral-300 hover:text-white sm:inline-flex"
            >
              <Phone className="h-4 w-4 text-yellow-400" aria-hidden="true" />
              083 233 6716
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTA('lp_header_whatsapp')}
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-black uppercase tracking-tight text-black hover:bg-yellow-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>

      {/* Hero: message-matched to the ad — offer, price, and delivery in the headline */}
      <section className="relative overflow-hidden border-b border-neutral-800 px-6 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="pointer-events-none absolute right-[10%] top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="relative z-10">
            <SectionLabel>Website design for South African businesses</SectionLabel>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              A professional website for your business. <span className="text-yellow-400">R9,900 once-off.</span> Live in 7 days.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">
              We build it, write it, host it, and look after it. You carry on running your business.
            </p>
            <div className="mt-8">
              <CTAButton label="lp_hero_whatsapp" />
              <p className="mt-4 text-sm text-neutral-500">
                Starts with a WhatsApp chat. We will tell you plainly whether this package fits your business.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-3xl lg:-mr-8">
            <img
              src={winelandsMockup}
              alt="Winelands Gas website shown on desktop and mobile"
              className="relative z-10 h-auto w-full drop-shadow-[0_30px_45px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 md:grid-cols-4">
          {trustItems.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              className={`flex min-h-28 items-center gap-3 px-4 py-5 md:px-6 ${index % 2 === 0 ? 'border-r border-neutral-800' : ''} ${index < 2 ? 'border-b border-neutral-800 md:border-b-0' : ''} ${index === 1 || index === 2 ? 'md:border-r md:border-neutral-800' : ''}`}
            >
              <Icon className="h-7 w-7 flex-none text-yellow-400" strokeWidth={1.8} aria-hidden="true" />
              <p className="text-sm font-bold leading-snug text-white md:text-base">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The problem, stated directly */}
      <section className="bg-neutral-900 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>The real problem</SectionLabel>
          <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
            Your website is either winning you work or costing you work<span className="text-yellow-400">.</span>
          </h2>
          <div className="mt-7 space-y-4 text-lg leading-relaxed text-neutral-300">
            <p>
              A customer gets your name. They Google you. They open your website on their phone. Before you ever
              speak to them, they have decided whether you look like the safer choice.
            </p>
            <p>
              Most business owners I speak to know their website is not doing this job. It was built years ago,
              it looks wrong on a phone, and there is no obvious way to call or WhatsApp. The customer moves on to
              the next name on the list.
            </p>
            <p className="font-black text-white">What is the cost of doing nothing?</p>
          </div>
        </div>
      </section>

      {/* Proof: real client websites with live links */}
      <section className="bg-neutral-950 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Real websites. Real businesses.</SectionLabel>
            <h2 className="text-3xl font-black text-white md:text-5xl">This is what your customers should be finding.</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <article key={item.name} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                <img src={item.image} alt={`${item.name} desktop and mobile website`} className="h-auto w-full" loading="lazy" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-yellow-400">{item.name}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">{item.summary}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300"
                >
                  View live website <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-6 text-center text-lg leading-relaxed text-neutral-300">
            One of our Cape Town clients, a gas installation company, landed a{' '}
            <span className="font-black text-white">R2 million installation job</span> through the online presence
            we built and manage for them. That one job paid for everything many times over.
          </p>
        </div>
      </section>

      {/* Pricing: transparent, anchored against the real alternatives */}
      <section id="pricing" className="scroll-mt-24 bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>The honest numbers</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              As a business owner, you have three options. We built a fourth<span className="text-yellow-400">.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {otherOptions.map((option) => (
              <div key={option.title} className="rounded-2xl border border-neutral-700 bg-neutral-950 p-6">
                <h3 className="text-lg font-black uppercase tracking-wide text-neutral-300">{option.title}</h3>
                <p className="mt-2 text-xl font-black text-white">{option.cost}</p>
                <ul className="mt-5 space-y-3">
                  {option.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-neutral-400">
                      <X className="mt-0.5 h-4 w-4 flex-none text-red-500" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-yellow-400 bg-neutral-950">
            <div className="grid gap-10 p-7 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <SectionLabel>The Local Pros package</SectionLabel>
                <h3 className="text-2xl font-black leading-tight text-white md:text-4xl">
                  Everything handled. One clear price.
                </h3>
                <div className="mt-7 border-y border-neutral-800 py-6">
                  <p className="text-4xl font-black tracking-tight text-white md:text-5xl">
                    R9,900 <span className="text-xl text-neutral-400">once-off</span>
                  </p>
                  <p className="mt-3 text-3xl font-black text-yellow-400">
                    + R290<span className="text-base text-neutral-400">/month</span>
                  </p>
                  <p className="mt-2 text-sm text-neutral-500">Domain, hosting, security, and ongoing care</p>
                </div>
                <div className="mt-7">
                  <CTAButton label="lp_pricing_whatsapp" />
                </div>
              </div>
              <div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {packageItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl bg-neutral-900 px-4 py-4 text-sm leading-relaxed text-neutral-200">
                      <Check className="mt-0.5 h-5 w-5 flex-none text-yellow-400" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-neutral-800 bg-neutral-900 px-6 py-5 text-sm font-bold text-neutral-300">
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-yellow-400" /> 5–7 business-day target</span>
              <span className="inline-flex items-center gap-2"><Smartphone className="h-4 w-4 text-yellow-400" /> Responsive on every screen</span>
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-yellow-400" /> Call and WhatsApp ready</span>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-neutral-400">
            You will also see websites advertised for R199 a month. If price is the only thing that matters to you,
            we are not the right fit. <span className="font-black text-neutral-200">Cheap people buy on price twice</span> —
            most of those sites end up being rebuilt properly within a year.
          </p>
        </div>
      </section>

      {/* Process: your part is simple */}
      <section className="bg-neutral-950 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Your part takes 15 minutes. We do the heavy lifting.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {processSteps.map(({ icon: Icon, step, title, text }) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-neutral-700 bg-neutral-900 p-5 md:p-6">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400">Step {step}</p>
                  <h3 className="mt-1 text-xl font-black text-white">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-neutral-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-900 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionLabel>Straight answers</SectionLabel>
            <h2 className="text-3xl font-black text-white md:text-5xl">The questions everyone asks.</h2>
          </div>
          <div className="mt-10 divide-y divide-neutral-800 border-y border-neutral-800">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-left text-lg font-black text-white marker:content-none md:text-xl">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 flex-none text-yellow-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-6 text-base leading-relaxed text-neutral-400 md:text-lg">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA with honest scarcity */}
      <section className="border-t border-neutral-800 bg-neutral-950 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
            Your next customer is going to check your website. <span className="text-yellow-400">Give them a reason to choose you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
            We take on a limited number of builds each month so every website gets proper attention. Start with a
            WhatsApp — we will tell you plainly whether this package fits your business.
          </p>
          <div className="mx-auto mt-9 max-w-md">
            <CTAButton label="lp_final_whatsapp" />
          </div>
          <a
            href={PHONE_URL}
            onClick={() => trackCTA('lp_final_call')}
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white"
          >
            <Phone className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            Prefer to talk? Call 083 233 6716
          </a>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 px-6 py-8 pb-28 md:pb-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
          <p>Local Pros Studio · Cape Town, South Africa</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-neutral-300">Privacy</a>
            <a href="/terms" className="hover:text-neutral-300">Terms</a>
            <a href="/refunds-cancellations" className="hover:text-neutral-300">Refunds</a>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-neutral-950/95 px-4 py-3 backdrop-blur-lg md:hidden">
        <div className="flex gap-3">
          <a
            href={PHONE_URL}
            onClick={() => trackCTA('lp_sticky_call')}
            className="flex flex-none items-center justify-center rounded-full border border-neutral-700 px-5 py-3.5 text-sm font-black text-white"
            aria-label="Call Local Pros Studio"
          >
            <Phone className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTA('lp_sticky_whatsapp')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3.5 text-sm font-black uppercase tracking-tight text-black"
          >
            Get My Website Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WebDesignLeadsPage;
