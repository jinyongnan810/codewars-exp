// https://www.codewars.com/kata/58a3e2978bdda5a0d9000187/train/javascript
function primeOperations(x: number, y: number): number {
  // sample: 2,3 -> 2*3 -> 6/2 -> 2 steps
  if (x == y) return 0;
  const decompositionOfX = x == 1 ? {} : primeDecomposition(x);
  const decompositionOfY = y == 1 ? {} : primeDecomposition(y);
  console.log(decompositionOfX);
  console.log(decompositionOfY);
  const keys = new Set([
    ...Object.keys(decompositionOfX),
    ...Object.keys(decompositionOfY),
  ]);
  let steps = 0;
  keys.forEach((key) => {
    const xContainsKey = decompositionOfX[parseInt(key)] ?? 0;
    const yContainsKey = decompositionOfY[parseInt(key)] ?? 0;
    steps += Math.abs(xContainsKey - yContainsKey);
  });
  console.log(`x:${x}, y:${y}, steps:${steps}`);
  return steps;
}

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

primeOperations(51539607551, 824633720831);
primeOperations(1000000000000, 333333333333);
primeOperations(5156486548, 5);
primeOperations(1, 930102593364);
