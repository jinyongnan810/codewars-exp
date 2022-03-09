// https://www.codewars.com/kata/54d7660d2daf68c619000d95/train/dart
import 'dart:math';

List<int> primes = [2, 3];
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
  // get min common multiple
  List<int> bs = sList.map((e) => e[1]).toList();
  int gcd = getGreatestCommonDivisor(bs);
  bs = bs.map((e) => e ~/ gcd).toList();
  final minCommonMultiple =
      bs.fold<int>(1, (previousValue, element) => previousValue * element) *
          gcd;
  print(gcd);
  print(bs);

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
