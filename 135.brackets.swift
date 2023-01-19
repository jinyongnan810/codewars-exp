// https://www.codewars.com/kata/5277c8a221e209d3f6000b56/train/swift
import Foundation

func validBraces(_ string: String) -> Bool {
    var stack = [Character]()
    // split string to single chars
    let chars = Array(string)
    for c in chars {
        print("c:\(c)")
        switch c {
        case "(":
            stack.append(c)
        case "[":
            stack.append(c)
        case "{":
            stack.append(c)
        case ")":
            if stack.count == 0 {
                return false
            }
            if stack.last! != "(" {
                return false
            }
            stack.removeLast()
        case "]":
            if stack.count == 0 {
                return false
            }
            if stack.last! != "[" {
                return false
            }
            stack.removeLast()
        case "}":
            if stack.count == 0 {
                return false
            }
            if stack.last! != "{" {
                return false
            }
            stack.removeLast()
        default:
            print("stack: \(stack)")
        }

        print("stack: \(stack)")
    }
    return stack.count == 0
}

func validBracesOthers(_ string: String) -> Bool {
    for pattern in ["()", "[]", "{}"] {
        if string.contains(pattern) {
            return validBraces(string.replacingOccurrences(of: pattern, with: ""))
        }
    }
    return string == ""
}

print(validBracesOthers("[()]"))
