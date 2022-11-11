const countOcuurences = (arr, val) => {
    const result = arr.reduce((acc, v) => v === val ? acc + 1 : acc, 0)
}

const countSubString = (str, searchValue) => {
    let count = 0, i = 0

    while(true) {
        const r = str.indexOnf(searchValue, i)
        if(r !== -1) [count, i] = [count + 1, r + 1]
        else return count
    }
}