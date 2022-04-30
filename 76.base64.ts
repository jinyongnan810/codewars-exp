// https://www.codewars.com/kata/5632e12703e2037fa7000061/train/javascript
const base64Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64toBase10(base64: string): number {
  const l = base64.length;
  return base64.split("").reduce((prev, cur, index) => {
    const currentValue = base64Chars.indexOf(cur) * 64 ** (l - index - 1);
    return prev + currentValue;
  }, 0);
}
