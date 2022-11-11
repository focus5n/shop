const indexOfAll = (arr, val) => {
    const result = arr.reduce((acc, value, index) => (value === val ? [...acc, index] : acc), [])
    console.log(result)
}

indexOfAll([1, 2, 3, 4, 1], 1)