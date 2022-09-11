// https://www.codewars.com/kata/59b24a2158ef58966e00005e

List<int> shake_tree(List<String> tree) {
  final width = tree.first.length;
  final height = tree.length;
  final result = List.filled(width, 0);
  for (int l = 0; l < height; l++) {
    final level = tree[l];
    level.split('').asMap().forEach((index, value) {
      if (value == 'o') {
        // start falling
        int? pos = index;
        for (int i = l + 1; i < height; i++) {
          if (pos == null) break;
          var currentPos = tree[i][pos];
          while (currentPos == '\\') {
            pos = pos! + 1;
            currentPos = tree[i][pos];
            if (currentPos == '/') {
              pos = null;
            }
          }

          if (pos == null) break;

          while (currentPos == '/') {
            pos = pos! - 1;
            currentPos = tree[i][pos];
            if (currentPos == '\\') {
              pos = null;
            }
          }
        }
        if (pos != null) {
          result[pos] += 1;
        }
      }
    });
  }

  return result;
}
