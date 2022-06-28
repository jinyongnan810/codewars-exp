// https://www.codewars.com/kata/5ce399e0047a45001c853c2b/train/dart
List<int> partsSums(List<int> list) {
  final result = <int>[];
  final total =
      list.fold<int>(0, (previousValue, element) => previousValue + element);
  int totalTemp = total;
  result.add(totalTemp);
  for (int i = 0; i < list.length; i++) {
    totalTemp -= list[i];
    result.add(totalTemp);
  }
  return result;
}
