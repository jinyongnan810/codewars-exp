// https://www.codewars.com/kata/585894545a8a07255e0002f1/train/dart
class Lock {
  List<Dot> dots;
  Lock({required this.dots});
}

class Dot {
  String displayText;
  bool used;
  int row;
  int column;
  Dot({
    required this.displayText,
    required this.used,
    required this.row,
    required this.column,
  });
}

int countPatternsFrom(String f, int l) {
  final dots = [
    Dot(displayText: "A", used: false, row: 0, column: 0),
    Dot(displayText: "B", used: false, row: 0, column: 1),
    Dot(displayText: "C", used: false, row: 0, column: 2),
    Dot(displayText: "D", used: false, row: 1, column: 0),
    Dot(displayText: "E", used: false, row: 1, column: 1),
    Dot(displayText: "F", used: false, row: 1, column: 2),
    Dot(displayText: "G", used: false, row: 2, column: 0),
    Dot(displayText: "H", used: false, row: 2, column: 1),
    Dot(displayText: "I", used: false, row: 2, column: 2),
  ];
  final lock = Lock(dots: dots);
  return 0;
}
