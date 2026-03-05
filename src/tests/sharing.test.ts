import { afterEach, describe, expect, test, vi } from 'vitest';
import { shouldUseWebShare } from '../scripts/sharing';

describe('shouldUseWebShare', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

    test('returns true for mobile User-Agent (iPhone)', () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0) AppleWebKit' } as unknown as Navigator);
    expect(shouldUseWebShare()).toBe(true);
  });

  test('returns true for platform "whatsapp" even when navigator is undefined', () => {
    vi.unstubAllGlobals();
    expect(shouldUseWebShare('whatsapp')).toBe(true);
  });

  test('returns false for unknown platform and no navigator', () => {
    vi.unstubAllGlobals();
    expect(shouldUseWebShare('desktop')).toBe(false);
  });

  test('handles navigator.share throwing (AbortError) gracefully', async () => {
    const fakeShare = vi.fn().mockRejectedValue(new Error('AbortError'));
    vi.stubGlobal('navigator', { userAgent: 'Desktop', share: fakeShare } as unknown as Navigator);

    const { openShareDialog } = await import('../scripts/sharing');
    // call the function and ensure it does not throw synchronously
    openShareDialog(true);
    // allow any microtasks to run
    await Promise.resolve();
    expect(fakeShare).toHaveBeenCalled();
  });
});
