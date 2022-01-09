// https://www.codewars.com/kata/5629db57620258aa9d000014/train/typescript
// describe("Fixed Tests", function() {
//     it("mix", function() {
//         testing("Are they here", "yes, they are here", "2:eeeee/2:yy/=:hh/=:rr");
//         testing("looping is fun but dangerous", "less dangerous than coding", "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg");
//         testing(" In many languages", " there's a pair of functions", "1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt");
//     });
// });
export class G964 {
  public static mix = (s1: string, s2: string) => {
    console.log(`s1=(${s1}), s2=(${s2})`);
    // match all chars
    const s1Matches = s1.match(/[a-z]/g);
    const s2Matches = s2.match(/[a-z]/g);
    // count chars
    const s1Counts: { [char: string]: number } = {};
    const s2Counts: { [char: string]: number } = {};
    s1Matches.forEach((char) =>
      s1Counts[char] ? s1Counts[char]++ : (s1Counts[char] = 1)
    );
    s2Matches.forEach((char) =>
      s2Counts[char] ? s2Counts[char]++ : (s2Counts[char] = 1)
    );
    // mix
    const mixChars = [
      ...new Set([...Object.keys(s1Counts), ...Object.keys(s2Counts)]),
    ];
    const mixCounts: string[] = [];
    mixChars.forEach((mixChar) => {
      const s1Count = s1Counts[mixChar] ? s1Counts[mixChar] : 0;
      const s2Count = s2Counts[mixChar] ? s2Counts[mixChar] : 0;
      if (s1Count <= 1 && s2Count <= 1) return;
      if (s1Count > s2Count) mixCounts.push(`1:${mixChar.repeat(s1Count)}`);
      else if (s1Count < s2Count)
        mixCounts.push(`2:${mixChar.repeat(s2Count)}`);
      else mixCounts.push(`=:${mixChar.repeat(s1Count)}`);
    });
    // split to groups by length
    // const maxLength = mixCounts.reduce(
    //   (prev, cur) => (cur.length > prev.length ? cur : prev),
    //   ""
    // ).length;
    // const groups: string[][] = [];
    // for (let i = maxLength; i >= 4; i--) {
    //   groups.push(mixCounts.filter((x) => x.length === i));
    // }
    // const res = groups
    //   .filter((g) => g.length != 0)
    //   .map((group) =>
    //     group
    //       .sort((a, b) => {
    //         if (a > b) return 1;
    //         else if (a < b) return -1;
    //         return 0;
    //       })
    //       .join("/")
    //   )
    //   .join("/");
    const res = mixCounts
      .sort((a, b) => {
        if (a.length > b.length) return -1;
        if (a.length < b.length) return 1;
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      })
      .join("/");
    console.log(res);
    return res;
  };
}
