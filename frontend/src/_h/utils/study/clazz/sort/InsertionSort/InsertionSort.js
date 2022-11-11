import Sort from '../Sort';

export default class InsertionSort extends Sort {
    sort(originalArray) {
        const arr = [...originalArray]

        for (let i = 1; i < arr.length; i += 1) {
            let currentIndex = i

            while (
                arr[currentIndex - 1] &&
                this.Comparator.lessThan(arr[currentIndex], arr[currentIndex - 1])
            ) {
                [arr[currentIndex], arr[currentIndex - 1]] = [arr[currentIndex - 1], arr[currentIndex]]
                currentIndex -= 1
            }
        }
        return arr
    }
}