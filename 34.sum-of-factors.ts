// https://www.codewars.com/kata/54d496788776e49e6b00052f/train/typescript
type PrimeCount = {
  n: number;
  count: number;
};
export class G964 {
  //#region get prime factors
  static primes = [2, 3, 5, 7, 11];
  static isPrime(n: number) {
    if (this.primes.indexOf(n) > -1) return true;
    const sqrt = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= sqrt; i++) {
      if (n % i === 0) return false;
    }
    this.primes.push(n);
    return true;
  }
  static primeFactors(n: number): PrimeCount[] {
    if (n < 0) n *= -1;
    let factors: PrimeCount[] = [];
    if (n === 1) {
      factors.push({ n: 1, count: 1 });
      return factors;
    }
    const sqrt = Math.floor(Math.sqrt(n));
    let n_bk = n;
    total: for (let i = 2; i <= sqrt; i++) {
      if (this.isPrime(i)) {
        let factor = 0;
        while (n_bk % i === 0) {
          factor += 1;
          n_bk /= i;
          if (this.isPrime(n_bk)) {
            if (n_bk != i) {
              factors.push({ n: i, count: factor });
              factors.push({ n: n_bk, count: 1 });
            } else {
              factor++;
              factors.push({ n: i, count: factor });
            }
            break total;
          }
        }
        if (factor > 0) {
          factors.push({ n: i, count: factor });
        }
      }
    }
    if (factors.length == 0) {
      factors.push({ n, count: 1 });
      return factors;
    }
    return factors;
  }

  //#endregion

  public static sumOfDivided(lst: number[]): number[][] {
    const hasPrime: { [prime: string]: number } = {};
    for (let i = 0; i < lst.length; i++) {
      const n = lst[i];
      const primes = this.primeFactors(n);
      for (let p = 0; p < primes.length; p++) {
        const prime = primes[p].n.toString();
        if (Object.keys(hasPrime).indexOf(prime) > -1) {
          hasPrime[prime] += n;
        } else {
          hasPrime[prime] = n;
        }
      }
    }
    console.log(`hasPrime:${JSON.stringify(hasPrime)}`);
    return Object.keys(hasPrime)
      .map((key) => [+key, hasPrime[key]])
      .sort((a, b) => a[0] - b[0]);
  }
}
