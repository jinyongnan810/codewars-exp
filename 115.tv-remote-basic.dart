// https://www.codewars.com/kata/5a5032f4fd56cb958e00007a/train/dart
final keyboardPlain = [
  ["a", "b", "c", "d", "e", "1", "2", "3"],
  ["f", "g", "h", "i", "j", "4", "5", "6"],
  ["k", "l", "m", "n", "o", "7", "8", "9"],
  ["p", "q", "r", "s", "t", ".", "@", "0"],
  ["u", "v", "w", "x", "y", "z", "_", "/"],
];

class Key {
  final int row;
  final int column;
  final String character;
  const Key({required this.row, required this.column, required this.character});
  int needClickButton(Key other) {
    int otherRow = other.row;
    int otherCol = other.column;
    int clicks = 0;
    clicks += (row - otherRow).abs();
    clicks += (column - otherCol).abs();
    return clicks + 1;
  }
}

final keyboardList = keyboardPlain.asMap().entries.map(
  (rowEntry) {
    final row = rowEntry.value.asMap().entries.map((colEntry) {
      final k = Key(
          row: rowEntry.key, column: colEntry.key, character: colEntry.value);
      return k;
    });
    return row.toList();
  },
).toList();

class KeyBoard {
  final List<List<Key>> keyboard;
  const KeyBoard({required this.keyboard});
  Key first() {
    return keyboard[0][0];
  }

  Key? findKey(String c) {
    for (int col = 0; col < keyboard[0].length; col++) {
      for (int row = 0; row < keyboard.length; row++) {
        if (c == keyboard[row][col].character) {
          return keyboard[row][col];
        }
      }
    }
    return null;
  }
}

final keyboard = KeyBoard(keyboard: keyboardList);

int tv_remote(String word) {
  int res = 0;
  final list = word.split('').map((c) => keyboard.findKey(c));
  Key current = keyboard.first();
  list.forEach((key) {
    res += current.needClickButton(key!);
    current = key;
  });

  return res;
}

void main() {
  print(tv_remote("codewars"));
}
