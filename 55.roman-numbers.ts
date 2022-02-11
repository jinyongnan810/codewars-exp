class RomanNumerals_mine {
  static map: { [key: string]: number } = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
  };
  static toRoman(n: number): string {
    let tmp = n;
    const res: string[] = [];
    const thousands = Math.floor(tmp / 1000);
    if (thousands > 0) {
      tmp -= thousands * 1000;
      res.push("M".repeat(thousands));
    }
    if (tmp >= 900) {
      tmp -= 900;
      res.push("CM");
    } else if (tmp >= 500) {
      tmp -= 500;
      res.push("D");
    }
    if (tmp >= 400) {
      tmp -= 400;
      res.push("CD");
    }
    const hundreds = Math.floor(tmp / 100);
    if (hundreds > 0) {
      tmp -= hundreds * 100;
      res.push("C".repeat(hundreds));
    }

    if (tmp >= 90) {
      tmp -= 90;
      res.push("XC");
    } else if (tmp >= 50) {
      tmp -= 50;
      res.push("L");
    }

    if (tmp >= 40) {
      tmp -= 40;
      res.push("XL");
    } else {
      const tens = Math.floor(tmp / 10);
      if (tens > 0) {
        tmp -= tens * 10;
        res.push("X".repeat(tens));
      }
    }

    if (tmp >= 9) {
      tmp -= 9;
      res.push("IX");
    } else if (tmp >= 5) {
      tmp -= 5;
      res.push("V");
    }
    if (tmp == 4) {
      res.push("IV");
    } else if (tmp > 0) {
      res.push("I".repeat(tmp));
    }

    return res.join("");
  }
  static fromRoman(s: string): number {
    let tmp = s;
    let res = 0;
    while (tmp.length > 0) {
      let cur = tmp[0];
      // check repeat
      let i = 1;
      for (; i < tmp.length; i++) {
        if (tmp[i] != cur) break;
      }
      if (i > 1) {
        // has repeat
        res += this.map[cur] * i;
        tmp = tmp.slice(i);
        continue;
      }
      // check double
      if (tmp.length > 1) {
        const firstTwo = tmp.slice(0, 2);
        if (this.map[firstTwo]) {
          res += this.map[firstTwo];
          tmp = tmp.slice(2);
          continue;
        }
      }
      // check single
      res += this.map[cur];
      tmp = tmp.slice(1);
    }
    return res;
  }
}

var numerals: [string, number][] = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

const RomanNumerals_others = {
  toRoman: function (v: number) {
    var s = "";
    numerals.forEach(function (n: [string, number]) {
      while (v >= n[1]) {
        s += n[0];
        v -= n[1];
      }
    });
    return s;
  },
  fromRoman: function (s: string) {
    var v = 0;
    numerals.forEach(function (n) {
      while (s.slice(0, n[0].length) == n[0]) {
        s = s.slice(n[0].length);
        v += n[1];
      }
    });
    return v;
  },
};
