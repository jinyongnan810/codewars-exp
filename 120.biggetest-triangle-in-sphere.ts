// https://www.codewars.com/kata/57deba2e8a8b8db0a4000ad6/train/javascript
function biggestTriangInt(
  pointsList: number[][],
  center: number[],
  radius: number
) {
  const pointsInside = pointsList.filter((p) =>
    insideTheSphere(p, center, radius)
  );
  const insideCount = pointsInside.length;
  console.log(`filtered points: ${insideCount}`);
  if (insideCount < 3) return [];
  const possibilities =
    (insideCount * (insideCount - 1) * (insideCount - 2)) / 6;
  console.log(`possibilities:${possibilities}`);
  return [[]];
}

const distance = (a: number[], b: number[]): number => {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
};

const insideTheSphere = (
  p: number[],
  center: number[],
  radius: number
): boolean => {
  const dist = distance(p, center);
  if (dist < radius && (radius - dist) / radius > 1e-10) return true;
  return false;
};

const points_list = [
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
const sphere_center = [0, 0, 0];
const radius = 8;

biggestTriangInt(points_list, sphere_center, radius);
