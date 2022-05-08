// https://www.codewars.com/kata/55084d3898b323f0aa000546/train/javascript
const alphabetsList = "abcdefghijklmnopqrstuvwxyz";
const reversedAlphabets = "zyxwvutsrqponmlkjihgfedcba";
const upperAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const upperReversedAlphabets = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
function encodeStr(s: string, shift: number): string[] {
  // shift
  const prefix =
    s[0].toLowerCase() +
    alphabetsList.charAt(
      (alphabetsList.indexOf(s[0].toLowerCase()) + shift) % 26
    );
  const shiftedString =
    prefix +
    s.replace(/([\w|\s])/g, function (w) {
      const indexLower = alphabetsList.indexOf(w);
      const indexUpper = upperAlphabets.indexOf(w);
      if (indexLower > -1) {
        return alphabetsList.charAt((indexLower + shift) % 26);
      } else if (indexUpper > -1) {
        return upperAlphabets.charAt((indexUpper + shift) % 26);
      } else {
        return w;
      }
    });

  // split
  const res = [];
  const oneCipherLength = Math.ceil(shiftedString.length / 5);
  for (let i = 0; i < 5; i++) {
    res.push(
      shiftedString.slice(i * oneCipherLength, (i + 1) * oneCipherLength)
    );
  }
  if (res[4] == "") res.pop();
  return res;
}

function decode(arr: string[]): string {
  // join
  const cipherCombined = arr.join("");
  const prefix = cipherCombined.slice(0, 2);
  let shift =
    alphabetsList.indexOf(prefix[1]) - alphabetsList.indexOf(prefix[0]);
  if (shift < 0) shift += 26;

  // unshift
  const unshiftedString = cipherCombined
    .slice(2)
    .replace(/([\w|\s])/g, function (w) {
      const indexLower = reversedAlphabets.indexOf(w);
      const indexUpper = upperReversedAlphabets.indexOf(w);
      if (indexLower > -1) {
        return reversedAlphabets.charAt((indexLower + shift) % 26);
      } else if (indexUpper > -1) {
        return upperReversedAlphabets.charAt((indexUpper + shift) % 26);
      } else {
        return w;
      }
    });
  return unshiftedString;
}
