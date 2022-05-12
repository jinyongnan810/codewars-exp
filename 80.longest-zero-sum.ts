// https://www.codewars.com/kata/52b4d1be990d6a2dac0002ab/train/javascript
const maxZeroSequence = function (arr: number[]): number[] {
  console.log(arr);
  const maxL = arr.length;
  const zeroSequence: number[][] = [];
  for (let i = 0; i < maxL; i++) {
    for (let j = 0; j < maxL - i; j++) {
      const slice = arr.slice(i, maxL - j);
      const s = sumOfArray(slice);
      if (s == 0) {
        zeroSequence.push(slice);
        break;
      }
    }
  }
  const maxSequence = zeroSequence.reduce(
    (prev, cur) => (cur.length >= prev.length ? cur : prev),
    []
  );
  console.log(maxSequence);
  return maxSequence;
};

const sumOfArray = (list: number[]): number => {
  return list.reduce((prev, cur) => prev + cur, 0);
};

const input = [
  -60, -73, 96, 19, -35, 27, 13, -29, -38, 56, 85, -34, 68, -34, 29, -90, 95,
  -62, -77, -14, -77, -53, 61, 33, -45, -34, 15, 56, -57, 32, 78, 17, 14, 93,
  88, 99, 47, -31, 67, -77, 74, 93, -14, -13, -36, -8, -9, -83, 52, -94, -62,
  40, -70, -20, 41, -10, 78, 22, 99, -36, -4, -24, 10, 53, 46, 92, -9, 20, 37,
  -94, -6, -13, -18, 56, -94, 19, 43, -88, -89, -73, -54, 4, -50, 45,
];
console.log(maxZeroSequence(input));

const expect = [
  -9, -83, 52, -94, -62, 40, -70, -20, 41, -10, 78, 22, 99, -36, -4, -24, 10,
  53, 46, 92, -9, 20, 37, -94, -6, -13, -18, 56, -94,
];
