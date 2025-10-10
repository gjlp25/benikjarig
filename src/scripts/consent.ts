/* TypeScript */
/**
 * Minimal consent banner + analytics gate.
 * - Stores choice in localStorage under "benikvandaag_consent"
 * - Lazy-loads Plausible only after consent is granted
 * - Accessible: buttons, focus management, simple markup
 */

declare global {
  interface Window {
    plausible?: unknown;
  }
}

const CONSENT_KEY = 'benikvandaag_consent' as const; // 'granted' | 'denied'

type ConsentValue = 'granted' | 'denied' | null;

function readConsent(): ConsentValue {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'granted' || v === 'denied') return v;
  } catch {
    // localStorage may be unavailable in some contexts
  }
  return null;
}

function writeConsent(v: ConsentValue) {
  try {
    if (v === null) localStorage.removeItem(CONSENT_KEY);
    else localStorage.setItem(CONSENT_KEY, v);
  } catch {
    // ignore
  }
}

/**
 * Public: returns true if consent already granted
 */
export function hasConsent(): boolean {
  return readConsent() === 'granted';
}

/* Plausible analytics removed — using Vercel Analytics instead. */

/**
 * Create and render a small consent banner.
 * Returns a teardown function to remove the banner.
 */
export function showConsentBanner(options?: { container?: HTMLElement; domain?: string }) {
  // Always prefer the explicit container passed in options, then fall back to <main>.
  // This ensures initConsent({ container: qs('main') }) reliably places the banner inside <main>.
  const hideTarget = options?.container ?? (document.querySelector('main') as HTMLElement | null) ?? document.body;
  const appendTarget = options?.container ?? (document.querySelector('main') as HTMLElement | null) ?? document.body;

  const existing = document.getElementById('consent-banner');
  if (existing) return () => { /* no-op */ };

  // Banner markup (minimal, accessible)
  const banner = document.createElement('aside');
  banner.id = 'consent-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'true');
  banner.setAttribute('aria-labelledby', 'consent-text');
  banner.style.position = 'fixed';
  banner.style.left = '1rem';
  banner.style.right = '1rem';
  banner.style.bottom = '1rem';
  banner.style.zIndex = '9999';
  banner.style.background = 'var(--white, #fff)';
  banner.style.border = '1px solid rgba(0,0,0,0.08)';
  banner.style.padding = '1rem';
  banner.style.borderRadius = '8px';
  banner.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
  banner.style.display = 'flex';
  banner.style.alignItems = 'center';
  banner.style.gap = '0.75rem';
  banner.style.flexWrap = 'wrap';

  const text = document.createElement('div');
  text.id = 'consent-text';
  text.innerText = 'Wij gebruiken analytics om anonieme gebruiksstatistieken te verzamelen. Accepteer je analytics?';
  text.style.flex = '1 1 300px';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '0.5rem';

  const acceptBtn = document.createElement('button');
  acceptBtn.type = 'button';
  acceptBtn.innerText = 'Accepteer';
  acceptBtn.className = 'btn btn-primary';
  acceptBtn.style.cursor = 'pointer';

  const declineBtn = document.createElement('button');
  declineBtn.type = 'button';
  declineBtn.innerText = 'Weiger';
  declineBtn.className = 'btn btn-secondary';
  declineBtn.style.cursor = 'pointer';

  const learnMore = document.createElement('a');
  // point to the static html during development and production
  learnMore.href = '/privacy.html';
  learnMore.innerText = 'Privacy';
  learnMore.style.alignSelf = 'center';
  learnMore.setAttribute('aria-label', 'Lees meer over privacy en analytics');
  learnMore.setAttribute('target', '_blank');
  learnMore.setAttribute('rel', 'noopener noreferrer');

  actions.appendChild(acceptBtn);
  actions.appendChild(declineBtn);

  banner.appendChild(text);
  banner.appendChild(actions);
  banner.appendChild(learnMore);

  // focus management
  const prevFocus = document.activeElement as HTMLElement | null;
  acceptBtn.focus();

  function teardown() {
    // Remove banner and restore aria state + focus
    try {
      banner.remove();
      try {
        const appEl = hideTarget && (hideTarget.querySelector ? (hideTarget.querySelector('#app') as HTMLElement | null) : null);
        if (appEl && appEl.removeAttribute) {
          appEl.removeAttribute('aria-hidden');
        } else if (hideTarget && (hideTarget as HTMLElement).removeAttribute) {
          (hideTarget as HTMLElement).removeAttribute('aria-hidden');
        }
      } catch { /* ignore */ }
    } catch { /* ignore */ }
    if (prevFocus) prevFocus.focus();
  }

  acceptBtn.addEventListener('click', () => {
    writeConsent('granted');
    // Analytics handled by Vercel in production; no client script to load here.
    teardown();
  });

  declineBtn.addEventListener('click', () => {
    writeConsent('denied');
    teardown();
  });

  // When showing the banner, hide the underlying app container (if present) from assistive tech,
  // but keep the banner inside the page landmark so accessibility tools consider it contained.
  try {
    const appEl = hideTarget && (hideTarget.querySelector ? (hideTarget.querySelector('#app') as HTMLElement | null) : null);
    if (appEl && appEl.setAttribute) {
      appEl.setAttribute('aria-hidden', 'true');
    } else if (hideTarget && (hideTarget as HTMLElement).setAttribute) {
      (hideTarget as HTMLElement).setAttribute('aria-hidden', 'true');
    }
  } catch { /* ignore */ }

  // Append banner inside the landmark (hideTarget) so axe treats it as page content.
  appendTarget.appendChild(banner);

  return teardown;
}

/**
 * Initialize consent on app start.
 * - If consent already granted -> load analytics immediately.
 * - If not, show banner after a short idle to avoid blocking first paint.
 */
export function initConsent(options?: { container?: HTMLElement; domain?: string }) {
  const c = readConsent();
  if (c === 'granted') {
    // Analytics handled by Vercel in production; nothing to load client-side here.
    return;
  }
  // Defer showing banner slightly (non-blocking)
  // Use requestIdleCallback if available
  const show = () => showConsentBanner(options);
  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: unknown) => void }).requestIdleCallback?.(show, { timeout: 2000 });
  } else {
    setTimeout(show, 1200);
  }
}

/**
 * For tests: clear stored consent
 */
export function _clearConsentForTests() {
  writeConsent(null);
}
