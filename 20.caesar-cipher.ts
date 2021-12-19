export class G964 {
  private static alphabets = "abcdefghijklmnopqrstuvwxyz";
  private static reversedAlphabets = "zyxwvutsrqponmlkjihgfedcba";
  private static upperAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static upperReversedAlphabets = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
  private static totalChars = 26;
  public static movingShift(s: string, shift: number) {
    const thisClass = this;
    // shift
    let tmpShift = shift;
    const shiftedString = s.replace(/([\w|\s])/g, function (w) {
      const indexLower = thisClass.alphabets.indexOf(w);
      const indexUpper = thisClass.upperAlphabets.indexOf(w);
      if (indexLower > -1) {
        return thisClass.alphabets.charAt((indexLower + tmpShift++) % 26);
      } else if (indexUpper > -1) {
        return thisClass.upperAlphabets.charAt((indexUpper + tmpShift++) % 26);
      } else {
        tmpShift++;
        return w;
      }
    });

    // split
    const res = [];
    const oneCipherLength = Math.ceil(shiftedString.length / 5);
    for (let i = 0; i < 5; i++) {
      res.push(
        shiftedString.slice(i * oneCipherLength, (i + 1) * oneCipherLength)
      );
    }
    return res;
  }

  public static demovingShift(arr, shift) {
    const thisClass = this;
    // join
    const cipherCombined = arr.join("");

    // unshift
    let tmpShift = shift;
    const unshiftedString = cipherCombined.replace(/([\w|\s])/g, function (w) {
      const indexLower = thisClass.reversedAlphabets.indexOf(w);
      const indexUpper = thisClass.upperReversedAlphabets.indexOf(w);
      if (indexLower > -1) {
        return thisClass.reversedAlphabets.charAt(
          (indexLower + tmpShift++) % 26
        );
      } else if (indexUpper > -1) {
        return thisClass.upperReversedAlphabets.charAt(
          (indexUpper + tmpShift++) % 26
        );
      } else {
        tmpShift++;
        return w;
      }
    });
    return unshiftedString;
  }
}
