// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript
const cachePlus = [0n, 1n];
const cacheMinus = [0n, 1n];
let min = -1;
let max = 1;

const fibPlus = (n) => {
  if (n <= max) {
    return cachePlus[n];
  }
  let a = cachePlus[max - 1];
  let b = cachePlus[max];
  for (let i = max + 1; i <= n; i++) {
    const fib = a + b;
    // cachePlus.push(fib);
    a = b;
    b = fib;
  }
  // max = n;
  return b;
};

const fibPlus_recursion = (n) => {
  if (n <= max) {
    return cachePlus[n];
  }
  const fib = fibPlus(n - 1) + fibPlus(n - 2);
  max = n;
  cachePlus[n] = fib;
  return fib;
};

const fibMinus = (n) => {
  const isMinus = n % 2 == 0 ? -1n : 1n;
  const fib = fibPlus(n * -1) * isMinus;
  return fib;
};

const fibMinus_recursion = (n) => {
  if (n >= min) {
    return cacheMinus[n * -1];
  }
  const fib = fibMinus(n + 2) - fibMinus(n + 1);
  min = n;
  cacheMinus[n * -1] = fib;
  return fib;
};

function fib(n) {
  console.log(n);
  if (n == 0) return 0n;
  if (n > 0) {
    return fibPlus(n);
  } else {
    return fibMinus(n);
  }
}

function main() {
  for (let i = 0; i <= 10; i++) console.log(`fib ${i}: ${fib(i)}`);
  console.log(cachePlus);
  for (let i = 0; i >= -10; i--) console.log(`fib ${i}: ${fib(i)}`);
  console.log(cacheMinus);
  // console.log(fib(1043713));
}

main();
