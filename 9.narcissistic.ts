export function narcissistic(value: number): boolean {
  const str = value.toString();
  const len = str.length;
  return (
    str.split("").reduce((prev, cur) => prev + Number(cur) ** len, 0) == value
  );
}
// reduce maximum paras: reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)
export const narcissistic_others = (value: number): boolean =>
  value ===
  value
    .toString()
    .split("")
    .reduce((acc, n, _, xs) => acc + parseInt(n) ** xs.length, 0);
