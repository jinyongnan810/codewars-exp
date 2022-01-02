export function determinant(m: number[][]): number {
  const n = m[0].length;
  if (n === 1) return m[0][0];
  let sum = 0;
  let minusFlag = 1;
  for (let i = 0; i < n; i++) {
    sum += minusFlag * m[0][i] * determinant(getSub(m, i));
    minusFlag *= -1;
  }
  return sum;
}

const getSub = (m: number[][], i: number): number[][] => {
  const firstRowRemoved = m.slice(1);
  const iColumnRemoved = firstRowRemoved.map((row) =>
    row.filter((_, index) => index != i)
  );
  return iColumnRemoved;
};
