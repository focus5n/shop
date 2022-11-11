const minCreate = (a, b) => {
    a.sort((a, b) => a - b)
    b.sort((a, b) => b - a)
    let answer = 0
    for(let i = 0; i < a.length; i += 1) {
        answer += (a[i] * b[i])
    }
    return answer
}

const res = minCreate([1, 4, 2], [5, 4, 4])
console.log(res)