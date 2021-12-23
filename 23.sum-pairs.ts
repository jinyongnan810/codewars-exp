// https://www.codewars.com/kata/54d81488b981293527000c8f/typescript
export function sumPairs(ints: number[], s: number): [number, number] | void {
  let findIndexCache: { [key: number]: number } = {};
  const findIndexBetween = (target: number, start: number, end: number) => {
    if (findIndexCache[target] != undefined) return findIndexCache[target];
    for (let i = start; i < end; i++) {
      if (ints[i] == target) {
        findIndexCache[target] = i;
        return i;
      }
    }
    findIndexCache[target] = -1;
    return -1;
  };
  let res: [number, number] | undefined = undefined;
  let maxIndex = ints.length;
  for (let i = 0; i < maxIndex; i++) {
    const restIndex = findIndexBetween(s - ints[i], i + 1, maxIndex);
    // if exists
    if (restIndex != -1) {
      res = [ints[i], s - ints[i]];
      maxIndex = restIndex;
    }
  }
  return res;
}

export function sumPairs_others(
  ints: number[],
  s: number
): [number, number] | void {
  const seen = new Set();
  for (const n of ints) {
    if (seen.has(s - n)) return [s - n, n];
    seen.add(n);
  }
}
