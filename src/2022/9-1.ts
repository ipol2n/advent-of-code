const fs = require('fs');

type Position = {
    x: number,
    y: number
}

// const initMap = new Array(6).fill(new Array(5).fill(0))
// console.log(initMap)
const print = (hPosition: Position, tPosition: Position): void => {
    const map = new Array(5).fill(0).map(() => new Array(6).fill(0))
    map[tPosition.y][tPosition.x] = "T"
    map[hPosition.y][hPosition.x] = "H"
    console.log("=".repeat(20))
    console.table(map)
}

const lines = fs.readFileSync('./9.txt', 'utf8').split("\n");
const hPosition: Position = {
    x: 0,
    y: 0
}
const tPosition: Position = {
    x: 0,
    y: 0
}
// print(hPosition, tPosition)

const tPositionHistory = {}

for (const line of lines) {
    if (line) {
        // console.log(hPosition, tPosition)
        const [direction, distanceStr] = line.split(" ")
        const distance = parseInt(distanceStr)
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case "U":
                    hPosition.y -= 1
                    break
                case "D":
                    hPosition.y += 1
                    break
                case "L":
                    hPosition.x -= 1
                    break
                case "R":
                    hPosition.x += 1
                    break
            }
            if (Math.abs(hPosition.y - tPosition.y) <= 1 && Math.abs(hPosition.x - tPosition.x) <= 1) {
                // do nothing
            } else {
                if (hPosition.y === tPosition.y) {
                    if (hPosition.x > tPosition.x) {
                        tPosition.x += 1
                    } else {
                        tPosition.x -= 1
                    }
                } else if (hPosition.x === tPosition.x) {
                    if (hPosition.y > tPosition.y) {
                        tPosition.y += 1
                    } else {
                        tPosition.y -= 1
                    }
                } else {
                    if (Math.abs(hPosition.y - tPosition.y) === 1) {
                        tPosition.y = hPosition.y
                        if (hPosition.x > tPosition.x) {
                            tPosition.x += 1
                        } else {
                            tPosition.x -= 1
                        }
                    } else {
                        tPosition.x = hPosition.x
                        if (hPosition.y > tPosition.y) {
                            tPosition.y += 1
                        } else {
                            tPosition.y -= 1
                        }
                    }
                }
            }
            tPositionHistory[`${tPosition.y}-${tPosition.x}`] = true
            // print(hPosition, tPosition)
        }
    }
}
console.log(Object.keys(tPositionHistory).length)
export { };
