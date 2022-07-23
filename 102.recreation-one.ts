// https://www.codewars.com/kata/55aa075506463dac6600010d/train/typescript
export const listSquared = (m: number, n: number): number[][] => {
  const res: number[][] = [];
  for (let i = m; i <= n; i++) {
    const target = isTarget(i);
    if (target) {
      res.push([i, target]);
    }
  }
  return res;
};
const cache: Record<number, false | number> = { 1: 1 };
const isTarget = (n: number): false | number => {
  if (n in cache) return cache[n] ?? false;
  if (checkIsPrime(n)) {
    return false;
  }
  const decompositions = primeDecomposition(n);
  const dividers = getDividers(decompositions);
  const squaredDividersSum = dividers
    .map((d) => d ** 2)
    .reduce((p, c) => p + c, 0);
  const sqrt = Math.sqrt(squaredDividersSum);
  if (sqrt == Math.floor(sqrt)) {
    cache[n] = squaredDividersSum;
    return squaredDividersSum;
  }
  cache[n] = false;
  return false;
};
const getDividers = (decompositions: Record<number, number>): number[] => {
  const keys = Object.keys(decompositions).map((s) => parseInt(s));
  const flattenList = keys
    .map((k) => {
      const flatten = [];
      const count = decompositions[k];
      for (let i = 0; i < count; i++) {
        flatten.push(k);
      }
      return flatten;
    })
    .reduce((prev, cur) => prev.concat(cur), []);
  const max = 1 << flattenList.length;
  const res: Set<number> = new Set();
  res.add(1);
  for (let i = 1; i <= max; i++) {
    res.add(
      flattenList
        .filter((_, index) => (i >> index) & 1)
        .reduce((prev, cur) => prev * cur, 1)
    );
  }
  return Array.from(res.values());
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
