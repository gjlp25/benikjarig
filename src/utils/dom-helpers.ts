export function qs(selector: string, root: Document | HTMLElement = document) {
  return root.querySelector(selector);
}

export function qsa(selector: string, root: Document | HTMLElement = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  html?: string
) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (html) el.innerHTML = html;
  return el;
}

export function setHtml(el: HTMLElement, html: string) {
  el.innerHTML = html;
}

export function on(el: Element | Document | Window, event: string, handler: EventListener) {
  el.addEventListener(event, handler);
}
