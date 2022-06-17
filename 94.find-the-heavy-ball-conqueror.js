//https://www.codewars.com/kata/544047f0cf362503e000036e/train/javascript
// Seven of them have the same weight!!!!
function findBall(scales) {
  // call scales.getWeight() max 3 times
  // return indexOfHeavyBall;
  let leftPan = [0, 1, 2, 3];
  let rightPan = [4, 5, 6, 7];
  for (let i = 0; i <= 4; i++) {
    console.log(`left:${leftPan}, right:${rightPan}`);
    var w = scales.getWeight(leftPan, rightPan);
    if (w == -1) {
      if (leftPan.length == 1) return leftPan[0];
      const split = ~~leftPan.length / 2;
      rightPan = leftPan.slice(split);
      leftPan = leftPan.slice(0, split);
      console.log(`left:${leftPan}, right:${rightPan}`);
    }
    if (w == 1) {
      if (rightPan.length == 1) return rightPan[0];
      const split = ~~rightPan.length / 2;
      leftPan = rightPan.slice(0, split);
      rightPan = rightPan.slice(split);
      console.log(`left:${leftPan}, right:${rightPan}`);
    }
  }
}
