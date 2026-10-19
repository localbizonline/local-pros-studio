// The four service marks from the swipe deck (/lead-partners/intro, slide 11), so the page and the deck match.
// Platform logos only identify the platform: no partnership or endorsement is implied.

export function LeadsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#E63946" />
      <path
        fill="#fff"
        d="M8.6 10.9a9.6 9.6 0 0 0 4.5 4.5l1.5-1.5a.7.7 0 0 1 .7-.17 7.8 7.8 0 0 0 2.4.39.7.7 0 0 1 .7.7v2.4a.7.7 0 0 1-.7.7A11.9 11.9 0 0 1 5.8 6.1a.7.7 0 0 1 .7-.7h2.4a.7.7 0 0 1 .7.7c0 .85.13 1.66.39 2.42a.7.7 0 0 1-.17.7z"
      />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"
      />
    </svg>
  );
}

export function SocialIcon() {
  return (
    <span className="lp-ico-duo">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path
          fill="#fff"
          d="M15.1 12.6l.4-2.7h-2.6V8.2c0-.7.4-1.5 1.5-1.5h1.2V4.4s-1.1-.2-2.1-.2c-2.2 0-3.6 1.3-3.6 3.7v2h-2.4v2.7h2.4V24h2.9V12.6z"
        />
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <radialGradient id="lp-ig" cx="30%" cy="107%" r="150%">
            <stop offset="0" stopColor="#fdf497" />
            <stop offset=".05" stopColor="#fdf497" />
            <stop offset=".45" stopColor="#fd5949" />
            <stop offset=".6" stopColor="#d6249f" />
            <stop offset=".9" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#lp-ig)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="16.3" cy="7.7" r="1" fill="#fff" />
      </svg>
    </span>
  );
}

export function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="3" width="21" height="18" rx="3" fill="#fff" stroke="#1c1917" strokeWidth="1.6" />
      <path d="M1.5 8h21" stroke="#1c1917" strokeWidth="1.6" />
      <circle cx="4.8" cy="5.5" r=".9" fill="#f59e0b" />
      <circle cx="7.4" cy="5.5" r=".9" fill="#78716c" />
      <circle cx="10" cy="5.5" r=".9" fill="#78716c" />
      <rect x="5" y="11" width="9" height="2" rx="1" fill="#78716c" />
      <rect x="5" y="15" width="14" height="2" rx="1" fill="#e7e5e4" />
    </svg>
  );
}
