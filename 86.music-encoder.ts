// https://www.codewars.com/kata/58db9545facc51e3db00000a/train/javascript
function compress(music: number[]): string {
  let res: string[] = [];
  let stack: number[] = [];
  let interval: number | null = null;
  for (let i = 0; i < music.length; i++) {
    const m = music[i];
    stack.push(m);
    console.log(`i=${music[i]},stack:${stack},interval:${interval}`);
    if (stack.length == 1) continue;
    const currentInterval = getInterval(stack);
    if (currentInterval != null && interval != currentInterval) {
      stack.pop();
      if (stack.length == 1) {
        res.push(stack[0].toString());
      } else {
        const intervalForStack = getInterval(stack);
        if (intervalForStack == 0) {
          res.push(`${stack[0]}*${stack.length}`);
        } else if (stack.length >= 3) {
          const absInterval = Math.abs(intervalForStack!);
          if (absInterval == 1) {
            res.push(`${stack[0]}-${stack[stack.length - 1]}`);
          } else {
            res.push(`${stack[0]}-${stack[stack.length - 1]}/${absInterval}`);
          }
        } else {
          res.push(stack[0].toString());
          res.push(stack[1].toString());
        }
      }
      stack = [];
      interval = null;
      stack.push(m);
    }
    interval = currentInterval;
  }
  return res.join(",");
}
const getInterval = (stack: number[]): number | null => {
  let interval: number | null = null;
  let pre = stack[0];
  for (let i = 1; i < stack.length; i++) {
    const n = stack[i];
    const diff = n - pre;
    if (interval != null && diff != interval) {
      return null;
    }
    pre = n;
    interval = diff;
  }
  return interval;
};

console.log(compress([1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]));
