// https://www.codewars.com/kata/54b058ce56f22dc6fe0011df/train/dart
import 'dart:math';
import 'dart:core';

Map<int, int> map = {};
List<int> cached = [];
int cutLog(List<int> p, int n) {
  if (cached.toString() != p.toString()) {
    cached = p;
    map = {};
  }
  return cutLogSub(p, n);
}

int cutLogSub(List<int> p, int n) {
  if (n == 0) return 0;
  if (map.containsKey(n)) return map[n]!;
  int maxProfit = -1;
  int maxlen = p.length - 1 < n ? p.length - 1 : n;
  for (int i = 1; i <= maxlen; i++) {
    maxProfit = max(maxProfit, p[i] + cutLogSub(p, n - i));
  }
  if (n == 1) maxProfit = p[1];
  map[n] = maxProfit;
  return maxProfit;
}

// Your new function as given to you by me, your boss.
Function cutLog_others = (List p, int n) {
  if (n == 0) return 0;
// Some array to store calculated values
  var resultTable = List<int>.filled(n + 1, 0);
// try all lengths up to 'n'
  for (int j = 1; j <= n; j++) {
//try to cut out one piece along the price table
//and calculate the price as sum of this piece plus the price of 'the rest'
    for (int k = 1; k <= j; k++) {
      // Two nested loops = Θ(n^2)
// no magic: since we start at length 0,
// we will already have calculated the price of 'the rest' in our resultTable
      resultTable[j] = max(resultTable[j], p[k] + resultTable[j - k]);
    }
  }
  return resultTable[n]; // Good luck intern!
};

main() {
  final p = [
    0, 1, 5, 8, 9, 10, 17, 17, 20, 24, // 0X's
    30, 32, 35, 39, 43, 43, 45, 49, 50, 54, // 1X's
    57, 60, 65, 68, 70, 74, 80, 81, 84, 85, // 2X's
    87, 91, 95, 99, 101, 104, 107, 112, 115, 116, // 3X's
    119, 121, 125, 129, 131, 134, 135, 140, 143, 145, // 4X's
    151
  ];
  final one = DateTime.now();
  final res_mine = cutLog(p, 100);
  final two = DateTime.now();
  final res_others = cutLog_others(p, 50);
  final three = DateTime.now();
  print(
      'mine:$res_mine,${two.difference(one).inMilliseconds}.others:$res_others,${three.difference(two).inMilliseconds}');
}
