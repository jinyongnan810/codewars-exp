// https://www.codewars.com/kata/54dc6f5a224c26032800005c/train/dart
class StocksInCategory {
  String category;
  int stock;
  StocksInCategory(this.category, this.stock);
}

String stockSummary(List<String> stock, List<String> categoriesRequired) {
  if (stock.isEmpty || categoriesRequired.isEmpty) {
    return '';
  }
  List<StocksInCategory> res = [];
  categoriesRequired.forEach((category) {
    final count = stock.fold<int>(0, (previousValue, current) {
      if (current.startsWith(category)) {
        final currentCount = int.parse(current.split(' ')[1]);
        return previousValue + currentCount;
      }
      return previousValue;
    });
    res.add(StocksInCategory(category, count));
  });
  return res.map((r) => '(${r.category} : ${r.stock})').join(' - ');
}
