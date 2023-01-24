// https://www.codewars.com/kata/5765870e190b1472ec0022a2/train/swift
func pathFinder(_ maze: String) -> Bool {
  let map = maze.split(separator: "\n").map({Array($0)})
  return hasPath(map, 0, 0 )
}

func hasPath(_ map: [[Character]], _ currentX: Int, _ currentY: Int) -> Bool {
    let width = map[0].count
    let height = map.count
    // ref: https://program-life.com/667
    // ref: https://stackoverflow.com/questions/27812433/how-do-i-make-a-exact-duplicate-copy-of-an-array
    var newMap = map
    // mark as passed
    newMap[currentY][currentX] = "K"
    // print(map)
    // print(newMap)
    // can go right
    if width > currentX + 1 && canGo(map[currentY][currentX+1]) {
        let subMap = map.map({ Array($0[...(width-1)]) })
        print(subMap)
        if hasPath(subMap, currentY, currentX + 1) {
            return true
        }
    }
    // to be continued

    return false
}

func canGo(_ v: Character) -> Bool {
    if v == "W" || v == "K"{
        return false
    }
    return true
}

let firstMaze = """
                      .W.
                      .W.
                      ...
                      """

let secondMaze = """
                .W.
                .W.
                W..
                """

let thirdMaze = """
                ......
                ......
                ......
                ......
                ......
                ......
                """

let fourthMaze = """
                ......
                ......
                ......
                ......
                .....W
                ....W.
                """
print(pathFinder(firstMaze))
