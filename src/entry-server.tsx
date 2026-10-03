// Server-side entry used only at build time by scripts/prerender.mjs to save each page as finished HTML
import { renderToPipeableStream, type PipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from './App';

export { PAGES, SITE_URL, canonicalUrl } from './seo';

// Resolves once every lazily loaded page has finished, so the saved HTML holds the full page, not a loading gap
export const renderPage = (url: string) =>
  new Promise<PipeableStream>((resolve, reject) => {
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>,
      {
        onAllReady: () => resolve(stream),
        onShellError: reject,
        onError: reject,
      },
    );
  });
