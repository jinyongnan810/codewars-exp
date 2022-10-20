// https://www.codewars.com/kata/56445c4755d0e45b8c00010a/train/dart
bool fortune(int initialDeposit, double interest, int initialWithdraw,
    int nYears, double inflation) {
  int saving = initialDeposit;
  int withdraw = initialWithdraw;
  interest = interest / 100;
  inflation = inflation / 100;

  for (int i = 2; i <= nYears; i++) {
    print('year ${i}: ${saving}, withdraw: ${withdraw}');
    saving = (saving * (1 + interest)).truncate() - withdraw;
    print('year ${i} left: ${saving}}');
    if (saving < 0) return false;
    withdraw = (withdraw * (1 + inflation)).truncate();
  }
  return true;
}

void main() {
  // print(fortune(100000, 1.0, 2000, 15, 1.0));
  // print(fortune(100000, 1.0, 9185, 12, 1.0));
  // print(fortune(100000000, 1.0, 100000, 50, 1.0));
  print(fortune(8860750, 10.0, 592080, 22, 2.0));
}
