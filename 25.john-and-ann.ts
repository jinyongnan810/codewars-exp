// https://www.codewars.com/kata/57591ef494aba64d14000526/train/typescript
export class G964 {
  private static johnDaily: number[] = [0, 0, 1, 2, 2];
  private static annDaily: number[] = [1, 1, 2, 2, 3];
  private static calcDaily(n: number) {
    for (let i = this.johnDaily.length; i < n; i++) {
      const johnBefore = this.johnDaily[i - 1];
      const annBefore = this.annDaily[i - 1];

      if (johnBefore > this.annDaily.length - 1) {
        const ann = i - this.johnDaily[annBefore];
        this.annDaily.push(ann);
        const john = i - this.annDaily[johnBefore];
        this.johnDaily.push(john);
      } else {
        const john = i - this.annDaily[johnBefore];
        this.johnDaily.push(john);
        const ann = i - this.johnDaily[annBefore];
        this.annDaily.push(ann);
      }
    }
  }
  public static john(n: number): number[] {
    if (n > this.johnDaily.length) {
      this.calcDaily(n);
      return this.johnDaily;
    }
    return this.johnDaily.slice(0, n);
  }
  public static ann(n: number): number[] {
    if (n > this.annDaily.length) {
      this.calcDaily(n);
      return this.annDaily;
    }
    return this.annDaily.slice(0, n);
  }
  public static sumJohn(n: number): number {
    return this.john(n).reduce((prev, cur) => prev + cur, 0);
  }
  public static sumAnn(n: number): number {
    return this.ann(n).reduce((prev, cur) => prev + cur, 0);
  }
}
