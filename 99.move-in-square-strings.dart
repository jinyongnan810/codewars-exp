// https://www.codewars.com/kata/56dbeec613c2f63be4000be6/train/dart
// sample
// abcd
// efgh
// ijkl
// mnop

// 1. diag1Sym
// aeim
// bfjn
// cgko
// dhlp

String diag1Sym(String str) {
  final parts = str.split('\n');
  final length = parts[0].length;
  final newParts = <String>[];
  for (int i = 0; i < length; i++) {
    final newPart = parts.map((part) => part[i]).join('');
    newParts.add(newPart);
  }
  return newParts.join('\n');
}

// 2. rot90Clock
// miea
// njfb
// okgc
// plhd
String rot90Clock(String str) {
  final parts = str.split('\n').reversed.toList();
  final length = parts[0].length;
  final newParts = <String>[];
  for (int i = 0; i < length; i++) {
    final newPart = parts.map((part) => part[i]).join('');
    newParts.add(newPart);
  }
  return newParts.join('\n');
}

// 3. selfieAndDiag1
// abcd|aeim
// efgh|bfjn
// ijkl|cgko
// mnop|dhlp
String selfieAndDiag1(String str) {
  final parts = str.split('\n');
  final length = parts.length;
  final diag1 = diag1Sym(str);
  final diag1Parts = diag1.split('\n');
  final newParts = <String>[];
  for (int i = 0; i < length; i++) {
    final newPart = parts[i] + '|' + diag1Parts[i];
    newParts.add(newPart);
  }
  return newParts.join('\n');
}

String oper(String fct(String str), String s) {
  return fct(s);
}

void main() {
  print(oper(diag1Sym, 'abcd\nefgh\nijkl\nmnop'));
  print(oper(rot90Clock, 'abcd\nefgh\nijkl\nmnop'));
  print(oper(selfieAndDiag1, 'abcd\nefgh\nijkl\nmnop'));
}
