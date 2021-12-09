export function duplicateCount(text: string): number {
  const lower = text.toLowerCase();
  const dict: { [key: string]: number } = {};
  lower.split("").forEach((l) => {
    if (l in dict) dict[l] += 1;
    else dict[l] = 1;
  });
  return Object.keys(dict).filter((k) => dict[k] > 1).length;
}

export function duplicateCount_others(text: string): number {
  let array = text.toLowerCase().split("");
  return [...new Set(array.filter((e, i) => array.indexOf(e) !== i))].length;
}
