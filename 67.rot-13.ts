// https://www.codewars.com/kata/52223df9e8f98c7aa7000062/javascript
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
const alphabetsUpper = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
function rot13(str: string) {
  const splits = str.split("");
  return splits
    .map((x) => {
      const indexOfLower = alphabets.indexOf(x);
      if (indexOfLower >= 0) {
        const rotIndex = (indexOfLower + 13) % 26;
        return alphabets[rotIndex];
      }
      const indexOfUpper = alphabetsUpper.indexOf(x);
      if (indexOfUpper >= 0) {
        const rotIndex = (indexOfUpper + 13) % 26;
        return alphabetsUpper[rotIndex];
      }
      return x;
    })
    .join("");
}

function rot13_others(str: string) {
  return str.replace(/[a-z]/gi, function (x) {
    return String.fromCharCode(
      x.charCodeAt(0) + (x.toLowerCase() <= "m" ? 13 : -13)
    );
  });
}
