const selectionSort = (arr) => {
    let index = 0
    while (index < arr.length) {
        let min = arr[index]
        let selectedIndex = index
        for (let i = index + 1; i < arr.length; i += 1) {
            if (min > arr[i]) {
                min = arr[i]
                selectedIndex = i
            }
        }
        [arr[index], arr[selectedIndex]] = [min, arr[index]]
        index += 1
    }
}

const arr = [9, 1, 6, 8, 4, 3, 2, 0]
selectionSort(arr)