import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top of page on route change, or to the section the address names after # (Google Ads sitelinks
// such as /go/website-design?sl=prices#pricing, 13 Oct 2026). Without this the jump to top undoes the browser's own.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) return scrollToSection(id);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

// Waits up to ~3 seconds for the section (the page's code may still be loading), then scrolls it to just
// below the sticky menu bar
function scrollToSection(id: string) {
  let frame = 0;
  let tries = 0;
  const go = () => {
    const el = document.getElementById(id);
    if (!el) {
      if (tries++ < 180) frame = requestAnimationFrame(go);
      return;
    }
    const header = document.querySelector('header');
    const position = header ? getComputedStyle(header).position : '';
    const offset = header && (position === 'sticky' || position === 'fixed') ? header.getBoundingClientRect().height : 0;
    // A jump, like a normal page link: a smooth scroll lands short as the images it passes load and push the
    // section down, doesn't run in a tab opened in the background, and would ignore reduced-motion settings
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - offset,
      left: 0,
      behavior: 'instant'
    });
  };
  go();
  return () => cancelAnimationFrame(frame);
}

export default ScrollToTop;
