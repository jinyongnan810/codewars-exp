// https://www.codewars.com/kata/5592e3bd57b64d00f3000047/train/swift
var cached = [Int]()
func findNb(_ number: Int) -> Int {
    var index = 1
    var total = 0
    while true {
        let volume = calculateVolume(index)
        total += volume
        if total == number {
            return index
        } else if total > number {
            return -1
        }
        index += 1
    }
}

func calculateVolume(_ num: Int) -> Int {
    // to avoid runtime index error
    if cached.indices.contains(num-1) {
        let cache = cached[num-1]
        return cache
    }
    let volume = num*num*num
    cached.append(volume)
    return volume
}
// TODO: cache further
// TODO: https://en.wikipedia.org/wiki/Squared_triangular_number