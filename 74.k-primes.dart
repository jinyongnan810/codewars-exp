// https://www.codewars.com/kata/5726f813c8dcebf5ed000a6b/train/dart
import 'dart:math';

List<int> countKprimes(int k, int start, int end) {
  List<int> res = [];
  for (int i = start; i <= end; i++) {
    final decomp = primeDecomposition(i);
    // print(decomp);
    final primesCount = decomp.values.reduce(
      (value, element) => value + element,
    );
    if (primesCount == k) res.add(i);
  }
  return res;
}

int puzzle(int s) {
  if (s < 138) return 0;
  final k1 = countKprimes(1, 2, s);
  final k3 = countKprimes(3, 8, s);
  final k7 = countKprimes(7, 128, s);
  int res = 0;
  if (k1.isEmpty || k3.isEmpty || k7.isEmpty) return 0;
  for (int i = 0; i < k1.length; i++) {
    for (int j = 0; j < k3.length; j++) {
      for (int k = 0; k < k7.length; k++) {
        if (k1[i] + k3[j] + k7[k] == s) {
          print('${k1[i]}+${k3[j]}+${k7[k]}=$s');
          res++;
        }
      }
    }
  }
  return res;
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
  // print(primeDecomposition(500));
  print(countKprimes(5, 1000, 1100));
  print(puzzle(151));
}
