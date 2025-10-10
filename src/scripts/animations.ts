/* Balloons removed per user request. */

export async function triggerConfetti() {
  try {
    // lazy-load canvas-confetti
    const mod = await import('canvas-confetti');
    type ConfettiFn = (_opts: Record<string, unknown>) => void;
    const confetti = (mod && (mod.default || mod)) as unknown as ConfettiFn;

    const colors = ['#e8aeb7', '#b8e1ff', '#a9fff7', '#94fbab', '#82aba1'];

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors
      });
    }, 200);
  } catch {
    // graceful fallback: do nothing
    // console.warn('Confetti failed to load');
  }
}

/* Birthday sound removed per user request. */
