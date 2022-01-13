// https://www.codewars.com/kata/5672682212c8ecf83e000050/train/typescript
let layersCache: number[][] = [[1]];
let sortedArrayCache: number[] = [1];
const getToLayerX = (x: number): number[][] => {
  if (x <= layersCache.length) {
    return layersCache.slice(0, x);
  }
  for (let i = layersCache.length; i < x; i++) {
    const layerI: number[] = [];
    const layerIMinus1 = layersCache[i - 1];
    layerIMinus1.forEach((j) => {
      layerI.push(j * 2 + 1);
      layerI.push(j * 3 + 1);
    });
    layersCache.push(layerI);
  }
  return layersCache;
};
const getFinalArray = (layers: number[][]): number[] => {
  const array: number[] = [];
  layers.forEach((layer) => layer.forEach((x) => array.push(x)));
  const removeDupliactes = [...new Set(array)];
  sortedArrayCache = removeDupliactes.sort((a, b) => a - b);
  return sortedArrayCache;
};
export function dblLinear(n: number): number {
  if (n < sortedArrayCache.length) {
    return sortedArrayCache[n];
  }
  // calc how many layers are needed
  let layersNeeded = 1;
  let maxNum = 1;
  while (maxNum < n) {
    maxNum += 2 ** layersNeeded;
    layersNeeded++;
  }
  // do two more
  layersNeeded += 3;
  console.log(`layersNeeded:${layersNeeded}`);
  // calc the layers
  const layers = getToLayerX(layersNeeded);
  // get sorted array
  const sorted = getFinalArray(layers);
  //   console.log(`final array:${JSON.stringify(sorted)}`);
  // result
  return sorted[n];
}
