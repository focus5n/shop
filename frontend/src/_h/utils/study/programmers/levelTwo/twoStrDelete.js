const twoStrDelete = ([...str]) => {
    const res = []
    for (let i = 0; i < str.length; i += 1) {
        const pick = res.length - 1
        if (res[pick] === str[i]) {
            res.pop()
        } else {
            res.push(str[i])
        }
    }
    return !res.length ? 1 : 0
}

twoStrDelete("cdcd")



// const twoStrDelete = ([...str]) => {
//     let check = true
//     while(check) {
//         check = false
//         str.map((val, index) => {
//             if(str[index] === str[index + 1]) {
//                 check = true
//                 str.splice(index, 2)
//             }
//         })
//     }
//     return !str.length ? 1 : 0
// }