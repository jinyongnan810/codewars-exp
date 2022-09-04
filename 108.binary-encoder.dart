final Map<String, String> toBinary = {
  "0": "10",
  "1": "11",
  "2": "0110",
  "3": "0111",
  "4": "001100",
  "5": "001101",
  "6": "001110",
  "7": "001111",
  "8": "00011000",
  "9": "00011001"
};
final Map<String, String> fromBinary = {
  "10": "0",
  "11": "1",
  "0110": "2",
  "0111": "3",
  "001100": "4",
  "001101": "5",
  "001110": "6",
  "001111": "7",
  "00011000": "8",
  "00011001": "9"
};
String code(String s) {
  return s.split('').map((c) => toBinary[c]).join('');
}

String decode(String str) {
  String tmp = str;
  final res = <String>[];
  while (tmp.length > 0) {
    for (int i = 2; i <= tmp.length; i++) {
      final sub = tmp.substring(0, i);
      if (fromBinary.containsKey(sub)) {
        res.add(fromBinary[sub]!);
        tmp = tmp.substring(i);
        break;
      }
    }
  }
  return res.join();
}

String codeSingleChar(String s) {
  int i = int.parse(s);
  final bi = i.toRadixString(2);
  final prefix = '0' * (bi.length - 1) + '1';
  return prefix + bi;
}

void main() {
  // final Map<String, String> toBinary = {};
  // final Map<String, String> fromBinary = {};
  // '0123456789'.split('').forEach((c) {
  //   final binary = codeSingleChar(c);
  //   toBinary[c] = binary;
  //   fromBinary[binary] = c;
  // });
  // print(toBinary);
  // print(fromBinary);
  print(decode('10'));
}
