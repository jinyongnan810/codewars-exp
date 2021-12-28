export function nextBigger(n: number): number {
  const nStr = n.toString();
  // like 999
  if ((n + 1).toString().length > nStr.length) return -1;
  const allPatterns: number[] = shuffle("", nStr).map((x) => Number(x));
  const largerThanN = allPatterns.filter((x) => x > n);
  const closest = largerThanN.sort()[0];
  return closest ?? -1;
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
