// https://www.codewars.com/kata/54d4c8b08776e4ad92000835/train/javascript
var isPP = function (n: number): number[] | null {
  if (checkIsPrime(n)) return null;
  const decomposition = primeDecomposition(n);
  console.log(decomposition);
  const primes = Object.keys(decomposition);
  if (primes.length == 1) {
    const m = Number.parseInt(primes[0]);
    const k = decomposition[m];
    return [m, k];
  } else {
    const values = Object.values(decomposition);
    const commonDivider = getCommonDivider(values);
    if (!commonDivider) return null;

    const m = primes
      .map((prime) => Number.parseInt(prime))
      .reduce((p, c) => p * c ** (decomposition[c] / commonDivider), 1);
    return [m, commonDivider];
  }
};
const getCommonDivider = (list: number[]): number | null => {
  let commonDivider = 2;
  const min = list.reduce((p, c) => (p < c ? p : c), Number.MAX_SAFE_INTEGER);
  for (; commonDivider <= min; commonDivider++) {
    const canAllBeDevided = list.every((n) => n % commonDivider == 0);
    if (canAllBeDevided) return commonDivider;
  }
  return null;
};

const primeDecomposition = (n: number): Record<number, number> => {
  if (checkIsPrime(n)) {
    return { [n]: 1 };
  }
  // get decompositions
  let nTmp = n;
  const s = Math.floor(Math.sqrt(n));
  const res: Record<number, number> = {};
  for (let i = 2; i <= s; i++) {
    if (!checkIsPrime(i)) continue;
    const prime = i;
    if (prime > nTmp) break;
    while (nTmp % prime == 0) {
      nTmp /= prime;
      if (res[prime]) res[prime] = res[prime] + 1;
      else res[prime] = 1;
    }
    if (nTmp > 1 && checkIsPrime(nTmp)) {
      res[nTmp] = 1;
      break;
    }
  }
  return res;
};

const primes: Record<number, boolean> = { 2: true, 3: true, 4: false };
const checkIsPrime = (n: number): boolean => {
  if (n in primes) return primes[n] ?? false;
  const s = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= s; i++) {
    if (n % i == 0) {
      primes[n] = false;
      return false;
    }
  }
  primes[n] = true;
  return true;
};
console.log(isPP(400));
