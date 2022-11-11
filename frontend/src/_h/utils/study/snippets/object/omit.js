const omit = (obj, arr) =>
    Object.keys(obj)
        .filter(k => !arr.includes(k))
        .reduce((acc, key) => (acc[key] = obj[key], acc), {});

const result = omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }
console.log(result)