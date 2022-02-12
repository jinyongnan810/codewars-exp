// https://www.codewars.com/kata/51ba717bb08c1cd60f00002f/train/javascript
function solution(list: number[]): string {
  const res: string[] = [];
  while (list.length > 0) {
    if (list.length == 1) {
      res.push(list[0].toString());
      break;
    }
    let rangeLength = 1;
    let cur = list[0];
    // explore asc numbers
    for (let i = 1; i < list.length; i++) {
      if (list[i] != cur + i) break;
      rangeLength++;
    }
    if (rangeLength > 2) {
      res.push(`${cur}-${cur + rangeLength - 1}`);
      list = list.slice(rangeLength);
      continue;
    }
    if (rangeLength == 2) {
      res.push(`${cur},${cur + 1}`);
      list = list.slice(2);
      continue;
    }
    res.push(`${cur}`);
    list = list.slice(1);
  }
  return res.join(",");
}
