// https://www.codewars.com/kata/52742f58faf5485cae000b9a/train/javascript
const YEAR_SECONDS = 3600 * 24 * 365;
const DAY_SECONDS = 3600 * 24;
const HOUR_SECONDS = 3600;
const MINUTE_SECONDS = 60;
function formatDuration(seconds: number) {
  if (seconds == 0) return "now";
  const res: string[] = [];

  const years = Math.floor(seconds / YEAR_SECONDS);
  seconds = seconds - years * YEAR_SECONDS;
  years > 0 && res.push(years > 1 ? `${years} years` : `${years} year`);

  const days = Math.floor(seconds / DAY_SECONDS);
  seconds = seconds - days * DAY_SECONDS;
  days > 0 && res.push(days > 1 ? `${days} days` : `${days} day`);

  const hours = Math.floor(seconds / HOUR_SECONDS);
  seconds = seconds - hours * HOUR_SECONDS;
  hours > 0 && res.push(hours > 1 ? `${hours} hours` : `${hours} hour`);

  const minutes = Math.floor(seconds / MINUTE_SECONDS);
  seconds = seconds - minutes * MINUTE_SECONDS;
  minutes > 0 &&
    res.push(minutes > 1 ? `${minutes} minutes` : `${minutes} minute`);

  seconds > 0 &&
    res.push(seconds > 1 ? `${seconds} seconds` : `${seconds} second`);

  if (res.length > 1) {
    const last = res.pop();
    const secondLast = res.pop();
    res.push(`${secondLast} and ${last}`);
  }
  if (res.length > 1) return res.join(", ");
  return res[0];
}
