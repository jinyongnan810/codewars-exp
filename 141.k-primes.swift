// https://www.codewars.com/kata/573182c405d14db0da00064e/train/swift
import Foundation
func consecKprimes(_ k: Int, _ arr: [Int]) -> Int {
    // your code
    return 0
}
func primeDecomposition(_ n: Int) -> [Int: Int] {
    if checkIsPrime(n) {
        return [n: 1]
    }
    var nTmp = n
    let s = Int(floor(sqrt(Double(nTmp))))
    var res: [Int: Int] = [:]
    for i in 2...s {
        if !checkIsPrime(i) {
            continue
        }
        let prime = i
        if prime > nTmp {
            break
        }

        while nTmp % prime == 0 {
            nTmp /= prime
            if let primeInRes = res[prime] {
                res[prime] = primeInRes + 1
            } else {
                res[prime] = 1
            }
        }
        if nTmp > 1 && checkIsPrime(nTmp) {
            res[nTmp] = 1
            break
        }
    }
    return res
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

print(primeDecomposition(10005))
