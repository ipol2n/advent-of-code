const fs = require('fs');

const lines = fs.readFileSync('./8.txt', 'utf8').split("\n");
const map = []
for (const line of lines) {
    if (line) {
        map.push(line.split("").map(x => parseInt(x)))
    }
}

const isVisible = (map, x, y): boolean => {
    // top
    let visible = true
    for (let i = y - 1; i >= 0; i--) {
        if (map[i][x] >= map[y][x]) {
            visible = false
            break
        }
    }
    if (visible) {
        return true
    }

    // right
    visible = true
    for (let i = x + 1; i < map.length; i++) {
        if (map[y][i] >= map[y][x]) {
            visible = false
            break
        }
    }
    if (visible) {
        return true
    }

    // bottom
    visible = true
    for (let i = y + 1; i < map.length; i++) {
        if (map[i][x] >= map[y][x]) {
            visible = false
            break
        }
    }
    if (visible) {
        return true
    }

    // left
    visible = true
    for (let i = x - 1; i >= 0; i--) {
        if (map[y][i] >= map[y][x]) {
            visible = false
            break
        }
    }
    if (visible) {
        return true
    }

    return false
}

let visibleCount = map.length * 4 - 4
for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[0].length - 1; x++) {
        const visible = isVisible(map, x, y)
        // console.log(y, x, map[y][x], visible)
        visibleCount += visible ? 1 : 0
    }
}
console.log(visibleCount)
export { };
