export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function isValidDate(day: number, month: number, year: number): boolean {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export function calculateAge(day: number, month: number, year: number, now = new Date()): number {
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  let age = currentYear - year;
  const hasHadBirthdayThisYear = currentMonth > month || (currentMonth === month && currentDay >= day);
  if (!hasHadBirthdayThisYear) age--;
  return age;
}

export function isBirthdayToday(day: number, month: number, now = new Date()): boolean {
  return now.getDate() === day && (now.getMonth() + 1) === month;
}
