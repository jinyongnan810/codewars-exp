// https://www.codewars.com/kata/55e7280b40e1c4a06d0000aa/train/typescript
export function chooseBestSum(
  t: number,
  k: number,
  ls: number[]
): number | null {
  console.log(`t:${t}, k:${k}, ls:${JSON.stringify(ls)}`);
  if (k > ls.length) return null;
  if (k == ls.length) return ls.reduce((p, c) => p + c, 0);
  cache = {};
  hitCache = 0;
  const allMatches = pickKItems(k, ls);
  let biggest = 0;
  for (let i = 0; i < allMatches.length; i++) {
    const sum = allMatches[i];
    if (sum == t) return t;
    if (sum > biggest && sum < t) biggest = sum;
  }
  console.log(`hit cache:${hitCache}`);
  return biggest == 0 ? null : biggest;
}
let cache: { [key: string]: number[] } = {};
let hitCache = 0;
const pickKItems = (k: number, list: number[]): number[] => {
  if (k == list.length) return [list.reduce((p, c) => p + c, 0)];
  if (k == 1) return list;
  if (cache[`${k}-${JSON.stringify(list)}`]) {
    hitCache++;
    return cache[`${k}-${JSON.stringify(list)}`];
  }
  let res: number[] = [];
  list.forEach((item, i) => {
    const restOfList = list.slice(i + 1, list.length);
    const pickKMinus1FromRest = pickKItems(k - 1, restOfList);
    [...new Set(pickKMinus1FromRest.map((x) => x + item))].forEach((x) =>
      res.push(x)
    );
  });
  res = [...new Set(res)];
  cache[`${k}-${JSON.stringify(list)}`] = res;
  return res;
};

const pickKItems_others = (k: number, list: number[]): number[][] => {
  const res: number[][] = [];
  const max = 1 << list.length;
  for (let i = 1; i < max; i++) {
    res.push(list.filter((_, index) => (i >> index) & 1));
  }
  return res.filter((x) => x.length == k);
};
