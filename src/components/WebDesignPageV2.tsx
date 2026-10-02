import React from 'react';
import {
  ArrowRight,
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
import contractorHandshake from '../assets/images/Reviews/hero-contractor-handshake.jpg';
import { WHATSAPP_MESSAGES, whatsAppLink } from '../whatsapp';

const WHATSAPP_URL = whatsAppLink(WHATSAPP_MESSAGES.webDesign);

const trustItems = [
  { icon: MapPin, label: 'Built for South African businesses' },
  { icon: MessageCircle, label: 'Mobile & WhatsApp ready' },
  { icon: PenTool, label: 'Copy and images handled' },
  { icon: CalendarDays, label: 'Live in 5–7 business days' },
];

const customerQuestions = [
  'Are you the right business for this job?',
  'Do you work in my area?',
  'Can I see proof of your work?',
  'Do other customers trust you?',
  'How do I call or WhatsApp you now?',
];

const portfolioItems = [
  {
    name: 'Winelands Gas',
    title: 'One-stop-shop for all your gas needs.',
    summary: 'Clear services, instant trust, and a simple route to a quote.',
    outcome: 'CLEAR SERVICES · STRONG TRUST · EASY QUOTE ACTION',
    image: winelandsMockup,
    href: 'https://www.winelandsgas.co.za/',
  },
  {
    name: 'Maramba Fence & Gates',
    title: 'Fencing and gate experts in Cape Town.',
    summary: 'Strong visuals, a local offer, and obvious call and WhatsApp actions.',
    outcome: 'LOCAL POSITIONING · REAL WORK · WHATSAPP FIRST',
    image: marambaMockup,
    href: 'https://www.maramba.co.za/',
  },
  {
    name: 'PETport',
    title: 'Pet transport that cares as much as you do.',
    summary: 'An emotional promise backed by a clear online quote path.',
    outcome: 'EMOTIONAL PROMISE · NATIONAL TRUST · CLEAR ONLINE QUOTE',
    image: petportMockup,
    href: 'https://www.petport.co.za/',
  },
];

const outcomeBands = [
  {
    number: '01',
    title: 'Look credible immediately',
    text: 'A strong headline, modern design, real service imagery, reviews, and trust signals make you feel like the safer choice.',
  },
  {
    number: '02',
    title: 'Make the next step obvious',
    text: 'Click-to-call, WhatsApp, quote prompts, and a mobile-first layout help the customer act while the intent is still fresh.',
  },
  {
    number: '03',
    title: 'Stop carrying the website yourself',
    text: 'We handle the writing, images, hosting, security, backups, and monthly small changes after launch.',
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

const cheapWebsite = [
  'You write every page',
  'Mobile is an afterthought',
  'No clear call or WhatsApp action',
  'Hosting, security and fixes become your problem',
  'It goes live, then gathers dust',
];

const localProsWebsite = [
  'Copy and images handled',
  'Built for local-service buying questions',
  'Mobile, call and WhatsApp ready',
  'Hosting, SSL, backups and small updates managed',
  'Real support after launch',
];

const packageItems = [
  'Proven layout customised to your business',
  'Up to 10 pages depending on your services',
  'Professional copywriting and image selection',
  'Responsive desktop, tablet, and mobile design',
  'Click-to-call and WhatsApp enquiry actions',
  'Reviews and social integration where access allows',
  'Basic on-page SEO for your brand, main service, and area',
  'Domain, SSL, hosting, backups, and security upkeep',
  '1 hour of small changes each month',
  '2-day revision period after delivery',
];

const faqs = [
  {
    question: 'Is this a fully custom website?',
    answer:
      'This package uses proven layouts tailored to the needs of local service businesses, then customises the branding, wording, images, pages, and calls to action for your business. It is not a fully custom-coded platform.',
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
    question: 'Can I edit it myself?',
    answer:
      'You will not have direct editing access under this package. We handle changes so the site stays consistent and working. Your monthly plan includes 1 hour of small changes.',
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

const terms = [
  {
    title: 'Service overview',
    content: (
      <>
        <p>This service uses proven pre-designed layouts tailored to common local-business needs. It is not a fully custom-designed solution.</p>
        <p>You will not have direct editing access. All changes are handled by Local Pros.</p>
      </>
    ),
  },
  {
    title: "What’s included",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Up to 10 pages depending on the number of services you offer.</li>
        <li>Domain registration and hosting for the duration of your contract.</li>
        <li>Responsive design, brand styling, content writing, and image-selection help.</li>
        <li>Click-to-call, WhatsApp, reviews and social integration where access allows.</li>
        <li>Basic on-page SEO for your brand, primary keyword, and location.</li>
      </ul>
    ),
  },
  {
    title: 'Maintenance, changes, and revisions',
    content: (
      <>
        <p>Your monthly fee includes up to 1 hour of small website changes per month.</p>
        <p>Additional work is billed at R890 per hour. A 2-day revision period is provided after delivery for minor corrections.</p>
      </>
    ),
  },
  {
    title: "What’s not included",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Email hosting, e-commerce, payment gateways, booking systems, or custom integrations.</li>
        <li>Ongoing SEO or link building. Search rankings are not guaranteed.</li>
        <li>Contact forms are not included; the standard package uses WhatsApp click-to-chat.</li>
      </ul>
    ),
  },
  {
    title: 'Ownership and cancellation',
    content: (
      <>
        <p>The website remains Local Pros property for the duration of the contract. You own the written content created for the site.</p>
        <p>Cancellation requires 60 days’ written notice. Early termination of the 12-month commitment carries a settlement fee equal to the remaining months.</p>
      </>
    ),
  },
];

const CTAButton = ({ className = '' }: { className?: string }) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-yellow-400 px-7 py-5 text-base font-black uppercase tracking-tight text-black shadow-[0_16px_45px_rgba(250,204,21,0.18)] transition-transform duration-200 hover:scale-[1.02] hover:bg-yellow-300 focus-visible:ring-yellow-300 md:text-lg ${className}`}
  >
    Build My Website
    <ArrowRight className="h-5 w-5" aria-hidden="true" />
  </a>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-yellow-400 md:text-sm">
    {children}
  </p>
);

const WebDesignPageV2 = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-yellow-400/30">
      <section className="relative overflow-hidden border-b border-neutral-800 bg-neutral-950 px-6 pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="pointer-events-none absolute right-[10%] top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-8">
          <div className="relative z-10">
            <SectionLabel>Websites for local service businesses</SectionLabel>
            <h1 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Your Website Should Win the Job Before You Even Answer the Phone<span className="text-yellow-400">.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">
              When a customer finds you, they decide in seconds whether you look trustworthy enough to call. We build the website that makes that decision easy.
            </p>
            <div className="mt-9">
              <CTAButton />
              <a
                href="#real-websites"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300"
              >
                See real client websites <ArrowRight className="h-4 w-4" />
              </a>
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
              className={`flex min-h-28 items-center gap-3 px-4 py-5 md:px-6 ${index % 2 === 0 ? 'border-r border-neutral-800' : ''} ${index < 2 ? 'border-b border-neutral-800 md:border-b-0' : ''} ${index === 1 ? 'md:border-r md:border-neutral-800' : ''} ${index === 2 ? 'md:border-r md:border-neutral-800' : ''}`}
            >
              <Icon className="h-7 w-7 flex-none text-yellow-400" strokeWidth={1.8} aria-hidden="true" />
              <p className="text-sm font-bold leading-snug text-white md:text-base">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.82fr_1.18fr] md:gap-14">
          <div>
            <SectionLabel>The real problem</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Brilliant work can still lose to the business that looks easier to trust<span className="text-yellow-400">.</span>
            </h2>
            <div className="mt-7 space-y-4 text-lg leading-relaxed text-neutral-300">
              <p>A customer gets your name. They Google you. They open your website on their phone.</p>
              <p>Before you ever speak to them, they decide whether you look like the safer choice.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-950">
            <img
              src={contractorHandshake}
              alt="Local contractor greeting a customer at her home"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
        <blockquote className="mx-auto mt-12 max-w-5xl border-l-4 border-yellow-400 bg-neutral-950 px-7 py-7 text-xl font-black leading-snug text-white md:px-10 md:text-3xl">
          The best contractor does not always win. The contractor who looks easiest to trust often wins first.
        </blockquote>
      </section>

      <section className="bg-neutral-950 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <img
              src={marambaMockup}
              alt="Maramba Fence and Gates website shown on desktop and mobile"
              className="h-auto w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionLabel>What your customer needs to see</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              In ten seconds, your website must answer five questions.
            </h2>
            <ol className="mt-8 divide-y divide-neutral-800 border-y border-neutral-800">
              {customerQuestions.map((question, index) => (
                <li key={question} className="flex items-center gap-4 py-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-black">
                    {index + 1}
                  </span>
                  <span className="text-base font-bold text-neutral-100 md:text-lg">{question}</span>
                </li>
              ))}
            </ol>
            <p className="mt-7 text-lg leading-relaxed text-neutral-400">
              If those answers are obvious, the customer moves closer to contacting you. If they have to hunt, they leave.
            </p>
          </div>
        </div>
      </section>

      <section id="real-websites" className="scroll-mt-24 bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Real websites. Real businesses.</SectionLabel>
            <h2 className="text-3xl font-black text-white md:text-5xl">This is what “ready to trust” looks like.</h2>
          </div>

          <div className="mt-14 space-y-5">
            {portfolioItems.map((item, index) => (
              <article
                key={item.name}
                className="grid items-center gap-6 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-6 md:grid-cols-[0.68fr_1.32fr] md:p-8 lg:gap-10"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-400">{item.name}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-neutral-400">{item.summary}</p>
                  <p className="mt-5 text-xs font-bold tracking-wide text-neutral-500">{item.outcome}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-yellow-400 hover:text-yellow-300"
                  >
                    View website <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <img src={item.image} alt={`${item.name} desktop and mobile website`} className="h-auto w-full" loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <SectionLabel>The solution</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              Not a digital brochure. A trust-building sales tool that works all day.
            </h2>
          </div>
          <div className="mt-12 divide-y divide-neutral-800 border-y border-neutral-800">
            {outcomeBands.map((item) => (
              <div key={item.number} className="grid gap-4 py-8 md:grid-cols-[90px_0.8fr_1.2fr] md:items-start md:gap-8 md:py-10">
                <span className="text-4xl font-black text-yellow-400">{item.number}</span>
                <h3 className="text-2xl font-black text-white md:text-3xl">{item.title}</h3>
                <p className="text-lg leading-relaxed text-neutral-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionLabel>Why Local Pros</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              We are not here to drag you through a six-month “creative process.”
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-neutral-300">
              <p>We have built websites for local service businesses for more than a decade.</p>
              <p>Your customer is not visiting for an art exhibition. They want to know what you do, whether they can trust you, and how to contact you.</p>
              <p className="font-black text-white">That is what we build for.</p>
            </div>
          </div>
          <div>
            <SectionLabel>Your part is simple</SectionLabel>
            <div className="space-y-4">
              {processSteps.map(({ icon: Icon, step, title, text }) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-neutral-700 bg-neutral-950 p-5 md:p-6">
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
        </div>
        <div className="mx-auto mt-12 max-w-md">
          <CTAButton />
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl border border-neutral-700 bg-neutral-900 p-6 md:p-10 lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel>The honest comparison</SectionLabel>
            <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">
              A cheap website gives you pages. <span className="text-yellow-400">Local Pros gives your customer reasons to act.</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-700 bg-neutral-950 p-6 md:p-8">
              <h3 className="text-lg font-black uppercase tracking-wide text-neutral-300">Cheap / DIY website</h3>
              <ul className="mt-6 space-y-4">
                {cheapWebsite.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-neutral-300">
                    <X className="mt-0.5 h-5 w-5 flex-none text-red-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-yellow-400 bg-neutral-950 p-6 md:p-8">
              <h3 className="text-lg font-black uppercase tracking-wide text-yellow-400">Local Pros website</h3>
              <ul className="mt-6 space-y-4">
                {localProsWebsite.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-yellow-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-24 bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-neutral-700 bg-neutral-950">
          <div className="grid gap-10 p-7 md:p-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <SectionLabel>The website package</SectionLabel>
              <h2 className="text-3xl font-black leading-tight text-white md:text-5xl">Everything your business needs to look credible online.</h2>
              <div className="mt-8 border-y border-neutral-800 py-7">
                <p className="text-4xl font-black tracking-tight text-white md:text-5xl">R9,900 <span className="text-xl text-neutral-400">once-off</span></p>
                <p className="mt-3 text-3xl font-black text-yellow-400">+ R290<span className="text-base text-neutral-400">/month</span></p>
                <p className="mt-2 text-sm text-neutral-500">Hosting and ongoing management</p>
              </div>
              <div className="mt-8">
                <CTAButton />
                <p className="mt-4 text-center text-sm text-neutral-500">No confusing handover. No website maintenance becoming your second job.</p>
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
      </section>

      <section className="bg-neutral-950 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <SectionLabel>Common questions</SectionLabel>
            <h2 className="text-3xl font-black text-white md:text-5xl">But what about…</h2>
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

      <section className="border-y border-neutral-800 bg-neutral-900 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
            Your next customer is going to check your website. <span className="text-yellow-400">Give them a reason to choose you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
            Start with a quick WhatsApp chat. We will tell you plainly whether this package fits your business.
          </p>
          <div className="mx-auto mt-9 max-w-md"><CTAButton /></div>
        </div>
      </section>

      <section id="terms" className="bg-neutral-950 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <details className="group rounded-2xl border border-neutral-800 bg-neutral-900">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-6 text-lg font-black text-white marker:content-none md:px-8">
              Website service terms
              <ChevronDown className="h-5 w-5 flex-none text-neutral-400 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-neutral-800 px-6 py-6 md:px-8">
              <div className="divide-y divide-neutral-800">
                {terms.map((term) => (
                  <details key={term.title} className="group/term py-1">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-bold text-neutral-100 marker:content-none">
                      {term.title}
                      <ChevronDown className="h-4 w-4 flex-none text-neutral-500 transition-transform group-open/term:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="space-y-3 pb-5 text-sm leading-relaxed text-neutral-400">{term.content}</div>
                  </details>
                ))}
              </div>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
};

export default WebDesignPageV2;
