// https://www.codewars.com/kata/5da1df6d8b0f6c0026e6d58d/train/dart
import 'dart:math';

// k*k*k=x*x*y*y
int c(int k) {
  if (k == 1) return 1;
  if (checkIsPrime(k)) return 0;
  // get prime decomposition of k
  final kDecomposed = primeDecomposition(k);
  // multiply all prime factors count by 3
  final Map<int, int> k3Decomposed = {};
  kDecomposed.keys.forEach((key) {
    int count = kDecomposed[key]!;
    k3Decomposed[key] = count * 3;
  });
  print(k3Decomposed);
  // if contains any prime factor count is odd, return 0
  if (k3Decomposed.keys.where((key) => k3Decomposed[key]!.isOdd).isNotEmpty) {
    return 0;
  }
  // get prime decompositions of pairs (for x*x or y*y)
  final Map<int, int> decomposedPairs = {};
  k3Decomposed.keys.forEach((key) {
    // for each prime factor
    final int count = k3Decomposed[key]!;
    decomposedPairs[key] = count ~/ 2;
  });
  // flatten
  List<int> flatten = [];
  decomposedPairs.keys.forEach((key) {
    int count = decomposedPairs[key]!;
    for (int i = 0; i < count; i++) {
      flatten.add(key);
    }
  });
  // get pairs
  final pairs = getPairs(flatten);
  print(pairs);
  return pairs.length;
}

class Pair {
  final Map<int, int> a;
  final Map<int, int> b;

  Pair(this.a, this.b);
  @override
  String toString() {
    return '[$a,$b]';
  }

  bool isEqual(Pair other) {
    final othera = other.a;
    final otherb = other.b;
    if (othera.keys.toSet().difference(a.keys.toSet()).isNotEmpty) {
      return false;
    }
    if (otherb.keys.toSet().difference(b.keys.toSet()).isNotEmpty) {
      return false;
    }
    for (int key in a.keys) {
      if (a[key] != othera[key]) {
        return false;
      }
    }
    for (int key in a.keys) {
      if (b[key] != otherb[key]) {
        return false;
      }
    }
    return true;
  }
}

List<Pair> getPairs(List<int> list) {
  print('getPairs');
  int maxPairs = 1 << list.length;
  Map<int, int> itemsWithIndex = list.asMap();
  List<Pair> pairs = [];
  // 0000 to 1111
  for (int i = 0; i < maxPairs; i++) {
    Map<int, int> a = {};
    Map<int, int> b = {};
    itemsWithIndex.forEach((index, value) {
      if (i >> index & 1 == 1) {
        a[value] = a[value] == null ? 2 : a[value]! + 2;
      } else {
        b[value] = b[value] == null ? 2 : b[value]! + 2;
      }
    });
    final newPair = Pair(a, b);
    if (pairs.where((pair) => pair.isEqual(newPair)).isEmpty)
      pairs.add(newPair);
  }
  return pairs;
}

Map<int, int> primeDecomposition(int n) {
  if (checkIsPrime(n)) {
    return {n: 1};
  }
  // get decompositions
  int nTmp = n;
  int s = sqrt(n).toInt();
  Map<int, int> res = {};
  for (int i = 2; i <= s; i++) {
    if (!checkIsPrime(i)) continue;
    int prime = i;
    if (prime > nTmp) break;
    while (nTmp % prime == 0) {
      nTmp ~/= prime;
      if (res[prime] != null)
        res[prime] = (res[prime] ?? 0) + 1;
      else
        res[prime] = 1;
    }
    if (nTmp > 1 && checkIsPrime(nTmp)) {
      res[nTmp] = 1;
      break;
    }
  }
  return res;
}

Map<int, bool> primes = {2: true, 3: true, 4: false};
bool checkIsPrime(int n) {
  if (primes.containsKey(n)) return primes[n] ?? false;
  int s = sqrt(n).floor();
  for (int i = 2; i <= s; i++) {
    if (n % i == 0) {
      primes[n] = false;
      return false;
    }
  }
  primes[n] = true;
  return true;
}

main() {
  print(c(1369));
  // print(c(4096576));
}
