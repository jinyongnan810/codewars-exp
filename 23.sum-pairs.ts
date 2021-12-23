export function sumPairs(ints: number[], s: number): [number, number] | void {
  let res: [number, number] | undefined = undefined;
  let maxIndex = ints.length;
  for (let i = 0; i < maxIndex - 1; i++) {
    const num = ints[i];
    const rest = s - num;
    const restIndex = ints.indexOf(rest, i + 1);
    // if exists
    if (restIndex > i && restIndex < maxIndex) {
      res = [num, rest];
      maxIndex = restIndex;
    }
  }
  return res;
}
