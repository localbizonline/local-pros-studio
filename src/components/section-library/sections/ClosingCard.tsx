import type { ReactNode } from 'react';
import './closingcard.css';

// Closing call-to-action (from the join page, 7 Oct 2026): a near-black card on the cream band with a
// photo, one headline, the offer as a checklist and one amber "WhatsApp us" button that says what it does.
// Used on the homepage and the website design page; change it here only.

type ClosingCardProps = {
  title: ReactNode;
  items: string[];
  photo: string;
  photoAlt: string;
  href: string;
  onClick?: () => void;
  note?: string;
  // 'contain' shows the whole picture on its own light background (for montages that must not be cut off)
  photoFit?: 'cover' | 'contain';
};

export default function ClosingCard({
  title,
  items,
  photo,
  photoAlt,
  href,
  onClick,
  note = 'Opens WhatsApp. A real person replies.',
  photoFit = 'cover',
}: ClosingCardProps) {
  return (
    <section className="cc py-16 md:py-24 px-6 bg-[#FBF6EC]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden bg-[#1C1917]">
        {photoFit === 'contain' ? (
          <div className="flex items-center bg-[#FCF6ED]">
            <img src={photo} alt={photoAlt} loading="lazy" className="w-full h-auto" />
          </div>
        ) : (
          <img src={photo} alt={photoAlt} loading="lazy" className="w-full h-full min-h-[260px] object-cover" />
        )}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="cc-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-8">
            {title}
          </h2>
          <ul className="flex flex-col gap-3.5 mb-9">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.2rem)] text-[#FBF6EC] font-semibold">
                <span className="w-7 h-7 rounded-full bg-[#FBF6EC]/15 text-[#FBBF24] flex items-center justify-center shrink-0 text-[0.9rem]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClick}
              className="inline-flex items-center justify-center rounded-[12px] bg-[#F59E0B] text-[#1C1917] font-bold text-[1.2rem] px-9 py-4 hover:bg-[#FBBF24] transition-colors"
            >
              WhatsApp us
            </a>
            <p className="text-[15px] text-[#FBF6EC]/70 mt-3">{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
