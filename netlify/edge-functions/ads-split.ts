// The 50/50 test of the category-first ads pages (Jeremy, 18 Oct 2026). Every Google Ads click lands on
// /go/website-design. Half the visitors who arrive from an ad (gclid, gbraid or wbraid in the link) are sent on to
// /go/websites, the question first (src/components/ads-gate/AdsGate.tsx); the other half see the page as before.
// A cookie keeps each visitor on the same side for 30 days. Visitors without an ad click id are not part of the
// test and always see the page as before.
//
// ADS_GATE_SHARE (Netlify setting): the percentage sent to the new pages, 50 by default. 0 stops the test,
// returning visitors included; 100 sends everyone. Changing it needs a redeploy.
// ?arm=gate or ?arm=page on the link picks a side by hand, for checking either page.

declare const Netlify: { env: { get(name: string): string | undefined } };
type Context = { next(): Promise<Response> };

const COOKIE = 'lps_arm';
const DAYS = 30;
const AD_CLICK = ['gclid', 'gbraid', 'wbraid'];
type Arm = 'gate' | 'page';

const asArm = (value: string | null | undefined): Arm | undefined => (value === 'gate' || value === 'page' ? value : undefined);

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const share = Math.min(100, Math.max(0, Number(Netlify.env.get('ADS_GATE_SHARE') ?? '50') || 0));
  const chosen = asArm(url.searchParams.get('arm'));
  const kept = asArm(new RegExp(`(?:^|;\\s*)${COOKIE}=(\\w+)`).exec(request.headers.get('cookie') || '')?.[1]);

  let arm = chosen ?? kept;
  if (!arm) {
    if (!AD_CLICK.some((p) => url.searchParams.has(p))) return;
    arm = Math.random() * 100 < share ? 'gate' : 'page';
  } else if (!chosen && share === 0) {
    arm = 'page';
  }

  const cookie = `${COOKIE}=${arm}; Path=/; Max-Age=${DAYS * 86_400}; SameSite=Lax; Secure`;
  if (arm === 'gate') {
    return new Response(null, {
      status: 302,
      headers: { location: `/go/websites${url.search}`, 'set-cookie': cookie, 'cache-control': 'private, no-store' },
    });
  }
  if (arm === kept && !chosen) return;
  const page = await context.next();
  const response = new Response(page.body, page);
  response.headers.append('set-cookie', cookie);
  return response;
};

export const config = { path: '/go/website-design' };
