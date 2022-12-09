const fs = require('fs');

const lines = fs.readFileSync('./8.txt', 'utf8').split("\n");
const map = []
for (const line of lines) {
    if (line) {
        map.push(line.split("").map(x => parseInt(x)))
    }
}

const calculateScore = (map, x, y): number => {
    // top
    let totalScore = 1
    let score = 0
    for (let i = y - 1; i >= 0; i--) {
        score++
        if (map[i][x] >= map[y][x]) {
            break
        }
    }
    totalScore *= score

    // right
    score = 0
    for (let i = x + 1; i < map.length; i++) {
        score++
        if (map[y][i] >= map[y][x]) {
            break
        }
    }
    totalScore *= score

    // bottom
    score = 0
    for (let i = y + 1; i < map.length; i++) {
        score++
        if (map[i][x] >= map[y][x]) {
            break
        }
    }
    totalScore *= score

    // left
    score = 0
    for (let i = x - 1; i >= 0; i--) {
        score++
        if (map[y][i] >= map[y][x]) {
            break
        }
    }
    totalScore *= score

    return totalScore
}

let maxScore = 0
for (let y = 1; y < map.length - 1; y++) {
    for (let x = 1; x < map[0].length - 1; x++) {
        const score = calculateScore(map, x, y)
        if (score > maxScore) {
            maxScore = score
        }
    }
}
console.log(maxScore)
export { };
