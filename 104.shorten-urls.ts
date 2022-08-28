const radix26 = "0123456789abcdefghijklmnop";
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const code: Record<string, string> = {};
radix26.split("").forEach((c, index) => {
  code[c] = alphabets[index];
});
class UrlShortener {
  baseName = "short.ly/";
  longToShort: Record<string, string>;
  shortToLong: Record<string, string>;
  count = 0;
  constructor() {
    this.longToShort = {};
    this.shortToLong = {};
  }

  shorten(longURL: string): string {
    const existed = this.longToShort[longURL];
    if (existed) return `${this.baseName}${existed}`;
    const short = this.genNewShort();
    this.count++;
    this.longToShort[longURL] = short;
    this.shortToLong[short] = longURL;
    return `${this.baseName}${short}`;
  }

  redirect(shortURL: string): string {
    const short = shortURL.replace(this.baseName, "");
    return this.shortToLong[short];
  }

  genNewShort(): string {
    if (this.count < 456976) {
      return this.count
        .toString(26)
        .padStart(4, "0")
        .split("")
        .map((c) => code[c])
        .join("");
    }
    if (this.count < 474552) {
      return (this.count - 456976)
        .toString(26)
        .padStart(3, "0")
        .split("")
        .map((c) => code[c])
        .join("");
    }
    if (this.count < 475228) {
      return (this.count - 456976)
        .toString(26)
        .padStart(2, "0")
        .split("")
        .map((c) => code[c])
        .join("");
    }
    return (this.count - 475228)
      .toString(26)
      .split("")
      .map((c) => code[c])
      .join("");
  }
}
