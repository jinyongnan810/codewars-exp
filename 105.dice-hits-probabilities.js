// https://www.codewars.com/kata/56f852635d7c12fb610013d7/train/javascript
function regSumHits(n, sides) {
  const res = {};
  const allVariations = sides ** n;
  for (let i = 0; i < allVariations; i++) {
    let sum = 0;
    let tmp = i;

    let log = [];
    for (let x = 0; x < n; x++) {
      if (tmp == 0) {
        sum += 1;
        log.push(1);
        continue;
      }
      const current = Math.floor((tmp % sides ** (x + 1)) / sides ** x);
      tmp -= current * sides ** x;
      sum += current + 1;
      log.push(current + 1);
    }
    console.log(`i:${i}, dices:${JSON.stringify(log)}, sum:${sum}}`);
    res[sum] = res[sum] ? res[sum] + 1 : 1;
  }
  const array = Object.entries(res).map(([key, value]) => {
    const sum = Number.parseInt(key);
    return [sum, value];
  });
  return array;
}
