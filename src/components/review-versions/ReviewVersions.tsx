import { Suspense, lazy } from 'react';
import { Link, useParams } from 'react-router-dom';

// Temporary, noindex review pages: /review-versions/1, /2 and /3 are three sales-page takes built
// around Google reviews in design direction A. First made as homepage options (6 Oct 2026); Jeremy
// kept them as the starting point for the /reviews page rebuild. Delete the ones not picked then.
const VERSIONS = {
  '1': { name: 'Before / after slider', Page: lazy(() => import('./v1/HomeV1')) },
  '2': { name: 'Your first 90 days', Page: lazy(() => import('./v2/HomeV2')) },
  '3': { name: 'Which one would you call?', Page: lazy(() => import('./v3/HomeV3')) },
} as const;

type VersionId = keyof typeof VERSIONS;

export default function ReviewVersions() {
  const { id } = useParams();
  const current: VersionId = id === '2' || id === '3' ? id : '1';
  const { Page } = VERSIONS[current];

  return (
    <>
      <div style={{ background: '#3f3f46', color: '#e4e4e7', font: '13px/1.2 system-ui, sans-serif' }}>
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
          <span>Reviews page options (kept for the /reviews rebuild)</span>
          <span style={{ display: 'flex', gap: 4 }}>
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
