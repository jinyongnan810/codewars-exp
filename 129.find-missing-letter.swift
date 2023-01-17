// https://www.codewars.com/kata/5839edaa6754d6fec10000a2/train/swift
import Cocoa

extension StringProtocol {
    func distance(of element: Element) -> Int? { firstIndex(of: element)?.distance(in: self) }
    func distance<S: StringProtocol>(of string: S) -> Int? { range(of: string)?.lowerBound.distance(in: self) }
}
extension Collection {
    func distance(to index: Index) -> Int { distance(from: startIndex, to: index) }
}
extension String.Index {
    func distance<S: StringProtocol>(in string: S) -> Int { string.distance(to: self) }
}
extension String {

    var length: Int {
        return count
    }

    subscript (i: Int) -> String {
        return self[i ..< i + 1]
    }

    func substring(fromIndex: Int) -> String {
        return self[min(fromIndex, length) ..< length]
    }

    func substring(toIndex: Int) -> String {
        return self[0 ..< max(0, toIndex)]
    }

    subscript (r: Range<Int>) -> String {
        let range = Range(uncheckedBounds: (lower: max(0, min(length, r.lowerBound)),
                                            upper: min(length, max(0, r.upperBound))))
        let start = index(startIndex, offsetBy: range.lowerBound)
        let end = index(start, offsetBy: range.upperBound - range.lowerBound)
        return String(self[start ..< end])
    }
}

func findMissingLetter(_ chArr: [Character]) -> Character {
    let alphabetsStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let alphabets = alphabetsStr.split(separator: Character(""))
    let char0 = chArr[0]
    if let start: Int = alphabets.distance(of: char0) {
        for index in start+1..<56 {
            if chArr[index-start] != alphabets[index] {
                return alphabets[index]
            }
        }
    }
    return ""
}

print(findMissingLetter(["a", "b", "c", "d", "f"]))

// solutions
// https://www.codewars.com/kata/5839edaa6754d6fec10000a2/solutions
