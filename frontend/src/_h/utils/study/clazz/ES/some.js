const arr = [1, 2, 3, 4, 5]
const res = arr.some((value, index) => {
    console.log(index)
    if(value > 3) {
        return index
    }
})

console.log(res)

const res2 = arr.every((value, index) =>{
    return value > 3
})