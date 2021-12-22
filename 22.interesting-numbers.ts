function checkInteresting(n: number, awesomePhrases: number[]): boolean {
  // at least 98 to be 1
  if (n <= 99) return false;
  // is in the list
  if (awesomePhrases.indexOf(n) > -1) return true;
  const numStr = n.toString();
  // is x0000...
  if (numStr.slice(1) === "0".repeat(numStr.length - 1)) return true;
  // is xxxxx...
  if (numStr.replace(numStr.charAt(0), "").length === 0) return true;
  // is 12345...
  if ("1234567890".indexOf(numStr) > -1) return true;
  // is 98765...
  if ("9876543210".indexOf(numStr) > -1) return true;
  // is palindrome like 73837
  const firstHalf = numStr.slice(0, Math.floor(numStr.length / 2));
  const secondHalf = numStr.slice(Math.ceil(numStr.length / 2));
  if (firstHalf == secondHalf.split("").reverse().join("")) return true;
  return false;
}
// output:
// 0: not interesting
// 1: nearly interesting
// 2: interesting
export function isInteresting(n: number, awesomePhrases: number[]): number {
  // this number is interesting
  if (checkInteresting(n, awesomePhrases)) return 2;
  // next number is interersting
  if (checkInteresting(n + 1, awesomePhrases)) return 1;
  // next next number is interersting
  if (checkInteresting(n + 2, awesomePhrases)) return 1;
  // not interersting
  return 0;
}

// memo: check is xxxxx...
// /^(\d)\1{2,}$/.test(n.toString())
