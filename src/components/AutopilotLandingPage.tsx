import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Menu, X, ChevronDown, BadgeCheck, Minus } from 'lucide-react';
import ReputationReviewWidget from './ReputationReviewWidget';
import StudioMascot from './StudioMascot';
import ScratchToReveal from './ScratchToReveal';

import beforeAfterProof from '../assets/images/Reviews/Local Pros reviews before and after.webp';
import whatsappToGoogle from '../assets/images/Reviews/review from WhatsApp to google review side by side.webp';
import oneUploadPostEverywhere from '../assets/images/social-posting/one-upload post everywhere.webp';
import { SITE_WHATSAPP_URL } from '../whatsapp';

/* ------------------------------------------------------------------
   Palette used on this page (mirrors the reference landing page):
   ink #0D0F1C · muted #6B7280 · blue #1A56DB · light blue #4285F4
   blue tint #E8F0FE · green #0B7A5E · hairline #ECEEF3
   Type: Inter Tight, weight 500 headings, tight tracking, generous air.
   ------------------------------------------------------------------ */

const WA_MAIN = SITE_WHATSAPP_URL;

const track = (label: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: label,
      value: 1,
    });
  }
};

/* ---------------------------------- CTA --------------------------------- */

const BuyButton = ({
  label = 'Get started',
  size = 'lg',
  trackAs = 'autopilot_cta',
}: {
  label?: string;
  size?: 'sm' | 'lg';
  trackAs?: string;
}) => (
  <a
    href={WA_MAIN}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => track(trackAs)}
    className={`btn-autopilot font-tight inline-flex items-center justify-center rounded-full font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 ${
      size === 'lg'
        ? 'px-10 sm:px-14 py-4 text-lg sm:text-xl'
        : 'px-5 py-2.5 text-[13px]'
    }`}
  >
    {label}
  </a>
);

/* ---------------------------------- Nav --------------------------------- */

const navLinks = [
  { name: 'How it works', href: '#how-it-works' },
  { name: 'What you get', href: '#what-you-get' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

const PillNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 px-4 pt-4">
      <div className="mx-auto w-full max-w-3xl">
        <div className="surface-autopilot rounded-full border border-[#ECEEF3] bg-white/90 px-3 py-2 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-2">
            {/* The full logo is built for dark backgrounds, so this page uses a wordmark */}
            <Link
              to="/"
              aria-label="Local Pros Studio"
              className="font-tight shrink-0 pl-3 text-[16px] font-semibold tracking-[-0.02em] text-[#0D0F1C]"
            >
              Local Pros <span className="text-[#1A56DB]">studio.</span>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-tight rounded-full px-3 py-2 text-[13px] font-medium text-[#5F6368] transition-colors hover:text-[#0D0F1C]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <BuyButton label="Get started" size="sm" trackAs="autopilot_nav" />
              </div>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="rounded-full p-2 text-[#0D0F1C] transition-colors hover:bg-[#F4F6FA] md:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
            <div className="mt-2 flex flex-col gap-1 border-t border-[#ECEEF3] px-1 pb-2 pt-3 md:hidden">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-tight rounded-2xl px-4 py-3 text-[15px] font-medium text-[#0D0F1C] transition-colors hover:bg-[#F4F6FA]"
                >
                  {link.name}
                </a>
              ))}
              <div className="px-2 pt-2">
                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setOpen(false);
                    track('autopilot_nav_mobile');
                  }}
                  className="btn-autopilot font-tight flex w-full items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-white"
                >
                  Get started
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------ Small pieces ----------------------------- */

const SectionHeading = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`font-tight text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0D0F1C] sm:text-[44px] lg:text-[56px] ${className}`}
  >
    {children}
  </h2>
);

const Lede = ({ children }: { children: React.ReactNode }) => (
  <p className="font-tight mt-6 max-w-2xl text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
    {children}
  </p>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#ECEEF3]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-tight text-[17px] font-medium text-[#0D0F1C] sm:text-[19px]">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#9AA0A6] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="font-tight max-w-3xl text-[16px] leading-[1.65] text-[#6B7280]">
          {a}
        </p>
      </div>
    </div>
  );
};

