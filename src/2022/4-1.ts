const fs = require('fs');

let sum = 0
const lines = fs.readFileSync('./4-1.txt', 'utf8').split("\n");
for (const line of lines) {
    if (line) {
        const [first, second] = line.split(',')
        const [firstFrom, firstTo] = first.split('-', 2).map((a: string) => parseInt(a))
        const [secondFrom, secondTo] = second.split('-').map((a: string) => parseInt(a))
        if (firstFrom >= secondFrom && firstTo <= secondTo) {
            sum++
        } else if (secondFrom >= firstFrom && secondTo <= firstTo) {
            // console.log('matched!!')
            sum++
        }

    }
}
console.log(sum)
export { };
