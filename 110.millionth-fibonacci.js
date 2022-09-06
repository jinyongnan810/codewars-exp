// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript
const cachePlus = [0n, 1n, 1n];
const cacheMinus = [0n, -1n];
let min = -1;
let max = 2;

const fibPlus = (n) => {
  if (n <= max) {
    return cachePlus[n];
  }
  const fib = fibPlus(n - 1) + fibPlus(n - 2);
  max = n;
  cachePlus[n] = fib;
  return fib;
};

const fibMinus = (n) => {
  if (n >= min) {
    return cachePlus[n * -1];
  }
  const fib = fibMinus(n + 2) - fibMinus(n + 1);
  min = n;
  cachePlus[n * -1] = fib;
  return fib;
};

function fib(n) {
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
}

main();
