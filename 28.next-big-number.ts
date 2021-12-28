export function nextBigger(n: number): number {
  const nStr = n.toString();
  // like 999
  if ((n + 1).toString().length > nStr.length) return -1;
  // like 9876543210
  if (
    nStr
      .split("")
      .sort((a, b) => Number(b) - Number(a))
      .join("") == nStr
  )
    return -1;
  for (let i = nStr.length - 2; i >= 0; i--) {
    const allPatterns: number[] = shuffle(nStr.slice(0, i), nStr.slice(i)).map(
      (x) => Number(x)
    );
    const largerThanN = allPatterns.filter((x) => x > n);
    if (largerThanN.length > 0) {
      const closest = largerThanN.reduce(
        (prev, cur) => (cur < prev ? cur : prev),
        Number.MAX_SAFE_INTEGER
      );
      return closest;
    }
  }

  return -1;
}
const shuffle = (first: string, rest: string): string[] => {
  if (rest.length === 1) return [first + rest];
  let res: string[] = [];
  for (let i = 0; i < rest.length; i++) {
    const shufflesOfTheRest = shuffle(
      rest.charAt(i),
      rest.slice(0, i) + rest.slice(i + 1)
    );
    res = [
      ...res,
      ...shufflesOfTheRest.map((shuffleOfTheRest) => first + shuffleOfTheRest),
    ];
  }
  return res;
};
