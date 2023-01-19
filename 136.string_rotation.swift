// https://www.codewars.com/kata/5596f6e9529e9ab6fb000014/train/swift
func shiftedDiff(_ s1: String, _ s2: String) -> Int? {
    if s1 == s2 {
        return 0
    }
    let l1 = s1.count
    let l2 = s2.count
    if l1 != l2 {
        return nil
    }

    var s1Tmp = s1

    for shift in 1...l1 {
        let last = s1Tmp.popLast()
        if last != nil {
            s1Tmp = String(last!) + s1Tmp
        }
        if s1Tmp == s2 {
            return shift
        }
    }
    return nil
}

print(shiftedDiff("coffee", "eecoff") ?? "nil")

// TODO: try with eecoffeecoff
