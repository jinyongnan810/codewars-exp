// https://www.codewars.com/kata/537e18b6147aa838f600001b/train/javascript
function justify(text: string, width: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  while (words.length > 0) {
    let sliceLength = words.length;
    for (let i = 1; i <= words.length; i++) {
      const slice = words.slice(0, i);
      // if joined by one space is longer than width
      if (slice.length - 1 + slice.reduce((p, c) => p + c.length, 0) > width) {
        sliceLength = slice.length - 1;
        break;
      }
    }
    // take slice
    const slice = words.slice(0, sliceLength);
    // remove words
    for (let w = 0; w < slice.length; w++) {
      words.shift();
    }
    // if the last line
    if (words.length == 0) {
      lines.push(slice.join(" "));
      break;
    }

    // not the last line
    // check gaps needed
    const gapsNeeded =
      sliceLength == 1 ? 0 : width - slice.reduce((p, c) => p + c.length, 0);
    // check min gap length
    const minGapLength =
      sliceLength == 1 ? 0 : Math.floor(gapsNeeded / (slice.length - 1));
    // check count of gaps that need to be minGapLength+1
    let largeGapsNeeded =
      sliceLength == 1 ? 0 : gapsNeeded - (slice.length - 1) * minGapLength;
    // join the line
    let line = "";
    for (let w = 0; w < slice.length; w++) {
      line += slice[w];
      if (largeGapsNeeded > 0) {
        line += " ".repeat(minGapLength + 1);
        largeGapsNeeded--;
      } else if (w != slice.length - 1) {
        line += " ".repeat(minGapLength);
      }
    }
    lines.push(line);
  }
  return lines.join("\n");
}
