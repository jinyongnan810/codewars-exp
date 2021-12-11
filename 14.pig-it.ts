export const pigIt = (a: string): string => {
  return a
    .split(" ")
    .map((w) => {
      if (/\W/.test(w)) return w;
      let letters = w.split("");
      if (letters.length === 0) return w;
      if (letters.length === 1) return w + "ay";
      const first = letters.shift();
      letters.push(first!);
      return letters.join("") + "ay";
    })
    .join(" ");
};

export const pigIt_others = (a: string) => a.replace(/(\w)(\w+)*/g, "$2$1ay");
