import Comparator from "../../../comparator/Comparator";
import BinaryTreeNode from "../BinaryTreeNode"

export default class BinarySearchTreeNode extends BinaryTreeNode {

    constructor(value = null, compareFunction = undefined) {
        super(value);

        this.compareFunction = compareFunction;
        this.nodeValueComparator = new Comparator(compareFunction);
    }

    insert(value) {
        if (this.nodeValueComparator.equal(this.value, null)) {
            this.value = value
            return this
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            if (this.left) {
                return this.left.insert(value)
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction)
            this.setLeft(newNode)

            return newNode
        }

        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            if (this.right) {
                return this.right.insert(value)
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction)
            this.setRight(newNode)

            return newNode
        }
    }

    find(value) {
        if (this.nodeValueComparator.equal(this.value, value)) {
            return this
        }

        if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
            return this.left.find(value)
        }

        if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
            return this.right.find(value)
        }
        return null
    }

    contains(value) {
        return !!this.find(value)
    }

    remove(value) {
        const nodeToRemove = this.find(value)

        if (!nodeToRemove) {
            throw new Error('Item not found in the tree')
        }

        const { parent } = nodeToRemove

        if (!nodeToRemove.left && !nodeToRemove.right) {
            if (parent) {
                parent.removeChild(nodeToRemove)
            }
            else {
                nodeToRemove.setValue(undefined)
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            const nextBiggerNode = nodeToRemove.right.findMin()
            if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
                this.remove(nextBiggerNode.value)
                nodeToRemove.setValue(nextBiggerNode.value)
            } else {
                nodeToRemove.setValue(nodeToRemove.right.value)
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            const childNode = nodeToRemove.left || nodeToRemove.right

            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }
        nodeToRemove.parent = null;

        return true;
    }

    findMin() {
        if (!this.left) {
            return this
        }
        return this.left.findMin()
    }
}