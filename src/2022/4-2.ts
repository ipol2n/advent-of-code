const fs = require('fs');

let sum = 0
const lines = fs.readFileSync('./4-1.txt', 'utf8').split("\n");
for (const line of lines) {
    if (line) {
        const [first, second] = line.split(',')
        const [firstFrom, firstTo] = first.split('-', 2).map((a: string) => parseInt(a))
        const [secondFrom, secondTo] = second.split('-').map((a: string) => parseInt(a))
        // if (secondFrom >= firstFrom <= secondTo || secondFrom >= firstTo <= secondTo) {
        //     console.log(line)
        //     sum++
        // } else if (firstFrom >= secondFrom <= firstTo || firstFrom >= secondTo <= firstTo) {
        //     // console.log('matched!!')
        //     sum++
        // }
        if (firstTo < secondFrom || secondTo < firstFrom) {
            // skip
        } else {
            sum++
        }

    }
}
console.log(sum)
export { };
