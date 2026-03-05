export function qs<T extends Element = Element>(selector: string, root: Document | HTMLElement = document): T | null {
  return root.querySelector(selector) as T | null;
}

export function qsa<T extends Element = Element>(selector: string, root: Document | HTMLElement = document): T[] {
  return Array.from(root.querySelectorAll(selector)) as T[];
}

export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  html?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag) as HTMLElementTagNameMap[K];
  Object.entries(attrs).forEach(([k, v]) => {
    try {
      el.setAttribute(k, v);
    } catch {
      // ignore invalid attributes
    }
  });
  if (html) el.innerHTML = html;
  return el;
}

export function setHtml(el: HTMLElement | null, html: string) {
  if (!el) return;
  el.innerHTML = html;
}

export function on(
  el: Element | Document | Window | null,
  event: string,
  handler: EventListener
) {
  if (!el || typeof (el as any).addEventListener !== 'function') return;
  el.addEventListener(event, handler);
}
