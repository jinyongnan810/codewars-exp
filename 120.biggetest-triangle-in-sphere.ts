// https://www.codewars.com/kata/57deba2e8a8b8db0a4000ad6/train/javascript
// https://github.com/jinyongnan810/codewars-exp/blob/master/120.biggetest-triangle-in-sphere.ts
type Point = number[];
function biggestTriangInt(
  pointsList: number[][],
  center: number[],
  radius: number
) {
  console.log(`pointsList:${pointsList}, center:${center}, radius:${radius}`);
  const pointsInside = pointsList.filter((p) =>
    insideTheSphere(p, center, radius)
  );
  const insideCount = pointsInside.length;
  console.log(`filtered points: ${insideCount}`);
  if (insideCount < 3) return [];
  const possibilities =
    (insideCount * (insideCount - 1) * (insideCount - 2)) / 6;
  // console.log(`possibilities:${possibilities}`);
  const possibleTriangles = pickItems(3, pointsInside);
  // console.log(possibleTriangles.length);
  const areaOfTriangles = possibleTriangles.map((tri) => areaOfTriangle(tri));
  // console.log(JSON.stringify(areaOfTriangles));

  let biggestTriangles: number[] = [];
  let biggestArea = 0;
  for (let i = 0; i < areaOfTriangles.length; i++) {
    const a = areaOfTriangles[i];
    if (a > biggestArea) {
      biggestTriangles = [i];
      biggestArea = a;
    } else if (a == biggestArea) {
      biggestTriangles.push(i);
    }
  }
  if (biggestTriangles.length == 1) {
    return [
      possibleTriangles.length,
      biggestArea,
      possibleTriangles[biggestTriangles[0]],
    ];
  }
  return [
    possibleTriangles.length,
    biggestArea,
    biggestTriangles.map((index) => possibleTriangles[index]),
  ];
}

const distance = (a: Point, b: Point): number => {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
};

const insideTheSphere = (p: Point, center: Point, radius: number): boolean => {
  const dist = distance(p, center);
  if (dist < radius && (radius - dist) / radius > 1e-10) return true;
  return false;
};

const pickItems = (k: number, list: Point[]): Point[][] => {
  // console.log(`(start)k:${k}, list:${JSON.stringify(list)}`);
  if (k == list.length) return [list];
  if (k == 1) return list.map((l) => [l]);
  let res: Point[][] = [];
  list.forEach((item, i) => {
    const restOfList = list.slice(i + 1);
    const pickKMinus1FromRest = pickItems(k - 1, restOfList);
    // console.log(
    //   `  item:${item}, i:${i}, pickKMinus1FromRest:${JSON.stringify(
    //     pickKMinus1FromRest
    //   )}`
    // );
    pickKMinus1FromRest.forEach(
      (picked) => picked.length == k - 1 && res.push([item, ...picked])
    );
  });
  // console.log(
  //   `(end)k:${k}, list:${JSON.stringify(list)}, res:${JSON.stringify(res)}`
  // );
  return res;
};

const areaOfTriangle = (triangle: Point[]): number => {
  const [a, b, c] = triangle;
  const ab = distance(a, b);
  const ac = distance(a, c);
  const bc = distance(b, c);
  const [d, e, f] = [ab, ac, bc].sort().reverse();
  // const semiperimeter = (ab + ac + bc) / 2;
  // ab: 10.198039027185569, ac: 7.483314773547883, bc: 9.38083151964686, semiperimeter: 13.531092660190154
  // ab: 7.483314773547883, ac: 9.38083151964686, bc: 10.198039027185569, semiperimeter: 13.531092660190156
  const semiperimeter = (d + e + f) / 2;
  // ab: 10.198039027185569, ac: 7.483314773547883, bc: 9.38083151964686, semiperimeter: 13.531092660190156
  // ab: 7.483314773547883, ac: 9.38083151964686, bc: 10.198039027185569, semiperimeter: 13.531092660190156
  // console.log(
  //   `ab: ${ab}, ac: ${ac}, bc: ${bc}, semiperimeter: ${semiperimeter}`
  // );

  // const area = Math.sqrt(
  //   semiperimeter *
  //     (semiperimeter - ab) *
  //     (semiperimeter - ac) *
  //     (semiperimeter - bc)
  // );
  const area = Math.sqrt(
    semiperimeter *
      (semiperimeter - d) *
      (semiperimeter - e) *
      (semiperimeter - f)
  );

  return area;
};

// const pointsList = [
//   [1, 2, -4],
//   [-3, 2, 4],
//   [7, 8, -4],
//   [2, 3, 5],
//   [-2, -1, 1],
// ];
// const center = [1, 2, -2];
// const radius = 8;

const pointsList = [
  [1, 2, -4],
  [-3, 2, 4],
  [7, 8, -4],
  [2, 3, 5],
  [-2, -1, 1],
  [3, 2, 6],
  [1, 4, 0],
  [-4, -5, -6],
  [4, 5, 6],
  [-2, -3, -5],
  [-1, -2, 4],
  [-3, -2, -6],
  [-1, -4, 0],
  [2, 1, -1],
];
const center = [0, 0, 0];
const radius = 8;

const res = biggestTriangInt(pointsList, center, radius);
console.log(JSON.stringify(res));
