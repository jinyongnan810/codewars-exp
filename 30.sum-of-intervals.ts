// https://www.codewars.com/kata/52b7ed099cdc285c300001cd/train/typescript
type Interval = {
  from: number;
  to: number;
};
type Intervals = Interval[];
export function sumOfIntervals(intervals: [number, number][]) {
  console.log(JSON.stringify(intervals));
  const parsedIntervals: Intervals = intervals.map((value) => ({
    from: value[0],
    to: value[1],
  }));
  // resolve overlaps as needed
  let finalIntervals: Intervals = parsedIntervals;
  while (true) {
    let hasOverlap = false;
    let tempIntervals: Intervals = [];
    for (let i = 0; i < finalIntervals.length; i++) {
      const res = findOverlap(finalIntervals[i], tempIntervals);
      if (res) hasOverlap = true;
    }
    finalIntervals = tempIntervals;
    if (!hasOverlap) break;
  }
  console.log(JSON.stringify(finalIntervals));
  // get sum of intervals
  return finalIntervals.reduce((prev, cur) => prev + cur.to - cur.from, 0);
}

const findOverlap = (interval: Interval, parsed: Intervals): boolean => {
  // check overlap
  let foundOverlap = false;
  for (let p = 0; p < parsed.length; p++) {
    if (interval.from < parsed[p].from && interval.to > parsed[p].to) {
      // override
      parsed[p].from = interval.from;
      parsed[p].to = interval.to;
      foundOverlap = true;
      break;
    }
    if (interval.from < parsed[p].from && interval.to >= parsed[p].from) {
      // override from
      parsed[p].from = interval.from;
      foundOverlap = true;
      break;
    }
    if (interval.from <= parsed[p].to && interval.to > parsed[p].to) {
      // override to
      parsed[p].to = interval.to;
      foundOverlap = true;
      break;
    }
    if (interval.from >= parsed[p].from && interval.to <= parsed[p].to) {
      // skip
      foundOverlap = true;
      break;
    }
  }
  if (!foundOverlap) {
    // add new interval
    parsed.push({ from: interval.from, to: interval.to });
  }
  return foundOverlap;
};

// has flaw of having too much numbers
export function sumOfIntervals_others(intervals: [number, number][]) {
  const ranges = new Set<number>();
  intervals.forEach(([start, end]) => {
    for (let i = start; i < end; i++) ranges.add(i);
  });
  return ranges.size;
}
