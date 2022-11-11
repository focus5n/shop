import Sort from "../Sort";

export default class SelectionSort extends Sort {
    sort(originalArray) {
        const arr = [...originalArray]

        for (let i = 0; i < arr.length - 1; i += 1) {
            let currentIndex = i

            this.callbacks.visitirngCallback(arr[i])

            for (let j = i + 1; j < arr.length; j += 1) {
                if (this.comparator.lessThan(arr[j], arr[currentIndex])) {
                    currentIndex = j
                }
            }

            if(currentIndex !== i) {
                [arr[i], arr[currentIndex]] = [arr[currentIndex], arr[i]]
            }
        }
        return arr
    }
}