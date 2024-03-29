// https://www.codewars.com/kata/52996b5c99fdcb5f20000004/train/javascript
function runoff(voters: string[][]): string | undefined {
  let data: string[][] = JSON.parse(JSON.stringify(voters));
  const overHalf = voters.length / 2;
  while (true) {
    console.log(`data:${JSON.stringify(data)}`);
    const votes: Record<string, number> = {};

    data[0].forEach((candidate) => (votes[candidate] = 0));

    for (let i = 0; i < data.length; i++) {
      const firstChoice = data[i][0];
      if (!firstChoice) return;
      votes[firstChoice] += 1;
    }
    let least = 999;
    for (const entry of Object.entries(votes)) {
      const [candidate, n] = entry;
      if (n > overHalf) return candidate;
      if (n < least) least = n;
    }
    const candidateNeedToBeRemoved = Object.keys(votes).filter(
      (v) => votes[v] == least
    );
    console.log(
      `least:${least}, candidateNeedToBeRemoved: ${JSON.stringify(
        candidateNeedToBeRemoved
      )}`
    );
    data = data.map((row) =>
      row.filter((vote) => !candidateNeedToBeRemoved.includes(vote))
    );
  }
}

// no one's first vote will be removed first
// const data = [
//   ["a", "c", "b", "d", "e"],
//   ["d", "c", "a", "b", "e"],
//   ["e", "b", "d", "a", "c"],
//   ["e", "a", "b", "c", "d"],
//   ["b", "c", "e", "a", "d"],
// ];

const data = [
  ["Johan Liebert", "Daisuke Aramaki", "Reinhard von Musel", "Frank Underwood"],
  ["Reinhard von Musel", "Johan Liebert", "Daisuke Aramaki", "Frank Underwood"],
  ["Reinhard von Musel", "Frank Underwood", "Johan Liebert", "Daisuke Aramaki"],
];

// const data = [
//   ["a", "c", "d", "e", "b"],
//   ["e", "b", "d", "c", "a"],
//   ["d", "e", "c", "a", "b"],
//   ["c", "e", "d", "b", "a"],
//   ["b", "e", "a", "c", "d"],
// ];

console.log(runoff(data));
