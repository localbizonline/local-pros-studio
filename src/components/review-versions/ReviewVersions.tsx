import { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';

// Temporary, noindex review pages: /review-versions/1, /2 and /3 are three sales-page takes built
// around Google reviews in design direction A. First made as homepage options (6 Oct 2026); Jeremy
// kept them as the starting point for the /reviews page rebuild. Delete the ones not picked then.
const VERSIONS = {
  '1': { name: 'Before / after slider', Page: lazy(() => import('./v1/HomeV1')) },
  '2': { name: 'Your first 90 days', Page: lazy(() => import('./v2/HomeV2')) },
  '3': { name: 'Which one would you call?', Page: lazy(() => import('./v3/HomeV3')) },
  // Added 7 Oct 2026 from the aevaai.com study: one product, one niche, try it, fit, calculator
  '4': { name: 'Ask every customer', Page: lazy(() => import('./v4/ReviewsV4')) },
  // Light homepage draft (7 Oct 2026), parked here so it needs no new route in App.tsx
  'home-b': { name: 'Homepage B (light)', Page: lazy(() => import('../home-new-b/HomeNewB')) },
  // Sections Jeremy has picked, saved for future pages (7 Oct 2026)
  // localpros.co.za/join/reviews-and-social rebuilt in our colours (7 Oct 2026)
  join: { name: 'Join page, our colours', Page: lazy(() => import('../join-light/JoinLight')) },
  sections: { name: 'Section library', Page: lazy(() => import('../section-library/SectionLibrary')) },
  // Three "your reputation" sections for under the join page hero (7 Oct 2026)
  reputation: { name: 'Reputation section options', Page: lazy(() => import('../reputation-options/ReputationOptions')) },
  // "Your reputation" with animation that tells the story, three versions (7 Oct 2026)
  'rep-motion': { name: 'Reputation, animated', Page: lazy(() => import('../reputation-motion/ReputationMotionOptions')) },
  // "What we do" rows: three ways to show the websites, on different backgrounds (7 Oct 2026)
  services: { name: 'Services section options', Page: lazy(() => import('../services-options/ServicesOptions')) },
} as const;

type VersionId = keyof typeof VERSIONS;

export default function ReviewVersions() {
  const { id } = useParams();
  const current: VersionId = id && id in VERSIONS ? (id as VersionId) : '1';
  const { Page } = VERSIONS[current];
  // Inside compare-homepages.html each draft sits in a phone frame: leave the bar out there so the
  // page starts as a visitor would see it (8 Oct 2026)
  const embedded = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <>
      <div hidden={embedded} style={{ background: '#3f3f46', color: '#e4e4e7', font: '13px/1.2 system-ui, sans-serif' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span>Draft pages (not live)</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {(Object.keys(VERSIONS) as VersionId[]).map((v) => (
              <Link
                key={v}
                to={`/review-versions/${v}`}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  color: v === current ? '#18181b' : '#e4e4e7',
                  background: v === current ? '#fafafa' : 'transparent',
                  fontWeight: v === current ? 600 : 400,
                }}
              >
                {v}. {VERSIONS[v].name}
              </Link>
            ))}
          </span>
        </div>
      </div>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Page />
      </Suspense>
    </>
  );
}
