
export default class DisjointSetItem {
    constructor(value, KeyCallback) {
        this.value = value
        this.KeyCallback = KeyCallback
        this.parent = null
        this.children = {}
    }

    getKey() {
        if (this.KeyCallback) {
            return this.KeyCallback(this.value)
        }
        return this.value
    }

    getRoot() {
        return this.isRoot() ? this : this.parent.getRoot()
    }

    isRoot() {
        return this.parent === null
    }

    getRank() {
        if (this.getChildren().length === 0) {
            return 0
        }

        let rank = 0

        this.getChildren().forEach((child) => {
            rank += 1
            rank += child.getRank()
        });
        return rank
    }

    getChildren() {
        return Object.values(this.children)
    }

    setParent(parentItem, forceSettingParentChild = true) {
        this.parent = parentItem
        if (forceSettingParentChild) {
            parentItem.addChild(this)
        }

        return this
    }

    addChild(childItem) {
        this.children[childItem.getKey()] = childItem;
        childItem.setParent(this, false)
        return this
    }
}

const itemA = new DisjointSetItem('A')
const itemB = new DisjointSetItem('B')
itemA.addChild(itemB)
