const gcd = (a, b) => {
    return b % a === 0 ? a : gcd(b % a, a)
}

const lcm = (a, b) => {
    return a * b / gcd(a, b)
}

const solution = (numbers) => {
    return numbers.reduce((acc, value) => lcm(acc, value))
}

solution([2, 6, 8, 14])