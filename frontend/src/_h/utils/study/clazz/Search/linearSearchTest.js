
import linearSearch from './linearSearch.js';

const array = [1, 2, 4, 6, 2]

const comparatorCallback = (a, b) => {
    if (a.key === b.key) {
        return 0
    }
    return a.key <= b.key ? -1 : 1
}

const array2 = [
    { key: 5 },
    { key: 6 },
    { key: 7 },
    { key: 6 },
];



console.log(linearSearch(array, 2))


console.log(linearSearch(array2, { key: 5 }, comparatorCallback))