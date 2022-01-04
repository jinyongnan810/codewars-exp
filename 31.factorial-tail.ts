// https://www.codewars.com/kata/55c4eb777e07c13528000021/train/typescript
//#region get prime factors
const primes = [2, 3, 5, 7, 11];
const isPrime = (n: number) => {
  if (primes.indexOf(n) > -1) return true;
  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) return false;
  }
  primes.push(n);
  return true;
};
type PrimeCount = {
  n: number;
  count: number;
};
const primeFactors = (n: number) => {
  let factors: PrimeCount[] = [];
  if (n === 1) {
    factors.push({ n: 1, count: 1 });
    return factors;
  }
  const sqrt = Math.floor(Math.sqrt(n));
  let n_bk = n;
  total: for (let i = 2; i <= sqrt; i++) {
    if (isPrime(i)) {
      let factor = 0;
      while (n_bk % i === 0) {
        factor += 1;
        n_bk /= i;
        if (isPrime(n_bk)) {
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
};

//#endregion

export const zeroes = (base: number, num: number) => {
  // get prime factors of the base
  // case of 10: [{n:2,count:1},{n:5,count:1}]
  // case of 16: [{n:2,count:4}]
  const primeFactorsOfBase = primeFactors(base);
  console.log(`primeFactorsOfBase=${JSON.stringify(primeFactorsOfBase)}`);
  // initialize result
  const primes = primeFactorsOfBase.map((x) => x.n);
  const res: { [prime: number]: number } = {};
  primes.forEach((p) => (res[p] = 0));
  // loop the num
  for (let i = num; i >= 2; i--) {
    primes.forEach((p) => {
      let i_bk = i;
      while (i_bk % p === 0) {
        res[p]++;
        i_bk /= p;
      }
    });
  }
  // check results
  let zeroes = Number.MAX_SAFE_INTEGER;
  primes.forEach((p) => {
    const unit = primeFactorsOfBase.find((x) => x.n === p).count;
    const pCount = res[p];
    const unitCount = Math.floor(pCount / unit);
    if (unitCount < zeroes) {
      zeroes = unitCount;
    }
  });
  return zeroes;
};
