// https://www.codewars.com/kata/5a045fee46d843effa000070/train/dart
import 'dart:math';

List<int> primes = [2, 3];
List<Map<int, int>> primeCompositions = [
  {2: 0},
  {2: 0},
  {2: 1},
  {3: 1}
];
String decomp(int n) {
  Map<int, int> res = {};
  for (int i = 2; i <= n; i++) {
    final subRes = primeDecomposition(i);
    subRes.keys.forEach((key) {
      if (res[key] != null)
        res[key] = (res[key] ?? 0) + (subRes[key] ?? 0);
      else
        res[key] = (subRes[key] ?? 0);
    });
  }
  final keys = res.keys.toList();
  keys.sort();
  return keys.map((key) {
    if ((res[key] ?? 0) > 1)
      return '$key^${res[key] ?? 0}';
    else
      return '$key';
  }).join(' * ');
}

Map<int, int> primeDecomposition(int n) {
  // get all the primes
  if (n > primes.last) {
    for (int i = primes.last + 1; i <= n; i++) {
      checkIsPrime(i);
    }
  }
  // get decompositions
  int nTmp = n;
  Map<int, int> res = {};
  for (int i = 0; i < primes.length; i++) {
    int prime = primes[i];
    if (prime > nTmp) break;
    while (nTmp % prime == 0) {
      nTmp ~/= prime;
      if (res[prime] != null)
        res[prime] = (res[prime] ?? 0) + 1;
      else
        res[prime] = 1;
    }
  }
  return res;
}

bool checkIsPrime(int n) {
  if (n < primes.last) {
    return primes.contains(n);
  }
  int s = sqrt(n).floor();
  for (int i = 2; i < s; i++) {
    if (n % i == 0) return false;
  }
  primes.add(n);
  return true;
}

main() {
  print(decomp(5));
}
