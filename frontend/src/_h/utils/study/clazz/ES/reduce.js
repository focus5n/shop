const arr = [1, 2, 3]
const sum = arr.reduce((previouseValue, currentValue) => {
    console.log(currentValue)
    return previouseValue += currentValue
}, 0)
console.log(sum)

const sum2 = arr.reduce((previouseValue, currentValue) => {
    console.log(currentValue)
    return previouseValue += currentValue
}, 0)

console.log(sum2)

const max = arr.reduce((pre, cur) => {
    return pre > cur ? pre : cur
})

console.log(max)

//초기값을 안 넣으면 인덱스 1부터 시작, 넣으면 인덱스 0 부터 시작