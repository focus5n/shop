const pick = (obj, arr) => {
    return arr.reduce((acc, curr) => {
        return (curr in obj && (acc[curr] = obj[curr]), acc)
    }, {})
}

const result = pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
console.log(result)

const pickBy = (obj, fn) =>
    Object.keys(obj).filter(k => fn(obj[k]))
        .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})

const result2 = pickBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number');
// { 'a': 1, 'c': 3 }
console.log(result2)