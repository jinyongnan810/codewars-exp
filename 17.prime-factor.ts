export class G964 {
  private static primes = [2, 3, 5, 7, 11];
  private static isPrime(n: number) {
    if (this.primes.indexOf(n) > -1) return true;
    const sqrt = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= sqrt; i++) {
      if (n % i === 0) return false;
    }
    this.primes.push(n);
    return true;
  }
  public static primeFactors(n: number) {
    if (n === 1) return "(1)";
    const sqrt = Math.floor(Math.sqrt(n));
    let factors: { [key: string]: number } = {};
    let n_bk = n;
    total: for (let i = 2; i <= sqrt; i++) {
      if (this.isPrime(i)) {
        let factor = 0;
        while (n_bk % i === 0) {
          factor += 1;
          n_bk /= i;
          if (this.isPrime(n_bk)) {
            factors[`${i}`] = factor;
            factors[`${n_bk}`] = 1;
            break total;
          }
        }
        if (factor > 0) {
          factors[`${i}`] = factor;
        }
      }
    }
    let res;
    if (Object.keys(factors).length == 0) res = `(${n})`;
    else
      res = Object.keys(factors)
        .sort((a, b) => Number(a) - Number(b))
        .map((f) => (factors[f] == 1 ? `(${f})` : `(${f}**${factors[f]})`))
        .join("");
    return res;
  }
}
