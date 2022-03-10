// https://www.codewars.com/kata/54d7660d2daf68c619000d95/train/dart
import 'dart:math';

List<int> primes = [2, 3];

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

int getGreatestCommonDivisor(List<int> list) {
  final maxSqrt = list.fold<int>(0, (previousValue, element) {
    int s = sqrt(element).floor();
    return previousValue < s ? s : previousValue;
  });
  List<int> cd = [];
  for (int i = 2; i <= maxSqrt; i++) {
    if (!checkIsPrime(i)) continue;
    while (list.every((element) => element % i == 0)) {
      cd.add(i);
      list = list.map((e) => (e / i).floor()).toList();
    }
  }
  return cd.fold(1, (previousValue, element) => previousValue * element);
}

String convertFrac(List<List<int>> list) {
  // simplify the fractions
  List<List<int>> sList = list.map((l) {
    int gcd = getGreatestCommonDivisor(l);
    int a = l[0] ~/ gcd;
    int b = l[1] ~/ gcd;
    return [a, b];
  }).toList();
  print(sList);
  List<int> bs = sList.map((e) => e[1]).toList();
  // get prime compositions
  final decompositions = bs.map((e) => primeDecomposition(e)).toList();
  print(decompositions);
  final maxPrimes =
      decompositions.fold<Map<int, int>>({}, (previousValue, element) {
    Map<int, int> res = {};
    [...element.keys, ...previousValue.keys].forEach((key) {
      if ((previousValue[key] ?? 0) < (element[key] ?? 0)) {
        res[key] = element[key] ?? 0;
      } else {
        res[key] = previousValue[key] ?? 0;
      }
    });
    return res;
  });
  print(maxPrimes);
  // get min common multiple
  final minCommonMultiple = maxPrimes.keys.fold<int>(
      1,
      (previousValue, key) =>
          previousValue * (pow(key, (maxPrimes[key] ?? 0)).toInt()));
  print(minCommonMultiple);

  // result
  return sList.map((l) {
    final a = l[0];
    final b = l[1];
    int f = minCommonMultiple ~/ b;
    return '(${a * f},$minCommonMultiple)';
  }).join('');
}

main() {
  print(convertFrac([
    [69, 130],
    [87, 1310],
    [3, 4]
  ]));
}
