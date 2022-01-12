// https://www.codewars.com/kata/5647c3858d4acbbe550000ad/train/typescript
// https://www.rapidtables.com/convert/number/binary-to-decimal.html
export const divisibleByFive = {
  test: (x: string) => {
    console.log(x);
    return /^0*(((1(10)*0)|(1(10)*11))((01*01)|((01*00)(10)*(0|11)))*1)+0*$/.test(
      x
    );
  },
};
// not work with 1110011000101, need revision

// http://ivanzuzak.info/noam/webapps/fsm2regex/
// #states
// A
// B
// C
// D
// E
// #initial
// A
// #accepting
// A
// #alphabet
// a
// b
// #transitions
// A:a>A
// A:b>B
// B:a>C
// B:b>D
// C:a>E
// C:b>A
// D:a>B
// D:b>C
// E:a>D
// E:b>E

// ********covert an nfa to regex********
// https://www.youtube.com/watch?v=UKYvP8aS7fM
