const average = (...nums) => {
    console.log(nums)
    const result = nums.reduce((acc, val) => acc + val, 0) / nums.length;
}


average(...[1, 2, 3])

const averageBy = (arr, fn) => {
    return arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length
}