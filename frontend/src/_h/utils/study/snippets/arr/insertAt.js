const insertAt = (arr, i, ...values) => {
    arr.splice(i + 1, 0, ...values)
    return arr
}

const arr = [1, 2, 3, 4]
const result = insertAt(arr, 0, 5, 6, 7, 8)
console.log(result)