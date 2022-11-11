const nextNum = (num) => {
    const length = num.toString(2).match(/1/g)
    console.log(length)
    while (num++) {
        if (length === [...num.toString(2)].filter((value) => value === '1').length) return num
    }
    return num
}
let loop = 100000000; // 1억
let sum = 0;

console.time('code_measure');
const res = nextNum(78)
console.log(res)
console.timeEnd('code_measure');
