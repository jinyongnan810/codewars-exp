// https://www.codewars.com/kata/5574835e3e404a0bed00001b/train/typescript
export function getParticipants(handshakes: number): number {
  if (handshakes == 0) return 0;
  let minPeople = 2;
  let maxHandshakes = 1;
  while (maxHandshakes < handshakes) {
    minPeople++;
    // maxHandshakes = 0;
    // for (let i = minPeople - 1; i >= 1; i--) {
    //   maxHandshakes += i;
    // }
    maxHandshakes = (minPeople * (minPeople - 1)) / 2;
  }
  return minPeople;
}
