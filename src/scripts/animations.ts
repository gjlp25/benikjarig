/* Balloons removed per user request. */

export async function triggerConfetti() {
  try {
    // lazy-load canvas-confetti
    const mod = await import('canvas-confetti');
    type ConfettiFn = {
      (_opts: Record<string, unknown>): void;
      create: (canvas: HTMLCanvasElement, opts: Record<string, unknown>) => ConfettiFn;
    };
    const confetti = (mod && (mod.default || mod)) as unknown as ConfettiFn;

    // Create a canvas that is not announced by screen readers
    const canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    // ensure canvas doesn't interfere with layout or a11y
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const confettiInstance = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const colors = ['#e8aeb7', '#b8e1ff', '#a9fff7', '#94fbab', '#82aba1'];

    confettiInstance({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });

    setTimeout(() => {
      confettiInstance({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors
      });
    }, 200);

    // Cleanup the canvas element after animations finish (best-effort)
    // canvas-confetti uses requestAnimationFrame/worker; removing the element is safe.
    const cleanupMs = 5000;
    setTimeout(() => {
      try {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      } catch {
        // ignore
      }
    }, cleanupMs);
  } catch {
    // graceful fallback: do nothing
    // console.warn('Confetti failed to load');
  }
}

/* Birthday sound removed per user request. */
