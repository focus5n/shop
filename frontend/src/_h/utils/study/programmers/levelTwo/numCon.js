// const solution = (number) => {
//     const arr = Array.from({ length: number }).map((value, index) => index + 1)
//     let answer = 1
//     const numCon = (target, arr, pick) => {
//         let sum = pick
//         arr.forEach((value) => {
//             sum += value
//             if (sum === target) {
//                 numCon(target, arr, arr.shift())
//                 answer += 1
//             } else if (sum > target) {
//                 numCon(target, arr, arr.shift())
//             }
//         })
//     }

//     numCon(number, arr, arr.shift())
//     return answer
// }

const solution = (number) => {
    const arr = Array.from(({length: number})).map((value, index) => index + 1)
    console.log(arr)
} 

const number = 15

solution(number)