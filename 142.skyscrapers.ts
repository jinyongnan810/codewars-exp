// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript
function solvePuzzle(input: number[]) {
  const clues = handleInput(input);
  // console.log(
  //   `countFromTop: ${countFromTop}, countFromRight: ${countFromRight}, countFromBottom: ${countFromBottom}, countFromLeft: ${countFromLeft}`
  // );
  const board = initBoard();
  // memo1: if clue is 6, then the row or column is [1,2,3,4,5,6]
  checkHas6(board, clues);
  // memo2: if clue is 1, then the next cell is 6
  checkHas1(board, clues);
  // no clue yet for the rest
  printPossibleValues(board);
  printBoard(board);
  return toResult(board);
}

type Clues = {
  countFromTop: number[];
  countFromRight: number[];
  countFromBottom: number[];
  countFromLeft: number[];
};
const UNKNOWN = 0;
const handleInput = (clues: number[]): Clues => {
  const countFromTop = clues.slice(0, 6);
  const countFromRight = clues.slice(6, 12);
  const countFromBottom = clues.slice(12, 18).reverse();
  const countFromLeft = clues.slice(18, 24).reverse();
  return { countFromTop, countFromRight, countFromBottom, countFromLeft };
};
type Cell = {
  value: number;
  possibleValues: number[];
};
type Board = Cell[][];
const initBoard = (): Board => {
  const board: Board = [];
  for (let i = 0; i < 6; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 6; j++) {
      row.push({ value: UNKNOWN, possibleValues: [1, 2, 3, 4, 5, 6] });
    }
    board.push(row);
  }
  return board;
};
const checkHas6 = (board: Board, clues: Clues) => {
  const { countFromTop, countFromRight, countFromBottom, countFromLeft } =
    clues;
  for (let i = 0; i < 6; i++) {
    if (countFromTop[i] === 6) {
      for (let j = 0; j < 6; j++) {
        board[j][i].value = j + 1;
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromRight[i] === 6) {
      for (let j = 0; j < 6; j++) {
        board[i][j].value = 6 - j;
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromBottom[i] === 6) {
      for (let j = 0; j < 6; j++) {
        board[j][i].value = 6 - j;
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromLeft[i] === 6) {
      for (let j = 0; j < 6; j++) {
        board[i][j].value = j + 1;
      }
    }
  }
  refreshPossibleValues(board);
};
const checkHas1 = (board: Board, clues: Clues) => {
  const { countFromTop, countFromRight, countFromBottom, countFromLeft } =
    clues;
  for (let i = 0; i < 6; i++) {
    if (countFromTop[i] === 1) {
      board[0][i].value = 6;
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromRight[i] === 1) {
      board[i][5].value = 6;
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromBottom[i] === 1) {
      board[5][i].value = 6;
    }
  }
  for (let i = 0; i < 6; i++) {
    if (countFromLeft[i] === 1) {
      board[i][0].value = 6;
    }
  }
  refreshPossibleValues(board);
};
const refreshPossibleValues = (board: Board) => {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j].value !== UNKNOWN) {
        const value = board[i][j].value;
        board[i][j].possibleValues = [value];
        // update same row
        for (let k = 0; k < 6; k++) {
          if (k !== j) {
            board[i][k].possibleValues = board[i][k].possibleValues.filter(
              (v) => v !== value
            );
          }
        }
        // update same column
        for (let k = 0; k < 6; k++) {
          if (k !== i) {
            board[k][j].possibleValues = board[k][j].possibleValues.filter(
              (v) => v !== value
            );
          }
        }
      }
    }
  }
};

const printBoard = (board: Board) => {
  for (let i = 0; i < 6; i++) {
    console.log(
      board[i].map((cell) => (cell.value === 0 ? " " : cell.value)).join(" ")
    );
  }
};
const printPossibleValues = (board: Board) => {
  for (let i = 0; i < 6; i++) {
    console.log(
      board[i].map((cell) => `[${cell.possibleValues.join(",")}]`).join(" ")
    );
  }
};

const toResult = (board: Board) => {
  return board.map((row) => row.map((cell) => cell.value));
};

const main = () => {
  const clues = [
    3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4,
  ];
  solvePuzzle(clues);
};
main();
