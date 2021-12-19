export class G964 {
  // var friends1 = ["A1", "A2", "A3", "A4", "A5"];
  // var fTowns1 = [["A1", "X1"], ["A2", "X2"], ["A3", "X3"], ["A4", "X4"]];
  // var distTable1 = ["X1", 100.0, "X2", 200.0, "X3", 250.0, "X4", 300.0];
  // dotest(friends1, fTowns1, distTable1, 889);
  public static tour = (
    friends: string[],
    fTowns: string[][],
    distTable: (string | number)[]
  ) => {
    // refactor data structure
    let friendsList: { name: string; dest: number | null }[] = friends.map(
      (f) => {
        const town = fTowns.find((fTown) => fTown.indexOf(f) > -1);
        if (!town) return { name: f, dest: null };
        const townName = town[1];
        const distIndex = distTable.indexOf(townName);
        if (distIndex === -1) return { name: f, dest: null };
        return { name: f, dest: distTable[distIndex + 1] as number };
      }
    );
    friendsList = friendsList.filter((f) => f.dest != null);
    // calc the distance
    let distance = friendsList[0].dest;
    for (let i = 1; i < friendsList.length; i++) {
      distance += Math.sqrt(
        friendsList[i].dest ** 2 - friendsList[i - 1].dest ** 2
      );
    }
    distance += friendsList[friendsList.length - 1].dest;
    return Math.floor(distance);
  };
}
