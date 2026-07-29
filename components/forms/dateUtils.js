export const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function formatDate(date) {
  if (!date) return "";
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]} ${date.getFullYear()}`;
}

export function parseDate(str) {
  if (!str) return null;
  const m = String(str).trim().match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const monIdx = MONTH_ABBR.findIndex((mo) => mo.toLowerCase() === m[2].slice(0, 3).toLowerCase());
  if (monIdx < 0) return null;
  const year = parseInt(m[3], 10);
  const d = new Date(year, monIdx, day);
  return isNaN(d.getTime()) ? null : d;
}

export function sameDay(a, b) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
