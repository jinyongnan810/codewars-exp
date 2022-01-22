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
  parent: HuffmanNode | null;
  side: "0" | "1" | null;
  constructor(value: number, char?: string) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.side = null;
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
    first.parent = newNode;
    first.side = "0";
    second.parent = newNode;
    second.side = "1";
    nodes.push(newNode);
  }
  return nodes[0];
};

const encodeChars = (tree: HuffmanNode): { [char: string]: string } => {
  const res: { [char: string]: string } = {};
  const stack: HuffmanNode[] = [];
  stack.push(tree);
  while (stack.length > 0) {
    const top = stack.pop();
    if (!top) break;
    // end leaf
    if (top.left == null && top.right == null) {
      if (top.char) {
        res[top.char] =
          stack.map((node) => node.side ?? "").join("") + top.side;
      }
      if (top.parent) {
        switch (top.side) {
          case "1": {
            top.parent.right = null;
            break;
          }
          case "0": {
            top.parent.left = null;
          }
          default:
            break;
        }
      }
    }
    // has child
    else if (top.left != null) {
      stack.push(top);
      stack.push(top.left);
    } else if (top.right != null) {
      stack.push(top);
      stack.push(top.right);
    }
  }
  return res;
};

// build a huffman tree: https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/
// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs: [string, number][], s: string): string {
  if (freqs.length <= 1) return null;
  const tree = createHuffmanTree(freqs);
  const encoding = encodeChars(tree);
  return s
    .split("")
    .map((char) => encoding[char])
    .join("");
}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs: [string, number][], bits: string): string {
  if (freqs.length <= 1) return null;
  const tree = createHuffmanTree(freqs);
  let res = "";
  while (bits.length > 0) {
    let node = tree;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] == "0") {
        node = node.left!;
      } else {
        node = node.right!;
      }
      if (node.char) {
        res += node.char;
        bits = bits.slice(i + 1);
        break;
      }
    }
  }
  return res;
}
