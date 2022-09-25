// https://www.codewars.com/kata/tv-remote-symbols
import 'dart:math';

const modeCount = 3;
const rowLength = 8;
const colLength = 6;
final keyboardPlain = [
  ["a|A|^", "b|B|~", "c|C|?", "d|D|!", "e|E|'", "1|1|\"", "2|2|(", "3|3|)"],
  ["f|F|-", "g|G|:", "h|H|;", "i|I|+", "j|J|&", "4|4|%", "5|5|*", "6|6|="],
  ["k|K|<", "l|L|>", "m|M|€", "n|N|£", "o|O|\$", "7|7|¥", "8|8|¤", "9|9|\\"],
  ["p|P|[", "q|Q|]", "r|R|{", "s|S|}", "t|T|,", ".", "@", "0|0|§"],
  ["u|U|#", "v|V|¿", "w|W|¡", "x|X|", "y|Y|", "z|Z|", "_", "/"],
  ["shift", " ", "", "", "", "", "", ""],
];

class Key {
  final int row;
  final int column;
  final List<String> characters;
  const Key(this.row, this.column, this.characters);
  int needClickButton(Key other) {
    int otherRow = other.row;
    int otherCol = other.column;
    int clicks = 0;
    int minRow = min(row, otherRow);
    int maxRow = max(row, otherRow);
    int minCol = min(column, otherCol);
    int maxCol = max(column, otherCol);
    clicks += min(maxRow - minRow, minRow + colLength - maxRow);
    clicks += min(maxCol - minCol, minCol + rowLength - maxCol);
    return clicks + 1;
  }
}

final keyboardList = keyboardPlain.asMap().entries.map(
  (rowEntry) {
    final row = rowEntry.value.asMap().entries.map((colEntry) {
      final characters = colEntry.value.split('|');
      while (characters.length < modeCount) {
        characters.add(characters[0]);
      }

      final k = Key(rowEntry.key, colEntry.key, characters);
      return k;
    });
    return row.toList();
  },
).toList();

class KeyBoard {
  final List<List<Key>> keyboard;
  int currentMode = 0;
  KeyBoard(this.keyboard);
  Key first() {
    return keyboard[0][0];
  }

  Key shift() {
    return keyboard[5][0];
  }

  List<Key> findKey(String c) {
    for (int col = 0; col < rowLength; col++) {
      for (int row = 0; row < colLength; row++) {
        if (keyboard[row][col].characters[currentMode] == c) {
          return [keyboard[row][col]];
        }
        final index = keyboard[row][col].characters.indexOf(c);
        if (index >= 0) {
          final diff = (currentMode - index).abs();
          if (diff == 0) {
            return [keyboard[row][col]];
          }
          int needPressShift;
          if (currentMode > index) {
            needPressShift = modeCount - diff;
          } else {
            needPressShift = diff;
          }
          currentMode = index;
          final keyList = <Key>[];
          for (int i = 0; i < needPressShift; i++) {
            keyList.add(shift());
          }
          keyList.add(keyboard[row][col]);
          return keyList;
        }
      }
    }

    // for dart 2.8
    return [
      Key(0, 0, [''])
    ];
  }

  void reset() {
    currentMode = 0;
  }
}

final keyboard = KeyBoard(keyboardList);

int tv_remote(String word) {
  print(word);
  keyboard.reset();
  int res = 0;
  final list = word.split('').map((c) => keyboard.findKey(c));
  Key current = keyboard.first();
  list.forEach((keyResult) {
    for (final key in keyResult) {
      res += current.needClickButton(key);
      current = key;
    }
  });

  return res;
}

void main() {
  print(tv_remote("Too Easy?"));
}
