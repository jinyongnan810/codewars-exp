// https://www.codewars.com/kata/56347fcfd086de8f11000014/train/typescript
export class G964 {
  private static getActualValue = (x: number): number => {
    return 1 + 0.5 * Math.E ** (-4 * x) - 0.5 * Math.E ** (-2 * x);
  };
  public static exEuler(n: number): number {
    console.log(`n:${n}`);
    const step = 1 / n;
    let errors = 0;
    let beforeX = 0;
    let beforeValue = 1;
    for (let i = 0; i < n; i++) {
      const diff = (2 - Math.E ** (-4 * beforeX) - 2 * beforeValue) * step;
      const nextValue = beforeValue + diff;
      const actual = this.getActualValue(beforeX + step);
      console.log(`x=${beforeX},next:${nextValue},actual:${actual}`);
      errors += Math.abs(actual - nextValue) / actual;
      beforeX += step;
      beforeValue = nextValue;
    }
    errors /= n + 1;
    return Math.trunc(errors * 1e6) / 1e6;
  }
}
