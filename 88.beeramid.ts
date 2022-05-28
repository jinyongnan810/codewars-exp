// https://www.codewars.com/kata/51e04f6b544cf3f6550000c1/train/typescript
export function beeramid(bonus: number, price: number): number {
  const beers = bonus / price;
  console.log(`bonus:${bonus},price:${price},beers:${beers}`);
  let bought = 0;
  for (let i = 1; ; i++) {
    const beerInLevel = i ** 2;
    if (bought + beerInLevel > beers) {
      return i - 1;
    }
    bought += beerInLevel;
  }
}
