// https://www.codewars.com/kata/56c04261c3fcf33f2d000534/train/typescript
export class G964 {
  private static caches: { [k: number]: { [n: number]: number } } = {};
  private static getCache(k: number, n: number) {
    if (this.caches[k] && this.caches[k][n]) return this.caches[k][n];
    const res = 1 / (k * n ** (k * 2));
    if (!this.caches[k]) this.caches[k] = {};
    this.caches[k][n] = res;
    return res;
  }
  public static doubles(maxk: number, maxn: number): number {
    let sum = 0;
    for (let k = 1; k <= maxk; k++) {
      let rowk = 0;
      for (let n = 2; n <= maxn + 1; n++) {
        rowk += this.getCache(k, n);
      }
      sum += rowk;
    }
    return sum;
  }
}
