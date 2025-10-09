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
  const twitter = `https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`;
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
  const twitter = `https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`;
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
    </div>
  `;
}
