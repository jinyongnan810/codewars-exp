// https://www.codewars.com/kata/55b195a69a6cc409ba000053/train/javascript
const cache = { 0: 1, 1: 10, 2: 100 };
const cacheInc = {};
const cacheDec = {};
function totalIncDec(x) {
  console.log(`x=${x}`);
  // if (cache[x]) {
  //   return cache[x];
  // }
  let res = 0;
  for (let i = 0; i <= 9; i++) {
    const inc = getInc(i, x - 1);
    const dec = getDec(i, x - 1);
    console.log(`i=${i}: inc=${inc}, dec=${dec}, all:${inc + dec - 1}.`);
    // 77777 is inc & dec
    res += inc + dec - 1;
  }
  // cache[x] = res;
  return res;
}

const getInc = (current, digit) => {
  // console.log(`getInc: current:${current}, digit:${digit}`);
  // if (cacheInc[`${current}-${digit}`]) {
  //   return cacheInc[`${current}-${digit}`];
  // }
  if (digit == 1) {
    // cacheInc[`${current}-${digit}`] = 9 - current + 1;
    return 9 - current + 1;
  }
  let res = 0;
  for (let i = current; i <= 9; i++) {
    let iBefore = getInc(i, digit - 1);
    res += iBefore;
  }
  // cacheInc[`${current}-${digit}`] = res;
  return res;
};

// TODO: 00098,00998,... not counted
const getDec = (current, digit) => {
  // console.log(`getDec: current:${current}, digit:${digit}`);
  // if (cacheDec[`${current}-${digit}`]) {
  //   return cacheDec[`${current}-${digit}`];
  // }
  if (digit == 1) {
    // cacheDec[`${current}-${digit}`] = current + 1;
    return current + 1;
  }
  let res = 0;
  for (let i = current; i >= 0; i--) {
    const iBefore = getDec(i, digit - 1);
    res += iBefore;
  }
  // cacheDec[`${current}-${digit}`] = res;
  return res;
};

console.log(totalIncDec(3));
// console.log(JSON.stringify(cache));
// console.log(JSON.stringify(cacheInc));
// console.log(JSON.stringify(cacheDec));
