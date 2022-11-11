
// const boat = (arr, limit) => {
//     let answer = 0
//     arr.sort((a, b) => a - b)

//     while (arr.length > 0) {
//         const pick = arr.shift()
//         const filter = arr.map((val, index) => [val, index]).filter(([val, index]) => pick + val <= limit)
//         if (filter.length > 0) {
//             const maxIndex = filter.pop()[1]
//             arr.splice(maxIndex, 1)
//         }
//         answer += 1
//     }
//     return answer
// }


const boat = (arr, limit) => {
    let answer = 0
    arr.sort((a, b) => a - b)
    let start = 0
    let end = arr.length - 1
    while(start <= end) {
        const sum = arr[start] + arr[end]
        if(sum > limit) {
            end -= 1
        } else {
            end -= 1
            start += 1
        }
        answer += 1
    }
    return answer
}

boat([70, 50, 80, 50], 100)