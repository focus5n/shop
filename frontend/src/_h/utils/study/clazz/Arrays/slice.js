const arr = [1, 2, 3, 4]

const res = arr.splice(1, 2)

// res 2 3
// arr 1 4

Array.prototype.splice.apply(arr, [1, 0].concat([2, 3]))

