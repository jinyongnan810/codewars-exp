// https://www.codewars.com/kata/584dee06fe9c9aef810001e8/train/javascript
// "1","5","6","25","76","376","625","9376","90625","109376","890625","2890625","7109376"
const greenCache: string[] = ["1", "5", "6"];
// const greenCache: string[] = [
//   "1",
//   "5",
//   "6",
//   "25",
//   "76",
//   "376",
//   "625",
//   "9376",
//   "90625",
//   "109376",
//   "890625",
//   "2890625",
//   "7109376",
//   "12890625",
//   "87109376",
//   "212890625",
//   "787109376",
//   "1787109376",
//   "8212890625",
//   "18212890625",
//   "81787109376",
//   "918212890625",
//   "9918212890625",
//   "40081787109376",
//   "59918212890625",
//   "259918212890625",
//   "740081787109376",
//   "3740081787109376",
//   "6259918212890625",
//   "43740081787109376",
//   "56259918212890625",
//   "256259918212890625",
//   "743740081787109376",
//   "2256259918212890625",
//   "7743740081787109376",
//   "92256259918212890625",
//   "392256259918212890625",
//   "607743740081787109376",
//   "2607743740081787109376",
//   "7392256259918212890625",
//   "22607743740081787109376",
//   "77392256259918212890625",
//   "977392256259918212890625",
//   "9977392256259918212890625",
//   "19977392256259918212890625",
//   "619977392256259918212890625",
//   "6619977392256259918212890625",
// ];

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
    return BigInt(greenCache[n - 1]);
  }
  for (let i = greenCache.length; i < n; ) {
    const prev1 = greenCache[i - 1];
    const prev2 = greenCache[i - 2];
    const prev3 = greenCache[i - 3];
    const ptn1 = prev1;
    const ptn2 = prev1.endsWith(prev2) ? prev3 : prev2;
    const l1 = ptn1.length;
    // console.log(`i=${i}`);
    // console.log(`cache:${greenCache}`);
    const hit: string[] = [];
    for (let x = 1; x <= 9; x++) {
      const nextTry = sum(ptn1, `${x}${"0".repeat(l1)}`);
      const m = multiply(nextTry, nextTry);
      // console.log(`trying2:${nextTry}`);
      if (m.endsWith(nextTry)) {
        // console.log(`pushed:${nextTry}`);
        hit.push(nextTry);
        i++;
        break;
      }
    }
    for (let x = 1; x <= 9; x++) {
      const nextTry = sum(ptn2, `${x}${"0".repeat(l1)}`);
      // console.log(`trying1:${nextTry}`);
      const m = multiply(nextTry, nextTry);
      if (m.endsWith(nextTry)) {
        // console.log(`pushed:${nextTry}`);
        hit.push(nextTry);
        i++;
        break;
      }
    }
    hit
      .sort((a, b) => {
        if (a.length > b.length) return 1;
        else if (a.length < b.length) return -1;
        else return BigInt(a) > BigInt(b) ? 1 : -1;
      })
      .forEach((x) => greenCache.push(x));
  }
  return BigInt(greenCache[n - 1]);
}

console.log(green(47));
