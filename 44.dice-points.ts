const scores: { key: string; score: number }[] = [
  { key: "111", score: 1000 },
  { key: "222", score: 200 },
  { key: "333", score: 300 },
  { key: "444", score: 400 },
  { key: "555", score: 500 },
  { key: "666", score: 600 },
  { key: "1", score: 100 },
  { key: "5", score: 50 },
];
function score(dice: number[]) {
  let res = 0;
  const sortedString = dice.sort((a, b) => a - b).join("");
  let tmp = sortedString;
  scores.forEach((s) => {
    const regex = new RegExp(s.key, "g");
    const matches = tmp.match(regex);
    res += s.score * (matches ? matches.length : 0);
    tmp = tmp.replace(regex, "");
  });
  return res;
}
