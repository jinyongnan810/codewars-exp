// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26/train/javascript

// ref: https://web.archive.org/web/20220614001843/https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-11.html#%_sec_1.2.4
// ref: https://www.nayuki.io/page/fast-fibonacci-algorithms#:~:text=Summary%3A%20The%20two%20fast%20Fibonacci,when%20Karatsuba%20multiplication%20is%20used.
// given f(k)&f(k+1)
// f(2k) = f(k)(2f(k+1)-f(k))
// f(2k+1) = f(k+1)^2 + f(k)^2

const fibPlus = (n) => {
  if (n == 0) return 0n;
  if (n == 1) return 1n;
  if (n == 2) return 1n;
  if (n == 3) return 2n;
  if (n % 2 == 0) {
    const k = Math.floor(n / 2);
    const fibK = fibPlus(k);
    const fibKPlus1 = fibPlus(k + 1);
    return fibK * (2n * fibKPlus1 - fibK);
  } else {
    const k = Math.floor((n - 1) / 2);
    const fibK = fibPlus(k);
    const fibKPlus1 = fibPlus(k + 1);
    return fibKPlus1 ** 2n + fibK ** 2n;
  }
};

const fibPlusFlat = (n) => {
  if (n == 0) return 0n;
  if (n == 1) return 1n;
  for (let i = 2; i <= n; i++) {
    const fib = a + b;
    a = b;
    b = fib;
  }
  return b;
};

// const fibPlus_recursion = (n) => {
//   if (n <= max) {
//     return cachePlus[n];
//   }
//   const fib = fibPlus(n - 1) + fibPlus(n - 2);
//   max = n;
//   cachePlus[n] = fib;
//   return fib;
// };

const fibMinus = (n) => {
  const isMinus = n % 2 == 0 ? -1n : 1n;
  const fib = fibPlus(n * -1) * isMinus;
  return fib;
};

// const fibMinus_recursion = (n) => {
//   if (n >= min) {
//     return cacheMinus[n * -1];
//   }
//   const fib = fibMinus(n + 2) - fibMinus(n + 1);
//   min = n;
//   cacheMinus[n * -1] = fib;
//   return fib;
// };

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
  for (let i = 0; i >= -10; i--) console.log(`fib ${i}: ${fib(i)}`);
  // const start = Date.now();
  // fib(1043713);
  // console.log(Date.now() - start);
  // stack 6525ms a&b 6515ms
}

main();
