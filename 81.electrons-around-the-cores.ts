// https://www.codewars.com/kata/52210226578afb73bd0000f1/train/javascript
function electrons_around_the_cores(dices: number[]): number {
  // reverse engineering
  // [ 1, 2, 3, 4, 5 ] -> 6
  // [ 2, 2, 3, 3 ] -> 4
  // [ 6, 6, 4, 4, 1, 3 ] -> 2
  // [ 3, 5, 3, 5, 4, 2 ] -> 12
  // [ 1,1,1,1 ] -> 0
  // [ 1,1,1,3 ] -> 2
  // [ 1,1,3,3 ] -> 4
  // [ 1,3,3,3 ] -> 6
  // [ 2,2,2,2 ] -> 0
  // [ 3,3,3,3 ] -> 8
  // [ 4,4,4,4 ] -> 0
  // [ 1,1,1,5 ] -> 4
  // [ 1,1,5,5 ] -> 8
  // [ 5,5,5,5 ] -> 16
  // [ 1,5,5,5 ] -> 12
  // [ 5,5,5,5 ] -> 16
  // [ 6,6,6,6 ] -> 0

  // 1st guess: 1->0 2->0 3->2 4->0 5->4 6->0
  //  not work with [ 3, 5, 3, 5, 4, 2 ]
  // but attemp worked
  // electrons around the core probably means ⚀ ⚁ ⚂ ⚃ ⚄ ⚅
  // only 3 and 5 has a core, and they each has 2 and 4 electrons

  let res = 0;
  res += dices.filter((die) => die == 3).length * 2;
  res += dices.filter((die) => die == 5).length * 4;
  return res;
}
