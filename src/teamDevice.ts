// Team devices (8 Oct 2026): our own computers and phones should not trigger lead alerts or create
// Airtable records when we use the site chat. Open studio.localpros.co.za/?team=on once in each
// browser to mark it; ?team=off undoes it. The mark lives in that browser only, so clearing site
// data or using another browser means opening the link again.

const KEY = 'lps_team_device';

export const isTeamDevice = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

const toast = (text: string) => {
  const el = document.createElement('div');
  el.textContent = text;
  el.setAttribute('role', 'status');
  el.style.cssText =
    'position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:9999;max-width:min(92vw,420px);' +
    'padding:12px 16px;border-radius:12px;background:#171717;color:#fff;font:600 14px/1.4 system-ui,sans-serif;' +
    'box-shadow:0 12px 30px rgba(0,0,0,.35);text-align:center';
  document.body.append(el);
  window.setTimeout(() => el.remove(), 6000);
};

// Reads ?team=on / ?team=off, remembers it, confirms it on screen and tidies the address bar
export const applyTeamDeviceLink = () => {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('team');
  if (value !== 'on' && value !== 'off') return;
  try {
    if (value === 'on') localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);
  } catch {
    toast('This browser blocks site storage, so it can’t be marked as a team device.');
    return;
  }
  toast(
    value === 'on'
      ? 'Team device: using the chat here sends no lead alerts and saves nothing to Airtable.'
      : 'Team device mark removed: this browser now counts as a normal visitor.',
  );
  params.delete('team');
  const query = params.toString();
  window.history.replaceState(window.history.state, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
};
