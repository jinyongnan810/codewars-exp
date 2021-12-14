//#region mine failed
// ref: https://javascript.info/currying-partials
function curry(f) {
  let sum = 0;
  return function (a) {
    return f(sum, a);
  };
}
function sum(a, b) {
  return a + b;
}
const currySum = curry(sum);
export function add_mine(x: number): any {
  return currySum(x);
}
//#endregion

export function add(x: number): any {
  const fn = (y: number) => add(x + y);
  fn.valueOf = () => x;
  return fn;
}
