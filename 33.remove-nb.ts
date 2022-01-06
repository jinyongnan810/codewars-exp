// https://www.codewars.com/kata/5547cc7dcad755e480000004/train/typescript
export class G964 {
  public static removeNb(n: number) {
    console.log(`n=${n}`);
    let res: number[][] = [];
    // n^2/2 + n/2 == xy + x + y
    // n^2 + n == 2(x+1)(y+1)-2
    // y == (n^2 + n + 2)/2(x+1) - 1
    const top = n ** 2 + n + 2;
    for (let x = 1; x <= n; x++) {
      const y = top / (x * 2 + 2) - 1;
      if (y >= 1 && y <= x && y == Math.floor(y)) {
        res.push([y, x]);
        res.push([x, y]);
      }
    }
    res = res.sort((arr1, arr2) => arr1[0] - arr2[0]);
    console.log(`res=${JSON.stringify(res)}`);
    return res;
  }

  public static removeNb_others(n: number) {
    var sum = (n * (n + 1)) / 2;
    var result = [];
    for (let a = 1; a < n; a++) {
      if ((sum - a) % (a + 1) === 0) {
        var b = (sum - a) / (a + 1);
        if (b < n) result.push([a, b]);
      }
    }
    return result;
  }
}
