function traverseDFS(root) {
    const stack = []
    const res = []
    stack.push(root[0])

    while (stack.length) {
        const currentNode = stack.pop()
        res.push(currentNode.value)

        if (currentNode.right) {
            stack.push(root[currentNode.right])
        }

        if (currentNode.left) {
            stack.push(root[currentNode.left])
        }
    }

    return res
}



const tree = [
    { value: 6, left: 1, right: 2 },
    { value: 5, left: 3, right: 4 },
    { value: 7, left: null, right: 5 },
    { value: 3, left: 6, right: null },
    { value: 4, left: null, right: null },
    { value: 9, left: 7, right: 8 },
    { value: 2, left: 9, right: null },
    { value: 8, left: null, right: null },
    { value: 10, left: null, right: null },
    { value: 1, left: null, right: null }
]

const res = traverseDFS(tree)

console.log(res)

//            6
//           / \
//          5   7
//         / \   \
//        3   4   9
//       /       / \
//      2       8   10
//     /
//    1