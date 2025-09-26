import { createEl, setHtml, on, qs } from '../utils/dom-helpers';
import { validateInput, evaluateBirthday } from './birthday-logic';
import { triggerConfetti } from './animations';
import { generateShareHtml, openShareDialog, shouldUseWebShare, sharePayload } from './sharing';
import { initConsent } from './consent';

function buildForm() {
  const wrapper = createEl('div', { class: 'container' }) as HTMLElement;

  wrapper.innerHTML = `
    <h1>🎂 Ben ik vandaag jarig?</h1>
    <p class="subtitle">Voer je geboortedatum in en ontdek het!</p>

    <form id="birthdayForm">
      <div class="form-group">
        <label for="day">Dag</label>
        <input type="number" id="day" min="1" max="31" required aria-label="Geboortedag" />
      </div>

      <div class="form-group">
        <label for="month">Maand</label>
        <input type="number" id="month" min="1" max="12" required aria-label="Geboortemaand" />
      </div>

      <div class="form-group">
        <label for="year">Jaar</label>
        <input type="number" id="year" min="1900" required aria-label="Geboortejaar" />
      </div>

      <button type="submit" class="btn" id="checkBtn">🎉 Check of ik jarig ben!</button>
    </form>

    <div id="result" class="hidden"></div>

  `;

  return wrapper;
}

function appendFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <p>© 2025 benikvandaagjarig.nl<br/>Gemaakt door [jouw naam/alias]<br/>Contact: info@benikvandaagjarig.nl</p>
      <p class="muted">Laatste update: september 2025<br/><a href="/privacy.html">Privacyverklaring</a></p>
    </div>
  `;
  document.body.appendChild(footer);
}

function mountApp() {
  const mount = qs('#app');
  if (!mount) throw new Error('Mount point #app not found');
  const formRoot = buildForm();
  mount.appendChild(formRoot);

  const form = qs('#birthdayForm') as HTMLFormElement;
  const result = qs('#result') as HTMLElement;
  const checkBtn = qs('#checkBtn') as HTMLButtonElement;
  const dayInput = qs('#day') as HTMLInputElement;
  const monthInput = qs('#month') as HTMLInputElement;
  const yearInput = qs('#year') as HTMLInputElement;

  // Modal root appended to body so dialogs are rendered outside the main landmark
  let modalRoot = document.getElementById('modal-root') as HTMLElement | null;
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    modalRoot.className = 'hidden';
    document.body.appendChild(modalRoot);
  }
  const mainEl = qs('main') as HTMLElement | null;

  // Set year constraints
  const currentYear = new Date().getFullYear();
  yearInput.max = String(currentYear);

  dayInput.focus();

  // Update day max when month/year change
  function updateDaysMax() {
    const m = parseInt(monthInput.value) || 1;
    const y = parseInt(yearInput.value) || currentYear;
    const daysInMonth = new Date(y, m, 0).getDate();
    dayInput.max = String(daysInMonth);
    if (parseInt(dayInput.value || '0') > daysInMonth) {
      dayInput.style.borderColor = '#ef4444';
    } else {
      dayInput.style.borderColor = '#e2e8f0';
    }
  }

  on(monthInput, 'change', updateDaysMax);
  on(yearInput, 'change', updateDaysMax);
  on(dayInput, 'input', updateDaysMax);

  // Keyboard navigation (Enter to next input)
  on(document, 'keydown', (ev: Event) => {
    const e = ev as KeyboardEvent;
    if (e.key === 'Enter' && (e.target as HTMLElement)?.tagName === 'INPUT') {
      const inputs = Array.from(document.querySelectorAll('input'));
      const currentIndex = inputs.indexOf(e.target as HTMLInputElement);
      if (currentIndex < inputs.length - 1) {
        (inputs[currentIndex + 1] as HTMLInputElement).focus();
        e.preventDefault();
      } else {
        checkBtn.focus();
      }
    }
  });

  // Handle share interactions (hybrid: anchors + Web Share + clipboard)
  on(result, 'click', (ev: Event) => {
    const target = ev.target as HTMLElement;
    const platform = target.getAttribute?.('data-platform');
    const shareKey = target.getAttribute?.('data-share'); // 'native' for device share button

    if (!platform && !shareKey) return;

    const isBday = !!target.closest('.result.birthday');

    // Helper: announce ARIA live messages
    function announce(msg: string) {
      let live = qs('#share-live') as HTMLElement | null;
      if (!live) {
        live = createEl('div') as HTMLElement;
        live.id = 'share-live';
        live.setAttribute('aria-live', 'polite');
        live.className = 'sr-only';
        document.body.appendChild(live);
      }
      live.textContent = msg;
      setTimeout(() => { live && (live.textContent = ''); }, 2000);
    }

    // Helper: clipboard fallback
    async function copyToClipboard(text: string) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          announce('Link gekopieerd naar klembord');
          return true;
        }
      } catch (e) {
        // fall through to legacy
      }
      // Legacy textarea fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('aria-hidden', 'true');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        announce('Link gekopieerd naar klembord');
        document.body.removeChild(ta);
        return true;
      } catch (e) {
        document.body.removeChild(ta);
        alert('Kopieer deze link: ' + text);
        return false;
      }
    }

    // Native device share button pressed
    if (shareKey === 'native') {
      const payload = sharePayload(isBday);
      if (navigator.share) {
        navigator.share({ title: payload.title, text: payload.text, url: payload.url })
          .catch(async () => {
            // fallback to clipboard if share fails
            await copyToClipboard(payload.url);
          });
      } else {
        // No Web Share API: copy link
        copyToClipboard(payload.url);
      }
      return;
    }

    // Platform anchor clicked (let anchors work for right-click / SEO)
    if (platform) {
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      const href = anchor ? anchor.href : (target.getAttribute('href') || '');
      const useWebShare = shouldUseWebShare(platform) && !!navigator.share;

      if (useWebShare) {
        ev.preventDefault();
        const payload = sharePayload(isBday);
        navigator.share({ title: payload.title, text: payload.text, url: payload.url })
          .catch(() => {
            // fallback to opening the platform URL
            if (href) window.open(href, '_blank');
            else copyToClipboard(payload.url);
          });
      } else {
        // Do nothing — allow anchor default behavior (right-click/copy)
        return;
      }
    }
  });

  // Form submission
  on(form, 'submit', (ev: Event) => {
    ev.preventDefault();
    // Ensure any previous modal state is cleared before processing a new submission
    try { if (mainEl) mainEl.removeAttribute('aria-hidden'); } catch (e) { /* ignore */ }

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (!validateInput(day, month, year)) {
      alert('Vul alle velden in met een geldige datum!');
      return;
    }

    checkBtn.disabled = true;
    checkBtn.textContent = '🔍 Even checken...';

    // small delay to mimic processing and show animations similarly to prototype
    setTimeout(() => {
      const res = evaluateBirthday(day, month, year);

      if (res.leapYearMessage) {
        modalRoot.className = '';
        setHtml(modalRoot, `
          <div class="leap-year-message">
            <h2 id="result-heading">🗓️ Bijzondere situatie!</h2>
            <p>Jouw verjaardag (29 februari) bestaat alleen in schrikkeljaren!</p>
            <p>Vier je vandaag op 28 februari of wacht je tot 1 maart?</p>
            <div class="age-display">Je bent ${res.age ?? '-'} jaar oud</div>
            ${generateShareHtml(false)}
          </div>
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying main as hidden to screen readers while dialog is visible
        try { if (mainEl) mainEl.setAttribute('aria-hidden', 'true'); } catch (e) { /* ignore */ }
        // Focus the result heading for screen readers
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          headingEl.setAttribute('tabindex', '-1');
          headingEl.focus();
        }
      } else if (res.isBirthday) {
        modalRoot.className = 'result birthday';
        setHtml(modalRoot, `
          <h2 id="result-heading" class="bounce">🎉 GEFELICITEERD!</h2>
          <p>Ja! Je bent vandaag ${res.age} jaar geworden!</p>
          <p>🎂 Proficiat met je verjaardag! 🎈</p>
          <div class="age-display">Happy Birthday! 🎊</div>
          ${generateShareHtml(true)}
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying main as hidden to screen readers while dialog is visible
        try { if (mainEl) mainEl.setAttribute('aria-hidden', 'true'); } catch (e) { /* ignore */ }
        // Focus the result heading for screen readers
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          headingEl.setAttribute('tabindex', '-1');
          headingEl.focus();
        }

        // Celebration effects (only after user interaction allowed for sound)
        triggerConfetti();
      } else {
        modalRoot.className = 'result not-birthday';
        setHtml(modalRoot, `
          <h2 id="result-heading">😔 Nee, je bent niet jarig</h2>
          <p>Helaas! Vandaag is niet jouw verjaardag.</p>
          <p><strong>Aan het werk!</strong> 💪</p>
          <div class="age-display">Je bent ${res.age ?? '-'} jaar oud</div>
          ${generateShareHtml(false)}
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying main as hidden to screen readers while dialog is visible
        try { if (mainEl) mainEl.setAttribute('aria-hidden', 'true'); } catch (e) { /* ignore */ }
        // Focus the result heading for screen readers
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          headingEl.setAttribute('tabindex', '-1');
          headingEl.focus();
        }
      }

      modalRoot.classList.remove('hidden');
      checkBtn.disabled = false;
      checkBtn.textContent = '🔄 Opnieuw checken';
      modalRoot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 700);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initConsent({ container: qs('main') as HTMLElement });
  mountApp();
  appendFooter();
});
