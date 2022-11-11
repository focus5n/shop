import Comparator from "../../../comparator/Comparator.js"
import LinkedListNode from "./LinkedListNode.js"

export default class LinkedList {
    constructor(compareFunction) {
        this.head = null
        this.tail = null
        this.compare = new Comparator(compareFunction)
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head) //head를 next로
        this.head = newNode


        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }

    append(value) {
        const newNode = new LinkedListNode(value)

        if(!this.head) {
            this.head = newNode
            this.tail = newNode
            return this
        }

        this.tail.next = newNode
        this.tail = newNode

        return this
    }

    insert(value, index) {
        index = index < 0 ? 0 : index
        if (index === 0) {
            this.prepend(value)
        } else {
            let count = 1
            let currentNode = this.head
            const newNode = new LinkedListNode(value)
            while (currentNode) {
                if (count === index) break;
                currentNode = currentNode.next
                count += 1
            }
            if (currentNode) {
                newNode.next = currentNode.next
                currentNode.next = newNode
            } else {
                if (this.tail) {
                    this.tail.next = newNode
                    this.tail = newNode
                } else {
                    this.head = newNode
                    this.tail = newNode
                }
            }
        }
        return this
    }

    delete(value) {
        if (!this.head) {
            return null
        }

        let deletedNode = null

        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head

        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next
                    currentNode.next = currentNode.next.next
                } else {
                    currentNode = currentNode.next
                }
            }
        }

        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode
        }
        return deletedNode
    }

    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode
            }

            currentNode = currentNode.next
        }
        return null
    }

    deleteTail() {
        const deletedTail = this.tail

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            return deletedTail
        }

        let currentNode = this.head
        while (!currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }

        this.tail = currentNode

        return deletedTail
    }

    deleteHead() {
        if (!this.head) {
            return null
        }

        const deletedHead = this.head

        if (this.head.next) {
            this.head = this.head.next
        } else {
            this.head = null
            this.tail = null
        }
        return deletedHead
    }

    fromArray(values) {
        values.forEach((value) => this.append(value))

        return this
    }

    toArray() {
        const nodes = []
        let currentNode = this.head
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
        return nodes
    }

    toString(callback) {
        return this.toArray().map((node) => node.toString(callback)).toString()
    }

    reverse() {
        let currNode = this.head
        let prevNode = null
        let nextNode = null

        while (currNode) {
            nextNode = currNode.next
            currNode.next = prevNode
            prevNode = currNode
            currNode = nextNode
        }
        this.tail = this.head
        this.head = prevNode
        return this
    }
}


const compareFunction = (a, b) => {
    if (a.customValue === b.customValue) {
        return 0
    }

    return a.customValue < b.customValue ? -1 : 1
}

const linkedList = new LinkedList(compareFunction)


linkedList
    .append({ value: 1, customValue: 'test1' })
    .append({ value: 2, customValue: 'test2' })
    .append({ value: 3, customValue: 'test3' });

const node = linkedList.find({
    value: { value: 2, customValue: 'test2' },
});

// console.log(node)

const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

const linkedList2 = new LinkedList(greaterThan);
linkedList2.fromArray([1, 2, 3, 4, 5]);

const find = linkedList2.find({ callback: (value) => value < 3 })

