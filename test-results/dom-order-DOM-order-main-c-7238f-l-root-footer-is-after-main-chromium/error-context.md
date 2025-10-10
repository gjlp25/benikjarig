# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e4]:
      - heading [level=1] [ref=e5]: 🎂 Ben ik vandaag jarig?
      - paragraph [ref=e6]: Voer je geboortedatum in en ontdek het!
      - generic [ref=e7]:
        - generic [ref=e8]:
          - generic [ref=e9]: Dag
          - spinbutton [active] [ref=e10]
        - generic [ref=e11]:
          - generic [ref=e12]: Maand
          - spinbutton [ref=e13]
        - generic [ref=e14]:
          - generic [ref=e15]: Jaar
          - spinbutton [ref=e16]
        - button [ref=e17] [cursor=pointer]: 🎉 Check of ik jarig ben!
    - dialog "Wij gebruiken analytics om anonieme gebruiksstatistieken te verzamelen. Accepteer je analytics?" [ref=e18]:
      - generic [ref=e19]: Wij gebruiken analytics om anonieme gebruiksstatistieken te verzamelen. Accepteer je analytics?
      - generic [ref=e20]:
        - button "Accepteer" [ref=e21] [cursor=pointer]
        - button "Weiger" [ref=e22] [cursor=pointer]
      - link "Lees meer over privacy en analytics" [ref=e23] [cursor=pointer]:
        - /url: /privacy.html
        - text: Privacy
  - contentinfo [ref=e24]:
    - generic [ref=e25]:
      - paragraph [ref=e26]:
        - text: © 2025 benikvandaagjarig.nl
        - text: Gemaakt door Robert Postma
        - text: "Contact: info@benikvandaagjarig.nl"
      - paragraph [ref=e27]:
        - text: "Laatste update: september 2025"
        - link "Privacyverklaring" [ref=e28] [cursor=pointer]:
          - /url: /privacy.html
```