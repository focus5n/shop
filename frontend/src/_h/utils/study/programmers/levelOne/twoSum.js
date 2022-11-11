const twoSum = (numbers, count = 2) => {
    if (count === 1) {
        return numbers
    }

    const res = new Set()
    numbers.forEach((value, index) => {
        const set = twoSum(
            numbers.slice(index + 1),
            count - 1
        );

        set.forEach((s) => {
            res.add(s + value)
        })
    })
    return [...res].sort((a, b) => a < b ? -1 : 1)
}

twoSum([2, 1, 3, 4, 1])