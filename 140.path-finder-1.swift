// https://www.codewars.com/kata/5765870e190b1472ec0022a2/train/swift
func pathFinder(_ maze: String) -> Bool {
  let map = maze.split(separator: "\n").map({Array($0)})
  return hasPath(map, 0, 0 )
}
var count = 0
func hasPath(_ map: [[Character]], _ currentX: Int, _ currentY: Int) -> Bool {

    let width = map[0].count
    let height = map.count
    if currentX == width-1 && currentY == height-1 {
        return true
    }
    // ref: https://program-life.com/667
    // ref: https://stackoverflow.com/questions/27812433/how-do-i-make-a-exact-duplicate-copy-of-an-array
    var newMap = map
    // mark as passed
    newMap[currentY][currentX] = "K"

    //
    // if count >= 10 {
    //     return false
    // }
    // print(newMap)
    // count+=1
    //
    // print(map)
    // print(newMap)

    // print(
    // """
    // currentY:\(currentY), currentX:\(currentX),
    // canGoRight:\((width > currentX + 1) && canGo(newMap[currentY][currentX+1])),
    // canGoLeft:\(currentX>0 && canGo(newMap[currentY][currentX-1])),
    // canGoUp:\(currentY>0 && canGo(newMap[currentY-1][currentX])),
    // canGoDown:\((height > currentY+1) && canGo(newMap[currentY+1][currentX]))
    // """)

    // can go right
    if (width > currentX + 1) && canGo(newMap[currentY][currentX+1]) {
        if hasPath(newMap, currentX + 1, currentY) {
            return true
        }
    }
    // can go left
    if currentX>0 && canGo(newMap[currentY][currentX-1]) {
        if hasPath(newMap, currentX - 1, currentY) {
            return true
        }
    }
    // can go up
    if currentY>0 && canGo(newMap[currentY-1][currentX]) {
        if hasPath(newMap, currentX, currentY-1) {
            return true
        }
    }
    // can go down
    if (height > currentY+1) && canGo(newMap[currentY+1][currentX]) {
        if hasPath(newMap, currentX, currentY+1) {
            return true
        }
    }

    return false
}

func canGo(_ v: Character) -> Bool {
    if v == "W" || v == "K" {
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
// TODO: deal with large mazes