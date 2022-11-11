const yesan = (arr, budget) => {
    arr.sort((a, b) => a - b)
    let count = 0;
    arr.forEach((value) => {
        if(budget - value < 0) return
        budget -= value
        count += 1
    })
    return count
}

yesan([1, 3, 2, 5, 4], 9)