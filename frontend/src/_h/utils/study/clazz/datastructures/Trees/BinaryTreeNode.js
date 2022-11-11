import Comparator from "../../comparator/Comparator.js"

export default class BinaryTreeNode {
    constructor(value = null) {
        this.left = null
        this.right = null
        this.parent = null
        this.value = value

        this.nodeComparator = new Comparator()
    }

    get leftHeight() {
        if (!this.left) {
            return 0
        }
        return this.left.height + 1
    }

    get rightHeight() {
        if (!this.right) {
            return 0;
        }

        return this.right.height + 1;
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight)
    }

    get balaceFactor() {
        return this.leftHeight - this.rightHeight
    }

    setLeft(node) {
        if (this.left) {
            this.left.parent = null // 제거 할 2의 parent 제거
        }
        this.left = node

        if (this.left) {
            this.left.parent = this
        }
        return this
    }

    setRight(node) {
        if (this.right) {
            this.right.parent = null
        }

        this.right = node

        if (this.right) {
            this.right.parent = this
        }
        return this
    }

    removeChild(nodeToRemove) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null
            return true
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null
            return true
        }
        return false
    }

    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }


    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }

        return false;
    }

    traverseInOrder() {
        let traverse = []

        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder())
        }

        traverse.push(this.value)

        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder())
        }

        return traverse
    }


    toString() {
        return this.traverseInOrder().toString()
    }

}

const root = new BinaryTreeNode(1)
const left = new BinaryTreeNode(2)
const right = new BinaryTreeNode(3)

root.setLeft(left)
root.setRight(right)

