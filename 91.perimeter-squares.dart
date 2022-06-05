// https://www.codewars.com/kata/559a28007caad2ac4e000083/train/dart
BigInt perimeter(int m) {
  final sequence = getFibonacciSequenceAt(m + 1);
  return sequence.fold<BigInt>(BigInt.from(0),
      (previousValue, element) => previousValue + element * BigInt.from(4));
}

List<BigInt> getFibonacciSequenceAt(int n) {
  if (n <= fibonacciSequenceCache.length) {
    return fibonacciSequenceCache.sublist(0, n);
  }
  for (int i = fibonacciSequenceCache.length; i < n; i++) {
    final pre = fibonacciSequenceCache[i - 1];
    final prePre = fibonacciSequenceCache[i - 2];
    fibonacciSequenceCache.add(pre + prePre);
  }
  return fibonacciSequenceCache;
}

List<BigInt> fibonacciSequenceCache = [
  BigInt.from(1),
  BigInt.from(1),
  BigInt.from(2),
  BigInt.from(3),
  BigInt.from(5),
  BigInt.from(8)
];

void main(List<String> args) {
  print(perimeter(5));
}
