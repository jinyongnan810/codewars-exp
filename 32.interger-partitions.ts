// https://www.codewars.com/kata/55cf3b567fc0e02b0b00000b/train/typescript

export class G964 {
  private static partitionCache: { [key: number]: number[][] } = {};
  private static getPartitions(n: number): number[][] {
    if (n == 1) return [[1]];
    if (this.partitionCache[n]) return this.partitionCache[n];
    const nMinus1Partition = this.getPartitions(n - 1);
    const partition: number[][] = [];
    for (let i = 0; i < nMinus1Partition.length; i++) {
      const partitionBefore = nMinus1Partition[i];
      for (let p = 0; p < partitionBefore.length; p++) {
        if (p == partitionBefore.length - 1) {
          const toBeAdded = [...partitionBefore, 1];
          partition.push(toBeAdded);
        }
        if (p == 0 || partitionBefore[p - 1] > partitionBefore[p]) {
          const toBeAdded = [...partitionBefore];
          toBeAdded[p]++;
          partition.push(toBeAdded);
        }
      }
    }
    this.partitionCache[n] = partition;
    return partition;
  }
  private static getProducts = (partitions: number[][]): number[] => {
    const products = partitions.map((partition) =>
      partition.reduce((prev, cur) => prev * cur, 1)
    );
    const removeDuplicates = [...new Set(products)];
    return removeDuplicates.sort((a, b) => a - b);
  };
  public static part(n: number) {
    // get partitions
    const partitions = this.getPartitions(n); // has duplicates
    // console.log(`partitions:${JSON.stringify(partitions)}`);
    // get products
    const products = this.getProducts(partitions);
    // console.log(`products:${JSON.stringify(products)}`);
    // get final results
    const len = products.length;
    const range = products[len - 1] - products[0];
    const average = products.reduce((prev, cur) => prev + cur, 0) / len;
    const median =
      len % 2 == 0
        ? (products[len / 2] + products[len / 2 - 1]) / 2
        : products[Math.floor(len / 2)];
    return `Range: ${range} Average: ${average.toFixed(
      2
    )} Median: ${median.toFixed(2)}`;
  }
}
