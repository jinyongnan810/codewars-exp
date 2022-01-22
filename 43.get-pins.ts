// https://www.codewars.com/kata/5263c6999e0f40dee200059d/train/javascript
class NumKey {
  value: string;
  left?: NumKey;
  top?: NumKey;
  right?: NumKey;
  down?: NumKey;
  constructor(value: string) {
    this.value = value;
  }
}
const keys = "0123456789".split("").map((num) => new NumKey(num));
keys[0].top = keys[8];
keys[8].down = keys[0];
for (let i = 1; i <= 9; i++) {
  // left
  if (i % 3 != 1) keys[i].left = keys[i - 1];
  // top
  if (i > 3) keys[i].top = keys[i - 3];
  // right
  if (i % 3 != 0) keys[i].right = keys[i + 1];
  // down
  if (i < 7) keys[i].down = keys[i + 3];
}

const getAllPairs = (arr: string[][]): string[] => {
  if (arr.length > 1) {
    const rest = getAllPairs(arr.slice(1));
    const cur = arr[0];
    const res: string[] = [];
    for (let i = 0; i < cur.length; i++) {
      rest.forEach((r) => res.push(cur[i] + r));
    }
    return res;
  }
  return arr[0];
};

function getPINs(observed: string): string[] {
  const allPossibles: string[][] = observed.split("").map((char) => {
    const possibles: string[] = [];
    const num = +char;
    const key = keys[num];
    possibles.push(key.value);
    if (key.left) possibles.push(key.left.value);
    if (key.top) possibles.push(key.top.value);
    if (key.right) possibles.push(key.right.value);
    if (key.down) possibles.push(key.down.value);
    return possibles;
  });

  const res = getAllPairs(allPossibles);
  return res;
}
