//https://www.codewars.com/kata/54eb33e5bc1a25440d000891/train/typescript
export class G964 {
  private static squareCache: { [key: number]: number } = {};
  private static getSquare(x: number) {
    if (this.squareCache[x]) {
      return this.squareCache[x];
    }
    const square = x ** 2;
    this.squareCache[x] = square;
    return square;
  }

  private static cachedSquares: number[] = [];

  private static getSquares(length: number) {
    const thisClass = this;
    const cachedLength = this.cachedSquares.length;
    if (cachedLength == length - 1) return this.cachedSquares;
    if (cachedLength > length - 1)
      return this.cachedSquares.slice(0, length - 1);
    const squares = [
      ...this.cachedSquares,
      ...[...Array(length - 1 - cachedLength)].map(function (_, index) {
        const num = index + 1 + cachedLength;
        return thisClass.getSquare(num);
      }),
    ];
    this.cachedSquares = squares;
    // console.log(`cached squares: ${this.cachedSquares.length}`);
    return squares;
  }

  public static decompose(n: number) {
    console.log(`decompose(${n})`);
    const thisClass = this;
    const squares: number[] = this.getSquares(n);
    const target = this.getSquare(n);

    const result: number[] = [];
    // length: max squares to make up the target
    function getSumThatEqualsTo(length: number, target: number): boolean {
      // console.log(`target:${target}`);
      // loop from large to small
      for (let i = length; i >= 0; i--) {
        const cur = squares[i];
        // if larger than target, continue to next loop
        if (cur > target) {
          continue;
        }
        // if equals to the targer, then all is over and cleared
        if (cur == target) {
          result.push(i + 1);
          // console.log(`pushed:${cur.num}`);
          return true;
        }
        // if less than the target, then make the target of target-square,
        // and call getSumThatEqualsTo with sub list & new target
        if (cur < target) {
          const ok = getSumThatEqualsTo(i - 1, target - cur);
          // if child getSumThatEqualsTo returns true, that makes this number is part of the result
          if (ok) {
            result.push(i + 1);
            // console.log(`pushed:${cur.num}`);
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

    // console.log(result);
    return hasResult ? result : null;
  }
}
