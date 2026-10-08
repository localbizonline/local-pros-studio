import type { ReactNode } from 'react';
import '../../join-light/joinlight.css';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';

// "What we do" from the join page (localpros.co.za/join/reviews-and-social, in our colours): two
// literal sentences with the platform logos set in the heading, then the price and a button.
// Taken off the join page on 7 Oct 2026 because it repeated the hero; saved here to come back to.

const CTA = SITE_WHATSAPP_URL;

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="jl-ig" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#FEDA75" />
        <stop offset=".35" stopColor="#FA7E1E" />
        <stop offset=".6" stopColor="#D62976" />
        <stop offset="1" stopColor="#4F5BD5" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#jl-ig)" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="2" />
    <circle cx="17.4" cy="6.6" r="1.3" fill="#fff" />
  </svg>
);

const PlatformIcon = ({ children }: { children: ReactNode }) => <span className="jl-icon">{children}</span>;

export default function WhatWeDoOffer() {
  return (
    <div className="jl bg-white text-[#1C1917]">
          <section id="how-it-works" className="py-16 md:py-24 px-6 scroll-mt-20">
            <div className="max-w-6xl mx-auto text-center">
              <p className="eyebrow mb-6">What we do</p>
              <h2 className="jl-head text-[clamp(1.45rem,3.2vw,2.5rem)] font-extrabold tracking-[-0.025em] leading-[1.3] text-[#1C1917]">
                <span className="block">
                  We’ll grow your Facebook and{' '}
                  <span className="whitespace-nowrap">
                    Instagram.{' '}
                    <PlatformIcon>
                      <FacebookIcon />
                    </PlatformIcon>
                    <PlatformIcon>
                      <InstagramIcon />
                    </PlatformIcon>
                  </span>
                </span>
                <span className="block">
                  We’ll get you more 5‑star Google{' '}
                  <span className="whitespace-nowrap">
                    reviews.{' '}
                    <PlatformIcon>
                      <GoogleIcon />
                    </PlatformIcon>
                  </span>
                </span>
              </h2>
              <p className="mt-6 max-w-[40rem] mx-auto text-[clamp(1.1rem,1.6vw,1.25rem)] leading-[1.6] text-[#44403C]">
                More 5-star reviews from your happy clients, and your job photos turned into proper posts on Facebook and Instagram. We
                do it every week, so you can get on with the work.
              </p>
              <div className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] pl-6 pr-3 py-3">
                <p className="text-[17px]">
                  <span className="text-[#78716C]">All in one for</span>{' '}
                  <strong className="jl-head text-[1.5rem] font-extrabold tracking-[-0.02em]">R2,500</strong>
                  <span className="text-[#78716C]"> a month</span>
                </p>
                <a href={CTA} target="_blank" rel="noopener noreferrer" className="btn btn-primary !py-3 !text-[1rem]">
                  WhatsApp us
                </a>
              </div>
            </div>
          </section>
    </div>
  );
}
