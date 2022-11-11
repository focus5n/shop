const combine = (a, b, prop) => {
    const result = Object.values(
        [...a, ...b].reduce((acc, v) => {
            console.log(v[prop])
            if (v[prop])
                acc[v[prop]] = acc[v[prop]]
                    ? { ...acc[v[prop]], ...v }
                    : { ...v };
            return acc;
        }, {})
    )
    console.log(result)

}

const x = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Maria' }
];
const y = [
    { id: 1, age: 28 },
    { id: 3, age: 26 },
    { age: 3 }
];
combine(x, y, 'id');

const commonKeys = (obj1, obj2) => {
    Object.keys(obj1).filter(key => obj2.hasOwnPropertsy(key))
}