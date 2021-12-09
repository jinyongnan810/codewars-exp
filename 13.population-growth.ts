export class G964 {
  public static nbYear = (p0, percent, aug, p) => {
    let people = p0;
    let growthPercent = (100 + percent) / 100;
    let years = 0;
    while (people < p) {
      people = people * growthPercent + aug;
      years++;
    }
    return years;
  };
}
