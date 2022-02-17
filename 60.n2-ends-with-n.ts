// https://www.codewars.com/kata/584dee06fe9c9aef810001e8/train/javascript
const cache: BigInt[] = [1n];

function green(n: number): BigInt {
  if (n <= cache.length) {
    return cache[n - 1];
  }
  for (let i = cache.length; i < n; i++) {
    let cur = n == 0 ? "0" : cache[i - 1].toString();
    while (true) {
      cur = sum(cur, "1");
      const m = multiply(cur, cur);
      if (m.endsWith(cur)) {
        cache.push(BigInt(cur));
        break;
      }
    }
  }
  return cache[n - 1];
}

const multiply = (x: string, y: string): string => {
  let res = "0";
  for (let i = y.length - 1; i >= 0; i--) {
    const m = multiply1Digit(x, y[i]);
    const zeros = y.length - 1 - i;
    res = sum(res, m + (zeros > 0 ? "0".repeat(zeros) : ""));
  }
  return res;
};
const multiply1Digit = (x: string, y: string): string => {
  const yNum = +y;
  const stack: number[] = [];
  let prevOverflow = 0;
  for (let i = x.length - 1; i >= 0; i--) {
    const m = +x[i] * yNum + prevOverflow;
    stack.push(m % 10);
    prevOverflow = Math.floor(m / 10);
  }
  if (prevOverflow != 0) stack.push(prevOverflow);
  return stack.reverse().join("");
};
const sum = (a: string, b: string): string => {
  if (a.length > b.length) b = b.padStart(a.length, "0");
  else a = a.padStart(b.length, "0");
  let plus1 = 0;
  const stack = [];
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + plus1;
    if (sum > 9) plus1 = 1;
    else plus1 = 0;
    stack.push((sum % 10).toString());
  }
  if (plus1 == 1) stack.push("1");
  return stack.reverse().join("");
};
