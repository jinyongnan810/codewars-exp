// https://www.codewars.com/kata/54e320dcebe1e583250008fd/train/dart
List<String> coding = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
Map<int, int> cache = {};
int factorial(int n) {
  if (cache.containsKey(n)) return cache[n]!;
  if (n == 1) return 1;
  final f = n * factorial(n - 1);
  cache[n] = f;
  return f;
}

String dec2FactString(int nb) {
  int n = nb;
  List<String> res = [];
  // check max length
  int m = 0;
  for (int i = 1; i < 36; i++) {
    if (factorial(i + 1) > n) {
      m = i;
      break;
    }
  }
  while (m > 0) {
    final f = factorial(m);
    int count = 0;
    for (int i = m; i > 0; i--) {
      if (i * f <= n) {
        count = i;
        break;
      }
    }
    n = n - f * count;
    res.add(coding[count]);
    m--;
  }
  res.add('0');
  return res.join('');
}

int factString2Dec(String str) {
  int len = str.length;
  int res = 0;
  for (int i = len; i > 1; i--) {
    String char = str[len - i];
    int count = coding.indexOf(char);
    res += count * factorial(i - 1);
  }

  return res;
}

String dec2FactString_others(int nb) {
  int k = 1;
  final r = <int>[];
  for (int k = 1; nb > 0; nb ~/= k, k++) {
    r.add(nb % k);
  }
  return r.reversed.map((d) => d.toRadixString(36)).join().toUpperCase();
}

int factString2Dec_others(String str) {
  int k = str.length;
  return str.split('').fold(0, (r, d) => r * k-- + int.parse(d, radix: 36));
}

main() {
  final dec = 1273928000;
  final str = '27A0533231100';
  if (dec2FactString(dec) == str && factString2Dec(str) == dec) {
    print('ok');
  } else {
    print('ng');
  }
}
