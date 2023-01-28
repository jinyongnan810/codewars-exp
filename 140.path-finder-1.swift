// https://www.codewars.com/kata/5765870e190b1472ec0022a2/train/swift
import Foundation
func pathFinder(_ maze: String) -> Bool {
  let map = maze.split(separator: "\n").map({Array($0)})
  let res = hasPath(map, 0, 0 )
  return res.ok
}
var count = 0
typealias Pos = (x: Int, y: Int)
func hasPath(_ map: [[Character]], _ currentX: Int, _ currentY: Int) -> (ok: Bool, ngs: [Pos]) {

    let width = map[0].count
    let height = map.count
    if currentX == width-1 && currentY == height-1 {
        return (ok: true, ngs: [])
    }
    // ref: https://program-life.com/667
    // ref: https://stackoverflow.com/questions/27812433/how-do-i-make-a-exact-duplicate-copy-of-an-array
    var newMap = map
    // mark as passed
    newMap[currentY][currentX] = "K"
    var ngs: [Pos] = []

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
        let res = hasPath(newMap, currentX + 1, currentY)
        if res.ok {
            return (ok: true, ngs: [])
        } else {
            ngs.append(contentsOf: res.ngs)
            for ng in res.ngs {
                newMap[ng.y][ng.x] = "N"
            }
        }
    }
    // can go left
    if currentX>0 && canGo(newMap[currentY][currentX-1]) {
        let res = hasPath(newMap, currentX - 1, currentY)
        if res.ok {
            return (ok: true, ngs: [])
        } else {
            ngs.append(contentsOf: res.ngs)
            for ng in res.ngs {
                newMap[ng.y][ng.x] = "N"
            }
        }
    }
    // can go up
    if currentY>0 && canGo(newMap[currentY-1][currentX]) {
        let res = hasPath(newMap, currentX, currentY-1)
        if res.ok {
            return (ok: true, ngs: [])
        } else {
            ngs.append(contentsOf: res.ngs)
            for ng in res.ngs {
                newMap[ng.y][ng.x] = "N"
            }
        }
    }
    // can go down
    if (height > currentY+1) && canGo(newMap[currentY+1][currentX]) {
        let res = hasPath(newMap, currentX, currentY+1)
        if res.ok {
            return (ok: true, ngs: [])
        } else {
            ngs.append(contentsOf: res.ngs)
            for ng in res.ngs {
                newMap[ng.y][ng.x] = "N"
            }
        }
    }

    ngs.append((x: currentX, y: currentY))

    return (ok: false, ngs: ngs)
}

func canGo(_ v: Character) -> Bool {
    return v == "."
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

// tips: measuring time elapsed
func measure <T> (_ f: @autoclosure () -> T) -> (result: T, duration: String) {
    let startTime = CFAbsoluteTimeGetCurrent()
    let result = f()
    let timeElapsed = CFAbsoluteTimeGetCurrent() - startTime
    return (result, "Elapsed time is \(timeElapsed.formatted()) seconds.")
}

print(measure(pathFinder(firstMaze)))
print(measure(pathFinder(secondMaze)))
print(measure(pathFinder(thirdMaze)))
print(measure(pathFinder(fourthMaze)))
// TODO: deal with large mazes
// some ideas
// if the route fails, mark the route points to un reachable 
