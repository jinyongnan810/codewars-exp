// https://www.codewars.com/kata/55a29405bc7d2efaff00007c/train/typescript
export class G964 {
  private static getFactorial(n: number, min: number) {
    if (n === min) return min;
    const factorial = n * this.getFactorial(n - 1, min);
    return factorial;
  }
  public static going(n: number): number {
    if (n == 1) return 1;
    const thisClass = this;
    const res = [...Array(n - 1)]
      .map((_, i) => 1 / thisClass.getFactorial(n, i + 2))
      .reduce((prev, cur) => prev + cur, 1);

    return Math.trunc(res * 1e6) / 1e6;
  }
}
