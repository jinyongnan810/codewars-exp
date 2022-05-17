// https://www.codewars.com/kata/5511b2f550906349a70004e1/train/javascript
var lastDigit = function (a: string, b: string) {
  if (b == "0") return 1;
  const lastOfA = Number.parseInt(a[a.length - 1]);
  const last2OfB =
    b.length > 2 ? Number.parseInt(b.slice(b.length - 2)) : Number.parseInt(b);
  switch (lastOfA) {
    case 1: {
      return 1;
    }
    case 2: {
      const index = last2OfB % 4;
      if (index == 1) return 2;
      if (index == 2) return 4;
      if (index == 3) return 8;
      if (index == 0) return 6;
    }
    case 3: {
      const index = last2OfB % 4;
      if (index == 1) return 3;
      if (index == 2) return 9;
      if (index == 3) return 7;
      if (index == 0) return 1;
    }
    case 4: {
      const index = last2OfB % 2;
      if (index == 1) return 4;
      if (index == 0) return 6;
    }
    case 5: {
      return 5;
    }
    case 6: {
      return 6;
    }
    case 7: {
      const index = last2OfB % 4;
      if (index == 1) return 7;
      if (index == 2) return 9;
      if (index == 3) return 3;
      if (index == 0) return 1;
    }
    case 8: {
      const index = last2OfB % 4;
      if (index == 1) return 8;
      if (index == 2) return 4;
      if (index == 3) return 2;
      if (index == 0) return 6;
    }
    case 9: {
      const index = last2OfB % 2;
      if (index == 1) return 9;
      if (index == 0) return 1;
    }
  }
  return 0; // fix me
};
