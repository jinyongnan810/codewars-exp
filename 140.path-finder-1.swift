// https://www.codewars.com/kata/5765870e190b1472ec0022a2/train/swift
func pathFinder(_ maze: String) -> Bool {
  let map = maze.split(separator: "\n").map({Array($0)})
  return hasPath(map)
}

func hasPath(_ map: [[Character]]) -> Bool {
    let width = map[0].count
    let height = map.count
    // can go right
    if width > 1 && map[0][1] != "W" {
        let subMap = map.map({ Array($0[...(width-1)]) })
        print(subMap)
        if hasPath(subMap) {
            return true
        }
    }
    // to be continued
    return false
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
