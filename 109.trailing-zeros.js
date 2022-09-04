"use strict";
// https://www.codewars.com/kata/52f787eb172a8b4ae1000a34/train/javascript
const cache = {};
function zeros(n) {
  console.log(n);
  const largestCache = Object.keys(cache)
    .map((s) => parseInt(s))
    .sort((a, b) => b - a)
    .filter((i) => i <= n)[0];
  let twos = largestCache ? cache[largestCache].twos : 0;
  let fives = largestCache ? cache[largestCache].fives : 0;
  for (let i = largestCache ? largestCache + 1 : 2; i <= n; i++) {
    let tmp = i;
    while (tmp % 2 == 0) {
      twos++;
      tmp /= 2;
    }
    while (tmp % 5 == 0) {
      fives++;
      tmp /= 5;
    }
  }

  const res = Math.min(twos, fives);

  cache[n] = { twos: twos, fives: fives };
  return res;
}

const main = () => {
  console.log(zeros(10000000));
};
main();
