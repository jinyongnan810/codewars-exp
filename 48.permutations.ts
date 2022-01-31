// https://www.codewars.com/kata/5254ca2719453dcc0b00027d/train/javascript
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
function permutations(s: string) {
  const shuffled = shuffle("", s);
  return shuffled.filter((x, i) => shuffled.indexOf(x) == i);
}
