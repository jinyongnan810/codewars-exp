// https://www.codewars.com/kata/55b195a69a6cc409ba000053/train/javascript
function totalIncDec(x) {
  if (x == 0) return 1;
  if (x == 1) return 10;
  if (x == 2) return 100;
  let res = 0;
  for (let i = 1; i <= 9; i++) {
    const inc = getInc(i, x - 1);
    const dec = getDec(i, x - 1);
    console.log(`i=${i}: inc=${inc}, dec=${dec}.`);
    // 77777 is inc & dec
    res += inc + dec - 1;
  }
  return res;
}
const getInc = (current, digit) => {
  if (digit == 1) {
    return 9 - current + 1;
  }
  let res = 0;
  for (let i = current; i <= 9; i++) {
    res += getInc(i, digit - 1);
  }
  return res;
};

const getDec = (current, digit) => {
  if (digit == 1) {
    return current + 1;
  }
  let res = 0;
  for (let i = current; i >= 0; i--) {
    res += getDec(i, digit - 1);
  }
  return res;
};

console.log(totalIncDec(4));
