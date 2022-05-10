// https://www.codewars.com/kata/5e28ae347036fa001a504bbe/train/javascript
const king = "♔";
const queen = "♛";
const bishop = "♝";
const knight = "♞";
const rook = "♜";
const pawn = "♟";
type Position = [number, number];

function kingIsInCheck(chessboard: string[][]): boolean {
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
        default:
          break;
      }
    }
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const pos: Position = [i, j];
      const piece = chessboard[i][j];
      switch (piece) {
        case queen: {
          const isChecked = checkedByQueen(pos, kingPos, chessboard);
          console.log(`checked by queen:${isChecked}`);
          if (isChecked) return true;
          break;
        }
        case bishop: {
          const isChecked = checkedByBishop(pos, kingPos, chessboard);
          console.log(`checked by bishop:${isChecked}`);
          if (isChecked) return true;
          break;
        }
        case knight: {
          const isChecked = checkedByKnight(pos, kingPos);
          console.log(`checked by knight:${isChecked}`);
          if (isChecked) return true;
          break;
        }
        case rook: {
          const isChecked = checkedByRook(pos, kingPos, chessboard);
          console.log(`checked by rook:${isChecked}`);
          if (isChecked) return true;
          break;
        }
        case pawn: {
          const isChecked = checkedByPawn(pos, kingPos);
          console.log(`checked by pawn:${isChecked}`);
          if (isChecked) return true;
          break;
        }
        default:
          break;
      }
    }
  }
  return false;
}

const checkedByQueen = (
  pos: Position,
  kingPos: Position,
  chessboard: string[][]
): boolean => {
  const row = pos[0];
  const col = pos[1];
  const rowKing = kingPos[0];
  const colKing = kingPos[1];
  if (row == rowKing) {
    // in the same row
    const max = Math.max(col, colKing);
    const min = Math.min(col, colKing);
    for (let c = min + 1; c < max; c++) {
      if (chessboard[row][c] != " ") return false;
    }
    return true;
  }
  if (col == colKing) {
    // in the same column
    const max = Math.max(row, rowKing);
    const min = Math.min(row, rowKing);
    for (let r = min + 1; r < max; r++) {
      if (chessboard[r][col] != " ") return false;
    }
    return true;
  }
  if (Math.abs(row - rowKing) == Math.abs(col - colKing)) {
    // in the cross line
    const rowDir = row > rowKing ? -1 : 1;
    const colDir = col > colKing ? -1 : 1;
    const diff = Math.abs(row - rowKing);
    for (let d = 1; d < diff; d++) {
      if (chessboard[row + d * rowDir][col + d * colDir] != " ") return false;
    }
    return true;
  }
  return false;
};
const checkedByBishop = (
  pos: Position,
  kingPos: Position,
  chessboard: string[][]
): boolean => {
  const row = pos[0];
  const col = pos[1];
  const rowKing = kingPos[0];
  const colKing = kingPos[1];
  if (Math.abs(row - rowKing) == Math.abs(col - colKing)) {
    // in the cross line
    const rowDir = row > rowKing ? -1 : 1;
    const colDir = col > colKing ? -1 : 1;
    const diff = Math.abs(row - rowKing);
    for (let d = 1; d < diff; d++) {
      if (chessboard[row + d * rowDir][col + d * colDir] != " ") return false;
    }
    return true;
  }
  return false;
};

const checkedByKnight = (pos: Position, kingPos: Position): boolean => {
  const row = pos[0];
  const col = pos[1];
  const rowKing = kingPos[0];
  const colKing = kingPos[1];
  if (Math.abs(row - rowKing) == 1 && Math.abs(col - colKing) == 2) return true;
  if (Math.abs(row - rowKing) == 2 && Math.abs(col - colKing) == 1) return true;
  return false;
};

const checkedByRook = (
  pos: Position,
  kingPos: Position,
  chessboard: string[][]
): boolean => {
  const row = pos[0];
  const col = pos[1];
  const rowKing = kingPos[0];
  const colKing = kingPos[1];
  if (row == rowKing) {
    // in the same row
    const max = Math.max(col, colKing);
    const min = Math.min(col, colKing);
    for (let c = min + 1; c < max; c++) {
      if (chessboard[row][c] != " ") return false;
    }
    return true;
  }
  if (col == colKing) {
    // in the same column
    const max = Math.max(row, rowKing);
    const min = Math.min(row, rowKing);
    for (let r = min + 1; r < max; r++) {
      if (chessboard[r][col] != " ") return false;
    }
    return true;
  }
  return false;
};
const checkedByPawn = (pos: Position, kingPos: Position): boolean => {
  const row = pos[0];
  const col = pos[1];
  const rowKing = kingPos[0];
  const colKing = kingPos[1];
  if (rowKing - row == 1 && Math.abs(col - colKing) == 1) return true;
  return false;
};
console.log(
  kingIsInCheck([
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "♔", " ", " "],
    [" ", " ", " ", "♝", " ", " ", " ", " "],
    [" ", " ", "♟", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["♛", " ", " ", " ", " ", " ", " ", " "],
  ])
);
