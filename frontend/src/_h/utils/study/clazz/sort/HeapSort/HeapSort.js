import MinHeap from "../../datastructures/Heap/MinHeap.js";
import Sort from "../Sort.js";

export default class HeapSort extends Sort {
    sort(originalArray) {
        const sortedArray = []
        const minHeap = new MinHeap(this.callbacks.compareCallback)
        originalArray.forEach((element) => {
            this.callbacks.visitingCallback(element);
            minHeap.add(element);
        });

        while (!minHeap.isEmpty()) {
            const nextMinElement = minHeap.poll();
            this.callbacks.visitingCallback(nextMinElement);

            sortedArray.push(nextMinElement);
        }

        return sortedArray;
    }
}

const heapSort = new HeapSort()

const res = heapSort.sort([4, 1, 5, 2])
console.log(res)