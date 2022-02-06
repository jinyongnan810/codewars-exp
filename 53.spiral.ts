// https://www.codewars.com/kata/534e01fbbb17187c7e0000c6/train/javascript

// maybe not completable in js
const checkMovable = (matrix: number[][], x: number, y: number): boolean => {
  const n = matrix.length;
  let noGo = 0;
  if (x > 0 && matrix[x - 1][y] == 1) noGo++;
  if (x > 0 && y > 0 && matrix[x - 1][y - 1] == 1) noGo++;
  if (y > 0 && matrix[x][y - 1] == 1) noGo++;
  if (x < n - 1 && y > 0 && matrix[x + 1][y - 1] == 1) noGo++;
  if (x < n - 1 && matrix[x + 1][y] == 1) noGo++;
  if (x < n - 1 && y < n - 1 && matrix[x + 1][y + 1] == 1) noGo++;
  if (y < n - 1 && matrix[x][y + 1] == 1) noGo++;
  if (x > 0 && y < n - 1 && matrix[x - 1][y + 1] == 1) noGo++;
  return noGo <= 2;
};
function spiralize(n: number): number[][] {
  // initial
  let [x, y] = [0, 0];
  let direction: "up" | "down" | "left" | "right" = "right";
  const matrix: number[][] = [...Array(n)].map(() =>
    [...Array(n)].map(() => 0)
  );
  // move the snake
  while (true) {
    console.log(`x=${x}, y= ${y}`);
    matrix[x][y] = 1;
    let [up, down, left, right] = [false, false, false, false];
    // can go left
    if (y > 0 && checkMovable(matrix, x, y - 1)) {
      left = true;
    }
    // can go right
    if (y < n - 1 && checkMovable(matrix, x, y + 1)) {
      right = true;
    }
    // can go up
    if (x > 0 && checkMovable(matrix, x - 1, y)) {
      up = true;
    }
    // can go down
    if (x < n - 1 && checkMovable(matrix, x + 1, y)) {
      down = true;
    }
    // check direction available
    switch (direction) {
      case "up": {
        if (up) {
          x--;
          continue;
        } else if (right) {
          y++;
          direction = "right";
          continue;
        }
        break;
      }
      case "down": {
        if (down) {
          x++;
          continue;
        } else if (left) {
          y--;
          direction = "left";
          continue;
        }
        break;
      }
      case "left": {
        if (left) {
          y--;
          continue;
        } else if (up) {
          x--;
          direction = "up";
          continue;
        }
        break;
      }
      case "right": {
        if (right) {
          y++;
          continue;
        } else if (down) {
          x++;
          direction = "down";
          continue;
        }
        break;
      }
    }
    // if no direction available
    break;
  }
  matrix[x][y] = 1;

  return matrix;
}
