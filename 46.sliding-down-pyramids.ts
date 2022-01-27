// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript
// https://projecteuler.net/problem=18
function longestSlideDown(pyramid: number[][]) {
  let sum = pyramid[0][0];
  let position = 0;
  for (let i = 1; i < pyramid.length; i++) {
    // slide down to nearest ones
    const left = pyramid[i][position];
    const right = pyramid[i][position + 1];
    if (left > right) sum += left;
    else {
      sum += right;
      position++;
    }
  }
  return sum;
}
