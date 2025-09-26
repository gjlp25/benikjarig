import { afterEach, describe, expect, test, vi } from 'vitest';
import { shouldUseWebShare } from '../scripts/sharing';

describe('shouldUseWebShare', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  test('returns true for mobile User-Agent (iPhone)', () => {
    vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0) AppleWebKit' } as any);
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
});
