// https://www.codewars.com/kata/541af676b589989aed0009e7/train/javascript
const countChange = function (money: number, coins: number[]): number {
  if (coins.every((c) => c > money)) return 0;
  if (coins.length == 1) return money % coins[0] == 0 ? 1 : 0;
  const coinsSorted = coins.sort((a, b) => b - a);
  const firstCoin = coinsSorted[0];
  const maxFirstCoin = Math.floor(money / firstCoin);
  let res = 0;

  if (maxFirstCoin == money / firstCoin) res++;
  for (let i = maxFirstCoin; i >= 0; i--) {
    const subres = countChange(money - i * firstCoin, coinsSorted.slice(1));
    res += subres;
    // console.log(`firstCoin:${firstCoin},i=${i},money=${money - i * firstCoin},subres=${subres}`)
  }

  return res;
};
// console.log(JSON.stringify(countChange(10, [5,2,3])))

const countChangeVariation = function (
  money: number,
  coins: number[]
): string[] {
  if (coins.every((c) => c > money)) return [];
  if (coins.length == 1)
    return money % coins[0] == 0 ? [`${coins[0]}*${money / coins[0]}`] : [];
  const coinsSorted = coins.sort((a, b) => b - a);
  const firstCoin = coinsSorted[0];
  const maxFirstCoin = Math.floor(money / firstCoin);
  let res: string[] = [];

  if (maxFirstCoin == money / firstCoin)
    res.push(`${firstCoin}*${maxFirstCoin}`);
  for (let i = maxFirstCoin; i >= 0; i--) {
    const subres = countChangeVariation(
      money - i * firstCoin,
      coinsSorted.slice(1)
    );
    subres.forEach((r) => {
      res.push(i > 0 ? `${firstCoin}*${i}, ${r}` : `${r}`);
    });
    // console.log(`firstCoin:${firstCoin},i=${i},money=${money - i * firstCoin},subres=${subres}`)
  }

  return res;
};
console.log(JSON.stringify(countChangeVariation(10, [5, 2, 3])));
