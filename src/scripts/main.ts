import { createEl, setHtml, on, qs } from '../utils/dom-helpers';
import { validateInput, evaluateBirthday } from './birthday-logic';
import { triggerConfetti } from './animations';
import { generateShareHtml, shouldUseWebShare, sharePayload } from './sharing';
import { initConsent } from './consent';

const NOT_BIRTHDAY_MESSAGES = [
  'Aan het werk!',
  'Nog 364 dagen te gaan… 💪',
  'Trakteer jezelf dan maar op koffie ☕',
  'Geen taart vandaag, alleen spreadsheets 🍰➡️📄',
  'Je baas wacht! 😏',
  'Ach joh, iedere dag is een feestje 🎉 (behalve vandaag).',
  'Probeer het morgen nog eens 🤷‍♂️',
  'Niet jarig, wél bijzonder ❤️',
  'Jarig? Nee. Productief? Hopelijk wel.',
  'Sorry, geen confetti — alleen deadlines 🎯',
  'Je kunt nog altijd doen alsof. Niemand merkt het.',
  'Taartloos, maar niet waardeloos 🍰❌',
  'Vier vandaag dat je níet oud wordt! 🧓➡️🚫',
  'De hamster van iemand anders is misschien wel jarig 🐹🎈',
  'Je hebt geen reden voor taart, maar wel voor koffie.',
  'Geen feestje, wel facturen. 🧾',
  'Toch maar een toetje nemen vanavond? 🥧',
  'Nog even volhouden… je moment komt eraan.',
  'Het is vast iemands verjaardag — gewoon niet de jouwe.',
  'Geen verjaardagskaarsjes, wel gaslicht van de energierekening 🕯️💸',
  'Trakteer je collega’s dan maar op je glimlach 🙂',
  'De wereld draait door. Jij ook vandaag.',
  'Geen taart, maar wel een stukje realiteit 🍽️',
  'Iedere dag is een cadeautje 🎁 (sommige alleen wat minder leuk ingepakt).',
  'Misschien ben je op een andere planeet wél jarig. 🚀',
  'Gefeliciteerd met… dinsdag.',
  'Vandaag geen feest, wel verse kansen 🌱',
  'Geen verjaardagskaarsjes, maar wel een browser-tabje meer.',
  'Jarig in je hart telt ook, toch? 💖',
  'Tijd om iets nuttigs te doen. Of Netflix. Jij beslist.'
];

function randomNotBirthdayMessage() {
  const idx = Math.floor(Math.random() * NOT_BIRTHDAY_MESSAGES.length);
  return NOT_BIRTHDAY_MESSAGES[idx];
}

const BIRTHDAY_MESSAGES = [
  'Happy Birthday! 🥳',
  'Gefeliciteerd met het ouder worden — alweer! 🎈',
  'Tijd voor taart, drama en aandacht 🍰✨',
  'Vandaag mág alles (behalve volwassen doen) 😜',
  'Nog één dag dichter bij korting op de bus 🚌🎉',
  'Je bent officieel vintage 👴👵',
  'Vier het alsof je geen verplichtingen hebt 🎊',
  'Eén dag per jaar dat je legaal mag glimmen 🌟',
  'Je innerlijke kind heeft vandaag vrijaf 👶🎂',
  'Kaarsjes uitblazen, wensen aanzetten 💫',
  'Gefeliciteerd! Je respawn was succesvol 🕹️',
  'Nog één rondje om de zon overleefd ☀️👏',
  'Tijd om de realiteit te negeren en taart te eten 🍰',
  'Maak van vandaag een “sorry ik ben jarig”-dag 🙃',
  'Hoera! Weer een jaartje dichter bij pensioen 🎉',
  'De wereld is vandaag officieel een stukje ouder. En jij dus ook. 🌍',
  'Je bent niet oud, je bent goed gerijpt 🍷',
  'Vandaag hoef je niks te doen — behalve genieten (en eten) 😋',
  'Gefeliciteerd, legende! 🏆',
  'Doe alsof je verrast bent 🎁😅',
  'Tijd om je innerlijke diva los te laten 💅',
  'Vandaag mag je alles bestellen met “want ik ben jarig” 🍕🍾',
  'Vier het groot! (Of klein. Je browser weet het niet.)',
  'Jij verdient confetti. Veel confetti. 🎊',
  'Nog even en je krijgt een lifetime achievement award 🎖️'
];

