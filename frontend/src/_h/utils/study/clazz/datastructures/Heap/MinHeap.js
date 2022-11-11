import Heap from "./Heap.js";

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThanOrEqual(firstElement, secondElement)
    }
}

// const minHeap = new MinHeap()
// minHeap.add('dddd');
// minHeap.add('ccc');
// minHeap.add('bb');
// minHeap.add('a')
// console.log(minHeap)