// https://www.codewars.com/kata/573182c405d14db0da00064e/train/swift
import Foundation
func consecKprimes(_ k: Int, _ arr: [Int]) -> Int {
    if arr.count <= 1 {
        return 0
    }
    var res = 0
    var previousIsKPrime = false
    for n in arr {
        let kPrimeForN = checkK(n)
        if kPrimeForN == k {
            if previousIsKPrime {
                res += 1
            } else {
                previousIsKPrime = true
            }
        } else {
            previousIsKPrime = false
        }
    }

    return res
}

func checkK(_ n: Int) -> Int {
    let primeDecompositions = primeDecomposition(n)
    var k = 0
    for primeWithCount in primeDecompositions {
        k += primeWithCount.value
    }
    return k
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

print(checkK(10005))
print(consecKprimes(3, [10158, 10182, 10184, 10172, 10179, 10168, 10156, 10165, 10155, 10161, 10178, 10170]))

// primeDecomposition of others
func primeFactors(_ n: Int) -> Int {
    var nb = n
    var i = 2
    var cnt = 0
    while nb > 1 {
        while nb % i == 0 {
            cnt += 1
            nb /= i
        }
        i += 1
    }
    return cnt
}
