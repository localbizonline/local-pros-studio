// Visitors from the WhatsApp bot's end-of-job "Tell me more" link arrive with ?r=CODE (26 Nov 2026).
// Tell the bot the page was opened, so the team sees who looked (Slack studio_page alert, D1 bot_signoffs).
// The bot answers the same for any code and only counts the first open. Repo: localpros-whatsapp-bot, src/signoff.js.
const BOT = 'https://localpros-whatsapp-bot.cf7-9ca.workers.dev';

export const tellBotPageOpened = () => {
  try {
    const code = new URLSearchParams(window.location.search).get('r')?.trim();
    if (!code || !/^[A-Za-z0-9]{6}$/.test(code)) return;
    fetch(`${BOT}/studio/opened?r=${encodeURIComponent(code)}`, { method: 'GET', mode: 'cors', keepalive: true }).catch(() => {});
  } catch {
    // Never break the page for this.
  }
};
