// https://www.codewars.com/kata/5506b230a11c0aeab3000c1f/train/dart
import "dart:core";
import "dart:math";

int evaporator(double content, double evap_per_day, double threshold) {
  int res = 0;
  double remaining = 100;
  while (remaining > threshold) {
    remaining -= remaining * evap_per_day / 100;
    res++;
  }
  return res;
}

main() {
  final res = evaporator(10, 10, 5);
  print(res);
}
