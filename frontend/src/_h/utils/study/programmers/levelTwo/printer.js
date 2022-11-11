const printer = (priorities, location) => {
    const map = priorities.map((value, index) => [value, index])
    let answer = 1
    while (map.length > 0) {
        const select = map.shift()
        const find = map.findIndex((value) => select[0] < value[0])
        if (find !== -1) {
            map.push(select)
        } else {
            if (select[1] === location) break
            answer += 1
        }
    }
    return answer
}

const res = printer([2, 1, 3, 2], 3)
console.log(res)

