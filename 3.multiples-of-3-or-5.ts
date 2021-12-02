export class Challenge {
    static solution_mine(number: number) {
        if(number<0) return 0;
        let allBelow = [];
        for(let i = 3; i<number; i++){
          allBelow.push(i);
        }
        return allBelow.filter(x=>(x%3==0||x%5==0)).reduce((pre,cur)=>pre+cur,0);
      }
    static solution_others(number) {
      if(number <= 0)
        return 0;
      return [...Array(number)]
        .map((_,i) => i)
        .filter((value, index) => index%3 === 0 || index%5 === 0)
        .reduce((a, b) => a + b, 0);
    }
  }