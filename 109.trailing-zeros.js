"use strict";
// https://www.codewars.com/kata/52f787eb172a8b4ae1000a34/train/javascript
const cache = {
  100000000: { twos: 99999988, fives: 24999999 },
  200000000: { twos: 199999988, fives: 49999998 },
  300000000: { twos: 299999990, fives: 74999998 },
  400000000: { twos: 399999988, fives: 99999997 },
  500000000: { twos: 499999987, fives: 124999999 },
  600000000: { twos: 599999990, fives: 149999998 },
  700000000: { twos: 699999988, fives: 174999997 },
  800000000: { twos: 799999988, fives: 199999997 },
  900000000: { twos: 899999988, fives: 224999997 },
  1000000000: { twos: 999999987, fives: 249999998 },
};
function zeros(n) {
  console.log(n);
  const largestCache = Object.keys(cache)
    .map((s) => parseInt(s))
    .sort((a, b) => b - a)
    .filter((i) => i <= n)[0];
  console.log(`largestCache:${largestCache}`);
  // let twos = largestCache ? cache[largestCache].twos : 0;
  let fives = largestCache ? cache[largestCache].fives : 0;
  for (let i = largestCache ? largestCache + 1 : 2; i <= n; i++) {
    let tmp = i;
    // while (tmp % 2 == 0) {
    //   twos++;
    //   tmp /= 2;
    // }
    while (tmp % 5 == 0) {
      fives++;
      tmp /= 5;
    }
  }

  // const res = Math.min(twos, fives);
  const res = fives;

  // cache[n] = { twos: twos, fives: fives };
  cache[n] = { fives: fives };
  return res;
}

const main = () => {
  console.log(zeros(100000000));
  console.log(zeros(200000000));
  console.log(zeros(300000000));
  console.log(zeros(400000000));
  console.log(zeros(500000000));
  console.log(zeros(600000000));
  console.log(zeros(700000000));
  console.log(zeros(800000000));
  console.log(zeros(900000000));
  console.log(zeros(1000000000));
  console.log(JSON.stringify(cache));
};
main();
