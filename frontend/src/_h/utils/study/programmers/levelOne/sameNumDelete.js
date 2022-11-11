const sameNumDelete = (arr) => {
    const res = []
    let cur = arr[0]
    let next = 1
    res.push(cur)
    while (next < arr.length) {
        if (cur === arr[next]) {
            next += 1
        } else {
            res.push(arr[next])
            cur = arr[next]
            next += 1
        }
    }
    return res
}   

sameNumDelete([4, 4, 4, 3, 3])

const solution = (arr) => {
    return arr.filter((value, index) => value !== arr[index + 1])
}