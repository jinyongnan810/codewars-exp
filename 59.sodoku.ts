// https://www.codewars.com/kata/529bf0e9bdf7657179000008/train/javascript
function validSolution(board: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    if (!checkRow(board, i)) {
      console.log(`fail at row ${i}`);
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (!checkColumn(board, i)) {
      console.log(`fail at column ${i}`);
      return false;
    }
  }
  for (let i = 1; i < 9; i += 3) {
    for (let j = 1; j < 9; j += 3) {
      if (!checkBlock(board, i, j)) {
        console.log(`fail at block ${i}:${j}`);
        return false;
      }
    }
  }
  return true;
}
const checkRow = (board: number[][], row: number): boolean => {
  const r = board[row];
  if (r.includes(0)) return false;
  if ([...new Set(r)].length != 9) return false;
  return true;
};
const checkColumn = (board: number[][], column: number): boolean => {
  const c = board.map((row) => row[column]);
  if (c.includes(0)) return false;
  if ([...new Set(c)].length != 9) return false;
  return true;
};
const checkBlock = (
  board: number[][],
  row: number,
  column: number
): boolean => {
  let centerX = column;
  let centerY = row;
  const b = board
    .filter((_, index) => index >= centerY - 1 && index <= centerY + 1)
    .map((row) =>
      row.filter((_, index) => index >= centerX - 1 && index <= centerX + 1)
    );
  console.log(`center=${centerY}:${centerX},block=${JSON.stringify(b)}`);
  const blockFlatten = b.reduce((all, cur) => [...all, ...cur]);
  if (blockFlatten.includes(0)) return false;
  if ([...new Set(blockFlatten)].length != 9) return false;
  return true;
};
