const all = (arr, fn = Boolean) => {
    const result = arr.every(fn)
    console.log(result)
}

all([1, 2], value => value > 0)

const allUnique = arr => {
    const result = arr.length === new Set(arr).size
    console.log(result)
}