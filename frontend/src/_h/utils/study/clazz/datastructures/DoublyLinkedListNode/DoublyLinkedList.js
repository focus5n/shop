import Comparator from "../../comparator/Comparator"
import DoublyLinkedListNode from "./DoublyLinkedListNode"

export default class DoublyLinkedList {
    constructor(compareFunction) {
        this.head = null
        this.tail = null
        this.comapre = new Comparator(compareFunction)
    }

    prepent(value) {
        const newNode = new DoublyLinkedListNode(value, this.head)

        if(this.head) {
            this.head.previouse = newNode
        }
        this.head = newNode

        if(!this.tail) {
            this.tail = newNode
        }
        return this
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        if(!this.head) {
            this.head = newNode
            this.tail = newNode
            return this
        }

        this.tail.next = newNode
        newNode.previous = this.tail
        this.tail = newNode
 
        return this
    }

    delete(value) {
        if(!this.head) {
            return null
        }

        let deletedNode = null
        let currentNode = this.head

        while(currentNode) {
            if(this.compare.equal(currentNode.value, value)) {
                deletedNode = currentNode

                if(deletedNode) {
                    this.head = deletedNode.next

                    if(this.head) {
                        this.head.previous = null
                    }

                    if(deletedNode === this.tail) {
                        this.tail = null
                    }
                }
            } else if(deletedNode === this.tail) {
                this.tail = deletedNode.previous;
                this.tail.next = null;
            } else {
                const previouseNode = deletedNode.previouse
                const nextNode = deletedNode.next

                previouseNode.next = nextNode
                nextNode.previouse = previouseNode
            }
            currentNode = currentNode.next
        }
        return deletedNode
    }

    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null
        }

        let currentNode = this.head 

        while(currentNode) {
            if(callback && callback(currentNode.value)) {
                return currentNode
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode
            }
            currentNode = currentNode.next
        }
        return null
    }
}