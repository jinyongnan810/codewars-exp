// https://www.codewars.com/kata/584dee06fe9c9aef810001e8/train/javascript
// https://www.codewars.com/kata/584dee06fe9c9aef810001e8/solutions/javascript
// "1","5","6","25","76","376","625","9376","90625","109376","890625","2890625","7109376"
const greenCache: bigint[] = [1n, 5n, 6n];
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

function green(n: number): BigInt {
  console.log(`n:${n}`);
  if (n <= greenCache.length) {
    return greenCache[n - 1];
  }
  for (let i = greenCache.length; i < n; ) {
    const prev1 = greenCache[i - 1];
    const ptn1: bigint = prev1;
    let ptn2: bigint = 1n;
    // console.log(JSON.stringify(greenCache));
    for (let x = i - 2; x >= 1; x--) {
      // console.log(
      //   `prev1:${prev1},x:${x},i:${i},greenCache[x]:${greenCache[x]}`
      // );
      if (
        (prev1 - greenCache[x]) %
          BigInt(`1${"0".repeat(greenCache[x].toString().length)}`) !=
        0n
      ) {
        ptn2 = greenCache[x];
        break;
      }
    }
    // console.log(`prev1:${prev1},ptn2:${ptn2}`);
    const l1 = ptn1.toString().length;
    // console.log(`cache:${greenCache}`);
    const hit: bigint[] = [];
    for (let x = 1; x <= 9; x++) {
      const zeros: bigint = BigInt(`${x}${"0".repeat(l1)}`);
      const nextTry: bigint = ptn1 + zeros;
      const m = nextTry ** 2n;
      if ((m - nextTry) % BigInt(`1${"0".repeat(l1 + 1)}`) == 0n) {
        hit.push(nextTry);
        i++;
        break;
      }
    }
    for (let x = 1; x <= 9; x++) {
      const zeros: bigint = BigInt(`${x}${"0".repeat(l1)}`);
      const nextTry: bigint = ptn2 + zeros;
      const m = nextTry ** 2n;
      if ((m - nextTry) % BigInt(`1${"0".repeat(l1 + 1)}`) == 0n) {
        hit.push(nextTry);
        i++;
        break;
      }
    }
    hit
      .sort((a, b) => {
        return a > b ? 1 : -1;
      })
      .forEach((x) => greenCache.push(x));
  }
  return BigInt(greenCache[n - 1]);
}
