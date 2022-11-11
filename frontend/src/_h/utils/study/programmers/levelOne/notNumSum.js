const notNumSum = (numbers) => {
    return 45 - numbers.reduce((acc,value) => acc += value, 0)
}

notNumSum([1, 2, 3, 4, 6, 7, 8, 0])