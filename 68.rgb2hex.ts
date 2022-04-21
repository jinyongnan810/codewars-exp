function rgb(r: number, g: number, b: number): string {
  r = round(r);
  g = round(g);
  b = round(b);
  return toHex(r) + toHex(g) + toHex(b);
}
const round = (n: number): number => {
  if (n > 255) return 255;
  if (n < 0) return 0;
  return n;
};
const toHex = (n: number): string => {
  return n.toString(16).toUpperCase().padStart(2, "0");
};

// memo from other solutions
// 'abcdefg'.slice(-2) == 'fg'
