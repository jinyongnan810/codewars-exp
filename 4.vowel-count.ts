export class Kata {
    static getCount_mine(str: string): number {
        return str.split('').filter(x=>'aeiou'.includes(x)).length;
      }
    static getCount_others(str: string) {
      return str.replace(/[^aeiou]/gi, '').length;
    }
  }