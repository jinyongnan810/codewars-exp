// https://www.codewars.com/kata/58db9545facc51e3db00000a/train/javascript
function compress(music: number[]): string {
  let res: string[] = [];
  for (let i = 0; i < music.length; i++) {
    const m = music[i];
    if (i == music.length - 1) {
    } else {
      const interval = music[i + 1] - m;
      let end = i + 1;
      while (
        end < music.length &&
        getInterval(music.slice(i, end + 1)) == interval
      ) {
        end++;
      }
      if (interval == 0) {
        res.push(`${m}*${end - i + 1}`);
        i = end + 1;
      } else {
        if (end - i > 1) {
          if (Math.abs(interval) == 1) {
            res.push(`${m}-${music[end]}`);
          } else {
            res.push(`${m}-${music[end]}/${Math.abs(interval)}`);
          }
          i = end + 1;
        } else {
          res.push(m.toString());
        }
      }
    }
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
