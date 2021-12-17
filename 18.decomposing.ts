export class G964 {
  private static squareCache: { [key: number]: number } = {};
  private static getSquare(x: number) {
    if (x in this.squareCache) {
      return this.squareCache[x];
    }
    const square = x ** 2;
    this.squareCache[x] = square;
    return square;
  }
  // key target, value list length
  private static getSumThatEqualsToCache: { [key: number]: number } = {};

  public static decompose(n: number) {
    console.log(`decompose(${n})`);
    const thisClass = this;
    const squares: { num: number; square: number }[] = [...Array(n - 1)].map(
      function (_, index) {
        const num = index + 1;
        return { num, square: thisClass.getSquare(num) };
      }
    );
    const target = this.getSquare(n);

    const result: number[] = [];
    // length: max squares to make up the target
    function getSumThatEqualsTo(length: number, target: number): boolean {
      console.log(`target:${target}`);
      // loop from large to small
      for (let i = length; i >= 0; i--) {
        const cur = squares[i];
        // if larger than target, continue to next loop
        if (cur.square > target) {
          continue;
        }
        // if equals to the targer, then all is over and cleared
        if (cur.square == target) {
          result.push(cur.num);
          console.log(`pushed:${cur.num}`);
          return true;
        }
        // if less than the target, then make the target of target-square,
        // and call getSumThatEqualsTo with sub list & new target
        if (cur.square < target) {
          const ok = getSumThatEqualsTo(i - 1, target - cur.square);
          // if child getSumThatEqualsTo returns true, that makes this number is part of the result
          if (ok) {
            result.push(cur.num);
            console.log(`pushed:${cur.num}`);
            return true;
            // else this number is not part of the result, then continue to next number
          } else {
            continue;
          }
        }
      }
      return false;
    }

    const hasResult = getSumThatEqualsTo(squares.length - 1, target);

    console.log(result);
    return hasResult ? result : null;
  }
}
