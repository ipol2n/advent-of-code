const fs = require('fs');

type KeyValue = {
    [key: string]: number
}
type NestedKeyValue = {
    [key: string]: KeyValue
}

const shapeScore: KeyValue = {
    X: 1, //Rock
    Y: 2, //Paper
    Z: 3  // Scissors
}

const winPairScore: NestedKeyValue = {
    A: {
        X: 3,
        Y: 6,
        Z: 0
    },
    B: {
        X: 0,
        Y: 3,
        Z: 6

    },
    C: {
        X: 6,
        Y: 0,
        Z: 3
    }
}

const lines = fs.readFileSync('./2-1.txt', 'utf8').split("\n");
let score = 0;
for (const line of lines) {
    if (line) {
        const [opponentShape, myShape] = line.split(" ")
        score += shapeScore[myShape] + winPairScore[opponentShape][myShape]
    }
}
console.log(score)
export { };
