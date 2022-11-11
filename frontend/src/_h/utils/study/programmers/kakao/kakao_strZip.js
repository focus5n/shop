const solution = (s) => {
    let min = Number.MAX_VALUE
    for(let i = 1; i < s.length + 1; i += 1) {
        min = Math.min(min, strZip(s, i))
    }
    return min
}

const strZip = (s, num) => {
    let res = ''

    while (s.length > 0) {
        let count = 1
        let start = num
        let end = num * 2

        while (s.slice(0, num) === s.slice(start, end)) {
            start = end
            end = start + num 
            count += 1
        }
        res += count === 1 ? s.slice(0, num) : count + s.slice(0, num)
        end -= num
        s = s.slice(end)
    }
    return res.length
}

solution('aaaaaaaaad')

// abcabc abcabc dedede dedede