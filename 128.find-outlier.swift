// https://www.codewars.com/kata/5526fc09a1bbd946250002dc/train/swift
func findOutlier(_ array: [Int]) -> Int {
  var evenItems = [Int]()
  var oddItems = [Int]()
  for item in array {
    if item.isMultiple(of: 2) {
        evenItems.append(item)
    } else {
        oddItems.append(item)
    }
  }
  if oddItems.count>evenItems.count {
    return evenItems[0]
  } else {
    return oddItems[0]
  }
}

func findOutlierOthers(_ array: [Int]) -> Int {
    let odd = array.filter {$0 % 2 != 0}
    return odd.count > 1 ? array.filter {$0 % 2 == 0}[0] : odd[0]
}
