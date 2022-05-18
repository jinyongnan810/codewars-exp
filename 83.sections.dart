// https://www.codewars.com/kata/5da1df6d8b0f6c0026e6d58d/train/dart
import 'dart:math';

// k*k*k=x*x*y*y
int c(int k) {
  if (k == 1) return 1;
  // get prime decomposition of k
  final kDecomposed = primeDecomposition(k);
  if (kDecomposed.keys.length == 1) return 0;
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
  // flatten
  List<int> flatten = [];
  k3Decomposed.keys.forEach((key) {
    int count = k3Decomposed[key]!;
    for (int i = 0; i < count; i++) {
      flatten.add(key);
    }
  });
  // get pairs
  final pairs = getPairs(flatten);
  print(pairs);
  return pairs.length * 2;
}

class Pair<T1, T2> {
  final T1 a;
  final T2 b;

  Pair(this.a, this.b);
  @override
  String toString() {
    return '[$a,$b]';
  }
}

List<Pair> getPairs(List<int> list) {
  print('getPairs');
  int maxPairs = 1 << list.length;
  Map<int, int> itemsWithIndex = list.asMap();
  List<Pair> pairs = [];
  // 0000 to 1111
  for (int i = 0; i < maxPairs - 1; i++) {
    int a = 1;
    int b = 1;
    itemsWithIndex.forEach((index, value) {
      if (i >> index & 1 == 1) {
        a *= value;
      } else {
        b *= value;
      }
    });
    // print('a:$a,b:$b');
    final sqrta = sqrt(a);
    if (sqrta.toInt() != sqrta) continue;
    final sqrtb = sqrt(b);
    if (sqrtb.toInt() != sqrtb) continue;
    if (pairs.where((pair) => pair.a == a || pair.a == b).isEmpty)
      pairs.add(Pair(a, b));
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
  print(c(2019));
  print(c(4096576));
}
