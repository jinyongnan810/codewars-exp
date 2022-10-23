// https://www.codewars.com/kata/59568be9cc15b57637000054/train/dart
import 'dart:math';

/** set true to enable debug */
bool debug = false;

int elderAge(int n, int m, int loss, int maxTime) {
  return 0; // do it!
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
  print(3 ^ 5);
}
