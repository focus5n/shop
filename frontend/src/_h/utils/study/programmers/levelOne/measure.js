const measure = (left, right) => {
    let answer = 0
    for (let i = left; i <= right; i += 1) {
        if(getMeasure(i) % 2 === 0)  {
            answer += i
        } else {
            answer -= i
        }
    }
    return answer
}

const getMeasure = (num) => {
    let divideNum = 2
    const res = {}
    while (num !== 1) {
        if (num % divideNum === 0) {
            res[divideNum] = (res[divideNum] || 0) + 1
            num /= divideNum
        } else {
            divideNum += 1
        }
    }
    return Object.values(res).reduce((acc, value) => acc *= value + 1, 1)
}

measure(13, 14)

getMeasure(72)