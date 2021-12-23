export function sumPairs(ints: number[], s: number): [number, number] | void {
  const findIndexBetween = (target: number, start: number, end: number) => {
    for (let i = start; i < end; i++) {
      if (ints[i] == target) return i;
    }
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
