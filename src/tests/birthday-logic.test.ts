import { describe, it, expect } from 'vitest';
import { evaluateBirthday } from '../scripts/birthday-logic';

describe('birthday-logic', () => {
  it('returns true on the exact birthday and correct age', () => {
    // 11 Sep 1990 => on 11 Sep 2025 age should be 35
    const now = new Date(2025, 8, 11); // months are 0-indexed
    const res = evaluateBirthday(11, 9, 1990, now);
    expect(res.isBirthday).toBe(true);
    expect(res.age).toBe(35);
    expect(res.leapYearMessage).toBe(false);
  });

  it('handles leap year birthdays: returns leapYearMessage on non-leap current year', () => {
    // Birth on 29 Feb 2000, current year 2021 (not leap) -> special message
    const now = new Date(2021, 1, 28);
    const res = evaluateBirthday(29, 2, 2000, now);
    expect(res.isBirthday).toBe(false);
    expect(res.leapYearMessage).toBe(true);
    expect(res.age).toBe(20); // 2021-2000 minus not-yet-had-bday -> 20
  });

  it('validates invalid dates return age null', () => {
    // 31 April does not exist
    const now = new Date(2025, 0, 1);
    const res = evaluateBirthday(31, 4, 1990, now);
    expect(res.age).toBeNull();
    expect(res.isBirthday).toBe(false);
  });

  it('calculates age correctly when birthday has not yet happened this year', () => {
    // Birth 15 Dec 2000, current 1 Jun 2025 => age 24
    const now = new Date(2025, 5, 1);
    const res = evaluateBirthday(15, 12, 2000, now);
    expect(res.age).toBe(24);
    expect(res.isBirthday).toBe(false);
  });
});
