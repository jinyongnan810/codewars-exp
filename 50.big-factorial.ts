// https://www.codewars.com/kata/557f6437bf8dcdd135000010/train/javascript

function factorial(n: number) {
  if (cache[n.toString()]) return cache[n.toString()];
  if (n == 1) return "1";
  const f = multiply(factorial(n - 1), n.toString());
  cache[n.toString()] = f;
  return f;
}

const cache: { [n: string]: string } = {};

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
