const negate = func => (...args) => !func(...args)


[1, 2, 3, 4, 5, 6].fitler(negate(n => n % 2 === 0))