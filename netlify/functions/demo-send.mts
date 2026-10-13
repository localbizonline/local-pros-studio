// /api/demo-send?t=… : the "Send it" link in the demo-ready WhatsApp alert (demo-ready.mts).
// GET shows what will be sent and a button (WhatsApp opens links to preview them, so GET never sends);
// POST sends the demo link to the visitor from the sales number (DEMO_BOT_SESSION_ID) through the WhatsApp
// bot service's signed /webhook/send-template (DEMO_BOT_URL, DEMO_BOT_SECRET = its SEND_TEMPLATE_WEBHOOK_SECRET).
// Sends once: Airtable "Demo status" becomes "Sent".

import { airtableLink, demoMessage, demoUrl, DF, esc, html, readRecord, readToken, sendAlert, updateRecord } from '../lib/demo.mts';

declare const Netlify: { env: { get(name: string): string | undefined } };

const toWhatsApp = (mobile: unknown) => (typeof mobile === 'string' && /^0[6-8]\d{8}$/.test(mobile) ? `27${mobile.slice(1)}` : '');

async function sendWhatsApp(to: string, content: string, name: string) {
  const url = Netlify.env.get('DEMO_BOT_URL');
  const secret = Netlify.env.get('DEMO_BOT_SECRET');
  const session = Netlify.env.get('DEMO_BOT_SESSION_ID');
  if (!url || !secret || !session) return 'not set up (DEMO_BOT_URL, DEMO_BOT_SECRET or DEMO_BOT_SESSION_ID missing)';
  const body = JSON.stringify({
    content,
    recipients: [to],
    session_id: session,
    triggered_by: 'studio-demo-website',
    conversation_updates: { contact_name: name },
  });
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body)))].map((b) => b.toString(16).padStart(2, '0')).join('');
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-webhook-signature': sig }, body, signal: AbortSignal.timeout(9000) });
    const out = await res.text();
    if (!res.ok) return `bot service ${res.status}: ${out.slice(0, 150)}`;
    const result = (JSON.parse(out) as { results?: { status?: string; error?: string }[] }).results?.[0];
    return result?.status === 'sent' ? '' : `not sent: ${result?.error || result?.status || 'no result'}`;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

export default async (request: Request) => {
  const secret = Netlify.env.get('DEMO_SECRET');
  if (!secret) return html('<p>Not set up yet (DEMO_SECRET).</p>', 503);
  const token = request.method === 'POST' ? new URLSearchParams(await request.text()).get('t') : new URL(request.url).searchParams.get('t');
  const claims = await readToken(token, secret, 'send');
  if (!claims) return html('<h1>Link expired</h1><p>This send link is wrong or more than 7 days old. Send the demo by hand from Airtable.</p>', 403);

  const record = await readRecord(claims.r);
  if (!record) return html('<p>Could not read the lead from Airtable. Try again in a minute.</p>', 502);
  const name = String(record[DF.companyName] || 'your business');
  const url = demoUrl(claims.s);
  const to = toWhatsApp(record[DF.mobile]);
  const message = demoMessage(name, url);
  const back = `<p class="muted"><a href="${esc(airtableLink(claims.r))}">Open in Airtable</a></p>`;

  if (record[DF.demoStatus] === 'Sent') {
    return html(`<h1>Already sent ✓</h1><p>${esc(name)} already has <a href="${esc(url)}">their demo</a>.</p>${back}`);
  }
  if (!to) {
    return html(`<h1>No WhatsApp number</h1><p>${esc(name)} didn't leave a cell number in the chat. They messaged the 083 number, so send this from there:</p><pre>${esc(message)}</pre>${back}`);
  }

  if (request.method !== 'POST') {
    return html(
      `<h1>Send ${esc(name)} their demo?</h1><p><a href="${esc(url)}" target="_blank" rel="noopener">Open the demo website</a> and check it first.</p><p>This goes to <b>0${esc(to.slice(2))}</b> from the sales number (072 703 3269):</p><pre>${esc(message)}</pre><form method="post" onsubmit="this.querySelector('button').disabled=true"><input type="hidden" name="t" value="${esc(token)}"><button type="submit">Send it on WhatsApp</button></form>${back}`,
    );
  }

  // Marked sent first, so a second tap can't send it twice; put back if the send fails
  await updateRecord(claims.r, { [DF.demoStatus]: 'Sent' });
  const problem = await sendWhatsApp(to, message, name);
  if (problem) {
    console.error('Demo send failed', problem);
    await updateRecord(claims.r, { [DF.demoStatus]: 'Ready to send' });
    return html(`<h1>Not sent</h1><p>${esc(problem)}</p><p>Send it by hand:</p><pre>${esc(message)}</pre>${back}`, 502);
  }
  await sendAlert('lead', `📤 Demo website sent to ${name} (0${to.slice(2)}) from the sales number.\n${url}`);
  return html(`<h1>Sent ✓</h1><p>${esc(name)} has their demo link on WhatsApp. Their replies go to the sales number.</p>${back}`);
};

export const config = { path: '/api/demo-send' };
