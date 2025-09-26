(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();function g(e,n=document){return n.querySelector(e)}function C(e,n={},r){const i=document.createElement(e);return Object.entries(n).forEach(([t,a])=>i.setAttribute(t,a)),r&&(i.innerHTML=r),i}function y(e,n){e.innerHTML=n}function m(e,n,r){e.addEventListener(n,r)}function B(e){return e%4===0&&e%100!==0||e%400===0}function x(e,n,r){if(!Number.isInteger(e)||!Number.isInteger(n)||!Number.isInteger(r)||r<1900||r>new Date().getFullYear()||n<1||n>12)return!1;const i=new Date(r,n,0).getDate();return e>=1&&e<=i}function L(e,n,r,i=new Date){const t=i.getDate(),a=i.getMonth()+1;let l=i.getFullYear()-r;return a>n||a===n&&t>=e||l--,l}function $(e,n,r=new Date){return r.getDate()===e&&r.getMonth()+1===n}function D(e,n,r){return x(e,n,r)}function T(e,n,r,i=new Date){if(!x(e,n,r))return{isBirthday:!1,leapYearMessage:!1,age:null};const t=L(e,n,r,i);return n===2&&e===29&&!B(i.getFullYear())?{isBirthday:!1,leapYearMessage:!0,age:t}:{isBirthday:$(e,n,i),leapYearMessage:!1,age:t}}const A="modulepreload",N=function(e){return"/"+e},j={},S=function(n,r,i){if(!r||r.length===0)return n();const t=document.getElementsByTagName("link");return Promise.all(r.map(a=>{if(a=N(a),a in j)return;j[a]=!0;const s=a.endsWith(".css"),l=s?'[rel="stylesheet"]':"";if(!!i)for(let d=t.length-1;d>=0;d--){const o=t[d];if(o.href===a&&(!s||o.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${l}`))return;const c=document.createElement("link");if(c.rel=s?"stylesheet":A,s||(c.as="script",c.crossOrigin=""),c.href=a,document.head.appendChild(c),s)return new Promise((d,o)=>{c.addEventListener("load",d),c.addEventListener("error",()=>o(new Error(`Unable to preload CSS for ${a}`)))})})).then(()=>n()).catch(a=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a})};async function M(){try{const e=await S(()=>import("./confetti.module-20599fbc.js"),[]),n=e&&(e.default||e),r=["#e8aeb7","#b8e1ff","#a9fff7","#94fbab","#82aba1"];n({particleCount:100,spread:70,origin:{y:.6},colors:r}),setTimeout(()=>{n({particleCount:50,spread:60,origin:{y:.6},colors:r})},200)}catch{}}const b="https://benikvandaagjarig.nl";function Y(e){const n=e?"🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl":"Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl";if(navigator.share){navigator.share({title:"Ben ik vandaag jarig?",text:n,url:b}).catch(()=>{});return}const r=encodeURIComponent(n),i=`https://wa.me/?text=${r}`,t=`https://www.facebook.com/sharer/sharer.php?u=${b}`,a=`https://twitter.com/intent/tweet?text=${r}&url=${b}`,s=`https://www.linkedin.com/sharing/share-offsite/?url=${b}`;return{whatsapp:i,facebook:t,twitter:a,linkedin:s}}function v(e){const r=encodeURIComponent(e?"🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl":"Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl"),i=`https://wa.me/?text=${r}`,t=`https://www.facebook.com/sharer/sharer.php?u=${b}`,a=`https://twitter.com/intent/tweet?text=${r}&url=${b}`,s=`https://www.linkedin.com/sharing/share-offsite/?url=${b}`;return typeof navigator<"u"&&navigator.share?`
      <div class="share-buttons">
        <button class="share-btn whatsapp" data-share="whatsapp">📱 WhatsApp</button>
        <button class="share-btn facebook" data-share="facebook">📘 Facebook</button>
        <button class="share-btn twitter" data-share="twitter">🐦 X (Twitter)</button>
        <button class="share-btn linkedin" data-share="linkedin">💼 LinkedIn</button>
      </div>
    `:`
    <div class="share-buttons">
      <a href="${i}" target="_blank" class="share-btn whatsapp">📱 WhatsApp</a>
      <a href="${t}" target="_blank" class="share-btn facebook">📘 Facebook</a>
      <a href="${a}" target="_blank" class="share-btn twitter">🐦 X (Twitter)</a>
      <a href="${s}" target="_blank" class="share-btn linkedin">💼 LinkedIn</a>
    </div>
  `}const w="benikvandaag_consent";function _(){try{const e=localStorage.getItem(w);if(e==="granted"||e==="denied")return e}catch{}return null}function I(e){try{e===null?localStorage.removeItem(w):localStorage.setItem(w,e)}catch{}}function E(e="benikvandaagjarig.nl"){if(window.plausible)return;const n=document.createElement("script");n.defer=!0,n.setAttribute("data-domain",e),n.src="https://plausible.io/js/plausible.js",document.head.appendChild(n)}function O(e){const n=e?.container??document.body,r=e?.domain??"benikvandaagjarig.nl";if(document.getElementById("consent-banner"))return()=>{};const t=document.createElement("aside");t.id="consent-banner",t.setAttribute("role","dialog"),t.setAttribute("aria-live","polite"),t.setAttribute("aria-labelledby","consent-text"),t.style.position="fixed",t.style.left="1rem",t.style.right="1rem",t.style.bottom="1rem",t.style.zIndex="9999",t.style.background="var(--white, #fff)",t.style.border="1px solid rgba(0,0,0,0.08)",t.style.padding="1rem",t.style.borderRadius="8px",t.style.boxShadow="0 6px 20px rgba(0,0,0,0.08)",t.style.display="flex",t.style.alignItems="center",t.style.gap="0.75rem",t.style.flexWrap="wrap";const a=document.createElement("div");a.id="consent-text",a.innerText="Wij gebruiken analytics om anonieme gebruiksstatistieken te verzamelen. Accepteer je analytics?",a.style.flex="1 1 300px";const s=document.createElement("div");s.style.display="flex",s.style.gap="0.5rem";const l=document.createElement("button");l.type="button",l.innerText="Accepteer",l.className="btn btn-primary",l.style.cursor="pointer";const f=document.createElement("button");f.type="button",f.innerText="Weiger",f.className="btn btn-secondary",f.style.cursor="pointer";const c=document.createElement("a");c.href="/privacy",c.innerText="Privacy",c.style.alignSelf="center",c.setAttribute("aria-label","Lees meer over privacy en analytics"),s.appendChild(l),s.appendChild(f),t.appendChild(a),t.appendChild(s),t.appendChild(c);const d=document.activeElement;l.focus();function o(){t.remove(),d&&d.focus()}return l.addEventListener("click",()=>{I("granted"),E(r),o()}),f.addEventListener("click",()=>{I("denied"),o()}),n.appendChild(t),o}function P(e){if(_()==="granted"){E(e?.domain);return}const r=()=>O(e);"requestIdleCallback"in window?window.requestIdleCallback(r,{timeout:2e3}):setTimeout(r,1200)}function F(){const e=C("div",{class:"container"});return e.innerHTML=`
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

    <div id="result" class="hidden" role="dialog" aria-live="polite" aria-labelledby="result-heading"></div>
  `,e}function R(){const e=g("#app");if(!e)throw new Error("Mount point #app not found");const n=F();e.appendChild(n);const r=g("#birthdayForm"),i=g("#result"),t=g("#checkBtn"),a=g("#day"),s=g("#month"),l=g("#year"),f=new Date().getFullYear();l.max=String(f),a.focus();function c(){const d=parseInt(s.value)||1,o=parseInt(l.value)||f,u=new Date(o,d,0).getDate();a.max=String(u),parseInt(a.value||"0")>u?a.style.borderColor="#ef4444":a.style.borderColor="#e2e8f0"}m(s,"change",c),m(l,"change",c),m(a,"input",c),m(document,"keydown",d=>{const o=d;if(o.key==="Enter"&&o.target?.tagName==="INPUT"){const u=Array.from(document.querySelectorAll("input")),h=u.indexOf(o.target);h<u.length-1?(u[h+1].focus(),o.preventDefault()):t.focus()}}),m(i,"click",d=>{const o=d.target,u=o.getAttribute?.("data-share");if(!u)return;const h=!!o.closest(".result.birthday"),p=Y(h);if(!p)return;const k=p[u];k&&window.open(k,"_blank")}),m(r,"submit",d=>{d.preventDefault();const o=parseInt(a.value,10),u=parseInt(s.value,10),h=parseInt(l.value,10);if(!D(o,u,h)){alert("Vul alle velden in met een geldige datum!");return}t.disabled=!0,t.textContent="🔍 Even checken...",setTimeout(()=>{const p=T(o,u,h);p.leapYearMessage?(i.className="",y(i,`
          <div class="leap-year-message">
            <h2 id="result-heading">🗓️ Bijzondere situatie!</h2>
            <p>Jouw verjaardag (29 februari) bestaat alleen in schrikkeljaren!</p>
            <p>Vier je vandaag op 28 februari of wacht je tot 1 maart?</p>
            <div class="age-display">Je bent ${p.age??"-"} jaar oud</div>
            ${v(!1)}
          </div>
        `)):p.isBirthday?(i.className="result birthday",y(i,`
          <h2 id="result-heading" class="bounce">🎉 GEFELICITEERD!</h2>
          <p>Ja! Je bent vandaag ${p.age} jaar geworden!</p>
          <p>🎂 Proficiat met je verjaardag! 🎈</p>
          <div class="age-display">Happy Birthday! 🎊</div>
          ${v(!0)}
        `),M()):(i.className="result not-birthday",y(i,`
          <h2 id="result-heading">😔 Nee, je bent niet jarig</h2>
          <p>Helaas! Vandaag is niet jouw verjaardag.</p>
          <p><strong>Aan het werk!</strong> 💪</p>
          <div class="age-display">Je bent ${p.age??"-"} jaar oud</div>
          ${v(!1)}
        `)),i.classList.remove("hidden"),t.disabled=!1,t.textContent="🔄 Opnieuw checken",i.scrollIntoView({behavior:"smooth",block:"nearest"})},700)})}document.addEventListener("DOMContentLoaded",()=>{P(),R()});
