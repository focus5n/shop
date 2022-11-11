const divide = (arr, divisor) => {
    const res = []

    for (let value of arr) {
        if (value % divisor === 0) res.push(value)
    }

    if (res.length === 0) res.push(-1)

    res.sort((a, b) => a < b ? -1 : 1)
    return res
}

const arr = [5, 10]
console.log(arr.sort((a, b) => a < b ? -1 : 1))