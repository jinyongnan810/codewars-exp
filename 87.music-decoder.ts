// https://www.codewars.com/kata/58de42bab4b74c214d0000e2/train/typescript
export function uncompress(music: string): number[] {
  const chunks = music.split(",");
  const res: number[] = [];
  chunks.forEach((chunk) => {
    if (chunk.indexOf("*") >= 0) {
      const split = chunk.split("*");
      const n = Number.parseInt(split[0]);
      const k = Number.parseInt(split[1]);
      for (let i = 0; i < k; i++) {
        res.push(n);
      }
    } else if (chunk.indexOf("-") >= 0) {
      if (chunk.indexOf("/") >= 0) {
        const matches = chunk.match(/(\-?\d+)-(\-?\d+)\/(\d+)/);
        if (!matches) return;
        const m = Number.parseInt(matches[1]);
        const n = Number.parseInt(matches[2]);
        let k = Number.parseInt(matches[3]);
        if (m > n) {
          k = -k;
        }
        for (let i = m; i != n; i += k) {
          res.push(i);
        }
        res.push(n);
      } else {
        const split = chunk.split("-");
        const m = Number.parseInt(split[0]);
        const n = Number.parseInt(split[1]);
        const k = m > n ? -1 : 1;
        for (let i = m; i != n; i += k) {
          res.push(i);
        }
        res.push(n);
      }
    } else {
      res.push(Number.parseInt(chunk));
    }
  });
  return res;
}
console.log(uncompress("1,2*2,3"));
console.log(uncompress("1,-2*2,3"));

// fun way to switch
const testSwitch = () => {
  switch (true) {
    case testEqual(1, 2): {
      console.log(`hello1`);
      break;
    }
    case testEqual(1, 3): {
      console.log(`hello2`);
      break;
    }
    case testEqual(1, 1): {
      console.log(`hello3`);
      break;
    }
  }
};
const testEqual = (a: number, b: number) => a == b;
testSwitch();
