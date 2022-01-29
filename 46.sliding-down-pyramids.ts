// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript
// https://projecteuler.net/problem=18

type PyrimidNode = {
  value: number;
  possibles: number[];
};

function longestSlideDown(pyramid: number[][]) {
  const pyrimidNodes: PyrimidNode[][] = pyramid.map((level) =>
    level.map((node) => ({ value: node, possibles: [] }))
  );
  pyrimidNodes[0][0].possibles = [pyrimidNodes[0][0].value];
  for (let i = 1; i < pyrimidNodes.length; i++) {
    for (let j = 0; j < pyrimidNodes[i].length; j++) {
      if (j != 0) {
        pyrimidNodes[i - 1][j - 1].possibles.forEach((x) =>
          pyrimidNodes[i][j].possibles.push(x + pyrimidNodes[i][j].value)
        );
      }
      if (j != pyrimidNodes[i].length - 1)
        pyrimidNodes[i - 1][j].possibles.forEach((x) =>
          pyrimidNodes[i][j].possibles.push(x + pyrimidNodes[i][j].value)
        );
    }
    // remove unneeded rows
    i--;
    pyrimidNodes.shift();
  }
  return pyrimidNodes[pyrimidNodes.length - 1].reduce((prev, cur) => {
    const largest = cur.possibles.reduce((p, c) => (c > p ? c : p), 0);
    return largest > prev ? largest : prev;
  }, 0);
}
