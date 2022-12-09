const fs = require('fs');

interface Node {
    name: string,
    type: string,
    size: number,
    children?: Node[],
    parent?: Node
}

interface ResultItem {
    name: string,
    size: number
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

const findDirSizeList = (node: Node): ResultItem[] => {
    if (node.type === 'file') {
        return []
    }
    let result: ResultItem[] = [{
        name: node.name,
        size: node.size
    }]
    if (node.children) {
        for (const child of node.children) {
            result = result.concat(findDirSizeList(child))
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
const lines = fs.readFileSync('./7-1.txt', 'utf8').split("\n");
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
const dirSizeList = findDirSizeList(tree).sort((a, b) => a.size - b.size)
const neededSpaceSize = 30_000_000 - 70_000_000 + tree.size
const result = dirSizeList.find(dir => dir.size >= neededSpaceSize)
console.log(result)
// console.log(dirSizeList)
export { };
