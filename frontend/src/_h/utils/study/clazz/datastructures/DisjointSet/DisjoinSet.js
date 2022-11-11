import DisjointSetItem from "./DisjoinSetItem.js"

export default class DisjoinSet {
    constructor(KeyCallback) {
        this.KeyCallback = KeyCallback
        this.items = {}
    }

    makeSet(itemValue) {
        const disjointSetItem = new DisjointSetItem(itemValue, this.KeyCallback)

        if (!this.items[disjointSetItem.getKey()]) {
            this.items[disjointSetItem.getKey()] = disjointSetItem
        }
        return this
    }

    find(itemValue) {
        const templateDisjointItem = new DisjointSetItem(itemValue, this.KeyCallback)

        const requiredDisjoinItem = this.items[templateDisjointItem.getKey()]

        if (!requiredDisjoinItem) {
            return null
        }

        return requiredDisjoinItem.getRoot().getKey()
    }

    union(valueA, valueB) {
        const rootKeyA = this.find(valueA)
        const rootKeyB = this.find(valueB)

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        if (rootKeyA === rootKeyB) {
            return this
        }

        const rootA = this.items[rootKeyA]
        const rootB = this.items[rootKeyB]

        if (rootA.getRank() < rootB.getRank()) {
            rootB.addChild(rootA)
            return this
        }

        rootA.addChild(rootB)

        return this
    }

    inSameSet(valueA, valueB) {
        const rootKeyA = this.find(valueA)
        const rootKeyB = this.find(valueB)

        if (rootKeyA === null || rootKeyB === null) {
            throw new Error('One or two values are not in sets');
        }

        console.log(rootKeyA, rootKeyB)
        return rootKeyA === rootKeyB
    }
}