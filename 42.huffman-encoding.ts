// https://www.codewars.com/kata/54cf7f926b85dcc4e2000d9d/train/javascript
// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s: string): [string, number][] {
  const individualChars = [...new Set(s.split(""))];
  const res: [string, number][] = individualChars.map((char) => {
    const frequency = s.match(RegExp(char, "ig"))!.length;
    return [char, frequency];
  });
  return res;
}
// build a huffman tree: https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/
// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs: [string, number][], s: string): string {}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs: [string, number][], bits: string): string {}
