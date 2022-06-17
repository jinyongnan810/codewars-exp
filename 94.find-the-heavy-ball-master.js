//https://www.codewars.com/kata/544034f426bc6adda200000e/train/javascript
// Seven of them have the same weight!!!!
function findBall(scales) {
  // call scales.getWeight() max 2 times
  // return indexOfHeavyBall;
  let leftPan = [0, 1, 2];
  let rightPan = [3, 4, 5];
  let w = scales.getWeight(leftPan, rightPan);
  if (w == -1) {
    leftPan = [0];
    rightPan = [1];
    w = scales.getWeight(leftPan, rightPan);
    if (w == -1) return 0;
    if (w == 0) return 2;
    if (w == 1) return 1;
  }
  if (w == 0) {
    leftPan = [6];
    rightPan = [7];
    w = scales.getWeight(leftPan, rightPan);
    if (w == -1) return 6;
    if (w == 1) return 7;
  }
  if (w == 1) {
    leftPan = [3];
    rightPan = [4];
    w = scales.getWeight(leftPan, rightPan);
    if (w == -1) return 3;
    if (w == 0) return 5;
    if (w == 1) return 4;
  }
}
