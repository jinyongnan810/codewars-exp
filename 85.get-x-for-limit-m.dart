// https://www.codewars.com/kata/5b1cd19fcd206af728000056/train/dart
import 'dart:math';

double solve_backup(double m) {
  double x = 0.5;
  double max = 1;
  double min = 0;
  final loop = 50;
  int powLoop = 1000;
  if (m >= 40000) powLoop = 5000;
  if (m >= 100000) powLoop = 10000;
  for (int i = 0; i < loop; i++) {
    double limit = getFirst(x, powLoop);
    if (limit > m) {
      max = x;
      x = (max + min) / 2;
    } else if (limit == m) {
      return x;
    } else {
      min = x;
      x = (max + min) / 2;
    }
    print('loop${i} min:${min},max:${max}');
  }
  return x;
}

double getFirst(double x, int loop) {
  double res = 0;
  for (int i = 1; i <= loop; i++) {
    res += i * (pow(x, i));
  }
  return res;
}

double solve(double m) {
// https://www.wolframalpha.com/input?i2d=true&i=Sum%5BnPower%5Bx%2Cn%5D%2C%7Bn%2C1%2C%E2%88%9E%7D%5D
  // m = x/((x-1)^2)
// https://www.wolframalpha.com/input?i=y%2F%28y-1%29%5E2-x%3D0
  // x= (2m-sqrt(4m+1)+1)/2m
  double x = (2 * m - sqrt(4 * m + 1) + 1) / (2 * m);
  return x;
}

main() {
  print(solve(500000));
}
