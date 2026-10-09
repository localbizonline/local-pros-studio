import '../../design-directions/directions.css';
import './herothreeservices.css';
import type { ReactNode } from 'react';
import { SITE_WHATSAPP_URL } from '../../../whatsapp';
import landscapePhoto from '../../../assets/images/social-posting/happy contractor with social posting landscape ratio.webp';

// Homepage / join page hero, picked by Jeremy on 8 Oct 2026 (option A of ten, A to J, since deleted):
// the search phrase as a small H1 line, then three literal lines naming what we do (each service
// underlined in amber, picked 8 Oct 2026 over a marker or two-tone grey), one sentence on
// how, two buttons and the wide contractor photo (the small print under the buttons was removed on 8 Oct 2026). It replaced the
// "grow online" hero with three service cards, which repeated the "What we do" rows.
// Used on the join page and in the section library; change it here only.
// search (9 Oct 2026, Jeremy): a Google business search box takes the place of the two buttons, which become
// small links under it. The homepage passes <BusinessSearchBox />.

const KEYWORD = 'Google reviews, social media and websites for South African businesses';

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0012.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.94 1.51 5.66L.62 23.6l6.01-1.58a11.3 11.3 0 005.41 1.38c6.24 0 11.32-5.08 11.32-11.32 0-3.03-1.18-5.87-3.32-8.01z"
    />
  </svg>
);

export default function HeroThreeServices({ costsHref = '#pricing', search }: { costsHref?: string; search?: ReactNode }) {
  return (
    <section className="dd dd-a hsc">
      <div className="dd-container">
        <h1 className="dd-kw hsc-kw">{KEYWORD}</h1>
        <p className="hsc-title">
          <span className="hsc-line">
            More <span className="hsc-u">Google reviews.</span>
          </span>
          <span className="hsc-line">
            <span className="hsc-u">Social media posts.</span>
          </span>
          <span className="hsc-line">
            A better <span className="hsc-u">website.</span>
          </span>
        </p>
        <p className="hsc-lede">
          We ask your customers for reviews on WhatsApp, post your work on Facebook and Instagram, and build you a new website or refresh the one you have.
        </p>
        {search ? (
          <div className="hsc-search">
            {search}
            <p className="hsc-or">
              Or{' '}
              <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>{' '}
              · <a href={costsHref}>See what it costs</a>
            </p>
          </div>
        ) : (
          <div className="dd-actions hsc-actions">
            <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="dd-btn dd-btn-primary">
              <WhatsAppIcon />
              WhatsApp us
            </a>
            <a href={costsHref} className="dd-btn dd-btn-secondary">
              See what it costs
            </a>
          </div>
        )}
        <div className="hsc-media">
          <img
            src={landscapePhoto}
            alt="A contractor on site checking his business's Instagram page on his phone"
            width={1584}
            height={672}
          />
        </div>
      </div>
    </section>
  );
}
