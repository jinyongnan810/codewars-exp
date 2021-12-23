export function sumPairs(ints: number[], s: number): [number, number] | void {
  let i = 0;
  let res: [number, number] | undefined = undefined;
  while (true) {
    for (; i < ints.length - 1; i++) {
      const num = ints[i];
      const rest = s - num;
      const restIndex = ints.indexOf(rest, i + 1);
      // if exists
      if (restIndex > i) {
        res = [num, rest];
        ints = ints.slice(i, restIndex);
        i = 0;
        break;
      }
    }
    if (i >= ints.length - 1) break;
  }
  return res;
}
