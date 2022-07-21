// https://www.codewars.com/kata/56baeae7022c16dd7400086e/train/typescript
export const phone = (strng: string, num: string): string => {
  const lines: String[] = strng.split("\n");
  const withThePhoneNumber = lines.filter((l) => l.includes(num));
  if (withThePhoneNumber.length == 0) return `Error => Not found: ${num}`;
  if (withThePhoneNumber.length > 1) return `Error => Too many people: ${num}`;
  const line = withThePhoneNumber[0];
  const phone = num;
  const matchName = line.match(/<(.+)>/);
  const name = matchName ? matchName[1] : "";
  let address = line.replace(`<${name}>`, "");
  address = address.replace(`+${phone}`, "");
  address = address.replace(/[\*;/_$\?\,:]/g, " ").trim();
  address = address.replace(/[\s]{2,}/g, " ");
  return `Phone => ${phone}, Name => ${name}, Address => ${address}`;
};
