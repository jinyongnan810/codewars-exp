//https://www.codewars.com/kata/544034f426bc6adda200000e/train/javascript
// Seven of them have the same weight!!!!
function findBall(scales) {
  // call scales.getWeight() max 2 times
  // return indexOfHeavyBall;
  for (var i = 1; i < 8; i++) {
    var leftPan = [i - 1];
    var rightPan = [i];
    var w = scales.getWeight(leftPan, rightPan);

    if (w === -1) {
      // left pan is heavier
      return leftPan[0];
    }

    if (w === 1) {
      // right pan is heavier
      return rightPan[0];
    }
  }
}
// sample: 1,2,3,4,5,6,7,8
// if given 3 times // this won't work with try 1 get 0 for equal
// try 1: 1,2,3,4  5,6,7,8
// try 2: 5,6 7,8
// try 3: 7 8
