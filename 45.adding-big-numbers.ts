// https://www.codewars.com/kata/525f4206b73515bffb000b21/train/javascript
function add(a: string, b: string): string {
  if (a.length > b.length) b = b.padStart(a.length, "0");
  else a = a.padStart(b.length, "0");
  let plus1 = 0;
  const stack = [];
  for (let i = a.length - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + plus1;
    if (sum > 9) plus1 = 1;
    else plus1 = 0;
    stack.push((sum % 10).toString());
  }
  if (plus1 == 1) stack.push("1");
  return stack.reverse().join("");
}
