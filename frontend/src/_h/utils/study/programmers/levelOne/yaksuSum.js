const yaksuSum = (num) => {
    let res = 0
    for(let i = 1; i <= num; i += 1) {
        if(num % i === 0) res += i
    }
    return res
}

yaksuSum(12)