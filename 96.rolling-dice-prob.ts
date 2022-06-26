// https://www.codewars.com/kata/56f78a42f749ba513b00037f/train/javascript
function rolldiceSumProb(points: number, diceCount: number): number {
  // get all the possibilities
  const variations = getAllVariations(diceCount, points);
  console.log(variations);
  if (variations.length == 0) return 0;
  return variations.length / 6 ** diceCount;
}
const getAllVariations = (diceCount: number, points: number): number[][] => {
  // no variation
  if (points > diceCount * 6) return [];
  if (points <= 0) return [];
  // only 1 dice
  if (diceCount == 1) return [[points]];
  const res: number[][] = [];
  // 2 or more dice
  for (let i = 1; i <= 6; i++) {
    const variationsForRest = getAllVariations(diceCount - 1, points - i);
    if (variationsForRest.length > 0) {
      variationsForRest.forEach((v) => res.push([i, ...v]));
    }
  }
  return res;
};
console.log(rolldiceSumProb(8, 3));
