const generateItems = (n, fn) => {
    return Array.from({ length: n }, (_, index) => index + 1)
}

const result = generateItems(10, Math.random);
console.log(result)