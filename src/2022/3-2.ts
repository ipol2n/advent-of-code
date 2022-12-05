const fs = require('fs');

const asciiA = 'A'.charCodeAt(0)
const asciia = 'a'.charCodeAt(0)
const getPriority = (char: string): number => {
    const code = char.charCodeAt(0)
    if (code < asciia) {
        return code - asciiA + 27
    }
    return code - asciia + 1
}

const lines = fs.readFileSync('./3-1.txt', 'utf8').split("\n");
let sum = 0
for (let i = 0; i < lines.length; i += 3) {
    const first = lines[i]
    const second = lines[i + 1]
    const third = lines[i + 2]
    for (const char of first) {
        // console.log(char, second.indexOf(char))
        if (second.indexOf(char) != -1 && third.indexOf(char) != -1) {
            console.log(char, getPriority(char))
            sum += getPriority(char)
            break
        }
    }
}
console.log(sum)
export { };
