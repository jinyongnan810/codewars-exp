// https://www.codewars.com/kata/5f7a715f6c1f810017c3eb07
export const start = () => {
  const stack: number[] = [];
  const fn = (input: Function) => {
    return input(stack);
  };
  return fn;
};
export const end = (stack: number[]) => {
  const fn = () => {};
  fn.valueOf = () => stack.pop();
  return fn;
};
export const push = (stack: number[], input: number) => {
  stack.push(input);
  return;
};
export const add = undefined;
export const sub = undefined;
export const mul = undefined;
export const div = undefined;
