// https://www.codewars.com/kata/54b72c16cd7f5154e9000457/train/typescript
const MORSE_CODE = {
  "-.-.--": "!",
  ".-..-.": '"',
  "...-..-": "$",
  ".-...": "&",
  ".----.": "'",
  "-.--.": "(",
  "-.--.-": ")",
  ".-.-.": "+",
  "--..--": ",",
  "-....-": "-",
  ".-.-.-": ".",
  "-..-.": "/",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  "..--..": "?",
  ".--.-.": "@",
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "..--.-": "_",
  "...---...": "SOS",
};
const isUnit = (bits: string, unit: number) => {
  if (bits.length % unit !== 0) return false;
  const normal = ["1".repeat(unit), "0".repeat(unit)];
  for (let i = 0; i < bits.length; i += unit) {
    const cut = bits.slice(i, i + unit);
    if (normal.indexOf(cut) === -1) return false;
  }
  return true;
};
export const decodeBits = (bits: string) => {
  console.log(`bits:${bits}`);
  // trim 0s at each end
  const matches = bits.match(/^0+(1\d+1)0+$/);
  if (matches !== null) {
    bits = matches[1];
    if (bits == undefined) return "";
  }
  // detect unit bits
  let unit = bits.length;
  for (; unit > 1; unit--) {
    if (isUnit(bits, unit)) break;
  }
  console.log(`unit:${unit}`);
  const dot = "1".repeat(unit);
  //   const dash = "1".repeat(unit * 3);
  const spliter = "0".repeat(unit);
  const charSpliter = "0".repeat(unit * 3);
  const wordSpliter = "0".repeat(unit * 7);
  const res = bits
    .split(wordSpliter)
    .map((word) =>
      word
        .split(charSpliter)
        .map((char) =>
          char
            .split(spliter)
            .map((d) => (d === dot ? "." : "-"))
            .join("")
        )
        .join(" ")
    )
    .join("   ");
  console.log(res);
  return res;
};

export const decodeMorse = (morseCode: string) => {
  const res = morseCode
    .split("   ")
    .filter((x) => x)
    .map((word) =>
      word
        .split(" ")
        .filter((x) => x)
        .map((char) => MORSE_CODE[char])
        .join("")
    )
    .filter((x) => x.trim().length > 0)
    .join(" ");
  console.log(`res=${res}`);
  return res;
};

// other people's solutions

// trim 0s at each end
// bits = bits.replace(/(^0+|0+$)/g,'');

// get unit
// var sets:string[] =  bits.match(/(1+|0+)/g);
// var unit:number = sets[0].length;
// for(let i:number = 0; i < sets.length -1; i++){
//   if(sets[i].length > sets[i+1].length){
//     unit = sets[i+1].length;
//     break;
//   }
// }

// decode morse code
// morseCode.replace(/\s{3}/g,' | ')
//                    .split(' ')
//                    .map((v)=>v==='|'? ' ':MORSE_CODE[v])
//                    .join('');
