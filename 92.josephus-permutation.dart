// https://www.codewars.com/kata/5550d638a99ddb113e0000a2/train/dart
List josephus(final List items, final int k) {
  List res = [];
  int cursor = 1;
  while (items.isNotEmpty) {
    cursor = (cursor + k - 1) % items.length;
    if (cursor == 0) cursor = items.length;
    final item = items.removeAt(cursor - 1);
    res.add(item);
    print('new cursor:${cursor}, ${items}');
  }
  return res;
}

void main() {
  print(josephus([1, 2, 3, 4, 5, 6, 7], 3));
}
