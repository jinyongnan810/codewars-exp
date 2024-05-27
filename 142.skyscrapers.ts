// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript
function solvePuzzle(input: number[]) {
  const board = new Board(input);
  // memo1: if clue is 6, then the row or column is [1,2,3,4,5,6]
  board.checkHas6();
  // memo2: if clue is 1, then the next cell is 6
  board.checkHas1();
  // memo3: if sum of clues is 7, then 6's position is fixed
  board.checkClueSum7();

  // FIXME: remove this test
  const column5 = board.getColumn(4);
  const clue5 = board.getColumnClues(4);
  const possibleSequences = Board.getAllPossibleSequences(column5, clue5);
  console.log(JSON.stringify(possibleSequences));

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
type SequenceAndCount = {
  sequence: number[];
  countFromStart: number;
  countFromEnd: number;
};
// type Board = Cell[][];
class Board {
  cells: Cell[][];
  clues: Clues;
  constructor(clues: number[], cells: number[][] = []) {
    this.cells = cells.map((row) =>
      row.map((value) => ({ value, possibleValues: [value] }))
    );
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

  checkCluesFit = () => {
    for (let i = 0; i < 6; i++) {
      const [left, right] = this.getRowClues(i);
      const rowValues = this.getRowValues(i);
      const [countFromLeft, countFromRight] =
        Board.getCountFromEachDirection(rowValues);
      if (
        (left != UNKNOWN && countFromLeft !== left) ||
        (right != UNKNOWN && countFromRight !== right)
      ) {
        return false;
      }
    }
    for (let j = 0; j < 6; j++) {
      const [top, bottom] = this.getColumnClues(j);
      const columnValues = this.getColumnValues(j);
      const [countFromTop, countFromBottom] =
        Board.getCountFromEachDirection(columnValues);
      if (
        (top != UNKNOWN && countFromTop !== top) ||
        (bottom != UNKNOWN && countFromBottom !== bottom)
      ) {
        return false;
      }
    }
    return true;
  };

  static getCountFromEachDirection = (values: number[]) => {
    let max = 0;
    let countFromStart = 0;
    for (let i = 0; i < 6; i++) {
      if (values[i] > max) {
        max = values[i];
        countFromStart++;
      }
    }
    let countFromEnd = 0;
    max = 0;
    for (let i = 5; i >= 0; i--) {
      if (values[i] > max) {
        max = values[i];
        countFromEnd++;
      }
    }
    return [countFromStart, countFromEnd];
  };

  static getAllPossibleSequences = (cells: Cell[], clues: number[]) => {
    const [clue1, clue2] = clues;
    return fullSequencesAndCounts.filter((s) => {
      const { sequence, countFromStart, countFromEnd } = s;
      const [a, b, c, d, e, f] = sequence;
      // match possible values
      if (
        !(
          cells[0].possibleValues.includes(a) &&
          cells[1].possibleValues.includes(b) &&
          cells[2].possibleValues.includes(c) &&
          cells[3].possibleValues.includes(d) &&
          cells[4].possibleValues.includes(e) &&
          cells[5].possibleValues.includes(f)
        )
      ) {
        return false;
      }
      // match clues
      if (clue1 !== UNKNOWN && countFromStart !== clue1) {
        return false;
      }
      if (clue2 !== UNKNOWN && countFromEnd !== clue2) {
        return false;
      }
      return true;
    });
  };
}

//#region common functions
const getSequences = (possibleValues: number[]) => {
  const result: number[][] = [];
  possibleValues.forEach((value) => {
    const rest = possibleValues.filter((v) => v !== value);
    if (rest.length === 0) {
      result.push([value]);
    } else {
      const restSequences = getSequences(rest);
      restSequences.map((sequence) => {
        result.push([value, ...sequence]);
      });
    }
  });
  return result;
};

const filterSequences = (
  array: SequenceAndCount[],
  predicate: (element: SequenceAndCount) => boolean
) => {
  const result: SequenceAndCount[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

//#endregion
const fullSequences = getSequences([1, 2, 3, 4, 5, 6]);
const fullSequencesAndCounts: SequenceAndCount[] = fullSequences.map((s) => {
  const [countFromStart, countFromEnd] = Board.getCountFromEachDirection(s);
  return { sequence: s, countFromStart, countFromEnd };
});

const main = () => {
  const clues = [
    // 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4,
    0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0,
  ];
  solvePuzzle(clues);

  // test();
};

const test = () => {
  const board = new Board(
    [0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0],
    [
      [5, 6, 1, 4, 3, 2],
      [4, 1, 3, 2, 6, 5],
      [2, 3, 6, 1, 5, 4],
      [6, 5, 4, 3, 2, 1],
      [1, 2, 5, 6, 4, 3],
      [3, 4, 2, 5, 1, 6],
    ]
  );
  console.log(board.checkCluesFit());
};

main();
