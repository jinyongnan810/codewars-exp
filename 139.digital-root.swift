// https://www.codewars.com/kata/541c8630095125aba6000c00/train/swift
func digitalRoot(of number: Int) -> Int {
    let s = String(number)
    if s.count == 1 {
        return number
    }
    let digitals = Array(s)
    let sum = digitals.reduce(0) {
        // convert character to int
        if let intValue = $1.wholeNumberValue {
            return $0 + intValue
        } else {
            return $0
        }
    }
    return digitalRoot(of: sum)
}

print(digitalRoot(of: 456))
