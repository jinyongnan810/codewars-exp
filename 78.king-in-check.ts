// https://www.codewars.com/kata/5e28ae347036fa001a504bbe/train/javascript
const king = "♔";
const queen = "♛";
const bishop = "♝";
const knight = "♞";
const rook = "♜";
const pawn = "♟";
type Position = [number, number];

function kingIsInCheck(chessboard: string[][]): boolean {
  let controlledArea: Position[] = [];
  let kingPos: Position = [-1, -1];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const pos: Position = [i, j];
      const piece = chessboard[i][j];
      switch (piece) {
        case king: {
          kingPos = pos;
          break;
        }
        case queen: {
          controlledArea = [...controlledArea, ...controlledByQueen(pos)];
          break;
        }
        case bishop: {
          controlledArea = [...controlledArea, ...controlledByQueen(pos)];
          break;
        }
        case knight: {
          controlledArea = [...controlledArea, ...controlledByQueen(pos)];
          break;
        }
        case rook: {
          controlledArea = [...controlledArea, ...controlledByQueen(pos)];
          break;
        }
        case pawn: {
          controlledArea = [...controlledArea, ...controlledByQueen(pos)];
          break;
        }
        default:
          break;
      }
    }
  }
  console.log(controlledArea);
  console.log(kingPos);
  return false;
}

const controlledByQueen = (pos: Position): Position[] => {
  const res: Position[] = [];
  for (let i = 1; i < 8; i++) {
    for (let j = 1; j < 8; j++) {
      const posHorizontal: Position = [pos[0], (pos[1] + j) % 8];
      const posVertical: Position = [(pos[0] + i) % 8, pos[1]];
      res.push(posHorizontal);
      res.push(posVertical);
      console.log(`posHorizontal:${posHorizontal},posVertical:${posVertical}`);
      if (i == j) {
        if (pos[0] - i >= 0 && pos[1] + j < 8) {
          const posTopRight: Position = [pos[0] - i, pos[1] + j];
          res.push(posTopRight);
          console.log(`posTopRight:${posTopRight}`);
        }
        if (pos[0] - i >= 0 && pos[1] - j >= 0) {
          const posTopLeft: Position = [pos[0] - i, pos[1] - j];
          res.push(posTopLeft);
          console.log(`posTopLeft:${posTopLeft}`);
        }
        if (pos[0] + i < 8 && pos[1] + j < 8) {
          const posBottomRight: Position = [pos[0] + i, pos[1] + j];
          res.push(posBottomRight);
          console.log(`posBottomRight:${posBottomRight}`);
        }
        if (pos[0] + i < 8 && pos[1] - j >= 0) {
          const posBottomLeft: Position = [pos[0] + i, pos[1] - j];
          res.push(posBottomLeft);
          console.log(`posBottomLeft:${posBottomLeft}`);
        }
      }
    }
  }
  return res;
};
const controlledByBishop = (pos: Position): Position[] => {
  const res: Position[] = [];
  for (let i = 1; i < 8; i++) {
    if (pos[0] - i >= 0 && pos[1] + i < 8) {
      const posTopRight: Position = [pos[0] - i, pos[1] + i];
      res.push(posTopRight);
      console.log(`posTopRight:${posTopRight}`);
    }
    if (pos[0] - i >= 0 && pos[1] - i >= 0) {
      const posTopLeft: Position = [pos[0] - i, pos[1] - i];
      res.push(posTopLeft);
      console.log(`posTopLeft:${posTopLeft}`);
    }
    if (pos[0] + i < 8 && pos[1] + i < 8) {
      const posBottomRight: Position = [pos[0] + i, pos[1] + i];
      res.push(posBottomRight);
      console.log(`posBottomRight:${posBottomRight}`);
    }
    if (pos[0] + i < 8 && pos[1] - i >= 0) {
      const posBottomLeft: Position = [pos[0] + i, pos[1] - i];
      res.push(posBottomLeft);
      console.log(`posBottomLeft:${posBottomLeft}`);
    }
  }
  return res;
};

const controlledByKnight = (pos: Position): Position[] => {
  const res: Position[] = [];
  if (pos[0] - 2 >= 0 && pos[1] + 1 < 8) {
    const posTopRight: Position = [pos[0] - 2, pos[1] + 1];
    res.push(posTopRight);
    console.log(`posTopRight:${posTopRight}`);
  }
  if (pos[0] - 1 >= 0 && pos[1] + 2 < 8) {
    const posTopRight: Position = [pos[0] - 1, pos[1] + 2];
    res.push(posTopRight);
    console.log(`posTopRight:${posTopRight}`);
  }
  if (pos[0] - 2 >= 0 && pos[1] - 1 >= 0) {
    const posTopLeft: Position = [pos[0] - 2, pos[1] - 1];
    res.push(posTopLeft);
    console.log(`posTopLeft:${posTopLeft}`);
  }
  if (pos[0] - 1 >= 0 && pos[1] - 2 >= 0) {
    const posTopLeft: Position = [pos[0] - 1, pos[1] - 2];
    res.push(posTopLeft);
    console.log(`posTopLeft:${posTopLeft}`);
  }
  if (pos[0] + 2 < 8 && pos[1] + 1 < 8) {
    const posBottomRight: Position = [pos[0] + 2, pos[1] + 1];
    res.push(posBottomRight);
    console.log(`posBottomRight:${posBottomRight}`);
  }
  if (pos[0] + 1 < 8 && pos[1] + 2 < 8) {
    const posBottomRight: Position = [pos[0] + 1, pos[1] + 2];
    res.push(posBottomRight);
    console.log(`posBottomRight:${posBottomRight}`);
  }
  if (pos[0] + 2 < 8 && pos[1] - 1 >= 0) {
    const posBottomLeft: Position = [pos[0] + 2, pos[1] - 1];
    res.push(posBottomLeft);
    console.log(`posBottomLeft:${posBottomLeft}`);
  }
  if (pos[0] + 1 < 8 && pos[1] - 2 >= 0) {
    const posBottomLeft: Position = [pos[0] + 1, pos[1] - 2];
    res.push(posBottomLeft);
    console.log(`posBottomLeft:${posBottomLeft}`);
  }
  return res;
};
