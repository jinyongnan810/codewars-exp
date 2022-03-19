// https://www.codewars.com/kata/59ccf051dcc4050f7800008f/train/dart

Map<int, int> sumOfDividersCache = {};

List<int>? buddy(int start, int limit) {
  for (int i = start; i <= limit; i++) {
    int sum = sumOfDividers(i);
    if (sum - 1 < i) continue;
    int sumsum = sumOfDividers(sum - 1);
    if (sumsum - 1 == i) return [i, sum - 1];
  }
  return null;
}

int sumOfDividers(int n) {
  if (sumOfDividersCache.containsKey(n)) return sumOfDividersCache[n]!;
  int sum = 1;
  for (int i = 2; i < n; i++) {
    if (n % i == 0) sum += i;
  }
  sumOfDividersCache[n] = sum;
  return sum;
}

main() {
  print(buddy(10, 50));
  print(buddy(200, 1000));
  print(buddy(57345, 90061));
  print(buddy(57345, 90061));
  print(sumOfDividersCache.keys.length);
}
