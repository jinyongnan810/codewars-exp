// https://www.codewars.com/kata/585894545a8a07255e0002f1/train/dart
class Lock {
  List<Dot> dots;
  Lock({required this.dots});
  void markUsed(String dot) {
    dots.firstWhere((d) => d.displayText == dot).used = true;
  }

  Dot getDot(int row, int column) {
    return dots.firstWhere((dot) => dot.row == row && dot.column == column);
  }

  List<Dot> nextMove(Dot current) {
    List<Dot> res = [];
    dots.forEach((dot) {
      if (dot.used) {
        return;
      }
      if ((dot.row - current.row).abs() <= 1 &&
          (dot.column - current.column).abs() <= 1) {
        res.add(dot);
      } else if (dot.row == current.row &&
          (dot.column - current.column).abs() == 2) {
        final between = getDot(dot.row, 1);
        if (between.used) {
          res.add(dot);
        }
      } else if (dot.column == current.column &&
          (dot.row - current.row).abs() == 2) {
        final between = getDot(1, dot.column);
        if (between.used) {
          res.add(dot);
        }
      }
    });
    return res;
  }
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

int countPatternsFrom(String start, int points) {
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

  return countPatternsFromSub(start, points, lock);
}

int countPatternsFromSub(String start, int points, Lock currentLock) {
  if (points == 0 || points > 9) return 0;
  if (points == 1) return 1;
  // clone lock
  final dots = currentLock.dots
      .map((e) => Dot(
          displayText: e.displayText,
          used: e.used,
          row: e.row,
          column: e.column))
      .toList();
  final lock = Lock(dots: dots);
  lock.markUsed(start);

  return 0;
}
