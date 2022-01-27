// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript
// https://projecteuler.net/problem=18

const sumOfSubPyramid = (pyramid: number[][], row: number, pos: number) => {
  let sum = pyramid[row][pos];
  let lengthOfSubPyramidRow = 2;
  for (let i = row + 1; i < pyramid.length; i++) {
    for (let j = 0; j < lengthOfSubPyramidRow; j++) {
      sum += pyramid[i][pos + j];
    }
    lengthOfSubPyramidRow++;
  }
  return sum;
};

function longestSlideDown(pyramid: number[][]) {
  let sum = pyramid[0][0];
  let position = 0;
  for (let i = 1; i < pyramid.length; i++) {
    // slide down to nearest ones
    const leftSum = sumOfSubPyramid(pyramid, i, position);
    const rightSum = sumOfSubPyramid(pyramid, i, position + 1);
    console.log(
      `level ${i} position:${position}: left sum:${leftSum}, right sum:${rightSum}. Choose:${
        leftSum > rightSum ? pyramid[i][position] : pyramid[i][position + 1]
      } `
    );
    if (leftSum > rightSum) sum += pyramid[i][position];
    else {
      sum += pyramid[i][position + 1];
      position++;
    }
  }
  return sum;
}
