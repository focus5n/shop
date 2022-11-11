
import LinkedList from '../LinkedList/LinkedList/LinkedList.js';

const defaultHashTableSize = 32

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList())

        this.keys = {}
    }

    hash(key) {
        const hash = Array.from(key).reduce(
            (hashAccumulator, KeySymbol) => (hashAccumulator + KeySymbol.charCodeAt(0)),
            0
        )

        return hash % this.buckets.length
    }

    set(key, value) {
        const KeyHash = this.hash(key)
        this.keys[key] = KeyHash
        const bucketLinkedList = this.buckets[KeyHash]
        const node = bucketLinkedList.find({ clalback: (nodeValue) => nodeValue.key === key })

        if (!node) {
            bucketLinkedList.append({ key, value })
        } else {
            node.value.value = value
        }
        console.log(bucketLinkedList)
    }

    delete(key) {
        const KeyHash = this.hash(key)
        delete this.keys[key]
        const bucketLinkedList = this.buckets[KeyHash]
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key})

        if(node) {
            return bucketLinkedList.delete(node.value)
        }
        return null
    }

    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)]
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key})

        return node ? node.value.value : undefined
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key)
    }

    getKeys() {
        return Object.keys(this.keys)
    }

    getValues() {
        return this.buckets.reduce((value, bucket) => {
            const bucketValue = bucket.toArray()
            .map((linkedListNode) => linkedListNode.value.value)
            return this.getValues.concat(bucketValue)
        }, [])
    }
}

const hashTable = new HashTable()
hashTable.set('hjk', 28)
hashTable.set('hjk', 29)
console.log(hashTable)

