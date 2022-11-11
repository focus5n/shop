const binarySearchRecursive = (arr, find, low = 0, high = arr.length - 1) => {
    const mid = Math.floor(low + (high - low) / 2)

    if (high >= low) {
        if (arr[mid] === find) {
            return mid
        }
        if (find < arr[mid]) {
            return binarySearchRecursive(arr, find, low, mid - 1)
        } else {
            return binarySearchRecursive(arr, find, mid + 1, high)
        }
    } else {
        return -1
    }
}