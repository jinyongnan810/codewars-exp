// https://www.codewars.com/kata/51fda2d95d6efda45e00004e/train/javascript
class User {
  rank: number;
  progress: number;
  constructor() {
    this.rank = -8;
    this.progress = 0;
  }
  incProgress(rank: number) {
    if (rank > 8 || rank < -8 || rank == 0) throw new Error("not valid rank");
    // get rank diff
    let diff = rank - this.rank;
    // crossing the rank 0
    if (rank > 0 && this.rank < 0) diff--;
    if (rank < 0 && this.rank > 0) diff++;
    if (diff <= -2) return;
    if (diff < 0) {
      this.rankUp(1);
      return;
    }
    if (diff == 0) {
      this.rankUp(3);
      return;
    }
    this.rankUp(10 * diff ** 2);
  }
  private rankUp(progress: number) {
    if (this.rank == 8) return;
    this.progress += progress;
    while (this.progress >= 100) {
      this.progress -= 100;
      this.rank++;
      if (this.rank == 0) this.rank = 1;
      if (this.rank >= 8) {
        this.rank = 8;
        this.progress = 0;
        break;
      }
    }
  }
}
