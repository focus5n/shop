const longestItem = (...vals) => {
    const result = vals.reduce((acc, value) => value.length > acc.length ? value : acc)
    console.log(result)
}

longestItem(...['a', 'ab', 'abc'], 'abcd');