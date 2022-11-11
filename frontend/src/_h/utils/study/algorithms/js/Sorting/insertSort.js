const insertSort = (arr) => {
    let index = 1
    while (index < arr.length) {
        const temp = arr.slice(0, index)
        for (let i = 0; i < temp.length; i += 1) {
            if (arr[index] < temp[i]) {
                temp.splice(i, 0, arr[index]) // 1 9 1
                temp.splice(index + 1, 1) // 1 9
                arr = arr.slice(index + 1, arr.length) //6
                arr = [...temp, ...arr]
                break
            }
        }
        console.log(arr)

        index += 1
    }
}

const arr = [9, 1, 6, 3, 4, 5]
insertSort(arr)
