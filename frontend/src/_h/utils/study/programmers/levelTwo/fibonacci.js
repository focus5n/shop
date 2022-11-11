// const fibonacci = (num) => {
//     if(num <= 1) return num
//     return (fibonacci(num - 1) + fibonacci(num - 2)) % 1234567
// }

//재귀보다 배열이 더 속도가 빠름
const fibonacci = (num) => {
    const res = [0, 1]
    for(let i = 2; i <= num; i += 1) {
        res.push(res[i - 1] + res[i - 2] % 1234567)
    }
    return res[num]
}

const res = fibonacci(5)
console.log(res)