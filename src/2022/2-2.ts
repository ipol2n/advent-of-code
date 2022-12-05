const fs = require('fs');

type KeyValue = {
    [key: string]: number
}
type KeyValueString = {
    [key: string]: string
}
type NestedKeyValueString = {
    [key: string]: KeyValueString
}

const shapeScore: KeyValue = {
    X: 1, //Rock
    Y: 2, //Paper
    Z: 3  // Scissors
}

const winScore: KeyValue = {
    X: 0, //lose
    Y: 3, //draw
    Z: 6  // win
}

const myShapeMap: NestedKeyValueString = {
    A: {
        X: 'Z',
        Y: 'X',
        Z: 'Y'
    },
    B: {
        X: 'X',
        Y: 'Y',
        Z: 'Z'

    },
    C: {
        X: 'Y',
        Y: 'Z',
        Z: 'X'
    }
}

const lines = fs.readFileSync('./2-1.txt', 'utf8').split("\n");
let score = 0;
for (const line of lines) {
    if (line) {
        const [opponentShape, targetWin] = line.split(" ")
        score += winScore[targetWin] + shapeScore[myShapeMap[opponentShape][targetWin]]
    }
}
console.log(score)
export { };
