const numSum = (a, b) => {
    if(a > b) {
        let temp = a;
        a = b
        b = temp
    }
    let sum = 0
    for(let i = a; i <= b; i += 1) {
        sum += i
    }
    return sum
}