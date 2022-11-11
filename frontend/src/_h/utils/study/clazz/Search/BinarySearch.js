export default class BinarySearch {
    search(arr, key, left, right) {
        if(right < left) return -1

        const median = (left + right) >>> 1
        const comp = arr[median] === key
        console.log(arr[median])

        if(comp) {
            return median
        } else if(arr[median] > key) {
            return this.search(arr, key, left, median - 1)
        } else {
            return this.search(arr, key, median + 1, right)
        }
    }
}

// const s = new BinarySearch()
// const arr = [1, 2, 3, 4, 5]
// const key = 2
// const left = 0
// const right = arr.length - 1
// const result = s.search(arr, key, left, right)
// console.log(result)



