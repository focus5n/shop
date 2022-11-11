import Queue from "../datastructures/Queue/Queue.js";
import BinaryTreeNode from "../datastructures/Trees/BinaryTreeNode.js";

const breadFirstSearch = (rootNode, res = []) => {
    const nodeQueue = new Queue()
    nodeQueue.enqueue(rootNode)

    while(!nodeQueue.isEmpty()) {
        const currentNode = nodeQueue.dequeue()

        res.push(currentNode.value)

        if(currentNode.left) {
            nodeQueue.enqueue(currentNode.left)
        }


        if(currentNode.right) {
            nodeQueue.enqueue(currentNode.right)
        }
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

const res = breadFirstSearch(nodeA)
console.log(res)