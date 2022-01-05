// https://www.codewars.com/kata/55cf3b567fc0e02b0b00000b/train/typescript

export class G964 {
  private static partitionCache: { [key: number]: number[][] } = {};
  private static getPartitions(n: number): number[][] {
    if (n == 1) return [[1]];
    if (this.partitionCache[n]) return this.partitionCache[n];
    const partition: number[][] = [];
    for (let arrayLength = 1; arrayLength <= n; arrayLength++) {
      if (arrayLength == 1) partition.push([n]);
      else if (arrayLength == 2) {
        let a = n - 1;
        let b = 1;
        while (a >= b) {
          partition.push([a, b]);
          a--;
          b++;
        }
      } else if (arrayLength == n) {
        partition.push([...Array(n)].map((x) => 1));
      } else {
        const partitionNMinus1 = this.getPartitions(n - 1);
        const sameLengthArrs = partitionNMinus1.filter(
          (arr) => arr.length == arrayLength
        );
        sameLengthArrs.forEach((arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (i == 0 || arr[i - 1] > arr[i]) {
              const toBeAdded = [...arr];
              toBeAdded[i]++;
              partition.push(toBeAdded);
            }
          }
        });
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
    const point1 = Date.now();
    const partitions = this.getPartitions(n); // has duplicates
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

// 15 [LOG]: "getPartitions:27, getProducts:5, get result:0"
// 16 [LOG]: "getPartitions:133, getProducts:7, get result:0"
// 17 [LOG]: "getPartitions:269, getProducts:20, get result:0"
// 18 [LOG]: "getPartitions:797, getProducts:46, get result:1"
// 19 [LOG]: "getPartitions:2201, getProducts:181, get result:0"
