// https://www.codewars.com/kata/621f89cc94d4e3001bb99ef4/train/javascript
function dontGiveMeFive(start, end) {
  // const total = end - start + 1;
  // if (start / 5 > -10 && end / 5 < 10) {
  //   const fives = Math.trunc(end / 5) - Math.trunc(start / 5);
  //   const tens = Math.trunc(end / 10) - Math.trunc(start / 10);
  //   return total - fives + tens;
  // }
  // return 0;
  let res = 0;
  for (let i = start; i <= end; i++) {
    if (!/5/.test(i)) {
      res++;
    }
  }
  return res;
}

console.log(dontGiveMeFive(-17, 9));
console.log(dontGiveMeFive(1, 9));
console.log(dontGiveMeFive(4, 17));
console.log(dontGiveMeFive(-17, -4));

// solutions
// https://www.codewars.com/kata/621f89cc94d4e3001bb99ef4/solutions
