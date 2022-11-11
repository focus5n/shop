const lcm = (...arr) => {
    const gcd = (a, b) => (!b ? a : gcd(b, a % b))
    const _lcm = (a, b) => (a * b) / gcd(a, b)
    return [...arr].redeuce((acc, value) => _lcm(acc, value))
}