// https://www.codewars.com/kata/55cf3b567fc0e02b0b00000b/train/typescript

export class G964 {
  private static partitionCache: { [key: number]: number[][] } = {};
  private static getPartitions(n: number): number[][] {
    if (n == 1) return [[1]];
    if (this.partitionCache[n]) return this.partitionCache[n];
    const partitions: number[][] = [];
    partitions.push([n]);
    partitions.push([...Array(n)].map((x) => 1));
    if (n >= 3) {
      for (let i = n - 1; i >= 2; i--) {
        const partitionsForI = this.getPartitions(n - i);
        const filtered = partitionsForI.filter(
          (partitionForI) => !partitionForI.some((x) => x > i)
        );
        filtered.forEach((f) => partitions.push([i, ...f]));
      }
    }
    this.partitionCache[n] = partitions;
    return partitions;
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
    const point1 = Date.now();
    const partitions = this.getPartitions(n);
    const point2 = Date.now();
    // console.log(`partitions:${JSON.stringify(partitions)}`);
    // console.log(`cache:${JSON.stringify(this.partitionCache)}`);
    // get products
    const products = this.getProducts(partitions);
    const point3 = Date.now();
    // console.log(`products:${JSON.stringify(products)}`);

    // get final results
    const len = products.length;
    const range = products[len - 1] - products[0];
    const average = products.reduce((prev, cur) => prev + cur, 0) / len;
    const median =
      len % 2 == 0
        ? (products[len / 2] + products[len / 2 - 1]) / 2
        : products[Math.floor(len / 2)];
    const point4 = Date.now();

    console.log(
      `getPartitions:${point2 - point1}, getProducts:${
        point3 - point2
      }, get result:${point4 - point3}`
    );
    return `Range: ${range} Average: ${average.toFixed(
      2
    )} Median: ${median.toFixed(2)}`;
  }
}
