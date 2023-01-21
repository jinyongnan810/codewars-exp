import Foundation
// https://www.codewars.com/kata/5613d06cee1e7da6d5000055/train/swift
func step(_ s: Int, _ start: Int, _ end: Int) -> (Int, Int)? {
    for i in start...end {
        if i + s > end {
            return nil
        }
        if checkIsPrime(i) && checkIsPrime(i + s) {
            return (i, i+s)
        }
    }
    return nil
}

var primes: [Int: Bool] = [2: true, 3: true, 4: false, 5: true]
func checkIsPrime(_ n: Int) -> Bool {
    if let cachedIsPrime = primes[n] {
        return cachedIsPrime
    } else {
        let s = Int(floor(sqrt(Double(n))))
        for i in 2...s where n % i == 0 {
            primes[n] = false
            return false
        }
        primes[n] = true
        return true
    }
}

print(checkIsPrime(37))
print(step(8, 300, 400) ?? "nil")
