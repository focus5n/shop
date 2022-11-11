const groupBy = (arr, fn) => {
    const result = arr.map(fn).reduce((acc, val, i) => {
        acc[val] = (acc[val] || []).concat(arr[i])
        return acc;
    }, {})
    console.log(result)
}

groupBy([6.1, 4.2], Math.floor)