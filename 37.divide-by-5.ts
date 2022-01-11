// https://www.codewars.com/kata/5647c3858d4acbbe550000ad/train/typescript
// https://www.rapidtables.com/convert/number/binary-to-decimal.html
export const divisibleByFive =
  /^0*((1(10)*0(01*000)*1)|(111(101*0)*(01)*11))+0*$/;

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

// /0+1((1+(0+11)(01*01)*01*0)0)*(0+11)(01*01)*1+(0+1((1+(0+11)(01*01)*01*0)0)*(0+11)(01*01)*1)(0+1((1+(0+11)(01*01)*01*0)0)*(0+11)(01*01)*1)*(0+1((1+(0+11)(01*01)*01*0)0)*(0+11)(01*01)*1)/

// covert an nfa to regex
// https://www.youtube.com/watch?v=UKYvP8aS7fM
