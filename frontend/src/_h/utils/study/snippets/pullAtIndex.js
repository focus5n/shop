const pullAtIndex = (arr, pullArr) => {
    let removed = []
    let pulled = arr.map((value, index) => pullArr.includes(index) ? removed.push(value) : value)
        .filter((value, index) => !pullArr.includes(index))
    console.log(pulled)
    console.log(removed)
}

let myArray = ['a', 'b', 'c', 'd'];
let pulled = pullAtIndex(myArray, [1, 3]);
// myArray = [ 'a', 'c' ] , pulled = [ 'b', 'd' ]

const pullAtValue = (arr, pullArr) => {
    let removed = [],
        pushToRemove = arr.forEach((v, i) =>
            pullArr.includes(v) ? removed.push(v) : v
        ),
        mutateTo = arr.filter((v, i) => !pullArr.includes(v));
    arr.length = 0;
    mutateTo.forEach(v => arr.push(v));
    return removed;
};