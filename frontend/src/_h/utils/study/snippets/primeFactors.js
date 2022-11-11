const primeFactors = (num) => {
    const arr = []
    let count = 2
    while (num !== 1) {
        if (num % count === 0) {
            arr.push(count)
            num /= count
        } else {
            count += 1
        }
    }
    return arr
}