const Marquee = ({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) => (
  <div className="relative flex overflow-hidden">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
    <div
      className={`flex w-max gap-3 ${
        reverse ? 'animate-scroll-slow-reverse' : 'animate-scroll-slow'
      }`}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={`${item}-${i}`}
          className="font-tight whitespace-nowrap rounded-full border border-[#ECEEF3] bg-white px-5 py-3 text-[15px] font-medium text-[#0D0F1C]"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

/* ---------------------------------- Page --------------------------------- */

const AutopilotLandingPage = () => {
  return (
    <div className="font-tight min-h-screen bg-white text-[#0D0F1C] selection:bg-[#E8F0FE]">
      <PillNav />
      <ScratchToReveal />

      {/* ================= HERO ================= */}
      <section className="flex flex-col px-6 pt-12 pb-24 sm:pt-16 sm:pb-32">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="font-tight text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-[#0D0F1C] sm:text-[56px] lg:text-[68px]">
            Get found on <span className="text-[#4285F4]">Google</span>.
            <br className="hidden sm:block" /> Get{' '}
            <span className="text-[#0B7A5E]">chosen</span> by customers.
          </h1>

          <p className="font-tight mx-auto mt-8 max-w-2xl text-[17px] leading-[1.6] text-[#6B7280] sm:text-[21px]">
            Local Pros Studio collects your reviews on WhatsApp, posts the jobs
            you've completed, and keeps your business looking active on Google,
            Facebook and Instagram. Every week. Without you lifting a finger.
          </p>

          <div className="mt-10 flex justify-center">
            <BuyButton label="Get started" trackAs="autopilot_hero" />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="flex -space-x-2">
              {['#E8F0FE', '#DCE8FB', '#D0E0F8', '#C4D8F6'].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <p className="font-tight flex items-center gap-2 text-[15px] text-[#5F6368]">
              Trusted by trades businesses{' '}
              <span className="font-semibold text-[#0D0F1C]">across South Africa</span>
              <BadgeCheck className="h-5 w-5 shrink-0 text-[#4285F4]" />
            </p>
          </div>
        </div>
      </section>

      {/* ================= NARRATIVE ================= */}
      <section className="px-4 pt-20 pb-24 sm:px-6 sm:pt-32 sm:pb-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-16">
          <div className="order-2 lg:order-1">
          <h2 className="font-tight text-[48px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0D0F1C] sm:text-[64px] lg:text-[80px]">
            Meet{' '}
            <span className="text-[#1A56DB]">
              studio<span className="text-[#4285F4]">.</span>
            </span>
          </h2>

          <div className="mt-12 space-y-6 sm:space-y-8">
            {[
              { emoji: '', text: 'studio. learns your trade, your area and the jobs you actually want more of' },
              { emoji: '🔍', text: 'asks every customer for a review — on WhatsApp, not email' },
              { emoji: '', text: 'then posts the work you\'ve completed, week after week' },
              { emoji: '👓', text: 'so Google sees a business that is active, reviewed and real' },
              { emoji: '🚀', text: 'and you wake up to enquiries from people who\'ve never met you' },
            ].map((line, i) => (
              <p
                key={i}
                className="font-tight text-[24px] font-medium leading-[1.3] tracking-[-0.01em] text-[#0D0F1C] sm:text-[34px]"
              >
                {line.emoji && <span className="mr-3">{line.emoji}</span>}
                {line.text}
              </p>
            ))}
          </div>

          <p className="font-tight mt-16 text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-[#0D0F1C] sm:text-[40px]">
            Your competitors are showing up every week.
            <br />
            <span className="text-[#6B7280]">Why aren't you?</span>
          </p>
          </div>

          {/* The man himself */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end lg:self-center">
            <StudioMascot pose="wave" className="w-[150px] sm:w-[200px] lg:w-[280px]" />
          </div>
        </div>
      </section>

      {/* ================= PROOF ================= */}
      <section className="flex flex-col px-4 pt-8 pb-24 sm:px-6 sm:pt-12 sm:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading className="text-center">
            Before. After. Same business.
          </SectionHeading>
          <p className="font-tight mx-auto mt-6 max-w-2xl text-center text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            Nothing changed about how they do the work. What changed is that
            every customer now gets asked — and the good ones actually answer.
          </p>

          <div className="relative mt-20 sm:mt-24">
            {/* Hands curled over the top edge of the card, so the card reads as the ledge.
                Kept narrow and hard right so he clears the centred heading above. */}
            <StudioMascot
              pose="peek"
              className="pointer-events-none absolute bottom-full right-0 z-20 w-[105px] translate-y-[9%] sm:w-[130px] lg:w-[150px]"
            />
            <div className="surface-autopilot relative z-10 overflow-hidden rounded-[28px] border border-[#ECEEF3] bg-white p-3 sm:p-5">
              <img
                src={beforeAfterProof}
                alt="Google review count before and after Local Pros Studio"
                className="w-full rounded-[18px]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
              {
                k: 'Reviews',
                v: 'Asked every job',
                d: 'A WhatsApp request goes out automatically once the job is done.',
              },
              {
                k: 'Follow-ups',
                v: 'Three tiers',
                d: 'Most people mean to leave a review. They just forget. We remind them.',
              },
              {
                k: 'Problems',
                v: 'Straight to you',
                d: 'If something went wrong, the customer can reply on the same WhatsApp and you get an alert straight away.',
              },
            ].map((s) => (
              <div
                key={s.k}
                className="surface-autopilot rounded-[20px] border border-[#ECEEF3] bg-white p-6"
              >
                <p className="font-tight text-[12px] font-semibold uppercase tracking-[0.12em] text-[#9AA0A6]">
                  {s.k}
                </p>
                <p className="font-tight mt-2 text-[24px] font-medium tracking-[-0.01em] text-[#0D0F1C]">
                  {s.v}
                </p>
                <p className="font-tight mt-3 text-[15px] leading-[1.6] text-[#6B7280]">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>
            How to start using{' '}
            <span className="text-[#1A56DB]">
              studio<span className="text-[#4285F4]">.</span>
            </span>
          </SectionHeading>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {[
              {
                n: '01',
                t: 'Online Presence Review',
                d: "We look at what people actually find when they Google you — your profile, your reviews, your competitors. Takes about 20 minutes.",
              },
              {
                n: '02',
                t: 'Digital Foundation Setup',
                d: 'We claim, fix and connect the pieces: Google Business Profile, Facebook, Instagram, Hello Peter, and your review link.',
              },
              {
                n: '03',
                t: 'We do the weekly work',
                d: 'Review requests go out. Your completed jobs get posted. Reviews get replied to. You carry on with the actual job.',
              },
              {
                n: '04',
                t: 'You get found, and chosen',
                d: 'More reviews, more recent activity, more reasons for Google and the AI models to put your name in front of someone.',
              },
            ].map((step) => (
              <div key={step.n}>
                <span className="font-tight inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F0FE] text-[14px] font-semibold text-[#1A56DB]">
                  {step.n}
                </span>
                <h3 className="font-tight mt-5 text-[22px] font-medium tracking-[-0.01em] text-[#0D0F1C] sm:text-[26px]">
                  {step.t}
                </h3>
                <p className="font-tight mt-3 text-[16px] leading-[1.65] text-[#6B7280]">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISIBILITY FIXES ================= */}
      <section className="flex flex-col overflow-hidden px-0 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 sm:px-0">
          <SectionHeading>First, let's make you visible.</SectionHeading>
          <Lede>
            Most trades businesses have the basics half done. A profile nobody
            ever claimed. Categories that don't match what you actually do. A
            Facebook page that stopped in 2022. Google reads all of that.
          </Lede>

          <div className="relative mt-14 grid gap-3 lg:pr-[230px]">
            {/* Mirrored so he points back at the list, not off the page */}
            <StudioMascot
              pose="point"
              from="right"
              className="pointer-events-none absolute -right-4 bottom-0 hidden w-[210px] -scale-x-100 lg:block"
            />
            {[
              'Claim and complete your Google Business Profile',
              'Fix your categories and services so you show for the right searches',
              'Set up a review link and put it in every customer\'s hand',
              'Tidy up Facebook and Instagram so they look alive',
              'Add real photos of real jobs — not stock images',
              'Reply to every review, the good ones and the bad ones',
            ].map((item, i) => (
              <div
                key={item}
                className="surface-autopilot flex items-center gap-4 rounded-[16px] border border-[#ECEEF3] bg-white px-5 py-4"
              >
                <span className="font-tight flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0D0F1C] text-[12px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="font-tight text-[16px] text-[#0D0F1C] sm:text-[17px]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="font-tight mt-14 text-[26px] font-medium leading-[1.25] tracking-[-0.02em] text-[#6B7280] sm:text-[36px]">
            You probably won't notice most of this...
            <br />
            <span className="text-[#0D0F1C]">
              studio<span className="text-[#4285F4]">.</span> fixes it anyway
            </span>
          </p>
        </div>
      </section>

      {/* ================= LEARNS YOUR BUSINESS ================= */}
      <section id="what-you-get" className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>Learns your business.</SectionHeading>
          <Lede>
            We learn your trade, your area, your prices and the way you speak to
            a customer. So everything that goes out sounds like you — not like
            an agency that's never been on a site.
          </Lede>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                t: 'Sounds like you',
                d: "Posts written the way you'd actually say it. No corporate waffle, no rocket-ship emojis, no \"we are thrilled to announce\".",
              },
              {
                t: 'Knows your customers',
                d: "The person searching at 9pm with a burst geyser isn't the person planning a new build. We write for both.",
              },
              {
                t: 'Knows what they search',
                d: 'We use the same search data the big agencies pay thousands for — so you show up for the words people actually type.',
              },
            ].map((c) => (
              <div
                key={c.t}
                className="surface-autopilot rounded-[24px] border border-[#ECEEF3] bg-white p-7"
              >
                <h3 className="font-tight text-[20px] font-medium tracking-[-0.01em] text-[#0D0F1C]">
                  {c.t}
                </h3>
                <p className="font-tight mt-3 text-[15px] leading-[1.65] text-[#6B7280]">
                  {c.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'emergency plumber cape town',
              '24 hour electrician',
              'geyser replacement gqeberha',
              'blocked drain near me',
              'carport installer durbanville',
            ].map((k) => (
              <span
                key={k}
                className="font-tight rounded-full border border-[#DCE8FB] bg-[#E8F0FE] px-4 py-2 text-[14px] font-medium text-[#1A56DB]"
              >
                {k}
              </span>
            ))}
          </div>

          <p className="font-tight mt-8 text-[14px] text-[#9AA0A6]">
            Your customer list stays yours. Never sold, never shared, never
            reused.
          </p>
        </div>
      </section>

      {/* ================= WHAT TO POST NEXT ================= */}
      <section className="flex flex-col overflow-hidden px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>Know what to post next.</SectionHeading>
          <Lede>
            You finish a job, you take a photo, and it sits on your phone
            forever. Those photos don't go anywhere. Send them to us instead —
            one upload, and it's on every platform.
          </Lede>

          <div className="surface-autopilot mt-14 grid gap-8 rounded-[28px] border border-[#ECEEF3] bg-white p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { l: 'Completed jobs', v: '6 new' },
                { l: 'Review requests sent', v: '24' },
                { l: 'New reviews this month', v: '8' },
                { l: 'Posts scheduled', v: '4' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-[18px] border border-[#ECEEF3] bg-[#FAFBFD] p-5"
                >
                  <p className="font-tight text-[13px] text-[#6B7280]">{s.l}</p>
                  <p className="font-tight mt-2 text-[28px] font-medium tracking-[-0.02em] text-[#0D0F1C]">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
            <img
              src={oneUploadPostEverywhere}
              alt="One upload, posted to every platform"
              className="w-full rounded-[18px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ================= REVIEWS THAT SELL ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>
            Reviews that win the job. Not just stars.
          </SectionHeading>
          <Lede>
            A five-star rating with nothing written under it doesn't sell
            anything. We ask in a way that gets customers to say what you
            actually did — the leak you found, the same-day turnaround, the mess
            you cleaned up afterwards. That's the part the next customer reads.
          </Lede>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div className="surface-autopilot overflow-hidden rounded-[28px] border border-[#ECEEF3] bg-white p-3 sm:p-5">
              <img
                src={whatsappToGoogle}
                alt="WhatsApp review request turning into a Google review"
                className="w-full rounded-[18px]"
                loading="lazy"
              />
            </div>

            <div className="relative">
              {/* Standing behind the card, holding up the review as it lands */}
              <StudioMascot
                pose="phone"
                className="pointer-events-none absolute bottom-full right-0 z-0 hidden w-[180px] translate-y-[28%] lg:block"
              />
              <div className="surface-autopilot relative z-10 rounded-[28px] border border-[#ECEEF3] bg-white p-7 sm:p-9">
              <p className="font-tight text-[13px] font-semibold uppercase tracking-[0.12em] text-[#9AA0A6]">
                Profile strength
              </p>
              <p className="font-tight mt-4 text-[64px] font-medium leading-none tracking-[-0.03em] text-[#0D0F1C]">
                92<span className="text-[24px] text-[#9AA0A6]">/100</span>
              </p>
              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#ECEEF3]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '92%',
                    backgroundImage:
                      'linear-gradient(90deg,#194caa 0%,#1a56db 48%,#649dfd 100%)',
                  }}
                />
              </div>
              <p className="font-tight mt-6 text-[16px] leading-[1.65] text-[#6B7280]">
                Rating, recency, response rate, photo activity and how completely
                your profile is filled in. This is roughly what Google is
                weighing up when it decides who to show first.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SIX JOBS ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>
            Six jobs. One{' '}
            <span className="text-[#1A56DB]">
              studio<span className="text-[#4285F4]">.</span>
            </span>
          </SectionHeading>
          <Lede>
            We ask, follow up, flag problems, post, reply and report — without adding
            another thing to your week.
          </Lede>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                t: 'Asks every customer',
                d: 'A WhatsApp request goes out after the job. Not email — nobody in South Africa opens the email.',
              },
              {
                t: 'Follows up, politely',
                d: "Three tiers of reminders. Most people meant to leave a review and simply forgot.",
              },
              {
                t: 'Flags problems straight away',
                d: 'Every customer gets the same Google link. If something went wrong, they can reply on the same WhatsApp and you get an alert, so you can phone them and sort it out.',
              },
              {
                t: 'Posts your work weekly',
                d: 'Completed jobs, promotions, holidays and review highlights — Facebook, Instagram and Google.',
              },
              {
                t: 'Replies on your behalf',
                d: 'Every review gets a response. Google counts that. So does the person reading it.',
              },
              {
                t: 'Shows you what moved',
                d: 'Reviews collected, posts published, and where you sit against the guys down the road.',
              },
            ].map((f) => (
              <div
                key={f.t}
                className="surface-autopilot rounded-[24px] border border-[#ECEEF3] bg-white p-7"
              >
                <h3 className="font-tight text-[20px] font-medium tracking-[-0.01em] text-[#0D0F1C]">
                  {f.t}
                </h3>
                <p className="font-tight mt-3 text-[15px] leading-[1.65] text-[#6B7280]">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AI OVERVIEW MOCKUP ================= */}
      <section className="flex flex-col overflow-x-clip px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading className="text-center">
            When someone asks AI who to call.
          </SectionHeading>
          <p className="font-tight mx-auto mt-6 max-w-2xl text-center text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            Google and ChatGPT don't guess. They pick businesses that look
            established — reviewed recently, responded to, and clearly still
            trading. That's exactly what we build.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'emergency plumber cape town',
                a: 'Cape Town emergency plumbers are available 24/7 for burst pipes, blocked drains and geyser failures. Local plumbers with strong recent reviews respond fastest and quote upfront.',
                biz: 'Your Plumbing Co.',
                domain: 'yourplumbing.co.za',
                rank: 'Top 1',
                title: 'Emergency Plumber in Cape Town | 24/7 Callout',
                snippet:
                  '24/7 emergency plumbing across the Southern Suburbs. Burst pipes, geysers, blocked drains. Same-day callout and upfront pricing.',
              },
              {
                q: 'best electrician in gqeberha',
                a: 'Top-rated Gqeberha electricians handle CoC certificates, DB board upgrades and load-shedding installations. Reviews from the last few months matter most.',
                biz: 'Your Electrical',
                domain: 'yourelectrical.co.za',
                rank: 'Top 2',
                title: 'Certified Electrician in Gqeberha | CoC & Inverters',
                snippet:
                  'Registered electrician serving Gqeberha. CoC certificates, DB boards, inverter and solar installations. Fast, compliant, fairly priced.',
              },
            ].map((m) => (
              <div
                key={m.q}
                className="surface-autopilot overflow-hidden rounded-[24px] border border-[#ECEEF3] bg-white"
              >
                <div className="border-b border-[#ECEEF3] px-6 py-5">
                  <div className="rounded-full border border-[#ECEEF3] bg-[#FAFBFD] px-4 py-2.5">
                    <p className="font-tight text-[14px] text-[#5F6368]">{m.q}</p>
                  </div>
                  <div className="mt-4 flex gap-5">
                    {['All', 'Images', 'Maps', 'News'].map((t, i) => (
                      <span
                        key={t}
                        className={`font-tight text-[13px] ${
                          i === 0
                            ? 'border-b-2 border-[#4285F4] pb-1 font-medium text-[#4285F4]'
                            : 'text-[#5F6368]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-6">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F0FE] px-3 py-1">
                    <span className="font-tight text-[12px] font-semibold text-[#1A56DB]">
                      AI Overview
                    </span>
                  </div>
                  <p className="font-tight text-[15px] leading-[1.6] text-[#3D4259]">
                    {m.a}
                  </p>

                  <div className="mt-6 rounded-[16px] border border-[#DCE8FB] bg-[#FAFBFD] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-tight text-[14px] font-medium text-[#0D0F1C]">
                          {m.biz}
                        </p>
                        <p className="font-tight text-[12px] text-[#9AA0A6]">
                          {m.domain}
                        </p>
                      </div>
                      <span className="font-tight rounded-full bg-[#0B7A5E] px-3 py-1 text-[11px] font-semibold text-white">
                        {m.rank}
                      </span>
                    </div>
                    <p className="font-tight mt-4 text-[15px] font-medium text-[#1A56DB]">
                      {m.title}
                    </p>
                    <p className="font-tight mt-2 text-[13px] leading-[1.6] text-[#5F6368]">
                      {m.snippet}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-tight mt-8 text-center text-[13px] text-[#9AA0A6]">
            Illustrative example of how an AI Overview presents a local business.
          </p>
        </div>
      </section>

      {/* ================= WORKS WITH ================= */}
      <section className="flex flex-col overflow-hidden px-3 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading className="px-3 text-center">
            Works with what you already have.
          </SectionHeading>
          <p className="font-tight mx-auto mt-6 max-w-2xl px-3 text-center text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            No new app to learn. No dashboard to log into. You send us a job on
            WhatsApp, we handle the rest.
          </p>

          <div className="mt-14 space-y-4">
            <Marquee
              items={[
                'Google Business Profile',
                'Facebook',
                'Instagram',
                'Hello Peter',
                'WhatsApp',
                'Your website',
              ]}
            />
            <Marquee
              reverse
              items={[
                'Google Maps',
                'Review widget on your site',
                'Holiday posts',
                'Job photos',
                'Promotions',
                'Review highlights',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading className="text-center">
            Built on ten years in the trenches.
          </SectionHeading>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: '300+', l: 'Local Pros partners across South Africa' },
              { v: '3', l: 'Platforms managed for you every week' },
              { v: '60s', l: 'To send us a job and have it posted everywhere' },
              { v: 'R2m', l: 'Largest single job won by a Studio client' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-tight text-[48px] font-medium leading-none tracking-[-0.03em] text-[#1A56DB] sm:text-[56px]">
                  {s.v}
                </p>
                <p className="font-tight mt-4 text-[12px] font-semibold uppercase leading-[1.5] tracking-[0.1em] text-[#9AA0A6]">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading>
            One partner.
            <br />
            Skip the rest.
          </SectionHeading>
          <Lede>
            As a business owner you've got three options. Do it yourself and
            work out what your time is worth. Employ somebody — R3,000 to
            R6,000 a month part-time, R7,000 to R11,000 full-time. Or hand it to
            an agency for R5,000 to R15,000. Then there's us.
          </Lede>

          <div className="surface-autopilot mt-14 overflow-x-auto rounded-[24px] border border-[#ECEEF3] bg-white">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="border-b border-[#ECEEF3]">
                  <th className="px-6 py-5 text-left" />
                  <th className="px-6 py-5 text-center">
                    <span className="font-tight text-[15px] font-semibold text-[#1A56DB]">
                      studio<span className="text-[#4285F4]">.</span>
                    </span>
                  </th>
                  <th className="font-tight px-6 py-5 text-center text-[15px] font-medium text-[#6B7280]">
                    Employee
                  </th>
                  <th className="font-tight px-6 py-5 text-center text-[15px] font-medium text-[#6B7280]">
                    Agency
                  </th>
                  <th className="font-tight px-6 py-5 text-center text-[15px] font-medium text-[#6B7280]">
                    Yourself
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { r: 'Runs every week without you', c: [true, true, true, false] },
                  { r: 'Sounds like your business, not an agency', c: [true, true, false, true] },
                  { r: 'Every review replied to', c: [true, false, true, false] },
                  { r: 'Built for South African trades', c: [true, false, false, true] },
                  { r: 'Under R2,500 a month', c: [true, false, false, true] },
                ].map((row) => (
                  <tr key={row.r} className="border-b border-[#ECEEF3] last:border-0">
                    <td className="font-tight px-6 py-5 text-left text-[15px] text-[#0D0F1C]">
                      {row.r}
                    </td>
                    {row.c.map((ok, i) => (
                      <td key={i} className="px-6 py-5">
                        <div className="flex justify-center">
                          {ok ? (
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                                i === 0 ? 'bg-[#1A56DB]' : 'bg-[#E8F0FE]'
                              }`}
                            >
                              <Check
                                className={`h-4 w-4 ${
                                  i === 0 ? 'text-white' : 'text-[#1A56DB]'
                                }`}
                                strokeWidth={3}
                              />
                            </span>
                          ) : (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F6FA]">
                              <Minus className="h-4 w-4 text-[#C4C8D0]" strokeWidth={3} />
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <SectionHeading className="text-center">
            Three ways in. Pick one.
          </SectionHeading>
          <p className="font-tight mx-auto mt-6 max-w-2xl text-center text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            No contract lock-in. 50% off your first month while we get the
            foundation right.
          </p>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: 'Automated Reviews',
                price: 'R1,200',
                tag: 'Starter',
                blurb: 'For the business that does good work and has nothing to show for it.',
                features: [
                  'WhatsApp review requests after every job',
                  'Three-tier follow-up system',
                  'Alerts if a customer is unhappy',
                  'Every review replied to for you',
                  'Live review widget on your website',
                  'Google, Facebook and Hello Peter',
                ],
                featured: false,
              },
              {
                name: 'Reviews + Social',
                price: 'R2,500',
                tag: 'Save R700',
                blurb: 'The full picture. Reviewed, active, and impossible to miss.',
                features: [
                  'Everything in Automated Reviews',
                  'Everything in Social Growth',
                  'One form, posted to every platform',
                  'Review highlights turned into posts',
                  'Custom graphics for your business',
                  'One monthly report that makes sense',
                ],
                featured: true,
              },
              {
                name: 'Social Growth',
                price: 'R2,000',
                tag: 'Presence',
                blurb: 'For the business whose Facebook page last posted in 2022.',
                features: [
                  'Weekly generated posts',
                  'Unlimited job posts from you',
                  'Facebook, Instagram and Google',
                  'Custom business graphics',
                  'Holiday and seasonal posts',
                  'Roughly one minute of your time',
                ],
                featured: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`surface-autopilot flex flex-col rounded-[28px] border p-7 sm:p-8 ${
                  p.featured
                    ? 'border-[#1A56DB] bg-[#FAFBFD] ring-1 ring-[#1A56DB]'
                    : 'border-[#ECEEF3] bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-tight text-[20px] font-medium tracking-[-0.01em] text-[#0D0F1C]">
                    {p.name}
                  </h3>
                  <span
                    className={`font-tight rounded-full px-3 py-1 text-[11px] font-semibold ${
                      p.featured
                        ? 'bg-[#1A56DB] text-white'
                        : 'bg-[#F4F6FA] text-[#6B7280]'
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>

                <p className="font-tight mt-4 text-[15px] leading-[1.6] text-[#6B7280]">
                  {p.blurb}
                </p>

                <p className="font-tight mt-7 text-[44px] font-medium leading-none tracking-[-0.03em] text-[#0D0F1C]">
                  {p.price}
                  <span className="font-tight text-[15px] font-normal text-[#9AA0A6]">
                    {' '}
                    /month
                  </span>
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#1A56DB]"
                        strokeWidth={3}
                      />
                      <span className="font-tight text-[15px] leading-[1.55] text-[#3D4259]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={WA_MAIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track(`autopilot_pricing_${p.name}`)}
                  className={`font-tight mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-[16px] font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                    p.featured
                      ? 'btn-autopilot text-white'
                      : 'border border-[#ECEEF3] bg-white text-[#0D0F1C] hover:border-[#1A56DB]'
                  }`}
                >
                  Get started
                </a>
              </div>
            ))}
          </div>

          <p className="font-tight mt-8 text-center text-[14px] text-[#9AA0A6]">
            Running more than one business? Additional businesses go at 50%.
          </p>
        </div>
      </section>

      {/* ================= TRADES MARQUEE ================= */}
      <section className="flex flex-col overflow-hidden px-3 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-4">
            <Marquee
              items={[
                'Plumbers',
                'Electricians',
                'Builders',
                'Roofers',
                'Gas installers',
                'Pest control',
              ]}
            />
            <div className="py-4">
              <SectionHeading className="text-center">
                Built for any trade.
              </SectionHeading>
            </div>
            <Marquee
              reverse
              items={[
                'Landscapers',
                'Painters',
                'Solar installers',
                'Carport installers',
                'Cleaning services',
                'Locksmiths',
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= FOUNDER ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <div className="surface-autopilot rounded-[28px] border border-[#ECEEF3] bg-white p-8 sm:p-12">
            <p className="font-tight text-[20px] leading-[1.5] tracking-[-0.01em] text-[#0D0F1C] sm:text-[26px]">
              “Generally speaking, digital marketing is not any service
              business's strong suit. There are very few business owners I've
              spoken to over the years who do this well — and that's not a
              failing, it's just not what you were built for.
              <br />
              <br />
              What I'd ask you is this: what is the cost of doing nothing? Give
              me 20 minutes and I'll show you exactly what someone finds when
              they Google your business right now.
              <br />
              <br />
              No pitch. You'll know where you stand either way.”
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-tight flex h-14 w-14 items-center justify-center rounded-full bg-[#0D0F1C] text-[16px] font-semibold text-white">
                JM
              </span>
              <div>
                <p className="font-tight text-[16px] font-semibold text-[#0D0F1C]">
                  Jeremy · jeremy@localpros.co.za
                </p>
                <p className="font-tight text-[14px] text-[#6B7280]">
                  Founder, Local Pros Studio — Cape Town
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SectionHeading className="text-center">
            What our own customers say.
          </SectionHeading>
          <p className="font-tight mx-auto mb-14 mt-6 max-w-2xl text-center text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            Collected the same way we'd collect yours.
          </p>
          <ReputationReviewWidget variant="light" />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="flex flex-col px-6 py-24 sm:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <SectionHeading>Questions, answered.</SectionHeading>
          <p className="font-tight mt-6 text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
            The things business owners ask before they start.
          </p>

          <div className="mt-12">
            {[
              {
                q: 'What does Local Pros Studio actually do?',
                a: 'Two things, every week. We ask your customers for reviews over WhatsApp and manage what comes back — including replying to them. And we keep your Facebook, Instagram and Google profile posting the work you\'ve completed. That combination is what makes Google and the AI models treat your business as active and worth recommending.',
              },
              {
                q: 'Is this just an automated review blaster?',
                a: 'No. There\'s a three-tier follow-up system, unhappy customers can reply on the same WhatsApp so you hear about problems straight away, and every review that comes in gets a written response on your behalf. The automation is the delivery. The judgement is ours.',
              },
              {
                q: 'Why not just ask customers myself?',
                a: 'You can. Most owners start there and stop within a fortnight, because the moment you\'re on the next job, asking drops off the list. The reason this works is that it happens every single time without depending on you remembering.',
              },
              {
                q: 'How is this different from an agency?',
                a: 'An agency will charge you R5,000 to R15,000 a month and hand you a strategy deck. We do the two things that actually move a local business — reviews and consistent activity — for under R2,500, and you speak to me directly on WhatsApp.',
              },
              {
                q: 'Do I need a website?',
                a: 'No. Your Google Business Profile does most of the heavy lifting for a local trade. If you do have a site, we\'ll put a live review widget on it that updates itself. If you don\'t, we build them too.',
              },
              {
                q: 'What if I get a bad review?',
                a: 'If a customer is unhappy, they can reply on the same WhatsApp and you get an alert straight away, so you can phone them and sort it out. If a bad review does go up, we write the response — and a well-handled one-star does more for your credibility than a wall of perfect fives.',
              },
              {
                q: 'How long before I see something?',
                a: 'Reviews start arriving in the first week or two, because you\'re already doing the work — we\'re just asking. Ranking movement takes longer. Google rewards momentum, not a once-off push, which is exactly why this is a monthly service and not a project.',
              },
              {
                q: 'What do you need from me?',
                a: 'Your customer\'s name and number when a job is done, and a photo if you took one. That\'s it. It takes about a minute.',
              },
              {
                q: 'Can I run this across more than one business?',
                a: 'Yes. Main business at full rate, additional businesses at 50%. Volume discounts kick in from two upwards.',
              },
              {
                q: 'Am I locked into a contract?',
                a: 'No. It\'s month to month. The first month is 50% off while we get your foundation set up properly.',
              },
            ].map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="flex flex-col px-6 py-24 sm:py-32">
        <div className="relative mx-auto mt-24 w-full max-w-3xl sm:mt-28">
          {/* Leaning over the top of the closing panel */}
          <StudioMascot
            pose="peek"
            className="pointer-events-none absolute bottom-full left-1/2 z-20 w-[130px] -translate-x-1/2 translate-y-[9%] sm:w-[160px]"
          />
          <div className="surface-autopilot relative z-10 rounded-[32px] border border-[#ECEEF3] bg-[#FAFBFD] px-6 py-14 text-center sm:px-12 sm:py-16">
            <h2 className="font-tight text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0D0F1C] sm:text-[48px]">
              Ready to get found, and get chosen?
            </h2>
            <p className="font-tight mx-auto mt-6 max-w-xl text-[17px] leading-[1.6] text-[#6B7280] sm:text-[19px]">
              Start with an Online Presence Review. Twenty minutes, and you'll
              see exactly what a customer sees when they look you up.
            </p>
            <div className="mt-10 flex justify-center">
              <BuyButton label="Get started" trackAs="autopilot_final" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#ECEEF3] px-6 py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to="/"
                aria-label="Local Pros Studio"
                className="font-tight text-[18px] font-semibold tracking-[-0.02em] text-[#0D0F1C]"
              >
                Local Pros <span className="text-[#1A56DB]">studio.</span>
              </Link>
              <p className="font-tight mt-4 max-w-xs text-[14px] leading-[1.6] text-[#6B7280]">
                Reviews and social presence for South African trades
                businesses. Cape Town.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <div>
                <p className="font-tight text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9AA0A6]">
                  Services
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Link to="/reviews" className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]">
                    Review collection
                  </Link>
                  <Link to="/social-media-posting-service" className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]">
                    Social posting
                  </Link>
                  <Link to="/web-design" className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]">
                    Web design
                  </Link>
                </div>
              </div>
              <div>
                <p className="font-tight text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9AA0A6]">
                  Company
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Link to="/about" className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]">
                    About
                  </Link>
                  <a
                    href={WA_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="mailto:jeremy@localpros.co.za"
                    className="font-tight text-[14px] text-[#0D0F1C] hover:text-[#1A56DB]"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="font-tight mt-12 border-t border-[#ECEEF3] pt-8 text-[13px] text-[#9AA0A6]">
            © {new Date().getFullYear()} Local Pros Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AutopilotLandingPage;
