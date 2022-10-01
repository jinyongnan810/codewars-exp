// https://www.codewars.com/kata/55c6126177c9441a570000cc/train/typescript
type WeightWeight = {
  original: string;
  digitSum: number;
};
export function orderWeight(input: string): string {
  const weights = input.split(" ").filter((x) => x != "");
  const weightWeights = weights.map<WeightWeight>((w) => ({
    original: w,
    digitSum: digitSum(w),
  }));
  return weightWeights
    .sort((a, b) => {
      if (a.digitSum != b.digitSum) return a.digitSum - b.digitSum;
      return a.original.localeCompare(b.original);
    })
    .map((w) => w.original)
    .join(" ");
}

const digitSum = (n: string): number => {
  return n
    .split("")
    .map((x) => parseInt(x))
    .reduce((p, c) => p + c, 0);
};
