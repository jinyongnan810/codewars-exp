// https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa/train/javascript
function solveMine(map: string, n: number): string {
  const mineSweeperMap = new MineSweeperMap(map);
  mineSweeperMap.printMap();
  console.log(JSON.stringify(mineSweeperMap.getSurroundingDots(0, 5)));
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
  dots: Dot[][] = [];
  constructor(map: string) {
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

  getSurroundingDots = (x: number, y: number): (Dot | null)[] => {
    return [
      // top left
      this.dots[y - 1]?.[x - 1] || null,
      // top
      this.dots[y - 1]?.[x] || null,
      // top right
      this.dots[y - 1]?.[x + 1] || null,
      // left
      this.dots[y]?.[x - 1] || null,
      // right
      this.dots[y]?.[x + 1] || null,
      // bottom left
      this.dots[y + 1]?.[x - 1] || null,
      // bottom
      this.dots[y + 1]?.[x] || null,
      // bottom right
      this.dots[y + 1]?.[x + 1] || null,
    ];
  };
  openDot = (x: number, y: number) => {
    // row index is y, so...
    this.open(y, x);
  };

  printMap = () => {
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
  };

  // dummy open function
  open = (row: number, col: number) => {};
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
