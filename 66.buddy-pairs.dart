// https://www.codewars.com/kata/59ccf051dcc4050f7800008f/train/dart
import 'dart:math';

Map<int, int> sumOfDividersCache = {};
Map<int, List<int>?> buddyCache = {};
List<int> primes = [2, 3];

Map<int, int> primeDecomposition(int n) {
  // get decompositions
  int nTmp = n;
  Map<int, int> res = {};
  for (int i = 0; i < primes.length; i++) {
    int prime = primes[i];
    while (nTmp % prime == 0) {
      if (prime > nTmp) continue;
      nTmp ~/= prime;
      res[prime] = (res[prime] ?? 0) + 1;
      if (nTmp != 1 && checkIsPrime(nTmp)) {
        res[nTmp] = (res[nTmp] ?? 0) + 1;
        if (!primes.contains(nTmp)) primes.add(nTmp);
        return res;
      }
    }
  }
  return res;
}

bool checkIsPrime(int n) {
  if (primes.contains(n)) return true;
  int s = sqrt(n).floor();
  for (int i = 2; i <= s; i++) {
    if (n % i == 0) return false;
  }
  primes.add(n);
  return true;
}

List<int>? buddy(int start, int limit) {
  print('$start-$limit');
  // get all the primes
  int s = sqrt(limit).floor();
  for (int i = 3; i <= s; i++) {
    checkIsPrime(i);
  }
  for (int i = start; i <= limit; i++) {
    if (buddyCache.containsKey(i)) {
      if (buddyCache[i] == null) continue;
      return buddyCache[i];
    }
    int sum = sumOfDividers_v2(i);
    if (sum == 0) continue;
    if (sum - 1 < i) {
      buddyCache[i] = null;
      continue;
    }
    int sumsum = sumOfDividers_v2(sum - 1);
    if (sumsum - 1 == i) {
      buddyCache[i] = [i, sum - 1];
      return [i, sum - 1];
    }
    buddyCache[i] = null;
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

int sumOfDividers_v2(int n) {
  if (sumOfDividersCache.containsKey(n)) return sumOfDividersCache[n]!;
  final primeDecs = primeDecomposition(n);
  // print(primeDecs);
  List<int> primeDecsFlat = [];
  primeDecs.entries.forEach((entry) {
    for (int i = 0; i < entry.value; i++) {
      primeDecsFlat.add(entry.key);
    }
  });
  Map<int, int> primeDecsFlatMap = primeDecsFlat.asMap();
  // print(primeDecsFlatMap);
  int maxVariations = 1 << primeDecsFlatMap.length;
  // print(maxVariations);
  List<int> variations = [];
  for (int i = 0; i < maxVariations - 1; i++) {
    int s = 1;
    primeDecsFlatMap.forEach((index, value) {
      if ((i >> index & 1) == 1) {
        s *= value;
      }
    });
    variations.add(s);
  }
  // print(variations.toSet().toList());
  int sum = variations
      .toSet()
      .toList()
      .fold<int>(0, (previousValue, element) => previousValue + element);
  sumOfDividersCache[n] = sum;
  return sum;
}

main() {
  print(buddy(10, 50));
  print(buddy(200, 1000));
  print(buddy(57345, 90061));
  // print(buddy(57345, 90061));
  // print(buddy(57345, 90061));
  print(buddy(310, 2755));
  // print(primes);
  // print(buddy(1071625, 1103735));
  // print(primeDecomposition(62744));
  // print(primeDecomposition(62744));
  // print(sumOfDividers_v2(62744));
  // print(primeDecomposition(9209));
  // print(sumOfDividers_v2(9209));
  // print(sumOfDividersCache.keys.length);
  // print(buddyCache.keys.length);
  // print(buddyCache[62744]);
  // print(DateTime.now()); // 2022-03-20 09:57:17.781338
  // for (int i = 1081184; i < 1082184; i++) sumOfDividers(i);
  // print(DateTime.now()); // 2022-03-20 09:57:20.452079
  // for (int i = 1081184; i < 1082184; i++) sumOfDividers_v2(i);
  // print(DateTime.now()); // 2022-03-20 09:57:20.757949
}
