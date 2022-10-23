// https://www.codewars.com/kata/59568be9cc15b57637000054/train/dart

/** set true to enable debug */
bool debug = false;

int elderAge(int n, int m, int loss, int maxTime) {
  final rect = getRectangle(n, m, loss);
  final total = getTotal(rect);
  return total % maxTime;
}

List<List<int>> getRectangle(int n, int m, int loss) {
  List<List<int>> res = [];
  for (int i = 0; i < m; i++) {
    List<int> row = [];
    for (int j = 0; j < n; j++) {
      final time = (i ^ j) - loss;
      row.add(time < 0 ? 0 : time);
    }
    res.add(row);
  }
  return res;
}

int getTotal(List<List<int>> rect) {
  int res = 0;
  rect.forEach((row) {
    res +=
        row.fold<int>(0, (previousValue, element) => previousValue + element);
  });
  return res;
}

// int xor(int a, int b) {
//   String binaryA = a.toRadixString(2);
//   String binaryB = b.toRadixString(2);
//   final l = binaryA.length > binaryB.length ? binaryA.length : binaryB.length;
//   binaryA = binaryA.padLeft(l, '0');
//   binaryB = binaryB.padLeft(l, '0');
//   List<int> xorList = [];
//   for (int i = 0; i < l; i++) {
//     if (binaryA[i] == binaryB[i]) {
//       xorList.add(0);
//     } else {
//       xorList.add(1);
//     }
//   }
//   final xorStr = xorList.join('');
//   return int.parse(xorStr, radix: 2);
// }

void main() {
  print(3 ^ 5); // ^ means xor
  // print(getRectangle(8, 8, 0));
  print(elderAge(8, 5, 1, 100));
  print(elderAge(8, 8, 0, 100007));
  print(elderAge(25, 31, 0, 100007));
  print(elderAge(5, 45, 3, 1000007));
  print(elderAge(31, 39, 7, 2345));
  // print(elderAge(545, 435, 342, 1000007));
  // // You need to run this test very quickly before attempting the actual tests :)
  // print(elderAge(28827050410, 35165045587, 7109602, 13719506));
}
