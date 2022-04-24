// https://www.codewars.com/kata/561e9c843a2ef5a40c0000a4/train/dart
import 'dart:math';

List<int> gap(int gap, int min, int max) {
  int lastPrime = -1;
  for (int i = min; i <= max; i++) {
    if (checkIsPrime(i)) {
      if (lastPrime > 0) {
        if (i - lastPrime == gap) {
          return [lastPrime, i];
        }
      }
      lastPrime = i;
    }
  }
  return [];
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
  print(gap(8, 300, 400));
}
