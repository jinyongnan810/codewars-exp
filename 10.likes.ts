export const likes = (a: string[]): string => {
  const len = a.length;
  switch (len) {
    case 0:
      return "no one likes this";
    case 1:
      return `${a[0]} likes this`;
    case 2:
      return `${a[0]} and ${a[1]} like this`;
    case 3:
      return `${a[0]}, ${a[1]} and ${a[2]} like this`;
    default:
      return `${a[0]}, ${a[1]} and ${len - 2} others like this`;
  }
};
