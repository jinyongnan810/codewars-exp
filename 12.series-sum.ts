export function SeriesSum(n: number): string {
  return [...Array(n)]
    .map((_, i) => 1 / (i * 3 + 1))
    .reduce((sum, cur) => cur + sum, 0)
    .toFixed(2);
}
