const fs = require('fs');

interface Node {
    name: string,
    type: string,
    size: number,
    children?: Node[],
    parent?: Node
}

const printTree = (node: Node, indent: string = ""): void => {
    console.log(`${indent}- ${node.name} (${node.type}) ${node.size}`)
    if (node.children) {
        for (const child of node.children) {
            printTree(child, indent + "  ")
        }
    }
}

const calculateSize = (node: Node): void => {
    if (node.children) {
        for (const child of node.children) {
            calculateSize(child)
        }
        node.size = node.children.reduce((p, c) => p + c.size, 0)
    }
}

const findResult = (node: Node): number => {
    if (node.type === 'file') {
        return 0
    }
    let result: number = node.size <= 100000 ? node.size : 0
    if (node.children) {
        for (const child of node.children) {
            result += findResult(child)
        }
    }
    return result
}

const tree: Node = {
    name: "/",
    type: "dir",
    size: 0,
    children: []
}
let current = tree
const lines = fs.readFileSync('/Users/ipol2n/Workspaces/advent-of-code/src/2022/7-1.txt', 'utf8').split("\n");
for (const line of lines) {
    if (line) {
        // console.log("=".repeat(20))
        // console.log('line:', line)
        // console.log('current:', current.name)
        if (line.indexOf("$ ") === 0) {
            if (line.indexOf("$ cd") === 0) {
                const target = line.replace("$ cd ", "")
                if (target === '/') {
                    current = tree
                } else if (target === '..') {
                    current = current.parent
                } else {
                    const targetDir = line.replace("$ cd ", "")
                    current = current.children.find(node => node.name == targetDir)
                }
            } else if (line.indexOf("$ ls") === 0) {
                continue
            }
        } else {
            if (line.indexOf("dir ") === 0) {
                const name = line.replace("dir ", "")
                const node: Node = {
                    name,
                    type: "dir",
                    size: 0,
                    parent: current,
                    children: []
                }
                current.children.push(node)
            } else {
                const [size, name] = line.split(" ")
                const node: Node = {
                    name,
                    type: "file",
                    size: parseInt(size)
                }
                current.children.push(node)
            }
        }
        // console.log("=".repeat(20))
        // printTree(tree)
    }
}

console.log("=".repeat(20))
calculateSize(tree)
printTree(tree)
// const result = Object.keys(stacks).map(key => stacks[key].pop()).join("")
// console.log(result)
console.log(findResult(tree))
export { };
