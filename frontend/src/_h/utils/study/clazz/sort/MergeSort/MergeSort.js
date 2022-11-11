import Sort from "../Sort.js";

export default class MergeSort extends Sort {
    sort(originalArray) {
        this.callbacks.visitingCallback(null)

        if (originalArray.length <= 1) {
            return originalArray
        }

        const middleIndex = Math.floor(originalArray.length / 2)
        const leftArray = originalArray.slice(0, middleIndex)
        const rightArray = originalArray.slice(middleIndex, originalArray.length)

        const leftSortedArray = this.sort(leftArray)
        const rightSortedArray = this.sort(rightArray)

        return this.mergeSortedArrays(leftSortedArray, rightSortedArray);
    }

    mergeSortedArrays(leftArray, rightArray) {
        const sortedArray = []

        let leftIndex = 0
        let rightIndex = 0

        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            let minElement = null

            if (this.comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])) {
                minElement = leftArray[leftIndex]
                leftIndex += 1
            } else {
                minElement = rightArray[rightIndex]
                rightIndex += 1
            }

            sortedArray.push(minElement)

            this.callbacks.visitingCallback(minElement)
        }

        return sortedArray
            .concat(leftArray.slice(leftIndex))
            .concat(rightArray.slice(rightIndex))
    }
}

const mergeSort = new MergeSort()
const res = mergeSort.sort([3, 4, 1, 5, 6, 7, 8, 9])
console.log(res)