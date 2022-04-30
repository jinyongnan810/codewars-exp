// https://www.codewars.com/kata/554f76dca89983cc400000bb/train/dart
import 'dart:math';
// mvp

List<List<int>> solEqua(n) {
  final decomposition = primeDecomposition(n);
  List<int> flatten = [];
  decomposition.keys.forEach((key) {
    int count = decomposition[key]!;
    for (int i = 0; i < count; i++) {
      flatten.add(key);
    }
  });
  if (flatten.length == 1) {
    flatten.insert(0, 1);
  }
  print('flatten:$flatten');
  final pairs = getPairs(flatten);
  print('pairs:$pairs');
  List<List<int>> res = [];
  pairs.forEach((pair) {
    int x2 = pair.a + pair.b;
    // if (x2 % 2 != 0) return;
    if (x2.isOdd) return;
    int x = x2 ~/ 2;
    int larger = max(pair.a, pair.b);
    // if ((larger - x) % 2 != 0) return;
    if ((larger - x).isOdd) return;
    int y = (larger - x) ~/ 2;
    res.add([x, y]);
  });
  res.sort((a, b) => b[0] - a[0]);

  return res;
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
  // print(primeDecomposition(90002));
  print(solEqua(9009));
}

// other solutions
// https://www.codewars.com/kata/554f76dca89983cc400000bb/solutions/dart