function randomBirthdayMessage() {
  const idx = Math.floor(Math.random() * BIRTHDAY_MESSAGES.length);
  return BIRTHDAY_MESSAGES[idx];
}

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
      <p>© 2025 benikvandaagjarig.nl<br/>Gemaakt door Robert Postma<br/>Contact: info@benikvandaagjarig.nl</p>
      <p class="muted">Laatste update: september 2025<br/><a href="/privacy.html">Privacyverklaring</a></p>
    </div>
  `;
  // Insert footer directly after <main> so it stays outside the content containers
  const mainEl = document.querySelector('main');
  if (mainEl && mainEl.parentNode) {
    mainEl.parentNode.insertBefore(footer, mainEl.nextSibling);
  } else {
    document.body.appendChild(footer);
  }
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

  // Modal root inserted inside <main> so the result appears directly after the form in DOM order
  const mainEl = qs('main') as HTMLElement | null;
  let modalRoot = document.getElementById('modal-root') as HTMLElement | null;
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    modalRoot.className = 'hidden';
    // Prefer inserting the modal root right after the app mount inside <main>
    const appEl = qs('#app') as HTMLElement | null;
    if (appEl && appEl.parentNode) {
      appEl.parentNode.insertBefore(modalRoot, appEl.nextSibling);
    } else if (mainEl) {
      mainEl.appendChild(modalRoot);
    } else {
      document.body.appendChild(modalRoot);
    }
  }

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
        const liveHost = qs('#app') as HTMLElement | null;
        (liveHost ?? document.body).appendChild(live);
      }
      live.textContent = msg;
      setTimeout(() => { if (live) { live.textContent = ''; } }, 2000);
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
    try {
      const _app = qs('#app') as HTMLElement | null;
      if (_app) _app.removeAttribute('aria-hidden');
    } catch { /* ignore */ }

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
        modalRoot.className = 'leap-year';
        setHtml(modalRoot, `
          <section role="region" aria-label="Resultaat" class="container-result" aria-live="polite">
            <div class="result-particles" aria-hidden="true">
              <span class="p"></span><span class="p"></span><span class="p"></span>
              <span class="p"></span><span class="p"></span>
            </div>

            <h2 id="result-heading" class="result-title">🗓️ Bijzondere situatie!</h2>

            <p class="result-line">Jouw verjaardag (29 februari) bestaat alleen in schrikkeljaren!</p>

            <p class="result-sub">Vier je vandaag op 28 februari of wacht je tot 1 maart?</p>

            <div class="age-display">Je bent ${res.age ?? '-'} jaar oud</div>

            <div class="result-actions" role="group" aria-label="Deel dit">
              ${generateShareHtml(false)}
            </div>
          </section>
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying app container as hidden to screen readers while dialog is visible
        try {
          const _app = qs('#app') as HTMLElement | null;
          if (_app) _app.setAttribute('aria-hidden', 'true');
        } catch { /* ignore */ }
        // Heading remains a static <h2> for semantics; avoid programmatic focus to prevent visual focus outline.
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          // No tabindex/focus here — dialog has role="dialog" and aria-labelledby for accessibility.
        }
      } else if (res.isBirthday) {
        modalRoot.className = 'result birthday';
        setHtml(modalRoot, `
          <section role="region" aria-label="Resultaat" class="container-result theme-rose" aria-live="polite">
            <div class="result-particles" aria-hidden="true">
              <span class="p"></span><span class="p"></span><span class="p"></span>
              <span class="p"></span><span class="p"></span>
            </div>

            <h2 id="result-heading" class="result-title">🎉 GEFELICITEERD!</h2>

            <p class="result-line">Ja! Je bent vandaag ${res.age} jaar geworden!</p>

            <p class="result-sub">
              <span aria-hidden="true">🎂</span>
              Proficiat met je verjaardag!
              <span aria-hidden="true">🎈</span>
            </p>

            <h3 class="result-line en">${randomBirthdayMessage()}</h3>

            <div class="result-actions" role="group" aria-label="Deel dit">
              ${generateShareHtml(true)}
            </div>
          </section>
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying app container as hidden to screen readers while dialog is visible
        try {
          const _app = qs('#app') as HTMLElement | null;
          if (_app) _app.setAttribute('aria-hidden', 'true');
        } catch { /* ignore */ }
        // Heading remains a static <h2> for semantics; avoid programmatic focus to prevent visual focus outline.
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          // No tabindex/focus here — dialog has role="dialog" and aria-labelledby for accessibility.
        }

        // Celebration effects (only after user interaction allowed for sound)
        triggerConfetti();
      } else {
        modalRoot.className = 'result not-birthday';
        setHtml(modalRoot, `
          <h2 id="result-heading">😔 Nee, je bent niet jarig</h2>
          <p>Helaas! Vandaag is niet jouw verjaardag.</p>
          <p><strong>${randomNotBirthdayMessage()}</strong></p>
          <div class="age-display">Je bent ${res.age ?? '-'} jaar oud</div>
          ${generateShareHtml(false)}
        `);
        modalRoot.setAttribute('role', 'dialog');
        modalRoot.setAttribute('aria-modal', 'true');
        modalRoot.setAttribute('aria-labelledby', 'result-heading');
        // Mark underlying app container as hidden to screen readers while dialog is visible
        try {
          const _app = qs('#app') as HTMLElement | null;
          if (_app) _app.setAttribute('aria-hidden', 'true');
        } catch (e) { /* ignore */ }
        // Heading remains a static <h2> for semantics; avoid programmatic focus to prevent visual focus outline.
        const headingEl = modalRoot.querySelector('#result-heading') as HTMLElement | null;
        if (headingEl) {
          // No tabindex/focus here — dialog has role="dialog" and aria-labelledby for accessibility.
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
