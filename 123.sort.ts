// https://www.codewars.com/kata/55c45be3b2079eccff00010f/train/typescript
type Word = {
  word: String;
  n: number;
};
export function order(original: string): string {
  const words = original.split(" ").filter((x) => x != "");
  if (words.length == 0) return "";
  const converted = words.map<Word>((w) => {
    const matches = w.match(/\d/);
    if (matches == null) return { word: w, n: -1 };
    // const n = parseInt(matches[0]);
    const n = +matches[0];
    return { word: w, n: n };
  });
  return converted
    .sort((a, b) => a.n - b.n)
    .map((w) => w.word)
    .join(" ");
}
