const BASE_URL = 'https://benikvandaagjarig.nl';

function shareUrl(isBday: boolean) {
  return isBday ? `${BASE_URL}/?r=bday` : `${BASE_URL}/?r=not`;
}

export function shareText(isBday: boolean) {
  const bdayText = '🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl';
  const notBdayText = 'Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl';
  return encodeURIComponent(isBday ? bdayText : notBdayText);
}

/**
 * Returns share payload in plain and encoded forms.
 */
export function sharePayload(isBday: boolean) {
  const text = isBday ? '🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl' : 'Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl';
  return {
    title: 'Ben ik vandaag jarig?',
    text,
    encoded: encodeURIComponent(text),
    url: shareUrl(isBday)
  };
}

/**
 * Decision helper: when to prefer Web Share API.
 * Mobile devices OR platform-specific mobile-first platforms (whatsapp, telegram)
 * should prefer the native share sheet.
 */
export function shouldUseWebShare(platform?: string) {
  try {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const mobileFirst = ['whatsapp', 'telegram'];
    return isMobile || (platform ? mobileFirst.includes(String(platform).toLowerCase()) : false);
  } catch {
    return false;
  }
}

/**
 * Trigger the native share dialog or return fallback URLs.
 * This function should only be invoked in response to a user gesture (click).
 */
export function openShareDialog(isBday: boolean) {
  const text = isBday ? '🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl' : 'Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl';
  const url = shareUrl(isBday);

  if (navigator.share) {
    navigator.share({
      title: 'Ben ik vandaag jarig?',
      text,
      url
    }).catch(() => {
      // ignore user cancel / errors
    });
    return;
  }

  // Fallback: open platform urls (user can copy-paste)
  const encoded = encodeURIComponent(text);
  const whatsapp = `https://wa.me/?text=${encoded}%20${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitter = `https://x.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return { whatsapp, facebook, twitter, linkedin };
}

/**
 * Generate share buttons HTML only. Do NOT call openShareDialog here.
 * The buttons will have data-share attributes; main.ts will call openShareDialog
 * when a button is actually clicked (so the native share dialog is only shown
 * in response to a real user gesture).
 */
export function generateShareHtml(isBday: boolean) {
  const text = isBday ? '🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl' : 'Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl';
  const encoded = encodeURIComponent(text);
  const url = shareUrl(isBday);
  const whatsapp = `https://wa.me/?text=${encoded}%20${encodeURIComponent(url)}`;
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitter = `https://x.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  // Always render real anchors (right-click / SEO friendly).
  // Add an extra native-share button when Web Share API is available.
  const nativeButton = (typeof navigator !== 'undefined' && typeof ((navigator as unknown as { share?: unknown }).share) === 'function')
    ? `<button class="share-btn native-share" data-share="native" aria-label="Deel via je apparaat">🔗 Delen</button>`
    : '';

  return `
    <div class="share-buttons">
      <a href="${whatsapp}" data-platform="whatsapp" class="share-btn whatsapp" target="_blank" rel="noopener noreferrer">📱 WhatsApp</a>
      <a href="${facebook}" data-platform="facebook" class="share-btn facebook" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
      <a href="${twitter}" data-platform="twitter" class="share-btn twitter" target="_blank" rel="noopener noreferrer">🐦 X (Twitter)</a>
      <a href="${linkedin}" data-platform="linkedin" class="share-btn linkedin" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
      ${nativeButton}
      <button class="share-btn download" data-action="download" aria-label="Bewaar als afbeelding">🖼️ Bewaar als afbeelding</button>
    </div>
  `;
}

export type ShareCardOptions = {
  isBday: boolean;
  age: number | null;
  subtekst: string;
  isLeap?: boolean;
};

/**
 * Build or update an off-screen share card used as the html2canvas target.
 * The element is kept off-screen (not display:none) so html2canvas can render it.
 * Inline styles are used to make the rendering consistent across environments.
 */
export function buildShareCard(opts: ShareCardOptions): void {
  try {
    const { isBday, age, subtekst, isLeap } = opts;
    let el = document.getElementById('share-card') as HTMLElement | null;
    if (!el) {
      el = document.createElement('div');
      el.id = 'share-card';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }

    const bg = isBday
      ? 'linear-gradient(135deg, #ff9aa7 0%, #ffb4c8 50%, #fecfef 100%)'
      : isLeap
        ? 'linear-gradient(135deg, #94fbab 0%, #a9fff7 100%)'
        : 'linear-gradient(180deg, #b2e1ff 0%, #a9fff7 100%)';

    // Inline CSS to ensure html2canvas renders exactly as intended
    el.style.cssText = [
      'position: fixed',
      'left: -9999px',
      'top: 0',
      'width: 500px',
      'height: 500px',
      'z-index: -1',
      'pointer-events: none',
      'overflow: hidden',
      'display: flex',
      'flex-direction: column',
      'align-items: center',
      'justify-content: space-between',
      'text-align: center',
      'padding: 36px 40px',
      'box-sizing: border-box',
      "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      `background: ${bg}`
    ].join(';');

    const official = isBday ? '🎉 OFFICIEEL VASTGESTELD:' : (isLeap ? '🗓️ BIJZONDERE SITUATIE:' : '😔 OFFICIEEL VASTGESTELD:');
    const headline = isBday
      ? `IK BEN VANDAAG<br>${age !== null ? `${age} JAAR GEWORDEN` : 'JARIG!'}`
      : isLeap
        ? 'MIJN VERJAARDAG<br>BESTAAT NIET DIT JAAR'
        : 'IK BEN VANDAAG<br>NIET JARIG';

    const textColor = '#1a1a1a';
    const mutedColor = 'rgba(0,0,0,0.55)';

    el.innerHTML = `
      <div style="font-size:13px;font-weight:700;letter-spacing:1px;color:${mutedColor};align-self:flex-start;">benikvandaagjarig.nl</div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:16px;max-width:420px;">
        <div style="font-size:16px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${textColor};">${official}</div>
        <div style="font-size:46px;font-weight:900;line-height:1.1;color:${textColor};text-transform:uppercase;">${headline}</div>
        <div style="font-size:18px;font-weight:600;color:${textColor};opacity:0.85;max-width:380px;">${subtekst}</div>
      </div>

      <div style="font-size:13px;font-weight:700;letter-spacing:1px;color:${mutedColor};align-self:flex-end;">benikvandaagjarig.nl</div>
    `;
  } catch {
    // best-effort: if building the share card fails, we silently continue
  }
}

export async function downloadResultCard(): Promise<void> {
  try {
    const { default: html2canvas } = await import('html2canvas');
    const card = document.getElementById('share-card') as HTMLElement | null;
    if (!card) return;

    // html2canvas will render the element's inline styles; scale 2 => 1000x1000px output
    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      width: 500,
      height: 500
    });

    const link = document.createElement('a');
    link.download = `benikvandaagjarig-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    // Append/link click and remove to trigger download reliably
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    // graceful fallback: ignore
  }
}
