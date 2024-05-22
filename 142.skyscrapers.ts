// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript
function solvePuzzle(input: number[]) {
  const board = new Board(input);
  // memo1: if clue is 6, then the row or column is [1,2,3,4,5,6]
  board.checkHas6();
  // memo2: if clue is 1, then the next cell is 6
  board.checkHas1();
  // memo3: if sum of clues is 7, then 6's position is fixed
  board.checkClueSum7();
  // no clue yet for the rest
  board.printPossibleValues();
  board.printBoard();
  return board.toResult();
}

type Clues = {
  countFromTop: number[];
  countFromRight: number[];
  countFromBottom: number[];
  countFromLeft: number[];
};
const UNKNOWN = 0;
type Cell = {
  value: number;
  possibleValues: number[];
};
// type Board = Cell[][];
class Board {
  cells: Cell[][];
  clues: Clues;
  constructor(clues: number[]) {
    this.cells = [];
    for (let i = 0; i < 6; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 6; j++) {
        row.push({ value: UNKNOWN, possibleValues: [1, 2, 3, 4, 5, 6] });
      }
      this.cells.push(row);
    }

    const countFromTop = clues.slice(0, 6);
    const countFromRight = clues.slice(6, 12);
    const countFromBottom = clues.slice(12, 18).reverse();
    const countFromLeft = clues.slice(18, 24).reverse();
    this.clues = {
      countFromTop,
      countFromRight,
      countFromBottom,
      countFromLeft,
    };
  }

  getRow = (i: number) => this.cells[i];
  getRowValues = (i: number) => this.cells[i].map((cell) => cell.value);
  getColumn = (j: number) => this.cells.map((row) => row[j]);
  getColumnValues = (j: number) => this.cells.map((row) => row[j].value);
  getRowClues = (i: number) => [
    this.clues.countFromLeft[i],
    this.clues.countFromRight[i],
  ];
  getColumnClues = (j: number) => [
    this.clues.countFromTop[j],
    this.clues.countFromBottom[j],
  ];

  printBoard = () => {
    for (let i = 0; i < 6; i++) {
      console.log(
        this.cells[i]
          .map((cell) => (cell.value === 0 ? " " : cell.value))
          .join(" ")
      );
    }
  };
  printPossibleValues = () => {
    for (let i = 0; i < 6; i++) {
      console.log(
        this.cells[i]
          .map((cell) => `[${cell.possibleValues.join(",")}]`)
          .join(" ")
      );
    }
  };

  toResult = () => {
    return this.cells.map((row) => row.map((cell) => cell.value));
  };

  checkHas6 = () => {
    const { countFromTop, countFromRight, countFromBottom, countFromLeft } =
      this.clues;
    for (let i = 0; i < 6; i++) {
      if (countFromTop[i] === 6) {
        for (let j = 0; j < 6; j++) {
          this.cells[j][i].value = j + 1;
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromRight[i] === 6) {
        for (let j = 0; j < 6; j++) {
          this.cells[i][j].value = 6 - j;
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromBottom[i] === 6) {
        for (let j = 0; j < 6; j++) {
          this.cells[j][i].value = 6 - j;
        }
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromLeft[i] === 6) {
        for (let j = 0; j < 6; j++) {
          this.cells[i][j].value = j + 1;
        }
      }
    }
    this.refreshPossibleValues();
  };
  checkHas1 = () => {
    const { countFromTop, countFromRight, countFromBottom, countFromLeft } =
      this.clues;
    for (let i = 0; i < 6; i++) {
      if (countFromTop[i] === 1) {
        this.cells[0][i].value = 6;
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromRight[i] === 1) {
        this.cells[i][5].value = 6;
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromBottom[i] === 1) {
        this.cells[5][i].value = 6;
      }
    }
    for (let i = 0; i < 6; i++) {
      if (countFromLeft[i] === 1) {
        this.cells[i][0].value = 6;
      }
    }
    this.refreshPossibleValues();
  };
  checkClueSum7 = () => {
    for (let i = 0; i < 6; i++) {
      const [top, bottom] = this.getRowClues(i);
      if (top + bottom === 7) {
        // if sum is 7, then 6's position is fixed
        this.cells[i][top - 1].value = 6;
      }
    }
    for (let j = 0; j < 6; j++) {
      const [left, right] = this.getColumnClues(j);
      if (left + right === 7) {
        // if sum is 7, then 6's position is fixed
        this.cells[left - 1][j].value = 6;
      }
    }
    this.refreshPossibleValues();
  };
  refreshPossibleValues = () => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.cells[i][j].value !== UNKNOWN) {
          const value = this.cells[i][j].value;
          this.cells[i][j].possibleValues = [value];
          // update same row
          for (let k = 0; k < 6; k++) {
            if (k !== j) {
              this.cells[i][k].possibleValues = this.cells[i][
                k
              ].possibleValues.filter((v) => v !== value);
            }
          }
          // update same column
          for (let k = 0; k < 6; k++) {
            if (k !== i) {
              this.cells[k][j].possibleValues = this.cells[k][
                j
              ].possibleValues.filter((v) => v !== value);
            }
          }
        }
      }
    }
  };
}

const main = () => {
  const clues = [
    // 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4,
    0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0,
  ];
  solvePuzzle(clues);
};
main();
