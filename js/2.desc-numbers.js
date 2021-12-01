// Input: 145263 Output: 654321
function descendingOrder_mine(n) {
  let current = n;
  let numbers = [];
  while (current !== 0) {
    numbers.push(current % 10);
    current = Math.floor(current / 10);
  }
  return Number(numbers.sort((a, b) => b - a).join(""));
}

function descendingOrder_others(n) {
  return parseInt(String(n).split("").sort().reverse().join(""));
}
