// https://www.codewars.com/kata/545c4f7682e55d3c6e0011a1/train/javascript

function findBall(scales, ball_count) {
  // create all balls
  let all = Array.from({ length: ball_count }, (_, i) => i);
  let leftPan, rightPan;
  while (true) {
    const oneThird = Math.ceil(ball_count / 3);
    leftPan = all.slice(0, oneThird);
    rightPan = all.slice(oneThird, oneThird * 2);
    const w = scales.getWeight(leftPan, rightPan);
    if (w == -1) {
      all = leftPan;
      ball_count = leftPan.length;
    } else if (w == 0) {
      all = all.slice(oneThird * 2);
      ball_count = all.length;
    } else {
      all = rightPan;
      ball_count = rightPan.length;
    }
    console.log(`left:${leftPan}, right:${rightPan}, result all:${all}`);
    if (all.length == 1) return all[0];
    break;
  }
}
