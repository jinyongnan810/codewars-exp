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
    int lcm = getLeaseCommonMultiple([bottomInt, i]);
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

int getLeaseCommonMultiple(List<int> list) {
  int gcd = getGreatestCommonDivisor(list);
  return gcd *
      list.fold<int>(
          1, (previousValue, element) => previousValue * element ~/ gcd);
}

int getGreatestCommonDivisor(List<int> list) {
  // for this kata only
  int a = list[0];
  int b = list[1];
  if (a % b == 0) return b;

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

void main(List<String> args) {
  // print(getLeaseCommonMultiple([2, 5]));
  // print(decompose('21', '23'));
  // print(decompose('66', '100'));
  // print(decompose('12', '5'));
}
