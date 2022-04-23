// https://www.codewars.com/kata/5581e52ac76ffdea700000c1
const mapping: Record<string, number> = {
  "000": 0,
  "001": 1,
  "010": 1,
  "011": 1,
  "100": 1,
  "101": 0,
  "110": 0,
  "111": 0,
};
function rule30(list: number[], n: number): number[] {
  let tmp = list.join("");
  for (let i = 0; i < n; i++) {
    // pad border
    tmp = "0" + tmp + "0";
    // get iteration result
    const res = [];
    res.push(mapping["0" + tmp.slice(0, 2)]);
    for (let c = 1; c <= tmp.length - 2; c++) {
      res.push(mapping[tmp.slice(c - 1, c + 2)]);
    }
    res.push(mapping[tmp.slice(tmp.length - 2) + "0"]);
    tmp = res.join("");
    console.log(`interation ${i + 1}: ${tmp}`);
  }
  return tmp.split("").map((n) => Number(n));
}

function rule30_others(list: number[], n: number): number[] {
  if (n < 1) return list;
  const r30 = (a: number, b: number, c: number) => a ^ (b | c);
  list = Array(n).fill(0).concat(list, Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0, l = 0, m, r; j < list.length; j++) {
      [m, r] = [list[j], list[j + 1] || 0];
      [l, list[j]] = [m, r30(l, m, r)];
    }
  }
  return list;
}
