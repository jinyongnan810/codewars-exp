export function chooseBestSum(
  t: number,
  k: number,
  ls: number[]
): number | null {
  console.log(`t:${t}, k:${k}, ls:${JSON.stringify(ls)}`);
  if (k > ls.length) return null;
  if (k == ls.length) return ls.reduce((p, c) => p + c, 0);
  const allMatches = pickKItems(k, ls);
  let biggest = 0;
  for (let i = 0; i < allMatches.length; i++) {
    const sum = allMatches[i].reduce((p, c) => p + c, 0);
    if (sum == t) return t;
    if (sum > biggest && sum < t) biggest = sum;
  }
  return biggest == 0 ? null : biggest;
}
const pickKItems = (k: number, list: number[]): number[][] => {
  if (k == list.length) return [list];
  if (k == 1) return list.map((x) => [x]);
  const res: number[][] = [];
  list.forEach((item, i) => {
    const restOfList = [...list.slice(0, i), ...list.slice(i + 1, list.length)];
    const pickKMinus1FromRest = pickKItems(k - 1, restOfList);
    pickKMinus1FromRest.map((x) => [item, ...x]).forEach((x) => res.push(x));
  });
  return res;
};
