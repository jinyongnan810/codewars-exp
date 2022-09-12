// https://www.codewars.com/kata/5ef9ca8b76be6d001d5e1c3e/train/dart

String encode(String text) {
  final codes = text.codeUnits;
  final binary =
      codes.map((code) => code.toRadixString(2).padLeft(8, '0')).join('');
  final tripledBinary = binary.split('').map((b) => b * 3).join('');
  return tripledBinary;
}

String decode(String bits) {
  String unTripledBinary = '';
  for (int i = 0; i < bits.length; i += 3) {
    int ones = 0;
    int zeros = 0;
    for (int j = 0; j < 3; j++) {
      bits[i + j] == '1' ? (ones++) : (zeros++);
    }
    if (ones > zeros)
      unTripledBinary += '1';
    else
      unTripledBinary += '0';
  }
  String decoded = '';
  for (int i = 0; i < unTripledBinary.length; i += 8) {
    final binary = unTripledBinary.substring(i, i + 8);
    final ascii = int.parse(binary, radix: 2);
    decoded += String.fromCharCode(ascii);
  }
  return decoded;
}

void main() {
  print(encode('hey'));
  print(decode(
      '000111111000111000000000000111111000000111000111000111111111111000000111'));
}
