const devel = (progresses, speeds) => {
    const res = []
    let rem = progresses.map((value, index) => Math.ceil((100 - value) / speeds[index]))

    while (rem.length !== 0) {
        const find = rem[0]
        let num = rem.findIndex((value) => value > find)
        if (num === -1) {
            res.push(rem.length)
            rem = rem.slice(rem.length)
        }
        else {
            res.push(num)
            rem = rem.slice(num)
        }
    }

    return res
}



const progresses = [30, 40, 10, 40, 20]
const speeds = [10, 10, 10, 10, 10]
const res = devel(progresses, speeds)
console.log(res)
