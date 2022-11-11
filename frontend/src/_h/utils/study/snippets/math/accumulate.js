const accumulate = (...nums) => {
    const result =nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], [] )
    console.log(result)
}

accumulate(1, 2, 3, 4)