
const objectToEntries = (obj) => {
    return Object.keys(obj).map((key) => [key, obj[key]])
}

const result = objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
console.log(result)