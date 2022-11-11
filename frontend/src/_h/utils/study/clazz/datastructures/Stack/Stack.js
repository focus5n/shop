import { remove } from 'jszip';
import LinkedList from '../LinkedList/LinkedList/LinkedList';
export default class Stack {

    constructor() {
        this.linkedList = new LinkedList()
    }

    isEmpty() {
        return !this.linkedList.head
    }

    peek() {
        if(this.isEmpty()) {
            return null
        }
        return this.linkedList.head.value
    }

    push(value) {
        this.linkedList.prepend(value)
    }

    pop() {
        const removeHead = this.linkedList.deleteHead()
        return removeHead ? removeHead.value : null
    }

    toArray() {
        return this.linkedList
        .toArray()
        .map((linkedListNode) => linkedListNode.value)
    }

    toString(callback) {
        return this.linkedList.toString(callback)
    }
}