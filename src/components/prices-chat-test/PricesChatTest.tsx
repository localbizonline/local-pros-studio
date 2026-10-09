import { useEffect } from 'react';
import JoinLight from '../join-light/JoinLight';
import { openSiteChat } from '../demo-popup/openSiteChat';

// Test of Jeremy's prices chat idea (9 Oct 2026), not live: the homepage, where tapping "Prices" in the menu or
// footer opens the site chat with the prices first (DemoPopup.tsx, PricesStep) instead of going to /pricing.
// Noindex at /review-versions/prices-chat. If it goes live, the menu link does this on every page.
export default function PricesChatTest() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="/pricing"]');
      if (!link) return;
      e.preventDefault();
      e.stopPropagation();
      openSiteChat(undefined, { prices: true });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return <JoinLight />;
}
