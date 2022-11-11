const arr = [1, 2, 3, 4]

const result = arr.findIndex(element => element > 2, arr.map((e) => e + 3))
console.log(result)