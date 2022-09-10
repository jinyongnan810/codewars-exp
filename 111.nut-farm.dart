// https://www.codewars.com/kata/59884371d1d8d3d9270000a5/train/dart

List<int> shakeTree(List<String> tree) {
  final firstLevel = tree.first;
  final width = firstLevel.length;
  final restLevels = tree..removeAt(0);
  final restHeight = restLevels.length;
  final result = List.filled(width, 0);
  firstLevel.split('').asMap().forEach((index, value) {
    if (value == 'o') {
      // start falling
      int? pos = index;
      for (int i = 0; i < restHeight; i++) {
        if (pos == null) {
          break;
        }
        final currentPos = restLevels[i][pos];
        switch (currentPos) {
          case '\\':
            pos++;
            break;
          case '/':
            pos--;
            break;
          case '_':
            pos = null;
            break;
        }
      }
      if (pos != null) {
        result[pos] += 1;
      }
    }
  });
  return result;
}
