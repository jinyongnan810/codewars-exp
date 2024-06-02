// https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa/train/javascript
function solveMine(map: string, n: number): string {
  const mineSweeperMap = new MineSweeperMap(map);
  mineSweeperMap.loop();
  mineSweeperMap.printMap();
  // now here
  `? ? ? ? ? ?
  ? ? 2 1 2 ?
  ? ? 2 0 1 ?
  ? ? 2 1 2 ?
  1 1 1 1 ? ?
  0 0 0 1 ? ?`;
  return "?";
}

type DotType = "mine" | "number" | "unknown";
type Dot = {
  // index of column
  x: number;
  // index of row
  y: number;
  type: DotType;
  value?: number;
};

class MineSweeperMap {
  dots: Dot[][];
  constructor(map: string) {
    this.dots = [];
    const lines = map.split("\n").map((line) => line.trim().split(" "));
    for (let y = 0; y < lines.length; y++) {
      this.dots.push(
        lines[y].map((e, index) => ({
          x: index,
          y,
          type: e === "?" ? "unknown" : "number",
          value: e === "?" ? undefined : parseInt(e),
        }))
      );
    }
  }

  get width() {
    return this.dots[0].length;
  }
  get height() {
    return this.dots.length;
  }

  loop() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const dot = this.dots[y][x];
        if (dot.type === "number") {
          if (dot.value === 0) {
            this.getSurroundingDots(x, y).forEach((dot) => {
              if (dot != null && dot.type === "unknown") {
                this.openDot(dot.x, dot.y);
              }
            });
          }
        }
      }
    }
  }

  getSurroundingDots(x: number, y: number): (Dot | null)[] {
    return [
      // top left
      (this.dots[y - 1] != null && this.dots[y - 1][x - 1]) || null,
      // top
      (this.dots[y - 1] != null && this.dots[y - 1][x]) || null,
      // top right
      (this.dots[y - 1] != null && this.dots[y - 1][x + 1]) || null,
      // left
      this.dots[y][x - 1] || null,
      // right
      this.dots[y][x + 1] || null,
      // bottom left
      (this.dots[y + 1] != null && this.dots[y + 1][x - 1]) || null,
      // bottom
      (this.dots[y + 1] != null && this.dots[y + 1][x]) || null,
      // bottom right
      (this.dots[y + 1] != null && this.dots[y + 1][x + 1]) || null,
    ];
  }
  openDot(x: number, y: number) {
    // FIXME: remove this and use open method given.
    // row index is y, so...
    const openResult = this.open(y, x);
    console.log(`opening ${x}, ${y}, result: ${openResult}`);
    // if open result is mine, the game is over, so don't need to worry about it.
    const number = parseInt(openResult as string);
    if (isNaN(number)) {
      throw new Error("Unexpected open result");
    }
    this.dots[y][x].type = "number";
    this.dots[y][x].value = number;
  }
  // dummy open function
  // FIXME: remove this
  open(row: number, col: number): string {
    return "0";
  }

  markAsMine(x: number, y: number) {
    this.dots[y][x].type = "mine";
  }

  printMap() {
    this.dots.forEach((line) => {
      console.log(
        line
          .map((dot) => {
            switch (dot.type) {
              case "mine":
                return "x";
              case "number":
                return dot.value;
              case "unknown":
                return "?";
            }
          })
          .join(" ")
      );
    });
  }

  checkIsCleared() {
    return this.dots.every((line) =>
      line.every((dot) => dot.type === "number" || dot.type === "mine")
    );
  }
}
const mineSweeperMain = () => {
  const map = `? ? ? ? ? ?
  ? ? ? ? ? ?
  ? ? ? 0 ? ?
  ? ? ? ? ? ?
  ? ? ? ? ? ?
  0 0 0 ? ? ?`;
  solveMine(map, 6);
  const expected = `1 x 1 1 x 1
  2 2 2 1 2 2
  2 x 2 0 1 x
  2 x 2 1 2 2
  1 1 1 1 x 1
  0 0 0 1 1 1`;
};
mineSweeperMain();
