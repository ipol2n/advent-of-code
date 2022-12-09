const fs = require('fs');

type Position = {
    x: number,
    y: number
}

const print = (positions: Position[]): void => {
    // const map = new Array(5).fill(0).map(() => new Array(6).fill(0))
    // for (let i = positions.length - 1; i > -1; i--) {
    //     const position = positions[i]
    //     map[position.y][position.x] = i === 0 ? "H" : i
    // }
    // console.log("=".repeat(20))
    // console.table(map)
}

const lines = fs.readFileSync('./9.txt', 'utf8').split("\n");

const positions = new Array(10).fill(0).map(() => { return { x: 0, y: 4 } })
print(positions)

const getNextPosition = (hPositionInput: Position, tPositionInput: Position): Position => {
    const hPosition: Position = { ...hPositionInput }
    const tPosition: Position = { ...tPositionInput }
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
            // if (Math.abs(hPosition.y - tPosition.y) === 1) {
            // tPosition.y = hPosition.y
            if (hPosition.x > tPosition.x) {
                tPosition.x += 1
            } else {
                tPosition.x -= 1
            }
            // } else {
            // tPosition.x = hPosition.x
            if (hPosition.y > tPosition.y) {
                tPosition.y += 1
            } else {
                tPosition.y -= 1
            }
            // }
        }
    }
    return tPosition
}

const tPositionHistory = {}

for (const line of lines) {
    if (line) {
        const [direction, distanceStr] = line.split(" ")
        const distance = parseInt(distanceStr)
        for (let i = 0; i < distance; i++) {
            switch (direction) {
                case "U":
                    positions[0].y -= 1
                    break
                case "D":
                    positions[0].y += 1
                    break
                case "L":
                    positions[0].x -= 1
                    break
                case "R":
                    positions[0].x += 1
                    break
            }
            for (let iPosition = 1; iPosition < positions.length; iPosition++) {
                positions[iPosition] = getNextPosition(positions[iPosition - 1], positions[iPosition])
            }
            tPositionHistory[`${positions[9].y}-${positions[9].x}`] = true
            print(positions)
        }
    }
}
console.log(Object.keys(tPositionHistory).length)
export { };
