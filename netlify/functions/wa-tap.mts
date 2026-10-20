// POST /.netlify/functions/wa-tap: an ad visitor tapped WhatsApp to Ashley (src/adWhatsApp.ts). Passes the ref
// that went on their first message, with Google's click id, to the WhatsApp bot's signed /webhook/ad-tap
// (lp-studio-whatsapp-inbound, services/ad-chat-start.ts), which counts the chat as a Google Ads conversion
// when that message arrives. Same bot and secret as demo-lead.mts. Nothing about the visitor is sent but the
// click id and the page.

declare const Netlify: { env: { get(name: string): string | undefined } };

const REF = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{5}$/;
const CLICK_ID = /^[A-Za-z0-9_-]{10,250}$/;

export default async (request: Request) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const ref = typeof body.ref === 'string' ? body.ref : '';
  const id = (name: string) => (typeof body[name] === 'string' && CLICK_ID.test(body[name] as string) ? (body[name] as string) : undefined);
  const tap = { ref, gclid: id('gclid'), gbraid: id('gbraid'), wbraid: id('wbraid'), page: typeof body.page === 'string' ? body.page.slice(0, 120) : undefined };
  if (!REF.test(ref) || (!tap.gclid && !tap.gbraid && !tap.wbraid)) return new Response('Bad request', { status: 400 });

  const botUrl = Netlify.env.get('BOT_NEW_LEAD_URL') || Netlify.env.get('DEMO_BOT_URL');
  const secret = Netlify.env.get('BOT_NEW_LEAD_SECRET') || Netlify.env.get('DEMO_BOT_SECRET');
  if (!botUrl || !secret) return new Response(null, { status: 204 });
  const url = botUrl.replace(/\/webhook\/[^/]+\/?$/, '/webhook/ad-tap');
  const payload = JSON.stringify(tap);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload)))].map((b) => b.toString(16).padStart(2, '0')).join('');
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-webhook-signature': sig }, body: payload, signal: AbortSignal.timeout(5000) });
    if (!res.ok) console.error('Ad tap failed', res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error('Ad tap error', err instanceof Error ? err.message : String(err));
  }
  return new Response(null, { status: 204 });
};
