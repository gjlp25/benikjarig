# Project Brief — benikvandaagjarig.nl

## 1. Summary
We are building a **fun, modern gimmick website** called **benikvandaagjarig.nl**.  
The concept is simple: a visitor enters their date of birth, and the site tells them if today is their birthday or not.  

⚠️ **Important:** the website's user interface, copy, and interactions must be in **Dutch**. This brief is in English only to align with the developer team.

---

## 2. Core Functionality
- **Date input** (day, month, year).
- **Logic**:
  - If today matches birth date → show a festive screen with "Gefeliciteerd!", falling balloons, confetti, and optionally a birthday song (play only after user interaction).
  - If not today → show "Nee je bent niet jarig. Aan het werk!" with a playful animation.
- **Responsive design**: must scale elegantly from mobile to desktop.
- **Social sharing**:
  - Provide share buttons (WhatsApp, Facebook, X/Twitter, LinkedIn).
  - Use Web Share API when available; fallback to share URLs.
  - OG image must change dynamically (birthday vs. not birthday).
- **Optional ads**: minimal, experimental, and only after user consent. Place ads only in the *not birthday* view.

---

## 3. Style & UX
- **Look & feel**: modern, playful, and lighthearted.  
- **Color palette** (provided by client):
  - `#e8aeb7` Cherry Blossom Pink  
  - `#b8e1ff` Uranian Blue  
  - `#a9fff7` Ice Blue  
  - `#94fbab` Light Green  
  - `#82aba1` Cambridge Blue  
  - Gradient usage encouraged for festive backgrounds.
- **Typography**: clean sans-serif (system fonts preferred for performance).  
- **Animations**:  
  - Balloons (CSS keyframes, GPU-friendly).  
  - Confetti (lazy-loaded JS lib, e.g. `canvas-confetti`).  
- **Accessibility**:
  - Respect `prefers-reduced-motion`.  
  - Semantic HTML, ARIA labels, strong contrast.  
  - Full keyboard navigation.

---

## 4. Technical Requirements
- **Framework**: ~~Next.js (React + TypeScript)~~ **UPDATED: Vanilla JS/HTML + Modern Tooling (Vite)**  
  - Vanilla approach chosen for optimal performance and viral sharing potential
  - Zero runtime overhead, instant loading
  - Optional TypeScript for development experience
- **Styling**: ~~TailwindCSS~~ **Modern CSS with custom properties**  
- **Animations**: **CSS animations + canvas-confetti**  
- **Hosting**: Vercel (preferred) with automatic deploys  
- **Analytics**: Plausible or Umami (privacy-friendly, cookieless)  
- **Ads**: Google AdSense (minimal) or EthicalAds, loaded *after consent*  
- **No PII**: Dates must not be stored; calculation happens client-side only  
- **Security headers**: HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options  

---

## 5. Edge Cases
- **Leap year birthdays (29-02)**:  
  - If no leap year → show a custom message:  
    "Jouw verjaardag bestaat alleen in schrikkeljaren. Vier je op 28-02 of 01-03?"  
  - Allow a default fallback (28 Feb).
- **Time zones**: use client's local date/time.  
- **Autoplay restrictions**: audio must only play after click.  

---

## 6. Accessibility & Performance
- **Lighthouse scores**: target ≥90 on Performance, Accessibility, SEO, Best Practices.  
- **JS bundle**: <50 KB gzipped (vanilla approach makes this easy).  
- **Fonts**: System font stack for instant loading, `display=swap` if custom fonts needed.  
- **Confetti**: loaded only if user is "jarig".  
- **Consent**: GDPR compliant; ads/analytics only after opt-in.

---

## 7. Social Sharing
- **Platforms**: WhatsApp, Facebook, X/Twitter, LinkedIn.  
- **Texts**:  
  - Birthday: "🎉 Ik ben vandaag jarig! Check het zelf op benikvandaagjarig.nl"  
  - Not birthday: "Nee, ik ben niet jarig… Ben jij het wel? 👉 benikvandaagjarig.nl"  
- **Dynamic OG images**:  
  - Birthday → festive balloons/confetti.  
  - Not birthday → minimalist, tongue-in-cheek design.  

---

## 8. Suggested Architecture

### **Modern Vanilla Setup (Recommended)**
```
benikvandaagjarig/
├── public/
│   ├── og-birthday.jpg
│   ├── og-not-birthday.jpg
│   └── favicon.ico
├── src/
│   ├── index.html
│   ├── styles/
│   │   ├── main.css
│   │   └── animations.css
│   ├── scripts/
│   │   ├── birthday-logic.js
│   │   ├── animations.js
│   │   └── sharing.js
│   └── utils/
│       └── date-helpers.js
├── vite.config.js
└── package.json
```

### **Key Files**
- `index.html` - Main entry point
- `birthday-logic.js` - Core date checking logic
- `animations.js` - Confetti, balloons, celebrations
- `sharing.js` - Social media integration
- `main.css` - Styling with CSS custom properties

---

## 9. Design Reference & Implementation

### **Base Design**
The complete UI/UX design and functionality has been prototyped in **`index.html`**. This file contains:
- ✅ Complete working birthday detection logic
- ✅ UI implementation with specified color palette
- ✅ All celebration animations and effects (balloons, confetti, sound)
- ✅ Responsive design patterns (mobile-first)
- ✅ Social sharing functionality
- ✅ Accessibility features (keyboard nav, screen readers, reduced motion)
- ✅ Dutch language interface
- ✅ Leap year handling
- ✅ Age calculation and display

### **Implementation Guidelines**
**This `index.html` should be used as the design foundation** when building the production version. Key aspects to maintain:

1. **Visual Design**: Exact color palette, gradients, spacing, and typography
2. **Animations**: Balloon floating, confetti timing, bounce effects
3. **User Flow**: Form validation, loading states, result display
4. **Accessibility**: All ARIA labels, keyboard navigation, and motion preferences
5. **Performance**: Lazy-loaded confetti, efficient animations, minimal bundle

### **Production Enhancements Needed**
From the prototype, add:
- [ ] Proper meta tags and SEO optimization
- [ ] Dynamic OG image generation
- [ ] Analytics integration (Plausible/Umami)
- [ ] GDPR consent management
- [ ] Ad placement (non-birthday view only)
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Build process optimization

---

## 10. Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Time to Interactive**: <3s
- **Cumulative Layout Shift**: <0.1
- **Bundle Size**: <50 KB gzipped (main bundle)
- **Lighthouse Score**: 95+ across all metrics

---

## 11. Launch Checklist
- [ ] Domain setup (benikvandaagjarig.nl)
- [ ] SSL certificate configuration
- [ ] Analytics implementation
- [ ] Social media meta tags
- [ ] OG image generation
- [ ] GDPR compliance
- [ ] Performance optimization
- [ ] Accessibility testing
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Load testing
- [ ] SEO optimization

---

## 12. Post-Launch Considerations
- **Viral Optimization**: Monitor sharing patterns, optimize for speed
- **Content Updates**: Seasonal themes, special occasions
- **Feature Extensions**: Age milestones, zodiac signs, fun facts
- **Monetization**: Ethical ad placement, affiliate partnerships
- **Analytics**: Track engagement, sharing rates, return visits

---

**Project Goal**: Create a delightful, shareable experience that brings a moment of joy to users while showcasing modern web development practices.