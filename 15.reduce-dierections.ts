type Direction = "NORTH" | "WEST" | "SOUTH" | "EAST";
export function dirReduc(arr: Direction[]): string[] {
  const stack: Direction[] = [];
  const handleDir = (dir: Direction, theOppsite: Direction, top: Direction) => {
    if (dir != theOppsite) {
      stack.push(top);
      stack.push(dir);
    }
  };
  arr.forEach((dir) => {
    const stackTop = stack.pop();
    switch (stackTop) {
      case "EAST": {
        handleDir(dir, "WEST", stackTop);
        break;
      }
      case "WEST": {
        handleDir(dir, "EAST", stackTop);
        break;
      }
      case "NORTH": {
        handleDir(dir, "SOUTH", stackTop);
        break;
      }
      case "SOUTH": {
        handleDir(dir, "NORTH", stackTop);
        break;
      }
      // undefined
      default: {
        stack.push(dir);
      }
    }
  });
  return stack;
}

export function dirReduc_others(arr: string[]): string[] {
  var pat = /(NORTHSOUTH|SOUTHNORTH|EASTWEST|WESTEAST)/;
  var way = arr.join("");
  while (pat.test(way)) way = way.replace(pat, "");
  return way.match(/(NORTH|SOUTH|EAST|WEST)/g) || [];
}
