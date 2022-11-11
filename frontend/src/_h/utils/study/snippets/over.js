const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args))
const minMax = over(Math.min, Math.max)
minMax(1, 2, 3, 4, 5)


console.log([Math.min, Math.max].map(fn => fn.apply('test', [1, 2, 3, 4, 5])))