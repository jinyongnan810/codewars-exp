// https://www.codewars.com/kata/5679d5a3f2272011d700000d/train/javascript
function solvePuzzle(input: number[]) {
  const cells = [];
  for (let i = 0; i < 6; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 6; j++) {
      row.push({ value: UNKNOWN, possibleValues: [1, 2, 3, 4, 5, 6] });
    }
    cells.push(row);
  }
  const countFromTop = input.slice(0, 6);
  const countFromRight = input.slice(6, 12);
  const countFromBottom = input.slice(12, 18).reverse();
  const countFromLeft = input.slice(18, 24).reverse();
  const clues = {
    countFromTop,
    countFromRight,
    countFromBottom,
    countFromLeft,
  };
  const board = new Board(cells, clues);

  // memo1: if clue is 6, then the row or column is [1,2,3,4,5,6]
  board.checkHas6();
  // memo2: if clue is 1, then the next cell is 6
  board.checkHas1();
  // memo3: if sum of clues is 7, then 6's position is fixed
  board.checkClueSum7();
  // recursive search
  const result = findSolutions(board);
  if (result === null) {
    throw new Error("No solution");
  }
  result.printBoard();
  return result.toResult();
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
type BoardAllPossibilities = {
  row: {
    solved: boolean;
    possibleSequences: SequenceAndCount[];
  }[];
  column: {
    solved: boolean;
    possibleSequences: SequenceAndCount[];
  }[];
};
class Board {
  cells: Cell[][];
  clues: Clues;
  constructor(cells: Cell[][], clues: Clues) {
    this.cells = cells;
    this.clues = clues;
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
              const newPossibleValues = this.cells[i][k].possibleValues.filter(
                (v) => v !== value
              );
              if (newPossibleValues.length === 0) {
                throw new Error("No possible values");
              }
              this.cells[i][k].possibleValues = newPossibleValues;
            }
          }
          // update same column
          for (let k = 0; k < 6; k++) {
            if (k !== i) {
              const newPossibleValues = this.cells[k][j].possibleValues.filter(
                (v) => v !== value
              );
              if (newPossibleValues.length === 0) {
                throw new Error("No possible values");
              }
              this.cells[k][j].possibleValues = newPossibleValues;
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

  copyWithRow(i: number, values: number[]): Board | null {
    const newCells = this.cells.map((row, index) => {
      if (index === i) {
        return values.map((value) => ({ value, possibleValues: [value] }));
      }
      return row.map((cell) => this.copyCell(cell));
    });
    const newBoard = new Board(newCells, this.clues);
    try {
      newBoard.refreshPossibleValues();
      return newBoard;
    } catch (error) {
      return null;
    }
  }

  copyWithColumn(j: number, values: number[]): Board | null {
    const newCells = this.cells.map((row, i) =>
      row.map((cell, index) => {
        if (index === j) {
          return { value: values[i], possibleValues: [values[i]] };
        }
        return this.copyCell(cell);
      })
    );
    const newBoard = new Board(newCells, this.clues);
    try {
      newBoard.refreshPossibleValues();
      return newBoard;
    } catch (error) {
      return null;
    }
  }

  copy() {
    return new Board(
      this.cells.map((row) => row.map((cell) => this.copyCell(cell))),
      this.clues
    );
  }

  copyCell(cell: Cell) {
    return { value: cell.value, possibleValues: cell.possibleValues.slice() };
  }

  static checkRowOrColumnIsSolved = (cells: Cell[]) => {
    return cells.every((cell) => cell.value !== UNKNOWN);
  };

  checkIsSolved = () => {
    for (let i = 0; i < 6; i++) {
      if (!Board.checkRowOrColumnIsSolved(this.getRow(i))) {
        return false;
      }
      if (!Board.checkRowOrColumnIsSolved(this.getColumn(i))) {
        return false;
      }
    }
    return true;
  };

  getAllPossibleSequences = (): BoardAllPossibilities | null => {
    const result: BoardAllPossibilities = {
      row: [],
      column: [],
    };
    for (let i = 0; i < 6; i++) {
      const row = this.getRow(i);
      if (Board.checkRowOrColumnIsSolved(row)) {
        result.row.push({ solved: true, possibleSequences: [] });
        continue;
      }
      const clues = this.getRowClues(i);
      const possibleSequences = Board.getPossibleSequences(row, clues);
      if (possibleSequences.length === 0) {
        return null;
      }
      result.row.push({ solved: false, possibleSequences });
    }
    for (let j = 0; j < 6; j++) {
      const column = this.getColumn(j);
      if (Board.checkRowOrColumnIsSolved(column)) {
        result.column.push({ solved: true, possibleSequences: [] });
        continue;
      }
      const clues = this.getColumnClues(j);
      const possibleSequences = Board.getPossibleSequences(column, clues);
      if (possibleSequences.length === 0) {
        return null;
      }
      result.column.push({ solved: false, possibleSequences });
    }
    return result;
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

  static getPossibleSequences = (
    cells: Cell[],
    clues: number[]
  ): SequenceAndCount[] => {
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

// TODO: do recursive search

const findSolutions = (board: Board): Board | null => {
  const allPossibleSequences = board.getAllPossibleSequences();
  if (allPossibleSequences === null) {
    return null;
  }
  if (board.checkIsSolved()) {
    return board;
  }

  // find the row or column with the minimum number of possible sequences
  const { row, column } = allPossibleSequences;
  let minRowCount = 1000;
  let minRowIndex = -1;
  for (let i = 0; i < 6; i++) {
    if (!row[i].solved && row[i].possibleSequences.length < minRowCount) {
      minRowCount = row[i].possibleSequences.length;
      minRowIndex = i;
    }
  }
  let minColumnCount = 1000;
  let minColumnIndex = -1;
  for (let i = 0; i < 6; i++) {
    if (
      !column[i].solved &&
      column[i].possibleSequences.length < minColumnCount
    ) {
      minColumnCount = column[i].possibleSequences.length;
      minColumnIndex = i;
    }
  }

  // do recursive search
  if (minRowCount <= minColumnCount) {
    for (let i = 0; i < row[minRowIndex].possibleSequences.length; i++) {
      const sequence = row[minRowIndex].possibleSequences[i].sequence;
      const newBoard = board.copyWithRow(minRowIndex, sequence);
      if (newBoard !== null) {
        const result = findSolutions(newBoard);
        if (result !== null) {
          return result;
        }
      }
    }
  } else {
    for (let i = 0; i < column[minColumnIndex].possibleSequences.length; i++) {
      const sequence = column[minColumnIndex].possibleSequences[i].sequence;
      const newBoard = board.copyWithColumn(minColumnIndex, sequence);
      if (newBoard !== null) {
        const result = findSolutions(newBoard);
        if (result !== null) {
          return result;
        }
      }
    }
  }

  return null;
};

//#endregion
const fullSequences = getSequences([1, 2, 3, 4, 5, 6]);
const fullSequencesAndCounts: SequenceAndCount[] = fullSequences.map((s) => {
  const [countFromStart, countFromEnd] = Board.getCountFromEachDirection(s);
  return { sequence: s, countFromStart, countFromEnd };
});

const main = () => {
  const clues = [
    3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4,
    // 0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0,
  ];
  const startTime = new Date().getTime();
  solvePuzzle(clues);
  const endTime = new Date().getTime();
  console.log(`Time: ${endTime - startTime}ms`);
};

main();
