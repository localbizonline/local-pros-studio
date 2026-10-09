import DemoSearchBox from './DemoSearchBox';
// Closing picture: three sites up front with more behind, from design/web-montage (rows layout, 8 Oct 2026)
import montage from '../../assets/images/portfolio/web-closing-montage.webp';

// The website page's closing section (9 Oct 2026): the free demo, so the page ends on the same action it starts
// with. Replaces the shared "WhatsApp us" closing card on this page and the free demo band after How it works,
// which repeated How it works (Jeremy agreed to both). WhatsApp stays as a text link for people ready to talk.
// Same look as the shared closing card (section-library/sections/ClosingCard.tsx): dark card on the cream band.

const RECAP = ['Written, designed and built for you', 'Live in 7 days', 'R9,900 once-off, or R450 a month'];

export default function DemoClosing({ waUrl, track }: { waUrl: string; track: (label: string) => void }) {
  return (
    <section className="cc wdc py-16 md:py-24 px-6 bg-[#FBF6EC]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-3xl bg-[#1C1917]">
        <div className="flex items-center bg-[#FCF6ED] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl overflow-hidden">
          <img
            src={montage}
            alt="Websites we built for South African businesses, shown on phones"
            loading="lazy"
            width={1080}
            height={1000}
            className="w-full h-auto"
          />
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="cc-head text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#FBF6EC] mb-6">
            Get a free demo of your new website
          </h2>
          <ul className="flex flex-col gap-3 mb-8">
            {RECAP.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[clamp(1.05rem,1.6vw,1.15rem)] text-[#FBF6EC] font-semibold">
                <span className="w-7 h-7 rounded-full bg-[#FBF6EC]/15 text-[#FBBF24] flex items-center justify-center shrink-0 text-[0.9rem]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <DemoSearchBox onOpen={() => track('closing_demo')} note="" />
          <p className="wdc-or">
            Or{' '}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => track('final_whatsapp')}>
              WhatsApp us
            </a>{' '}
            to talk it through. A real person replies.
          </p>
        </div>
      </div>
    </section>
  );
}
