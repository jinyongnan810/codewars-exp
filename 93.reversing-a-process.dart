// https://www.codewars.com/kata/5dad6e5264e25a001918a1fc/train/dart

String alphabets = 'abcdefghijklmnopqrstuvwxyz';

String encode(String s, int n) {
  final encoded = s.split('').map((c) {
    final index = alphabets.indexOf(c);
    final e = alphabets[(index) * n % 26];
    return e;
  }).join('');
  return '${n}${encoded}';
}

String decode(String r) {
  final matchesN = RegExp(r'\d+').firstMatch(r);
  if (matchesN == null) return "Impossible to decode";
  final n = int.parse(matchesN[0] ?? '0');
  final str = r.replaceFirst(RegExp(n.toString()), '');
  final s = str.split('').map((c) {
    final index = alphabets.indexOf(c);
    for (int i = 0; i < 26; i++) {
      if (i * n % 26 == index) {
        return alphabets[i];
      }
    }
    return '-';
  }).join('');
  if (s.indexOf('-') >= 0) return "Impossible to decode";
  return s;
}

void main() {
  print(encode('mer', 6015));

  print(decode('6015ekx'));
}
