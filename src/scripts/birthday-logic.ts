import { isLeapYear, calculateAge, isValidDate, isBirthdayToday } from '../utils/date-helpers';

export type BirthdayResult = {
  isBirthday: boolean;
  leapYearMessage: boolean;
  age: number | null;
};

export function validateInput(day: number, month: number, year: number): boolean {
  return isValidDate(day, month, year);
}

/**
 * Evaluate whether the provided date is a birthday today.
 * Returns an object describing the result, whether a special leap-year message is needed,
 * and the calculated age (or null if input invalid).
 */
export function evaluateBirthday(
  day: number,
  month: number,
  year: number,
  now = new Date()
): BirthdayResult {
  if (!isValidDate(day, month, year)) {
    return { isBirthday: false, leapYearMessage: false, age: null };
  }

  const age = calculateAge(day, month, year, now);

  // Special handling for 29 Feb birthdays
  if (month === 2 && day === 29) {
    const currentYearIsLeap = isLeapYear(now.getFullYear());
    if (!currentYearIsLeap) {
      return { isBirthday: false, leapYearMessage: true, age };
    }
  }

  const isBirthday = isBirthdayToday(day, month, now);
  return { isBirthday, leapYearMessage: false, age };
}
