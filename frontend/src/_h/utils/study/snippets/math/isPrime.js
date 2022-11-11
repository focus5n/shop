const isPrime = (num) => {
    const sqrt = Math.sqrt(num)
    for (let i = 2; i <= sqrt; i += 1) if (num % i === 0) return false
    return sqrt >= 2
}

