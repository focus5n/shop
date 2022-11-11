import BinaryTreeNode from "../datastructures/Trees/BinaryTreeNode.js";

// const depthFirstSearch = (node, callbacks) => {
//     callbacks.enterNode(node);

//     if (node.left && callbacks.allowTraversal(node, node.left)) {
//         depthFirstSearch(node.left, callbacks);
//     }

//     if (node.right && callbacks.allowTraversal(node, node.right)) {
//         depthFirstSearch(node.right, callbacks);
//     }

//     callbacks.leaveNode(node);
// }

const depthFirstSearch = (node, res = []) => {
    res.push(node.value);

    if (node.left) {
        depthFirstSearch(node.left, res);
    }
    
    if (node.right ) {
        depthFirstSearch(node.right, res);
    }
    return res
}


const nodeA = new BinaryTreeNode('A');
const nodeB = new BinaryTreeNode('B');
const nodeC = new BinaryTreeNode('C');
const nodeD = new BinaryTreeNode('D');
const nodeE = new BinaryTreeNode('E');
const nodeF = new BinaryTreeNode('F');
const nodeG = new BinaryTreeNode('G');

nodeA.setLeft(nodeB).setRight(nodeC);
nodeB.setLeft(nodeD).setRight(nodeE);
nodeC.setLeft(nodeF).setRight(nodeG);

// const enterNodeCallback = jest.fn();
// const leaveNodeCallback = jest.fn();


const res = depthFirstSearch(nodeA)
console.log(res)
