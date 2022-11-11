import Heap from "./Heap"

export default class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }
}

const max = new MaxHeap()
max.add(3)
max.add(2)
max.add(1)

console.log(max)