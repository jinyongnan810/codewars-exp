export function sumPairs(ints: number[], s: number): [number, number] | void {
  const findIndexBetween = (target: number, start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      if (ints[i] == target) return i;
    }
    return -1;
  };
  let res: [number, number] | undefined = undefined;
  let maxIndex = ints.length;
  for (let i = 0; i < maxIndex - 1; i++) {
    const num = ints[i];
    const rest = s - num;
    const restIndex = findIndexBetween(rest, i + 1, maxIndex - 1);
    // if exists
    if (restIndex != -1) {
      res = [num, rest];
      maxIndex = restIndex;
    }
  }
  return res;
}
