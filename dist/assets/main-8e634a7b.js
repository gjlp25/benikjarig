/* empty css             */(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();function u(e,a=document){return a.querySelector(e)}function M(e,a={},n){const o=document.createElement(e);return Object.entries(a).forEach(([t,r])=>{try{o.setAttribute(t,r)}catch{}}),n&&(o.innerHTML=n),o}function E(e,a){e&&(e.innerHTML=a)}function w(e,a,n){!e||typeof e.addEventListener!="function"||e.addEventListener(a,n)}function q(e){return e%4===0&&e%100!==0||e%400===0}function D(e,a,n){if(!Number.isInteger(e)||!Number.isInteger(a)||!Number.isInteger(n)||n<1900||n>new Date().getFullYear()||a<1||a>12)return!1;const o=new Date(n,a,0).getDate();return e>=1&&e<=o}function J(e,a,n,o=new Date){const t=o.getDate(),r=o.getMonth()+1;let d=o.getFullYear()-n;return r>a||r===a&&t>=e||d--,d}function P(e,a,n=new Date){return n.getDate()===e&&n.getMonth()+1===a}function R(e,a,n){return D(e,a,n)}function Y(e,a,n,o=new Date){if(!D(e,a,n))return{isBirthday:!1,leapYearMessage:!1,age:null};const t=J(e,a,n,o);return a===2&&e===29&&!q(o.getFullYear())?{isBirthday:!1,leapYearMessage:!0,age:t}:{isBirthday:P(e,a,o),leapYearMessage:!1,age:t}}const O="modulepreload",G=function(e){return"/"+e},I={},V=function(a,n,o){if(!n||n.length===0)return a();const t=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=G(r),r in I)return;I[r]=!0;const s=r.endsWith(".css"),d=s?'[rel="stylesheet"]':"";if(!!o)for(let m=t.length-1;m>=0;m--){const f=t[m];if(f.href===r&&(!s||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${d}`))return;const p=document.createElement("link");if(p.rel=s?"stylesheet":O,s||(p.as="script",p.crossOrigin=""),p.href=r,document.head.appendChild(p),s)return new Promise((m,f)=>{p.addEventListener("load",m),p.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>a()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};async function H(){try{const e=await V(()=>import("./confetti.module-20599fbc.js"),[]),a=e&&(e.default||e),n=document.createElement("canvas");n.setAttribute("aria-hidden","true"),n.style.position="fixed",n.style.left="0",n.style.top="0",n.style.width="100%",n.style.height="100%",n.style.pointerEvents="none",document.body.appendChild(n);const o=a.create(n,{resize:!0,useWorker:!0}),t=["#e8aeb7","#b8e1ff","#a9fff7","#94fbab","#82aba1"];o({particleCount:100,spread:70,origin:{y:.6},colors:t}),setTimeout(()=>{o({particleCount:50,spread:60,origin:{y:.6},colors:t})},200),setTimeout(()=>{try{n.parentNode&&n.parentNode.removeChild(n)}catch{}},5e3)}catch{}}const S="https://benikvandaagjarig.nl";function L(e){return e?`${S}/?r=bday`:`${S}/?r=not`}function N(e){const a=e?"🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl":"Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl";return{title:"Ben ik vandaag jarig?",text:a,encoded:encodeURIComponent(a),url:L(e)}}function F(e){try{const a=typeof navigator<"u"?navigator.userAgent:"";return/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)||(e?["whatsapp","telegram"].includes(String(e).toLowerCase()):!1)}catch{return!1}}function x(e){const n=encodeURIComponent(e?"🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl":"Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl"),o=L(e),t=`https://wa.me/?text=${n}%20${encodeURIComponent(o)}`,r=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(o)}`,s=`https://twitter.com/intent/tweet?text=${n}&url=${encodeURIComponent(o)}`,d=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(o)}`,i=typeof navigator<"u"&&typeof navigator.share=="function"?'<button class="share-btn native-share" data-share="native" aria-label="Deel via je apparaat">🔗 Delen</button>':"";return`
    <div class="share-buttons">
      <a href="${t}" data-platform="whatsapp" class="share-btn whatsapp" target="_blank" rel="noopener noreferrer">📱 WhatsApp</a>
      <a href="${r}" data-platform="facebook" class="share-btn facebook" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
      <a href="${s}" data-platform="twitter" class="share-btn twitter" target="_blank" rel="noopener noreferrer">🐦 X (Twitter)</a>
      <a href="${d}" data-platform="linkedin" class="share-btn linkedin" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
      ${i}
    </div>
  `}const C="benikvandaag_consent";function z(){try{const e=localStorage.getItem(C);if(e==="granted"||e==="denied")return e}catch{}return null}function A(e){try{e===null?localStorage.removeItem(C):localStorage.setItem(C,e)}catch{}}function $(e){const a=e?.container??document.querySelector("main")??document.body,n=e?.container??document.querySelector("main")??document.body;if(document.getElementById("consent-banner"))return()=>{};const t=document.createElement("aside");t.id="consent-banner",t.setAttribute("role","region"),t.setAttribute("aria-labelledby","consent-text"),t.style.position="fixed",t.style.left="1rem",t.style.right="1rem",t.style.bottom="1rem",t.style.zIndex="9999",t.style.background="var(--white, #fff)",t.style.border="1px solid rgba(0,0,0,0.08)",t.style.padding="1rem",t.style.borderRadius="8px",t.style.boxShadow="0 6px 20px rgba(0,0,0,0.08)",t.style.display="flex",t.style.alignItems="center",t.style.gap="0.75rem",t.style.flexWrap="wrap";const r=document.createElement("div");r.id="consent-text",r.innerText="Wij gebruiken analytics om anonieme gebruiksstatistieken te verzamelen. Accepteer je analytics?",r.style.flex="1 1 300px";const s=document.createElement("div");s.style.display="flex",s.style.gap="0.5rem";const d=document.createElement("button");d.type="button",d.innerText="Accepteer",d.className="btn btn-primary",d.style.cursor="pointer";const i=document.createElement("button");i.type="button",i.innerText="Weiger",i.className="btn btn-secondary",i.style.cursor="pointer";const p=document.createElement("a");p.href="/privacy.html",p.innerText="Privacy",p.style.alignSelf="center",p.setAttribute("aria-label","Lees meer over privacy en analytics"),p.setAttribute("target","_blank"),p.setAttribute("rel","noopener noreferrer"),s.appendChild(d),s.appendChild(i),t.appendChild(r),t.appendChild(s),t.appendChild(p);const m=document.activeElement;d.focus();function f(){try{t.remove();try{const l=a&&(a.querySelector?a.querySelector("#app"):null);l&&l.removeAttribute&&l.removeAttribute("aria-hidden")}catch{}}catch{}m&&m.focus()}d.addEventListener("click",()=>{A("granted"),f()}),i.addEventListener("click",()=>{A("denied"),f()});try{const l=a&&(a.querySelector?a.querySelector("#app"):null);l&&l.setAttribute?(l.setAttribute("aria-hidden","true"),l.parentNode?l.parentNode.insertBefore(t,l.nextSibling):n.appendChild(t)):n.appendChild(t)}catch{}return f}function U(e){if(z()==="granted")return;const n=()=>$(e);"requestIdleCallback"in window?window.requestIdleCallback?.(n,{timeout:2e3}):setTimeout(n,1200)}function W(e){A(null);try{$(e)}catch{}}const T=["Aan het werk!","Nog 364 dagen te gaan… 💪","Trakteer jezelf dan maar op koffie ☕","Geen taart vandaag, alleen spreadsheets 🍰➡️📄","Je baas wacht! 😏","Ach joh, iedere dag is een feestje 🎉 (behalve vandaag).","Probeer het morgen nog eens 🤷‍♂️","Niet jarig, wél bijzonder ❤️","Jarig? Nee. Productief? Hopelijk wel.","Sorry, geen confetti — alleen deadlines 🎯","Je kunt nog altijd doen alsof. Niemand merkt het.","Taartloos, maar niet waardeloos 🍰❌","Vier vandaag dat je níet oud wordt! 🧓➡️🚫","De hamster van iemand anders is misschien wel jarig 🐹🎈","Je hebt geen reden voor taart, maar wel voor koffie.","Geen feestje, wel facturen. 🧾","Toch maar een toetje nemen vanavond? 🥧","Nog even volhouden… je moment komt eraan.","Het is vast iemands verjaardag — gewoon niet de jouwe.","Geen verjaardagskaarsjes, wel gaslicht van de energierekening 🕯️💸","Trakteer je collega’s dan maar op je glimlach 🙂","De wereld draait door. Jij ook vandaag.","Geen taart, maar wel een stukje realiteit 🍽️","Iedere dag is een cadeautje 🎁 (sommige alleen wat minder leuk ingepakt).","Misschien ben je op een andere planeet wél jarig. 🚀","Gefeliciteerd met… dinsdag.","Vandaag geen feest, wel verse kansen 🌱","Geen verjaardagskaarsjes, maar wel een browser-tabje meer.","Jarig in je hart telt ook, toch? 💖","Tijd om iets nuttigs te doen. Of Netflix. Jij beslist."];function K(){const e=Math.floor(Math.random()*T.length);return T[e]}const B=["Happy Birthday! 🥳","Gefeliciteerd met het ouder worden — alweer! 🎈","Tijd voor taart, drama en aandacht 🍰✨","Vandaag mág alles (behalve volwassen doen) 😜","Nog één dag dichter bij korting op de bus 🚌🎉","Je bent officieel vintage 👴👵","Vier het alsof je geen verplichtingen hebt 🎊","Eén dag per jaar dat je legaal mag glimmen 🌟","Je innerlijke kind heeft vandaag vrijaf 👶🎂","Kaarsjes uitblazen, wensen aanzetten 💫","Gefeliciteerd! Je respawn was succesvol 🕹️","Nog één rondje om de zon overleefd ☀️👏","Tijd om de realiteit te negeren en taart te eten 🍰","Maak van vandaag een “sorry ik ben jarig”-dag 🙃","Hoera! Weer een jaartje dichter bij pensioen 🎉","De wereld is vandaag officieel een stukje ouder. En jij dus ook. 🌍","Je bent niet oud, je bent goed gerijpt 🍷","Vandaag hoef je niks te doen — behalve genieten (en eten) 😋","Gefeliciteerd, legende! 🏆","Doe alsof je verrast bent 🎁😅","Tijd om je innerlijke diva los te laten 💅","Vandaag mag je alles bestellen met “want ik ben jarig” 🍕🍾","Vier het groot! (Of klein. Je browser weet het niet.)","Jij verdient confetti. Veel confetti. 🎊","Nog even en je krijgt een lifetime achievement award 🎖️"];function X(){const e=Math.floor(Math.random()*B.length);return B[e]}function Q(){const e=M("div",{class:"container"});return e.innerHTML=`
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

  `,e}function Z(){const e=document.createElement("footer");e.className="site-footer",e.innerHTML=`
    <div class="footer-inner">
      <p>© 2025 benikvandaagjarig.nl<br/>Gemaakt door Robert Postma<br/>Contact: info@benikvandaagjarig.nl</p>
      <p class="muted">Laatste update: september 2025<br/><a href="/privacy.html">Privacyverklaring</a></p>
      <p style="margin-top:8px;"><a href="#" id="withdraw-consent" class="muted">Verwijder toestemming</a></p>
    </div>
  `;const a=document.querySelector("main");a&&a.parentNode?a.parentNode.insertBefore(e,a.nextSibling):(u("#app")??document.body).appendChild(e);try{const n=e.querySelector("#withdraw-consent");n&&n.addEventListener("click",o=>{o.preventDefault();try{W({container:u("main")}),alert("Je toestemming is verwijderd. De consent-banner wordt opnieuw getoond.")}catch{}})}catch{}}function ee(){const e=u("#app");if(!e)throw new Error("Mount point #app not found");const a=Q();e.appendChild(a);const n=u("#birthdayForm"),o=u("#result"),t=u("#checkBtn"),r=u("#day"),s=u("#month"),d=u("#year");let i=document.getElementById("modal-root");i||(i=document.createElement("div"),i.id="modal-root",i.className="hidden",(u("main")??u("#app")??document.body).appendChild(i));const p=new Date().getFullYear();d.max=String(p),r.focus();function m(){const f=parseInt(s.value)||1,l=parseInt(d.value)||p,g=new Date(l,f,0).getDate();r.max=String(g),parseInt(r.value||"0")>g?r.style.borderColor="#ef4444":r.style.borderColor="#e2e8f0"}w(s,"change",m),w(d,"change",m),w(r,"input",m),w(document,"keydown",f=>{const l=f;if(l.key==="Enter"&&l.target?.tagName==="INPUT"){const g=Array.from(document.querySelectorAll("input")),y=g.indexOf(l.target);y<g.length-1?(g[y+1].focus(),l.preventDefault()):t.focus()}}),w(o,"click",f=>{const l=f.target,g=l.getAttribute?.("data-platform"),y=l.getAttribute?.("data-share");if(!g&&!y)return;const b=!!l.closest(".result.birthday");function v(h){let c=u("#share-live");c||(c=M("div"),c.id="share-live",c.setAttribute("aria-live","polite"),c.className="sr-only",(u("main")??u("#app")??document.body).appendChild(c)),c.textContent=h,setTimeout(()=>{c&&(c.textContent="")},2e3)}async function k(h){try{if(navigator.clipboard&&navigator.clipboard.writeText)return await navigator.clipboard.writeText(h),v("Link gekopieerd naar klembord"),!0}catch{}const c=document.createElement("textarea");c.value=h,c.setAttribute("aria-hidden","true"),c.style.position="fixed",c.style.left="-9999px",document.body.appendChild(c),c.select();try{return document.execCommand("copy"),v("Link gekopieerd naar klembord"),document.body.removeChild(c),!0}catch{return document.body.removeChild(c),alert("Kopieer deze link: "+h),!1}}if(y==="native"){const h=N(b);navigator.share?navigator.share({title:h.title,text:h.text,url:h.url}).catch(async()=>{await k(h.url)}):k(h.url);return}if(g){const h=l.closest("a"),c=h?h.href:l.getAttribute("href")||"";if(F(g)&&!!navigator.share){f.preventDefault();const j=N(b);navigator.share({title:j.title,text:j.text,url:j.url}).catch(()=>{c?window.open(c,"_blank"):k(j.url)})}else return}}),w(n,"submit",f=>{f.preventDefault();try{const b=u("#app");b&&b.removeAttribute("aria-hidden")}catch{}const l=parseInt(r.value,10),g=parseInt(s.value,10),y=parseInt(d.value,10);if(!R(l,g,y)){alert("Vul alle velden in met een geldige datum!");return}t.disabled=!0,t.textContent="🔍 Even checken...",setTimeout(()=>{const b=Y(l,g,y);if(b.leapYearMessage){i.className="leap-year",E(i,`
        <section class="container-result" aria-live="polite">
            <div class="result-particles" aria-hidden="true">
              <span class="p"></span><span class="p"></span><span class="p"></span>
              <span class="p"></span><span class="p"></span>
            </div>

            <h2 id="result-heading" class="result-title">🗓️ Bijzondere situatie!</h2>

            <p class="result-line">Jouw verjaardag (29 februari) bestaat alleen in schrikkeljaren!</p>

            <p class="result-sub">Vier je vandaag op 28 februari of wacht je tot 1 maart?</p>

            <div class="age-display">Je bent ${b.age??"-"} jaar oud</div>

            <div class="result-actions" role="group" aria-label="Deel dit">
              ${x(!1)}
            </div>
          </section>
        `),i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","result-heading");try{const v=u("#app");v&&v.setAttribute("aria-hidden","true")}catch{}i.querySelector("#result-heading")}else if(b.isBirthday){i.className="result birthday",E(i,`
          <section class="container-result theme-rose" aria-live="polite">
            <div class="result-particles" aria-hidden="true">
              <span class="p"></span><span class="p"></span><span class="p"></span>
              <span class="p"></span><span class="p"></span>
            </div>

            <h2 id="result-heading" class="result-title">🎉 GEFELICITEERD!</h2>

            <p class="result-line">Ja! Je bent vandaag ${b.age} jaar geworden!</p>

            <p class="result-sub">
              <span aria-hidden="true">🎂</span>
              Proficiat met je verjaardag!
              <span aria-hidden="true">🎈</span>
            </p>

            <h3 class="result-line en">${X()}</h3>

            <div class="result-actions" role="group" aria-label="Deel dit">
              ${x(!0)}
            </div>
          </section>
        `),i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","result-heading");try{const v=u("#app");v&&v.setAttribute("aria-hidden","true")}catch{}i.querySelector("#result-heading"),H()}else{i.className="result not-birthday",E(i,`
          <section class="container-result" aria-labelledby="result-heading">
            <h2 id="result-heading">😔 Nee, je bent niet jarig</h2>
            <p>Helaas! Vandaag is niet jouw verjaardag.</p>
            <p><strong>${K()}</strong></p>
            <div class="age-display">Je bent ${b.age??"-"} jaar oud</div>
            ${x(!1)}
          </section>
        `),i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.setAttribute("aria-labelledby","result-heading");try{const v=u("#app");v&&v.setAttribute("aria-hidden","true")}catch{}i.querySelector("#result-heading")}i.classList.remove("hidden"),t.disabled=!1,t.textContent="🔄 Opnieuw checken",i.scrollIntoView({behavior:"smooth",block:"nearest"})},700)})}document.addEventListener("DOMContentLoaded",()=>{U({container:u("main")}),ee(),Z()});
