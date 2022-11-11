const inverKeyValues = (obj, fn) => {
    const result = Object.keys(obj).reduce((acc, key) => {
        const val = fn ? fn(obj[key]) : obj[key]
        acc[val] = acc[val] || []
        acc[val].push(key)
        return acc
    }, {})
    console.log(result)
}

inverKeyValues({ a: 1, b: 2, c: 1 })