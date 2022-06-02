// https://www.codewars.com/kata/5f7a715f6c1f810017c3eb07
// other people's solution

// a Program takes an operation and return a result
// the operation takes stack and return a result
type Program = <T>(op: (stack: number[]) => T) => T;

// takes an operation, executes operation with stack
export const start: Program = (op) => op([]);
// takes stack, return number
export const end = (stack: number[]): number => stack.pop()!;
// takes stack, return a function takes a number and return a Program
export const push =
  (stack: number[]) =>
  (x: number): Program =>
  (op) => {
    stack.push(x);
    return op(stack);
  };
// takes a function of 2 numbers calc the numberresult
// return a function takes stack and return a Program
const binOp =
  (fn: (x: number, y: number) => number) =>
  (stack: number[]): Program =>
  (op) => {
    stack.push(fn(stack.pop()!, stack.pop()!));
    return op(stack);
  };
export const add = binOp((x, y) => x + y);
export const sub = binOp((x, y) => x - y);
export const mul = binOp((x, y) => x * y);
export const div = binOp((x, y) => (x / y) | 0);
const resPush = start(push);
const res5 = start(push)(5);
const resPush2 = start(push)(5)(push)(2);
const resAdd = start(push)(5)(push)(2)(add);
const resEnd = start(push)(5)(push)(2)(add)(end);
