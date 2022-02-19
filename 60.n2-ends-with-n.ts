// https://www.codewars.com/kata/584dee06fe9c9aef810001e8/train/javascript
// "1","5","6","25","76","376","625","9376","90625","109376","890625","2890625","7109376"
const greenCache: BigInt[] = [1n, 5n, 6n];

// @ts-ignore
const multiply = (x: string, y: string): string => {
  let res = "0";
  for (let i = y.length - 1; i >= 0; i--) {
    const m = multiply1Digit(x, y[i]);
    const zeros = y.length - 1 - i;
    res = sum(res, m + (zeros > 0 ? "0".repeat(zeros) : ""));
  }
  return res;
};
// @ts-ignore
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
// @ts-ignore
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

function green(n: number): BigInt {
  if (n <= greenCache.length) {
    return greenCache[n - 1];
  }
  for (let i = greenCache.length; i < n; ) {
    const prev1 = greenCache[i - 1].toString();
    const prev2 = greenCache[i - 2].toString();
    const prev3 = greenCache[i - 3].toString();
    const ptn1 = prev1;
    const ptn2 = prev1.endsWith(prev2) ? prev3 : prev2;
    const l1 = ptn1.length;
    // console.log(`i=${i}`);
    // console.log(`cache:${greenCache}`);
    const hit: BigInt[] = [];
    for (let x = 1; x <= 9; x++) {
      const nextTry = sum(ptn1, `${x}${"0".repeat(l1)}`);
      const m = multiply(nextTry, nextTry);
      // console.log(`trying2:${nextTry}`);
      if (m.endsWith(nextTry)) {
        // console.log(`pushed:${nextTry}`);
        hit.push(BigInt(nextTry));
        i++;
        break;
      }
    }
    for (let x = 1; x <= 9; x++) {
      const nextTry = sum(ptn2.toString(), `${x}${"0".repeat(l1)}`);
      // console.log(`trying1:${nextTry}`);
      const m = multiply(nextTry, nextTry);
      if (m.endsWith(nextTry)) {
        // console.log(`pushed:${nextTry}`);
        hit.push(BigInt(nextTry));
        i++;
        break;
      }
    }
    hit.sort().forEach((x) => greenCache.push(x));
  }
  return greenCache[n - 1];
}

console.log(green(50));
