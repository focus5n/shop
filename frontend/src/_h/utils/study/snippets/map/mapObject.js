const mapObject = (arr, fn) => {
    const result = arr.reduce((acc, el) => {
        acc[el] = fn(el)
        return acc
    }, {})
    console.log(result)
}

mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

const mapValues = (obj, fn) =>
    Object.keys(obj).reduce((acc, k) => {
        acc[k] = fn(obj[k], k, obj);
        return acc;
    }, {});
const users = {
    fred: { user: 'fred', age: 40 },
    pebbles: { user: 'pebbles', age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }