// https://www.codewars.com/kata/5592e3bd57b64d00f3000047/train/swift
// solution 1 by caching each cube's volume
var cached = [Int]()
func findNb_1(_ number: Int) -> Int {
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
// solution 2 by caching n cubes total volume
var totalCached: [Int] = [0]
func findNb(_ number: Int) -> Int {
    var index = 1
    while true {
        let total = calculateTotalVolume(index)
        if total == number {
            return index
        } else if total > number {
            return -1
        }
        index += 1
    }
}

func calculateTotalVolume(_ num: Int) -> Int {
    let totalCachedLength = totalCached.count
    if totalCachedLength > num {
        let cache = totalCached[num]
        return cache
    }
    for cur in totalCachedLength...num {
        // print("cur:\(cur)")
        let pre = totalCached.last!
        let volume = cur*cur*cur
        totalCached.append(volume + pre)
        // print("totalCached:\(totalCached)")
    }
    // print("calculateTotalVolume \(num) = \(totalCached.last!)")
    return totalCached.last!
}
// TODO: https://en.wikipedia.org/wiki/Squared_triangular_number

let total =  calculateTotalVolume(2022)
print("total: \(total)")
print("n: \(findNb(4183059834009))")
