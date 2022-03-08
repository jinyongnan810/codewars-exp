// https://www.codewars.com/kata/54d7660d2daf68c619000d95/train/dart
String convertFrac(List<List<int>> list) {
  // simplify the fractions
  final sList = list.map((l) {
    final a = l[0];
    final b = l[1];

    if (a != 1 && b % a == 0) {
      int f = (b / a).floor();
      return [(a / f).floor(), (b / f).floor()];
    }
    return [a, b];
  }).toList();
  print(sList);
  // find denominator
  Set<int> set = {};
  sList.forEach((l) {
    set.add(l[1]);
  });
  List<int> denoms = set.toList();
  denoms.sort();
  denoms = denoms.where((d) {
    for (int i = 0; i < denoms.length; i++) {
      if (denoms[i] <= d) continue;
      if (denoms[i] % d == 0) return false;
    }
    return true;
  }).toList();
  print(denoms);
  final denominator = denoms.fold<int>(1, (previousValue, element) {
    int a = previousValue > element ? previousValue : element;
    int b = previousValue > element ? element : previousValue;
    if (a % b == 0) return a;
    return a * b;
  });
  print(denominator);
  // apply denominator
  final aList = sList.map((l) {
    final a = l[0];
    final b = l[1];
    int s = (denominator / b).floor();
    return [a * s, b * s];
  });
  print(aList);
  // result
  final res = aList.map((l) {
    final a = l[0];
    final b = l[1];
    return '($a,$b)';
  }).join('');

  return res;
}

main() {
  print(convertFrac([
    [69, 130],
    [87, 1310],
    [3, 4]
  ]));
}
