// https://www.codewars.com/kata/54b42f9314d9229fd6000d9c/typescript
export function duplicateEncode(word: string) {
  return word
    .split("")
    .map((x) => {
      if (x == " ") x = "\\s";
      else if (/\W/.test(x)) x = `\\${x}`;
      return word.match(RegExp(x, "ig"))!.length > 1 ? ")" : "(";
    })
    .join("");
}

export function duplicateEncode_others(word: string) {
  return word
    .toLowerCase()
    .split("")
    .map((a, i, w) => {
      return w.indexOf(a) == w.lastIndexOf(a) ? "(" : ")";
    })
    .join("");
}
