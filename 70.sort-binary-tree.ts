// https://www.codewars.com/kata/52bef5e3588c56132c0003bc/train/javascript
class BinaryNode {
  value: number | null;
  left: BinaryNode | null;
  right: BinaryNode | null;
  constructor(
    value: number,
    left: BinaryNode | null = null,
    right: BinaryNode | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
let levels: number[][] = [];
function treeByLevels(rootNode: BinaryNode | null): number[] {
  levels = [];
  if (rootNode == null) return [];
  sortAllChildren(1, rootNode);
  return levels.reduce((prev, cur) => [...prev, ...cur], []);
}
const sortAllChildren = (level: number, node: BinaryNode) => {
  if (node.value == null) return;
  const index = level - 1;
  if (levels[index]) {
    levels[index].push(node.value);
  } else {
    levels[index] = [node.value];
  }
  if (node.left) {
    sortAllChildren(level + 1, node.left);
  }
  if (node.right) {
    sortAllChildren(level + 1, node.right);
  }
};
const treeOne = new BinaryNode(
  2,
  new BinaryNode(8, new BinaryNode(1), new BinaryNode(3)),
  new BinaryNode(9, new BinaryNode(4), new BinaryNode(5))
);
console.log(treeByLevels(treeOne));
const treeTwo = new BinaryNode(
  1,
  new BinaryNode(8, null, new BinaryNode(3)),
  new BinaryNode(4, null, new BinaryNode(5, null, new BinaryNode(7)))
);
console.log(treeByLevels(treeTwo));

function treeByLevels_others(rootNode: BinaryNode | null) {
  if (!rootNode) return [];
  const nodes = [rootNode];
  const result = [];
  while (nodes.length > 0) {
    const node = nodes.shift();
    if (node.left) {
      nodes.push(node.left);
    }
    if (node.right) {
      nodes.push(node.right);
    }
    result.push(node.value);
  }
  return result;
}
