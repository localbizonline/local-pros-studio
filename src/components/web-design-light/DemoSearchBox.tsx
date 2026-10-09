import { MousePointer2, Search } from 'lucide-react';
import { openSiteChat } from '../demo-popup/openSiteChat';
import { GoogleG } from './ClientReviews';

// The free demo search box (8 Oct 2026): looks like Google's search box and opens the site chat ready to
// type in, with a floating pointer and note as on the ReachMax homepage (DemoClickGuide.astro). Used in the
// free demo band and, in the hero drafts, in the opening section.
export default function DemoSearchBox({ onOpen, note = "Try it, it's free!" }: { onOpen?: () => void; note?: string }) {
  const open = () => {
    onOpen?.();
    openSiteChat(undefined, { focusSearch: true });
  };
  return (
    <div className="fd-search-wrap">
      <button type="button" className="fd-search" onClick={open} aria-label="Search your business name to get a free demo">
        <GoogleG size={22} />
        <span className="fd-search-text">Search your business name</span>
        <span className="fd-search-btn">
          <Search size={18} aria-hidden="true" />
          Build my demo
        </span>
      </button>
      <span className="fd-guide" aria-hidden="true">
        <MousePointer2 className="fd-guide-arrow" size={40} fill="#1C1917" stroke="#fff" strokeWidth={1.7} />
        <span className="fd-guide-label">{note}</span>
      </span>
    </div>
  );
}
