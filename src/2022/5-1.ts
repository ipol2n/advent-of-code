const fs = require('fs');

type Stacks = {
    [key: string]: string[]
}

// const stacks: Stacks = {
//     "1": ["Z", "N"],
//     "2": ["M", "C", "D"],
//     "3": ["P"]
// }
// [P]     [L]         [T]            
// [L]     [M] [G]     [G]     [S]    
// [M]     [Q] [W]     [H] [R] [G]    
// [N]     [F] [M]     [D] [V] [R] [N]
// [W]     [G] [Q] [P] [J] [F] [M] [C]
// [V] [H] [B] [F] [H] [M] [B] [H] [B]
// [B] [Q] [D] [T] [T] [B] [N] [L] [D]
// [H] [M] [N] [Z] [M] [C] [M] [P] [P]
//  1   2   3   4   5   6   7   8   9 
const stacks: Stacks = {
    "1": ["H", "B", "V", "W", "N", "M", "L", "P"],
    "2": ["M", "Q", "H"],
    "3": ["N", "D", "B", "G", "F", "Q", "M", "L"],
    "4": ["Z", "T", "F", "Q", "M", "W", "G"],
    "5": ["M", "T", "H", "P"],
    "6": ["C", "B", "M", "J", "D", "H", "G", "T"],
    "7": ["M", "N", "B", "F", "V", "R"],
    "8": ["P", "L", "H", "M", "R", "G", "S"],
    "9": ["P", "D", "B", "C", "N"]
}

const lines = fs.readFileSync('./5-1.txt', 'utf8').split("\n");
for (const line of lines) {
    if (line) {
        // move 1 from 2 to 1
        const [quantity, from, to] = line.replace("move ", "").replace("from ", "").replace("to ", "").split(" ")
        // console.log(line, quantity, from, to)
        for (let i = 0; i < quantity; i++) {
            stacks[to].push(stacks[from].pop())
        }
        console.log(stacks)
    }
}
const result = Object.keys(stacks).map(key => stacks[key].pop()).join("")
console.log(result)
export { };
