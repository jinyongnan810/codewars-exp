// https://www.codewars.com/kata/54f8693ea58bce689100065f/train/dart
import 'dart:math';

String decompose(String top, bottom) {
  int topInt = int.parse(top);
  int bottomInt = int.parse(bottom);
  if (topInt == bottomInt) return '[1]';
  List<String> result = [];

  if (topInt > bottomInt) {
    int n = topInt ~/ bottomInt;
    topInt -= n * bottomInt;
    result.add('$n');
  }
  double fractionReversed = bottomInt / topInt;
  int i = 2;
  while (topInt > 0) {
    if (fractionReversed > i) {
      i++;
      continue;
    }
    int lcm = getLeaseCommonMultiple(bottomInt, i);
    topInt = (lcm ~/ bottomInt) * topInt;
    bottomInt = lcm;
    int iTop = 1 * (lcm ~/ i);
    topInt -= iTop;
    result.add('1/$i');
    print('remained:$topInt/$bottomInt');
    if (topInt == 0) break;
    fractionReversed = bottomInt / topInt;
    i = fractionReversed.toInt();
    print('i:$i');
    if (fractionReversed == i) {
      result.add('1/$i');
      break;
    }
  }

  return '[' + (result.join(', ')) + ']';
}

int getLeaseCommonMultiple(int a, int b) {
  final decomposedA = primeDecomposition(a);
  final decomposedB = primeDecomposition(b);
  final keysSet = decomposedA.keys.toSet();
  Map<int, int> maxDecomposed = {};
  keysSet.addAll(decomposedB.keys.toSet());
  keysSet.forEach((key) {
    int aCount = decomposedA[key] ?? 0;
    int bCount = decomposedB[key] ?? 0;
    int m = max(aCount, bCount);
    maxDecomposed[key] = m;
  });
  int lcm = maxDecomposed.entries
      .fold<int>(1, (prev, cur) => prev * (pow(cur.key, cur.value).toInt()));
  return lcm;
}

int getGreatestCommonDivisor(List<int> list) {
  final max = list.fold<int>(0, (previousValue, element) {
    int s = element;
    return previousValue < s ? s : previousValue;
  });
  List<int> cd = [];
  for (int i = 2; i <= max; i++) {
    if (!checkIsPrime(i)) continue;
    while (list.every((element) => element % i == 0)) {
      cd.add(i);
      list = list.map((e) => (e / i).floor()).toList();
    }
  }
  return cd.fold(1, (previousValue, element) => previousValue * element);
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

//others
int getLcm(int a, int b) {
  return a * b ~/ getGcd(a, b);
}

int getGcd(int a, int b) {
  while (b > 0) {
    var temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

void main(List<String> args) {
  // print(getLeaseCommonMultiple(2, 5));
  // print(decompose('21', '23'));
  // print(decompose('66', '100'));
  // print(decompose('12', '5'));

  print(getGcd(17, 9));
}
