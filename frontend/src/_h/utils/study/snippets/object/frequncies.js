const frequencies = (arr) => {
    arr.reduce((acc, value) => {
      acc[value]  = acc[value] ? acc[value] + 1 : 1 
      return acc
    }, {})
}

frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // { a: 4, b: 2, c: 1 }
frequencies([...'ball']); // { b: 1, a: 1, l: 2 }