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

class HuffmanNode {
  value: number;
  char?: string;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
  constructor(value: number, char?: string) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.char = char;
  }
}

const createHuffmanTree = (freqs: [string, number][]) => {
  // create single trees
  let nodes = freqs.map((freq) => new HuffmanNode(freq[1], freq[0]));
  // form a huffman tree
  while (nodes.length !== 1) {
    // pick 2 nodes with least freq
    const first = nodes.reduce((a, b) => (a.value < b.value ? a : b), nodes[0]);
    nodes = nodes.filter((node) => node != first);
    const second = nodes.reduce(
      (a, b) => (a.value < b.value ? a : b),
      nodes[0]
    );
    nodes = nodes.filter((node) => node != second);
    const newNode = new HuffmanNode(first.value + second.value);
    newNode.left = first;
    newNode.right = second;
    nodes.push(newNode);
  }
  return nodes[0];
};

// build a huffman tree: https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/
// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs: [string, number][], s: string): string {}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs: [string, number][], bits: string): string {}
