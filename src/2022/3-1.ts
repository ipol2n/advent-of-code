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
for (const line of lines) {
    if (line) {
        console.log(line)
        const length = line.length;
        const first = line.substring(0, length / 2)
        const second: string = line.substring(length / 2)
        // console.log(first, second)
        let skip = false
        for (const char of first) {
            // console.log(char, second.indexOf(char))
            if (second.indexOf(char) != -1) {
                console.log(char, getPriority(char))
                sum += getPriority(char)
                // skip = true
                break
            }
        }
    }
}
console.log(sum)
export { };
