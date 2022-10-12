// https://www.codewars.com/kata/5503013e34137eeeaa001648/train/swift
func diamond(_ size: Int) -> String? {
  if size.isMultiple(of: 2) {
    return nil
  }
  if size<1 {
    return nil
  }
  var res = [String]()
  let half = (size+1)/2
  print("size:\(size)")
  for level in 1...size {
    if level<half {
      res.append(String(repeating: " ", count: half-level)+String(repeating: "*", count: (level-1)*2+1))
    } else if level == half {
      res.append(String(repeating: "*", count: size))
    } else {
      res.append(String(repeating: " ", count: level-half)+String(repeating: "*", count: (size-level)*2+1))
    }
  }

  return res.joined(separator: "\n") + "\n"
}

let res = diamond(5)
print(res ?? "nil")
