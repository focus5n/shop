const minNumDelete = (arr) => {
    if (arr.length <= 1) {
        return [-1]
    }
    const temp = [...arr]
    const min = temp.sort((a, b) => a < b ? 1 : -1).slice(-1)[0]
    return arr.filter((val) => val !== min)
}

const result = minNumDelete([4, 3, 1, 2, 3, 4, 5])
console.log(result)