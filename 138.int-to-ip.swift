import Foundation
// https://www.codewars.com/kata/52e88b39ffb6ac53a400022e/train/swift
func ipv4(of i32: UInt32) -> String {
    var tmp = i32
    let first = Int(floor(Double(tmp) / (256*256*256)))
    tmp = tmp % (256*256*256)
    let second = Int(floor(Double(tmp) / (256*256)))
    tmp = tmp % (256*256)
    let third = Int(floor(Double(tmp) / 256))
    tmp = tmp % 256
    return "\(first).\(second).\(third).\(tmp)"
}

print(ipv4(of: 2154959208))

func ipv4_other(of i32: UInt32) -> String {
    let byte1 = UInt8(i32 & 0xff)
    let byte2 = UInt8((i32>>8) & 0xff)
    let byte3 = UInt8((i32>>16) & 0xff)
    let byte4 = UInt8((i32>>24) & 0xff)
    return "\(byte4).\(byte3).\(byte2).\(byte1)"
}

print(ipv4_other(of: 2154959208))
