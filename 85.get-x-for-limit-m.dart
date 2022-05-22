// https://www.codewars.com/kata/5b1cd19fcd206af728000056/train/dart
import 'dart:math';

double solve(double m) {
  double x = 0.5;
  double max = 1;
  double min = 0;
  for (int i = 0; i < 100; i++) {
    double limit = getFirst100(x);
    if (limit > m) {
      max = x;
      x = (max + min) / 2;
    } else if (limit == m) {
      return x;
    } else {
      min = x;
      x = (max + min) / 2;
    }
  }
  return x;
}

double getFirst100(double x) {
  double res = 0;
  for (int i = 1; i <= 100; i++) {
    res += i * (pow(x, i));
  }
  return res;
}

main() {
  print(solve(2));
}
