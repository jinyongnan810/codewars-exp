// https://www.codewars.com/kata/55a29405bc7d2efaff00007c/train/typescript
export class G964 {
  private static factorialCache: { [key: number]: BigInt } = {};
  private static getFactorial(n: number) {
    if (this.factorialCache[n]) return this.factorialCache[n];
    if (n < 10) {
      const factorial = [...Array(n)]
        .map((_, i) => i + 1)
        .reduce((prev, cur) => BigInt(prev) * BigInt(cur), BigInt(1));
      this.factorialCache[n] = factorial;
      return factorial;
    }
    const factorial = n * this.getFactorial(n - 1);
    this.factorialCache[n] = factorial;
    return factorial;
  }
  public static going(n: number): number {
    if (n == 1) return 1;
    const thisClass = this;
    const up = [...Array(n - 1)]
      .map((_, i) => thisClass.getFactorial(i + 1))
      .reduce((prev, cur) => prev + cur, 0);
    const down = this.getFactorial(n);
    const res = up / down + 1;

    return Math.trunc(res * 1e6) / 1e6;
  }
}
