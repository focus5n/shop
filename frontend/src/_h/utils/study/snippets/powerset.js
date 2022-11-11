const powerset = arr =>
    arr.reduce((a, v) => a.concat(a.map(r => {
        console.log(r)
        return r.concat(v)
    })), [[]]);


const result = powerset([1, 2, 3]); // [[], [1], [2], [1, 2]]
console.log(result)