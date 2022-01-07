// https://www.codewars.com/kata/5886e082a836a691340000c3/train/typescript
export function rectangleRotation(a: number, b: number): number {
  const unit = Math.sqrt(2);
  const aUnits = Math.floor(a / unit);
  const aAxisMainUnits = aUnits % 2 == 0 ? aUnits + 1 : aUnits;
  const aAxisSubUnits = aUnits % 2 == 0 ? aUnits : aUnits + 1;
  const bUnits = Math.floor(b / unit);
  const bAxisMainUnits = bUnits % 2 == 0 ? bUnits + 1 : bUnits;
  const bAxisSubUnits = bUnits % 2 == 0 ? bUnits : bUnits + 1;

  return aAxisMainUnits * bAxisMainUnits + aAxisSubUnits * bAxisSubUnits;
}
